var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

var sendToClientRoutes = require('./routes/sendToClient.js');
var userAuthentication = require('./routes/authentication.js');


var client_id     = "873379a32a354918b0a54f4f79736716";
var client_secret = "433083b384654bbb84ea7a1712470313";

app.use(passport.initialize());
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
function(accessToken, refreshToken, spotifyProfile, done) {
  return done(null, spotifyProfile);
}));

module.exports = app;
