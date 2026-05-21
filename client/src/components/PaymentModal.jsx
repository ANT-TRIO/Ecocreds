// src/components/PaymentModal.jsx
import React, { useState } from 'react';
import { formatPaymentAmount } from '../utils/razorpayUtils';
import { usePayment } from '../hooks/usePayment';

export default function PaymentModal({ isOpen, onClose, amount, items, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const { processPayment, isProcessing, error } = usePayment();

  const handlePayment = async () => {
    const result = await processPayment({
      amount,
      userEmail: localStorage.getItem('userEmail') || 'user@example.com',
      userName: localStorage.getItem('userName') || 'User'
    });

    if (result.success) {
      onSuccess(result.data);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-600 text-sm mb-1">Amount</p>
            <p className="text-3xl font-bold text-green-600">{formatPaymentAmount(amount)}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-2" />
                <span className="text-gray-700">Razorpay</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="payment" value="wallet" checked={paymentMethod === 'wallet'} onChange={(e) => setPaymentMethod(e.target.value)} className="mr-2" />
                <span className="text-gray-700">Wallet</span>
              </label>
            </div>
          </div>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">Cancel</button>
          <button onClick={handlePayment} disabled={isProcessing} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400">{isProcessing ? 'Processing...' : 'Pay Now'}</button>
        </div>
      </div>
    </div>
  );
}

