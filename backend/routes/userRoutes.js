import express from 'express';

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from '../controllers/userController.js';
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import protect from '../middlewares/authMiddleware.js';

const userRoutes = express.Router();

/**
 * @route               POST    /api/users
 * @description         Register a new user
 * @access              Public
 */
userRoutes.route('/').post(registerUser);

/**
 * @route               POST    /api/users/login
 * @description         Auth user & get token
 * @access              Public
 */
userRoutes.route('/login').post(authUser);

/**
 * @route               GET    /api/users/profile
 * @description         Get user profile
 * @access              Private
 */
userRoutes
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default userRoutes;
