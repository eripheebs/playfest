var express = require('express');
var router = express.Router();

var getTracksAndCreatePlaylist = require('../models/spotifyPlaylist.js').getTracksAndCreatePlaylist;

var loginError = "You must be logged in";

router.post('/new', function(req, res){
  var arrayOfArtists = req.body.arrayOfArtists;
  var playlistName = req.body.playlistName;
  if (_userNotLoggedIn(req.user)) { res.send(loginError); };
  getTracksAndCreatePlaylist(arrayOfArtists, req.user.userId, req.user.accessToken, playlistName)
    .then(function(confData){
      res.send(confData);
    })
});

_userNotLoggedIn = function(user){
  return (user == undefined);
}

module.exports = router;
