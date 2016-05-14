var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var session = require('express-session');
var passport = require('passport');
var cookeParser = require('cookie-parser');
var bodyParser = require('body-parser');

var userAuthentication = require('./routes/authentication.js');
var spotifyWebApi = require('./routes/spotifyPlaylist.js');
var ocr = require('./routes/ocr.js');
var passportSetup = require('./models/auth.js');

app.use(session({secret: "Jazzy is the cutest"}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
passportSetup();

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "http://localhost:8100");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/auth', userAuthentication);
app.use('/spotifyPlaylist', spotifyWebApi);
app.use('/poster', ocr);

app.listen(port, function(){
  console.log('Your Playfest Backend is running on port ' + port);
});

module.exports = app;
