const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { NotFoundError } = require('../errors/NotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const {
  OK,
  CREATED,
} = require('../utils/successCodes');

const createUser = async (req, res, next) => {
  try {
    const {
      name,
      password,
      email,
    } = await req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      password: hash,
      email,
    });
    return res.status(CREATED).send(user);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Введены некорректные данные'));
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  const token = await jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  await res.cookie('jwt', token, {
    maxAge: 360000 * 24 * 7,
    httpOnly: true,
    sameSite: 'none',
  });
  return res.send(user);
};

const logout = async (req, res, next) => {
  try {
    await res.clearCookie('jwt');
    return res.status(OK).send({ message: 'Сессия завершена' });
  } catch (err) {
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    return res.status(OK).send(user);
  } catch (err) {
    return next(err);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const { name, email } = await req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (user) {
      return res.status(OK).send(user);
    }
    return next(new NotFoundError('Пользователь не найден'));
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return next(new BadRequestError('Неверный запрос`'));
    }
    if (err.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    return next(err);
  }
};

module.exports = {
  createUser,
  login,
  logout,
  getCurrentUser,
  updateUserProfile,
};
