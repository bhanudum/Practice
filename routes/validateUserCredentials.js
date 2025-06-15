var express = require("express");
var router = express.Router();
var dbUtils = require("./common/dbUtility");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var token;

router.post('/', (request, response) => {
    console.log(process.env)
    var responseObj = {};
    token = jwt.sign({ accountId: request.body.accountId }, process.env.JWT_SECRET);
    dbUtils.doDbCommunication({ accountId: request.body.accountId }, 'find', 'userAccountDetails').then((result) => {

        //console.log("User record from DB:", result[0]);
        if (result.length) {
            bcrypt.compare(request.body.password, result[0].password, function (err, dbreponse) {
                if (dbreponse) {
                    responseObj.status = 'Valid';
                    responseObj.token = token;
                    request.session.isUserLoggedin = true;


                    responseObj.user = {
                        userId: result[0]._id,
                        accountId: result[0].accountId,
                        email: result[0].mailId,
                        mobile: result[0].mobileNumber,
                        dob: result[0].dob,
                        address: result[0].address

                    };

                } else {
                    responseObj.status = 'Invalid';
                    request.session.isUserLoggedin = false;
                }
                response.send(JSON.stringify(responseObj));
            });
        } else {
            response.send(JSON.stringify({ status: 'Invalid' }));
        }
    });
});

module.exports = router;