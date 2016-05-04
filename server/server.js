var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var sendToClientRoutes = require('./routes/sendToClient.js');

app.use('/', sendToClientRoutes);

app.listen(port, function(){
  console.log('Your Playfest Backend is running on port ' + port);
});

module.exports = app;
