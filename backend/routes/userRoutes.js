import express from 'express';
import { authUser } from '../controllers/userController.js';

const userRoutes = express.Router();

/**
 * @route               POST    /api/users/login
 * @description         Auth user & get token
 * @access              Public
 */
userRoutes.route('/login').post(authUser);

export default userRoutes;
