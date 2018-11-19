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
  var entryTypes = ["task", "task_link"];
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
//Checks if a user's public key is listed under the aliases of the identity the user is logged in to
function isAuthorized(key) {
  var identity = JSON.parse(call("users", "readIdentity", ""));
  if (identity.aliases.indexOf(key) > -1) {
    return true
  } else {
    call("users", "logOut", "");
    return false
  }
}

/*********************************************
 * TASKS
 * (the task object that we receive from the UI should look like the following)
 * {
 *    title: (title of the task)
 *    details: (description of the task)
 *    tags: (array of tags)
 *    pebbles (how many pebbles the creator throws down initially)
 * }
 ********************************************/
function createTask(task) {
  var pebbles = task.pebbles || 0;
  if (pebbles === 0) return;
  task = addTimestamp(task);
  task.creator = JSON.parse(call("users", "readLoggedInId", ""));
  console.log(task.creator)
  task.title = task.title || "";
  task.details = task.details || "";
  task.tags = task.tags || [];
  var hash = commit('task', task);
  var transactionHash = backTask({
    task: hash,
    pebbles: pebbles
  });
  var tasksLink = commit('task_link', {
    Links: [{ Base: App.DNA.Hash, Link: hash, Tag: "tasks" }]
  });
  var myTasksLink = commit('task_link', {
    Links: [{ Base: JSON.parse(call("users", "readLoggedInId", "")), Link: hash, Tag: "tasks" }]
  });
  return hash;
}

function readTask(hash) {
  var task = get(hash);
  task.pebbles = call("transactions", "tabulate", "\"" + hash + "\"");
  task.solutions = getLinks(hash, "solutions", { Load: true });
  task.comments = getLinks(hash, "comments", { Load: true });
  return task;
}

function readAllTasks() {
  var tasks = getLinks(App.DNA.Hash, "tasks", { Load: true });
  tasks.forEach(function (link) {
    var pebbles = call("transactions", "tabulate", JSON.stringify(link.Hash));
    link.Entry.pebbles = pebbles;
  });
  return { tasks: tasks };
}

function readMyTasks(userHash) {
  var links = getLinks(userHash || JSON.parse(call("users", "readLoggedInId", "")), "tasks", { Load: true });
  return { links: links };
}

function deleteTask(hash) {
  //remove the task entry
  remove(hash, "this task is deleted");
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

/**
 * 
 * @param {object} back Object representing the pledge to back a task
 * {
 *    task: (hash of task to back)
 *    pebbles: (amount of pebbles to be transfered)
 * }
 */
function backTask(back) {
  var backer = JSON.parse(call("users", "readLoggedInId", ""));
  var task = back.task;
  var pebbles = back.pebbles;
  return call("transactions", "createTransaction", {
    origin: backer,
    destination: task,
    pebbles: pebbles
  });
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
  call("users", "createIdentity", JSON.stringify({ username: "cefimenda" }))
  call("transactions", "createTransaction", {
    origin: App.DNA.Hash,
    destination: App.DNA.Hash,
    pebbles: 500
  });
  call("transactions", "distribute", "");
  var taskHash = createTask({
    title: "Holochain App Debug",
    details: "My holochain app isn't working!!",
    tags: ["holochain"],
    pebbles: 1
  });
  createTask({
    title: "Need Holochain Help NOW",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in metus iaculis, interdum urna sed, vulputate urna.",
    tags: ["holochain", "other", "stuff", "gotta", "be", "visually", "full"],
    pebbles: 2
  });
  call("comments", "createComment", {
    page: taskHash,
    text: "I think your app concept is amazing, and I hope you can get some help on this problem really quick! Good luck!"
  });
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
  if (isValidEntryType(entryType) && isAuthorized(sources[0])) {
    switch (entryType) {
      case "task":
        return (
          //the creator of the task must have equal or more pebbles than what is specified in the transaction
          (call("transactions", "tabulate", "\"" + entry.creator + "\"") >= entry.pebbles) &&

          //negative pebbles not allowed
          (entry.pebbles > 0)
        )
      case "task_link":
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
