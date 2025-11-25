// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductsList from '../components/ProductsList';
import api from '../utils/api';

export default function ProductsPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Navbar user={userData?.user} />
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6"> Products</h2>
        <ProductsList />
      </div>
    </div>
  );
}
