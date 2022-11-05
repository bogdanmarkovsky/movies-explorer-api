const Movie = require('../models/movies');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const {
  ValidationErrorMessage,
  ForbiddenErrorMessage,
  NotFoundMovieErrorMessage,
  BadRequestErrorMessage,
} = require('../utils/messages');

const {
  OK,
  CREATED,
} = require('../utils/successCodes');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({
      owner: req.user._id,
    });
    return res.status(OK).send(movies);
  } catch (err) {
    return next(err);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({ ...req.body, owner: req.user._id });
    return res.status(CREATED).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError(ValidationErrorMessage));
    }
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const id = req.user._id;
  try {
    const movie = await Movie.findOne({ owner: id, movieId: req.params.id });
    if (movie) {
      if (id === movie.owner.toString()) {
        await movie.remove();
        return res.status(OK).send(movie);
      }
      return next(new ForbiddenError(ForbiddenErrorMessage));
    }
    return next(new NotFoundError(NotFoundMovieErrorMessage));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError(BadRequestErrorMessage));
    }
    return next(err);
  }
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
