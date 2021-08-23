import express from 'express';

import { addOrderItems, getOrderById } from '../controllers/orderController.js';
import protect from '../middlewares/authMiddleware.js';

const orderRoutes = express.Router();

orderRoutes.route('/').post(protect, addOrderItems);
orderRoutes.route('/:id').get(protect, getOrderById);

export default orderRoutes;
