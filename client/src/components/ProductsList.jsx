// src/components/ProductsList.jsx
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import productsJson from '../data/products_with_images.json';
import ProductModal from './ProductModal';
import { Link } from 'react-router-dom';

// We'll use local JSON file directly (fast). Alternatively you can fetch /api/products.
export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // If backend route exists, you could call: api.get('/products').then(...)
    setProducts(productsJson);
  }, []);

  const filtered = q
    ? products.filter(p =>
      (p.name || '').toLowerCase().includes(q.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(q.toLowerCase()) ||
      (p.category || '').toLowerCase().includes(q.toLowerCase())
    )
    : products;

  return (
    <div>
      <div className="mb-4 flex gap-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..." className="p-2 border rounded flex-1" />
        <Link to="/cart" className="bg-yellow-400 p-2 rounded">Go to Cart</Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p._id} className="bg-white p-3 rounded shadow">
            <div className="h-40 bg-gray-100 flex items-center justify-center">
              {p.image_url ? <img src={p.image_url} alt={p.name} className="max-h-full" /> : <div className="text-sm text-gray-500">No image</div>}
            </div>
            <h4 className="font-semibold mt-2">{p.name}</h4>
            <p className="text-sm">{p.description}</p>
            <p className="mt-1">₹{p.price}</p>
            <p className="text-xs text-gray-600">CO₂: {p.carbonFootprint} kg</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => setSelected({product: p, isAlternative:false})} className="bg-green-600 text-white px-2 py-1 rounded">View</button>
            </div>
          </div>
        ))}
      </div>

      {selected && <ProductModal data={selected} onClose={()=>setSelected(null)} />}
    </div>
  );
}
