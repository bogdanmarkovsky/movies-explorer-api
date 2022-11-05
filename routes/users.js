const express = require('express');

const {
  getCurrentUser,
  updateUserProfile,
} = require('../controllers/users');

const userRoutes = express.Router();
const { validateUpdateUserProfile } = require('../middlewares/validation');

userRoutes.get('/me', getCurrentUser);
userRoutes.patch('/me', validateUpdateUserProfile, updateUserProfile);

module.exports = userRoutes;
