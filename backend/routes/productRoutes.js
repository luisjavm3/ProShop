import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  getProductById,
  getProducts,
} from '../controllers/productController.js';
import Product from '../models/Product.js';
import ErrorResponse from '../utils/ErrorResponse.js';

const productRoutes = express.Router();

/**
 * @route               GET     /api/products
 * @description         Fetch all products
 * @access              Public
 */
productRoutes.route('/').get(getProducts);

/**
 * @route               GET     /api/products/:id
 * @description         Fetch single product
 * @access              Public
 */
productRoutes.route('/:id').get(getProductById);

export default productRoutes;
