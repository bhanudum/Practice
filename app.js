var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var validateCredentialsRouter = require("./routes/validateUserCredentials");
var productDetailsRouter = require('./routes/getProductDetails');
var newSignupRouter = require("./routes/newUserSignup");
var checkLogginStatus = require("./routes/checkIsUserLoggedin")
var destroySessionRouter = require("./routes/destroySession")
var empDetails = require("./routes/employeeDetails")
var session = require('express-session');
var categoryListRouter = require("./routes/getCategoryList");
var addNewProductRouter = require("./routes/addNewProducDetails");


var app = express();

app.use(session({secret: process.env.SESSION_SECRET_KEY, cookie: { maxAge: 60000 }}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/validate/user/credentials' , validateCredentialsRouter );
app.use('/get/productDetails', productDetailsRouter);
app.use("/newUserSignup/register", newSignupRouter);
app.use("/check/userLoggedin", checkLogginStatus);
app.use('/destroy/userSession', destroySessionRouter);
app.use("/retrive/employeeDetails", empDetails);
app.use("/category/list", categoryListRouter);
app.use('/add/new/product', addNewProductRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
