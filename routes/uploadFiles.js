var express = require('express');
var router = express.Router();

var multer = require('multer');
var path = require('path');
var file_path;
const storage=multer.diskStorage({

    destination: function(req, file, callback) {
        callback(null, './public/images/products');
    },

    filename: function(req, file, callback) {
        const ext = path.extname(file.originalname);
        file_path='productimage_'+ Date.now() + ext;
        callback(null, file_path);
    }
});
var upload = multer({ storage: storage }).single('prodImage');
/* GET home page. */
router.post('/', function(req, res, next) {
    var resObj={};
    //var data = req.body;
    console.log("Received data for file upload:");
    

    upload(req, res, function(err) {
        if (err) {
            console.error("File upload failed");
            
            resObj.msg = "Error";
            console.log(error);
            
            }
        else {
        // File uploaded successfully
        console.log("File uploaded successfully");
        
        resObj.file_path = '/images/products/'+file_path;
        resObj.msg = "File uploaded successfully";
    }
        res.send(JSON.stringify(resObj));
    });

  

});

module.exports = router;
