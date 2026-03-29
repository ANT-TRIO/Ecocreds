const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
  material: String,
  packaging: String,
  brand: String,
  image_url: { type: String, default: '' }
});

module.exports = mongoose.model('Product', ProductSchema);