import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

export default function Navbar({ cartCount, wishlistCount }) {
  const { user, logout } = useAuth();
  const [open, setOpen]       = useState(false);
  const [search, setSearch]   = useState('');
  const [userMenu, setUserMenu] = useState(false);
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
      close();
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    navigate('/login');
  };

  return (
    <>
      <div className="nav-announcement">
        FREE SHIPPING on orders above ₹999 &nbsp;|&nbsp;
        <span>USE CODE: TERRA20</span> for 20% off your first order
      </div>

      <nav className="navbar">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={close}>
            TERRA<span>COTTA</span>
          </Link>

          {/* Center search */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search for styles, brands, products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </form>

          {/* Right nav */}
          <ul className={`navbar-right${open ? ' open' : ''}`}>
            {/* Mobile search */}
            <li className="mobile-search" style={{ display: 'none' }}>
              <form onSubmit={handleSearch} style={{ display:'flex', width:'100%', alignItems:'center', gap:8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
              </form>
            </li>

            <li><NavLink to="/shop?cat=Men" onClick={close}>Men</NavLink></li>
            <li><NavLink to="/shop?cat=Women" onClick={close}>Women</NavLink></li>
            <li><NavLink to="/shop?cat=new" onClick={close}>New Arrivals</NavLink></li>
            <li><NavLink to="/shop" onClick={close}>Collections</NavLink></li>

            <li className="nav-divider" />

            {/* Wishlist */}
            <li>
              <NavLink to="/wishlist" className="nav-icon-btn" onClick={close} title="Wishlist">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
              </NavLink>
            </li>

            {/* Cart */}
            <li>
              <NavLink to="/cart" className="nav-icon-btn" onClick={close} title="Cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
              </NavLink>
            </li>

            <li className="nav-divider" />

            <li><NavLink to="/about" onClick={close}>About</NavLink></li>
            <li><NavLink to="/faq" onClick={close}>FAQ</NavLink></li>
            <li><NavLink to="/contact" onClick={close}>Contact</NavLink></li>

            {/* Account — logged in vs guest */}
            {user ? (
              <li className="nav-user-wrap">
                <button
                  className="nav-user-btn"
                  onClick={() => setUserMenu(m => !m)}
                  title={`${user.firstName} ${user.lastName}`}
                >
                  <span className="nav-user-avatar">
                    {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                  </span>
                  <span className="nav-user-name">{user.firstName}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </button>
                {userMenu && (
                  <div className="nav-user-dropdown">
                    <div className="nav-user-dropdown-header">
                      <div className="nav-user-dropdown-name">{user.firstName} {user.lastName}</div>
                      <div className="nav-user-dropdown-email">{user.email}</div>
                    </div>
                    <Link to="/account" className="nav-user-dropdown-item" onClick={() => { setUserMenu(false); close(); }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      My Account
                    </Link>
                    <Link to="/wishlist" className="nav-user-dropdown-item" onClick={() => { setUserMenu(false); close(); }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                      Wishlist
                    </Link>
                    <Link to="/cart" className="nav-user-dropdown-item" onClick={() => { setUserMenu(false); close(); }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                      My Cart
                    </Link>
                    <div className="nav-user-dropdown-divider" />
                    <button className="nav-user-dropdown-item nav-user-logout" onClick={handleLogout}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <li className="nav-auth-btns">
                <Link to="/login" className="nav-login-btn" onClick={close}>Sign In</Link>
                <Link to="/signup" className="nav-signup-btn" onClick={close}>Sign Up</Link>
              </li>
            )}
          </ul>

          {/* Hamburger */}
          <button
            className={`hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  );
}
