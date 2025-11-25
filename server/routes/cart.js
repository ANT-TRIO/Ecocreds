// routes/cart.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Order = require('../models/Order');
const User = require('../models/User');

// Save cart as an order (created but not paid yet)
router.post('/create-order', verifyToken, async (req, res) => {
  try {
    const { items, totalPrice, totalCO2, totalCO2Saved, ecoCredsEarned } = req.body;
    const order = new Order({
      user: req.user._id,
      items,
      totalPrice,
      totalCO2,
      totalCO2Saved,
      ecoCredsEarned, // Store the earned EcoCreds
      paymentStatus: 'created'
    });
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's orders
router.get('/my', verifyToken, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;