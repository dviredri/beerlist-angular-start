var mongoose = require('mongoose');


var carSchema = new mongoose.Schema({
  make: { type: String },
  carModel: { type: String },
  image_url: { type: String },
  year: { type: Number },
  ratingTotal: { type: Number },
  numberOfRatings: { type: Number }
});

var Car = mongoose.model("car", carSchema);

module.exports = Car;
