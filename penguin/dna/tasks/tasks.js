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
  console.log(entryType)
  var entryTypes = ["task", "task_link", "transaction", "transaction_link", "solution", "solution_link", "comment", "comment_link"]
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
  object.timestamp = Date.now();
  return object;
}

/*******************************************************************************
 * CRUD functions
 ******************************************************************************/

/*********************************************
 * TASKS
 * {
 *    title: (title of the task)
 *    description: (description of the task)
 * }
 ********************************************/
function createTask(task) {
  task = addTimestamp(task);
  console.log(JSON.stringify(task))
  var hash = commit('task', task);
  console.log(hash)
  var tasksLink = commit('task_link', {
    Links: [{ Base: App.DNA.Hash, Link: hash, Tag: "tasks" }]
  });
  console.log("tasksLink: " + tasksLink)
  var myTasksLink = commit('task_link', {
    Links: [{ Base: App.Agent.Hash, Link: hash, Tag: "tasks" }]
  });
  return hash;
}

function readTask(hash) {
  var task = get(hash);
  return task;
}

function readAllTasks() {
  var links = getLinks(App.DNA.Hash, "tasks", { Load: true });
  console.log("links: " + links)
  return { links: links };
}

function readMyTasks() {
  var links = getLinks(App.Agent.Hash, "tasks", { Load: true });
  return { links: links };
}

function deleteTask(hash) {
  console.log(hash)
  //remove the task entry
  remove(hash);
  //mark the task link on the DNA as deleted
  commit("task_link", {
    Links: [{ Base: App.DNA.Hash, Link: hash, Tag: "tasks", LinkAction: HC.LinkAction.Del }]
  })
  //mark the task link on the agent as deleted
  //?? Unsure what happens if this link doesn't exist on this particular user's agent hash
  commit("task_link", {
    Links: [{ Base: App.DNA.Hash, Link: hash, Tag: "tasks", LinkAction: HC.LinkAction.Del }]
  })
  return true
}

/*********************************************
 * TASKS
 * {
 *    origin: (origin of the funds)
 *    destination: (destination of the funds)
 *    pebbles: (amount of pebbles to be transfered)
 * }
 ********************************************/
function createTransaction(transaction) {
  transaction = addTimestamp(transaction);
  console.log(JSON.stringify(transaction))
  var hash = commit('transaction', transaction);
  console.log(hash)
  var withdrawalsLink = commit('transaction_link', {
    Links: [{ Base: transaction.origin, Link: hash, Tag: "withdrawals" }]
  });
  console.log("withdrawals: " + withdrawalsLink)
  var depositsLink = commit('transaction_link', {
    Links: [{ Base: transaction.destination, Link: hash, Tag: "deposits" }]
  });
  console.log("depositions: " + depositsLink)
  return hash;
}

function readTransaction(hash) {
  var transaction = get(hash);
  return transaction;
}

function readTransactions(hash){
  var deposits = getLinks(hash, "deposits", { Load: true });
  console.log("deposits: " + deposits);
  var withdrawals = getLinks(hash, "withdrawals", { Load: true });
  console.log("withdrawals: " + withdrawals);
  return { 
    deposits: deposits,
    withdrawals: withdrawals
  }
}

function readWithdrawals(hash) {
  var withdrawals = getLinks(hash, "withdrawals", { Load: true });
  console.log("withdrawals: " + withdrawals);
  return { withdrawals: withdrawals };
}

function readDeposits(hash) {
  var deposits = getLinks(hash, "deposits", { Load: true });
  console.log("deposits: " + deposits);
  return { deposits: deposits };
}

function tabulate(hash) {
  var deposits = getLinks(hash, "deposits", { Load: true });
  console.log("deposits: " + deposits);
  var totalDeposits = 0;
  deposits.forEach(function(deposit){
    totalDeposits += deposit.Entry.pebbles;
  });
  var withdrawals = getLinks(hash, "withdrawals", { Load: true });
  console.log("withdrawals: " + withdrawals);
  var totalWithdrawals = 0;
  withdrawals.forEach(function(withdrawal){
    totalWithdrawals += withdrawal.Entry.pebbles;
  });
  return totalDeposits - totalWithdrawals;
}

// Solutions

// Comments

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
  return isValidEntryType(entryType);
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
  return validateCommit(entryType, entry, header, pkg, sources);
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
