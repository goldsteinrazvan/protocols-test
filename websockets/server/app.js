var testdata = require('./utils/testdata')

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

var sentMessages = 0;

wss.on('connection', function connection(ws) {
    // Broadcast to clients every 10 seconds
    setInterval(function timeout() {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(testdata));
                messageSent();
            }
          });
      }, 10000);
    
});

//send message when client connects
wss.on('connection', function connection(ws){
    ws.on('message', function incoming(message){
        ws.send(JSON.stringify(testdata))
        messageSent();
    })
})

//increase the amount of sent messages and log the amount
function messageSent(){
    sentMessages++;
    console.log(" >>>> Message sent <<<<")
    console.log(" Number of sent messages: " + sentMessages)
}
