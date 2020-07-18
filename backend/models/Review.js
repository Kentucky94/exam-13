const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Venue',
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  foodRating: {
    type: Number,
    required: true,
  },
  serviceRating: {
    type: Number,
    required: true,
  },
  interiorRating: {
    type: Number,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;