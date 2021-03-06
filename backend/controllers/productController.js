import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import ErrorResponse from '../utils/ErrorResponse.js';

/**
 * @route               GET     /api/products
 * @description         Fetch all products
 * @access              Public
 */
export const getProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find({});

    res.json(products);
  } catch (error) {
    next(error);
  }
});

/**
 * @route               GET     /api/products/:id
 * @description         Fetch single product
 * @access              Public
 */
export const getProductById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    if (!product) throw new ErrorResponse('Product Not Found.', 404);

    res.json(product);
  } catch (error) {
    return next(error);
  }
});
