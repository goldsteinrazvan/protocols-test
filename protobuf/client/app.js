var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator')
var cors = require('cors')
var protobuf = require('protobufjs');
var axios = require('axios')


var api = require('./routes/api');

var app = express();

(function (){
    setInterval( function(){
        axios.get('http://localhost:3000/proto', {responseType: 'arraybuffer'})
        .then( (response) =>{
            //console.log(response.data)
            var data = response.data
            protobuf.load('./proto/testmessage.proto', (err, root)=>{
                var TestMessage = root.lookupType('TestMessage')
                var message = TestMessage.decode(data)
                console.log(message)
            })
        })
    }, 10000)
})();


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(expressValidator())
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors())

// app.options('*', cors())

// app.use( '/api/v1', api)

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
  console.log(err)
  res.status(err.status || 500);
  res.send({errors:[{msg:'An error occured'}]});
});

module.exports = app;

