const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true,
  }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;