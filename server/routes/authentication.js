var express  = require('express');
var router   = express.Router();
var passport = require('passport');

router.get('/new', passport.authenticate('spotify'));

router.get('/callback', passport.authenticate('spotify', { session: false }), function(req, res){
  console.log(req.user);
  res.redirect('/');
});

module.exports = router;
