var express = require('express');
var router = express.Router();
var dbUtils = require('./common/dbUtility');

/* GET home page. */
router.post('/', function(req, res, next) {
  var productDetails = req.body;
    dbUtils.doDbCommunication(productDetails, 'deleteOne', 'productDetails').then((response) => {
        res.send(JSON.stringify({msg: 'success'}));
    });
});

module.exports = router;
