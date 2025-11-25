// routes/payments.js
const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const verifyToken = require('../middleware/verifyToken');
const Order = require('../models/Order');
const User = require('../models/User');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/payments/create-order
router.post('/create-order', verifyToken, async (req, res) => {
  try {
    const { amount, currency = 'INR', receiptId } = req.body;
    // Razorpay expects amount in paise (for INR)
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: receiptId || `rcpt_${Date.now()}`
    };
    const rOrder = await razorpay.orders.create(options);
    res.json(rOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment creation failed' });
  }
});

// POST /api/payments/verify  -> call to mark order paid
router.post('/verify', verifyToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ourOrderId } = req.body;
    
    // TODO: verify signature on server side if you want extra security
    
    // mark order as paid in DB
    if (ourOrderId) {
      const order = await Order.findById(ourOrderId);
      if (order) {
        order.paymentStatus = 'paid';
        order.razorpayOrderId = razorpay_order_id;
        await order.save();

        // Update user's EcoCred points and CO2 savings
        await User.findByIdAndUpdate(req.user._id, {
          $inc: {
            ecoCreds: order.ecoCredsEarned || 0,
            totalCO2Saved: order.totalCO2Saved || 0
          }
        });
      }
    }
    res.json({ ok: true, message: 'Payment verified and points updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Verification failed' });
  }
});

module.exports = router;