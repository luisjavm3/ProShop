import asyncHandler from 'express-async-handler';

import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
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
      token: generateToken(user._id),
    });
  } else {
    const error = new ErrorResponse('Invalid Credentials.', 401);
    return next(error);
  }
});

/**
 * @route               POST    /api/users
 * @description         Register a new user
 * @access              Public
 */
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new ErrorResponse('User already exists.');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    throw new ErrorResponse('Invalid user data.', 400);
  }
});

/**
 * @route               GET    /api/users/profile
 * @description         Get user profile
 * @access              Private
 */
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new ErrorResponse('User not found.', 404);
  }
});

/**
 * @route               PUT    /api/users/profile
 * @description         Update user profile
 * @access              Private
 */
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
    });

    res.json(updatedUser);
  } else {
    throw new ErrorResponse('User not found.', 404);
  }
});
