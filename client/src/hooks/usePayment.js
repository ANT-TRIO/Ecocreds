// src/hooks/usePayment.js
import { useState, useCallback } from 'react';
import { initializeRazorpayPayment } from '../utils/razorpayUtils';
import api from '../utils/api';

/**
 * Custom hook for payment processing
 * Handles Razorpay integration and payment verification
 */
export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const processPayment = useCallback(async (paymentDetails) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Create order on backend
      const orderResponse = await api.post('/payments/create-order', {
        amount: paymentDetails.amount
      });

      if (!orderResponse.data.orderId) {
        throw new Error('Failed to create order');
      }

      // Initialize Razorpay payment
      const payment = await initializeRazorpayPayment({
        ...paymentDetails,
        orderId: orderResponse.data.orderId
      });

      // Verify payment signature on backend
      const verifyResponse = await api.post('/payments/verify', {
        razorpay_order_id: payment.orderId,
        razorpay_payment_id: payment.paymentId,
        razorpay_signature: payment.signature
      });

      return { 
        success: true, 
        data: verifyResponse.data 
      };
    } catch (err) {
      const errorMessage = err.message || 'Payment processing failed';
      setError(errorMessage);
      console.error('Payment error:', err);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { 
    processPayment, 
    isProcessing, 
    error,
    clearError
  };
};
