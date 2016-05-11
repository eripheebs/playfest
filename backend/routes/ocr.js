var express  = require('express');
var router   = express.Router();
var model    = require('../models/ocr.js');
var multer  = require('multer');
var upload = multer();
var FormData = require('form-data');
var request = require('request');
var ocrKey = process.env.OCR_KEY;
var rest = require('restler');

router.post('/',upload.single('poster'), function(req,res){
  model.parseImage(req.file)
    .then(function(artistList) {
      res.status(200).send(artistList);
      //call playlist_creation(artistList) here.
    });
});

router.post('/test',upload.single('file'), function(req,res){
  console.log('bounce file', req.file);
  console.log('bounce body', req.body);
  console.log('BREAKBREAKBREAK');
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
