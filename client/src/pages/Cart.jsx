// src/pages/Cart.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCO2, setTotalCO2] = useState(0);
  const [totalCO2Saved, setTotalCO2Saved] = useState(0);
  const [totalEcoCreds, setTotalEcoCreds] = useState(0);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const c = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(c);
    computeTotals(c);
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await api.get('/auth/me');
      setUserData(res.data);
    } catch (error) {
      console.error('Failed to fetch user data');
    }
  };

  // Enhanced EcoCred points calculation formula
  const calculateEcoCreds = (co2Saved, price, usedAlternative) => {
    const co2Points = co2Saved * 3; // 3 points per kg CO2 saved
    const purchasePoints = Math.floor(price / 100); // 1 point per 100 rupees
    const alternativeBonus = usedAlternative ? 5 : 0; // +5 bonus points for eco alternatives
    return co2Points + purchasePoints + alternativeBonus;
  };

  const computeTotals = (items) => {
    let tp = 0, co2 = 0, saved = 0, creds = 0;
    items.forEach(it => {
      const quantity = it.qty || 1;
      tp += it.price * quantity;
      co2 += (it.carbonFootprint || 0) * quantity;
      saved += (it.co2Savings || 0) * quantity;
      creds += calculateEcoCreds(it.co2Savings || 0, it.price, it.usedAlternative) * quantity;
    });
    setTotalPrice(tp);
    setTotalCO2(co2);
    setTotalCO2Saved(saved);
    setTotalEcoCreds(Math.round(creds)); // Round to whole number
  };

  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return;
    
    const updatedCart = [...cart];
    updatedCart[index].qty = newQty;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    computeTotals(updatedCart);
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    computeTotals(updatedCart);
  };

  const checkout = async () => {
    if (!localStorage.getItem('token')) {
      alert('Please login to checkout');
      return;
    }
    try {
      // Create Razorpay order
      const res = await api.post('/payments/create-order', { amount: totalPrice });
      const rOrder = res.data;
      
      // Create our order in database
      const orderRes = await api.post('/cart/create-order', {
        items: cart,
        totalPrice,
        totalCO2,
        totalCO2Saved,
        ecoCredsEarned: totalEcoCreds
      });
      const ourOrder = orderRes.data;

      const options = {
        key:  import.meta.env.VITE_RAZORPAY_KEY,
        amount: rOrder.amount,
        currency: rOrder.currency,
        name: 'EcoCred',
        description: 'Sustainable Shopping Order',
        order_id: rOrder.id,
        handler: async function (response) {
          try {
            await api.post('/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              ourOrderId: ourOrder._id
            });
            
            alert(`Payment successful! You earned ${totalEcoCreds} EcoCred points!`);
            localStorage.removeItem('cart');
            
            // Add a small delay to ensure backend updates are complete
            setTimeout(() => {
              window.location.href = '/dashboard';
            }, 1000);
            
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment successful but there was an issue updating your points. Please contact support.');
          }
        },
        prefill: {
          name: userData?.user?.name || '',
          email: userData?.user?.email || '',
        },
        theme: {
          color: '#10B981'
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
      
      // Handle payment failure
      rzp.on('payment.failed', function (response) {
        alert('Payment failed. Please try again.');
        console.error('Payment failed:', response.error);
      });
      
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar user={userData?.user} />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Cart</h2>
          <Link 
            to="/products" 
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            ← Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Start adding some sustainable products to your cart!</p>
            <Link 
              to="/products" 
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => {
                const itemEcoCreds = calculateEcoCreds(item.co2Savings || 0, item.price, item.usedAlternative) * (item.qty || 1);
                
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg text-gray-900 mb-2">{item.name}</h4>
                        
                        {item.usedAlternative && (
                          <div className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                            🌱 Eco Alternative (+5 bonus points)
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-500">Price</p>
                            <p className="font-semibold">₹{item.price}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">CO₂ Footprint</p>
                            <p className="font-semibold">{item.carbonFootprint?.toFixed(2) || '0.00'} kg</p>
                          </div>
                        </div>
                        
                        {item.co2Savings > 0 && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                            <p className="text-green-700 font-semibold text-sm">
                              🎉 Saving {item.co2Savings.toFixed(2)} kg CO₂
                            </p>
                          </div>
                        )}

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-yellow-700 font-semibold text-sm">
                            💰 Earns {itemEcoCreds} EcoCred points
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-3">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => updateQuantity(index, (item.qty || 1) - 1)}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="font-semibold w-8 text-center">{item.qty || 1}</span>
                          <button 
                            onClick={() => updateQuantity(index, (item.qty || 1) + 1)}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 text-sm font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 h-fit">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Total CO₂</span>
                  <span className="font-semibold">{totalCO2.toFixed(2)} kg</span>
                </div>
                
                {totalCO2Saved > 0 && (
                  <div className="flex justify-between bg-green-50 p-3 rounded-lg">
                    <span className="text-green-700 font-semibold">CO₂ Saved</span>
                    <span className="text-green-700 font-semibold">-{totalCO2Saved.toFixed(2)} kg</span>
                  </div>
                )}
                
                <div className="flex justify-between bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  <span className="text-yellow-700 font-semibold">EcoCreds Earned</span>
                  <span className="text-yellow-700 font-semibold">+{totalEcoCreds} points</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">🎁 EcoCred Points Breakdown</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 3 points per kg CO₂ saved</li>
                  <li>• 1 point per ₹100 spent</li>
                  <li>• +5 bonus points for eco alternatives</li>
                </ul>
              </div>

              <button 
                onClick={checkout}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold text-lg transition duration-300 shadow-lg"
              >
                Proceed to Checkout
              </button>

              <p className="text-center text-gray-500 text-sm mt-4">
                Your points will be added immediately after payment
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}