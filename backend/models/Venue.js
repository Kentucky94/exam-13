const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
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
  foodRating: {
    type: Number,
    default: 0,
  },
  serviceRating: {
    type: Number,
    default: 0,
  },
  interiorRating: {
    type: Number,
    default: 0,
  },
  overallRating: {
    type: Number,
    default: 0,
  }
});

VenueSchema.pre('save', async function(next){
  const average = (this.foodRating + this.serviceRating + this.interiorRating) / 3;

  this.overallRating = average.toFixed(1);

  next();
});

const Venue = mongoose.model('Venue', VenueSchema);

module.exports = Venue;