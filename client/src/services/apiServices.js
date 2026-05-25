/**
 * Comprehensive API Services Layer
 * Handles all API communication and data transformation
 */

import api from '../utils/api';

// ============================================================================
// PRODUCT SERVICES
// ============================================================================

export const productService = {
  /**
   * Fetch all products with optional filtering
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Array>} Array of products
   */
  async getAllProducts(filters = {}) {
    try {
      const { category, sortBy, limit, offset } = filters;
      const params = new URLSearchParams();
      
      if (category) params.append('category', category);
      if (sortBy) params.append('sortBy', sortBy);
      if (limit) params.append('limit', limit);
      if (offset) params.append('offset', offset);
      
      const response = await api.get(`/products?${params.toString()}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },

  /**
   * Fetch single product by ID
   * @param {string} productId - Product ID
   * @returns {Promise<Object>} Product data
   */
  async getProductById(productId) {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error(`Failed to fetch product ${productId}`);
    }
  },

  /**
   * Fetch eco-score for product
   * @param {string} productId - Product ID
   * @returns {Promise<number>} Eco-score value
   */
  async getProductEcoScore(productId) {
    try {
      const response = await api.get(`/eco/score/${productId}`);
      return response.data.ecoScore || 0;
    } catch (error) {
      console.error('Error fetching eco-score:', error);
      return 0;
    }
  },

  /**
   * Get product alternatives
   * @param {string} productId - Product ID
   * @returns {Promise<Array>} Array of alternative products
   */
  async getProductAlternatives(productId) {
    try {
      const response = await api.get(`/products/${productId}/alternatives`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching alternatives:', error);
      return [];
    }
  },

  /**
   * Search products
   * @param {string} query - Search query
   * @returns {Promise<Array>} Search results
   */
  async searchProducts(query) {
    try {
      const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
      return response.data || [];
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Search failed');
    }
  }
};

// ============================================================================
// CART SERVICES
// ============================================================================

export const cartService = {
  /**
   * Fetch user's cart from server
   * @returns {Promise<Object>} Cart data
   */
  async getCart() {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      return { items: [], total: 0 };
    }
  },

  /**
   * Add item to cart
   * @param {string} productId - Product ID
   * @param {number} quantity - Quantity to add
   * @returns {Promise<Object>} Updated cart
   */
  async addToCart(productId, quantity = 1) {
    try {
      const response = await api.post('/cart/add', {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Failed to add item to cart');
    }
  },

  /**
   * Remove item from cart
   * @param {string} productId - Product ID
   * @returns {Promise<Object>} Updated cart
   */
  async removeFromCart(productId) {
    try {
      const response = await api.post('/cart/remove', { productId });
      return response.data;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new Error('Failed to remove item from cart');
    }
  },

  /**
   * Update item quantity
   * @param {string} productId - Product ID
   * @param {number} quantity - New quantity
   * @returns {Promise<Object>} Updated cart
   */
  async updateQuantity(productId, quantity) {
    try {
      const response = await api.post('/cart/update', {
        productId,
        quantity
      });
      return response.data;
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw new Error('Failed to update quantity');
    }
  },

  /**
   * Clear entire cart
   * @returns {Promise<Object>} Empty cart
   */
  async clearCart() {
    try {
      const response = await api.post('/cart/clear');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw new Error('Failed to clear cart');
    }
  },

  /**
   * Apply coupon code to cart
   * @param {string} couponCode - Coupon code
   * @returns {Promise<Object>} Cart with discount applied
   */
  async applyCoupon(couponCode) {
    try {
      const response = await api.post('/cart/coupon', { code: couponCode });
      return response.data;
    } catch (error) {
      console.error('Error applying coupon:', error);
      throw new Error('Invalid or expired coupon');
    }
  }
};

// ============================================================================
// PAYMENT SERVICES
// ============================================================================

export const paymentService = {
  /**
   * Create a new payment order
   * @param {Object} orderData - Order details
   * @returns {Promise<Object>} Order ID and payment details
   */
  async createOrder(orderData) {
    try {
      const response = await api.post('/payments/create-order', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  },

  /**
   * Verify payment after completion
   * @param {Object} paymentData - Razorpay payment response
   * @returns {Promise<Object>} Verification result
   */
  async verifyPayment(paymentData) {
    try {
      const response = await api.post('/payments/verify', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw new Error('Payment verification failed');
    }
  },

  /**
   * Fetch payment history
   * @returns {Promise<Array>} User's payment history
   */
  async getPaymentHistory() {
    try {
      const response = await api.get('/payments/history');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching payment history:', error);
      return [];
    }
  },

  /**
   * Get refund status
   * @param {string} orderId - Order ID
   * @returns {Promise<Object>} Refund status
   */
  async getRefundStatus(orderId) {
    try {
      const response = await api.get(`/payments/refund/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching refund status:', error);
      return { status: 'unknown' };
    }
  }
};

// ============================================================================
// USER SERVICES
// ============================================================================

export const userService = {
  /**
   * Get current user profile
   * @returns {Promise<Object>} User profile data
   */
  async getProfile() {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new Error('Failed to fetch user profile');
    }
  },

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Updated profile
   */
  async updateProfile(profileData) {
    try {
      const response = await api.post('/auth/profile/update', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile');
    }
  },

  /**
   * Get user's eco credits
   * @returns {Promise<number>} EcoCreds balance
   */
  async getEcoCredits() {
    try {
      const response = await api.get('/eco/credits');
      return response.data.balance || 0;
    } catch (error) {
      console.error('Error fetching eco credits:', error);
      return 0;
    }
  },

  /**
   * Get user's carbon footprint stats
   * @returns {Promise<Object>} Carbon stats
   */
  async getCarbonStats() {
    try {
      const response = await api.get('/eco/carbon-stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching carbon stats:', error);
      return { total: 0, saved: 0 };
    }
  },

  /**
   * Update user address
   * @param {Object} addressData - Address information
   * @returns {Promise<Object>} Updated address
   */
  async updateAddress(addressData) {
    try {
      const response = await api.post('/auth/address/update', addressData);
      return response.data;
    } catch (error) {
      console.error('Error updating address:', error);
      throw new Error('Failed to update address');
    }
  },

  /**
   * Change password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Success response
   */
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw new Error('Failed to change password');
    }
  }
};

// ============================================================================
// ORDER SERVICES
// ============================================================================

export const orderService = {
  /**
   * Get all user orders
   * @returns {Promise<Array>} Array of orders
   */
  async getOrders() {
    try {
      const response = await api.get('/orders');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  },

  /**
   * Get single order details
   * @param {string} orderId - Order ID
   * @returns {Promise<Object>} Order details
   */
  async getOrderById(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new Error('Failed to fetch order');
    }
  },

  /**
   * Track order status
   * @param {string} orderId - Order ID
   * @returns {Promise<Object>} Tracking information
   */
  async trackOrder(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}/track`);
      return response.data;
    } catch (error) {
      console.error('Error tracking order:', error);
      return { status: 'pending' };
    }
  },

  /**
   * Cancel order
   * @param {string} orderId - Order ID
   * @param {string} reason - Cancellation reason
   * @returns {Promise<Object>} Cancellation result
   */
  async cancelOrder(orderId, reason = '') {
    try {
      const response = await api.post(`/orders/${orderId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw new Error('Failed to cancel order');
    }
  },

  /**
   * Request return/refund
   * @param {string} orderId - Order ID
   * @param {Object} returnData - Return details
   * @returns {Promise<Object>} Return request result
   */
  async requestReturn(orderId, returnData) {
    try {
      const response = await api.post(`/orders/${orderId}/return`, returnData);
      return response.data;
    } catch (error) {
      console.error('Error requesting return:', error);
      throw new Error('Failed to request return');
    }
  }
};

// ============================================================================
// ECO SERVICES
// ============================================================================

export const ecoService = {
  /**
   * Get eco-friendly products
   * @returns {Promise<Array>} Eco-friendly products
   */
  async getEcoProducts() {
    try {
      const response = await api.get('/eco/products');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching eco products:', error);
      return [];
    }
  },

  /**
   * Calculate carbon footprint for purchase
   * @param {Array} items - Cart items
   * @returns {Promise<Object>} Carbon calculation
   */
  async calculateCarbonFootprint(items) {
    try {
      const response = await api.post('/eco/calculate-carbon', { items });
      return response.data;
    } catch (error) {
      console.error('Error calculating carbon:', error);
      return { total: 0, saved: 0 };
    }
  },

  /**
   * Get eco tips
   * @returns {Promise<Array>} Array of eco tips
   */
  async getEcoTips() {
    try {
      const response = await api.get('/eco/tips');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching eco tips:', error);
      return [];
    }
  },

  /**
   * Get leaderboard data
   * @returns {Promise<Array>} User leaderboard
   */
  async getLeaderboard() {
    try {
      const response = await api.get('/eco/leaderboard');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }
};

export default {
  productService,
  cartService,
  paymentService,
  userService,
  orderService,
  ecoService
};
