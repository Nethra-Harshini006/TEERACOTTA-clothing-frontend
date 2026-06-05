import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { subscriptionsAPI } from '../services/api';
import { getRecipientEmail } from '../utils/userEmail';
import '../styles/footer.css';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'New Arrivals', to: '/shop?cat=new' },
  { label: 'Men', to: '/shop?cat=Men' },
  { label: 'Women', to: '/shop?cat=Women' },
  { label: 'Luxury', to: '/shop?cat=Luxury' },
];

const helpLinks = [
  { label: 'Track My Order', to: '/account', category: 'help' },
  { label: 'Returns & Exchanges', to: '/faq', category: 'help' },
  { label: 'Shipping Policy', to: '/faq', category: 'help' },
  { label: 'Size Guide', to: '/faq', category: 'help' },
  { label: 'FAQ', to: '/faq', category: 'help' },
  { label: 'Contact Us', to: '/contact', category: 'help' },
];

const companyLinks = [
  { label: 'About TERRACOTTA', to: '/about' },
  { label: 'Careers', to: '/contact' },
  { label: 'Press & Media', to: '/contact' },
  { label: 'Sustainability', to: '/about' },
  { label: 'Affiliates', to: '/contact' },
  { label: 'Gift Cards', to: '/shop' },
];

export default function Footer() {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [subscribed, setSubscribed] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  // Scroll to top whenever location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleSubscribe = async () => {
    const subscriberEmail = getRecipientEmail(user, email);
    if (!subscriberEmail) return;
    try {
      await subscriptionsAPI.subscribe(subscriberEmail);
      setSubscribed(true);
      if (!user) setEmail('');
    } catch (err) {
      console.error('Subscribe failed:', err.message);
    }
  };

  return (
    <footer className="footer">
      {/* Top strip */}
      <div className="footer-top-strip">
        <div className="container footer-strip-inner">
          <span className="footer-strip-text">🎉 Free shipping on orders above ₹999 — Use code TERRA20 for 20% off</span>
          <div className="footer-strip-icons">
            <span className="footer-strip-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              Free Delivery
            </span>
            <span className="footer-strip-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Easy Returns
            </span>
            <span className="footer-strip-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Secure Payments
            </span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div className="footer-brand-logo">TERRA<span>COTTA</span></div>
              <p className="footer-brand-desc">
                Premium fashion for the modern individual. Curated collections that define elegance, style, and confidence.
              </p>

              <div className="footer-contact">
                <a href="https://maps.google.com/?q=42+Avinashi+Road+RS+Puram+Coimbatore" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Terracotta, Kovaipudur<br />Coimbatore, Tamilnadu-641 042</span>
                </a>
                <a href="tel:+918668068485" className="footer-contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                  <span>+91 86680 68485</span>
                </a>
                <a href="mailto:nethrasudharsan006@gmail.com" className="footer-contact-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>nethrasudharsan006@gmail.com</span>
                </a>
              </div>

              <div className="footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links">
                {quickLinks.map(l => (
                  <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="footer-col-title">Help & Support</h4>
              <ul className="footer-links">
                {helpLinks.map(l => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}
              </ul>
            </div>

            {/* Newsletter + Company */}
            <div>
              <h4 className="footer-col-title">Stay in Style</h4>
              <p className="footer-newsletter-label">
                Subscribe for exclusive drops, style tips, and early access to sales.
              </p>
              <div className="footer-newsletter-form">
                {subscribed ? (
                  <span className="footer-subscribed">✓ You're subscribed!</span>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                      readOnly={!!user}
                    />
                    <button type="button" onClick={handleSubscribe}>Subscribe</button>
                  </>
                )}
              </div>

              <div style={{ marginTop: 24 }}>
                <h4 className="footer-col-title">Company</h4>
                <ul className="footer-links">
                  {companyLinks.map(l => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container">
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 <span>TERRACOTTA</span>. All rights reserved. Made with ❤️ in Coimbatore.</p>
          <div className="footer-bottom-links">
            <Link to="/about">Privacy Policy</Link>
            <Link to="/about">Terms of Service</Link>
            <Link to="/faq">Cookie Policy</Link>
          </div>
          <div className="footer-payment-icons">
            <span className="payment-icon">VISA</span>
            <span className="payment-icon">MC</span>
            <span className="payment-icon">UPI</span>
            <span className="payment-icon">GPay</span>
            <span className="payment-icon">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
