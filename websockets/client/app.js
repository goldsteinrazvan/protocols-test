const WebSocket = require('ws')
const connection = new WebSocket('ws://localhost:3000')

connection.on('open', (data)=>{
    console.log('connected')
    connection.send('data')
})

connection.on('message', (data)=>{
    log(data)
    //connection.send('data')
})

// var io = require('socket.io-client')
// var socket = io.connect('http://localhost:3000', {reconnect:true})

// socket.on('connect', function (socket) {
//     console.log('Connected!');
// });

// socket.on('news', function(data){
//     console.log(data)
// })
 
// socket.emit('event', {data:true});
