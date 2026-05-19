// src/utils/cartUtils.js
import { formatPrice } from './priceUtils';

export const addToCart = (product, quantity = 1) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.qty = (existingItem.qty || 1) + quantity;
  } else {
    cart.push({
      ...product,
      qty: quantity,
      addedAt: new Date().toISOString()
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const updateCartQuantity = (productId, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(item => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.qty = quantity;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  return [];
};

export const getCartTotal = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return cart.reduce((total, item) => {
    return total + (item.price * (item.qty || 1));
  }, 0);
};

export const getCartItemCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return cart.reduce((count, item) => count + (item.qty || 1), 0);
};

export const getCartItems = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};
