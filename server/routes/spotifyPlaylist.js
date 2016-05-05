var express = require('express');
var router = express.Router();

var createPlaylist = require('../modules/spotifyPlaylist.js').createPlaylist;

router.get('/new', newPlaylist(username, festivalName, arrayofArtists));

module.exports = router;
