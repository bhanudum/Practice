var express = require("express");
var router = express.Router();
var dbUtils = require("./common/dbUtility");
const bcrypt = require('bcrypt');
console.log("frm signup")
    var randomNo = Math.floor(Math.random() * 10)
    console.log(randomNo)

router.post('/', (req, res) => {
    var resObj = {};
    var userAccountDetails = req.body;
    try {   

        
        bcrypt.hash(userAccountDetails.password, 5, function(err, hash) {
            // Store hash in your password DB.
            userAccountDetails.password = hash;
            dbUtils.doDbCommunication(userAccountDetails, 'insertOne', 'userAccountDetails').then((result) => {
                console.log(result);
                if(!result) {
                    resObj.msg = 'Error';

                } else {
                    resObj.msg = 'Done';
                }
                res.send(JSON.stringify(resObj));
            }).catch((err) => {
                
            });
        });
    } catch(err) {
        console.log(err)
    }
});


module.exports = router;