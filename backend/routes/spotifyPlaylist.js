var express = require('express');
var router = express.Router();

var getTracksAndCreatePlaylist = require('../models/spotifyPlaylist.js').getTracksAndCreatePlaylist;

router.get('/new', function(req, res){
  // songkick API uses res.body.festivalName to get arrayOfArtists
  //res.body.festivalName
  var arrayOfArtists = req.body.arrayOfArtists;
  var festivalName = req.body.festivalName;
  getTracksAndCreatePlaylist(arrayOfArtists, req.user.userId, req.user.accessToken, festivalName);
});

module.exports = router;
