// src/pages/ProductsPage.jsx
// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import ProductsList from '../components/ProductsList';
// import api from '../utils/api';

// export default function ProductsPage() {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     api.get('/auth/me')
//       .then(res => setUserData(res.data))
//       .catch(() => {});
//   }, []);

//   return (
//     <div className="products-page">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,300&family=DM+Sans:wght@300;400;500;600&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         :root {
//           --forest:   #1a3a2a;
//           --moss:     #2d5a3d;
//           --lime:     #b5e048;
//           --lime-dim: #9acb38;
//           --cream:    #f5f0e8;
//           --cream-dk: #ede8de;
//           --bark:     #5c4033;
//           --stone:    #8a8a7a;
//           --white:    #ffffff;
//           --red:      #e05252;
//           --amber:    #f5a623;
//           --r: .75rem;
//         }

//         body { background: var(--cream); }

//         .products-page {
//           min-height: 100vh;
//           background: var(--cream);
//           font-family: 'DM Sans', sans-serif;
//         }

//         .page-shell {
//           max-width: 1280px;
//           margin: 0 auto;
//           padding: 2rem 1.5rem 4rem;
//         }

//         .page-headline {
//           font-family: 'Fraunces', serif;
//           font-size: clamp(2rem, 4vw, 3rem);
//           font-weight: 700;
//           color: var(--forest);
//           letter-spacing: -0.02em;
//           margin-bottom: .25rem;
//         }

//         .page-headline span {
//           color: var(--moss);
//           font-style: italic;
//         }

//         .page-sub {
//           color: var(--stone);
//           font-size: .95rem;
//           margin-bottom: 2rem;
//         }
//       `}</style>

//       <Navbar user={userData?.user} />

//       <div className="page-shell">
//         <h1 className="page-headline">Shop <span>consciously.</span></h1>
//         <p className="page-sub">Discover products, check their environmental impact, and find greener alternatives.</p>
//         <ProductsList />
//       </div>
//     </div>
//   );
// }

// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductsList from '../components/ProductsList';
import api from '../utils/api';

export default function ProductsPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    api.get('/auth/me').then(r => setUserData(r.data)).catch(() => {});
  }, []);

  return (
    <div className="pp-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --forest:#1a3a2a;--moss:#2d5a3d;--lime:#b5e048;
          --cream:#f5f0e8;--cream-dk:#ede8de;--stone:#8a8a7a;--white:#fff;
          --font-display:'Fraunces',Georgia,serif;
          --font-body:'DM Sans',system-ui,sans-serif;
        }
        body{font-family:var(--font-body);background:var(--cream);}
        .pp-root{min-height:100vh;background:var(--cream);}

        .pp-shell{
          max-width:1280px;margin:0 auto;
          padding:2rem 1.25rem 5rem;
        }

        /* headline */
        .pp-headline{
          font-family:var(--font-display);
          font-size:clamp(1.75rem,4vw,2.75rem);
          font-weight:700;color:var(--forest);
          letter-spacing:-.02em;line-height:1.15;
          margin-bottom:.3rem;
        }
        .pp-headline em{color:var(--moss);font-style:italic;}

        .pp-sub{
          font-size:.9rem;color:var(--stone);
          margin-bottom:1.75rem;line-height:1.55;
          max-width:520px;
        }

        /* stat chips */
        .pp-chips{
          display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:2rem;
        }
        .pp-chip{
          display:inline-flex;align-items:center;gap:.35rem;
          background:var(--white);border:1.5px solid var(--cream-dk);
          border-radius:9999px;padding:.35rem .85rem;
          font-size:.78rem;font-weight:600;color:var(--stone);
        }
        .pp-chip span{font-size:.85rem;}
      `}</style>

      <Navbar user={userData?.user}/>

      <div className="pp-shell">
        <h1 className="pp-headline">Shop <em>consciously.</em></h1>
        <p className="pp-sub">
          Browse products, check their real environmental impact with AI, and
          discover greener alternatives — all in one place.
        </p>

        {/* quick context chips */}
        <div className="pp-chips">
          {[
            ['🌍','AI EcoScoring'],
            ['♻️','Greener Alternatives'],
            ['🛒','Quick Add to Cart'],
            ['🏆','Earn EcoCreds'],
          ].map(([icon, label]) => (
            <span key={label} className="pp-chip"><span>{icon}</span>{label}</span>
          ))}
        </div>

        <ProductsList/>
      </div>
    </div>
  );
}