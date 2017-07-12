var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var carsroutes = require('./routes/carsroutes');
var userRoutes = require('./routes/userRoutes');
var User = require("./models/UserModel");


mongoose.connect('mongodb://localhost/cars');


var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressSession({
  secret: 'yourSecretHere',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())



app.use('/cars', carsroutes);
app.use('/user', userRoutes);

app.all('[^.]+', function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


// app.get('/cars/:id', function(req, res, next) {
//   Car.findById(req.params.id, handler(res, next));
// });

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

app.listen(8000, function () {
  console.log("yo yo yo, on 8000!!")
});