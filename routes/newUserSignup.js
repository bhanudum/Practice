var express = require("express");
var router = express.Router();
var dbUtils = require("./common/dbUtility");
const bcrypt = require('bcrypt');
console.log("frm signup")
    var randomNo = Math.floor(Math.random() * 10)
    console.log(randomNo)

router.post('/', async (req, res) => {
    var resObj = {};
    var userAccountDetails = req.body;
    try {
        // Check for existing email or mobile number
        const duplicateUser = await dbUtils.doDbCommunication({
            $or: [
                { email: userAccountDetails.email },
                { mobile: userAccountDetails.mobile }
            ]
        }, 'find', 'userAccountDetails');

        if (duplicateUser && duplicateUser.length > 0) {
            if (duplicateUser.some(u => u.email === userAccountDetails.email)) {
                resObj.msg = 'already email id is existing';
            } else {
                resObj.msg = 'mobile number already exists';
            }
            return res.send(JSON.stringify(resObj));
        }

        bcrypt.hash(userAccountDetails.password, 5, function(err, hash) {
            if (err) {
                resObj.msg = 'Error';
                return res.send(JSON.stringify(resObj));
            }
            userAccountDetails.password = hash;
            dbUtils.doDbCommunication(userAccountDetails, 'insertOne', 'userAccountDetails').then((result) => {
                if(!result) {
                    resObj.msg = 'Error';
                } else {
                    resObj.msg = 'Done';
                }
                res.send(JSON.stringify(resObj));
            }).catch((err) => {
                resObj.msg = 'Error';
                res.send(JSON.stringify(resObj));
            });
        });
    } catch(err) {
        console.log(err);
        resObj.msg = 'Error';
        res.send(JSON.stringify(resObj));
    }
});


module.exports = router;