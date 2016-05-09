var express  = require('express');
var router   = express.Router();
var model    = require('../models/ocr.js');

router.post('/', function(req,res){
  model.sendUrlToOcr(req.body.url,function(data){
      res.status(200).send(model.parseResponse(data));
  });
});

module.exports = router;
