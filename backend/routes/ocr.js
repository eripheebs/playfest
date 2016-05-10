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
  var dummyUrl = 'http://cdn2.theweek.co.uk/sites/theweek/files/2016/03/16lup800pxwidea_0.jpg';
  model.parseImage(dummyUrl)
    .then(function(result) {
      console.log(result);
      res.status(200).send(result);
    });
});

module.exports = router;
