require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { corsAllow } = require('./middlewares/cors');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
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
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);
}

main();
