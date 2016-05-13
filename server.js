var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var server = express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

server.use(express.static(__dirname + '/app'));
server.get('/', function(req, res){
  res.sendFile('index.html')
})

server.listen(3000, function(){
  console.log('running on port 3000')
})
