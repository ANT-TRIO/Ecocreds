// src/hooks/usePayment.js
import { useState, useCallback } from 'react';
import { initializeRazorpayPayment } from '../utils/razorpayUtils';
import api from '../utils/api';

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const processPayment = useCallback(async (paymentDetails) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Create order on backend
      const orderResponse = await api.post('/payments/create-order', {
        amount: paymentDetails.amount,
        cartItems: paymentDetails.cartItems
      });

      const orderId = orderResponse.data.orderId;

      // Initialize Razorpay payment
      const paymentResponse = await initializeRazorpayPayment({
        ...paymentDetails,
        orderId
      });

      // Verify payment on backend
      const verifyResponse = await api.post('/payments/verify', {
        razorpay_order_id: paymentResponse.orderId,
        razorpay_payment_id: paymentResponse.paymentId,
        razorpay_signature: paymentResponse.signature
      });

      return {
        success: true,
        data: verifyResponse.data
      };
    } catch (err) {
      const errorMessage = err.message || 'Payment processing failed';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    processPayment,
    isProcessing,
    error,
    setError
  };
};
