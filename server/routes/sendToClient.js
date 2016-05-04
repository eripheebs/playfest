var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
 console.log('Jazzy is the cutest!');
 res.sendStatus(200);
});

module.exports = router;
