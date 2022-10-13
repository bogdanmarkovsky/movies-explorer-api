const mongoose = require('mongoose');
const { validateUrl } = require('../utils/validateUrl');
const { validateInt } = require('../utils/validateInt');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    validate: { validator: validateInt },
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: { validator: validateUrl },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: { validator: validateUrl },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: { validator: validateUrl },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    validate: { validator: validateInt },
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
