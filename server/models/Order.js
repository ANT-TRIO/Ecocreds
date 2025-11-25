// models/Order.js
const mongoose = require('mongoose');
// models/Order.js
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: String,
    name: String,
    price: Number,
    carbonFootprint: Number,
    originalProductId: String,
    usedAlternative: Boolean,
    co2Savings: Number,
    qty: Number
  }],
  totalPrice: Number,
  totalCO2: Number,
  totalCO2Saved: Number,
  ecoCredsEarned: Number, // Add this field
  paymentStatus: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
  razorpayOrderId: String
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
