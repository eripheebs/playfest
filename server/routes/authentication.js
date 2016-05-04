var express  = require('express');
var router   = express.Router();
var passport = require('passport');

router.get('/new', passport.authenticate('spotify'));

router.get('/callback', passport.authenticate('spotify', { session: false }), function(req, res){
  res.send(200);
});

module.exports = router;
