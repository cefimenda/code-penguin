

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

function populate() {
    post("/fn/tasks/readAllTasks", {}, function (response) {
        var target = $(".allTasksDump")
        console.log(typeof response)
        console.log(response)
        console.log(JSON.parse(response))
        var arr = JSON.parse(response).links
        console.log(arr)
        for (var i in arr) {
            console.log(arr[i])
            var task = arr[i]
            target.append("<h5>" + JSON.stringify(arr[i])+ "</h5>")
        }
    })
}