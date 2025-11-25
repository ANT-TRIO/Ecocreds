// routes/secondhand.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const SecondhandProduct = require('../models/SecondhandProduct');
const User = require('../models/User');

// Get all available secondhand products (excluding user's own products)
router.get('/products', verifyToken, async (req, res) => {
  try {
    const products = await SecondhandProduct.find({ 
      status: 'available',
      user: { $ne: req.user._id } // Exclude user's own products
    })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
    
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's own secondhand products
router.get('/my-products', verifyToken, async (req, res) => {
  try {
    const products = await SecondhandProduct.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new secondhand product
router.post('/add-product', verifyToken, async (req, res) => {
  try {
    const { name, description, image, expiryDate } = req.body;
    
    const product = new SecondhandProduct({
      user: req.user._id,
      name,
      description,
      image,
      expiryDate
    });
    
    await product.save();
    await product.populate('user', 'name email');
    
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Buy secondhand product
router.post('/buy/:productId', verifyToken, async (req, res) => {
  try {
    const product = await SecondhandProduct.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    if (product.user.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot buy your own product' });
    }
    
    if (product.status !== 'available') {
      return res.status(400).json({ message: 'Product is not available' });
    }
    
    // Update product status
    product.status = 'sold';
    product.buyer = req.user._id;
    product.soldAt = new Date();
    await product.save();
    
    // Add 10 EcoCred points to the seller
    await User.findByIdAndUpdate(product.user, {
      $inc: { ecoCreds: 10 }
    });
    
    res.json({ 
      message: 'Product purchased successfully! Seller earned 10 EcoCred points.',
      product 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete secondhand product
router.delete('/delete/:productId', verifyToken, async (req, res) => {
  try {
    const product = await SecondhandProduct.findOne({
      _id: req.params.productId,
      user: req.user._id
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await SecondhandProduct.findByIdAndDelete(req.params.productId);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;