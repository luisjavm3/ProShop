import asyncHandler from 'express-async-handler';

import ErrorResponse from '../utils/ErrorResponse.js';
import Order from '../models/Order.js';

/**
 * @route               POST     /api/orders
 * @description         Create new order
 * @access              Private
 */
export const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    throw new ErrorResponse('No order items', 400);
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

/**
 * @route               GET     /api/orders/:id
 * @description         Get order by ID
 * @access              Private
 */
export const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    throw new ErrorResponse('Order not Found.', 404);
  }
});
