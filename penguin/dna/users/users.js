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
  var entryTypes = ["userdata", "userdata_link", "identity", "identity_link", "update", "update_link"];
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

function recentUpdate(id) {
  var updates = getLinks(id, "update", { Load: true })
  var mostRecent;
  var date = 0
  updates.forEach(function (update) {
    if (update.Entry.time > date) {
      date = update.Entry.time;
      mostRecent = update.Entry;
    }
  })
  return mostRecent;
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

function removeAlias(key) {
  var key = key || App.Key.Hash;
  var identity = readIdentity();
  if (identity.aliases.indexOf(key) > -1) {
    identity.aliases.pop(key)
  };
  createUpdate(identity);
}

function connectUser(id) {
  //If already connected to an identity log out
  if (getLinks(App.Key.Hash, 'identity') > 0) { logOut() }
  //create new connection to the account that the user is logging in to
  var idLinkKey = commit('identity_link', {
    Links: [{ Base: App.Key.Hash, Link: id, Tag: 'identity' }]
  });
  //add this agent's key to the aliases in the identity
  var identity = readIdentity();
  if (identity.aliases.indexOf(App.Key.Hash) === -1) {
    identity.aliases.push(App.Key.Hash)
    createUpdate(identity)
  }
  return getUser();
}

//Checks if a user's public key is listed under the aliases of the identity the user is logged in to
function isAuthorized(key) {
  var identity = readIdentity();
  if (identity.aliases.indexOf(key) > -1) {
    return true
  } else {
    logOut();
    return false
  }
}


/****************************************
 * USER Functions with endpoints
 */

/* identity: {
            username: (username),
            github: (github oAuth token) - Optional
         } */
function createIdentity(data) {
  //create new identity
  data.origin = App.Key.Hash;
  addTimestamp(data)
  var id = commit('identity', data);

  //add this identity as a link to DNA
  var idLinkDNA = commit('identity_link', {
    Links: [{ Base: App.DNA.Hash, Link: id, Tag: 'identity' }]
  });
  //add this identity as a link to Key
  var idLinkKey = commit('identity_link', {
    Links: [{ Base: App.Key.Hash, Link: id, Tag: 'identity' }]
  });

  //create an update linked to this identity to store first key
  var firstUpdate = data;
  firstUpdate.aliases = [App.Key.Hash];
  var updateHash = commit('update', firstUpdate);

  var updateLink = commit('update_link', {
    Links: [{ Base: id, Link: updateHash, Tag: 'update' }]
  });

  return id
}
//returns most recent identity information
function readIdentity(id) {
  var id = id || readLoggedInId()
  return recentUpdate(id)
}
//returns id hash
function readLoggedInId() {
  return getLinks(App.Key.Hash, 'identity')[0].Hash
}

function createUpdate(update) {
  addTimestamp(update)

  //find the related user identity -- Links don't carry a built in timestamp and we can't use the timestamp in the Entry to sort because that would only give us the time of account creation. 
  //We can make it so that a key can only be associated with one account at a time by forcing the user to log out at which point we delete the link between the key and account...
  var id = getLinks(App.Key.Hash, 'identity', { Load: true })[0].Hash

  //find the latest update on this identity -- sort by the timestamp on the update entry
  var mostRecent = recentUpdate(id)

  //replace additions in update
  Object.keys(update).forEach(function (key) {
    mostRecent[key] = update[key]
  })

  var newUpdate = commit('update', mostRecent);
  var updateLink = commit('update_link', {
    Links: [{ Base: id, Link: newUpdate, Tag: 'update' }]
  })
  return newUpdate
}

function logOut() {
  var id = readLoggedInId()
  commit("identity_link", {
    Links: [{ Base: App.Key.Hash, Link: id, Tag: 'identity', LinkAction: HC.LinkAction.Del }]
  })
  return true
}

function getUser() {
  var id = readLoggedInId()
  return {
    hash: id,
    pebbles: call("transactions", "tabulate", "\"" + id + "\"") || 0,
    userdata: readIdentity(id) || {}
  };
}

function getUserData(hash) {
  return {
    hash: hash,
    pebbles: call("transactions", "tabulate", "\"" + hash + "\"") || 0,
    userdata: getLinks(hash, "identity", { Load: true }) || {}
  };
}


function login(token, alias) {
  var allUsers = getLinks(App.DNA.Hash, "identity", { Load: true });
  var result = "The token you have provided does not match any on the DHT";
  allUsers.forEach(function (link) {
    var user = link.Entry;
    //TODO link.Hash is not the id hash it is the hash of the last update on the id... need to get the hash of the original object..
    //also check if we have the same problem elsewhere... 
    if (link.Hash === token || user.github === token) {
      result = connectUser(link.Hash);
      return
    };
  });
  return result;
}

function getAliasMatches() {
  var allUsers = getLinks(App.DNA.Hash, "identity", { Load: true });
  var matches = []
  allUsers.forEach(function (link) {
    var user = link.Entry
    if (user.aliases.indexOf(App.Key.Hash) > -1) { 
      matches.append(link.Hash)
    }
  })
}



/*
User flow:
 
- create user
  -create a user entry with email,password,github
  -link the user entry to the current agent/key hash
- login
  -auto login based on agent/key hash
    -if current agent/key has isn't attached to a userdata, then ask email/password and create userdata_link
    -validate userdata_link by checking email/password information with the same on the dht
  -can't login to a different account with the same agent/key hash
 
*/

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
      case "userdata":
        return true
      case "userdata_link":
        return true
      case "identity":
        return true
      case "identity_link":
        return (
          //Each Key can only be logged into one identity at a time. If you want to log into another identity you must first log out.
          ((entry.Links[0].Base === App.Key.Hash) ? ((getLinks(App.Key.Hash, "identity").length > 0) ? (entry.Links[0].LinkAction === "d" ? true : false) : (true)) : true)
        )
      case "update":
        return true
      case "update_link":
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

function validateLink(entryType, entry, header, pkg, sources) {
  switch (entryType) {
    case "identity_link":

    case "update_link":
      return true;
  }
  return false;
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
