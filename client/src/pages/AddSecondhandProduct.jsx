// src/pages/AddSecondhandProduct.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function AddSecondhandProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    expiryDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  React.useEffect(() => {
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // For now, we'll use a placeholder. In production, you'd upload to Cloudinary or similar service
    setLoading(true);
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a mock URL for the image (in real app, this would be the actual uploaded image URL)
      const mockImageUrl = `https://via.placeholder.com/400x300/10B981/FFFFFF?text=${encodeURIComponent(form.name || 'Product')}`;
      
      setForm(prev => ({
        ...prev,
        image: mockImageUrl
      }));
      
      alert('Image uploaded successfully! (This is a demo - in production, images would be uploaded to cloud storage)');
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.description || !form.image || !form.expiryDate) {
      alert('Please fill in all fields');
      return;
    }

    if (new Date(form.expiryDate) <= new Date()) {
      alert('Expiry date must be in the future');
      return;
    }

    setLoading(true);
    try {
      await api.post('/secondhand/add-product', form);
      alert('Product added successfully!');
      navigate('/secondhand');
    } catch (error) {
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar user={userData?.user} />
      
      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Goods</h1>
          <p className="text-gray-600">
            List your unused goods and earn <strong>10 EcoCred points</strong> when someone buys them!
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image *
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                </div>
                {form.image && (
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={form.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Upload a clear photo of your product
              </p>
            </div>

            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g., Organic Pasta, Canned Beans, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the product, condition, and why you're selling it..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
                required
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date *
              </label>
              <input
                type="date"
                name="expiryDate"
                value={form.expiryDate}
                onChange={handleChange}
                min={getTomorrowDate()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Products automatically expire after this date
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/secondhand')}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:bg-green-400"
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-bold text-green-800 mb-3">🎯 Tips for Success</h3>
          <ul className="text-green-700 space-y-2 text-sm">
            <li>• <strong>Clear Photos:</strong> Take well-lit photos showing the product clearly</li>
            <li>• <strong>Honest Descriptions:</strong> Mention any imperfections or special features</li>
            <li>• <strong>Reasonable Expiry:</strong> Set expiry dates that give buyers enough time to use the product</li>
            <li>• <strong>Eco-Friendly:</strong> You're helping reduce waste and earn EcoCred points!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}