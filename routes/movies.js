const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('../utils/validateUrl');

const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

const movieRoutes = express.Router();

movieRoutes.get('/', getMovies);
movieRoutes.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().required(),
  }),
}), addMovie);
movieRoutes.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = movieRoutes;