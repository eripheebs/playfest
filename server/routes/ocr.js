var express  = require('express');
var request = require('request');
var router   = express.Router();

var ocrKey = process.env.OCR_KEY;

var requestForm = {
  url: 'https://api.ocr.space/parse/image',
  form: {
    apikey: ocrKey
  }
};

router.post('/', function(req,res){
  var dataToSend = requestForm;
  dataToSend.form.url = req.body.url;
  request.post(dataToSend, function(err,ret,body){
    res.status(200).send(ret);
  });
});

module.exports = router;
