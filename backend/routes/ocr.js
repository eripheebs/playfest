var express  = require('express');
var router   = express.Router();
var model    = require('../models/ocr.js');
var multer  = require('multer');
var upload = multer();
var FormData = require('form-data');
var request = require('request');
var ocrKey = process.env.OCR_KEY;
var rest = require('restler');

var requestForm = {
  url: 'https://api.ocr.space/parse/image',
  // url: 'http://localhost:5000/poster/test',
  formData: {
    apikey: ocrKey,
    isOverlayRequired: 'true'
  }
};

router.post('/',upload.single('poster'), function(req,res){
  // console.log("start", req.file);
  var r = request.post(requestForm.url, function (err,data) {
    console.log("request done");
    res.status(200).send(data.body);
  });
  var form = r.form();
  form.append('file', req.file.buffer, {
    filename: req.file.originalname,
    contentType: req.file.mimetype
  });
  form.append('apikey',ocrKey);
  form.append('isOverlayRequired', 'true');
  // var form = new FormData();
  // form.append('apikey',ocrKey);
  // form.append('file',req.file.buffer);
  // form.submit('http://localhost:5000/poster/test',function(e,d){});
  // requestForm.formData.file = req.file;
  // request.post(requestForm,function(e,d){});
  //   rest.post(requestForm.url, {
  //   multipart: true,
  //   apikey: ocrKey,
  //   isOverlayRequired: 'true',
  //   file: req.file.buffer
  // }).on('complete', function(data) {
  //   console.log('done');

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
