var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify({isLoggedin: req.session.isUserLoggedin}));
});

module.exports = router;
