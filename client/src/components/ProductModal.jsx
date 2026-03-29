// // src/components/ProductModal.jsx
// import React, { useEffect, useState } from 'react';
// import productsJson from '../data/products_with_images.json';
// import api from '../utils/api';

// export default function ProductModal({ data, onClose }) {
//   const [product, setProduct] = useState(data.product);
//   const [isAltView, setIsAltView] = useState(data.isAlternative || false);
//   const [originalProduct, setOriginalProduct] = useState(data.product);

//   useEffect(() => {
//     setProduct(data.product);
//     setOriginalProduct(data.product);
//     setIsAltView(data.isAlternative || false);
//   }, [data]);

//   const openAlternative = () => {
//     if (!product.alternative) return;
//     const alt = productsJson.find(x => x._id === product.alternative);
//     if (alt) {
//       setProduct(alt);
//       setIsAltView(true);
//     }
//   };

//   const calculateCO2Savings = () => {
//     if (!isAltView || !originalProduct) return 0;
//     return (originalProduct.carbonFootprint - product.carbonFootprint).toFixed(3);
//   };

//   const addToCart = async () => {
//     const cart = JSON.parse(localStorage.getItem('cart') || '[]');
//     const co2Savings = isAltView ? calculateCO2Savings() : 0;
    
//     cart.push({
//       productId: product._id,
//       name: product.name,
//       price: product.price,
//       carbonFootprint: product.carbonFootprint,
//       originalProductId: isAltView ? originalProduct._id : product._id,
//       usedAlternative: isAltView,
//       co2Savings: parseFloat(co2Savings),
//       qty: 1
//     });
    
//     localStorage.setItem('cart', JSON.stringify(cart));
//     alert('Added to cart');
//   };

//   const co2Savings = calculateCO2Savings();

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-gray-200">
//           <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>
//           <button 
//             onClick={onClose} 
//             className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
//           >
//             ×
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Product Image */}
//             <div className="flex items-center justify-center bg-gray-50 rounded-xl p-4 h-80">
//               {product.image_url ? (
//                 <img 
//                   src={product.image_url} 
//                   alt={product.name} 
//                   className="max-h-full max-w-full object-contain"
//                 />
//               ) : (
//                 <div className="text-gray-400 text-lg">No image available</div>
//               )}
//             </div>

//             {/* Product Details */}
//             <div className="space-y-6">
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
//                 <p className="text-gray-600">{product.description}</p>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-green-50 rounded-lg p-4">
//                   <p className="text-sm text-green-600 font-semibold">Category</p>
//                   <p className="text-gray-900 font-bold">{product.category}</p>
//                 </div>
//                 <div className="bg-blue-50 rounded-lg p-4">
//                   <p className="text-sm text-blue-600 font-semibold">Price</p>
//                   <p className="text-gray-900 font-bold">₹{product.price}</p>
//                 </div>
//               </div>

//               {/* CO2 Information */}
//               <div className={`rounded-lg p-4 ${
//                 isAltView && co2Savings > 0 ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
//               }`}>
//                 <p className="text-sm font-semibold mb-2">
//                   {isAltView && co2Savings > 0 ? '🌱 Environmental Impact' : 'Carbon Footprint'}
//                 </p>
//                 <p className="text-gray-900 font-bold">
//                   {product.carbonFootprint} kg CO₂
//                 </p>
//                 {isAltView && co2Savings > 0 && (
//                   <p className="text-green-600 font-semibold text-sm mt-1">
//                     You're saving {co2Savings} kg CO₂ with this alternative!
//                   </p>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               <div className="flex gap-3 pt-4">
//                 <button 
//                   onClick={addToCart} 
//                   className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300 shadow-lg"
//                 >
//                   Add to Cart
//                 </button>

//                 {!isAltView && product.alternative && (
//                   <button 
//                     onClick={openAlternative} 
//                     className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition duration-300"
//                   >
//                     Eco Alternative
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/components/ProductModal.jsx
import React, { useEffect, useState, useCallback } from 'react';
import api from '../utils/api';

const scoreColor = s => s>=75?'#2d5a3d':s>=50?'#5a9e3a':s>=25?'#e08c20':'#c94444';
const scoreLabel = s => s>=75?'Excellent':s>=50?'Good':s>=25?'Fair':'Poor';

// ── Semi-circle gauge (compact) ───────────────────────────
function MiniGauge({ score }) {
  const r=36, cx=48, cy=48, circ=Math.PI*r;
  const dash=(score/100)*circ, col=scoreColor(score);
  return (
    <svg viewBox="0 0 96 54" style={{width:96,flexShrink:0}}>
      <path d={`M ${cx-r},${cy} A ${r},${r} 0 0 1 ${cx+r},${cy}`}
        fill="none" stroke="#ede8de" strokeWidth="8" strokeLinecap="round"/>
      <path d={`M ${cx-r},${cy} A ${r},${r} 0 0 1 ${cx+r},${cy}`}
        fill="none" stroke={col} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        style={{transition:'stroke-dasharray .9s cubic-bezier(.4,0,.2,1)'}}/>
      <text x={cx} y={cx-8} textAnchor="middle"
        style={{fontFamily:'Fraunces,serif',fontSize:18,fontWeight:700,fill:col}}>{score}</text>
      <text x={cx} y={cx+5} textAnchor="middle"
        style={{fontFamily:'DM Sans,system-ui',fontSize:8,fill:'#8a8a7a'}}>/100</text>
    </svg>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t=setTimeout(onDone,2600); return ()=>clearTimeout(t); }, [onDone]);
  return (
    <div style={{
      position:'fixed',bottom:'1.5rem',right:'1.5rem',zIndex:10001,
      background:'#1a3a2a',color:'#b5e048',
      padding:'.65rem 1.1rem',borderRadius:'9999px',
      fontSize:'.85rem',fontWeight:600,
      display:'flex',alignItems:'center',gap:'.4rem',
      boxShadow:'0 8px 32px rgba(26,58,42,.3)',
      animation:'tpop .3s ease both',
    }}>
      ✓ {msg}
      <style>{`@keyframes tpop{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

export default function ProductModal({ data, onClose }) {
  const [product,     setProduct]     = useState(data.product);
  const [origProduct, setOrigProduct] = useState(data.product);
  const [isAltView,   setIsAltView]   = useState(data.isAlternative||false);
  const [ecoScore,    setEcoScore]    = useState(null);
  const [ecoLoading,  setEcoLoading]  = useState(false);
  const [toast,       setToast]       = useState(null);

  useEffect(() => {
    setProduct(data.product);
    setOrigProduct(data.product);
    setIsAltView(data.isAlternative||false);
    setEcoScore(null);
  }, [data]);

  // Close on Escape
  useEffect(() => {
    const fn = e => { if (e.key==='Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  const fetchEcoScore = useCallback(async (prod) => {
    setEcoLoading(true);
    try {
      const res = await api.post('/eco/score', prod);
      setEcoScore(res.data?.data ?? res.data);
    } catch {
      setEcoScore({ isFallback:true, explanation:'Could not load eco score.' });
    } finally { setEcoLoading(false); }
  }, []);

  const co2Savings = isAltView && origProduct && ecoScore
    ? Math.max(0, (origProduct.carbonFootprint||0) - (product.carbonFootprint||ecoScore.carbonFootprint||0))
    : 0;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    cart.push({
      productId:        product._id,
      name:             product.name,
      price:            product.price,
      carbonFootprint:  product.carbonFootprint ?? ecoScore?.carbonFootprint ?? 0,
      originalProductId:isAltView ? origProduct._id : product._id,
      usedAlternative:  isAltView,
      co2Savings:       parseFloat(co2Savings.toFixed(3)),
      qty:              1,
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    setToast(`${product.name} added to cart!`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        :root{
          --forest:#1a3a2a;--moss:#2d5a3d;--lime:#b5e048;--lime-pale:#e8f5d8;
          --cream:#f5f0e8;--cream-dk:#ede8de;--stone:#8a8a7a;--stone-lt:#b0b0a0;
          --white:#fff;--red:#e05252;--amber-pale:#fff8e6;
        }

        /* overlay */
        .modal-overlay{
          position:fixed;inset:0;z-index:9000;
          background:rgba(10,25,15,.6);
          backdrop-filter:blur(4px);
          display:flex;align-items:center;justify-content:center;
          padding:1rem;animation:ovIn .2s ease;
        }
        @keyframes ovIn{from{opacity:0}to{opacity:1}}

        /* panel */
        .modal-panel{
          background:var(--white);border-radius:1.35rem;
          width:100%;max-width:760px;
          max-height:90vh;overflow:hidden;
          display:flex;flex-direction:column;
          box-shadow:0 24px 64px rgba(0,0,0,.25);
          animation:panIn .3s cubic-bezier(.4,0,.2,1);
        }
        @keyframes panIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}

        /* header */
        .modal-header{
          display:flex;align-items:center;justify-content:space-between;
          padding:1.25rem 1.5rem;border-bottom:1.5px solid var(--cream-dk);
          flex-shrink:0;
        }
        .modal-header__left{display:flex;align-items:center;gap:.65rem;}
        .modal-header__cat{
          font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;
          color:var(--stone);margin-bottom:.1rem;
        }
        .modal-header__name{
          font-family:'Fraunces',serif;font-size:1.15rem;font-weight:700;
          color:var(--forest);line-height:1.2;
        }
        .modal-header__alt-pill{
          display:inline-flex;align-items:center;gap:.3rem;
          background:var(--lime-pale);color:var(--moss);
          font-size:.68rem;font-weight:700;text-transform:uppercase;
          letter-spacing:.05em;padding:.2rem .6rem;border-radius:9999px;
          margin-left:.5rem;
        }
        .modal-close{
          width:34px;height:34px;border-radius:50%;
          background:var(--cream);border:1.5px solid var(--cream-dk);
          display:flex;align-items:center;justify-content:center;
          font-size:1.1rem;cursor:pointer;color:var(--stone);
          transition:all .15s;flex-shrink:0;
        }
        .modal-close:hover{background:var(--cream-dk);color:var(--forest);}

        /* body */
        .modal-body{overflow-y:auto;flex:1;padding:1.5rem;}

        /* layout */
        .modal-layout{
          display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;
        }
        @media(max-width:580px){.modal-layout{grid-template-columns:1fr;}}

        /* image */
        .modal-img{
          background:var(--cream);border-radius:1rem;
          height:240px;display:flex;align-items:center;justify-content:center;
          overflow:hidden;font-size:4rem;
          border:1.5px solid var(--cream-dk);
        }
        .modal-img img{width:100%;height:100%;object-fit:cover;}

        /* right col */
        .modal-right{display:flex;flex-direction:column;gap:1rem;}

        /* info blocks */
        .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:.65rem;}
        .info-box{
          background:var(--cream);border-radius:.75rem;
          padding:.75rem;
        }
        .info-box__label{font-size:.7rem;text-transform:uppercase;letter-spacing:.06em;color:var(--stone);margin-bottom:.2rem;}
        .info-box__value{font-size:.95rem;font-weight:700;color:var(--forest);}

        .modal-desc{font-size:.875rem;color:var(--stone);line-height:1.6;}

        /* savings */
        .co2-savings{
          background:var(--lime-pale);border:1.5px solid #c5e875;
          border-radius:.75rem;padding:.75rem 1rem;
          font-size:.875rem;font-weight:600;color:var(--moss);
          display:flex;align-items:center;gap:.5rem;
        }

        /* eco section */
        .eco-section{
          border-top:1.5px solid var(--cream-dk);
          margin-top:.25rem;padding-top:1rem;
        }
        .eco-row{display:flex;gap:1rem;align-items:flex-start;}
        .eco-right{flex:1;}
        .eco-label{
          font-family:'Fraunces',serif;font-size:.95rem;font-weight:700;
          margin-bottom:.5rem;
        }
        .eco-badges{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:.65rem;}
        .eco-badge{
          font-size:.67rem;font-weight:700;padding:.2rem .55rem;
          border-radius:9999px;background:var(--lime-pale);
          color:var(--moss);text-transform:uppercase;letter-spacing:.05em;
        }
        .eco-expl{font-size:.8rem;color:var(--stone);line-height:1.5;font-style:italic;}
        .eco-fallback{
          padding:.65rem .85rem;background:var(--amber-pale);
          border:1px solid #f5d88a;border-radius:.65rem;font-size:.82rem;color:#7a5c00;
        }

        /* footer */
        .modal-footer{
          padding:1.1rem 1.5rem;border-top:1.5px solid var(--cream-dk);
          display:flex;gap:.65rem;flex-wrap:wrap;flex-shrink:0;
          background:var(--white);
        }
        .mf-btn{
          display:inline-flex;align-items:center;gap:.4rem;
          padding:.65rem 1.2rem;border-radius:9999px;
          font-family:'DM Sans',system-ui,sans-serif;
          font-size:.875rem;font-weight:700;
          border:none;cursor:pointer;transition:all .2s;white-space:nowrap;
        }
        .mf-btn:disabled{opacity:.5;cursor:not-allowed;}
        .mf-btn--forest{background:var(--forest);color:var(--lime);}
        .mf-btn--forest:hover:not(:disabled){background:var(--moss);transform:translateY(-1px);}
        .mf-btn--lime{background:var(--lime);color:var(--forest);}
        .mf-btn--lime:hover:not(:disabled){background:#9acb38;transform:translateY(-1px);}
        .mf-btn--ghost{background:transparent;color:var(--stone);border:1.5px solid var(--cream-dk);}
        .mf-btn--ghost:hover{background:var(--cream);}
        .mf-spinner{
          width:12px;height:12px;border-radius:50%;
          border:2px solid currentColor;border-top-color:transparent;
          animation:sp .7s linear infinite;
        }
        @keyframes sp{to{transform:rotate(360deg)}}
      `}</style>

      <div className="modal-overlay" onClick={e => { if (e.target===e.currentTarget) onClose(); }}>
        <div className="modal-panel" role="dialog" aria-modal="true">

          {/* Header */}
          <div className="modal-header">
            <div className="modal-header__left">
              <div>
                <p className="modal-header__cat">{product.category}</p>
                <p className="modal-header__name">
                  {product.name}
                  {isAltView && <span className="modal-header__alt-pill">♻ Eco Alt</span>}
                </p>
              </div>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <div className="modal-layout">
              {/* Image */}
              <div className="modal-img">
                {product.image_url
                  ? <img src={product.image_url} alt={product.name}/>
                  : '🌿'}
              </div>

              {/* Right */}
              <div className="modal-right">
                {product.description && (
                  <p className="modal-desc">{product.description}</p>
                )}

                <div className="info-grid">
                  <div className="info-box">
                    <p className="info-box__label">Price</p>
                    <p className="info-box__value">₹{product.price?.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="info-box">
                    <p className="info-box__label">Category</p>
                    <p className="info-box__value" style={{fontSize:'.85rem'}}>{product.category}</p>
                  </div>
                  {product.brand && (
                    <div className="info-box">
                      <p className="info-box__label">Brand</p>
                      <p className="info-box__value" style={{fontSize:'.85rem'}}>{product.brand}</p>
                    </div>
                  )}
                  {product.material && (
                    <div className="info-box">
                      <p className="info-box__label">Material</p>
                      <p className="info-box__value" style={{fontSize:'.78rem',fontWeight:500,color:'var(--stone)'}}>{product.material}</p>
                    </div>
                  )}
                </div>

                {/* CO₂ savings if alt view */}
                {isAltView && co2Savings > 0 && (
                  <div className="co2-savings">
                    🌍 Saves {co2Savings.toFixed(2)} kg CO₂ vs original
                  </div>
                )}

                {/* Eco score */}
                {ecoScore && (
                  <div className="eco-section">
                    {ecoScore.isFallback ? (
                      <div className="eco-fallback">{ecoScore.explanation}</div>
                    ) : (
                      <div className="eco-row">
                        <MiniGauge score={ecoScore.ecoScore}/>
                        <div className="eco-right">
                          <p className="eco-label" style={{color:scoreColor(ecoScore.ecoScore)}}>
                            {scoreLabel(ecoScore.ecoScore)} — {ecoScore.ecoScore}/100
                          </p>
                          {ecoScore.badges?.length > 0 && (
                            <div className="eco-badges">
                              {ecoScore.badges.map(b=><span key={b} className="eco-badge">{b}</span>)}
                            </div>
                          )}
                          {ecoScore.explanation && (
                            <p className="eco-expl">"{ecoScore.explanation}"</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="mf-btn mf-btn--forest" onClick={addToCart}>
              🛒 Add to Cart
            </button>

            {!ecoScore && (
              <button className="mf-btn mf-btn--lime"
                onClick={() => fetchEcoScore(product)}
                disabled={ecoLoading}>
                {ecoLoading
                  ? <><span className="mf-spinner"/> Analysing…</>
                  : '🌍 Check EcoScore'}
              </button>
            )}

            <button className="mf-btn mf-btn--ghost" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>

      {toast && <Toast msg={toast} onDone={()=>setToast(null)}/>}
    </>
  );
}