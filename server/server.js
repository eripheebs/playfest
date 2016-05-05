var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');

var sendToClientRoutes = require('./routes/sendToClient.js');
var userAuthentication = require('./routes/authentication.js');


var client_id     = "873379a32a354918b0a54f4f79736716";
var client_secret = process.env.CLIENT_SECRET;

app.use(session({secret: "Jazzy is the cutest"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use('/', sendToClientRoutes);
app.use('/auth', userAuthentication);


app.listen(port, function(){
  console.log('Your Playfest Backend is running on port ' + port);
});

passport.use(new SpotifyStrategy ({
  clientID: client_id,
  clientSecret: client_secret,
  callbackURL: "http://localhost:5000/auth/callback"
},
function(accessTok, refreshToken, spotifyProfile, done) {
  var user = {
    displayName: spotifyProfile.displayName,
    userId: spotifyProfile.id,
    accessToken: accessTok
  };
  return done(null, user);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = app;
