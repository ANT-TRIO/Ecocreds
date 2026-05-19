// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { formatPrice, calculateDiscount } from '../utils/priceUtils';

export default function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price)
    : 0;

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative bg-gray-100 h-48 overflow-hidden">
        <img
          src={product.image || '/placeholder.png'}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
        {product.ecoScore && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Eco: {product.ecoScore}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Pricing */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-green-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mb-4 flex flex-wrap gap-1">
          {product.isSustainable && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              Sustainable
            </span>
          )}
          {product.hasRecycledContent && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Recycled
            </span>
          )}
          {product.isBiodegradable && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Biodegradable
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
