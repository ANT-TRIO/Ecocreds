/**
 * Razorpay Payment Utilities
 * Complete payment processing and validation module
 */

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_default';

/**
 * Initialize and process Razorpay payment
 * @param {Object} paymentDetails - Contains amount, orderId, userEmail, userName
 * @returns {Promise<Object>} Payment response with success status and payment details
 */
export const initializeRazorpayPayment = async (paymentDetails) => {
  const { amount, orderId, userEmail, userName } = paymentDetails;

  return new Promise((resolve, reject) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      order_id: orderId,
      handler: (response) => {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          timestamp: new Date().toISOString()
        });
      },
      prefill: {
        email: userEmail || 'user@example.com',
        name: userName || 'Customer'
      },
      theme: {
        color: '#22c55e'
      },
      modal: {
        ondismiss: () => reject(new Error('Payment cancelled by user'))
      },
      retry: {
        enabled: true,
        max_count: 3
      }
    };

    if (!window.Razorpay) {
      reject(new Error('Razorpay library not loaded'));
      return;
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};

/**
 * Format amount as currency string
 * @param {number} amount - Amount in INR
 * @returns {string} Formatted currency string
 */
export const formatPaymentAmount = (amount) => {
  return `₹${parseFloat(amount).toFixed(2)}`;
};


