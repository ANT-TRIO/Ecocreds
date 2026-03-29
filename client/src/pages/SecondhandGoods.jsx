// src/pages/SecondhandGoods.jsx
// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import api from '../utils/api';
// import { Link } from 'react-router-dom';

// export default function SecondhandGoods() {
//   const [products, setProducts] = useState([]);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace' or 'myProducts'

//   useEffect(() => {
//     fetchUserData();
//     fetchProducts();
//   }, [activeTab]);

//   const fetchUserData = async () => {
//     try {
//       const res = await api.get('/auth/me');
//       setUserData(res.data);
//     } catch (error) {
//       console.error('Failed to fetch user data');
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       let endpoint = '/secondhand/products';
//       if (activeTab === 'myProducts') {
//         endpoint = '/secondhand/my-products';
//       }
      
//       const res = await api.get(endpoint);
//       setProducts(res.data);
//     } catch (error) {
//       console.error('Failed to fetch products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const buyProduct = async (productId) => {
//     if (!window.confirm('Are you sure you want to buy this product?')) {
//       return;
//     }

//     try {
//       await api.post(`/secondhand/buy/${productId}`);
//       alert('Product purchased successfully! The seller earned 10 EcoCred points.');
//       fetchProducts(); // Refresh the list
//       fetchUserData(); // Refresh user data
//     } catch (error) {
//       alert(error.response?.data?.message || 'Failed to purchase product');
//     }
//   };

//   const deleteProduct = async (productId) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) {
//       return;
//     }

//     try {
//       await api.delete(`/secondhand/delete/${productId}`);
//       alert('Product deleted successfully');
//       fetchProducts(); // Refresh the list
//     } catch (error) {
//       alert('Failed to delete product');
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const isExpired = (expiryDate) => {
//     return new Date(expiryDate) < new Date();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
//       <Navbar user={userData?.user} />
      
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Header Section */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-100">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Secondhand Goods</h1>
//               <p className="text-gray-600">Give your unused goods a second life and earn EcoCred points</p>
//             </div>
//             <Link 
//               to="/add-secondhand" 
//               className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg"
//             >
//               + Add Your Goods
//             </Link>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-green-100">
//           <div className="flex space-x-4 border-b border-gray-200">
//             <button
//               onClick={() => setActiveTab('marketplace')}
//               className={`pb-4 px-4 font-semibold transition duration-300 ${
//                 activeTab === 'marketplace'
//                   ? 'text-green-600 border-b-2 border-green-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               🛍️ Marketplace
//             </button>
//             <button
//               onClick={() => setActiveTab('myProducts')}
//               className={`pb-4 px-4 font-semibold transition duration-300 ${
//                 activeTab === 'myProducts'
//                   ? 'text-green-600 border-b-2 border-green-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//             >
//               📦 My Products
//             </button>
//           </div>
//         </div>

//         {/* Products Grid */}
//         {loading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="text-green-600 text-lg">Loading...</div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.length === 0 ? (
//               <div className="col-span-full text-center py-12">
//                 <div className="text-6xl mb-4">
//                   {activeTab === 'marketplace' ? '🛒' : '📦'}
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">
//                   {activeTab === 'marketplace' ? 'No Products Available' : 'No Products Added'}
//                 </h3>
//                 <p className="text-gray-600 mb-6">
//                   {activeTab === 'marketplace' 
//                     ? 'Check back later for new secondhand goods' 
//                     : 'Start adding your unused goods to earn EcoCred points'
//                   }
//                 </p>
//                 {activeTab === 'myProducts' && (
//                   <Link 
//                     to="/add-secondhand" 
//                     className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
//                   >
//                     Add Your First Product
//                   </Link>
//                 )}
//               </div>
//             ) : (
//               products.map(product => {
//                 const expired = isExpired(product.expiryDate);
                
//                 return (
//                   <div 
//                     key={product._id} 
//                     className="bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 hover:shadow-xl"
//                   >
//                     {/* Product Image */}
//                     <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
//                       {product.image ? (
//                         <img 
//                           src={product.image} 
//                           alt={product.name}
//                           className="h-full w-full object-cover"
//                         />
//                       ) : (
//                         <div className="text-gray-400 text-4xl">📷</div>
//                       )}
//                     </div>

//                     {/* Product Info */}
//                     <div className="space-y-3">
//                       <h3 className="font-bold text-lg text-gray-900 truncate">
//                         {product.name}
//                       </h3>
                      
//                       <p className="text-gray-600 text-sm line-clamp-2">
//                         {product.description}
//                       </p>

//                       <div className="flex justify-between items-center text-sm">
//                         <span className="text-gray-500">Expires:</span>
//                         <span className={`font-semibold ${
//                           expired ? 'text-red-600' : 'text-green-600'
//                         }`}>
//                           {formatDate(product.expiryDate)}
//                           {expired && ' (Expired)'}
//                         </span>
//                       </div>

//                       {activeTab === 'marketplace' && (
//                         <div className="flex justify-between items-center text-sm">
//                           <span className="text-gray-500">Seller:</span>
//                           <span className="font-semibold text-blue-600">
//                             {product.user?.name}
//                           </span>
//                         </div>
//                       )}

//                       {/* Status Badge */}
//                       <div className="flex justify-between items-center">
//                         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                           product.status === 'available' 
//                             ? 'bg-green-100 text-green-800'
//                             : product.status === 'sold'
//                             ? 'bg-blue-100 text-blue-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}>
//                           {product.status?.charAt(0).toUpperCase() + product.status?.slice(1)}
//                         </span>
                        
//                         {activeTab === 'myProducts' && product.status === 'sold' && (
//                           <span className="text-green-600 text-sm font-semibold">
//                             +10 EcoCreds
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="mt-4 space-y-2">
//                       {activeTab === 'marketplace' && product.status === 'available' && !expired && (
//                         <button
//                           onClick={() => buyProduct(product._id)}
//                           className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-300"
//                         >
//                           Buy Now
//                         </button>
//                       )}
                      
//                       {activeTab === 'myProducts' && product.status === 'available' && (
//                         <button
//                           onClick={() => deleteProduct(product._id)}
//                           className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition duration-300"
//                         >
//                           Delete
//                         </button>
//                       )}
                      
//                       {expired && (
//                         <div className="text-center text-red-600 text-sm font-semibold">
//                           Product Expired
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         )}

//         {/* Info Card */}
//         <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
//           <h3 className="text-lg font-bold text-blue-800 mb-3">💡 How It Works</h3>
//           <ul className="text-blue-700 space-y-2 text-sm">
//             <li>• <strong>Sellers:</strong> Add your unused goods before expiry and earn <strong>10 EcoCred points</strong> when sold</li>
//             <li>• <strong>Buyers:</strong> Get quality products at great prices while helping reduce waste</li>
//             <li>• <strong>Environment:</strong> Every secondhand purchase helps reduce carbon footprint</li>
//             <li>• Products automatically expire after their expiry date</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/SecondhandGoods.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { Link } from 'react-router-dom';

const fmt = d => new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
const isExp = d => new Date(d) < new Date();

const STATUS_STYLE = {
  available: { bg:'#e8f5d8', color:'#2d5a3d' },
  sold:      { bg:'#e8f0fc', color:'#3a5abf' },
  expired:   { bg:'#fdf0f0', color:'#c94444' },
};

export default function SecondhandGoods() {
  const [products,   setProducts]   = useState([]);
  const [userData,   setUserData]   = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [activeTab,  setActiveTab]  = useState('marketplace');

  useEffect(() => { fetchUserData(); fetchProducts(); }, [activeTab]);

  const fetchUserData = async () => {
    try { const r = await api.get('/auth/me'); setUserData(r.data); } catch {}
  };
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const ep = activeTab === 'myProducts' ? '/secondhand/my-products' : '/secondhand/products';
      const r  = await api.get(ep);
      setProducts(r.data);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  };

  const buyProduct = async id => {
    if (!window.confirm('Confirm purchase?')) return;
    try {
      await api.post(`/secondhand/buy/${id}`);
      fetchProducts(); fetchUserData();
    } catch (e) { alert(e.response?.data?.message || 'Purchase failed'); }
  };

  const deleteProduct = async id => {
    if (!window.confirm('Delete this listing?')) return;
    try { await api.delete(`/secondhand/delete/${id}`); fetchProducts(); }
    catch { alert('Failed to delete'); }
  };

  return (
    <div className="sh-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --forest:#1a3a2a;--moss:#2d5a3d;--moss-light:#3d7a52;
          --lime:#b5e048;--lime-pale:#e8f5d8;--cream:#f5f0e8;
          --cream-dk:#ede8de;--stone:#8a8a7a;--stone-lt:#b0b0a0;
          --white:#fff;--red:#e05252;--red-pale:#fdf0f0;
          --blue-pale:#e8f0fc;--blue:#3a5abf;
          --font-display:'Fraunces',serif;--font-body:'DM Sans',system-ui,sans-serif;
          --shadow:0 2px 12px rgba(26,58,42,.08);--shadow-lg:0 8px 32px rgba(26,58,42,.12);
        }
        body{font-family:var(--font-body);background:var(--cream);}
        .sh-page{min-height:100vh;background:var(--cream);}
        .shell{max-width:1280px;margin:0 auto;padding:2rem 1.25rem 5rem;}

        /* hero bar */
        .sh-hero{
          background:var(--forest);border-radius:1.25rem;
          padding:1.75rem 2rem;margin-bottom:1.5rem;
          display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;
          background-image:radial-gradient(ellipse at 90% 50%,rgba(181,224,72,.1) 0%,transparent 55%);
        }
        .sh-hero__title{
          font-family:var(--font-display);font-size:clamp(1.3rem,3vw,1.75rem);
          font-weight:700;color:var(--white);margin-bottom:.2rem;
        }
        .sh-hero__sub{font-size:.875rem;color:rgba(255,255,255,.55);}
        .add-btn{
          display:inline-flex;align-items:center;gap:.5rem;
          padding:.65rem 1.35rem;border-radius:9999px;
          background:var(--lime);color:var(--forest);
          font-family:var(--font-body);font-size:.875rem;font-weight:700;
          text-decoration:none;transition:all .2s;white-space:nowrap;
        }
        .add-btn:hover{background:#9acb38;transform:translateY(-1px);}

        /* tabs */
        .tabs-wrap{
          background:var(--white);border:1.5px solid var(--cream-dk);
          border-radius:1.1rem;padding:.5rem;
          display:inline-flex;gap:.4rem;margin-bottom:1.5rem;
        }
        .tab{
          padding:.55rem 1.25rem;border-radius:.75rem;
          font-size:.875rem;font-weight:600;cursor:pointer;border:none;
          background:transparent;color:var(--stone);transition:all .2s;
        }
        .tab--active{background:var(--forest);color:var(--lime);}
        .tab:not(.tab--active):hover{background:var(--cream);color:var(--forest);}

        /* grid */
        .sh-grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
          gap:1rem;
        }

        /* card */
        .sh-card{
          background:var(--white);border:1.5px solid var(--cream-dk);
          border-radius:1.1rem;overflow:hidden;
          box-shadow:var(--shadow);
          transition:transform .2s,box-shadow .2s;
          display:flex;flex-direction:column;
        }
        .sh-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg);}
        .sh-card__img{
          height:160px;background:var(--cream);
          display:flex;align-items:center;justify-content:center;overflow:hidden;
        }
        .sh-card__img img{width:100%;height:100%;object-fit:cover;}
        .sh-card__no-img{font-size:2.5rem;color:var(--stone-lt);}
        .sh-card__body{padding:1rem;flex:1;display:flex;flex-direction:column;gap:.5rem;}
        .sh-card__name{
          font-family:var(--font-display);font-size:1rem;font-weight:700;
          color:var(--forest);line-height:1.25;
        }
        .sh-card__desc{
          font-size:.8rem;color:var(--stone);line-height:1.5;
          display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
          flex:1;
        }
        .sh-card__meta{display:flex;justify-content:space-between;align-items:center;font-size:.78rem;}
        .sh-card__exp{color:var(--stone);}
        .sh-card__exp--red{color:var(--red);font-weight:600;}
        .sh-card__seller{
          font-size:.75rem;color:var(--blue);font-weight:600;
          background:var(--blue-pale);padding:.18rem .55rem;border-radius:9999px;
        }

        /* status pill */
        .status-pill{
          display:inline-flex;align-items:center;gap:.3rem;
          font-size:.7rem;font-weight:700;text-transform:uppercase;
          letter-spacing:.05em;padding:.22rem .65rem;border-radius:9999px;
        }
        .sold-cred{
          font-size:.75rem;font-weight:600;color:var(--moss);
          background:var(--lime-pale);padding:.18rem .55rem;border-radius:9999px;
        }

        /* action btns */
        .sh-card__foot{padding:.85rem 1rem;border-top:1px solid var(--cream-dk);}
        .sh-btn{
          width:100%;padding:.6rem;border-radius:.65rem;
          font-family:var(--font-body);font-size:.85rem;font-weight:700;
          border:none;cursor:pointer;transition:all .2s;
        }
        .sh-btn--buy{background:var(--forest);color:var(--lime);}
        .sh-btn--buy:hover{background:var(--moss);}
        .sh-btn--del{background:var(--red-pale);color:var(--red);}
        .sh-btn--del:hover{background:#fde0e0;}
        .sh-btn--expired{background:var(--cream);color:var(--stone);cursor:default;}

        /* empty */
        .sh-empty{
          grid-column:1/-1;text-align:center;
          padding:4rem 1rem;color:var(--stone);
        }
        .sh-empty__icon{font-size:3rem;margin-bottom:1rem;}
        .sh-empty__title{
          font-family:var(--font-display);font-size:1.25rem;font-weight:700;
          color:var(--forest);margin-bottom:.5rem;
        }
        .sh-empty__sub{font-size:.875rem;margin-bottom:1.5rem;}
        .sh-empty__btn{
          display:inline-flex;align-items:center;gap:.4rem;
          padding:.65rem 1.35rem;border-radius:9999px;
          background:var(--forest);color:var(--lime);
          font-family:var(--font-body);font-size:.875rem;font-weight:700;
          text-decoration:none;transition:background .2s;
        }
        .sh-empty__btn:hover{background:var(--moss);}

        /* loading */
        .sh-loading{
          grid-column:1/-1;display:flex;justify-content:center;
          gap:.5rem;padding:3rem;
        }
        .ldot{
          width:9px;height:9px;border-radius:50%;background:var(--moss);opacity:.4;
          animation:ldot 1.2s ease infinite;
        }
        .ldot:nth-child(2){animation-delay:.15s}
        .ldot:nth-child(3){animation-delay:.3s}
        @keyframes ldot{40%{opacity:1;transform:translateY(-6px)}0%,80%,100%{opacity:.4;transform:none}}

        /* info strip */
        .info-strip{
          background:var(--cream);border:1.5px solid var(--cream-dk);
          border-radius:1rem;padding:1.25rem 1.5rem;margin-top:1.5rem;
          display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem;
        }
        .info-item{display:flex;align-items:flex-start;gap:.65rem;}
        .info-item__icon{font-size:1.3rem;flex-shrink:0;margin-top:.1rem;}
        .info-item__title{font-size:.82rem;font-weight:700;color:var(--forest);margin-bottom:.15rem;}
        .info-item__desc{font-size:.78rem;color:var(--stone);line-height:1.5;}

        @media(max-width:520px){
          .sh-grid{grid-template-columns:repeat(2,1fr);}
          .sh-hero{padding:1.25rem 1.25rem;}
        }
      `}</style>

      <Navbar user={userData?.user}/>

      <div className="shell">
        {/* Hero */}
        <div className="sh-hero">
          <div>
            <h1 className="sh-hero__title">Secondhand Goods ♻️</h1>
            <p className="sh-hero__sub">Give unused items a second life — earn 10 EcoCreds when yours sells.</p>
          </div>
          <Link to="/add-secondhand" className="add-btn">+ List a Product</Link>
        </div>

        {/* Tabs */}
        <div className="tabs-wrap">
          <button className={`tab ${activeTab==='marketplace'?'tab--active':''}`}
            onClick={()=>setActiveTab('marketplace')}>🛍 Marketplace</button>
          <button className={`tab ${activeTab==='myProducts'?'tab--active':''}`}
            onClick={()=>setActiveTab('myProducts')}>📦 My Listings</button>
        </div>

        {/* Grid */}
        <div className="sh-grid">
          {loading ? (
            <div className="sh-loading">
              <div className="ldot"/><div className="ldot"/><div className="ldot"/>
            </div>
          ) : products.length === 0 ? (
            <div className="sh-empty">
              <div className="sh-empty__icon">{activeTab==='marketplace'?'🛒':'📦'}</div>
              <h3 className="sh-empty__title">
                {activeTab==='marketplace' ? 'Nothing listed yet' : 'You have no listings'}
              </h3>
              <p className="sh-empty__sub">
                {activeTab==='marketplace'
                  ? 'Check back soon — sellers are adding goods every day.'
                  : 'List your first unused item and earn EcoCreds!'}
              </p>
              {activeTab==='myProducts' && (
                <Link to="/add-secondhand" className="sh-empty__btn">+ List Something</Link>
              )}
            </div>
          ) : products.map(p => {
            const expired = isExp(p.expiryDate);
            const st      = expired && p.status!=='sold' ? 'expired' : p.status;
            const stStyle = STATUS_STYLE[st] || STATUS_STYLE.available;

            return (
              <div key={p._id} className="sh-card">
                <div className="sh-card__img">
                  {p.image
                    ? <img src={p.image} alt={p.name}/>
                    : <span className="sh-card__no-img">📷</span>}
                </div>
                <div className="sh-card__body">
                  <h3 className="sh-card__name">{p.name}</h3>
                  <p className="sh-card__desc">{p.description}</p>
                  <div className="sh-card__meta">
                    <span className={`sh-card__exp ${expired?'sh-card__exp--red':''}`}>
                      {expired ? '⚠ Expired' : `Exp: ${fmt(p.expiryDate)}`}
                    </span>
                    {activeTab==='marketplace' && p.user?.name && (
                      <span className="sh-card__seller">{p.user.name}</span>
                    )}
                  </div>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span className="status-pill"
                      style={{background:stStyle.bg,color:stStyle.color}}>
                      {st?.charAt(0).toUpperCase()+st?.slice(1)}
                    </span>
                    {activeTab==='myProducts' && p.status==='sold' && (
                      <span className="sold-cred">+10 EcoCreds</span>
                    )}
                  </div>
                </div>
                <div className="sh-card__foot">
                  {activeTab==='marketplace' && p.status==='available' && !expired ? (
                    <button className="sh-btn sh-btn--buy" onClick={()=>buyProduct(p._id)}>
                      Buy Now
                    </button>
                  ) : activeTab==='myProducts' && p.status==='available' ? (
                    <button className="sh-btn sh-btn--del" onClick={()=>deleteProduct(p._id)}>
                      Delete Listing
                    </button>
                  ) : expired ? (
                    <button className="sh-btn sh-btn--expired" disabled>Expired</button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info strip */}
        <div className="info-strip">
          {[
            ['🌿','Sellers earn','List an item and receive 10 EcoCred points when it sells.'],
            ['🛒','Buyers save','Buy quality pre-loved goods and reduce waste.'],
            ['🌍','Planet wins','Every secondhand purchase lowers the demand for new production.'],
            ['⏱','Auto-expiry','Listings expire automatically after the date you set.'],
          ].map(([icon,title,desc])=>(
            <div key={title} className="info-item">
              <span className="info-item__icon">{icon}</span>
              <div>
                <p className="info-item__title">{title}</p>
                <p className="info-item__desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}