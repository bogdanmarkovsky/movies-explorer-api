const {
  UrlValidatorMessage,
} = require('./messages');

function validateUrl(url) {
  const regex = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/g;
  if (regex.test(url)) {
    return url;
  }
  throw new Error(UrlValidatorMessage);
}

module.exports = {
  validateUrl,
};
