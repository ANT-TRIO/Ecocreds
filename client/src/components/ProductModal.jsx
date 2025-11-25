// src/components/ProductModal.jsx
import React, { useEffect, useState } from 'react';
import productsJson from '../data/products_with_images.json';
import api from '../utils/api';

export default function ProductModal({ data, onClose }) {
  const [product, setProduct] = useState(data.product);
  const [isAltView, setIsAltView] = useState(data.isAlternative || false);
  const [originalProduct, setOriginalProduct] = useState(data.product);

  useEffect(() => {
    setProduct(data.product);
    setOriginalProduct(data.product);
    setIsAltView(data.isAlternative || false);
  }, [data]);

  const openAlternative = () => {
    if (!product.alternative) return;
    const alt = productsJson.find(x => x._id === product.alternative);
    if (alt) {
      setProduct(alt);
      setIsAltView(true);
    }
  };

  const calculateCO2Savings = () => {
    if (!isAltView || !originalProduct) return 0;
    return (originalProduct.carbonFootprint - product.carbonFootprint).toFixed(3);
  };

  const addToCart = async () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const co2Savings = isAltView ? calculateCO2Savings() : 0;
    
    cart.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      carbonFootprint: product.carbonFootprint,
      originalProductId: isAltView ? originalProduct._id : product._id,
      usedAlternative: isAltView,
      co2Savings: parseFloat(co2Savings),
      qty: 1
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  };

  const co2Savings = calculateCO2Savings();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4 h-80">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-gray-400 text-lg">No image available</div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 font-semibold">Category</p>
                  <p className="text-gray-900 font-bold">{product.category}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 font-semibold">Price</p>
                  <p className="text-gray-900 font-bold">₹{product.price}</p>
                </div>
              </div>

              {/* CO2 Information */}
              <div className={`rounded-lg p-4 ${
                isAltView && co2Savings > 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
              }`}>
                <p className="text-sm font-semibold mb-2">
                  {isAltView && co2Savings > 0 ? '🌱 Environmental Impact' : 'Carbon Footprint'}
                </p>
                <p className="text-gray-900 font-bold">
                  {product.carbonFootprint} kg CO₂
                </p>
                {isAltView && co2Savings > 0 && (
                  <p className="text-green-600 font-semibold text-sm mt-1">
                    You're saving {co2Savings} kg CO₂ with this alternative!
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={addToCart} 
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
                >
                  Add to Cart
                </button>

                {!isAltView && product.alternative && (
                  <button 
                    onClick={openAlternative} 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition duration-300"
                  >
                    Eco Alternative
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}