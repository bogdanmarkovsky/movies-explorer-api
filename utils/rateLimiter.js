const rateLimit = require('express-rate-limit');
const {
  RateLimiterErrorMessage,
} = require('./messages');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: RateLimiterErrorMessage,
});

module.exports = limiter;
