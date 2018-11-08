function genesis() {
  return true;
}

function validateCommit() {
  return true;
}

function validatePut() {
  return true;
}

function validateLink() {
  return true;
}

function holoTextWrite(text) {
  var hash = commit('holoText', text);
  console.log('hash: ' + hash)
  var link = commit('text_links', {
    Links: [{ Base: App.DNA.Hash, Link: hash, Tag: "texts" }]
  });
  console.log("link: " + link)
  return hash;
}

function holoTextRead(hash) {
  // var holoText = get(hash, { Local: true });
  var holoText = get(hash);
  return holoText;
}

function allTextsRead() {
  var links = getLinks(App.DNA.Hash, "texts", { Load: true });
  console.log("links: " + JSON.stringify(links))
  return { links: links };
}
