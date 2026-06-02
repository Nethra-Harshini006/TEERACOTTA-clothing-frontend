import { Link } from 'react-router-dom';
import '../styles/hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />

      <div className="hero-content container">
        <div className="hero-inner">
          <div className="hero-eyebrow">New Collection — SS 2025</div>

          <h1 className="hero-title">
            STYLE<br />
            <span className="thin">THAT</span><br />
            <span className="accent">SPEAKS</span>
          </h1>

          <p className="hero-subtitle">
            Discover premium fashion collections crafted for the bold, the elegant, and the effortlessly modern.
          </p>

          <div className="hero-actions">
            <Link to="/shop" className="btn-pink">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Shop Now
            </Link>
            <Link to="/shop?cat=new" className="hero-btn-outline">
              Explore Collection
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">24K+</div>
              <div className="hero-stat-label">Happy Customers</div>
            </div>
            <div>
              <div className="hero-stat-num">500+</div>
              <div className="hero-stat-label">Premium Styles</div>
            </div>
            <div>
              <div className="hero-stat-num">4.9★</div>
              <div className="hero-stat-label">Avg. Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  );
}
