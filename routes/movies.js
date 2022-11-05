const express = require('express');

const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateAddMovie, validateDeleteMovie } = require('../middlewares/validation');

const movieRoutes = express.Router();

movieRoutes.get('/', getMovies);
movieRoutes.post('/', validateAddMovie, addMovie);
movieRoutes.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = movieRoutes;
