var express  = require('express');
var router   = express.Router();
var model    = require('../models/ocr.js');

router.post('/', function(req,res){
  model.parseImage(req.body.url)
    .then(function(output) {
      res.status(200).send(output);
    });
});

router.get('/', function(req,res){
  console.log("THIS IS A DEBUGGING ROUTE");

  // model.searchSpotifyForArtist('lady gaga')
  //   .then(function(output) {
  //     console.log('resolve');
  //       res.send(output);
  //     });

  var array = [ {
    size: 18,
    words: [
      "biffy",
      "clyro",
      "fall",
      "out",
      "boy"
    ]
  },
  {
    size: 18,
    words: [
      "red",
      "hot",
      "chili",
      "peppers"
    ]
  }
];



  model.testSearch(array).then(function(result){
    console.log(result);
    res.send(result);
  })

  // var url = 'http://www.neverenoughnotes.co.uk/wp-content/uploads/2015/12/Download-2016-December-Announcement-1000x1000_No-Website.jpg';
  //
  // model.parseImage(url)
  //   .then(function(output) {
  //     res.send(output);
  //   });

});

module.exports = router;
