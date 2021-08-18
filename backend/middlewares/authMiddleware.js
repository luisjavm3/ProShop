import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const protect = expressAsyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      return next();
    } catch (error) {
      error = new ErrorResponse('Not authorized, token failed.', 401);
      return next(error);
    }
  }

  if (!token) {
    throw new ErrorResponse('Not authorized, no token.', 401);
  }
});

export default protect;
