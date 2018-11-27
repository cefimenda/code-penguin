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
  var entryTypes = ["account", "account_link", "userdata", "userdata_link", "login_link"];
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

function connectUser(id) {
  //If already connected to an account log out
  if (getLinks(App.Key.Hash, 'account') > 0) { logOut() }
  //create new connection to the account that the user is logging in to

  //link to get to logged in account
  var loggedInLink = commit('account_link', {
    Links: [{ Base: App.Key.Hash, Link: id, Tag: 'account' }]
  });
  //link to get to all keys that are logged into an account
  var loggedInKeysLink = commit('account_link', {
    Links: [{ Base: id, Link: App.Key.Hash, Tag: 'account' }]
  });

  //link to get to all accounts that a key can log in to
  var loggableLink = commit('account_link', {
    Links: [{ Base: App.Key.Hash, Link: id, Tag: 'loggable' }]
  });
  //link to get to all keys that can log into an account
  var aliasLink = commit('account_link', {
    Links: [{ Base: id, Link: App.Key.Hash, Tag: 'loggable' }]
  });

  return getUser();
}


/****************************************
 * USER Functions With Endpoints
****************************************/

//Checks if a user's public key is listed under the aliases of the account the user is logged in to

function isAuthorized(key) {
  var id = readLoggedInId(key)
  var aliases = getLoggables(id)
  var result;
  aliases.forEach(function (alias) {
    if (alias.Hash === key) {
      result = true;
    }
  });
  if (result) {
    return result;
  } else {
    console.log("INVALID LOGIN SPOTTED __ LOGGING OUT")
    logOut()
    return false;
  }
}

/******************
 account:  {
            username: (username),
            github: (github oAuth token) - Optional
            login:{
                email:email,
                password:password
              } -- login can be any object, login will not be saved into the entry
            } 
******************/

//returns id hash
function createAccount(data) {
  //removing login information from the inserted argument
  var login = data.login
  delete data.login

  //create new account
  data.origin = App.Key.Hash;
  addTimestamp(data)
  var id = commit('account', data);

  //add this id as a link to DNA
  var idLinkDNA = commit('account_link', {
    Links: [{ Base: App.DNA.Hash, Link: id, Tag: 'account' }]
  });
  //connect user to create loggable and account links
  connectUser(id);

  //create a login token linked to the id
  createLoginToken(id, login)

  return id
}

//returns id hash
function readLoggedInId(key) {
  var key = key || App.Key.Hash
  return getLinks(key, 'account')[0].Hash
}


/******************
loggable:   {
            base: (the base hash that the loggable link is committed on),
            target: (the hash that you want to remove from the base)
             }
******************/
//can be used to remove any type of loggables
function removeLoggable(loggable) {
  commit("account_link", {
    Links: [{ Base: loggable.base, Link: loggable.target, Tag: 'loggable', LinkAction: HC.LinkAction.Del }]
  });
  return true
}
//removes current key from the currently logged in id by default. Also can be used to remove any other key from the logged in id.
function removeAlias(key) {
  var key = key || App.Key.Hash;
  var id = readLoggedInId();
  commit("account_link", {
    Links: [{ Base: id, Link: key, Tag: 'loggable', LinkAction: HC.LinkAction.Del }]
  })
  return true
}

//returns list of loggables
function getLoggables(id) {
  return getLinks(id, "loggable")
}

//returns account with most up to date information
function getData(id) {
  var id = id || readLoggedInId();
  var userdatas = getLinks(id, "userdata", { Load: true })

  //sort userdatas according to date of Entry
  userdatas.sort(function (a, b) {
    return a.Entry.time - b.Entry.time
  });
  var sorted = userdatas

  //start from the first account and apply all changes on userdatas
  var account = get(id)
  sorted.forEach(function (data) {
    var entry = data.Entry
    account[entry.type] = entry.data
  })

  return account
}

/******************
userdata: {
            type: (github,username, etc.),
            data: (github oAuth token, some username, etc.)
          } 
******************/
function createUserdata(userdata) {
  addTimestamp(userdata)
  var id = readLoggedInId()

  var newUserdata = commit('userdata', userdata);
  var userdataLink = commit('userdata_link', {
    Links: [{ Base: id, Link: newUserdata, Tag: 'userdata' }]
  });

  return getData();
}

function logOut() {
  try {
    var id = readLoggedInId()
    commit("account_link", {
      Links: [{ Base: App.Key.Hash, Link: id, Tag: 'account', LinkAction: HC.LinkAction.Del }]
    });
    console.log("logging out")
    return true
  } catch (err) {
    console.log(err)
    return "You need to be logged in to log out."
  }
}

function getUser(id) {
  var id;
  if (id) {
    id = id
  } else {
    try {
      id = readLoggedInId()
    } catch (err) {
      console.log(err)
      return "You are not logged in."
    }
  }
  try {
    return {
      hash: id,
      aliases: getLoggables(id),
      pebbles: call("transactions", "tabulate", "\"" + id + "\"") || 0,
      userdata: getData(id) || {}
    };
  } catch (err) {
    console.log(err);
    return "Error occured, check consoles for details. If you are passing an ID in, make sure that the id is a valid hash"
  }
}

/******************
login: {
            email: email address,
            password: password
          } 

    PS. It actually can be any object since we are only using the hash of it on a link without making a real entry.
******************/
function login(loginData) {
  var login = makeHash("login", loginData);
  var allUsers = getLinks(App.DNA.Hash, "account", { Load: true });
  var result = "The token you have provided does not match any on the DHT";
  allUsers.forEach(function (link) {
    var userLogin = readLoginToken(link.Hash)
    if (userLogin === login) {
      result = connectUser(link.Hash);
      console.log("logging in to: " + link.Hash)
      return
    };
  });
  return result;
}

function autoLogin() {
  var loggables = getLoggables(App.Key.Hash);
  if (loggables.length === 1 && ((getLoggables(loggables[0].Hash)).map(function (item) { return item.Hash }).indexOf(App.Key.Hash) > -1)) {
    return login(loggables[0].Hash);
  }
  else {
    return false
  }
}
function test() {
  logOut()
  var id = createAccount({ username: "cefimenda" })
  console.log("reading Login Token:" + readLoginToken(id))
  var newToken = (updateLoginToken(id, { email: "booo", password: "newPass" }))
  console.log("newToken: " + newToken)
  console.log("reading new Login Token: " + readLoginToken(id))
}

function updateLoginToken(newLogin) {
  var id = readLoggedInId();
  var removeLink = commit("login_link", {
    Links: [{ Base: id, Link: readLoginToken(id), Tag: "login", LinkAction: HC.LinkAction.Del }]
  });
  return createLoginToken(id, newLogin)
}

/*******************************************************************************
 * Private Functions for Secure Login Data
 ******************************************************************************/

/******************
login: {
            email: email address,
            password: password
          } 

    PS. It actually can be any object since we are only using the hash of it on a link without making a real entry.
******************/
function createLoginToken(id, login) {
  var loginHash = makeHash("login", login)

  var loginLink = commit("login_link", {
    Links: [{ Base: id, Link: loginHash, Tag: "login" }]
  });

  return loginLink
}
function readLoginToken(id) {
  if (getLinks(id, "login")[0]) {
    return getLinks(id, "login")[0].Hash
  } else {
    return ""
  }
}


function isDuplicateLogin(loginToken) {
  var allUsers = getLinks(App.DNA.Hash, "account", { Load: true })
  var isDuplicate;
  allUsers.forEach(function (user) {
    var id = user.Hash
    var thisToken = readLoginToken(id);
    if (thisToken === loginToken) { isDuplicate = true }
    return
  });
  if (isDuplicate) {
    console.log("There is already an identical email/password combination on the DHT")
    return isDuplicate
  }
  else { return false }
}
function howManyDuplicateLogin(loginToken) {
  var allUsers = getLinks(App.DNA.Hash, "account", { Load: true })
  var duplicateCount = 0;
  allUsers.forEach(function (user) {
    var id = user.Hash
    var thisToken = readLoginToken(id);
    if (thisToken === loginToken) { duplicateCount += 1 }
    return
  });
  return duplicateCount
}


/*******************************************************************************
 * Required callbacks
 ******************************************************************************/

/**
 * System genesis callback: Can the app start?
 *
 * Executes just after the initial genesis entries are committed to your chain
 * (1st - DNA entry, 2nd account entry). Enables you specify any additional
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
      case "account":
        return true
      case "account_link":
        return (
          //Each Key can only be logged into one account at a time. If you want to log into another account you must first log out.
          (entry.Links[0].Tag === "account") ? ((entry.Links[0].Base === sources[0]) ? ((getLinks(sources[0], "account").length > 0) ? (entry.Links[0].LinkAction === "d" ? true : false) : (true)) : true) : (true)
        )
      case "userdata":
        return true
      case "userdata_link":
        return true
      case "login_link":
        return (
          //Delete action should pass no matter what
          entry.Links[0].LinkAction === "d" ||
          //Each id can only have one login linked to it at a time
          getLinks(entry.Links[0].Base, "login").length === 0 &&
          //if the same email password combination already exists somewhere else on the DHT you can't use that combination.
          !isDuplicateLogin(entry.Links[0].Link)
        )
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
  switch (entryType) {
    case "login_link":
      console.log("the base of " + entry.Links[0].Base + " has " + getLinks(entry.Links[0].Base, "login").length + " logins")
      console.log("this login token appears in " + howManyDuplicateLogin(entry.Links[0].Link) + " accounts")
      return (
        //Delete action should pass no matter what
        entry.Links[0].LinkAction === "d" ||
        //Each id can only have one login linked to it at a time
        getLinks(entry.Links[0].Base, "login").length === 1 &&
        //if the same email password combination already exists somewhere else on the DHT you can't use that combination.
        howManyDuplicateLogin(entry.Links[0].Link) === 1
      )
  }
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
    case "account_link":
      return true;
    case "userdata_link":
      return true;
    case "login_link":
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
