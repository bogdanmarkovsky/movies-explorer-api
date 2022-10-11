const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
