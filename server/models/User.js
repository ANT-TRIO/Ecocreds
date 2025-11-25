const mongoose = require('mongoose');
// models/User.js
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
  dob: Date,
  nationality: String,
  ecoCreds: { type: Number, default: 0 },
  totalCO2Saved: { type: Number, default: 0 },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);