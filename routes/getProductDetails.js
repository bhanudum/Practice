var express = require('express');
var router = express.Router();
var dbUtils = require("./common/dbUtility");
var jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    console.log("userRequst in produt dettail");
    console.log(req.body);


    var userPassedJwtToken = req.headers['authorization'] ? req.headers['authorization'] : '';
    userPassedJwtToken = userPassedJwtToken.replace('Bearer ', '');

    jwt.verify(userPassedJwtToken, process.env.JWT_SECRET, (err, data) => {
        if (data) { // authorized user with valid token
            var productDetails = [];    
            var userQuery = {};
            if (Object.keys(req.body).length) { // user passed some query
                userQuery.price = {
                    '$gt': parseInt(req.body.priceRange)
                }
                if (req.body.categoryList.length) {
                    userQuery.category = {
                        '$in': req.body.categoryList
                    }
                }
            } 

            dbUtils.doDbCommunication(userQuery, 'find', 'productDetails').then((result) => {
                productDetails = result;
                res.send(JSON.stringify(productDetails));
            });
        } else { // invalid user with invalid token
            res.send(JSON.stringify({'msg': 'Unauthorized user________________'}));
            console.log(jwtToken);
        }
    });    
});

module.exports = router;