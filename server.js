var express = require('express');
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cars');

var Car = require('./models/carModel');
var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.post('/cars', function (req, res) {
  Car.create(req.body, function (err, car) {
    if (err) {
      res.send('error saving new Car')
    } else {
      res.send(car)
    }
  });
})

app.get('/cars', function (req, res) {
  Car.find(function (error, cars) {
    res.send(cars);
  });
});

app.delete('/cars/:deleteCarId', function (req, res) {
  var deleteCarId = req.params.deleteCarId;

  Car.findByIdAndRemove(deleteCarId, function (err, status) {
    if (err) {
      throw err;
    } else {
      res.send(status);
    }
  })
});

app.put('/cars/:updateCarId', function (req, res) {
  var updateCarId = req.params.updateCarId;

  Car.findByIdAndUpdate(updateCarId, req.body, {
    new: true
  }, function (err, car) {
    if (err) {
      throw err;
    } else {
      console.log("deleted")
      res.send(car);
    }
  })
});

app.post('/cars/:updateCarId/rating', function (req, res) {
  var ratingUpdate = req.body.userRating;
  var updateRating = {
    $inc: {
      ratingTotal: ratingUpdate,
      numberOfRatings: 1
    }
  }
  Car.findByIdAndUpdate(req.params.updateCarId, updateRating ,
    function (err, car) {
      if (err) {
        res.send('error saving rating new Car')
      } else {
        res.send(car)
      
    }
  });
})



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