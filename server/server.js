var express = require('express')
var app = express();
var port = process.env.PORT || 5000;

app.get('/', function(req, res){
  console.log('Jazzy is the cutest!');
  res.sendStatus(200);
});

app.listen(port, function(){
  console.log('Your Playfest Backend is running on port ' + port);
});

module.exports = app;
