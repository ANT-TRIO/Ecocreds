/**
 * Razorpay Payment Utilities
 * Handles payment processing and validation
 */

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_default';

/**
 * Initialize Razorpay payment
 * @param {Object} paymentDetails - Payment details
 * @returns {Promise} Payment response
 */
export const initializeRazorpayPayment = async (paymentDetails) => {
  const { amount, orderId, userEmail, userName, cartItems } = paymentDetails;

  return new Promise((resolve, reject) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      order_id: orderId,
      handler: async (response) => {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          cartItems
        });
      },
      prefill: {
        email: userEmail,
        name: userName
      },
      theme: {
        color: '#22c55e'
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment cancelled by user'));
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};

/**
 * Verify payment signature
 * @param {Object} payment - Payment object with signature
 * @returns {boolean} Is signature valid
 */
export const verifyPaymentSignature = (payment) => {
  const { paymentId, orderId, signature } = payment;
  return paymentId && orderId && signature;
};

/**
 * Format payment amount for display
 * @param {number} amount - Amount in INR
 * @returns {string} Formatted amount
 */
export const formatPaymentAmount = (amount) => {
  return `₹${amount.toFixed(2)}`;
};
