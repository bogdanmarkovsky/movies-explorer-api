const Movie = require('../models/movies');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ForbiddenError } = require('../errors/ForbiddenError');

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
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = await req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    });
    return res.status(CREATED).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Введены некорректные данные'));
    }
    return next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const id = req.user._id;
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      if (id === movie.owner.toString()) {
        await Movie.findByIdAndDelete(req.params.id);
        return res.status(OK).send(movie);
      }
      return next(new ForbiddenError('У Вас нет прав на удаление этого фильма'));
    }
    return next(new NotFoundError('Фильм не найден'));
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Неверный запрос'));
    }
    return next(err);
  }
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
