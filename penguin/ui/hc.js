

post("/fn/tasks/readAllTasks", {}, function (response) {
    console.log(response)
})

this.sampleTask = {
    "title": "title",
    "description": "some stuff here",
    "pebbles": 50
}
function post(address, payload, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('POST', address, true)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText)
        }
    }
    xhr.send(JSON.stringify(payload))
}