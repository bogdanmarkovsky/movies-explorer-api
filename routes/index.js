const express = require('express');

const router = express.Router();
const movieRoutes = require('./movies');
const userRoutes = require('./users');
const { login, createUser, logout } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const { NotFoundError } = require('../errors/NotFoundError');
const {
  CrashTestErrorMessage,
  PageNotFoundErrorMessage,
} = require('../utils/messages');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(CrashTestErrorMessage);
  }, 0);
});
router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.use(auth);
router.delete('/signout', logout);
router.use('/movies', movieRoutes);
router.use('/users', userRoutes);

router.use((req, res, next) => {
  next(new NotFoundError(PageNotFoundErrorMessage));
});

module.exports = router;
