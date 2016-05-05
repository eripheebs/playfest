var express = require('express');
var router = express.Router();

var newPlaylist = require('../modules/spotifyPlaylist.js').newPlaylist;
var saveAccessTokenForPlaylist = require('../modules/spotifyPlaylist.js').saveAccessTokenForPlaylist;

router.get('/new', function(req, res){
  // songkick API uses res.body.festivalName to get arrayOfArtists
  //res.body.festivalName
  newPlaylist(req.user.userId, req.user.accessToken, "Glastonbury", ["Beyonce", "Coldplay"]);
});

module.exports = router;
