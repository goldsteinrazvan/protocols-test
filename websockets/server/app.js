var testdata = require('./utils/testdata')

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    // Broadcast to everyone else.
    setInterval(function timeout() {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(testdata));
            }
          });
      }, 10000);
    
});

//for testing purposes only
wss.on('connection', function connection(ws){
    ws.on('message', function incoming(message){
        ws.send(JSON.stringify(testdata))
    })
})

