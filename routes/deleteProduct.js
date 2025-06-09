var express = require('express');
var router = express.Router();
var dbUtils = require('./common/dbUtility');
const { ObjectId } = require("mongodb");

/* GET home page. */
router.post('/', function(req, res, next) {
  //var productDetails = req.body;
   var productId = req.body._id;
   if (!productId || !ObjectId.isValid(productId)) {
        return res.status(404).json({ msg: 'Product is not found' });
    }
   
   dbUtils.doDbCommunication({ _id: new ObjectId(productId) }, 'deleteOne', 'productDetails').then((response) => {
        res.send(JSON.stringify({msg: 'success'}));
    });
    
});

module.exports = router;





