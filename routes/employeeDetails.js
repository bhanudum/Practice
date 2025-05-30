var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/', function(req, res, next) {
    var userQuery = req.body;

    console.log(userQuery)
    
    var employeeDetails = [
        {
            name: 'Raj',
            age: 20,
            gender: 'Male'
        },
        {
            name: 'Teena',
            age: 26,
            gender: 'Female'
        }
    ];

    var responseObj = [];
    if (userQuery.gender) {
        employeeDetails.forEach((employee) => {
            if (employee.gender == userQuery.gender) {
                responseObj.push(employee);
            }
        })
    } else {
        responseObj = employeeDetails;
    }
    res.send(JSON.stringify(responseObj));
});

module.exports = router;
