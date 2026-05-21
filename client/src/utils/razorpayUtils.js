/**
 * Razorpay Payment Utilities
 * Handles payment processing and validation
 */

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_default';

/**
 * Simple payment initializer
 */
export const initializeRazorpayPayment = async (paymentDetails) => {
  const { amount, orderId, userEmail, userName } = paymentDetails;

  return new Promise((resolve, reject) => {
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      order_id: orderId,
      handler: (response) => {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature
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
        ondismiss: () => reject(new Error('Payment cancelled'))
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
};

/**
 * Format payment amount for display
 */
export const formatPaymentAmount = (amount) => {
  return `₹${amount.toFixed(2)}`;
};

