// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  carbonFootprint: Number, // kg CO2e
  ageGroup: String,
  gender: String,
  alternative: { type: String, default: null }, // store id as string, consistent with your JSON _id
  image_url: { type: String, default: '' }
});

module.exports = mongoose.model('Product', ProductSchema);
