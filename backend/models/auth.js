var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;

var client_id     = "873379a32a354918b0a54f4f79736716";
var client_secret = process.env.CLIENT_SECRET;
var cookieParser = require('cookie-parser');

var initSequence = function() {

  passport.use(new SpotifyStrategy ({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: "http://localhost:5000/auth/callback"
  },
  function(accessTok, refreshToken, spotifyProfile, done) {
    var user = {
      displayName: spotifyProfile.displayName,
      username: spotifyProfile.username,
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

};

module.exports = initSequence;
