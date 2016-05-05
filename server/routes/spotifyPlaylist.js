var express = require('express');
var router = express.Router();

var newPlaylist = require('../modules/spotifyPlaylist.js').newPlaylist;
var getListOfTrackIDs = require('../modules/spotifyPlaylist.js').getListOfTrackIDs;

router.get('/new', function(req, res){
  // songkick API uses res.body.festivalName to get arrayOfArtists
  //res.body.festivalName
  getListOfTrackIDs(["Beyonce", "Coldplay"])
  newPlaylist(req.user.userId, req.user.accessToken, "Glastonbury", ["spotify:track:1301WleyT98MSxVHPZCA6M"]);
});

module.exports = router;
