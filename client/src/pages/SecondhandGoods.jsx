// src/pages/SecondhandGoods.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { Link } from 'react-router-dom';

export default function SecondhandGoods() {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace' or 'myProducts'

  useEffect(() => {
    fetchUserData();
    fetchProducts();
  }, [activeTab]);

  const fetchUserData = async () => {
    try {
      const res = await api.get('/auth/me');
      setUserData(res.data);
    } catch (error) {
      console.error('Failed to fetch user data');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let endpoint = '/secondhand/products';
      if (activeTab === 'myProducts') {
        endpoint = '/secondhand/my-products';
      }
      
      const res = await api.get(endpoint);
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const buyProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to buy this product?')) {
      return;
    }

    try {
      await api.post(`/secondhand/buy/${productId}`);
      alert('Product purchased successfully! The seller earned 10 EcoCred points.');
      fetchProducts(); // Refresh the list
      fetchUserData(); // Refresh user data
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to purchase product');
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await api.delete(`/secondhand/delete/${productId}`);
      alert('Product deleted successfully');
      fetchProducts(); // Refresh the list
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar user={userData?.user} />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Secondhand Goods</h1>
              <p className="text-gray-600">Give your unused goods a second life and earn EcoCred points</p>
            </div>
            <Link 
              to="/add-secondhand" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg"
            >
              + Add Your Goods
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-green-100">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`pb-4 px-4 font-semibold transition duration-300 ${
                activeTab === 'marketplace'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              🛍️ Marketplace
            </button>
            <button
              onClick={() => setActiveTab('myProducts')}
              className={`pb-4 px-4 font-semibold transition duration-300 ${
                activeTab === 'myProducts'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📦 My Products
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-green-600 text-lg">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">
                  {activeTab === 'marketplace' ? '🛒' : '📦'}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {activeTab === 'marketplace' ? 'No Products Available' : 'No Products Added'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeTab === 'marketplace' 
                    ? 'Check back later for new secondhand goods' 
                    : 'Start adding your unused goods to earn EcoCred points'
                  }
                </p>
                {activeTab === 'myProducts' && (
                  <Link 
                    to="/add-secondhand" 
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                  >
                    Add Your First Product
                  </Link>
                )}
              </div>
            ) : (
              products.map(product => {
                const expired = isExpired(product.expiryDate);
                
                return (
                  <div 
                    key={product._id} 
                    className="bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Product Image */}
                    <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-4xl">📷</div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg text-gray-900 truncate">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Expires:</span>
                        <span className={`font-semibold ${
                          expired ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {formatDate(product.expiryDate)}
                          {expired && ' (Expired)'}
                        </span>
                      </div>

                      {activeTab === 'marketplace' && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Seller:</span>
                          <span className="font-semibold text-blue-600">
                            {product.user?.name}
                          </span>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          product.status === 'available' 
                            ? 'bg-green-100 text-green-800'
                            : product.status === 'sold'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status?.charAt(0).toUpperCase() + product.status?.slice(1)}
                        </span>
                        
                        {activeTab === 'myProducts' && product.status === 'sold' && (
                          <span className="text-green-600 text-sm font-semibold">
                            +10 EcoCreds
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 space-y-2">
                      {activeTab === 'marketplace' && product.status === 'available' && !expired && (
                        <button
                          onClick={() => buyProduct(product._id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-300"
                        >
                          Buy Now
                        </button>
                      )}
                      
                      {activeTab === 'myProducts' && product.status === 'available' && (
                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition duration-300"
                        >
                          Delete
                        </button>
                      )}
                      
                      {expired && (
                        <div className="text-center text-red-600 text-sm font-semibold">
                          Product Expired
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-bold text-blue-800 mb-3">💡 How It Works</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• <strong>Sellers:</strong> Add your unused goods before expiry and earn <strong>10 EcoCred points</strong> when sold</li>
            <li>• <strong>Buyers:</strong> Get quality products at great prices while helping reduce waste</li>
            <li>• <strong>Environment:</strong> Every secondhand purchase helps reduce carbon footprint</li>
            <li>• Products automatically expire after their expiry date</li>
          </ul>
        </div>
      </div>
    </div>
  );
}