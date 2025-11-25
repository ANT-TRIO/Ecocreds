// routes/products.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');

// Load JSON once (server side). Adjust path if backend and frontend are separate.
// If your backend doesn't have the JSON file, seed DB separately; here we serve from file for simplicity.
const jsonPath = path.join(__dirname, '..', 'src', 'data', 'products_with_images.json');

let productsCache = null;
function loadProducts() {
  if (!productsCache) {
    const raw = fs.readFileSync(jsonPath, 'utf8');
    productsCache = JSON.parse(raw);
  }
  return productsCache;
}

// GET /api/products  -> returns all products (support ?q=search)
router.get('/', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const products = loadProducts();
  const filtered = q
    ? products.filter(p =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      )
    : products;
  res.json(filtered);
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const products = loadProducts();
  const p = products.find(x => x._id === req.params.id || x._id === Number(req.params.id));
  if (!p) return res.status(404).json({ message: 'Product not found' });
  // populate alternative product object if exists
  let alt = null;
  if (p.alternative) {
    alt = products.find(x => x._id === p.alternative);
  }
  res.json({ ...p, alternativeProduct: alt || null });
});

module.exports = router;
