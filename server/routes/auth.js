const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// in routes/auth.js (append)
const verifyToken = require('../middleware/verifyToken');
const Order = require('../models/Order');

router.get('/me', verifyToken, async (req, res) => {
  // user is populated by verifyToken middleware
  const user = req.user.toObject ? req.user.toObject() : req.user;
  // fetch orders summary
  const orders = await Order.find({ user: req.user._id });
  const totalCO2Saved = orders.reduce((acc, o) => acc + (o.totalCO2Saved || 0), 0);
  // return user info + orders summary
  res.json({
    user,
    orders,
    totalCO2Saved,
    ecoCreds: user.ecoCreds || 0
  });
});

module.exports = router;

// Signup
router.post('/signup', async (req, res) => {
try {
const { name, email, password, gender, dob, nationality } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });


const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'Email already in use' });


const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);


const user = new User({ name, email, password: hash, gender, dob, nationality });
await user.save();


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });


res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, ecoCreds: user.ecoCreds } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


// Login
router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Email and password required' });


const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });


res.json({ token, user: { id: user._id, name: user.name, email: user.email, ecoCreds: user.ecoCreds } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
});


module.exports = router;