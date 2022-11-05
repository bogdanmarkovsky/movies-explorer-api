const allowedCors = [
  'localhost:3001',
  'http://localhost:3001',
  'https://localhost:3001',
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
  'https://diploma43.nomoredomains.icu/',
  'http://diploma43.nomoredomains.icu/',
];

const corsAllow = (req, res, next) => {
  const { origin } = req.headers;
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};

module.exports = {
  corsAllow,
};
