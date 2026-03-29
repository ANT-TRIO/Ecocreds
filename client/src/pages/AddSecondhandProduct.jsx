// src/pages/AddSecondhandProduct.jsx
// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import api from '../utils/api';
// import { useNavigate } from 'react-router-dom';

// export default function AddSecondhandProduct() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     description: '',
//     image: '',
//     expiryDate: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState(null);

//   React.useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const res = await api.get('/auth/me');
//       setUserData(res.data);
//     } catch (error) {
//       console.error('Failed to fetch user data');
//     }
//   };

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // For now, we'll use a placeholder. In production, you'd upload to Cloudinary or similar service
//     setLoading(true);
//     try {
//       // Simulate upload delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Create a mock URL for the image (in real app, this would be the actual uploaded image URL)
//       const mockImageUrl = `https://via.placeholder.com/400x300/10B981/FFFFFF?text=${encodeURIComponent(form.name || 'Product')}`;
      
//       setForm(prev => ({
//         ...prev,
//         image: mockImageUrl
//       }));
      
//       alert('Image uploaded successfully! (This is a demo - in production, images would be uploaded to cloud storage)');
//     } catch (error) {
//       alert('Failed to upload image');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!form.name || !form.description || !form.image || !form.expiryDate) {
//       alert('Please fill in all fields');
//       return;
//     }

//     if (new Date(form.expiryDate) <= new Date()) {
//       alert('Expiry date must be in the future');
//       return;
//     }

//     setLoading(true);
//     try {
//       await api.post('/secondhand/add-product', form);
//       alert('Product added successfully!');
//       navigate('/secondhand');
//     } catch (error) {
//       alert('Failed to add product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getTomorrowDate = () => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     return tomorrow.toISOString().split('T')[0];
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
//       <Navbar user={userData?.user} />
      
//       <div className="max-w-2xl mx-auto p-6">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-green-100">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Goods</h1>
//           <p className="text-gray-600">
//             List your unused goods and earn <strong>10 EcoCred points</strong> when someone buys them!
//           </p>
//         </div>

//         {/* Form */}
//         <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Product Image */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Image *
//               </label>
//               <div className="flex items-center space-x-4">
//                 <div className="flex-1">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
//                   />
//                 </div>
//                 {form.image && (
//                   <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
//                     <img 
//                       src={form.image} 
//                       alt="Preview" 
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 )}
//               </div>
//               <p className="text-xs text-gray-500 mt-1">
//                 Upload a clear photo of your product
//               </p>
//             </div>

//             {/* Product Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="e.g., Organic Pasta, Canned Beans, etc."
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description *
//               </label>
//               <textarea
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Describe the product, condition, and why you're selling it..."
//                 rows="4"
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
//                 required
//               />
//             </div>

//             {/* Expiry Date */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Expiry Date *
//               </label>
//               <input
//                 type="date"
//                 name="expiryDate"
//                 value={form.expiryDate}
//                 onChange={handleChange}
//                 min={getTomorrowDate()}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300"
//                 required
//               />
//               <p className="text-xs text-gray-500 mt-1">
//                 Products automatically expire after this date
//               </p>
//             </div>

//             {/* Submit Button */}
//             <div className="flex space-x-4 pt-4">
//               <button
//                 type="button"
//                 onClick={() => navigate('/secondhand')}
//                 className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:bg-green-400"
//               >
//                 {loading ? 'Adding Product...' : 'Add Product'}
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Info Card */}
//         <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mt-8">
//           <h3 className="text-lg font-bold text-green-800 mb-3">🎯 Tips for Success</h3>
//           <ul className="text-green-700 space-y-2 text-sm">
//             <li>• <strong>Clear Photos:</strong> Take well-lit photos showing the product clearly</li>
//             <li>• <strong>Honest Descriptions:</strong> Mention any imperfections or special features</li>
//             <li>• <strong>Reasonable Expiry:</strong> Set expiry dates that give buyers enough time to use the product</li>
//             <li>• <strong>Eco-Friendly:</strong> You're helping reduce waste and earn EcoCred points!</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/AddSecondhandProduct.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const tomorrow = () => {
  const d = new Date(); d.setDate(d.getDate()+1);
  return d.toISOString().split('T')[0];
};

export default function AddSecondhandProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', description:'', image:'', expiryDate:'' });
  const [loading,  setLoading]  = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [err,      setErr]      = useState('');
  const [success,  setSuccess]  = useState(false);

  React.useEffect(() => {
    api.get('/auth/me').then(r=>setUserData(r.data)).catch(()=>{});
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = async e => {
    const file = e.target.files[0]; if (!file) return;
    setImgLoading(true);
    try {
      await new Promise(r => setTimeout(r, 900));
      const url = `https://via.placeholder.com/400x300/2d5a3d/b5e048?text=${encodeURIComponent(form.name||'Product')}`;
      setForm(prev => ({ ...prev, image: url }));
    } catch { setErr('Image upload failed.'); }
    finally { setImgLoading(false); }
  };

  const handleSubmit = async e => {
    e.preventDefault(); setErr('');
    if (!form.name||!form.description||!form.image||!form.expiryDate) {
      setErr('Please complete all fields.'); return;
    }
    if (new Date(form.expiryDate) <= new Date()) {
      setErr('Expiry date must be in the future.'); return;
    }
    setLoading(true);
    try {
      await api.post('/secondhand/add-product', form);
      setSuccess(true);
      setTimeout(() => navigate('/secondhand'), 1400);
    } catch { setErr('Failed to add product. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="add-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --forest:#1a3a2a;--moss:#2d5a3d;--moss-light:#3d7a52;
          --lime:#b5e048;--lime-pale:#e8f5d8;--cream:#f5f0e8;
          --cream-dk:#ede8de;--stone:#8a8a7a;--stone-lt:#b0b0a0;
          --white:#fff;--red:#e05252;--red-pale:#fdf0f0;
          --font-display:'Fraunces',serif;--font-body:'DM Sans',system-ui,sans-serif;
          --shadow:0 2px 12px rgba(26,58,42,.08);--shadow-lg:0 8px 32px rgba(26,58,42,.12);
        }
        body{font-family:var(--font-body);background:var(--cream);}
        .add-page{min-height:100vh;background:var(--cream);}
        .shell{max-width:680px;margin:0 auto;padding:2rem 1.25rem 5rem;}

        /* page title */
        .page-hd{
          display:flex;align-items:center;gap:.85rem;margin-bottom:1.75rem;
        }
        .page-hd__back{
          width:36px;height:36px;border-radius:50%;
          background:var(--white);border:1.5px solid var(--cream-dk);
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;font-size:1rem;color:var(--stone);
          text-decoration:none;transition:all .15s;flex-shrink:0;
        }
        .page-hd__back:hover{border-color:var(--moss);color:var(--forest);}
        .page-hd__title{
          font-family:var(--font-display);font-size:1.6rem;font-weight:700;
          color:var(--forest);
        }
        .page-hd__sub{font-size:.875rem;color:var(--stone);}

        /* card */
        .form-card{
          background:var(--white);border:1.5px solid var(--cream-dk);
          border-radius:1.35rem;padding:2rem;
          box-shadow:var(--shadow);margin-bottom:1.25rem;
        }

        /* error */
        .form-err{
          background:var(--red-pale);border:1px solid rgba(224,82,82,.3);
          color:var(--red);border-radius:.65rem;padding:.75rem 1rem;
          font-size:.875rem;margin-bottom:1.25rem;display:flex;align-items:center;gap:.5rem;
        }

        /* image upload */
        .img-drop{
          border:2px dashed var(--cream-dkr, #ddd8ce);border-radius:.85rem;
          background:var(--cream);padding:2rem 1rem;text-align:center;
          cursor:pointer;transition:border-color .2s,background .2s;position:relative;
          overflow:hidden;
        }
        .img-drop:hover,.img-drop:focus-within{border-color:var(--moss);background:#f0efe8;}
        .img-drop input[type=file]{
          position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;
        }
        .img-drop__icon{font-size:2rem;margin-bottom:.5rem;}
        .img-drop__label{font-size:.875rem;font-weight:600;color:var(--forest);margin-bottom:.2rem;}
        .img-drop__hint{font-size:.78rem;color:var(--stone-lt);}
        .img-preview{
          width:100%;height:200px;border-radius:.75rem;overflow:hidden;
          position:relative;background:var(--cream);
        }
        .img-preview img{width:100%;height:100%;object-fit:cover;}
        .img-preview__badge{
          position:absolute;top:.5rem;right:.5rem;
          background:rgba(26,58,42,.85);color:var(--lime);
          font-size:.7rem;font-weight:700;padding:.25rem .6rem;
          border-radius:9999px;
        }
        .img-loading{
          height:200px;border-radius:.75rem;background:var(--cream);
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          gap:.5rem;color:var(--stone);font-size:.875rem;
        }
        .img-spinner{
          width:24px;height:24px;border-radius:50%;
          border:2.5px solid var(--lime-pale);border-top-color:var(--moss);
          animation:sp .8s linear infinite;
        }
        @keyframes sp{to{transform:rotate(360deg)}}

        /* fields */
        .field{margin-bottom:1.1rem;}
        .field:last-child{margin-bottom:0;}
        .field label{
          display:flex;align-items:center;justify-content:space-between;
          font-size:.8rem;font-weight:600;text-transform:uppercase;
          letter-spacing:.06em;color:var(--stone);margin-bottom:.4rem;
        }
        .field label em{font-style:normal;color:var(--red);font-size:.85em;}
        .form-input{
          width:100%;padding:.78rem 1rem;
          border:1.5px solid var(--cream-dk);border-radius:.75rem;
          font-family:var(--font-body);font-size:.95rem;color:var(--forest);
          background:var(--cream);outline:none;
          transition:border-color .2s,background .2s;resize:vertical;
        }
        .form-input:focus{border-color:var(--moss);background:var(--white);}
        .form-input::placeholder{color:var(--stone-lt);}
        .char-count{font-size:.73rem;color:var(--stone-lt);font-style:normal;font-weight:400;}

        /* section title */
        .section-hd{
          font-family:var(--font-display);font-size:1rem;font-weight:700;
          color:var(--forest);margin-bottom:1rem;
          padding-bottom:.5rem;border-bottom:1.5px solid var(--cream-dk);
        }

        /* btn row */
        .btn-row{display:flex;gap:.65rem;margin-top:1.5rem;}
        .btn-cancel{
          padding:.8rem 1.25rem;border-radius:.85rem;
          background:transparent;color:var(--stone);
          border:1.5px solid var(--cream-dk);
          font-family:var(--font-body);font-size:.9rem;font-weight:600;
          cursor:pointer;transition:all .15s;
        }
        .btn-cancel:hover{background:var(--cream);color:var(--forest);}
        .btn-submit{
          flex:1;padding:.8rem;border-radius:.85rem;
          background:var(--forest);color:var(--lime);
          font-family:var(--font-body);font-size:.9rem;font-weight:700;
          border:none;cursor:pointer;
          display:flex;align-items:center;justify-content:center;gap:.45rem;
          transition:background .2s,transform .15s;
        }
        .btn-submit:hover:not(:disabled){background:var(--moss);transform:translateY(-1px);}
        .btn-submit:disabled{opacity:.6;cursor:not-allowed;}
        .btn-spinner{
          width:13px;height:13px;border-radius:50%;
          border:2px solid var(--lime);border-top-color:transparent;
          animation:sp .7s linear infinite;
        }

        /* success */
        .success-card{
          background:var(--white);border:1.5px solid var(--lime);
          border-radius:1.35rem;padding:3rem 2rem;text-align:center;
          box-shadow:var(--shadow);animation:fadeIn .4s ease;
        }
        @keyframes fadeIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
        .success-card__icon{font-size:3.5rem;margin-bottom:1rem;}
        .success-card__title{
          font-family:var(--font-display);font-size:1.5rem;font-weight:700;
          color:var(--forest);margin-bottom:.5rem;
        }
        .success-card__sub{font-size:.9rem;color:var(--stone);}

        /* tips */
        .tips-card{
          background:var(--lime-pale);border:1.5px solid #c5e875;
          border-radius:1rem;padding:1.25rem 1.5rem;
        }
        .tips-card__title{
          font-family:var(--font-display);font-size:.95rem;font-weight:700;
          color:var(--forest);margin-bottom:.75rem;
        }
        .tips-list{display:flex;flex-direction:column;gap:.5rem;}
        .tip{display:flex;align-items:flex-start;gap:.6rem;font-size:.82rem;color:var(--moss);}
        .tip span{font-size:.95rem;flex-shrink:0;margin-top:.05rem;}
      `}</style>

      <Navbar user={userData?.user}/>

      <div className="shell">
        <div className="page-hd">
          <a href="/secondhand" className="page-hd__back">←</a>
          <div>
            <h1 className="page-hd__title">List a Product</h1>
            <p className="page-hd__sub">Earn 10 EcoCreds when it sells.</p>
          </div>
        </div>

        {success ? (
          <div className="success-card">
            <div className="success-card__icon">🎉</div>
            <h2 className="success-card__title">Product Listed!</h2>
            <p className="success-card__sub">Redirecting to the marketplace…</p>
          </div>
        ) : (
          <>
            <div className="form-card">
              {err && <div className="form-err">⚠ {err}</div>}

              <form onSubmit={handleSubmit}>
                {/* Image */}
                <p className="section-hd">📷 Product Photo</p>
                <div className="field" style={{marginBottom:'1.25rem'}}>
                  {imgLoading ? (
                    <div className="img-loading">
                      <div className="img-spinner"/>
                      <span>Uploading…</span>
                    </div>
                  ) : form.image ? (
                    <div className="img-preview">
                      <img src={form.image} alt="Preview"/>
                      <span className="img-preview__badge">✓ Uploaded</span>
                    </div>
                  ) : (
                    <div className="img-drop">
                      <input type="file" accept="image/*" onChange={handleImageUpload}/>
                      <div className="img-drop__icon">📸</div>
                      <p className="img-drop__label">Click or drag to upload</p>
                      <p className="img-drop__hint">JPG, PNG, WEBP — max 5 MB</p>
                    </div>
                  )}
                  {form.image && (
                    <button type="button"
                      onClick={() => setForm(f=>({...f,image:''}))}
                      style={{
                        marginTop:'.5rem',background:'none',border:'none',
                        cursor:'pointer',fontSize:'.78rem',color:'var(--red)',fontWeight:600
                      }}>
                      ✕ Remove photo
                    </button>
                  )}
                </div>

                {/* Details */}
                <p className="section-hd">📝 Details</p>
                <div className="field">
                  <label>Product Name <em>*</em></label>
                  <input className="form-input" name="name" value={form.name}
                    onChange={handleChange} placeholder="e.g. Organic Cotton Tote Bag" required/>
                </div>
                <div className="field">
                  <label>
                    <span>Description <em>*</em></span>
                    <span className="char-count">{form.description.length}/300</span>
                  </label>
                  <textarea className="form-input" name="description" value={form.description}
                    onChange={handleChange} rows={4} maxLength={300}
                    placeholder="Describe the product, its condition, and why you're selling it…" required/>
                </div>
                <div className="field">
                  <label>Listing Expiry Date <em>*</em></label>
                  <input className="form-input" name="expiryDate" type="date"
                    value={form.expiryDate} onChange={handleChange}
                    min={tomorrow()} required/>
                  <p style={{fontSize:'.75rem',color:'var(--stone-lt)',marginTop:'.35rem'}}>
                    Your listing disappears automatically after this date.
                  </p>
                </div>

                <div className="btn-row">
                  <button type="button" className="btn-cancel" onClick={()=>navigate('/secondhand')}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit" disabled={loading||imgLoading}>
                    {loading
                      ? <><span className="btn-spinner"/> Publishing…</>
                      : '🌿 Publish Listing'}
                  </button>
                </div>
              </form>
            </div>

            <div className="tips-card">
              <p className="tips-card__title">🎯 Tips for a great listing</p>
              <div className="tips-list">
                {[
                  ['📸','Use a well-lit photo on a clean background.'],
                  ['✍️','Write an honest description — mention any wear or special features.'],
                  ['📅','Set a generous expiry date so buyers have time to find your listing.'],
                  ['🌍','Every secondhand sale keeps items out of landfill.'],
                ].map(([icon, text]) => (
                  <div key={text} className="tip"><span>{icon}</span>{text}</div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}