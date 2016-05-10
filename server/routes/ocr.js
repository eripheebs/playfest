var express  = require('express');
var router   = express.Router();
var model    = require('../models/ocr.js');

router.post('/', function(req,res){
  model.parseImage(req.body.url)
    .then(function(output) {
      res.status(200).send(output);
    });
});

module.exports = router;
