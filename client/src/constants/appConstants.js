/**
 * Application-wide Constants and Configuration
 */

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

// ============================================================================
// PRODUCT CATEGORIES
// ============================================================================

export const PRODUCT_CATEGORIES = {
  ELECTRONICS: 'electronics',
  CLOTHING: 'clothing',
  HOME: 'home',
  FOOD: 'food',
  BEAUTY: 'beauty',
  SPORTS: 'sports',
  BOOKS: 'books',
  TOYS: 'toys'
};

export const CATEGORY_LABELS = {
  electronics: 'Electronics',
  clothing: 'Clothing',
  home: 'Home & Kitchen',
  food: 'Food & Beverages',
  beauty: 'Beauty & Personal Care',
  sports: 'Sports & Outdoors',
  books: 'Books',
  toys: 'Toys & Games'
};

export const CATEGORY_COLORS = {
  electronics: '#3B82F6',
  clothing: '#EC4899',
  home: '#10B981',
  food: '#F59E0B',
  beauty: '#8B5CF6',
  sports: '#EF4444',
  books: '#6366F1',
  toys: '#F97316'
};

// ============================================================================
// ORDER STATUS
// ============================================================================

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  IN_TRANSIT: 'in_transit',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned'
};

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  returned: 'Returned'
};

export const ORDER_STATUS_COLORS = {
  pending: '#FCD34D',
  confirmed: '#93C5FD',
  shipped: '#A7F3D0',
  in_transit: '#BFDBFE',
  delivered: '#86EFAC',
  cancelled: '#FECACA',
  returned: '#E9D5FF'
};

// ============================================================================
// PAYMENT STATUS
// ============================================================================

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

export const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  WALLET: 'wallet',
  NETBANKING: 'netbanking',
  EMI: 'emi'
};

// ============================================================================
// ECO SCORE RANGES
// ============================================================================

export const ECO_SCORE_RANGES = {
  EXCELLENT: { min: 75, max: 100, label: 'Excellent', color: '#10B981' },
  GOOD: { min: 50, max: 75, label: 'Good', color: '#84CC16' },
  FAIR: { min: 25, max: 50, label: 'Fair', color: '#F59E0B' },
  POOR: { min: 0, max: 25, label: 'Poor', color: '#EF4444' }
};

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 50,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 100,
  PHONE_LENGTH: 10,
  ZIPCODE_LENGTH: 6,
  PRODUCT_NAME_MIN: 3,
  PRODUCT_DESCRIPTION_MIN: 10,
  REVIEW_TEXT_MIN: 10,
  REVIEW_TEXT_MAX: 1000
};

// ============================================================================
// PAGINATION
// ============================================================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_OFFSET: 0
};

// ============================================================================
// SORTING OPTIONS
// ============================================================================

export const SORT_OPTIONS = {
  PRICE_LOW_TO_HIGH: 'price_asc',
  PRICE_HIGH_TO_LOW: 'price_desc',
  NEWEST: 'newest',
  OLDEST: 'oldest',
  RATING: 'rating',
  ECO_SCORE: 'eco_score',
  POPULARITY: 'popularity'
};

export const SORT_LABELS = {
  price_asc: 'Price: Low to High',
  price_desc: 'Price: High to Low',
  newest: 'Newest',
  oldest: 'Oldest',
  rating: 'Top Rated',
  eco_score: 'Most Eco-Friendly',
  popularity: 'Most Popular'
};

// ============================================================================
// CURRENCY AND LOCALE
// ============================================================================

export const CURRENCY = {
  CODE: 'INR',
  SYMBOL: '₹',
  LOCALE: 'en-IN'
};

export const DATE_FORMAT = {
  SHORT: 'MMM DD, YYYY',
  LONG: 'MMMM DD, YYYY',
  FULL: 'MMMM DD, YYYY HH:mm A'
};

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  INVALID_INPUT: 'Please check your input and try again.',
  PAYMENT_FAILED: 'Payment failed. Please try again.',
  CART_EMPTY: 'Your cart is empty.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  FILE_TOO_LARGE: 'File size exceeds the limit.',
  INVALID_FILE_TYPE: 'Invalid file type. Please upload a supported format.',
  DUPLICATE_EMAIL: 'An account with this email already exists.',
  WEAK_PASSWORD: 'Password is too weak. Please use a stronger password.',
  PASSWORDS_MISMATCH: 'Passwords do not match.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  INVALID_ADDRESS: 'Please enter a valid address.'
};

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully.',
  PASSWORD_CHANGED: 'Password changed successfully.',
  ACCOUNT_CREATED: 'Account created successfully.',
  EMAIL_VERIFIED: 'Email verified successfully.',
  ORDER_PLACED: 'Order placed successfully.',
  PAYMENT_SUCCESS: 'Payment successful.',
  ITEM_ADDED: 'Item added to cart.',
  ITEM_REMOVED: 'Item removed from cart.',
  COUPON_APPLIED: 'Coupon applied successfully.',
  REVIEW_SUBMITTED: 'Review submitted successfully.',
  ADDRESS_UPDATED: 'Address updated successfully.'
};

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURE_FLAGS = {
  ENABLE_LIVE_CHAT: false,
  ENABLE_REFERRAL: true,
  ENABLE_GIFT_CARDS: false,
  ENABLE_SUBSCRIPTION: false,
  ENABLE_REVIEWS: true,
  ENABLE_WISHLIST: true,
  ENABLE_SOCIAL_SHARE: true,
  ENABLE_ONE_CLICK_CHECKOUT: false
};

// ============================================================================
// PAYMENT GATEWAYS
// ============================================================================

export const PAYMENT_GATEWAYS = {
  RAZORPAY: {
    NAME: 'Razorpay',
    KEY: import.meta.env.VITE_RAZORPAY_KEY_ID,
    ENABLED: true,
    TIMEOUT: 30000
  },
  PAYPAL: {
    NAME: 'PayPal',
    CLIENT_ID: import.meta.env.VITE_PAYPAL_CLIENT_ID,
    ENABLED: false
  },
  STRIPE: {
    NAME: 'Stripe',
    KEY: import.meta.env.VITE_STRIPE_KEY,
    ENABLED: false
  }
};

// ============================================================================
// STORAGE KEYS
// ============================================================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CART: 'cart',
  WISHLIST: 'wishlist',
  RECENTLY_VIEWED: 'recently_viewed',
  THEME: 'theme',
  LANGUAGE: 'language',
  NOTIFICATIONS: 'notifications'
};

// ============================================================================
// API ENDPOINTS
// ============================================================================

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  ME: '/auth/me',

  // Products
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:id',
  SEARCH_PRODUCTS: '/products/search',
  ECO_PRODUCTS: '/eco/products',

  // Cart
  GET_CART: '/cart',
  ADD_CART: '/cart/add',
  REMOVE_CART: '/cart/remove',
  UPDATE_CART: '/cart/update',
  CLEAR_CART: '/cart/clear',

  // Orders
  GET_ORDERS: '/orders',
  ORDER_DETAILS: '/orders/:id',
  CREATE_ORDER: '/orders',
  CANCEL_ORDER: '/orders/:id/cancel',

  // Payments
  CREATE_PAYMENT: '/payments/create-order',
  VERIFY_PAYMENT: '/payments/verify',
  PAYMENT_HISTORY: '/payments/history',

  // User
  UPDATE_PROFILE: '/auth/profile/update',
  UPDATE_ADDRESS: '/auth/address/update',
  CHANGE_PASSWORD: '/auth/change-password',

  // Eco
  ECO_CREDITS: '/eco/credits',
  ECO_SCORE: '/eco/score',
  CARBON_STATS: '/eco/carbon-stats'
};

// ============================================================================
// REGEX PATTERNS
// ============================================================================

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_IN: /^[6-9]\d{9}$/,
  URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  CREDIT_CARD: /^\d{13,19}$/,
  CVV: /^\d{3,4}$/,
  ZIPCODE_IN: /^[0-9]{6}$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  SPECIAL_CHARS: /[!@#$%^&*(),.?":{}|<>]/,
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBERS: /\d/
};

// ============================================================================
// ENVIRONMENT CONFIGURATION
// ============================================================================

export const ENV_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  APP_ENV: import.meta.env.MODE || 'development',
  DEBUG: import.meta.env.DEV,
  PRODUCTION: import.meta.env.PROD
};

export default {
  API_CONFIG,
  PRODUCT_CATEGORIES,
  ORDER_STATUS,
  PAYMENT_STATUS,
  ECO_SCORE_RANGES,
  VALIDATION_RULES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS,
  STORAGE_KEYS,
  API_ENDPOINTS
};
