var express = require('express');
var router = express.Router();

var getTracksAndCreatePlaylist = require('../modules/spotifyPlaylist.js').getTracksAndCreatePlaylist;

router.get('/new', function(req, res){
  // songkick API uses res.body.festivalName to get arrayOfArtists
  //res.body.festivalName
  getTracksAndCreatePlaylist(["Arch Enemy", "In Flames", "Insomnium", "Eskimo Callboy", "The Prodigy", "NOFX", "Three Days Grace", "Slipknot", "Foo Fighters", "Rise Against"], req.user.userId, req.user.accessToken, "an actual decent festival");
});

module.exports = router;
