var express  = require('express');
var router   = express.Router();
var model    = require('../models/ocr.js');

router.post('/', function(req,res){
  model.sendUrlToOcr(req.body.url,function(data){
      res.status(200).send(model.parseResponse(data));
  });
});

router.get('/', function(req,res){
  console.log("test route called");

  var url = 'http://www.neverenoughnotes.co.uk/wp-content/uploads/2015/12/Download-2016-December-Announcement-1000x1000_No-Website.jpg';

  model.parseImage(url)
    .then(function(output) {
      res.send(output);
    });

  // model.sendUrlToOcr(url)
  //   .then(function(dump){
  //     console.log('promised with', dump);
  //     var t = model.parseLines(dump);
  //     console.log('back with ', t);
  //     res.send(t);
  //     console.log('nope.');
  //   });
  
  // spotify.searchForArtist('muse')
  //   .then(function(dump){
  //     console.log(dump);
  //   });
  // var test = model.buildStringArray(['hello', 'there', 'howdi', 'ciao']);
  // // console.log(test);

  // model.findArtists(['muse','the','beatles','adele'],3,1)
  //   .then(function(dump){
  //     dump.forEach(function(val,ind){
  //       console.log("le", ind, " ", val.length);
  //     });
  //   });
  // var result;
  // var url = 'https://consequenceofsound.files.wordpress.com/2016/03/glastonbury-2016.png';
  // model.sendUrlToOcr(url,function(data){
  //   var parsed = model.parseResponse(data);
  //   // res.send(parsed);
  //   model.findArtists(parsed,4,5,62)
  //     .then(function(result){
  //       res.send(result);
  //     });
  // });

});

module.exports = router;
