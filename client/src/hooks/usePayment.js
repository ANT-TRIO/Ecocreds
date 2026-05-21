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

      const orderResponse = await api.post('/payments/create-order', {
        amount: paymentDetails.amount
      });

      const payment = await initializeRazorpayPayment({
        ...paymentDetails,
        orderId: orderResponse.data.orderId
      });

      const verifyResponse = await api.post('/payments/verify', {
        razorpay_order_id: payment.orderId,
        razorpay_payment_id: payment.paymentId,
        razorpay_signature: payment.signature
      });

      return { success: true, data: verifyResponse.data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { processPayment, isProcessing, error };
};
