const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Recipe',
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  easyToCookRating: {
    type: Number,
    required: true,
  },
  quickToCookRating: {
    type: Number,
    required: true,
  },
  tasteRating: {
    type: Number,
    required: true,
  }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;