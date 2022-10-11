const express = require('express');

const router = express.Router();
const movieRoutes = require('./movies');
const userRoutes = require('./users');

router.use('/movies', movieRoutes);
router.use('/users', userRoutes);

module.exports = router;
