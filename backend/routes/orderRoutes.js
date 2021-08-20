import express from 'express';

import { addOrderItems } from '../controllers/orderController.js';
import protect from '../middlewares/authMiddleware.js';

const orderRoutes = express.Router();

orderRoutes.route('/').post(protect, addOrderItems);

export default orderRoutes;
