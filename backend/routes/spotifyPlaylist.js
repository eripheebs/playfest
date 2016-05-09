var express = require('express');
var router = express.Router();

var getTracksAndCreatePlaylist = require('../models/spotifyPlaylist.js').getTracksAndCreatePlaylist;

router.post('/new', function(req, res){
  var arrayOfArtists = req.body.arrayOfArtists;
  var playlistName = req.body.playlistName;
  getTracksAndCreatePlaylist(arrayOfArtists, req.user.userId, req.user.accessToken, playlistName);
});

module.exports = router;
