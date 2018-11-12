const WebSocket = require('ws')
const connection = new WebSocket('ws://localhost:8080')

//send a message when connected to server
connection.on('open', (data)=>{
    console.log('----- Connected to Server -------')
    connection.send(data)
})

//receive incoming messages and log them
connection.on('message', (data)=>{
    console.log(JSON.parse(data))
})

