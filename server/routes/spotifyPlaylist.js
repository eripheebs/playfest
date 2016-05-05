var express = require('express');
var router = express.Router();

var newPlaylist = require('../modules/spotifyPlaylist.js').newPlaylist;
var getTrackIDArray = require('../modules/spotifyPlaylist.js').getTrackIDArray;

router.get('/new', function(req, res){
  // songkick API uses res.body.festivalName to get arrayOfArtists
  //res.body.festivalName
  getTrackIDArray(["Beyonce", "Coldplay"])
    .then(function(arrayOfArtists){
      newPlaylist(req.user.userId, req.user.accessToken, "Glastonbury", arrayOfArtists);
    });
});

module.exports = router;
