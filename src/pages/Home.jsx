import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import '../styles/home.css';

const categories = [
  { label: 'Men', count: '120+ styles', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', to: '/shop?cat=Men' },
  { label: 'Women', count: '200+ styles', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80', to: '/shop?cat=Women' },
  { label: 'Sneakers', count: '80+ styles', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', to: '/shop?cat=Sneakers' },
  { label: 'Accessories', count: '150+ styles', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', to: '/shop?cat=Accessories' },
  { label: 'Luxury', count: '50+ styles', img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80', to: '/shop?cat=Luxury' },
];

const testimonials = [
  {
    text: "Absolutely love the quality! The satin dress I ordered was exactly as shown — luxurious fabric and perfect fit. Will definitely shop again.",
    name: "Priya Sharma",
    role: "Fashion Blogger, Mumbai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    stars: 5,
  },
  {
    text: "TERRACOTTA has completely changed how I shop online. The curation is impeccable and delivery was super fast to Coimbatore!",
    name: "Arjun Mehta",
    role: "Entrepreneur, Coimbatore",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    stars: 5,
  },
  {
    text: "The luxury watch I bought exceeded all expectations. Packaging was premium and the product is stunning. 10/10 experience.",
    name: "Kavya Nair",
    role: "Interior Designer, Bangalore",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    stars: 5,
  },
];

export default function Home({ onAddToCart, onToggleWishlist, wishlist }) {
  const trending    = products.filter(p => p.badge === 'Trending' || p.badge === 'Bestseller').slice(0, 4);
  const newArrivals = products.filter(p => p.badge === 'New').slice(0, 4);

  return (
    <>
      <Hero />

      {/* ── Categories ── */}
      <section className="home-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-eyebrow">Browse By</span>
            <h2 className="section-title">Shop by <span>Category</span></h2>
            <p className="section-sub">From everyday essentials to luxury statement pieces — find your style.</p>
          </div>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link to={cat.to} key={cat.label} className="category-card">
                <img src={cat.img} alt={cat.label} loading="lazy" />
                <div className="category-overlay">
                  <span className="category-label">{cat.label}</span>
                  <span className="category-count">{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Products ── */}
      <section className="home-section-alt">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="section-eyebrow">What's Hot</span>
              <h2 className="section-title">Trending <span>Now</span></h2>
            </div>
            <Link to="/shop" className="btn-outline-pink">View All</Link>
          </div>
          <div className="products-grid">
            {trending.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist} isWishlisted={wishlist?.some(w => w.id === p.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Promo Banner ── */}
      <section className="home-section">
        <div className="container">
          <div className="promo-banner">
            <div
              className="promo-banner-bg"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80')" }}
            />
            <div className="promo-banner-overlay" />
            <div className="promo-banner-content">
              <span className="promo-banner-tag">Limited Edition</span>
              <h2 className="promo-banner-title">Exclusive Drops.<br />Timeless Pieces.</h2>
              <p className="promo-banner-desc">
                Our limited edition collections are crafted for those who appreciate the finer details. Each piece tells a story of craftsmanship and elegance.
              </p>
              <Link to="/shop?cat=Luxury" className="btn-pink">
                Explore Luxury
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="home-section-alt">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span className="section-eyebrow">Just Dropped</span>
              <h2 className="section-title">New <span>Arrivals</span></h2>
            </div>
            <Link to="/shop?cat=new" className="btn-outline-pink">See All New</Link>
          </div>
          <div className="products-grid">
            {newArrivals.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist} isWishlisted={wishlist?.some(w => w.id === p.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Dual Banners ── */}
      <section className="home-section">
        <div className="container">
          <div className="dual-banners">
            <Link to="/shop?cat=Men" className="dual-banner">
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80" alt="Men's Collection" loading="lazy" />
              <div className="dual-banner-overlay" />
              <div className="dual-banner-content">
                <div className="dual-banner-label">Men's Collection</div>
                <div className="dual-banner-sub">Tailored for the modern man</div>
                <span className="btn-white" style={{ fontSize: '0.75rem', padding: '9px 20px' }}>Shop Men</span>
              </div>
            </Link>
            <Link to="/shop?cat=Women" className="dual-banner">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" alt="Women's Collection" loading="lazy" />
              <div className="dual-banner-overlay" />
              <div className="dual-banner-content">
                <div className="dual-banner-label">Women's Collection</div>
                <div className="dual-banner-sub">Elegance redefined</div>
                <span className="btn-white" style={{ fontSize: '0.75rem', padding: '9px 20px' }}>Shop Women</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header center" style={{ marginBottom: 48 }}>
            <span className="section-eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>What They Say</span>
            <h2 className="section-title" style={{ color: '#fff' }}>Loved by <span>Thousands</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: t.stars }).map((_, j) => <span key={j}>★</span>)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" loading="lazy" />
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-inner">
            <span className="section-eyebrow">Stay Updated</span>
            <h2 className="newsletter-title">Get Exclusive Offers</h2>
            <p className="newsletter-sub">
              Subscribe to our newsletter and be the first to know about new collections, exclusive deals, and style tips.
            </p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address..." />
              <button type="button">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
