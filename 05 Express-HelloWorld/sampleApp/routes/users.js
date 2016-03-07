var express = require('express');
var router = express.Router();

// middleware to use for all required authentication requests
router.use(function (req, res, next) {
	next();
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
