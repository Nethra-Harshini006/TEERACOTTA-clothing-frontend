import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import products from '../data/products';
import '../styles/account.css';

const NAV_ITEMS = [
  { id: 'overview',  label: 'Overview',        icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
  { id: 'orders',    label: 'My Orders',        icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2' },
  { id: 'wishlist',  label: 'Wishlist',         icon: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
  { id: 'addresses', label: 'Addresses',        icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' },
  { id: 'payment',   label: 'Payment Methods',  icon: 'M1 4h22v16H1zM1 10h22' },
  { id: 'profile',   label: 'Profile Settings', icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
];

const mockOrders = [
  { id: '#ORD-2025-001', name: 'Floral Wrap Midi Dress', img: products[8].image,  price: 3999,  date: '12 Jan 2025', status: 'delivered' },
  { id: '#ORD-2025-002', name: 'Air Cushion Runner Pro', img: products[16].image, price: 8999,  date: '28 Jan 2025', status: 'shipped' },
  { id: '#ORD-2025-003', name: 'Swiss Automatic Watch',  img: products[32].image, price: 49999, date: '3 Feb 2025',  status: 'processing' },
];

export default function Account() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showWelcome, setShowWelcome] = useState(false);
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName:  user?.lastName  || '',
    email:     user?.email     || '',
    phone:     user?.phone     || '',
    city:      user?.city      || 'Coimbatore',
  });
  const [saved, setSaved] = useState(false);

  // Show welcome message for new sessions
  useEffect(() => {
    const lastLogin = localStorage.getItem(`lastLogin_${user?.id}`);
    const now = Date.now();
    
    if (!lastLogin || (now - parseInt(lastLogin)) > 24 * 60 * 60 * 1000) {
      setShowWelcome(true);
      localStorage.setItem(`lastLogin_${user?.id}`, now.toString());
      setTimeout(() => setShowWelcome(false), 4000);
    }
  }, [user]);

  const fmt = n => `₹${n.toLocaleString('en-IN')}`;

  const handleLogout = () => { logout(); navigate('/login'); };

  const handleSaveProfile = () => {
    updateProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (!user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '40px 20px' }}>
        <div style={{ fontSize: '3.5rem' }}>🔐</div>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800 }}>Please sign in</h2>
        <p style={{ color: 'var(--text-light)', textAlign: 'center' }}>You need to be logged in to view your account.</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <Link to="/login" className="btn-pink">Sign In</Link>
          <Link to="/signup" className="btn-outline-pink">Create Account</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      {/* Welcome Toast */}
      {showWelcome && (
        <div className="welcome-toast">
          <div className="welcome-content">
            <span className="welcome-icon">👋</span>
            <div>
              <h4>Welcome back, {user.firstName}!</h4>
              <p>Ready to explore the latest fashion trends?</p>
            </div>
            <button onClick={() => setShowWelcome(false)} className="welcome-close">×</button>
          </div>
        </div>
      )}
      
      <div className="account-header">
        <div className="container">
          <div className="account-header-inner">
            <div className="account-avatar">
              {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="account-header-name">{user.firstName} {user.lastName}</div>
              <div className="account-header-email">{user.email}</div>
              <div className="account-header-badge">⭐ Premium Member</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="account-layout">
          <aside className="account-sidebar">
            <ul className="account-nav">
              {NAV_ITEMS.map(item => (
                <li key={item.id}>
                  <button
                    className={activeTab === item.id ? 'active' : ''}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d={item.icon} />
                    </svg>
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="account-nav-divider" />
              <li>
                <button
                  onClick={handleLogout}
                  style={{ display:'flex', alignItems:'center', gap:12, padding:'15px 20px', fontSize:'0.88rem', fontWeight:500, color:'#e63946', borderLeft:'3px solid transparent', width:'100%', background:'none', cursor:'pointer', fontFamily:'var(--font-body)', transition:'var(--transition-fast)' }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                  </svg>
                  Sign Out
                </button>
              </li>
            </ul>
          </aside>

          <div className="account-content">

            {activeTab === 'overview' && (
              <>
                <div className="account-card">
                  <div className="account-card-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    Account Overview
                  </div>
                  <div className="account-stats">
                    <div className="account-stat">
                      <div className="account-stat-num">3</div>
                      <div className="account-stat-label">Total Orders</div>
                    </div>
                    <div className="account-stat">
                      <div className="account-stat-num">0</div>
                      <div className="account-stat-label">Wishlist Items</div>
                    </div>
                    <div className="account-stat">
                      <div className="account-stat-num">₹62K</div>
                      <div className="account-stat-label">Total Spent</div>
                    </div>
                  </div>
                </div>
                <div className="account-card">
                  <div className="account-card-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/></svg>
                    Recent Orders
                  </div>
                  {mockOrders.map(order => (
                    <div key={order.id} className="order-item">
                      <img src={order.img} alt={order.name} className="order-img" />
                      <div className="order-info">
                        <div className="order-name">{order.name}</div>
                        <div className="order-meta">{order.id} · {order.date}</div>
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
                        <div className="order-price">{fmt(order.price)}</div>
                        <span className={`order-status ${order.status}`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {activeTab === 'orders' && (
              <div className="account-card">
                <div className="account-card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/></svg>
                  All Orders
                </div>
                {mockOrders.map(order => (
                  <div key={order.id} className="order-item">
                    <img src={order.img} alt={order.name} className="order-img" />
                    <div className="order-info">
                      <div className="order-name">{order.name}</div>
                      <div className="order-meta">{order.id} · {order.date}</div>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:6 }}>
                      <div className="order-price">{fmt(order.price)}</div>
                      <span className={`order-status ${order.status}`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="account-card">
                <div className="account-card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                  Saved Items
                </div>
                <p style={{ color:'var(--text-light)', fontSize:'0.9rem' }}>
                  View your full wishlist on the{' '}
                  <Link to="/wishlist" style={{ color:'var(--pink)', fontWeight:600 }}>Wishlist page</Link>.
                </p>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="account-card">
                <div className="account-card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  Saved Addresses
                </div>
                <div style={{ background:'var(--pink-bg)', borderRadius:12, padding:'20px', border:'1.5px dashed var(--border)' }}>
                  <p style={{ fontWeight:600, marginBottom:4 }}>Home</p>
                  <p style={{ fontSize:'0.88rem', color:'var(--text-mid)', lineHeight:1.6 }}>
                    42, Avinashi Road, RS Puram,<br />Coimbatore, Tamil Nadu — 641002
                  </p>
                  <span style={{ display:'inline-block', marginTop:10, fontSize:'0.7rem', background:'var(--pink)', color:'#fff', padding:'3px 10px', borderRadius:50 }}>Default</span>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="account-card">
                <div className="account-card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  Payment Methods
                </div>
                <div style={{ background:'var(--pink-bg)', borderRadius:12, padding:'20px', border:'1.5px dashed var(--border)', display:'flex', alignItems:'center', gap:16 }}>
                  <div style={{ width:48, height:32, background:'#1a1f71', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'0.65rem', fontWeight:800, letterSpacing:1 }}>VISA</div>
                  <div>
                    <p style={{ fontWeight:600, fontSize:'0.9rem' }}>•••• •••• •••• 4242</p>
                    <p style={{ fontSize:'0.78rem', color:'var(--text-light)' }}>Expires 12/27</p>
                  </div>
                  <span style={{ marginLeft:'auto', fontSize:'0.7rem', background:'var(--pink)', color:'#fff', padding:'3px 10px', borderRadius:50 }}>Default</span>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="account-card">
                <div className="account-card-title">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Profile Settings
                </div>
                {saved && (
                  <div style={{ background:'#e8f5e9', border:'1px solid #a5d6a7', color:'#2e7d32', padding:'10px 14px', borderRadius:10, fontSize:'0.82rem', fontWeight:600, marginBottom:16, animation:'fadeInUp 0.3s ease' }}>
                    ✓ Profile saved successfully!
                  </div>
                )}
                <div className="profile-grid">
                  {[
                    { label:'First Name',    key:'firstName', placeholder:'Priya' },
                    { label:'Last Name',     key:'lastName',  placeholder:'Sharma' },
                    { label:'Email Address', key:'email',     placeholder:'you@example.com' },
                    { label:'Phone Number',  key:'phone',     placeholder:'+91 98765 43210' },
                    { label:'City',          key:'city',      placeholder:'Coimbatore' },
                  ].map(f => (
                    <div key={f.key} className="profile-field" style={f.key === 'email' ? { gridColumn:'1/-1' } : {}}>
                      <label>{f.label}</label>
                      <input
                        type="text"
                        value={profile[f.key] || ''}
                        placeholder={f.placeholder}
                        onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
                <button className="profile-save-btn" style={{ marginTop:20 }} onClick={handleSaveProfile}>
                  Save Changes
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
