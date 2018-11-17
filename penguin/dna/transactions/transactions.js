/*******************************************************************************
 * Utility functions
 ******************************************************************************/

/**
 * Is this a valid entry type?
 *
 * @param {any} entryType The data to validate as an expected entryType.
 * @return {boolean} true if the passed argument is a valid entryType.
 */
function isValidEntryType(entryType) {
  // Add additonal entry types here as they are added to dna.json.
  // return true
  var entryTypes = ["transaction", "transaction_link"];
  if (entryTypes.indexOf(entryType) === -1) { console.log(entryType + " is not a valid entry type!"); }
  return (entryTypes.indexOf(entryType) > -1);
}

/**
 * Returns the creator of an entity, given an entity hash.
 *
 * @param  {string} hash The entity hash.
 * @return {string} The agent hash of the entity creator.
 */
function getCreator(hash) {
  return get(hash, { GetMask: HC.GetMask.Sources })[0];
}

/**
 * Returns an object, plus a timestamp.
 * 
 * @param {object} object The object that needs a timestamp added.
 * @return {object} The object, plus a timestamp.
 */
function addTimestamp(object) {
  object.time = Date.now();
  return object;
}

function getLastRedistributionDate() {
  var deposits = getLinks(App.Key.Hash, "deposits", { Load: true });
  var date = 0
  //find the latest redistribution transaction from DNA to this particular agent's key
  deposits.forEach(function (deposit) {
    if ((deposit.Entry.origin === App.DNA.Hash) && (deposit.Entry.time > date)) {
      date = deposit.Entry.time;
    };
  })
  return date;
}

/*******************************************************************************
 * Set Ups
 ******************************************************************************/
//New User added ==> Redistribution mechanics for pebbles
//CONSTANT: (total pebbles in the system)/(total users in the system) = 500

//right now the function below is public and can be called every 24 hours, but we should make it so that this function is private and is called automatically when a user is active
//in order to avoid a situation where people just build a mini app that sends a post request to /distribute every 24 hrs automatically.
function distribute() {
  var hash = createTransaction({
    origin: App.DNA.Hash,
    destination: App.Key.Hash,
    pebbles: 5
  })
  return hash
}

/*********************************************
 * TRANSACTIONS
 * {
 *    origin: (origin of the funds)
 *    destination: (destination of the funds)
 *    pebbles: (amount of pebbles to be transfered)
 * }
 ********************************************/
function createTransaction(transaction) {
  transaction = addTimestamp(transaction);
  var hash = commit('transaction', transaction);
  //if DNA is sending itself pebbles, then we want it to be a deposit but not a withdrawal so that the total sum of pebbles in the system will increase
  if (transaction.destination !== App.DNA.Hash || transaction.origin !== App.DNA.Hash) {
    var withdrawalsLink = commit('transaction_link', {
      Links: [{ Base: transaction.origin, Link: hash, Tag: "withdrawals" }]
    });
  }
  var depositsLink = commit('transaction_link', {
    Links: [{ Base: transaction.destination, Link: hash, Tag: "deposits" }]
  });

  return hash;
}

function readTransaction(hash) {
  var transaction = get(hash);
  if (transaction.origin !== App.DNA.Hash) {
    transaction.taskTitle = JSON.parse(call("tasks", "readTask", JSON.stringify(transaction.origin))).title || JSON.parse(call("tasks", "readTask", JSON.stringify(transaction.destination))).title;
  } else {
    transaction.taskTitle = "Active Reward"
  }
  return transaction;
}

function readTransactions(hash) {
  var deposits = getLinks(hash, "deposits", { Load: true });
  var withdrawals = getLinks(hash, "withdrawals", { Load: true });
  var getTitles = function(transaction){
    var updatedTransaction = readTransaction(transaction.Hash);
    transaction.Entry.taskTitle = updatedTransaction.taskTitle;
  }
  deposits.forEach(getTitles);
  withdrawals.forEach(getTitles);
  return {
    deposits: deposits,
    withdrawals: withdrawals
  }
}

function readUserTransactions() {
  return readTransactions(App.Key.Hash);
}

function readWithdrawals(hash) {
  var withdrawals = getLinks(hash, "withdrawals", { Load: true });
  return { withdrawals: withdrawals };
}

function readDeposits(hash) {
  var deposits = getLinks(hash, "deposits", { Load: true });
  return { deposits: deposits };
}

function tabulate(hash) {
  var deposits = getLinks(hash, "deposits", { Load: true });
  var totalDeposits = 0;
  deposits.forEach(function (deposit) {
    totalDeposits += deposit.Entry.pebbles;
  });
  var withdrawals = getLinks(hash, "withdrawals", { Load: true });
  var totalWithdrawals = 0;
  withdrawals.forEach(function (withdrawal) {
    totalWithdrawals += withdrawal.Entry.pebbles;
  });
  return totalDeposits - totalWithdrawals;
}

/*******************************************************************************
 * Required callbacks
 ******************************************************************************/

/**
 * System genesis callback: Can the app start?
 *
 * Executes just after the initial genesis entries are committed to your chain
 * (1st - DNA entry, 2nd Identity entry). Enables you specify any additional
 * operations you want performed when a node joins your holochain.
 *
 * @return {boolean} true if genesis is successful and so the app may start.
 *
 * @see https://developer.holochain.org/API#genesis
 */
function genesis() {
  return true;
}

/**
 * Validation callback: Can this entry be committed to a source chain?
 *
 * @param  {string} entryType Type of the entry as per DNA config for this zome.
 * @param  {string|object} entry Data with type as per DNA config for this zome.
 * @param  {Header-object} header Header object for this entry.
 * @param  {Package-object|null} pkg Package object for this entry, if exists.
 * @param  {string[]} sources Array of agent hashes involved in this commit.
 * @return {boolean} true if this entry may be committed to a source chain.
 *
 * @see https://developer.holochain.org/API#validateCommit_entryType_entry_header_package_sources
 * @see https://developer.holochain.org/Validation_Functions
 */
function validateCommit(entryType, entry, header, pkg, sources) {
  if (isValidEntryType(entryType)) {
    switch (entryType) {
      case "transaction":
        return (
          //at each genesis DNA sends itself 500 pebbles and this transaction should be allowed independent of other constraints
          ((entry.origin === App.DNA.Hash) && (entry.destination === App.DNA.Hash) && (entry.pebbles === 500)) ||

          //validation for redistribution --> making sure that it has been at least 24 hours since this agent has last run the redistribution function
          ((entry.origin === App.DNA.Hash && entry.destination !== App.DNA.Hash) ? (((Date.now() - getLastRedistributionDate()) > 24 * 60 * 60 * 1000) ? (true) : (false)) : (true)) &&

          //the creator of the transaction must have equal or more pebbles than what is specified in the transaction
          (tabulate(entry.origin) >= entry.pebbles) &&

          //if the transactions origin is a task then the source of the transaction must be equal to the creator of the task
          (((entry.origin !== App.DNA.Hash) && (get(entry.origin).title)) ? (sources[0] === getCreator(entry.origin)) : true) &&

          //negative pebbles not allowed
          (entry.pebbles > 0)
        )
      case "transaction_link":
        return true
    }
  }
  return false
}

/**
 * Validation callback: Can this entry be committed to the DHT on any node?
 *
 * It is very likely that this validation routine should check the same data
 * integrity as validateCommit, but, as it happens during a different part of
 * the data life-cycle, it may require additional validation steps.
 *
 * This function will only get called on entry types with "public" sharing, as
 * they are the only types that get put to the DHT by the system.
 *
 * @param  {string} entryType Type of the entry as per DNA config for this zome.
 * @param  {string|object} entry Data with type as per DNA config for this zome.
 * @param  {Header-object} header Header object for this entry.
 * @param  {Package-object|null} pkg Package object for this entry, if exists.
 * @param  {string[]} sources Array of agent hashes involved in this commit.
 * @return {boolean} true if this entry may be committed to the DHT.
 *
 * @see https://developer.holochain.org/API#validatePut_entryType_entry_header_package_sources
 * @see https://developer.holochain.org/Validation_Functions
 */
function validatePut(entryType, entry, header, pkg, sources) {
  return (validateCommit(entryType, entry, header, pkg, sources))
}

/**
 * Validation callback: Can this entry be modified?
 *
 * Validate that this entry can replace 'replaces' due to 'mod'.
 *
 * @param  {string} entryType Type of the entry as per DNA config for this zome.
 * @param  {string|object} entry Data with type as per DNA config for this zome.
 * @param  {Header-object} header Header object for this entry.
 * @param  {string} replaces The hash string of the entry being replaced.
 * @param  {Package-object|null} pkg Package object for this entry, if exists.
 * @param  {string[]} sources Array of agent hashes involved in this mod.
 * @return {boolean} true if this entry may replace 'replaces'.
 *
 * @see https://developer.holochain.org/API#validateMod_entryType_entry_header_replaces_package_sources
 * @see https://developer.holochain.org/Validation_Functions
 */
function validateMod(entryType, entry, header, replaces, pkg, sources) {
  return validateCommit(entryType, entry, header, pkg, sources)
    // Only allow the creator of the entity to modify it.
    && getCreator(header.EntryLink) === getCreator(replaces);
}

/**
 * Validation callback: Can this entry be deleted?
 *
 * @param  {string} entryType Name of the entry as per DNA config for this zome.
 * @param  {string} hash The hash of the entry to be deleted.
 * @param  {Package-object|null} pkg Package object for this entry, if exists.
 * @param  {string[]} sources Array of agent hashes involved in this delete.
 * @return {boolean} true if this entry can be deleted.
 *
 * @see https://developer.holochain.org/API#validateDel_entryType_hash_package_sources
 * @see https://developer.holochain.org/Validation_Functions
 */
function validateDel(entryType, hash, pkg, sources) {
  return isValidEntryType(entryType)
    // Only allow the creator of the entity to delete it.
    && getCreator(hash) === sources[0];
}

function validateLink() {
  return true;
}

/**
 * Package callback: The package request for validateCommit() and valdiatePut().
 *
 * Both 'commit' and 'put' trigger 'validatePutPkg' as 'validateCommit' and
 * 'validatePut' must both have the same data.
 *
 * @param  {string} entryType Name of the entry as per DNA config for this zome.
 * @return {PkgReq-object|null}
 *   null if the data required is the Entry and Header.
 *   Otherwise a "Package Request" object, which specifies what data to be sent
 *   to the validating node.
 *
 * @see https://developer.holochain.org/API#validatePutPkg_entryType
 * @see https://developer.holochain.org/Validation_Packaging
 */
function validatePutPkg(entryType) {
  return null;
}

/**
 * Package callback: The package request for validateMod().
 *
 * @param  {string} entryType Name of the entry as per DNA config for this zome.
 * @return {PkgReq-object|null}
 *   null if the data required is the Entry and Header.
 *   Otherwise a "Package Request" object, which specifies what data to be sent
 *   to the validating node.
 *
 * @see https://developer.holochain.org/API#validateModPkg_entryType
 * @see https://developer.holochain.org/Validation_Packaging
 */
function validateModPkg(entryType) {
  return null;
}

/**
 * Package callback: The package request for validateDel().
 *
 * @param  {string} entryType Name of the entry as per DNA config for this zome.
 * @return {PkgReq-object|null}
 *   null if the data required is the Entry and Header.
 *   Otherwise a "Package Request" object, which specifies what data to be sent
 *   to the validating node.
 *
 * @see https://developer.holochain.org/API#validateDelPkg_entryType
 * @see https://developer.holochain.org/Validation_Packaging
 */
function validateDelPkg(entryType) {
  return null;
}
