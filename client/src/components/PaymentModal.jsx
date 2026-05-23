// src/components/PaymentModal.jsx
import React, { useState } from 'react';
import { formatPaymentAmount } from '../utils/razorpayUtils';
import { usePayment } from '../hooks/usePayment';

export default function PaymentModal({ isOpen, onClose, amount, items, onSuccess }) {
  const { processPayment, isProcessing } = usePayment();
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setError(null);
    const result = await processPayment({
      amount,
      userEmail: localStorage.getItem('userEmail') || 'user@example.com',
      userName: localStorage.getItem('userName') || 'User'
    });

    if (result.success) {
      onSuccess(result.data);
      onClose();
    } else {
      setError(result.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
        </div>

        <div className="mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-600 mb-1">Total Payment</p>
            <p className="text-3xl font-bold text-green-600">{formatPaymentAmount(amount)}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}

