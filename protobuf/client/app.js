var express = require('express');
var protobuf = require('protobufjs');
var axios = require('axios')

var app = express();

protobuf.load('./proto/testmessage.proto', (err, root)=>{
    var TestMessage = root.lookupType('TestMessage')
        setInterval( function(){
            axios.get('http://localhost:3000/proto', {responseType: 'arraybuffer'})
            .then( (response) =>{
                //console.log(response.data)
                var data = response.data
                var message = TestMessage.decode(data)
                message = TestMessage.toObject(message)
                console.log(message)
            })
        }, 10000)
    
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

