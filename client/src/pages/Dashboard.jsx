// // src/pages/Dashboard.jsx
// import React, { useEffect, useState } from 'react';
// import api from '../utils/api';
// import Navbar from '../components/Navbar';
// import { Link } from 'react-router-dom';

// export default function Dashboard() {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       setRefreshing(true);
//       const res = await api.get('/auth/me');
//       console.log('User data fetched:', res.data); // Debug log
//       setUserData(res.data);
//     } catch (error) {
//       console.error('Failed to fetch user data:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const forceRefresh = () => {
//     fetchUserData();
//   };

//   if (loading) {
//     return (
//       <div>
//         <Navbar user={null} />
//         <div className="p-6 flex justify-center">
//           <div className="text-green-600">Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
//       <Navbar user={userData?.user} />
      
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Welcome Section */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-100">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">
//                 Welcome back, {userData?.user?.name}!
//               </h1>
//               <p className="text-gray-600 text-lg">
//                 Continue your sustainable shopping journey and earn more EcoCreds.
//               </p>
//             </div>
          
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* User Details Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//             <div className="flex items-center mb-4">
//               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-green-600">👤</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900">Profile Details</h3>
//             </div>
//             <div className="space-y-3">
//               <div>
//                 <p className="text-sm text-gray-500">Name</p>
//                 <p className="font-semibold">{userData?.user?.name}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Email</p>
//                 <p className="font-semibold">{userData?.user?.email}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Nationality</p>
//                 <p className="font-semibold">{userData?.user?.nationality || 'Not specified'}</p>
//               </div>
//             </div>
//           </div>

//           {/* CO2 Saved Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//             <div className="flex items-center mb-4">
//               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-green-600">🌍</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900">Environmental Impact</h3>
//             </div>
//             <div className="text-center py-4">
//               <div className="text-4xl font-bold text-green-600 mb-2">
//                 {(userData?.totalCO2Saved || 0).toFixed(2)}
//               </div>
//               <p className="text-gray-600">kg CO₂ Saved</p>
//             </div>
//             <p className="text-sm text-gray-500 text-center">
//               Equivalent to {Math.round((userData?.totalCO2Saved || 0) * 100)} trees planted
//             </p>
//           </div>

//           {/* EcoCreds Card */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//             <div className="flex items-center mb-4">
//               <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-green-600">🏆</span>
//               </div>
//               <h3 className="text-xl font-bold text-gray-900">Your EcoCreds</h3>
//             </div>
//             <div className="text-center py-4">
//               <div className="text-4xl font-bold text-green-600 mb-2">
//                 {userData?.ecoCreds || 0}
//               </div>
//               <p className="text-gray-600">Available Points</p>
//             </div>
//             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
//               <p className="text-yellow-700 text-sm font-semibold">
//                 💡 3 points per kg CO₂ saved + 1 point per ₹100 spent
//               </p>
//             </div>
//             <Link 
//               to="/rewards" 
//               className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
//             >
//               Redeem Rewards
//             </Link>
//           </div>
//         </div>

//         {/* Quick Actions & Recent Purchases */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Quick Actions */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <Link 
//                 to="/products" 
//                 className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition duration-300"
//               >
//                 <div className="text-2xl mb-2">🛍️</div>
//                 <p className="font-semibold text-green-700">Shop Products</p>
//               </Link>
//               <Link 
//                 to="/rewards" 
//                 className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition duration-300"
//               >
//                 <div className="text-2xl mb-2">🎁</div>
//                 <p className="font-semibold text-green-700">View Rewards</p>
//               </Link>
//             </div>
//           </div>

//           {/* Recent Purchases */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Purchases</h3>
//             {userData?.orders?.length ? (
//               <div className="space-y-3">
//                 {userData.orders.slice(0, 3).map(order => (
//                   <div key={order._id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
//                     <div>
//                       <p className="font-semibold">Order #{order._id?.slice(-6)}</p>
//                       <p className="text-sm text-gray-500">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </p>
//                       {order.ecoCredsEarned > 0 && (
//                         <p className="text-xs text-green-600 font-semibold">
//                           +{order.ecoCredsEarned} EcoCreds
//                         </p>
//                       )}
//                     </div>
//                     <div className="text-right">
//                       <p className="font-semibold">₹{(order.totalPrice || 0).toFixed(2)}</p>
//                       <p className="text-sm text-green-600">
//                         CO₂: {(order.totalCO2 || 0).toFixed(2)}kg
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 {userData.orders.length > 3 && (
//                   <Link 
//                     to="/products" 
//                     className="block text-center text-green-600 font-semibold hover:text-green-700 mt-4"
//                   >
//                     View All Orders
//                   </Link>
//                 )}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <div className="text-4xl mb-4">🛒</div>
//                 <p className="text-gray-500 mb-4">No purchases yet</p>
//                 <Link 
//                   to="/products" 
//                   className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
//                 >
//                   Start Shopping
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>

       
//       </div>
//     </div>
//   );
// }


// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => { fetchUserData(); }, []);

  const fetchUserData = async () => {
    try {
      const res = await api.get('/auth/me');
      setUserData(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const user     = userData?.user;
  const co2Saved = userData?.totalCO2Saved || 0;
  const credits  = userData?.ecoCreds       || 0;
  const orders   = userData?.orders         || [];

  return (
    <div className="eco-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,500;9..40,600&display=swap');
        :root{
          --forest:#1a3a2a;--moss:#2d5a3d;--moss-light:#3d7a52;
          --lime:#b5e048;--lime-pale:#e8f5d8;--cream:#f5f0e8;
          --cream-dk:#ede8de;--cream-dkr:#ddd8ce;--stone:#8a8a7a;
          --stone-lt:#b0b0a0;--white:#fff;--amber:#f5a623;--amber-pale:#fff8e6;
          --font-display:'Fraunces',serif;--font-body:'DM Sans',system-ui,sans-serif;
          --shadow:0 2px 12px rgba(26,58,42,.08);--shadow-lg:0 8px 32px rgba(26,58,42,.12);
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:var(--font-body);background:var(--cream);}
        .eco-page{min-height:100vh;background:var(--cream);}
        .shell{max-width:1280px;margin:0 auto;padding:2rem 1.25rem 5rem;}

        /* ── Welcome banner ─────────────────────────── */
        .dash-hero{
          background:var(--forest);border-radius:1.35rem;
          padding:2rem 2.25rem;margin-bottom:1.75rem;
          display:flex;align-items:center;justify-content:space-between;
          flex-wrap:wrap;gap:1rem;
          background-image:radial-gradient(ellipse at 80% 50%,rgba(181,224,72,.12) 0%,transparent 60%);
        }
        .dash-hero__title{
          font-family:var(--font-display);font-size:clamp(1.4rem,3vw,2rem);
          font-weight:700;color:var(--white);line-height:1.2;
        }
        .dash-hero__title span{color:var(--lime);}
        .dash-hero__sub{font-size:.9rem;color:rgba(255,255,255,.6);margin-top:.35rem;}
        .dash-hero__badge{
          background:rgba(181,224,72,.15);border:1px solid rgba(181,224,72,.3);
          border-radius:9999px;padding:.5rem 1.1rem;
          color:var(--lime);font-size:.85rem;font-weight:600;
          white-space:nowrap;
        }

        /* ── Stat cards ─────────────────────────────── */
        .stat-grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
          gap:1rem;margin-bottom:1.75rem;
        }
        .stat-card{
          background:var(--white);border:1.5px solid var(--cream-dk);
          border-radius:1.1rem;padding:1.5rem;
          box-shadow:var(--shadow);
          transition:transform .2s,box-shadow .2s;
        }
        .stat-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg);}
        .stat-card__icon{
          width:42px;height:42px;border-radius:.75rem;
          background:var(--lime-pale);
          display:flex;align-items:center;justify-content:center;
          font-size:1.2rem;margin-bottom:1rem;
        }
        .stat-card__label{font-size:.78rem;text-transform:uppercase;letter-spacing:.07em;color:var(--stone);margin-bottom:.35rem;}
        .stat-card__value{
          font-family:var(--font-display);font-size:2rem;font-weight:700;
          color:var(--forest);line-height:1;
        }
        .stat-card__value span{font-size:1rem;font-weight:400;color:var(--stone);}
        .stat-card__note{font-size:.78rem;color:var(--stone-lt);margin-top:.4rem;}

        /* ── Two-col section ────────────────────────── */
        .dash-cols{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        @media(max-width:760px){.dash-cols{grid-template-columns:1fr;}}

        .section-card{
          background:var(--white);border:1.5px solid var(--cream-dk);
          border-radius:1.1rem;padding:1.5rem;box-shadow:var(--shadow);
        }
        .section-title{
          font-family:var(--font-display);font-size:1.05rem;font-weight:600;
          color:var(--forest);margin-bottom:1rem;
          display:flex;align-items:center;gap:.5rem;
        }

        /* quick actions */
        .qa-grid{display:grid;grid-template-columns:1fr 1fr;gap:.75rem;}
        .qa-item{
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:.5rem;padding:1.1rem .75rem;border-radius:.85rem;
          background:var(--cream);border:1.5px solid var(--cream-dk);
          text-decoration:none;transition:all .2s;text-align:center;
        }
        .qa-item:hover{background:var(--lime-pale);border-color:var(--lime);transform:translateY(-2px);}
        .qa-item__icon{font-size:1.5rem;}
        .qa-item__label{font-size:.82rem;font-weight:600;color:var(--forest);}

        /* orders */
        .order-row{
          display:flex;justify-content:space-between;align-items:center;
          padding:.85rem 0;border-bottom:1.5px solid var(--cream-dk);
        }
        .order-row:last-child{border-bottom:none;}
        .order-id{font-size:.85rem;font-weight:600;color:var(--forest);}
        .order-date{font-size:.75rem;color:var(--stone);margin-top:.1rem;}
        .order-cred{font-size:.72rem;color:var(--moss);font-weight:600;}
        .order-price{font-size:.9rem;font-weight:700;color:var(--forest);}
        .order-co2{font-size:.75rem;color:var(--stone);}
        .empty-orders{text-align:center;padding:2rem 1rem;color:var(--stone);}
        .empty-orders p{margin-bottom:1rem;font-size:.9rem;}

        /* reward cta */
        .reward-cta{
          margin-top:1rem;display:flex;align-items:center;justify-content:space-between;
          background:var(--lime-pale);border-radius:.85rem;padding:1rem 1.1rem;
          gap:.75rem;flex-wrap:wrap;
        }
        .reward-cta__left{font-size:.85rem;color:var(--moss);font-weight:600;}
        .reward-cta__pts{
          font-family:var(--font-display);font-size:1.5rem;font-weight:700;
          color:var(--forest);
        }

        /* link btn */
        .link-btn{
          display:inline-flex;align-items:center;gap:.4rem;
          padding:.55rem 1.1rem;border-radius:9999px;
          font-family:var(--font-body);font-size:.84rem;font-weight:600;
          text-decoration:none;cursor:pointer;border:none;
          transition:all .2s;
        }
        .link-btn-forest{background:var(--forest);color:var(--lime);}
        .link-btn-forest:hover{background:var(--moss);}
        .link-btn-lime{background:var(--lime);color:var(--forest);}
        .link-btn-lime:hover{background:#9acb38;}

        /* loading */
        .dash-loading{display:flex;justify-content:center;align-items:center;padding:6rem 2rem;}
        .dash-spinner{
          width:32px;height:32px;border-radius:50%;
          border:3px solid var(--lime-pale);border-top-color:var(--moss);
          animation:sp .8s linear infinite;
        }
        @keyframes sp{to{transform:rotate(360deg)}}

        @media(max-width:480px){
          .stat-card__value{font-size:1.6rem;}
          .dash-hero{padding:1.5rem;}
        }
      `}</style>

      <Navbar user={user}/>

      <div className="shell">
        {loading ? (
          <div className="dash-loading"><div className="dash-spinner"/></div>
        ) : (
          <>
            {/* Hero */}
            <div className="dash-hero">
              <div>
                <h1 className="dash-hero__title">
                  Hello, <span>{user?.name?.split(' ')[0] || 'there'}</span> 👋
                </h1>
                <p className="dash-hero__sub">Your sustainable shopping journey continues.</p>
              </div>
              <div className="dash-hero__badge">🌿 EcoCred Member</div>
            </div>

            {/* Stat cards */}
            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-card__icon">🌍</div>
                <p className="stat-card__label">CO₂ Saved</p>
                <p className="stat-card__value">{co2Saved.toFixed(2)} <span>kg</span></p>
                <p className="stat-card__note">≈ {Math.round(co2Saved*100)} trees planted</p>
              </div>
              <div className="stat-card">
                <div className="stat-card__icon">🏆</div>
                <p className="stat-card__label">EcoCreds</p>
                <p className="stat-card__value">{credits} <span>pts</span></p>
                <p className="stat-card__note">3 pts / kg CO₂ · 1 pt / ₹100</p>
              </div>
              <div className="stat-card">
                <div className="stat-card__icon">🛍️</div>
                <p className="stat-card__label">Orders</p>
                <p className="stat-card__value">{orders.length}</p>
                <p className="stat-card__note">Lifetime purchases</p>
              </div>
              <div className="stat-card">
                <div className="stat-card__icon">👤</div>
                <p className="stat-card__label">Account</p>
                <p className="stat-card__value" style={{fontSize:'1rem',lineHeight:1.4,paddingTop:'.2rem'}}>
                  {user?.email}
                </p>
                <p className="stat-card__note">{user?.nationality || 'Eco shopper'}</p>
              </div>
            </div>

            {/* Bottom cols */}
            <div className="dash-cols">
              {/* Quick actions */}
              <div className="section-card">
                <p className="section-title">⚡ Quick Actions</p>
                <div className="qa-grid">
                  {[
                    { to:'/products',   icon:'🛍️', label:'Shop Products' },
                    { to:'/rewards',    icon:'🎁', label:'View Rewards' },
                    { to:'/secondhand', icon:'♻️', label:'Secondhand' },
                    { to:'/cart',       icon:'🛒', label:'Your Cart' },
                  ].map(({to,icon,label})=>(
                    <Link key={to} to={to} className="qa-item">
                      <span className="qa-item__icon">{icon}</span>
                      <span className="qa-item__label">{label}</span>
                    </Link>
                  ))}
                </div>
                <div className="reward-cta">
                  <div>
                    <p className="reward-cta__left">Available EcoCreds</p>
                    <p className="reward-cta__pts">{credits} pts</p>
                  </div>
                  <Link to="/rewards" className="link-btn link-btn-forest">Redeem →</Link>
                </div>
              </div>

              {/* Recent orders */}
              <div className="section-card">
                <p className="section-title">📦 Recent Purchases</p>
                {orders.length===0 ? (
                  <div className="empty-orders">
                    <div style={{fontSize:'2.5rem',marginBottom:'.75rem'}}>🛒</div>
                    <p>No purchases yet.</p>
                    <Link to="/products" className="link-btn link-btn-lime">Browse Products</Link>
                  </div>
                ) : (
                  orders.slice(0,5).map(order=>(
                    <div key={order._id} className="order-row">
                      <div>
                        <p className="order-id">Order #{order._id?.slice(-6)}</p>
                        <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                        {order.ecoCredsEarned>0 && (
                          <p className="order-cred">+{order.ecoCredsEarned} EcoCreds</p>
                        )}
                      </div>
                      <div style={{textAlign:'right'}}>
                        <p className="order-price">₹{(order.totalPrice||0).toLocaleString('en-IN')}</p>
                        <p className="order-co2">{(order.totalCO2||0).toFixed(2)} kg CO₂</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}