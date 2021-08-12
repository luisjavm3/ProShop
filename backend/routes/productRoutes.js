import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

const productRoutes = express.Router();

/**
 * @route               GET     /api/products
 * @description         Fetch all products
 * @access              Public
 */
productRoutes.route('/').get(
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

/**
 * @route               GET     /api/products/:id
 * @description         Fetch single product
 * @access              Public
 */
productRoutes.route('/:id').get(
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found.' });
    }
  })
);

export default productRoutes;
