// models/SecondhandProduct.js
const mongoose = require('mongoose');

const secondhandProductSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // URL to uploaded image
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'expired'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  soldAt: {
    type: Date
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('SecondhandProduct', secondhandProductSchema);