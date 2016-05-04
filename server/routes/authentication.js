var express  = require('express');
var router   = express.Router();
var passport = require('passport');


router.get('/new', function(req, res){
  passport.authenticate('spotify');
});

module.exports = router;
