import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Product from '../models/Product.js';
import ErrorResponse from '../utils/ErrorResponse.js';

/**
 * @route               POST    /api/users/login
 * @description         Auth user & get token
 * @access              Public
 */
export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: null,
    });
  } else {
    const error = new ErrorResponse('Invalid Credentials.', 401);
    return next(error);
  }
});
