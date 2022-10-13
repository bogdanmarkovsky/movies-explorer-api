require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const limiter = require('./utils/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsAllow } = require('./middlewares/cors');
const router = require('./routes/index');
const { login, createUser, logout } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { NotFoundError } = require('./errors/NotFoundError');
const {
  CrashTestErrorMessage,
  PageNotFoundErrorMessage,
  InternalServerErrorMessage,
} = require('./utils/messages');
const MONGO_URL = require('./utils/config');

mongoose.set('toObject', { useProjection: true });
mongoose.set('toJSON', { useProjection: true });
const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(corsAllow);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(CrashTestErrorMessage);
  }, 0);
});
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.use(auth);
app.delete('/signout', logout);
app.use('/', router);
app.use((req, res, next) => {
  next(new NotFoundError(PageNotFoundErrorMessage));
});
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? InternalServerErrorMessage
      : message,
  });
  next();
});

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);
}

main();
