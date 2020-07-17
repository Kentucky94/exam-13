const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Review'
  }],
  easyToCookRating: {
    type: Number,
    default: 0,
  },
  quickToCookRating: {
    type: Number,
    default: 0,
  },
  tasteRating: {
    type: Number,
    default: 0,
  },
  overallRating: {
    type: Number,
    default: 0,
  }
});

RecipeSchema.pre('save', async function(next){
  this.overallRating = (this.easyToCookRating + this.quickToCookRating + this.tasteRating) / 3;

  next();
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;