// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">🌿</span>
              <span className="font-bold text-xl">EcoCred</span>
            </Link>
            
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              <Link 
                to="/dashboard" 
                className="hover:bg-green-700 px-3 py-2 rounded-md transition duration-300"
              >
                Dashboard
              </Link>
              <Link 
                to="/products" 
                className="hover:bg-green-700 px-3 py-2 rounded-md transition duration-300"
              >
                Products
              </Link>
              <Link 
                to="/secondhand" 
                className="hover:bg-green-700 px-3 py-2 rounded-md transition duration-300"
              >
                Secondhand Goods
              </Link>
              <Link 
                to="/rewards" 
                className="hover:bg-green-700 px-3 py-2 rounded-md transition duration-300"
              >
                Rewards
              </Link>
              <Link 
                to="/cart" 
                className="hover:bg-green-700 px-3 py-2 rounded-md transition duration-300"
              >
                Cart
              </Link>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <div className="hidden sm:flex flex-col text-right">
                  <span className="font-semibold">{user.name}</span>
                 
                </div>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition duration-300 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-semibold transition duration-300 shadow-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}