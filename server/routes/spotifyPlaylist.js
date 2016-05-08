var express = require('express');
var router = express.Router();

var getTracksAndCreatePlaylist = require('../models/spotifyPlaylist.js').getTracksAndCreatePlaylist;

router.get('/new', function(req, res){
  // songkick API uses res.body.festivalName to get arrayOfArtists
  //res.body.festivalName
  getTracksAndCreatePlaylist(["Arch Enemy", "In Flames", "Insomnium", "Eskimo Callboy", "The Prodigy", "NOFX", "Slipknot", "Foo Fighters", "Rise Against"], req.user.userId, req.user.accessToken, "Superhot Festival 4");
});

module.exports = router;
