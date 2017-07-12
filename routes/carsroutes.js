
var express = require('express');
var router = express.Router();
var Car = require("../models/CarModel");

var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status('401').send({message: "Unauthorized" });
  }
};



router.put('/:id', ensureAuthenticated, function(req, res, next) {
});

router.post('/',ensureAuthenticated, function (req, res) {
  Car.create(req.body, function (err, car) {
    if (err) {
      res.send('error saving new Car')
    } else {
      res.send(car)
    }
  });
})

router.get('/', function (req, res) {
  Car.find(function (error, cars) {
    res.send(cars);
  });
});

router.get('/:carId',function (req, res) {
  Car.findById({
    _id: req.params.carId
  }, function (error, car) {
    res.send(car);
  });
});

router.delete('/:deleteCarId',ensureAuthenticated, function (req, res) {
  var deleteCarId = req.params.deleteCarId;

  Car.findByIdAndRemove(deleteCarId, function (err, status) {
    if (err) {
      throw err;
    } else {
      res.send(status);
    }
  })
});

router.put('/:updateCarId',ensureAuthenticated, function (req, res) {
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

router.post('/:updateCarId/rating',ensureAuthenticated, function (req, res) {
  var ratingUpdate = req.body.userRating;
  var updateRating = {
    $inc: {
      ratingTotal: ratingUpdate,
      numberOfRatings: 1
    }
  }
  Car.findByIdAndUpdate(req.params.updateCarId, updateRating, {
      new: true
    },
    function (err, car) {
      if (err) {
        res.send('error saving rating new Car')
      } else {
        res.send(car)

      }
    });
})

router.post('/:id/reviews', function (req, res) {
  var review = {
    reviewBy: req.body.reviewBy,
    reviewContent: req.body.reviewContent
  }
  var update = {
    $push: {
      reviews: review
    }
  }

  Car.findByIdAndUpdate(req.params.id, update, {
      new: true
    },
    function (err, car) {
      if (err) {
        return res.status("500").send(err);
      }
      res.send(car);
    })
});

router.delete('/:carId/reviews/:reviewId',ensureAuthenticated,  function (req, res) {
  var update = {
    $pull: {
      reviews: {
        _id: req.params.reviewId
      }
    }
  }
  Car.findByIdAndUpdate(req.params.carId, update, function (err, status) {
    if (err) {
      throw err;
    } else {
      res.send(status);
    }
  })
});
module.exports = router;