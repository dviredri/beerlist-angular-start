var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  reviewBy: { type: String },
  reviewContent: { type: String }
});

var carSchema = new Schema({
  make: { type: String },
  carModel: { type: String },
  image_url: { type: String },
  year: { type: Number },
  ratingTotal: { type: Number },
  numberOfRatings: { type: Number },
  reviews: [reviewSchema]
});

var Car = mongoose.model("car", carSchema);

module.exports = Car;
