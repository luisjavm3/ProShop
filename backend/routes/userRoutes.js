import express from 'express';

import { authUser } from '../controllers/userController.js';
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

export default userRoutes;
