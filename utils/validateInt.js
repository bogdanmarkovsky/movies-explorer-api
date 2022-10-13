const { default: isInt } = require('validator/lib/isInt');
const {
  NumberValidationMessage,
} = require('./messages');

function validateInt(v) {
  if (isInt(v)) {
    return v;
  }
  throw new Error(NumberValidationMessage);
}

module.exports = {
  validateInt,
};
