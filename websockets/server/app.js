var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator')
var cors = require('cors')

var generator = require('./utils/generator')

var api = require('./routes/api');

var app = express();

// var server = require('http').Server(app)
// var io = require('socket.io')(server)

// server.listen(3000)

var WebSocket = require('ws');

var wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', function connection(ws) {
    // Broadcast to everyone else.
    setTimeout(function timeout() {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                var data = generator.generateJSON();
                client.send(JSON.stringify(data));
            }
          });
      }, 10000);
    
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.options('*', cors())


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

// io.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('event', function (data) {
//       console.log(data);
//     });
//   });
   

app.use( '/api/v1', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({errors:[{msg:'An error occured'}]});
});

module.exports = app;

