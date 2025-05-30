var express = require("express");
var router = express.Router();
var dbUtils = require("./common/dbUtility");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var token;

router.post('/', (request, response) => { 
    console.log(process.env)
    var responseObj = {};    
    token = jwt.sign({ accountId: request.body.accountI}, process.env.JWT_SECRET);
    dbUtils.doDbCommunication({accountId: request.body.accountId}, 'find', 'userAccountDetails').then((result) => {
        if (result.length) {
            bcrypt.compare(request.body.password, result[0].password, function(err, dbreponse) {
                if (dbreponse) {
                    responseObj.status = 'Valid';
                    responseObj.token = token;
                    request.session.isUserLoggedin = true;
                } else {
                    responseObj.status = 'Invalid';
                    request.session.isUserLoggedin = false;
                }
                response.send(JSON.stringify(responseObj));
            });            
        } else {
            response.send(JSON.stringify({status: 'Invalid'}));
        }
    });    
});

module.exports = router;