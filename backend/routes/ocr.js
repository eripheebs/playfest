var express  = require('express');
var router   = express.Router();
var model    = require('../models/ocr.js');
var multer  = require('multer');
var upload = multer();

router.post('/',upload.single('poster'), function(req,res){
  model.parseImage(req.file)
    .then(function(artistList) {
      res.status(200).send(artistList);
      //call playlist_creation(artistList) here.
    });
});

module.exports = router;
