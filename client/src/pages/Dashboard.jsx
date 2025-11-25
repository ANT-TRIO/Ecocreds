// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setRefreshing(true);
      const res = await api.get('/auth/me');
      console.log('User data fetched:', res.data); // Debug log
      setUserData(res.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const forceRefresh = () => {
    fetchUserData();
  };

  if (loading) {
    return (
      <div>
        <Navbar user={null} />
        <div className="p-6 flex justify-center">
          <div className="text-green-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar user={userData?.user} />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {userData?.user?.name}!
              </h1>
              <p className="text-gray-600 text-lg">
                Continue your sustainable shopping journey and earn more EcoCreds.
              </p>
            </div>
          
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* User Details Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">👤</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Profile Details</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">{userData?.user?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">{userData?.user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nationality</p>
                <p className="font-semibold">{userData?.user?.nationality || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* CO2 Saved Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Environmental Impact</h3>
            </div>
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {(userData?.totalCO2Saved || 0).toFixed(2)}
              </div>
              <p className="text-gray-600">kg CO₂ Saved</p>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Equivalent to {Math.round((userData?.totalCO2Saved || 0) * 100)} trees planted
            </p>
          </div>

          {/* EcoCreds Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Your EcoCreds</h3>
            </div>
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {userData?.ecoCreds || 0}
              </div>
              <p className="text-gray-600">Available Points</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="text-yellow-700 text-sm font-semibold">
                💡 3 points per kg CO₂ saved + 1 point per ₹100 spent
              </p>
            </div>
            <Link 
              to="/rewards" 
              className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Redeem Rewards
            </Link>
          </div>
        </div>

        {/* Quick Actions & Recent Purchases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/products" 
                className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition duration-300"
              >
                <div className="text-2xl mb-2">🛍️</div>
                <p className="font-semibold text-green-700">Shop Products</p>
              </Link>
              <Link 
                to="/rewards" 
                className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition duration-300"
              >
                <div className="text-2xl mb-2">🎁</div>
                <p className="font-semibold text-green-700">View Rewards</p>
              </Link>
            </div>
          </div>

          {/* Recent Purchases */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Purchases</h3>
            {userData?.orders?.length ? (
              <div className="space-y-3">
                {userData.orders.slice(0, 3).map(order => (
                  <div key={order._id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <p className="font-semibold">Order #{order._id?.slice(-6)}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      {order.ecoCredsEarned > 0 && (
                        <p className="text-xs text-green-600 font-semibold">
                          +{order.ecoCredsEarned} EcoCreds
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(order.totalPrice || 0).toFixed(2)}</p>
                      <p className="text-sm text-green-600">
                        CO₂: {(order.totalCO2 || 0).toFixed(2)}kg
                      </p>
                    </div>
                  </div>
                ))}
                {userData.orders.length > 3 && (
                  <Link 
                    to="/products" 
                    className="block text-center text-green-600 font-semibold hover:text-green-700 mt-4"
                  >
                    View All Orders
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🛒</div>
                <p className="text-gray-500 mb-4">No purchases yet</p>
                <Link 
                  to="/products" 
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>

       
      </div>
    </div>
  );
}