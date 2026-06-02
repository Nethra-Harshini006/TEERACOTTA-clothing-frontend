import { Link } from 'react-router-dom';
import '../styles/about.css';

const values = [
  { title: 'Sustainable Fashion', desc: 'We source ethically and work with certified sustainable manufacturers to reduce our environmental footprint.' },
  { title: 'Quality First', desc: 'Every piece in our collection is hand-selected for fabric quality, construction, and lasting durability.' },
  { title: 'Community Driven', desc: 'Our community of 24,000+ customers shapes what we stock. Your voice matters to every decision we make.' },
  { title: 'Inclusive Style', desc: 'Fashion is for everyone. We carry sizes XS–4XL and celebrate every body, every style, every identity.' },
];

export default function About() {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80')" }} />
        <div className="about-hero-overlay" />
        <div className="container about-hero-content">
          <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Our Story</span>
          <h1 className="about-hero-title">We Are<br /><span>TERRACOTTA</span></h1>
          <p className="about-hero-sub">Born in Coimbatore. Worn across India. Built on the belief that great style should be accessible, sustainable, and unapologetically you.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section">
        <div className="container about-mission">
          <div className="about-mission-text">
            <span className="section-eyebrow">Our Mission</span>
            <h2 className="section-title">Redefining Premium <span>Fashion</span></h2>
            <p>TERRACOTTA was born from a simple frustration — it was impossible to find fashion that was both premium and honest. No inflated brand taxes. No fast fashion guilt. Just beautiful, well-made clothing at prices that make sense.</p>
            <p>We curate every piece with intention, working directly with artisans and certified factories across India to bring you collections that last more than one season.</p>
            <Link to="/shop" className="btn-pink" style={{ marginTop: 24 }}>Explore Collection</Link>
          </div>
          <div className="about-mission-img">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80" alt="Our Mission" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats-strip">
        <div className="container about-stats-grid">
          {[['24K+', 'Happy Customers'], ['60+', 'Premium Styles'], ['4.9★', 'Avg. Rating'], ['2019', 'Founded']].map(([num, label]) => (
            <div key={label} className="about-stat">
              <div className="about-stat-num">{num}</div>
              <div className="about-stat-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="about-section about-section-alt">
        <div className="container">
          <div className="section-header center" style={{ marginBottom: 48 }}>
            <span className="section-eyebrow">What We Stand For</span>
            <h2 className="section-title">Our <span>Values</span></h2>
          </div>
          <div className="about-values-grid">
            {values.map(v => (
              <div key={v.title} className="about-value-card">
                <div className="about-value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container about-cta-inner">
          <h2 className="about-cta-title">Ready to Find Your Style?</h2>
          <p>Explore 60+ premium pieces curated just for you.</p>
          <div className="about-cta-btns">
            <Link to="/shop" className="btn-pink">Shop Now</Link>
            <Link to="/contact" className="btn-white">Get in Touch</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
