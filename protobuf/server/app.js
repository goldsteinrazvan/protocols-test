var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator')
var cors = require('cors')

//load protobuf library and static JSON
var protobuf = require('protobufjs');
var testdata = require('./utils/testdata')
var TestMessage;

var app = express();

//compile protobuf schema to use it later when encoding and decoding message
protobuf.load('./proto/testmessage.proto', (err, root) => {
    TestMessage = root.lookupType('TestMessage')
})

//setup middlewares to use
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.options('*', cors())

//route to send the static JSON protobuf encoded
app.get('/proto', (req, res)=>{
    var payload = testdata
    var errMsg = TestMessage.verify(payload)
    if (errMsg){
        throw Error(errMsg)
    }

    var message = TestMessage.create(payload)
    var buffer = TestMessage.encode(message).finish();
    res.send(buffer)
})

//route to send static JSON as it is. Used for benchmarking
app.get('/regular', (req, res)=>{
    res.send(testdata)
})

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

