// export default function Home() {
//   const features = [
//     {
//       title: "Sustainable Buying",
//       description: "Make eco-friendly purchases and reduce your carbon footprint with our verified green products",
//       icon: "🌱"
//     },
//     {
//       title: "Carbon Reduction",
//       description: "Track and reduce your carbon emissions with every sustainable purchase you make",
//       icon: "📊"
//     },
//     {
//       title: "Product Alternatives",
//       description: "Discover eco-friendly alternatives to everyday products that are better for the planet",
//       icon: "🔄"
//     },
//     {
//       title: "EcoPoints Rewards",
//       description: "Earn Ecopoints on sustainable buys that can be used to get discounts and special offers",
//       icon: "🏆"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 flex items-center">
//                 <span className="text-2xl font-bold text-green-600">🌿 EcoCred</span>
//               </div>
//             </div>
//             <div className="flex space-x-4">
//               <a href="/login" className="text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium">
//                 Login
//               </a>
//               <a href="/signup" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition duration-300">
//                 Sign Up
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
//             Shop Smart.
//             <span className="text-green-600 block">Save the Planet.</span>
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
//             Join EcoCred and transform your shopping habits. Earn rewards for sustainable choices, 
//             reduce your carbon footprint, and discover eco-friendly alternatives.
//           </p>
//           <div className="flex justify-center space-x-4">
//             <a href="/signup" className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg">
//               Get Started
//             </a>
//             <a href="#features" className="border border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300">
//               Learn More
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             How EcoCred Works
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Our platform helps you make sustainable choices while rewarding you for your eco-friendly efforts
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300 border border-green-100">
//               <div className="text-3xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* How It Works Section */}
//       <div className="bg-green-600 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">
//               Start Your Green Journey
//             </h2>
//             <p className="text-green-100 text-lg">
//               Simple steps to make a big impact
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//             <div className="space-y-4">
//               <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">1</div>
//               <h3 className="text-xl font-semibold">Sign Up & Shop</h3>
//               <p className="text-green-100">Create your account and start shopping for verified sustainable products</p>
//             </div>
//             <div className="space-y-4">
//               <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">2</div>
//               <h3 className="text-xl font-semibold">Earn EcoPoints</h3>
//               <p className="text-green-100">Get rewarded with EcoPoints for every sustainable purchase you make</p>
//             </div>
//             <div className="space-y-4">
//               <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">3</div>
//               <h3 className="text-xl font-semibold">Redeem & Save</h3>
//               <p className="text-green-100">Use your EcoPoints to get discounts and support more eco-friendly brands</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-white border-t border-green-200 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <p className="text-gray-600">
//             Join thousands of eco-conscious shoppers making a difference with every purchase.
//           </p>
//           <p className="text-green-600 font-semibold mt-2">
//             Together, we can build a sustainable future.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// src/pages/Home.jsx
import React from 'react';

const FEATURES = [
  { icon:'🌱', title:'EcoScore Engine',    desc:'AI-powered carbon analysis for every product, grounded in real material emission data.' },
  { icon:'🔄', title:'Greener Alternatives', desc:'Instantly discover eco-friendly swaps — ranked by actual environmental impact.' },
  { icon:'🏆', title:'EcoCred Rewards',    desc:'Earn points for CO₂ saved, eco choices made, and sustainable purchases.' },
  { icon:'♻️', title:'Secondhand Market',  desc:'Buy and sell pre-loved goods to reduce waste and earn bonus credits.' },
];

const STEPS = [
  { n:'01', title:'Sign Up & Search',  desc:'Create your account and browse our catalogue of thousands of products.' },
  { n:'02', title:'Check EcoScore',    desc:'Click any product to get an AI-generated environmental impact score.' },
  { n:'03', title:'Choose Green',      desc:'Pick the greener alternative and watch your CO₂ savings grow.' },
  { n:'04', title:'Earn & Redeem',     desc:'Convert your eco actions into EcoCred points and unlock real rewards.' },
];

export default function Home() {
  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:'#f5f0e8',minHeight:'100vh'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --forest:#1a3a2a;--moss:#2d5a3d;--lime:#b5e048;--lime-pale:#e8f5d8;
          --cream:#f5f0e8;--cream-dk:#ede8de;--stone:#8a8a7a;--white:#fff;
        }

        /* ── Navbar ────────────────────────────────── */
        .hn{
          background:var(--forest);position:sticky;top:0;z-index:50;
          border-bottom:1px solid rgba(181,224,72,.15);
        }
        .hn-inner{
          max-width:1200px;margin:0 auto;padding:0 1.25rem;
          display:flex;align-items:center;justify-content:space-between;height:60px;
        }
        .hn-brand{
          font-family:'Fraunces',serif;font-size:1.2rem;font-weight:700;
          color:var(--lime);text-decoration:none;display:flex;align-items:center;gap:.45rem;
        }
        .hn-links{display:flex;align-items:center;gap:.5rem;}
        .hn-link{
          padding:.45rem 1rem;border-radius:9999px;font-size:.875rem;font-weight:600;
          text-decoration:none;transition:all .2s;
        }
        .hn-link--ghost{color:rgba(255,255,255,.75);}
        .hn-link--ghost:hover{background:rgba(255,255,255,.1);color:var(--white);}
        .hn-link--lime{background:var(--lime);color:var(--forest);}
        .hn-link--lime:hover{background:#9acb38;}

        /* ── Hero ──────────────────────────────────── */
        .hero{
          max-width:1200px;margin:0 auto;padding:5rem 1.25rem 4rem;
          display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;
        }
        @media(max-width:760px){.hero{grid-template-columns:1fr;padding:3rem 1.25rem 2.5rem;}}
        .hero-eyebrow{
          display:inline-flex;align-items:center;gap:.4rem;
          background:var(--lime-pale);color:var(--moss);
          font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;
          padding:.3rem .85rem;border-radius:9999px;margin-bottom:1.1rem;
        }
        .hero-title{
          font-family:'Fraunces',serif;
          font-size:clamp(2.2rem,5vw,3.5rem);font-weight:700;
          color:var(--forest);line-height:1.1;letter-spacing:-.02em;
          margin-bottom:1.1rem;
        }
        .hero-title em{color:var(--moss);font-style:italic;}
        .hero-sub{font-size:1.05rem;color:var(--stone);line-height:1.65;margin-bottom:2rem;}
        .hero-ctas{display:flex;gap:.75rem;flex-wrap:wrap;}
        .cta-primary{
          padding:.8rem 1.75rem;border-radius:9999px;
          background:var(--forest);color:var(--lime);
          font-size:.95rem;font-weight:700;text-decoration:none;
          transition:all .2s;box-shadow:0 4px 16px rgba(26,58,42,.2);
        }
        .cta-primary:hover{background:var(--moss);transform:translateY(-2px);}
        .cta-ghost{
          padding:.8rem 1.75rem;border-radius:9999px;
          border:2px solid var(--cream-dk);color:var(--forest);
          font-size:.95rem;font-weight:600;text-decoration:none;
          transition:all .2s;background:var(--white);
        }
        .cta-ghost:hover{border-color:var(--moss);background:var(--cream);}

        /* hero visual */
        .hero-visual{
          background:var(--white);border:2px solid var(--cream-dk);
          border-radius:1.5rem;padding:2rem;
          box-shadow:0 16px 48px rgba(26,58,42,.1);
        }
        @media(max-width:760px){.hero-visual{display:none;}}
        .hv-label{font-size:.72rem;text-transform:uppercase;letter-spacing:.08em;color:var(--stone);margin-bottom:.5rem;}
        .hv-name{font-family:'Fraunces',serif;font-size:1.1rem;font-weight:600;color:var(--forest);margin-bottom:1rem;}
        .hv-gauge{
          background:linear-gradient(90deg,#e05252 0%,#f5a623 35%,#5a9e3a 70%,#2d5a3d 100%);
          height:10px;border-radius:9999px;margin-bottom:.5rem;position:relative;
        }
        .hv-needle{
          position:absolute;top:-5px;
          width:20px;height:20px;border-radius:50%;
          background:var(--white);border:3px solid var(--forest);
          left:72%;transform:translateX(-50%);
          box-shadow:0 2px 8px rgba(0,0,0,.2);
        }
        .hv-score{
          font-family:'Fraunces',serif;font-size:2.5rem;font-weight:700;
          color:var(--moss);margin:1rem 0 .25rem;
        }
        .hv-sublabel{font-size:.8rem;color:var(--stone);}
        .hv-badges{display:flex;flex-wrap:wrap;gap:.35rem;margin-top:1rem;}
        .hv-badge{
          font-size:.68rem;font-weight:700;padding:.22rem .6rem;
          border-radius:9999px;background:var(--lime-pale);
          color:var(--moss);text-transform:uppercase;letter-spacing:.05em;
        }
        .hv-divider{border:none;border-top:1.5px solid var(--cream-dk);margin:1rem 0;}
        .hv-alt{
          background:var(--lime-pale);border:1.5px solid var(--lime);
          border-radius:.85rem;padding:1rem;display:flex;align-items:center;gap:.75rem;
        }
        .hv-alt-icon{font-size:1.8rem;}
        .hv-alt-name{font-family:'Fraunces',serif;font-size:.95rem;font-weight:700;color:var(--forest);}
        .hv-alt-sub{font-size:.75rem;color:var(--moss);font-weight:600;}

        /* ── Features ──────────────────────────────── */
        .features{background:var(--white);padding:5rem 1.25rem;}
        .features-inner{max-width:1200px;margin:0 auto;}
        .section-label{
          text-align:center;font-size:.78rem;text-transform:uppercase;
          letter-spacing:.1em;color:var(--stone);margin-bottom:.75rem;
        }
        .section-title{
          font-family:'Fraunces',serif;font-size:clamp(1.6rem,3vw,2.5rem);
          font-weight:700;color:var(--forest);text-align:center;
          margin-bottom:3rem;letter-spacing:-.01em;
        }
        .feat-grid{
          display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
          gap:1.25rem;
        }
        .feat-card{
          padding:1.75rem;border:1.5px solid var(--cream-dk);border-radius:1.1rem;
          background:var(--cream);transition:all .2s;
        }
        .feat-card:hover{transform:translateY(-4px);border-color:#c5ddb8;box-shadow:0 8px 24px rgba(26,58,42,.1);}
        .feat-icon{font-size:2rem;margin-bottom:1rem;}
        .feat-title{
          font-family:'Fraunces',serif;font-size:1.1rem;font-weight:700;
          color:var(--forest);margin-bottom:.5rem;
        }
        .feat-desc{font-size:.875rem;color:var(--stone);line-height:1.6;}

        /* ── Steps ─────────────────────────────────── */
        .steps{background:var(--forest);padding:5rem 1.25rem;}
        .steps-inner{max-width:1200px;margin:0 auto;}
        .steps-title{
          font-family:'Fraunces',serif;font-size:clamp(1.6rem,3vw,2.5rem);
          font-weight:700;color:var(--white);text-align:center;margin-bottom:3rem;
        }
        .steps-title span{color:var(--lime);font-style:italic;}
        .steps-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1.5rem;}
        .step-card{
          padding:1.75rem;border-radius:1.1rem;
          background:rgba(255,255,255,.05);border:1px solid rgba(181,224,72,.15);
        }
        .step-num{
          font-family:'Fraunces',serif;font-size:2.5rem;font-weight:700;
          color:rgba(181,224,72,.3);line-height:1;margin-bottom:.75rem;
        }
        .step-title{
          font-family:'Fraunces',serif;font-size:1.05rem;font-weight:700;
          color:var(--white);margin-bottom:.5rem;
        }
        .step-desc{font-size:.875rem;color:rgba(255,255,255,.6);line-height:1.6;}

        /* ── Footer ────────────────────────────────── */
        .footer{background:var(--cream);border-top:1.5px solid var(--cream-dk);padding:2.5rem 1.25rem;}
        .footer-inner{max-width:1200px;margin:0 auto;text-align:center;}
        .footer-brand{
          font-family:'Fraunces',serif;font-size:1.1rem;font-weight:700;
          color:var(--forest);margin-bottom:.5rem;
        }
        .footer-sub{font-size:.85rem;color:var(--stone);}
      `}</style>

      {/* Navbar */}
      <nav className="hn">
        <div className="hn-inner">
          <a href="/" className="hn-brand"><span>🌿</span> EcoCred</a>
          <div className="hn-links">
            <a href="/login"  className="hn-link hn-link--ghost">Login</a>
            <a href="/signup" className="hn-link hn-link--lime">Get Started</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div>
          <div className="hero-eyebrow">🌍 AI-powered eco shopping</div>
          <h1 className="hero-title">
            Shop smart.<br/><em>Save the planet.</em>
          </h1>
          <p className="hero-sub">
            EcoCred scores every product's carbon footprint in real time,
            surfaces greener alternatives, and rewards your sustainable choices
            with redeemable points.
          </p>
          <div className="hero-ctas">
            <a href="/signup" className="cta-primary">Start for free →</a>
            <a href="#features" className="cta-ghost">How it works</a>
          </div>
        </div>

        {/* Fake product card */}
        <div className="hero-visual">
          <p className="hv-label">Organic Cotton Jacket</p>
          <p className="hv-name">EcoScore Analysis</p>
          <div className="hv-gauge"><div className="hv-needle"/></div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'.78rem',color:'var(--stone)',marginBottom:'.25rem'}}>
            <span>Poor</span><span>Excellent</span>
          </div>
          <p className="hv-score">82</p>
          <p className="hv-sublabel">Excellent — 82/100</p>
          <div className="hv-badges">
            <span className="hv-badge">Organic Materials</span>
            <span className="hv-badge">Low Carbon</span>
            <span className="hv-badge">Minimal Packaging</span>
          </div>
          <hr className="hv-divider"/>
          <p style={{fontSize:'.72rem',textTransform:'uppercase',letterSpacing:'.07em',color:'var(--stone)',marginBottom:'.65rem'}}>
            ♻️ Greener Alternative
          </p>
          <div className="hv-alt">
            <span className="hv-alt-icon">🌿</span>
            <div>
              <p className="hv-alt-name">Hemp Canvas Jacket</p>
              <p className="hv-alt-sub">EcoScore 91 · Saves 1.8 kg CO₂</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features" id="features">
        <div className="features-inner">
          <p className="section-label">What we offer</p>
          <h2 className="section-title">Everything you need to shop sustainably</h2>
          <div className="feat-grid">
            {FEATURES.map(f=>(
              <div key={f.title} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <h3 className="feat-title">{f.title}</h3>
                <p className="feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="steps">
        <div className="steps-inner">
          <h2 className="steps-title">Your green journey <span>in 4 steps</span></h2>
          <div className="steps-grid">
            {STEPS.map(s=>(
              <div key={s.n} className="step-card">
                <p className="step-num">{s.n}</p>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div className="footer-inner">
          <p className="footer-brand">🌿 EcoCred</p>
          <p className="footer-sub">Making every purchase a step toward a sustainable future.</p>
        </div>
      </div>
    </div>
  );
}