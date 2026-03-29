// src/components/ProductsList.jsx
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import api from '../utils/api';

// // ─── phase constants ───────────────────────────────────────
// const PHASE = {
//   IDLE:        'idle',
//   SCORE_LOAD:  'score_loading',
//   SCORE_DONE:  'score_done',
//   ALT_LOAD:    'alt_loading',
//   ALT_DONE:    'alt_done',
// };

// // ─── eco score colour ──────────────────────────────────────
// function scoreColor(score) {
//   if (score >= 75) return '#2d5a3d';
//   if (score >= 50) return '#7aad3a';
//   if (score >= 25) return '#f5a623';
//   return '#e05252';
// }

// function scoreLabel(score) {
//   if (score >= 75) return 'Excellent';
//   if (score >= 50) return 'Good';
//   if (score >= 25) return 'Fair';
//   return 'Poor';
// }

// // ─── arc gauge SVG ─────────────────────────────────────────
// function EcoGauge({ score }) {
//   const r = 52, cx = 70, cy = 70;
//   const circ = Math.PI * r;            // half circle
//   const dash = (score / 100) * circ;
//   const col  = scoreColor(score);

//   return (
//     <svg viewBox="0 0 140 80" className="eco-gauge">
//       {/* track */}
//       <path d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
//         fill="none" stroke="#e0dbd0" strokeWidth="10" strokeLinecap="round" />
//       {/* fill */}
//       <path d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
//         fill="none" stroke={col} strokeWidth="10" strokeLinecap="round"
//         strokeDasharray={`${dash} ${circ}`}
//         style={{ transition: 'stroke-dasharray 1s cubic-bezier(.4,0,.2,1)' }} />
//       {/* score text */}
//       <text x={cx} y={cy - 8} textAnchor="middle"
//         style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700, fill: col }}>
//         {score}
//       </text>
//       <text x={cx} y={cy + 8} textAnchor="middle"
//         style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fill: '#8a8a7a' }}>
//         / 100
//       </text>
//     </svg>
//   );
// }

// // ─── badge chip ────────────────────────────────────────────
// function Badge({ label }) {
//   return <span className="eco-badge">{label}</span>;
// }

// // ─── carbon row ────────────────────────────────────────────
// function CarbonRow({ label, value }) {
//   return (
//     <div className="carbon-row">
//       <span className="carbon-label">{label}</span>
//       <span className="carbon-value">{value !== null && value !== undefined ? `${Number(value).toFixed(2)} kg` : '—'}</span>
//     </div>
//   );
// }

// // ─── product card (in grid) ────────────────────────────────
// function ProductCard({ product, isSelected, onClick }) {
//   return (
//     <button
//       className={`prod-card ${isSelected ? 'prod-card--active' : ''}`}
//       onClick={() => onClick(product)}
//       aria-pressed={isSelected}
//     >
//       <div className="prod-card__img">
//         {product.image_url
//           ? <img src={product.image_url} alt={product.name} />
//           : <span className="prod-card__no-img">🌿</span>}
//       </div>
//       {isSelected && <div className="prod-card__sel-dot" />}
//       <div className="prod-card__body">
//         <p className="prod-card__cat">{product.category || 'Product'}</p>
//         <h3 className="prod-card__name">{product.name}</h3>
//         <p className="prod-card__price">₹{product.price}</p>
//       </div>
//     </button>
//   );
// }

// // ═══════════════════════════════════════════════════════════
// //  MAIN COMPONENT
// // ═══════════════════════════════════════════════════════════
// export default function ProductsList() {
//   const [products,    setProducts]    = useState([]);
//   const [q,           setQ]           = useState('');
//   const [loading,     setLoading]     = useState(false);

//   const [selected,    setSelected]    = useState(null);   // product object
//   const [phase,       setPhase]       = useState(PHASE.IDLE);
//   const [ecoScore,    setEcoScore]    = useState(null);   // API result
//   const [alternative, setAlternative] = useState(null);   // { alternative, ecoScore }

//   const detailRef   = useRef(null);
//   const searchTimer = useRef(null);

//   // ── fetch products from backend ──────────────────────────
//   const fetchProducts = useCallback(async (query) => {
//     setLoading(true);
//     try {
//       const params = query ? `?q=${encodeURIComponent(query)}` : '';
//       const res = await api.get(`/products${params}`);
//       // handle both { data: [...] } and [...] shapes
//       setProducts(Array.isArray(res.data) ? res.data : (res.data?.data ?? []));
//     } catch {
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => { fetchProducts(''); }, [fetchProducts]);

//   // ── debounced search ─────────────────────────────────────
//   const handleSearch = (val) => {
//     setQ(val);
//     clearTimeout(searchTimer.current);
//     searchTimer.current = setTimeout(() => fetchProducts(val), 350);
//     // reset panel when query changes
//     setSelected(null);
//     setPhase(PHASE.IDLE);
//     setEcoScore(null);
//     setAlternative(null);
//   };

//   // ── select product ───────────────────────────────────────
//   const handleSelect = (product) => {
//     if (selected?._id === product._id) {
//       // deselect
//       setSelected(null);
//       setPhase(PHASE.IDLE);
//       setEcoScore(null);
//       setAlternative(null);
//       return;
//     }
//     setSelected(product);
//     setPhase(PHASE.IDLE);
//     setEcoScore(null);
//     setAlternative(null);
//     setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
//   };

//   // ── check eco score ──────────────────────────────────────
//   const handleCheckEcoScore = async () => {
//     setPhase(PHASE.SCORE_LOAD);
//     try {
//       const res = await api.post('/eco/score', selected);
//       setEcoScore(res.data?.data ?? res.data);
//       setPhase(PHASE.SCORE_DONE);
//     } catch {
//       setEcoScore({ isFallback: true, explanation: 'Could not fetch eco score.' });
//       setPhase(PHASE.SCORE_DONE);
//     }
//   };

//   // ── find green alternative ───────────────────────────────
//   const handleFindAlternative = async () => {
//     setPhase(PHASE.ALT_LOAD);
//     try {
//       const res = await api.post('/eco/alternative', {
//         product: selected,
//         searchQuery: q || selected.category || selected.name,
//       });
//       const data = res.data?.data ?? res.data;
//       setAlternative(data);
//       setPhase(PHASE.ALT_DONE);
//     } catch {
//       setAlternative({ found: false, message: 'Could not fetch alternatives.' });
//       setPhase(PHASE.ALT_DONE);
//     }
//   };

//   const isBusy = phase === PHASE.SCORE_LOAD || phase === PHASE.ALT_LOAD;

//   return (
//     <>
//       {/* ── styles ─────────────────────────────────────── */}
//       <style>{`
//         /* ── search bar ──────────────────────────────── */
//         .search-bar {
//           display: flex; gap: .75rem; margin-bottom: 2rem;
//         }
//         .search-input {
//           flex: 1; padding: .75rem 1.1rem;
//           border: 2px solid var(--cream-dk);
//           border-radius: var(--r);
//           font-family: 'DM Sans', sans-serif; font-size: 1rem;
//           background: var(--white); color: var(--forest);
//           outline: none; transition: border-color .2s;
//         }
//         .search-input:focus { border-color: var(--moss); }
//         .search-input::placeholder { color: var(--stone); }

//         /* ── grid ─────────────────────────────────────── */
//         .prod-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
//           gap: 1.25rem;
//           margin-bottom: 2rem;
//         }
//         .empty-state {
//           grid-column: 1/-1; text-align: center;
//           padding: 4rem 1rem; color: var(--stone);
//           font-size: 1rem;
//         }
//         .loading-state {
//           grid-column: 1/-1; text-align: center;
//           padding: 3rem 1rem; color: var(--stone);
//         }
//         .loading-dots span {
//           display: inline-block; width: 8px; height: 8px;
//           border-radius: 50%; background: var(--moss);
//           margin: 0 3px;
//           animation: bounce 1.2s infinite;
//         }
//         .loading-dots span:nth-child(2) { animation-delay: .2s; }
//         .loading-dots span:nth-child(3) { animation-delay: .4s; }
//         @keyframes bounce {
//           0%,80%,100% { transform: translateY(0); opacity:.4 }
//           40%          { transform: translateY(-8px); opacity:1 }
//         }

//         /* ── product card ─────────────────────────────── */
//         .prod-card {
//           position: relative; display: flex; flex-direction: column;
//           background: var(--white); border: 2px solid transparent;
//           border-radius: 1rem; overflow: hidden; cursor: pointer;
//           text-align: left; padding: 0;
//           transition: transform .2s, box-shadow .2s, border-color .2s;
//           box-shadow: 0 2px 8px rgba(0,0,0,.06);
//         }
//         .prod-card:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 8px 24px rgba(26,58,42,.12);
//         }
//         .prod-card--active {
//           border-color: var(--lime);
//           box-shadow: 0 0 0 4px rgba(181,224,72,.25), 0 8px 24px rgba(26,58,42,.12);
//           transform: translateY(-3px);
//         }
//         .prod-card__img {
//           height: 160px; background: var(--cream);
//           display: flex; align-items: center; justify-content: center;
//           overflow: hidden;
//         }
//         .prod-card__img img {
//           width: 100%; height: 100%; object-fit: cover;
//           transition: transform .4s;
//         }
//         .prod-card:hover .prod-card__img img { transform: scale(1.05); }
//         .prod-card__no-img { font-size: 2.5rem; }
//         .prod-card__sel-dot {
//           position: absolute; top: .6rem; right: .6rem;
//           width: 12px; height: 12px; border-radius: 50%;
//           background: var(--lime); border: 2px solid var(--white);
//         }
//         .prod-card__body { padding: .9rem 1rem 1rem; }
//         .prod-card__cat {
//           font-size: .72rem; text-transform: uppercase; letter-spacing: .08em;
//           color: var(--stone); margin-bottom: .25rem;
//         }
//         .prod-card__name {
//           font-family: 'Fraunces', serif; font-size: 1rem; font-weight: 600;
//           color: var(--forest); line-height: 1.3; margin-bottom: .4rem;
//         }
//         .prod-card__price {
//           font-size: .9rem; font-weight: 600; color: var(--moss);
//         }

//         /* ── detail panel ─────────────────────────────── */
//         .detail-panel {
//           background: var(--white);
//           border: 2px solid var(--cream-dk);
//           border-radius: 1.25rem;
//           padding: 2rem;
//           animation: slideUp .3s cubic-bezier(.4,0,.2,1);
//           margin-bottom: 2rem;
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }

//         .detail-header {
//           display: flex; gap: 1.5rem; align-items: flex-start;
//           margin-bottom: 1.5rem; flex-wrap: wrap;
//         }
//         .detail-img {
//           width: 110px; height: 110px; border-radius: .75rem;
//           object-fit: cover; background: var(--cream);
//           flex-shrink: 0; display: flex; align-items: center;
//           justify-content: center; font-size: 2.5rem;
//         }
//         .detail-img img { width:100%; height:100%; object-fit:cover; border-radius:.75rem; }

//         .detail-info { flex: 1; min-width: 0; }
//         .detail-cat {
//           font-size: .75rem; text-transform: uppercase;
//           letter-spacing: .08em; color: var(--stone);
//         }
//         .detail-name {
//           font-family: 'Fraunces', serif; font-size: 1.5rem;
//           font-weight: 700; color: var(--forest);
//           line-height: 1.2; margin: .2rem 0 .5rem;
//         }
//         .detail-desc { font-size: .9rem; color: var(--stone); line-height: 1.5; }
//         .detail-price {
//           font-size: 1.15rem; font-weight: 600;
//           color: var(--moss); margin-top: .5rem;
//         }

//         /* ── CTA buttons ──────────────────────────────── */
//         .cta-row { display: flex; gap: .75rem; flex-wrap: wrap; }

//         .btn-eco {
//           display: inline-flex; align-items: center; gap: .5rem;
//           padding: .65rem 1.4rem; border-radius: 2rem;
//           font-family: 'DM Sans', sans-serif; font-size: .9rem;
//           font-weight: 600; cursor: pointer; border: none;
//           transition: all .2s; white-space: nowrap;
//         }
//         .btn-eco:disabled { opacity: .55; cursor: not-allowed; }

//         .btn-primary {
//           background: var(--forest); color: var(--lime);
//         }
//         .btn-primary:hover:not(:disabled) {
//           background: var(--moss); transform: translateY(-1px);
//         }

//         .btn-alt {
//           background: var(--lime); color: var(--forest);
//         }
//         .btn-alt:hover:not(:disabled) {
//           background: var(--lime-dim); transform: translateY(-1px);
//         }

//         .btn-ghost {
//           background: transparent; color: var(--stone);
//           border: 1.5px solid var(--cream-dk);
//         }
//         .btn-ghost:hover:not(:disabled) { background: var(--cream); }

//         /* ── spinner ──────────────────────────────────── */
//         .spinner {
//           width: 14px; height: 14px; border-radius: 50%;
//           border: 2px solid currentColor; border-top-color: transparent;
//           animation: spin .7s linear infinite; display: inline-block;
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }

//         /* ── score section ────────────────────────────── */
//         .score-section {
//           margin-top: 1.5rem; padding-top: 1.5rem;
//           border-top: 1.5px solid var(--cream-dk);
//           animation: slideUp .3s ease;
//         }
//         .score-section__title {
//           font-family: 'Fraunces', serif; font-size: 1.1rem;
//           color: var(--forest); font-weight: 600;
//           margin-bottom: 1rem;
//         }
//         .score-main { display: flex; gap: 2rem; flex-wrap: wrap; align-items: flex-start; }

//         .eco-gauge { width: 140px; flex-shrink: 0; }

//         .score-right { flex: 1; min-width: 200px; }

//         .score-label {
//           font-family: 'Fraunces', serif;
//           font-size: 1rem; font-weight: 600; margin-bottom: .75rem;
//         }

//         /* badges */
//         .badge-row { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: 1rem; }
//         .eco-badge {
//           font-size: .72rem; font-weight: 600; padding: .25rem .65rem;
//           border-radius: 2rem; background: #e8f5d8; color: var(--moss);
//           text-transform: uppercase; letter-spacing: .05em;
//         }

//         /* carbon breakdown */
//         .carbon-table {
//           background: var(--cream); border-radius: .6rem;
//           padding: .75rem 1rem; margin-bottom: .75rem;
//         }
//         .carbon-row {
//           display: flex; justify-content: space-between;
//           font-size: .82rem; padding: .2rem 0;
//         }
//         .carbon-label { color: var(--stone); }
//         .carbon-value { font-weight: 600; color: var(--forest); }

//         .score-explanation {
//           font-size: .85rem; color: var(--stone); line-height: 1.55;
//           font-style: italic;
//         }

//         .fallback-note {
//           padding: .75rem 1rem; background: #fff8e6;
//           border: 1px solid #f5d88a; border-radius: .5rem;
//           font-size: .85rem; color: #7a5c00;
//         }

//         /* ── alternative section ──────────────────────── */
//         .alt-section {
//           margin-top: 1.5rem; padding-top: 1.5rem;
//           border-top: 1.5px solid var(--cream-dk);
//           animation: slideUp .3s ease;
//         }
//         .alt-section__title {
//           font-family: 'Fraunces', serif; font-size: 1.1rem;
//           color: var(--forest); font-weight: 600; margin-bottom: .25rem;
//         }
//         .alt-section__reason {
//           font-size: .83rem; color: var(--stone); margin-bottom: 1rem;
//           font-style: italic;
//         }

//         .alt-card {
//           display: flex; gap: 1.25rem; align-items: flex-start;
//           background: #f0fae6; border: 2px solid #b5e048;
//           border-radius: 1rem; padding: 1.25rem; flex-wrap: wrap;
//         }
//         .alt-card__img {
//           width: 90px; height: 90px; border-radius: .6rem;
//           object-fit: cover; background: var(--cream);
//           display: flex; align-items: center; justify-content: center;
//           font-size: 2rem; flex-shrink: 0;
//         }
//         .alt-card__img img { width:100%; height:100%; object-fit:cover; border-radius:.6rem; }
//         .alt-card__info { flex: 1; min-width: 0; }
//         .alt-card__name {
//           font-family: 'Fraunces', serif; font-size: 1.1rem;
//           font-weight: 700; color: var(--forest); margin-bottom: .25rem;
//         }
//         .alt-card__cat { font-size: .78rem; color: var(--stone); margin-bottom: .5rem; }
//         .alt-card__price { font-size: .9rem; font-weight: 600; color: var(--moss); }

//         .alt-score-badge {
//           display: flex; flex-direction: column; align-items: center;
//           justify-content: center; min-width: 80px;
//           background: var(--white); border-radius: .75rem;
//           padding: .75rem 1rem; flex-shrink: 0; text-align: center;
//         }
//         .alt-score-num {
//           font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 700;
//           line-height: 1;
//         }
//         .alt-score-lbl {
//           font-size: .7rem; font-weight: 600; text-transform: uppercase;
//           letter-spacing: .06em; margin-top: .2rem;
//         }
//         .alt-score-caption {
//           font-size: .65rem; color: var(--stone); margin-top: .15rem;
//         }

//         .alt-not-found {
//           padding: 1rem 1.25rem; background: var(--cream);
//           border-radius: .75rem; color: var(--stone); font-size: .9rem;
//         }
//       `}</style>

//       {/* ── search bar ─────────────────────────────────── */}
//       <div className="search-bar">
//         <input
//           className="search-input"
//           value={q}
//           onChange={e => handleSearch(e.target.value)}
//           placeholder="Search products by name, category or description…"
//           aria-label="Search products"
//         />
//       </div>

//       {/* ── product grid ───────────────────────────────── */}
//       <div className="prod-grid">
//         {loading ? (
//           <div className="loading-state">
//             <div className="loading-dots">
//               <span /><span /><span />
//             </div>
//           </div>
//         ) : products.length === 0 ? (
//           <div className="empty-state">No products found{q ? ` for "${q}"` : ''}.</div>
//         ) : (
//           products.map(p => (
//             <ProductCard
//               key={p._id}
//               product={p}
//               isSelected={selected?._id === p._id}
//               onClick={handleSelect}
//             />
//           ))
//         )}
//       </div>

//       {/* ── detail panel ───────────────────────────────── */}
//       {selected && (
//         <div className="detail-panel" ref={detailRef}>

//           {/* header row */}
//           <div className="detail-header">
//             <div className="detail-img">
//               {selected.image_url
//                 ? <img src={selected.image_url} alt={selected.name} />
//                 : '🌿'}
//             </div>
//             <div className="detail-info">
//               <p className="detail-cat">{selected.category || 'Product'}</p>
//               <h2 className="detail-name">{selected.name}</h2>
//               {selected.description && <p className="detail-desc">{selected.description}</p>}
//               <p className="detail-price">₹{selected.price}</p>
//             </div>
//           </div>

//           {/* CTA buttons */}
//           <div className="cta-row">
//             {/* Show "Check EcoScore" only if we haven't loaded it yet */}
//             {phase === PHASE.IDLE && (
//               <button className="btn-eco btn-primary" onClick={handleCheckEcoScore}>
//                 🌍 Check EcoScore
//               </button>
//             )}

//             {phase === PHASE.SCORE_LOAD && (
//               <button className="btn-eco btn-primary" disabled>
//                 <span className="spinner" /> Analysing…
//               </button>
//             )}

//             {/* After score is shown, switch to "Find Greener Alternative" */}
//             {(phase === PHASE.SCORE_DONE || phase === PHASE.ALT_LOAD || phase === PHASE.ALT_DONE) && (
//               <button
//                 className="btn-eco btn-alt"
//                 onClick={handleFindAlternative}
//                 disabled={isBusy || phase === PHASE.ALT_DONE}
//               >
//                 {phase === PHASE.ALT_LOAD
//                   ? <><span className="spinner" /> Finding…</>
//                   : phase === PHASE.ALT_DONE
//                     ? '✅ Alternative Found'
//                     : '🔍 Find Greener Alternative'}
//               </button>
//             )}

//             <button
//               className="btn-eco btn-ghost"
//               onClick={() => { setSelected(null); setPhase(PHASE.IDLE); setEcoScore(null); setAlternative(null); }}
//             >
//               Close
//             </button>
//           </div>

//           {/* ── eco score section ─────────────────────── */}
//           {ecoScore && (
//             <div className="score-section">
//               <p className="score-section__title">🌱 EcoScore Analysis</p>

//               {ecoScore.isFallback ? (
//                 <div className="fallback-note">{ecoScore.explanation}</div>
//               ) : (
//                 <div className="score-main">
//                   <EcoGauge score={ecoScore.ecoScore} />

//                   <div className="score-right">
//                     <p className="score-label" style={{ color: scoreColor(ecoScore.ecoScore) }}>
//                       {scoreLabel(ecoScore.ecoScore)} — {ecoScore.ecoScore}/100
//                     </p>

//                     {ecoScore.badges?.length > 0 && (
//                       <div className="badge-row">
//                         {ecoScore.badges.map(b => <Badge key={b} label={b} />)}
//                       </div>
//                     )}

//                     {ecoScore.breakdown && (
//                       <div className="carbon-table">
//                         <CarbonRow label="Material carbon"      value={ecoScore.breakdown.materialCarbon} />
//                         <CarbonRow label="Packaging carbon"     value={ecoScore.breakdown.packagingCarbon} />
//                         <CarbonRow label="Manufacturing"        value={ecoScore.breakdown.manufacturingOverhead} />
//                         <CarbonRow label="Transport estimate"   value={ecoScore.breakdown.transportEstimate} />
//                         <CarbonRow label="Total CO₂e"           value={ecoScore.carbonFootprint} />
//                       </div>
//                     )}

//                     {ecoScore.explanation && (
//                       <p className="score-explanation">"{ecoScore.explanation}"</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── alternative section ───────────────────── */}
//           {alternative && (
//             <div className="alt-section">
//               <p className="alt-section__title">♻️ Greener Alternative</p>
//               {alternative.aiReason && (
//                 <p className="alt-section__reason">{alternative.aiReason}</p>
//               )}

//               {alternative.found === false ? (
//                 <div className="alt-not-found">
//                   {alternative.message || 'No greener alternative found in the database.'}
//                 </div>
//               ) : alternative.alternative ? (
//                 <div className="alt-card">
//                   <div className="alt-card__img">
//                     {alternative.alternative.image_url
//                       ? <img src={alternative.alternative.image_url} alt={alternative.alternative.name} />
//                       : '🌿'}
//                   </div>

//                   <div className="alt-card__info">
//                     <p className="alt-card__cat">{alternative.alternative.category}</p>
//                     <p className="alt-card__name">{alternative.alternative.name}</p>
//                     {alternative.alternative.description && (
//                       <p className="score-explanation" style={{ marginTop: '.3rem' }}>
//                         {alternative.alternative.description}
//                       </p>
//                     )}
//                     <p className="alt-card__price" style={{ marginTop: '.5rem' }}>
//                       ₹{alternative.alternative.price}
//                     </p>

//                     {/* badges of the alternative */}
//                     {alternative.ecoScore?.badges?.length > 0 && (
//                       <div className="badge-row" style={{ marginTop: '.6rem' }}>
//                         {alternative.ecoScore.badges.map(b => <Badge key={b} label={b} />)}
//                       </div>
//                     )}
//                   </div>

//                   {/* big score badge */}
//                   {alternative.ecoScore && !alternative.ecoScore.isFallback && (
//                     <div className="alt-score-badge">
//                       <span className="alt-score-num"
//                         style={{ color: scoreColor(alternative.ecoScore.ecoScore) }}>
//                         {alternative.ecoScore.ecoScore}
//                       </span>
//                       <span className="alt-score-lbl"
//                         style={{ color: scoreColor(alternative.ecoScore.ecoScore) }}>
//                         {scoreLabel(alternative.ecoScore.ecoScore)}
//                       </span>
//                       <span className="alt-score-caption">EcoScore</span>
//                     </div>
//                   )}
//                 </div>
//               ) : null}
//             </div>
//           )}

//         </div>
//       )}
//     </>
//   );
// }



// // src/components/ProductsList.jsx
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import api from '../utils/api';

// const PHASE = {
//   IDLE:'idle', SCORE_LOAD:'score_loading',
//   SCORE_DONE:'score_done', ALT_LOAD:'alt_loading', ALT_DONE:'alt_done',
// };

// const scoreColor = s => s>=75?'#2d5a3d':s>=50?'#5a9e3a':s>=25?'#e08c20':'#c94444';
// const scoreLabel = s => s>=75?'Excellent':s>=50?'Good':s>=25?'Fair':'Poor';

// // ─── Toast ────────────────────────────────────────────────
// function Toast({ msg, onDone }) {
//   useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, [onDone]);
//   return (
//     <div style={{
//       position:'fixed', bottom:'1.5rem', right:'1.5rem', zIndex:9999,
//       background:'var(--forest)', color:'var(--lime)',
//       padding:'.7rem 1.25rem', borderRadius:'9999px',
//       fontSize:'.875rem', fontWeight:600,
//       display:'flex', alignItems:'center', gap:'.5rem',
//       boxShadow:'0 8px 32px rgba(26,58,42,.3)',
//       animation:'tpop .3s ease both',
//     }}>
//       ✓ {msg}
//       <style>{`@keyframes tpop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
//     </div>
//   );
// }

// // ─── Semi-circle gauge ────────────────────────────────────
// function EcoGauge({ score }) {
//   const r=52, cx=70, cy=68, circ=Math.PI*r;
//   const dash=(score/100)*circ, col=scoreColor(score);
//   return (
//     <svg viewBox="0 0 140 78" style={{width:140,flexShrink:0}}>
//       <path d={`M ${cx-r},${cy} A ${r},${r} 0 0 1 ${cx+r},${cy}`}
//         fill="none" stroke="var(--cream-dk)" strokeWidth="10" strokeLinecap="round"/>
//       <path d={`M ${cx-r},${cy} A ${r},${r} 0 0 1 ${cx+r},${cy}`}
//         fill="none" stroke={col} strokeWidth="10" strokeLinecap="round"
//         strokeDasharray={`${dash} ${circ}`}
//         style={{transition:'stroke-dasharray 1s cubic-bezier(.4,0,.2,1)'}}/>
//       <text x={cx} y={cy-10} textAnchor="middle"
//         style={{fontFamily:'var(--font-display)',fontSize:26,fontWeight:700,fill:col}}>{score}</text>
//       <text x={cx} y={cy+6} textAnchor="middle"
//         style={{fontFamily:'var(--font-body)',fontSize:11,fill:'var(--stone)'}}>/ 100</text>
//     </svg>
//   );
// }

// // ─── Carbon row ───────────────────────────────────────────
// function CRow({ label, val }) {
//   return (
//     <div style={{display:'flex',justifyContent:'space-between',
//       fontSize:'.82rem',padding:'.22rem 0',borderBottom:'1px solid var(--cream-dk)'}}>
//       <span style={{color:'var(--stone)'}}>{label}</span>
//       <span style={{fontWeight:600,color:'var(--forest)'}}>
//         {val!=null?`${Number(val).toFixed(2)} kg`:'—'}
//       </span>
//     </div>
//   );
// }

// // ─── Product card ─────────────────────────────────────────
// function ProductCard({ product, isSelected, onClick }) {
//   return (
//     <button className={`pcard ${isSelected?'pcard--sel':''}`} onClick={()=>onClick(product)}>
//       {isSelected && <div className="pcard__dot"/>}
//       <div className="pcard__img">
//         {product.image_url
//           ? <img src={product.image_url} alt={product.name}/>
//           : <span style={{fontSize:'2.5rem'}}>🌿</span>}
//       </div>
//       <div className="pcard__body">
//         <p className="pcard__cat">{product.category||'Product'}</p>
//         <h3 className="pcard__name">{product.name}</h3>
//         <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'auto'}}>
//           <span className="pcard__price">₹{product.price?.toLocaleString('en-IN')}</span>
//           {product.brand && <span style={{fontSize:'.68rem',color:'var(--stone-lt)'}}>{product.brand}</span>}
//         </div>
//       </div>
//     </button>
//   );
// }

// // ─── Cart helper ──────────────────────────────────────────
// function pushToCart(product, opts={}) {
//   const cart = JSON.parse(localStorage.getItem('cart')||'[]');
//   cart.push({
//     productId:        product._id,
//     name:             product.name,
//     price:            product.price,
//     carbonFootprint:  opts.carbonFootprint ?? 0,
//     originalProductId:opts.originalProductId ?? product._id,
//     usedAlternative:  opts.usedAlternative ?? false,
//     co2Savings:       opts.co2Savings ?? 0,
//     qty:              1,
//   });
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// // ═══════════════════════════════════════════════════════════
// export default function ProductsList() {
//   const [products,    setProducts]    = useState([]);
//   const [q,           setQ]           = useState('');
//   const [loading,     setLoading]     = useState(false);
//   const [selected,    setSelected]    = useState(null);
//   const [phase,       setPhase]       = useState(PHASE.IDLE);
//   const [ecoScore,    setEcoScore]    = useState(null);
//   const [alternative, setAlternative] = useState(null);
//   const [toast,       setToast]       = useState(null);

//   const detailRef   = useRef(null);
//   const searchTimer = useRef(null);

//   const fetchProducts = useCallback(async (query)=>{
//     setLoading(true);
//     try {
//       const params = query ? `?q=${encodeURIComponent(query)}`:'';
//       const res = await api.get(`/products${params}`);
//       setProducts(Array.isArray(res.data)?res.data:(res.data?.data??[]));
//     } catch { setProducts([]); }
//     finally  { setLoading(false); }
//   },[]);

//   useEffect(()=>{ fetchProducts(''); },[fetchProducts]);

//   const resetPanel = ()=>{
//     setSelected(null); setPhase(PHASE.IDLE);
//     setEcoScore(null); setAlternative(null);
//   };

//   const handleSearch = val=>{
//     setQ(val);
//     clearTimeout(searchTimer.current);
//     searchTimer.current = setTimeout(()=>fetchProducts(val), 350);
//     resetPanel();
//   };

//   const handleSelect = product=>{
//     if (selected?._id===product._id){ resetPanel(); return; }
//     setSelected(product); setPhase(PHASE.IDLE);
//     setEcoScore(null); setAlternative(null);
//     setTimeout(()=>detailRef.current?.scrollIntoView({behavior:'smooth',block:'start'}),80);
//   };

//   const handleCheckEcoScore = async ()=>{
//     setPhase(PHASE.SCORE_LOAD);
//     try {
//       const res = await api.post('/eco/score', selected);
//       setEcoScore(res.data?.data??res.data);
//       setPhase(PHASE.SCORE_DONE);
//     } catch {
//       setEcoScore({isFallback:true,explanation:'Could not fetch eco score.'});
//       setPhase(PHASE.SCORE_DONE);
//     }
//   };

//   const handleFindAlternative = async ()=>{
//     setPhase(PHASE.ALT_LOAD);
//     try {
//       const res = await api.post('/eco/alternative',{
//         product:selected,
//         searchQuery:q||selected.category||selected.name,
//       });
//       setAlternative(res.data?.data??res.data);
//       setPhase(PHASE.ALT_DONE);
//     } catch {
//       setAlternative({found:false,message:'Could not fetch alternatives.'});
//       setPhase(PHASE.ALT_DONE);
//     }
//   };

//   const handleAddOriginalToCart = ()=>{
//     pushToCart(selected,{ carbonFootprint:ecoScore?.carbonFootprint??0 });
//     setToast(`${selected.name} added to cart!`);
//   };

//   const handleAddAltToCart = ()=>{
//     const alt    = alternative.alternative;
//     const altCO2 = alternative.ecoScore?.carbonFootprint??0;
//     const origCO2= ecoScore?.carbonFootprint??0;
//     const savings= Math.max(0, origCO2-altCO2);
//     pushToCart(alt,{
//       carbonFootprint:   altCO2,
//       originalProductId: selected._id,
//       usedAlternative:   true,
//       co2Savings:        parseFloat(savings.toFixed(3)),
//     });
//     setToast(`${alt.name} added to cart! 🌿`);
//   };

//   const isBusy = phase===PHASE.SCORE_LOAD||phase===PHASE.ALT_LOAD;

//   return (
//     <>
//       <style>{`
//         /* ── Variables (override if not set globally) ── */
//         :root{
//           --forest:#1a3a2a;--moss:#2d5a3d;--moss-light:#3d7a52;
//           --lime:#b5e048;--lime-dim:#9acb38;--lime-pale:#e8f5d8;
//           --cream:#f5f0e8;--cream-dk:#ede8de;--cream-dkr:#ddd8ce;
//           --stone:#8a8a7a;--stone-lt:#b0b0a0;--white:#ffffff;
//           --red:#e05252;--amber:#f5a623;--amber-pale:#fff8e6;
//           --font-display:'Fraunces',Georgia,serif;
//           --font-body:'DM Sans',system-ui,sans-serif;
//           --shadow-sm:0 1px 4px rgba(0,0,0,.06);
//           --shadow:0 2px 12px rgba(26,58,42,.08);
//           --shadow-lg:0 8px 32px rgba(26,58,42,.12);
//         }

//         /* ── Search ────────────────────────────────── */
//         .pl-search{display:flex;gap:.75rem;margin-bottom:1.5rem;}
//         .pl-sbox{
//           flex:1;display:flex;align-items:center;gap:.6rem;
//           background:var(--white);border:2px solid var(--cream-dk);
//           border-radius:9999px;padding:0 1.1rem;
//           transition:border-color .2s;
//         }
//         .pl-sbox:focus-within{border-color:var(--moss);}
//         .pl-sbox input{
//           flex:1;border:none;outline:none;background:transparent;
//           font-family:var(--font-body);font-size:.95rem;
//           color:var(--forest);padding:.72rem 0;
//         }
//         .pl-sbox input::placeholder{color:var(--stone-lt);}
//         .pl-clear{
//           background:none;border:none;cursor:pointer;
//           color:var(--stone);font-size:1.1rem;padding:.2rem;
//           border-radius:50%;transition:color .15s;line-height:1;
//         }
//         .pl-clear:hover{color:var(--forest);}

//         /* results bar */
//         .pl-rbar{
//           display:flex;align-items:center;justify-content:space-between;
//           margin-bottom:1rem;font-size:.82rem;color:var(--stone);
//         }
//         .pl-rbar strong{color:var(--forest);}

//         /* ── Grid ──────────────────────────────────── */
//         .pgrid{
//           display:grid;
//           grid-template-columns:repeat(auto-fill,minmax(195px,1fr));
//           gap:1rem;margin-bottom:1.75rem;
//         }
//         .pgrid-empty{
//           grid-column:1/-1;text-align:center;
//           padding:4rem 1rem;color:var(--stone);
//         }
//         .ldots{grid-column:1/-1;display:flex;justify-content:center;gap:.5rem;padding:3rem;}
//         .ldot{
//           width:9px;height:9px;border-radius:50%;
//           background:var(--moss);opacity:.4;
//           animation:ldot 1.2s ease infinite;
//         }
//         .ldot:nth-child(2){animation-delay:.15s}
//         .ldot:nth-child(3){animation-delay:.3s}
//         @keyframes ldot{40%{opacity:1;transform:translateY(-6px)}0%,80%,100%{opacity:.4;transform:none}}

//         /* ── Product card ──────────────────────────── */
//         .pcard{
//           position:relative;display:flex;flex-direction:column;
//           background:var(--white);border:2px solid transparent;
//           border-radius:1.1rem;overflow:hidden;cursor:pointer;
//           text-align:left;padding:0;
//           box-shadow:var(--shadow-sm);
//           transition:transform .2s,box-shadow .2s,border-color .2s;
//         }
//         .pcard:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--cream-dkr);}
//         .pcard--sel{
//           border-color:var(--lime)!important;
//           box-shadow:0 0 0 4px rgba(181,224,72,.2),var(--shadow-lg)!important;
//           transform:translateY(-4px);
//         }
//         .pcard__dot{
//           position:absolute;top:.6rem;right:.6rem;
//           width:10px;height:10px;border-radius:50%;
//           background:var(--lime);border:2px solid var(--white);
//         }
//         .pcard__img{
//           height:148px;background:var(--cream);
//           display:flex;align-items:center;justify-content:center;overflow:hidden;
//         }
//         .pcard__img img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
//         .pcard:hover .pcard__img img{transform:scale(1.06);}
//         .pcard__body{padding:.85rem 1rem 1rem;flex:1;display:flex;flex-direction:column;}
//         .pcard__cat{font-size:.67rem;text-transform:uppercase;letter-spacing:.08em;color:var(--stone);margin-bottom:.2rem;}
//         .pcard__name{
//           font-family:var(--font-display);font-size:.95rem;font-weight:600;
//           color:var(--forest);line-height:1.25;margin-bottom:.5rem;flex:1;
//         }
//         .pcard__price{font-size:.9rem;font-weight:700;color:var(--moss);}

//         /* ── Detail panel ──────────────────────────── */
//         .dpanel{
//           background:var(--white);
//           border:2px solid var(--cream-dk);
//           border-radius:1.35rem;padding:1.75rem;
//           margin-bottom:2rem;
//           animation:slideUp .35s cubic-bezier(.4,0,.2,1);
//           scroll-margin-top:80px;
//         }
//         @keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}

//         .dheader{display:flex;gap:1.2rem;align-items:flex-start;flex-wrap:wrap;margin-bottom:1.35rem;}
//         .dimg{
//           width:96px;height:96px;border-radius:.85rem;
//           overflow:hidden;background:var(--cream);
//           display:flex;align-items:center;justify-content:center;
//           font-size:2.4rem;flex-shrink:0;
//         }
//         .dimg img{width:100%;height:100%;object-fit:cover;}
//         .dinfo{flex:1;min-width:0;}
//         .dcat{font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--stone);}
//         .dname{
//           font-family:var(--font-display);font-size:1.4rem;font-weight:700;
//           color:var(--forest);line-height:1.2;margin:.2rem 0 .35rem;
//         }
//         .ddesc{font-size:.875rem;color:var(--stone);line-height:1.55;margin-bottom:.45rem;}
//         .dprice{font-size:1.1rem;font-weight:700;color:var(--moss);}
//         .dmat{
//           margin-top:.5rem;font-size:.73rem;color:var(--stone);
//           display:flex;align-items:center;gap:.35rem;flex-wrap:wrap;
//         }

//         /* CTA row */
//         .cta-row{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.25rem;}

//         /* generic btn */
//         .btn{
//           display:inline-flex;align-items:center;gap:.45rem;
//           padding:.6rem 1.2rem;border-radius:9999px;
//           font-family:var(--font-body);font-size:.86rem;
//           font-weight:600;cursor:pointer;border:none;
//           transition:all .2s;white-space:nowrap;
//         }
//         .btn:disabled{opacity:.5;cursor:not-allowed;}
//         .btn-forest{background:var(--forest);color:var(--lime);}
//         .btn-forest:hover:not(:disabled){background:var(--moss);transform:translateY(-1px);box-shadow:var(--shadow);}
//         .btn-lime{background:var(--lime);color:var(--forest);}
//         .btn-lime:hover:not(:disabled){background:var(--lime-dim);transform:translateY(-1px);}
//         .btn-moss{background:var(--moss);color:#fff;}
//         .btn-moss:hover:not(:disabled){background:var(--moss-light);transform:translateY(-1px);}
//         .btn-ghost{background:transparent;color:var(--stone);border:1.5px solid var(--cream-dk);}
//         .btn-ghost:hover:not(:disabled){background:var(--cream);color:var(--forest);}
//         .spinner{
//           width:13px;height:13px;border-radius:50%;
//           border:2px solid currentColor;border-top-color:transparent;
//           animation:spin .7s linear infinite;flex-shrink:0;
//         }
//         @keyframes spin{to{transform:rotate(360deg)}}

//         /* ── Score section ──────────────────────────── */
//         .ssect{
//           margin-top:1.5rem;padding-top:1.5rem;
//           border-top:1.5px solid var(--cream-dk);
//           animation:slideUp .3s ease;
//         }
//         .ssect-title{
//           font-family:var(--font-display);font-size:1rem;font-weight:600;
//           color:var(--forest);margin-bottom:1rem;
//         }
//         .ssect-main{display:flex;gap:1.5rem;flex-wrap:wrap;align-items:flex-start;}
//         .ssect-right{flex:1;min-width:180px;}
//         .sscore-lbl{
//           font-family:var(--font-display);font-size:1rem;font-weight:700;
//           margin-bottom:.65rem;
//         }
//         .badge-row{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.85rem;}
//         .eco-badge{
//           font-size:.67rem;font-weight:700;padding:.22rem .6rem;
//           border-radius:9999px;background:var(--lime-pale);
//           color:var(--moss);text-transform:uppercase;letter-spacing:.05em;
//         }
//         .ctable{
//           background:var(--cream);border-radius:.6rem;
//           padding:.65rem .9rem;margin-bottom:.75rem;
//         }
//         .score-expl{font-size:.82rem;color:var(--stone);line-height:1.55;font-style:italic;}
//         .fallback-note{
//           padding:.75rem 1rem;background:var(--amber-pale);
//           border:1px solid #f5d88a;border-radius:.6rem;
//           font-size:.85rem;color:#7a5c00;
//         }

//         /* ── Alternative section ────────────────────── */
//         .asect{
//           margin-top:1.5rem;padding-top:1.5rem;
//           border-top:1.5px solid var(--cream-dk);
//           animation:slideUp .3s ease;
//         }
//         .asect-title{
//           font-family:var(--font-display);font-size:1rem;font-weight:600;
//           color:var(--forest);margin-bottom:.25rem;
//         }
//         .asect-reason{font-size:.82rem;color:var(--stone);margin-bottom:.9rem;font-style:italic;}

//         .acard{
//           background:#f0fae6;border:2px solid #b5e048;
//           border-radius:1.1rem;padding:1.25rem;
//           display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start;
//         }
//         .acard__img{
//           width:84px;height:84px;border-radius:.65rem;
//           overflow:hidden;background:var(--cream);
//           display:flex;align-items:center;justify-content:center;
//           font-size:2rem;flex-shrink:0;
//         }
//         .acard__img img{width:100%;height:100%;object-fit:cover;}
//         .acard__info{flex:1;min-width:0;}
//         .acard__cat{font-size:.68rem;text-transform:uppercase;letter-spacing:.07em;color:var(--stone);}
//         .acard__name{
//           font-family:var(--font-display);font-size:1.05rem;font-weight:700;
//           color:var(--forest);margin:.2rem 0 .3rem;
//         }
//         .acard__desc{font-size:.8rem;color:var(--stone);line-height:1.5;margin-bottom:.5rem;}
//         .acard__price{font-size:.9rem;font-weight:700;color:var(--moss);}

//         .savings-pill{
//           display:inline-flex;align-items:center;gap:.35rem;
//           background:var(--forest);color:var(--lime);
//           font-size:.73rem;font-weight:700;
//           padding:.28rem .75rem;border-radius:9999px;margin:.45rem 0;
//         }
//         .acard__actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem;}

//         .ascore-badge{
//           display:flex;flex-direction:column;align-items:center;
//           justify-content:center;min-width:76px;
//           background:var(--white);border-radius:.85rem;
//           padding:.75rem;flex-shrink:0;text-align:center;
//           box-shadow:var(--shadow-sm);border:1.5px solid var(--cream-dk);
//         }
//         .ascore-num{
//           font-family:var(--font-display);font-size:1.85rem;font-weight:700;line-height:1;
//         }
//         .ascore-lbl{font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-top:.15rem;}
//         .ascore-cap{font-size:.58rem;color:var(--stone);margin-top:.1rem;}
//         .alt-not-found{
//           padding:1rem 1.25rem;background:var(--cream);
//           border-radius:.75rem;color:var(--stone);font-size:.875rem;
//         }

//         /* ── Responsive ─────────────────────────────── */
//         @media(max-width:640px){
//           .pgrid{grid-template-columns:repeat(2,1fr);gap:.75rem;}
//           .dheader{gap:.85rem;}
//           .dimg{width:76px;height:76px;font-size:2rem;}
//           .dname{font-size:1.15rem;}
//           .ssect-main{gap:1rem;}
//         }
//       `}</style>

//       {/* ═══ SEARCH BAR ════════════════════════════════ */}
//       <div className="pl-search">
//         <div className="pl-sbox">
//           <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
//             stroke="var(--stone)" strokeWidth="2">
//             <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
//           </svg>
//           <input
//             value={q} onChange={e=>handleSearch(e.target.value)}
//             placeholder="Search products by name, category…"
//             aria-label="Search products"
//           />
//           {q && <button className="pl-clear" onClick={()=>handleSearch('')} aria-label="Clear">×</button>}
//         </div>
//       </div>

//       {!loading && (
//         <div className="pl-rbar">
//           <span>
//             {q
//               ? <><strong>{products.length}</strong> results for "{q}"</>
//               : <><strong>{products.length}</strong> products</>}
//           </span>
//           {selected && (
//             <button className="btn btn-ghost" style={{padding:'.35rem .85rem',fontSize:'.78rem'}}
//               onClick={resetPanel}>✕ Clear</button>
//           )}
//         </div>
//       )}

//       {/* ═══ GRID ══════════════════════════════════════ */}
//       <div className="pgrid">
//         {loading ? (
//           <div className="ldots"><div className="ldot"/><div className="ldot"/><div className="ldot"/></div>
//         ) : products.length===0 ? (
//           <div className="pgrid-empty">
//             <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🌿</div>
//             <p>No products found{q?` for "${q}"`:''}</p>
//           </div>
//         ) : (
//           products.map(p=>(
//             <ProductCard key={p._id} product={p}
//               isSelected={selected?._id===p._id} onClick={handleSelect}/>
//           ))
//         )}
//       </div>

//       {/* ═══ DETAIL PANEL ══════════════════════════════ */}
//       {selected && (
//         <div className="dpanel" ref={detailRef}>

//           {/* Header */}
//           <div className="dheader">
//             <div className="dimg">
//               {selected.image_url ? <img src={selected.image_url} alt={selected.name}/> : '🌿'}
//             </div>
//             <div className="dinfo">
//               <p className="dcat">{selected.category}</p>
//               <h2 className="dname">{selected.name}</h2>
//               {selected.description && <p className="ddesc">{selected.description}</p>}
//               <p className="dprice">₹{selected.price?.toLocaleString('en-IN')}</p>
//               {selected.material && (
//                 <div className="dmat">
//                   <span style={{fontSize:'.68rem',textTransform:'uppercase',letterSpacing:'.05em'}}>Material:</span>
//                   {selected.material.split(',').map(m=>(
//                     <span key={m} style={{
//                       fontSize:'.68rem',fontWeight:600,padding:'.18rem .55rem',
//                       borderRadius:'9999px',background:'var(--cream-dk)',color:'var(--stone)',
//                     }}>{m.trim()}</span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="cta-row">
//             {phase===PHASE.IDLE && (
//               <button className="btn btn-forest" onClick={handleCheckEcoScore}>
//                 🌍 Check EcoScore
//               </button>
//             )}
//             {phase===PHASE.SCORE_LOAD && (
//               <button className="btn btn-forest" disabled>
//                 <span className="spinner"/> Analysing…
//               </button>
//             )}
//             {(phase===PHASE.SCORE_DONE||phase===PHASE.ALT_LOAD||phase===PHASE.ALT_DONE) && (
//               <>
//                 <button className="btn btn-lime"
//                   onClick={handleFindAlternative}
//                   disabled={isBusy||phase===PHASE.ALT_DONE}>
//                   {phase===PHASE.ALT_LOAD
//                     ? <><span className="spinner"/> Finding…</>
//                     : phase===PHASE.ALT_DONE ? '✅ Alternative Found'
//                     : '🔍 Find Greener Alternative'}
//                 </button>
//                 <button className="btn btn-moss" onClick={handleAddOriginalToCart}>
//                   🛒 Add to Cart
//                 </button>
//               </>
//             )}
//             <button className="btn btn-ghost" onClick={resetPanel}>✕ Close</button>
//           </div>

//           {/* ── Eco Score ─────────────────────────────── */}
//           {ecoScore && (
//             <div className="ssect">
//               <p className="ssect-title">🌱 EcoScore Analysis</p>
//               {ecoScore.isFallback ? (
//                 <div className="fallback-note">{ecoScore.explanation}</div>
//               ) : (
//                 <div className="ssect-main">
//                   <EcoGauge score={ecoScore.ecoScore}/>
//                   <div className="ssect-right">
//                     <p className="sscore-lbl" style={{color:scoreColor(ecoScore.ecoScore)}}>
//                       {scoreLabel(ecoScore.ecoScore)} — {ecoScore.ecoScore}/100
//                     </p>
//                     {ecoScore.badges?.length>0 && (
//                       <div className="badge-row">
//                         {ecoScore.badges.map(b=><span key={b} className="eco-badge">{b}</span>)}
//                       </div>
//                     )}
//                     {ecoScore.breakdown && (
//                       <div className="ctable">
//                         <CRow label="Material carbon"  val={ecoScore.breakdown.materialCarbon}/>
//                         <CRow label="Packaging carbon" val={ecoScore.breakdown.packagingCarbon}/>
//                         <CRow label="Manufacturing"    val={ecoScore.breakdown.manufacturingOverhead}/>
//                         <CRow label="Transport"        val={ecoScore.breakdown.transportEstimate}/>
//                         <CRow label="Total CO₂e"       val={ecoScore.carbonFootprint}/>
//                       </div>
//                     )}
//                     {ecoScore.explanation && (
//                       <p className="score-expl">"{ecoScore.explanation}"</p>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── Alternative ───────────────────────────── */}
//           {alternative && (
//             <div className="asect">
//               <p className="asect-title">♻️ Greener Alternative</p>
//               {alternative.aiReason && <p className="asect-reason">{alternative.aiReason}</p>}

//               {alternative.found===false ? (
//                 <div className="alt-not-found">{alternative.message||'No greener alternative found.'}</div>
//               ) : alternative.alternative ? (()=>{
//                 const alt     = alternative.alternative;
//                 const altScore= alternative.ecoScore;
//                 const altCO2  = altScore?.carbonFootprint??0;
//                 const origCO2 = ecoScore?.carbonFootprint??0;
//                 const savings = Math.max(0, origCO2-altCO2);

//                 return (
//                   <div className="acard">
//                     <div className="acard__img">
//                       {alt.image_url ? <img src={alt.image_url} alt={alt.name}/> : '🌿'}
//                     </div>

//                     <div className="acard__info">
//                       <p className="acard__cat">{alt.category}</p>
//                       <p className="acard__name">{alt.name}</p>
//                       {alt.description && <p className="acard__desc">{alt.description}</p>}
//                       <p className="acard__price">₹{alt.price?.toLocaleString('en-IN')}</p>

//                       {savings>0 && (
//                         <div className="savings-pill">
//                           🌍 Saves {savings.toFixed(2)} kg CO₂ vs current
//                         </div>
//                       )}

//                       {altScore?.badges?.length>0 && (
//                         <div className="badge-row" style={{marginTop:'.45rem'}}>
//                           {altScore.badges.map(b=><span key={b} className="eco-badge">{b}</span>)}
//                         </div>
//                       )}

//                       {/* ★ ADD ALTERNATIVE TO CART */}
//                       <div className="acard__actions">
//                         <button className="btn btn-forest" onClick={handleAddAltToCart}>
//                           🛒 Add Alternative to Cart
//                         </button>
//                       </div>
//                     </div>

//                     {altScore && !altScore.isFallback && (
//                       <div className="ascore-badge">
//                         <span className="ascore-num" style={{color:scoreColor(altScore.ecoScore)}}>
//                           {altScore.ecoScore}
//                         </span>
//                         <span className="ascore-lbl" style={{color:scoreColor(altScore.ecoScore)}}>
//                           {scoreLabel(altScore.ecoScore)}
//                         </span>
//                         <span className="ascore-cap">EcoScore</span>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })() : null}
//             </div>
//           )}
//         </div>
//       )}

//       {toast && <Toast msg={toast} onDone={()=>setToast(null)}/>}
//     </>
//   );
// }



// src/components/ProductsList.jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import api from '../utils/api';

// ─── Phase machine ────────────────────────────────────────
const PHASE = {
  IDLE:'idle', SCORE_LOAD:'score_loading',
  SCORE_DONE:'score_done', ALT_LOAD:'alt_loading', ALT_DONE:'alt_done',
};

const scoreColor = s => s>=75?'#2d5a3d':s>=50?'#5a9e3a':s>=25?'#e08c20':'#c94444';
const scoreLabel = s => s>=75?'Excellent':s>=50?'Good':s>=25?'Fair':'Poor';

// ─── Toast ────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{
      position:'fixed',bottom:'1.5rem',right:'1.5rem',zIndex:9999,
      background:'#1a3a2a',color:'#b5e048',
      padding:'.7rem 1.3rem',borderRadius:'9999px',
      fontSize:'.875rem',fontWeight:600,
      display:'flex',alignItems:'center',gap:'.5rem',
      boxShadow:'0 8px 32px rgba(26,58,42,.3)',
      animation:'tpop .3s ease both',
    }}>
      ✓ {msg}
      <style>{`@keyframes tpop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}

// ─── Semi-circle gauge ────────────────────────────────────
function EcoGauge({ score }) {
  const r=52,cx=70,cy=68,circ=Math.PI*r;
  const dash=(score/100)*circ,col=scoreColor(score);
  return (
    <svg viewBox="0 0 140 78" style={{width:140,flexShrink:0}}>
      <path d={`M ${cx-r},${cy} A ${r},${r} 0 0 1 ${cx+r},${cy}`}
        fill="none" stroke="#ede8de" strokeWidth="10" strokeLinecap="round"/>
      <path d={`M ${cx-r},${cy} A ${r},${r} 0 0 1 ${cx+r},${cy}`}
        fill="none" stroke={col} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        style={{transition:'stroke-dasharray 1s cubic-bezier(.4,0,.2,1)'}}/>
      <text x={cx} y={cy-10} textAnchor="middle"
        style={{fontFamily:'Fraunces,serif',fontSize:26,fontWeight:700,fill:col}}>{score}</text>
      <text x={cx} y={cy+6} textAnchor="middle"
        style={{fontFamily:'DM Sans,system-ui,sans-serif',fontSize:11,fill:'#8a8a7a'}}>/100</text>
    </svg>
  );
}

// ─── Carbon row ───────────────────────────────────────────
function CRow({ label, val }) {
  return (
    <div style={{display:'flex',justifyContent:'space-between',
      fontSize:'.82rem',padding:'.22rem 0',borderBottom:'1px solid #ede8de'}}>
      <span style={{color:'#8a8a7a'}}>{label}</span>
      <span style={{fontWeight:600,color:'#1a3a2a'}}>
        {val!=null?`${Number(val).toFixed(2)} kg`:'—'}
      </span>
    </div>
  );
}

// ─── Cart helper ──────────────────────────────────────────
function pushToCart(product, opts={}) {
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  cart.push({
    productId:        product._id,
    name:             product.name,
    price:            product.price,
    carbonFootprint:  opts.carbonFootprint ?? 0,
    originalProductId:opts.originalProductId ?? product._id,
    usedAlternative:  opts.usedAlternative  ?? false,
    co2Savings:       opts.co2Savings       ?? 0,
    qty: 1,
  });
  localStorage.setItem('cart', JSON.stringify(cart));
}

// ─── Product card with quick-add ─────────────────────────
function ProductCard({ product, isSelected, onClick, onQuickAdd }) {
  const [adding, setAdding] = useState(false);

  const handleQuickAdd = async e => {
    e.stopPropagation();           // don't open detail panel
    setAdding(true);
    onQuickAdd(product);
    await new Promise(r => setTimeout(r, 600));
    setAdding(false);
  };

  return (
    <div className={`pcard ${isSelected?'pcard--sel':''}`}>
      {/* clickable area → opens detail */}
      <button className="pcard__main" onClick={()=>onClick(product)} aria-pressed={isSelected}>
        {isSelected && <div className="pcard__dot"/>}
        <div className="pcard__img">
          {product.image_url
            ? <img src={product.image_url} alt={product.name} loading="lazy"/>
            : <span className="pcard__emoji">🌿</span>}
        </div>
        <div className="pcard__body">
          <p className="pcard__cat">{product.category||'Product'}</p>
          <h3 className="pcard__name">{product.name}</h3>
          <div className="pcard__meta">
            <span className="pcard__price">₹{product.price?.toLocaleString('en-IN')}</span>
            {product.brand && <span className="pcard__brand">{product.brand}</span>}
          </div>
        </div>
      </button>

      {/* quick-add footer */}
      <div className="pcard__foot">
        <button
          className={`qadd-btn ${adding?'qadd-btn--done':''}`}
          onClick={handleQuickAdd}
          disabled={adding}
          aria-label={`Add ${product.name} to cart`}
        >
          {adding ? '✓ Added' : '🛒 Add to Cart'}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
export default function ProductsList() {
  const [products,    setProducts]    = useState([]);
  const [q,           setQ]           = useState('');
  const [loading,     setLoading]     = useState(false);
  const [selected,    setSelected]    = useState(null);
  const [phase,       setPhase]       = useState(PHASE.IDLE);
  const [ecoScore,    setEcoScore]    = useState(null);
  const [alternative, setAlternative] = useState(null);
  const [toast,       setToast]       = useState(null);

  const detailRef   = useRef(null);
  const searchTimer = useRef(null);

  const fetchProducts = useCallback(async query => {
    setLoading(true);
    try {
      const p = query ? `?q=${encodeURIComponent(query)}` : '';
      const r = await api.get(`/products${p}`);
      setProducts(Array.isArray(r.data) ? r.data : (r.data?.data??[]));
    } catch { setProducts([]); }
    finally  { setLoading(false); }
  }, []);

  useEffect(() => { fetchProducts(''); }, [fetchProducts]);

  const resetPanel = () => {
    setSelected(null); setPhase(PHASE.IDLE);
    setEcoScore(null); setAlternative(null);
  };

  const handleSearch = val => {
    setQ(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchProducts(val), 350);
    resetPanel();
  };

  const handleSelect = product => {
    if (selected?._id === product._id) { resetPanel(); return; }
    setSelected(product); setPhase(PHASE.IDLE);
    setEcoScore(null); setAlternative(null);
    setTimeout(() => detailRef.current?.scrollIntoView({behavior:'smooth',block:'start'}), 80);
  };

  // Quick-add (no eco score needed — basic cart entry)
  const handleQuickAdd = product => {
    pushToCart(product, { carbonFootprint: product.carbonFootprint ?? 0 });
    setToast(`${product.name} added!`);
  };

  const handleCheckEcoScore = async () => {
    setPhase(PHASE.SCORE_LOAD);
    try {
      const r = await api.post('/eco/score', selected);
      setEcoScore(r.data?.data ?? r.data);
      setPhase(PHASE.SCORE_DONE);
    } catch {
      setEcoScore({isFallback:true, explanation:'Could not fetch eco score.'});
      setPhase(PHASE.SCORE_DONE);
    }
  };

  const handleFindAlternative = async () => {
    setPhase(PHASE.ALT_LOAD);
    try {
      const r = await api.post('/eco/alternative', {
        product: selected,
        searchQuery: q || selected.category || selected.name,
      });
      setAlternative(r.data?.data ?? r.data);
      setPhase(PHASE.ALT_DONE);
    } catch {
      setAlternative({found:false, message:'Could not fetch alternatives.'});
      setPhase(PHASE.ALT_DONE);
    }
  };

  const handleAddOriginalToCart = () => {
    pushToCart(selected, { carbonFootprint: ecoScore?.carbonFootprint ?? 0 });
    setToast(`${selected.name} added to cart!`);
  };

  const handleAddAltToCart = () => {
    const alt    = alternative.alternative;
    const altCO2 = alternative.ecoScore?.carbonFootprint ?? 0;
    const origCO2= ecoScore?.carbonFootprint ?? 0;
    const savings= Math.max(0, origCO2 - altCO2);
    pushToCart(alt, {
      carbonFootprint:   altCO2,
      originalProductId: selected._id,
      usedAlternative:   true,
      co2Savings:        parseFloat(savings.toFixed(3)),
    });
    setToast(`${alt.name} added — greener choice! 🌿`);
  };

  const isBusy = phase === PHASE.SCORE_LOAD || phase === PHASE.ALT_LOAD;

  return (
    <>
      <style>{`
        :root{
          --forest:#1a3a2a;--moss:#2d5a3d;--moss-light:#3d7a52;
          --lime:#b5e048;--lime-dim:#9acb38;--lime-pale:#e8f5d8;
          --cream:#f5f0e8;--cream-dk:#ede8de;--cream-dkr:#ddd8ce;
          --stone:#8a8a7a;--stone-lt:#b0b0a0;--white:#fff;
          --red:#e05252;--amber-pale:#fff8e6;
          --font-display:'Fraunces',Georgia,serif;
          --font-body:'DM Sans',system-ui,sans-serif;
          --shadow-sm:0 1px 4px rgba(0,0,0,.06);
          --shadow:0 2px 12px rgba(26,58,42,.08);
          --shadow-lg:0 8px 32px rgba(26,58,42,.12);
        }

        /* ── Search ────────────────────────────────── */
        .pl-search{display:flex;gap:.75rem;margin-bottom:1.35rem;}
        .pl-sbox{
          flex:1;display:flex;align-items:center;gap:.6rem;
          background:var(--white);border:2px solid var(--cream-dk);
          border-radius:9999px;padding:0 1.1rem;
          transition:border-color .2s;box-shadow:var(--shadow-sm);
        }
        .pl-sbox:focus-within{border-color:var(--moss);}
        .pl-sbox input{
          flex:1;border:none;outline:none;background:transparent;
          font-family:var(--font-body);font-size:.95rem;
          color:var(--forest);padding:.75rem 0;
        }
        .pl-sbox input::placeholder{color:var(--stone-lt);}
        .pl-clear{
          background:none;border:none;cursor:pointer;
          color:var(--stone);font-size:1.1rem;padding:.2rem;
          border-radius:50%;transition:color .15s;line-height:1;
        }
        .pl-clear:hover{color:var(--forest);}

        /* results bar */
        .pl-rbar{
          display:flex;align-items:center;justify-content:space-between;
          margin-bottom:1rem;font-size:.82rem;color:var(--stone);
        }
        .pl-rbar strong{color:var(--forest);}

        /* ── Grid ──────────────────────────────────── */
        .pgrid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(200px,1fr));
          gap:1rem;margin-bottom:1.75rem;
        }
        .pgrid-empty{
          grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--stone);
        }
        .ldots{grid-column:1/-1;display:flex;justify-content:center;gap:.5rem;padding:3rem;}
        .ldot{
          width:9px;height:9px;border-radius:50%;
          background:var(--moss);opacity:.4;
          animation:ldot 1.2s ease infinite;
        }
        .ldot:nth-child(2){animation-delay:.15s}
        .ldot:nth-child(3){animation-delay:.3s}
        @keyframes ldot{40%{opacity:1;transform:translateY(-6px)}0%,80%,100%{opacity:.4;transform:none}}

        /* ── Product card ──────────────────────────── */
        .pcard{
          position:relative;
          background:var(--white);border:2px solid transparent;
          border-radius:1.1rem;overflow:hidden;
          box-shadow:var(--shadow-sm);
          transition:transform .2s,box-shadow .2s,border-color .2s;
          display:flex;flex-direction:column;
        }
        .pcard:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);border-color:var(--cream-dkr);}
        .pcard--sel{
          border-color:var(--lime)!important;
          box-shadow:0 0 0 4px rgba(181,224,72,.2),var(--shadow-lg)!important;
          transform:translateY(-4px);
        }

        /* The clickable top portion */
        .pcard__main{
          display:flex;flex-direction:column;
          background:none;border:none;cursor:pointer;
          text-align:left;padding:0;flex:1;
          position:relative;
        }
        .pcard__dot{
          position:absolute;top:.6rem;right:.6rem;z-index:1;
          width:10px;height:10px;border-radius:50%;
          background:var(--lime);border:2px solid var(--white);
        }
        .pcard__img{
          height:148px;background:var(--cream);
          display:flex;align-items:center;justify-content:center;overflow:hidden;
        }
        .pcard__img img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
        .pcard:hover .pcard__img img{transform:scale(1.06);}
        .pcard__emoji{font-size:2.5rem;}
        .pcard__body{padding:.85rem 1rem .75rem;flex:1;display:flex;flex-direction:column;}
        .pcard__cat{font-size:.67rem;text-transform:uppercase;letter-spacing:.08em;color:var(--stone);margin-bottom:.2rem;}
        .pcard__name{
          font-family:var(--font-display);font-size:.93rem;font-weight:600;
          color:var(--forest);line-height:1.25;margin-bottom:.5rem;flex:1;
        }
        .pcard__meta{display:flex;align-items:center;justify-content:space-between;}
        .pcard__price{font-size:.9rem;font-weight:700;color:var(--moss);}
        .pcard__brand{font-size:.67rem;color:var(--stone-lt);}

        /* ── Quick-add footer ──────────────────────── */
        .pcard__foot{
          padding:.6rem .85rem .75rem;
          border-top:1px solid var(--cream-dk);
        }
        .qadd-btn{
          width:100%;padding:.52rem;border-radius:.65rem;
          font-family:var(--font-body);font-size:.8rem;font-weight:700;
          border:none;cursor:pointer;transition:all .25s;
          background:var(--cream);color:var(--forest);
          display:flex;align-items:center;justify-content:center;gap:.35rem;
        }
        .qadd-btn:hover:not(:disabled){background:var(--forest);color:var(--lime);}
        .qadd-btn:disabled{cursor:default;}
        .qadd-btn--done{background:var(--lime-pale)!important;color:var(--moss)!important;}

        /* ── Detail panel ──────────────────────────── */
        .dpanel{
          background:var(--white);border:2px solid var(--cream-dk);
          border-radius:1.35rem;padding:1.75rem;
          margin-bottom:2rem;
          animation:slideUp .35s cubic-bezier(.4,0,.2,1);
          scroll-margin-top:75px;
        }
        @keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}

        .dheader{display:flex;gap:1.2rem;align-items:flex-start;flex-wrap:wrap;margin-bottom:1.35rem;}
        .dimg{
          width:96px;height:96px;border-radius:.85rem;
          overflow:hidden;background:var(--cream);
          display:flex;align-items:center;justify-content:center;
          font-size:2.4rem;flex-shrink:0;
        }
        .dimg img{width:100%;height:100%;object-fit:cover;}
        .dinfo{flex:1;min-width:0;}
        .dcat{font-size:.7rem;text-transform:uppercase;letter-spacing:.08em;color:var(--stone);}
        .dname{
          font-family:var(--font-display);font-size:1.4rem;font-weight:700;
          color:var(--forest);line-height:1.2;margin:.2rem 0 .35rem;
        }
        .ddesc{font-size:.875rem;color:var(--stone);line-height:1.55;margin-bottom:.45rem;}
        .dprice{font-size:1.1rem;font-weight:700;color:var(--moss);}
        .dmat{margin-top:.5rem;display:flex;align-items:center;gap:.35rem;flex-wrap:wrap;}

        /* CTA row */
        .cta-row{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.25rem;}

        /* buttons */
        .btn{
          display:inline-flex;align-items:center;gap:.45rem;
          padding:.6rem 1.2rem;border-radius:9999px;
          font-family:var(--font-body);font-size:.86rem;
          font-weight:600;cursor:pointer;border:none;
          transition:all .2s;white-space:nowrap;
        }
        .btn:disabled{opacity:.5;cursor:not-allowed;}
        .btn-forest{background:var(--forest);color:var(--lime);}
        .btn-forest:hover:not(:disabled){background:var(--moss);transform:translateY(-1px);box-shadow:var(--shadow);}
        .btn-lime{background:var(--lime);color:var(--forest);}
        .btn-lime:hover:not(:disabled){background:var(--lime-dim);transform:translateY(-1px);}
        .btn-moss{background:var(--moss);color:#fff;}
        .btn-moss:hover:not(:disabled){background:var(--moss-light);transform:translateY(-1px);}
        .btn-ghost{background:transparent;color:var(--stone);border:1.5px solid var(--cream-dk);}
        .btn-ghost:hover:not(:disabled){background:var(--cream);color:var(--forest);}
        .spinner{
          width:13px;height:13px;border-radius:50%;
          border:2px solid currentColor;border-top-color:transparent;
          animation:spin .7s linear infinite;flex-shrink:0;
        }
        @keyframes spin{to{transform:rotate(360deg)}}

        /* score section */
        .ssect{
          margin-top:1.5rem;padding-top:1.5rem;
          border-top:1.5px solid var(--cream-dk);
          animation:slideUp .3s ease;
        }
        .ssect-title{
          font-family:var(--font-display);font-size:1rem;font-weight:600;
          color:var(--forest);margin-bottom:1rem;
        }
        .ssect-main{display:flex;gap:1.5rem;flex-wrap:wrap;align-items:flex-start;}
        .ssect-right{flex:1;min-width:180px;}
        .sscore-lbl{
          font-family:var(--font-display);font-size:1rem;font-weight:700;margin-bottom:.65rem;
        }
        .badge-row{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.85rem;}
        .eco-badge{
          font-size:.67rem;font-weight:700;padding:.22rem .6rem;
          border-radius:9999px;background:var(--lime-pale);
          color:var(--moss);text-transform:uppercase;letter-spacing:.05em;
        }
        .ctable{background:var(--cream);border-radius:.6rem;padding:.65rem .9rem;margin-bottom:.75rem;}
        .score-expl{font-size:.82rem;color:var(--stone);line-height:1.55;font-style:italic;}
        .fallback-note{
          padding:.75rem 1rem;background:var(--amber-pale);
          border:1px solid #f5d88a;border-radius:.6rem;
          font-size:.85rem;color:#7a5c00;
        }

        /* alt section */
        .asect{
          margin-top:1.5rem;padding-top:1.5rem;
          border-top:1.5px solid var(--cream-dk);
          animation:slideUp .3s ease;
        }
        .asect-title{
          font-family:var(--font-display);font-size:1rem;font-weight:600;
          color:var(--forest);margin-bottom:.25rem;
        }
        .asect-reason{font-size:.82rem;color:var(--stone);margin-bottom:.9rem;font-style:italic;}
        .acard{
          background:#f0fae6;border:2px solid #b5e048;
          border-radius:1.1rem;padding:1.25rem;
          display:flex;gap:1rem;flex-wrap:wrap;align-items:flex-start;
        }
        .acard__img{
          width:84px;height:84px;border-radius:.65rem;
          overflow:hidden;background:var(--cream);
          display:flex;align-items:center;justify-content:center;
          font-size:2rem;flex-shrink:0;
        }
        .acard__img img{width:100%;height:100%;object-fit:cover;}
        .acard__info{flex:1;min-width:0;}
        .acard__cat{font-size:.68rem;text-transform:uppercase;letter-spacing:.07em;color:var(--stone);}
        .acard__name{
          font-family:var(--font-display);font-size:1.05rem;font-weight:700;
          color:var(--forest);margin:.2rem 0 .3rem;
        }
        .acard__desc{font-size:.8rem;color:var(--stone);line-height:1.5;margin-bottom:.5rem;}
        .acard__price{font-size:.9rem;font-weight:700;color:var(--moss);}
        .savings-pill{
          display:inline-flex;align-items:center;gap:.35rem;
          background:var(--forest);color:var(--lime);
          font-size:.73rem;font-weight:700;
          padding:.28rem .75rem;border-radius:9999px;margin:.45rem 0;
        }
        .acard__actions{display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.75rem;}
        .ascore-badge{
          display:flex;flex-direction:column;align-items:center;
          justify-content:center;min-width:76px;
          background:var(--white);border-radius:.85rem;
          padding:.75rem;flex-shrink:0;text-align:center;
          box-shadow:var(--shadow-sm);border:1.5px solid var(--cream-dk);
        }
        .ascore-num{font-family:var(--font-display);font-size:1.85rem;font-weight:700;line-height:1;}
        .ascore-lbl{font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-top:.15rem;}
        .ascore-cap{font-size:.58rem;color:var(--stone);margin-top:.1rem;}
        .alt-not-found{
          padding:1rem 1.25rem;background:var(--cream);
          border-radius:.75rem;color:var(--stone);font-size:.875rem;
        }

        /* mat pills */
        .mat-pill{
          font-size:.68rem;font-weight:600;padding:.18rem .55rem;
          border-radius:9999px;background:var(--cream-dk);color:var(--stone);
        }

        @media(max-width:640px){
          .pgrid{grid-template-columns:repeat(2,1fr);gap:.75rem;}
          .dheader{gap:.85rem;}
          .dimg{width:76px;height:76px;font-size:2rem;}
          .dname{font-size:1.15rem;}
          .ssect-main{gap:1rem;}
        }
        @media(max-width:380px){
          .pgrid{grid-template-columns:1fr 1fr;}
        }
      `}</style>

      {/* ═══ SEARCH ══════════════════════════════════ */}
      <div className="pl-search">
        <div className="pl-sbox">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="#8a8a7a" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={q} onChange={e => handleSearch(e.target.value)}
            placeholder="Search by name, category, brand…" aria-label="Search products"/>
          {q && <button className="pl-clear" onClick={() => handleSearch('')} aria-label="Clear">×</button>}
        </div>
      </div>

      {!loading && (
        <div className="pl-rbar">
          <span>
            {q
              ? <><strong>{products.length}</strong> results for "{q}"</>
              : <><strong>{products.length}</strong> products</>}
          </span>
          {selected && (
            <button className="btn btn-ghost" style={{padding:'.32rem .8rem',fontSize:'.78rem'}}
              onClick={resetPanel}>✕ Close panel</button>
          )}
        </div>
      )}

      {/* ═══ GRID ════════════════════════════════════ */}
      <div className="pgrid">
        {loading ? (
          <div className="ldots"><div className="ldot"/><div className="ldot"/><div className="ldot"/></div>
        ) : products.length === 0 ? (
          <div className="pgrid-empty">
            <div style={{fontSize:'3rem',marginBottom:'1rem'}}>🌿</div>
            <p>No products found{q ? ` for "${q}"` : ''}.</p>
          </div>
        ) : (
          products.map(p => (
            <ProductCard
              key={p._id} product={p}
              isSelected={selected?._id === p._id}
              onClick={handleSelect}
              onQuickAdd={handleQuickAdd}
            />
          ))
        )}
      </div>

      {/* ═══ DETAIL PANEL ════════════════════════════ */}
      {selected && (
        <div className="dpanel" ref={detailRef}>

          {/* Header */}
          <div className="dheader">
            <div className="dimg">
              {selected.image_url ? <img src={selected.image_url} alt={selected.name}/> : '🌿'}
            </div>
            <div className="dinfo">
              <p className="dcat">{selected.category}</p>
              <h2 className="dname">{selected.name}</h2>
              {selected.description && <p className="ddesc">{selected.description}</p>}
              <p className="dprice">₹{selected.price?.toLocaleString('en-IN')}</p>
              {selected.material && (
                <div className="dmat">
                  <span style={{fontSize:'.68rem',textTransform:'uppercase',letterSpacing:'.05em',color:'#8a8a7a'}}>
                    Material:
                  </span>
                  {selected.material.split(',').map(m => (
                    <span key={m} className="mat-pill">{m.trim()}</span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="cta-row">
            {phase === PHASE.IDLE && (
              <button className="btn btn-forest" onClick={handleCheckEcoScore}>
                🌍 Check EcoScore
              </button>
            )}
            {phase === PHASE.SCORE_LOAD && (
              <button className="btn btn-forest" disabled>
                <span className="spinner"/> Analysing…
              </button>
            )}
            {(phase === PHASE.SCORE_DONE || phase === PHASE.ALT_LOAD || phase === PHASE.ALT_DONE) && (
              <>
                <button className="btn btn-lime"
                  onClick={handleFindAlternative}
                  disabled={isBusy || phase === PHASE.ALT_DONE}>
                  {phase === PHASE.ALT_LOAD
                    ? <><span className="spinner"/> Finding…</>
                    : phase === PHASE.ALT_DONE ? '✅ Alternative Found'
                    : '🔍 Find Greener Alternative'}
                </button>
                <button className="btn btn-moss" onClick={handleAddOriginalToCart}>
                  🛒 Add to Cart
                </button>
              </>
            )}
            <button className="btn btn-ghost" onClick={resetPanel}>✕ Close</button>
          </div>

          {/* Eco Score */}
          {ecoScore && (
            <div className="ssect">
              <p className="ssect-title">🌱 EcoScore Analysis</p>
              {ecoScore.isFallback ? (
                <div className="fallback-note">{ecoScore.explanation}</div>
              ) : (
                <div className="ssect-main">
                  <EcoGauge score={ecoScore.ecoScore}/>
                  <div className="ssect-right">
                    <p className="sscore-lbl" style={{color:scoreColor(ecoScore.ecoScore)}}>
                      {scoreLabel(ecoScore.ecoScore)} — {ecoScore.ecoScore}/100
                    </p>
                    {ecoScore.badges?.length > 0 && (
                      <div className="badge-row">
                        {ecoScore.badges.map(b => <span key={b} className="eco-badge">{b}</span>)}
                      </div>
                    )}
                    {ecoScore.breakdown && (
                      <div className="ctable">
                        <CRow label="Material carbon"  val={ecoScore.breakdown.materialCarbon}/>
                        <CRow label="Packaging carbon" val={ecoScore.breakdown.packagingCarbon}/>
                        <CRow label="Manufacturing"    val={ecoScore.breakdown.manufacturingOverhead}/>
                        <CRow label="Transport"        val={ecoScore.breakdown.transportEstimate}/>
                        <CRow label="Total CO₂e"       val={ecoScore.carbonFootprint}/>
                      </div>
                    )}
                    {ecoScore.explanation && (
                      <p className="score-expl">"{ecoScore.explanation}"</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Alternative */}
          {alternative && (
            <div className="asect">
              <p className="asect-title">♻️ Greener Alternative</p>
              {alternative.aiReason && <p className="asect-reason">{alternative.aiReason}</p>}

              {alternative.found === false ? (
                <div className="alt-not-found">{alternative.message || 'No greener alternative found.'}</div>
              ) : alternative.alternative ? (() => {
                const alt      = alternative.alternative;
                const altScore = alternative.ecoScore;
                const altCO2   = altScore?.carbonFootprint ?? 0;
                const origCO2  = ecoScore?.carbonFootprint ?? 0;
                const savings  = Math.max(0, origCO2 - altCO2);
                return (
                  <div className="acard">
                    <div className="acard__img">
                      {alt.image_url ? <img src={alt.image_url} alt={alt.name}/> : '🌿'}
                    </div>
                    <div className="acard__info">
                      <p className="acard__cat">{alt.category}</p>
                      <p className="acard__name">{alt.name}</p>
                      {alt.description && <p className="acard__desc">{alt.description}</p>}
                      <p className="acard__price">₹{alt.price?.toLocaleString('en-IN')}</p>
                      {savings > 0 && (
                        <div className="savings-pill">
                          🌍 Saves {savings.toFixed(2)} kg CO₂ vs current
                        </div>
                      )}
                      {altScore?.badges?.length > 0 && (
                        <div className="badge-row" style={{marginTop:'.45rem'}}>
                          {altScore.badges.map(b => <span key={b} className="eco-badge">{b}</span>)}
                        </div>
                      )}
                      <div className="acard__actions">
                        <button className="btn btn-forest" onClick={handleAddAltToCart}>
                          🛒 Add Alternative to Cart
                        </button>
                      </div>
                    </div>
                    {altScore && !altScore.isFallback && (
                      <div className="ascore-badge">
                        <span className="ascore-num" style={{color:scoreColor(altScore.ecoScore)}}>
                          {altScore.ecoScore}
                        </span>
                        <span className="ascore-lbl" style={{color:scoreColor(altScore.ecoScore)}}>
                          {scoreLabel(altScore.ecoScore)}
                        </span>
                        <span className="ascore-cap">EcoScore</span>
                      </div>
                    )}
                  </div>
                );
              })() : null}
            </div>
          )}
        </div>
      )}

      {toast && <Toast msg={toast} onDone={() => setToast(null)}/>}
    </>
  );
}