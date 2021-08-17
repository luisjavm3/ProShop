import express from 'express';

import { authUser, getUserProfile } from '../controllers/userController.js';
import protect from '../middlewares/authMiddleware.js';
import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';

const userRoutes = express.Router();

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
userRoutes.route('/profile').get(protect, getUserProfile);

export default userRoutes;
