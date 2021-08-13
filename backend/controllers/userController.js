import asyncHandler from 'express-async-handler';
import Product from '../models/User.js';

/**
 * @route               POST    /api/users/login
 * @description         Auth user & get token
 * @access              Public
 */
export const authUser = asyncHandler((req, res, next) => {
  const { email, password } = req.body;

  res.json(req.body);
});
