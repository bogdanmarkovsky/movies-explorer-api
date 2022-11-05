const rateLimit = require('express-rate-limit');
const {
  RateLimiterErrorMessage,
} = require('../utils/messages');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: RateLimiterErrorMessage,
});

module.exports = limiter;
