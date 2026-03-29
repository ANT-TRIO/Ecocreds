// src/components/Navbar.jsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Navbar({ user }) {
//   const navigate = useNavigate();
  
//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-green-600 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo and Brand */}
//           <div className="flex items-center space-x-8">
//             <Link to="/dashboard" className="flex items-center space-x-2">
//               <span className="text-2xl">🌿</span>
//               <span className="font-bold text-xl">EcoCred</span>
//             </Link>
            
//             {/* Navigation Links */}
//             <div className="hidden md:flex space-x-6">
//               <Link 
//                 to="/dashboard" 
//                 className="hover:bg-green-700 px-3 py-2 rounded-md transition duration-300"
//               >
//                 Dashboard
//               </Link>
//               <Link 
//                 to="/products" 
//                 className="hover:bg-green-700 px-3 py-2 rounded-md transition duration-300"
//               >
//                 Products
//               </Link>
//               <Link 
//                 to="/secondhand" 
//                 className="hover:bg-green-700 px-3 py-2 rounded-md transition duration-300"
//               >
//                 Secondhand Goods
//               </Link>
//               <Link 
//                 to="/rewards" 
//                 className="hover:bg-green-700 px-3 py-2 rounded-md transition duration-300"
//               >
//                 Rewards
//               </Link>
//               <Link 
//                 to="/cart" 
//                 className="hover:bg-green-700 px-3 py-2 rounded-md transition duration-300"
//               >
//                 Cart
//               </Link>
//             </div>
//           </div>

//           {/* User Section */}
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <div className="hidden sm:flex flex-col text-right">
//                   <span className="font-semibold">{user.name}</span>
                 
//                 </div>
//                 <button 
//                   onClick={handleLogout} 
//                   className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition duration-300 shadow-md"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link 
//                 to="/login" 
//                 className="bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-semibold transition duration-300 shadow-md"
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }



// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/dashboard',   label: 'Dashboard',   icon: '⬡' },
  { to: '/products',    label: 'Products',     icon: '🛍' },
  { to: '/secondhand',  label: 'Secondhand',   icon: '♻️' },
  { to: '/rewards',     label: 'Rewards',      icon: '🏆' },
  { to: '/cart',        label: 'Cart',         icon: '🛒' },
];

export default function Navbar({ user }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        .nav-root {
          background: var(--forest);
          position: sticky; top: 0; z-index: 100;
          border-bottom: 1px solid rgba(181,224,72,.15);
        }
        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 1.25rem;
          display: flex; align-items: center; justify-content: space-between;
          height: 60px;
        }
        /* brand */
        .nav-brand {
          display: flex; align-items: center; gap: .5rem;
          text-decoration: none;
          font-family: var(--font-display);
          font-size: 1.25rem; font-weight: 700;
          color: var(--lime); letter-spacing: -.01em;
          flex-shrink: 0;
        }
        .nav-brand span { font-size: 1.4rem; }

        /* desktop links */
        .nav-links {
          display: flex; align-items: center; gap: .25rem;
          list-style: none;
        }
        .nav-links a {
          display: flex; align-items: center; gap: .35rem;
          padding: .45rem .85rem; border-radius: var(--r-full);
          font-size: .875rem; font-weight: 500;
          color: rgba(255,255,255,.7);
          text-decoration: none;
          transition: all .2s var(--ease);
        }
        .nav-links a:hover,
        .nav-links a.active {
          background: rgba(181,224,72,.15);
          color: var(--lime);
        }
        .nav-links a.active { font-weight: 600; }

        /* right section */
        .nav-right {
          display: flex; align-items: center; gap: .75rem;
        }
        .nav-user {
          display: flex; align-items: center; gap: .5rem;
        }
        .nav-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(181,224,72,.2);
          border: 1.5px solid rgba(181,224,72,.4);
          display: flex; align-items: center; justify-content: center;
          font-size: .8rem; font-weight: 700; color: var(--lime);
          flex-shrink: 0;
        }
        .nav-username {
          font-size: .85rem; font-weight: 600;
          color: var(--white); max-width: 120px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .nav-logout {
          padding: .4rem .9rem; border-radius: var(--r-full);
          background: rgba(224,82,82,.15); border: 1px solid rgba(224,82,82,.3);
          color: #ff9090; font-size: .8rem; font-weight: 600;
          cursor: pointer; transition: all .2s;
        }
        .nav-logout:hover { background: rgba(224,82,82,.3); color: #fff; }

        /* hamburger */
        .nav-burger {
          display: none; flex-direction: column;
          gap: 4px; cursor: pointer; padding: .4rem;
          background: transparent; border: none;
        }
        .nav-burger span {
          display: block; width: 20px; height: 2px;
          background: var(--lime); border-radius: 2px;
          transition: all .25s var(--ease);
        }
        .nav-burger.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
        .nav-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nav-burger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

        /* mobile drawer */
        .nav-drawer {
          display: none;
          position: fixed; inset: 60px 0 0 0; z-index: 99;
          background: var(--forest);
          border-top: 1px solid rgba(181,224,72,.15);
          padding: 1.25rem;
          flex-direction: column; gap: .35rem;
          overflow-y: auto;
          animation: drawerIn .25s var(--ease);
        }
        @keyframes drawerIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-drawer.open { display: flex; }
        .nav-drawer a {
          display: flex; align-items: center; gap: .75rem;
          padding: .85rem 1rem; border-radius: var(--r-lg);
          font-size: .95rem; font-weight: 500;
          color: rgba(255,255,255,.75);
          text-decoration: none; transition: all .2s;
        }
        .nav-drawer a:hover,
        .nav-drawer a.active {
          background: rgba(181,224,72,.12);
          color: var(--lime);
        }
        .nav-drawer-divider {
          border: none; border-top: 1px solid rgba(255,255,255,.08);
          margin: .5rem 0;
        }
        .nav-drawer-user {
          display: flex; align-items: center; gap: .75rem;
          padding: .85rem 1rem;
        }
        .nav-drawer-name { color: var(--white); font-weight: 600; font-size: .95rem; }

        @media (max-width: 768px) {
          .nav-links, .nav-username { display: none; }
          .nav-burger { display: flex; }
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">
          {/* Brand */}
          <Link to="/dashboard" className="nav-brand" onClick={() => setOpen(false)}>
            <span>🌿</span> EcoCred
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={isActive(to) ? 'active' : ''}>{label}</Link>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="nav-right">
            {user ? (
              <div className="nav-user">
                <div className="nav-avatar">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="nav-username">{user.name}</span>
                <button className="nav-logout" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-lime btn-sm">Login</Link>
            )}

            {/* Hamburger */}
            <button
              className={`nav-burger ${open ? 'open' : ''}`}
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer ${open ? 'open' : ''}`}>
        {user && (
          <>
            <div className="nav-drawer-user">
              <div className="nav-avatar">{user.name?.charAt(0).toUpperCase() || 'U'}</div>
              <span className="nav-drawer-name">{user.name}</span>
            </div>
            <hr className="nav-drawer-divider" />
          </>
        )}
        {NAV_LINKS.map(({ to, label, icon }) => (
          <Link
            key={to} to={to}
            className={isActive(to) ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            <span>{icon}</span> {label}
          </Link>
        ))}
        {user && (
          <>
            <hr className="nav-drawer-divider" />
            <button
              onClick={() => { handleLogout(); setOpen(false); }}
              style={{ display:'flex', alignItems:'center', gap:'.75rem',
                padding:'.85rem 1rem', borderRadius:'var(--r-lg)',
                background:'rgba(224,82,82,.12)', border:'none',
                color:'#ff9090', fontSize:'.95rem', fontWeight:600,
                cursor:'pointer', width:'100%' }}
            >
              <span>🚪</span> Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}