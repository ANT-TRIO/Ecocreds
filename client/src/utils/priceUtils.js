/**
 * Price and formatting utilities
 */

export const formatPrice = (price) => {
  return `₹${parseFloat(price).toFixed(2)}`;
};

export const formatCurrency = (amount, currency = 'INR') => {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency
  });
  return formatter.format(amount);
};

export const calculateDiscount = (originalPrice, discountedPrice) => {
  return ((originalPrice - discountedPrice) / originalPrice * 100).toFixed(1);
};

export const calculateTax = (amount, taxRate = 0.18) => {
  return amount * taxRate;
};

export const calculateTotal = (subtotal, taxRate = 0.18, discount = 0) => {
  const tax = calculateTax(subtotal, taxRate);
  const total = subtotal + tax - discount;
  return Math.max(0, total);
};
