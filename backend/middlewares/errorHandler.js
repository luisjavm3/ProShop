import ErrorResponse from '../utils/ErrorResponse.js';

/**
 * Middleware that handles all kind of error.
 *
 * @param {*} err Is the error that is passed in whatever controllers inside of a CATCH.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const errorHandler = (err, req, res, next) => {
  let error;

  // The 11000 code is triggered when a unique filed is trying to be duplicated.
  if (err.code === 11000) {
    error = new ErrorResponse(`Duplicate key.`, 400);
  }

  if (err.name === 'TokenExpiredError') {
    error = new ErrorResponse(err.message, 401);
  }

  if (err.name === 'CastError') {
    error = new ErrorResponse('Invalid ID.', 400);
  }

  const jsonResponse = {
    success: false,
    message: error?.message || err?.message || 'Unknown server error.',
  };

  if (!error && !(err instanceof ErrorResponse)) jsonResponse.details = err;

  res.status(error?.statusCode || err?.statusCode || 500).json(jsonResponse);
};

export default errorHandler;
