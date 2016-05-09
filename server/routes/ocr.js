var express  = require('express');
var router   = express.Router();
var model    = require('../models/ocr.js');

router.post('/', function(req,res){
  model.sendUrlToOcr(req.body.url,function(data){
    console.log(data);
  });
});

// router.post('/', function(req,res){
//   var dataToSend = stubForm;
//   dataToSend.form.url = req.body.url;
//   request.post(dataToSend, function(err,ret,body){
//     res.status(200).send(ret);
//   });
// });

module.exports = router;
