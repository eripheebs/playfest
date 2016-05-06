var express = require('express');
var router = express.Router();

var getTracksAndCreatePlaylist = require('../models/spotifyPlaylist.js').getTracksAndCreatePlaylist;

router.get('/new', function(req, res){
  // songkick API uses res.body.festivalName to get arrayOfArtists
  //res.body.festivalName
  getTracksAndCreatePlaylist(["Beyonce", "Coldplay"], req.user.userId, req.user.accessToken, "Glastonbury");
});

module.exports = router;
