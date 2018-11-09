const WebSocket = require('ws')
const connection = new WebSocket('ws://localhost:8080')

connection.on('open', (data)=>{
    console.log('----- Connected to Server -------')
    connection.send(data)
})

connection.on('message', (data)=>{
    console.log(JSON.parse(data))
})

