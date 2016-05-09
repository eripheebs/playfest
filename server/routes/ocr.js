var express  = require('express');
var router   = express.Router();
var model    = require('../models/ocr.js');
var spotify = require('../models/spotifyPlaylist.js');

router.post('/', function(req,res){
  model.sendUrlToOcr(req.body.url,function(data){
      res.status(200).send(model.parseResponse(data));
  });
});

router.get('/', function(req,res){
  console.log("test route called");
  // spotify.searchForArtist('muse')
  //   .then(function(dump){
  //     console.log(dump);
  //   });
  var test = model.buildStringArray(['hello', 'there', 'howdi', 'ciao']);
  console.log(test);
});

module.exports = router;
