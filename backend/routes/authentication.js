var express  = require('express');
var router   = express.Router();
var passport = require('passport');

router.get('/new', passport.authenticate('spotify', {scope: ['playlist-read-private','playlist-modify-private','playlist-modify-public']}));

router.get('/callback', passport.authenticate('spotify'), function(req, res){
  res.redirect('http://localhost:8100/');
});

module.exports = router;
