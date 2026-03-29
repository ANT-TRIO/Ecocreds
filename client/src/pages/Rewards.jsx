// src/pages/Rewards.jsx
// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import api from '../utils/api';

// // Enhanced rewards with better thresholds and benefits
// const REWARDS = [
//   { id: 'r1', title: '5% Off Coupon', threshold: 50, description: 'Get 5% off on your next purchase' },
//   { id: 'r2', title: 'Free Shipping', threshold: 100, description: 'Free shipping on any order' },
//   { id: 'r3', title: '10% Off Coupon', threshold: 150, description: 'Get 10% off on your next purchase' },
//   { id: 'r4', title: 'Eco Starter Kit', threshold: 200, description: 'Free sustainable starter kit' },
//   { id: 'r5', title: '15% Off Coupon', threshold: 300, description: 'Get 15% off on your next purchase' },
//   { id: 'r6', title: 'Premium Membership', threshold: 500, description: '1 month premium membership' },
//   { id: 'r7', title: '20% Off Coupon', threshold: 750, description: 'Get 20% off on your next purchase' },
//   { id: 'r8', title: 'Eco Ambassador', threshold: 1000, description: 'Become an Eco Ambassador' },
//   { id: 'r9', title: '25% Off Coupon', threshold: 1500, description: 'Get 25% off on your next purchase' },
//   { id: 'r10', title: 'Carbon Neutral Certificate', threshold: 2000, description: 'Official carbon neutral certificate' },
// ];

// export default function Rewards() {
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const res = await api.get('/auth/me');
//       setUser(res.data.user);
//       setUserData(res.data);
//     } catch (error) {
//       console.error('Failed to fetch user data');
//     }
//   };

//   const ecoCreds = userData?.ecoCreds || 0;
//   const co2Saved = userData?.totalCO2Saved || 0;

//   const claimReward = async (reward) => {
//     if (ecoCreds < reward.threshold) {
//       alert(`You need ${reward.threshold} EcoCreds to claim this reward. You have ${ecoCreds}.`);
//       return;
//     }
    
//     try {
//       await api.post('/rewards/claim', { rewardId: reward.id });
//       alert(`Congratulations! You've claimed: ${reward.title}`);
//       fetchUserData(); // Refresh user data
//     } catch (error) {
//       alert('Failed to claim reward. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
//       <Navbar user={user} />
      
//       <div className="max-w-7xl mx-auto p-6">
//         {/* Header Section */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-100">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Rewards</h1>
//               <p className="text-gray-600">Redeem your EcoCred points for amazing benefits</p>
//             </div>
//             <div className="text-right">
//               <div className="text-2xl font-bold text-green-600">{ecoCreds}</div>
//               <div className="text-sm text-gray-500">Available EcoCreds</div>
//             </div>
//           </div>
//         </div>

//         {/* Points Breakdown */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 How to Earn Points</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                 <span className="text-gray-600">CO₂ Saved</span>
//                 <span className="font-semibold text-green-600">3 points per kg</span>
//               </div>
//               <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                 <span className="text-gray-600">Purchase Amount</span>
//                 <span className="font-semibold text-green-600">1 point per ₹100</span>
//               </div>
//               <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                 <span className="text-gray-600">Eco Alternatives</span>
//                 <span className="font-semibold text-green-600">+5 bonus points</span>
//               </div>
//               <div className="flex justify-between items-center py-2">
//                 <span className="text-gray-600">Your Total CO₂ Saved</span>
//                 <span className="font-semibold text-green-600">{co2Saved.toFixed(2)} kg</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">📈 Your Progress</h3>
//             <div className="space-y-4">
//               <div>
//                 <div className="flex justify-between text-sm mb-1">
//                   <span>Next Reward: 50 points</span>
//                   <span>{ecoCreds}/50</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div 
//                     className="bg-green-600 h-2 rounded-full transition-all duration-300" 
//                     style={{ width: `${Math.min((ecoCreds / 50) * 100, 100)}%` }}
//                   ></div>
//                 </div>
//               </div>
//               <div className="text-center">
//                 <p className="text-sm text-gray-600">
//                   {ecoCreds >= 50 ? '🎉 You can claim rewards!' : `You need ${50 - ecoCreds} more points for your first reward`}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Rewards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {REWARDS.map(reward => {
//             const canClaim = ecoCreds >= reward.threshold;
//             const progress = Math.min((ecoCreds / reward.threshold) * 100, 100);
            
//             return (
//               <div 
//                 key={reward.id} 
//                 className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-300 ${
//                   canClaim 
//                     ? 'border-green-500 transform hover:scale-105 hover:shadow-xl' 
//                     : 'border-gray-200'
//                 }`}
//               >
//                 <div className="text-center mb-4">
//                   <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${
//                     canClaim ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
//                   }`}>
//                     {canClaim ? '🎁' : '🔒'}
//                   </div>
//                   <h3 className="font-bold text-lg text-gray-900 mb-1">{reward.title}</h3>
//                   <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
//                   <div className="text-2xl font-bold text-green-600 mb-2">{reward.threshold} pts</div>
//                 </div>

//                 {/* Progress Bar */}
//                 <div className="mb-4">
//                   <div className="flex justify-between text-xs mb-1">
//                     <span>Progress</span>
//                     <span>{ecoCreds}/{reward.threshold}</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div 
//                       className={`h-2 rounded-full transition-all duration-300 ${
//                         canClaim ? 'bg-green-600' : 'bg-green-400'
//                       }`}
//                       style={{ width: `${progress}%` }}
//                     ></div>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => claimReward(reward)}
//                   disabled={!canClaim}
//                   className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
//                     canClaim
//                       ? 'bg-green-600 hover:bg-green-700 text-white shadow-md'
//                       : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                   }`}
//                 >
//                   {canClaim ? 'Claim Reward' : 'Not Enough Points'}
//                 </button>
//               </div>
//             );
//           })}
//         </div>

//         {/* Empty state if no rewards available */}
//         {REWARDS.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">🎁</div>
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No Rewards Available</h3>
//             <p className="text-gray-600">Start shopping to earn EcoCred points!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// src/pages/Rewards.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';

const REWARDS = [
  { id:'r1',  icon:'🎟',  title:'5% Off Coupon',             threshold:50,   description:'5% off your next order' },
  { id:'r2',  icon:'🚚',  title:'Free Shipping',              threshold:100,  description:'Free shipping on any order' },
  { id:'r3',  icon:'🏷',  title:'10% Off Coupon',             threshold:150,  description:'10% off your next order' },
  { id:'r4',  icon:'🌱',  title:'Eco Starter Kit',            threshold:200,  description:'Free sustainable starter kit' },
  { id:'r5',  icon:'💚',  title:'15% Off Coupon',             threshold:300,  description:'15% off your next order' },
  { id:'r6',  icon:'⭐',  title:'Premium Membership',         threshold:500,  description:'1 month premium access' },
  { id:'r7',  icon:'🎁',  title:'20% Off Coupon',             threshold:750,  description:'20% off your next order' },
  { id:'r8',  icon:'🌍',  title:'Eco Ambassador',             threshold:1000, description:'Become an Eco Ambassador' },
  { id:'r9',  icon:'💎',  title:'25% Off Coupon',             threshold:1500, description:'25% off your next order' },
  { id:'r10', icon:'🏆',  title:'Carbon Neutral Certificate', threshold:2000, description:'Official carbon neutral cert' },
];

const EARN_RULES = [
  { icon:'🌍', label:'CO₂ Saved',        value:'3 pts / kg' },
  { icon:'💳', label:'Purchase Amount',   value:'1 pt / ₹100' },
  { icon:'♻️', label:'Eco Alternatives',  value:'+5 bonus pts' },
  { icon:'♻️', label:'Sell Secondhand',   value:'+10 pts / sale' },
];

export default function Rewards() {
  const [userData,  setUserData]  = useState(null);
  const [claiming,  setClaiming]  = useState(null);
  const [toast,     setToast]     = useState(null);

  useEffect(() => { fetchUserData(); }, []);

  const fetchUserData = async () => {
    try { const r = await api.get('/auth/me'); setUserData(r.data); } catch {}
  };

  const ecoCreds = userData?.ecoCreds || 0;
  const co2Saved = userData?.totalCO2Saved || 0;

  // Find next locked reward
  const nextReward = REWARDS.find(r => ecoCreds < r.threshold);
  const nextPts    = nextReward ? nextReward.threshold - ecoCreds : 0;
  const nextProg   = nextReward ? Math.min((ecoCreds / nextReward.threshold) * 100, 100) : 100;

  const claimReward = async (reward) => {
    if (ecoCreds < reward.threshold) {
      setToast({ msg:`Need ${reward.threshold - ecoCreds} more pts to claim this.`, type:'warn' });
      return;
    }
    setClaiming(reward.id);
    try {
      await api.post('/rewards/claim', { rewardId: reward.id });
      setToast({ msg:`🎉 "${reward.title}" claimed!`, type:'ok' });
      fetchUserData();
    } catch {
      setToast({ msg:'Claim failed — please try again.', type:'err' });
    } finally { setClaiming(null); }
  };

  return (
    <div className="rw-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --forest:#1a3a2a;--moss:#2d5a3d;--moss-light:#3d7a52;
          --lime:#b5e048;--lime-dim:#9acb38;--lime-pale:#e8f5d8;
          --cream:#f5f0e8;--cream-dk:#ede8de;--stone:#8a8a7a;--stone-lt:#b0b0a0;
          --white:#fff;--red:#e05252;--red-pale:#fdf0f0;--amber:#f5a623;--amber-pale:#fff8e6;
          --font-display:'Fraunces',serif;--font-body:'DM Sans',system-ui,sans-serif;
          --shadow:0 2px 12px rgba(26,58,42,.08);--shadow-lg:0 8px 32px rgba(26,58,42,.12);
        }
        body{font-family:var(--font-body);background:var(--cream);}
        .rw-page{min-height:100vh;background:var(--cream);}
        .shell{max-width:1280px;margin:0 auto;padding:2rem 1.25rem 5rem;}

        /* ── Hero ─────────────────────────────────── */
        .rw-hero{
          background:var(--forest);border-radius:1.35rem;padding:2rem 2.25rem;
          margin-bottom:1.5rem;
          display:flex;align-items:center;justify-content:space-between;
          flex-wrap:wrap;gap:1rem;
          background-image:radial-gradient(ellipse at 85% 40%,rgba(181,224,72,.12) 0%,transparent 55%);
        }
        .rw-hero__left{}
        .rw-hero__eyebrow{
          font-size:.72rem;text-transform:uppercase;letter-spacing:.1em;
          color:rgba(181,224,72,.6);margin-bottom:.4rem;font-weight:600;
        }
        .rw-hero__title{
          font-family:var(--font-display);font-size:clamp(1.4rem,3vw,2rem);
          font-weight:700;color:var(--white);line-height:1.15;margin-bottom:.3rem;
        }
        .rw-hero__title em{color:var(--lime);font-style:italic;}
        .rw-hero__sub{font-size:.875rem;color:rgba(255,255,255,.5);}

        /* big cred counter */
        .cred-counter{
          background:rgba(181,224,72,.12);border:1px solid rgba(181,224,72,.25);
          border-radius:1rem;padding:1.25rem 1.75rem;text-align:center;flex-shrink:0;
        }
        .cred-counter__num{
          font-family:var(--font-display);font-size:2.75rem;font-weight:700;
          color:var(--lime);line-height:1;
        }
        .cred-counter__label{font-size:.75rem;color:rgba(255,255,255,.5);margin-top:.25rem;font-weight:600;text-transform:uppercase;letter-spacing:.07em;}

        /* ── Stats row ────────────────────────────── */
        .stats-row{
          display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
          gap:.85rem;margin-bottom:1.5rem;
        }
        .stat-box{
          background:var(--white);border:1.5px solid var(--cream-dk);
          border-radius:.85rem;padding:1rem;box-shadow:var(--shadow);
        }
        .stat-box__icon{font-size:1.1rem;margin-bottom:.35rem;}
        .stat-box__label{font-size:.7rem;text-transform:uppercase;letter-spacing:.07em;color:var(--stone);margin-bottom:.2rem;}
        .stat-box__value{font-family:var(--font-display);font-size:1.25rem;font-weight:700;color:var(--forest);}
        .stat-box__sub{font-size:.72rem;color:var(--stone-lt);margin-top:.15rem;}

        /* ── Two-col info ─────────────────────────── */
        .info-cols{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.75rem;}
        @media(max-width:640px){.info-cols{grid-template-columns:1fr;}}
        .info-card{
          background:var(--white);border:1.5px solid var(--cream-dk);
          border-radius:1.1rem;padding:1.35rem;box-shadow:var(--shadow);
        }
        .info-card__title{
          font-family:var(--font-display);font-size:1rem;font-weight:700;
          color:var(--forest);margin-bottom:.9rem;
        }
        .earn-row{
          display:flex;align-items:center;justify-content:space-between;
          padding:.55rem 0;border-bottom:1px solid var(--cream-dk);
          font-size:.875rem;
        }
        .earn-row:last-child{border-bottom:none;}
        .earn-row__left{display:flex;align-items:center;gap:.55rem;color:var(--stone);}
        .earn-row__val{font-weight:700;color:var(--moss);}

        /* progress section */
        .prog-wrap{margin-top:.35rem;}
        .prog-label{
          display:flex;justify-content:space-between;
          font-size:.8rem;color:var(--stone);margin-bottom:.5rem;
        }
        .prog-label strong{color:var(--forest);}
        .prog-track{
          height:8px;background:var(--cream-dk);border-radius:9999px;overflow:hidden;
          margin-bottom:.65rem;
        }
        .prog-fill{
          height:100%;background:linear-gradient(90deg,var(--lime) 0%,var(--lime-dim) 100%);
          border-radius:9999px;
          transition:width .8s cubic-bezier(.4,0,.2,1);
        }
        .prog-next{
          font-size:.82rem;color:var(--stone);
          background:var(--cream);border-radius:.65rem;padding:.6rem .85rem;
          display:flex;align-items:center;gap:.45rem;
        }
        .prog-next strong{color:var(--forest);}

        /* ── Rewards grid ─────────────────────────── */
        .rw-section-title{
          font-family:var(--font-display);font-size:1.1rem;font-weight:700;
          color:var(--forest);margin-bottom:1rem;
        }
        .rw-grid{
          display:grid;
          grid-template-columns:repeat(auto-fill,minmax(210px,1fr));
          gap:1rem;
        }

        /* reward card */
        .rw-card{
          background:var(--white);border:2px solid var(--cream-dk);
          border-radius:1.1rem;padding:1.35rem;
          box-shadow:var(--shadow);
          display:flex;flex-direction:column;
          transition:transform .2s,box-shadow .2s,border-color .2s;
          position:relative;overflow:hidden;
        }
        .rw-card--unlocked{
          border-color:var(--lime);
          box-shadow:0 0 0 3px rgba(181,224,72,.15),var(--shadow-lg);
        }
        .rw-card--unlocked:hover{transform:translateY(-4px);box-shadow:0 0 0 3px rgba(181,224,72,.2),var(--shadow-lg);}
        .rw-card--locked{opacity:.85;}
        .rw-card--locked:hover{transform:translateY(-2px);}

        /* shimmer on unlocked */
        .rw-card--unlocked::before{
          content:'';position:absolute;top:0;left:-100%;
          width:60%;height:100%;
          background:linear-gradient(90deg,transparent,rgba(181,224,72,.08),transparent);
          animation:shimmer 2.5s ease infinite;
        }
        @keyframes shimmer{to{left:150%;}}

        .rw-card__icon{
          width:44px;height:44px;border-radius:.75rem;
          display:flex;align-items:center;justify-content:center;
          font-size:1.3rem;margin-bottom:.85rem;
          flex-shrink:0;
        }
        .rw-card__icon--unlocked{background:var(--lime-pale);}
        .rw-card__icon--locked{background:var(--cream);filter:grayscale(1);}
        .rw-card__title{
          font-family:var(--font-display);font-size:1rem;font-weight:700;
          color:var(--forest);margin-bottom:.25rem;
        }
        .rw-card__desc{font-size:.8rem;color:var(--stone);margin-bottom:.85rem;line-height:1.5;flex:1;}
        .rw-card__pts{
          font-family:var(--font-display);font-size:1.35rem;font-weight:700;
          margin-bottom:.75rem;
        }
        .rw-card__pts--unlocked{color:var(--moss);}
        .rw-card__pts--locked{color:var(--stone-lt);}

        /* mini progress on locked */
        .rw-prog{margin-bottom:.85rem;}
        .rw-prog__bar{height:5px;background:var(--cream-dk);border-radius:9999px;overflow:hidden;margin-bottom:.3rem;}
        .rw-prog__fill{height:100%;background:var(--lime);border-radius:9999px;transition:width .6s ease;}
        .rw-prog__label{font-size:.68rem;color:var(--stone-lt);text-align:right;}

        /* claim btn */
        .rw-btn{
          width:100%;padding:.65rem;border-radius:.75rem;
          font-family:var(--font-body);font-size:.875rem;font-weight:700;
          border:none;cursor:pointer;transition:all .2s;
          display:flex;align-items:center;justify-content:center;gap:.4rem;
        }
        .rw-btn--claim{background:var(--forest);color:var(--lime);}
        .rw-btn--claim:hover:not(:disabled){background:var(--moss);transform:translateY(-1px);}
        .rw-btn--claim:disabled{opacity:.6;cursor:not-allowed;}
        .rw-btn--locked{background:var(--cream);color:var(--stone-lt);cursor:not-allowed;}
        .rw-spinner{
          width:12px;height:12px;border-radius:50%;
          border:2px solid var(--lime);border-top-color:transparent;
          animation:sp .7s linear infinite;
        }
        @keyframes sp{to{transform:rotate(360deg)}}

        /* ── Toast ────────────────────────────────── */
        .rw-toast{
          position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;
          padding:.7rem 1.25rem;border-radius:9999px;
          font-family:var(--font-body);font-size:.875rem;font-weight:600;
          display:flex;align-items:center;gap:.5rem;
          box-shadow:0 8px 32px rgba(0,0,0,.15);
          animation:tpop .3s ease both;
        }
        .rw-toast--ok {background:var(--forest);color:var(--lime);}
        .rw-toast--warn{background:var(--amber-pale);color:#7a5c00;border:1px solid #f5d88a;}
        .rw-toast--err {background:var(--red-pale);color:var(--red);border:1px solid rgba(224,82,82,.3);}
        @keyframes tpop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

        @media(max-width:520px){
          .rw-hero{padding:1.35rem;}
          .cred-counter{padding:.9rem 1.1rem;}
          .cred-counter__num{font-size:2rem;}
        }
      `}</style>

      <Navbar user={userData?.user}/>

      <div className="shell">
        {/* Hero */}
        <div className="rw-hero">
          <div className="rw-hero__left">
            <p className="rw-hero__eyebrow">Your Rewards</p>
            <h1 className="rw-hero__title">Turn green choices<br/>into <em>real rewards.</em></h1>
            <p className="rw-hero__sub">Earn points every time you shop sustainably.</p>
          </div>
          <div className="cred-counter">
            <p className="cred-counter__num">{ecoCreds}</p>
            <p className="cred-counter__label">EcoCreds</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {[
            { icon:'🌍', label:'CO₂ Saved',  value:`${co2Saved.toFixed(2)} kg`, sub:'lifetime' },
            { icon:'🏆', label:'EcoCreds',    value:ecoCreds,                    sub:'available' },
            { icon:'🎁', label:'Claimable',   value:REWARDS.filter(r=>ecoCreds>=r.threshold).length, sub:'rewards ready' },
            { icon:'🔒', label:'Next reward', value:nextReward?.title||'All claimed!', sub:nextReward?`${nextPts} pts away`:'🎉' },
          ].map(s=>(
            <div key={s.label} className="stat-box">
              <div className="stat-box__icon">{s.icon}</div>
              <p className="stat-box__label">{s.label}</p>
              <p className="stat-box__value" style={{fontSize:typeof s.value==='string'&&s.value.length>8?'.95rem':'1.25rem'}}>
                {s.value}
              </p>
              <p className="stat-box__sub">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Info cols */}
        <div className="info-cols">
          {/* How to earn */}
          <div className="info-card">
            <p className="info-card__title">🎯 How to Earn Points</p>
            {EARN_RULES.map(r=>(
              <div key={r.label} className="earn-row">
                <span className="earn-row__left"><span>{r.icon}</span>{r.label}</span>
                <span className="earn-row__val">{r.value}</span>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="info-card">
            <p className="info-card__title">📈 Progress to Next Reward</p>
            {nextReward ? (
              <div className="prog-wrap">
                <div className="prog-label">
                  <span>Towards <strong>{nextReward.title}</strong></span>
                  <span>{ecoCreds}/{nextReward.threshold} pts</span>
                </div>
                <div className="prog-track">
                  <div className="prog-fill" style={{width:`${nextProg}%`}}/>
                </div>
                <div className="prog-next">
                  🔒 <strong>{nextPts} more points</strong> to unlock this reward.
                </div>
              </div>
            ) : (
              <div className="prog-next" style={{textAlign:'center',justifyContent:'center'}}>
                🎉 <strong>All rewards unlocked!</strong> Keep shopping to earn more.
              </div>
            )}
          </div>
        </div>

        {/* Rewards grid */}
        <p className="rw-section-title">🎁 Available Rewards</p>
        <div className="rw-grid">
          {REWARDS.map(reward => {
            const unlocked = ecoCreds >= reward.threshold;
            const prog     = Math.min((ecoCreds / reward.threshold) * 100, 100);
            const isClaiming = claiming === reward.id;

            return (
              <div key={reward.id}
                className={`rw-card ${unlocked?'rw-card--unlocked':'rw-card--locked'}`}>
                <div className={`rw-card__icon ${unlocked?'rw-card__icon--unlocked':'rw-card__icon--locked'}`}>
                  {unlocked ? reward.icon : '🔒'}
                </div>
                <p className="rw-card__title">{reward.title}</p>
                <p className="rw-card__desc">{reward.description}</p>
                <p className={`rw-card__pts ${unlocked?'rw-card__pts--unlocked':'rw-card__pts--locked'}`}>
                  {reward.threshold} pts
                </p>

                {!unlocked && (
                  <div className="rw-prog">
                    <div className="rw-prog__bar">
                      <div className="rw-prog__fill" style={{width:`${prog}%`}}/>
                    </div>
                    <p className="rw-prog__label">{ecoCreds}/{reward.threshold}</p>
                  </div>
                )}

                <button
                  className={`rw-btn ${unlocked?'rw-btn--claim':'rw-btn--locked'}`}
                  onClick={() => claimReward(reward)}
                  disabled={!unlocked || isClaiming}
                >
                  {isClaiming
                    ? <><span className="rw-spinner"/> Claiming…</>
                    : unlocked ? '🎁 Claim Reward' : 'Locked'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <ToastMsg
          msg={toast.msg} type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </div>
  );
}

function ToastMsg({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return <div className={`rw-toast rw-toast--${type}`}>{msg}</div>;
}