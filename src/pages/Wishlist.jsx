import { Link } from 'react-router-dom';
import products from '../data/products';
import '../styles/wishlist.css';

export default function Wishlist({ wishlist, onToggleWishlist, onAddToCart }) {
  const fmt = n => `₹${n.toLocaleString('en-IN')}`;

  // Recommend products not already in wishlist
  const recommended = products
    .filter(p => !wishlist.some(w => w.id === p.id))
    .slice(0, 4);

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-page-header">
          <div className="container">
            <div className="wishlist-header-inner">
              <div>
                <span className="section-eyebrow">My Account</span>
                <h1 className="wishlist-page-title">Wishlist</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="wishlist-empty-state">
            <div className="wishlist-empty-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h2>Your wishlist is empty</h2>
            <p>Save the pieces you love by tapping the heart icon on any product.</p>
            <Link to="/shop" className="btn-pink">Explore Collections</Link>
          </div>

          {/* Recommendations even when empty */}
          <div className="wishlist-recommend-section">
            <div className="wishlist-recommend-header">
              <span className="section-eyebrow">You Might Love</span>
              <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Trending <span>Picks</span></h2>
            </div>
            <div className="wishlist-recommend-grid">
              {recommended.map(p => (
                <WishlistRecommendCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={false}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      {/* Header */}
      <div className="wishlist-page-header">
        <div className="container">
          <div className="wishlist-header-inner">
            <div>
              <span className="section-eyebrow">My Account</span>
              <h1 className="wishlist-page-title">Wishlist</h1>
              <p className="wishlist-page-sub">{wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="wishlist-header-actions">
              <button
                className="wishlist-add-all-btn"
                onClick={() => wishlist.forEach(item => onAddToCart(item))}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Add All to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Wishlist items — horizontal list */}
        <div className="wishlist-list">
          {wishlist.map((item, idx) => {
            const discount = item.originalPrice
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : null;

            return (
              <div key={item.id} className="wishlist-item" style={{ animationDelay: `${idx * 0.06}s` }}>
                {/* Image */}
                <Link to="/shop" className="wishlist-item-img">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  {discount && <span className="wishlist-item-discount">-{discount}%</span>}
                </Link>

                {/* Details */}
                <div className="wishlist-item-details">
                  <span className="wishlist-item-cat">{item.category}</span>
                  <h3 className="wishlist-item-name">{item.name}</h3>
                  <p className="wishlist-item-desc">{item.description}</p>

                  {/* Stars */}
                  <div className="wishlist-item-rating">
                    <div className="wishlist-stars">
                      {[1,2,3,4,5].map(i => (
                        <span key={i} style={{ color: i <= Math.floor(item.rating) ? '#f59e0b' : '#ddd', fontSize: '0.78rem' }}>★</span>
                      ))}
                    </div>
                    <span className="wishlist-rating-val">({item.rating})</span>
                  </div>
                </div>

                {/* Price + actions */}
                <div className="wishlist-item-right">
                  <div className="wishlist-item-price-wrap">
                    <span className="wishlist-item-price">{fmt(item.price)}</span>
                    {item.originalPrice && (
                      <span className="wishlist-item-original">{fmt(item.originalPrice)}</span>
                    )}
                    {discount && (
                      <span className="wishlist-item-save">Save {fmt(item.originalPrice - item.price)}</span>
                    )}
                  </div>

                  <div className="wishlist-item-actions">
                    <button
                      className="wishlist-cart-btn"
                      onClick={() => { onAddToCart(item); onToggleWishlist(item); }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                      Move to Cart
                    </button>
                    <button
                      className="wishlist-keep-btn"
                      onClick={() => onAddToCart(item)}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <button
                    className="wishlist-remove-btn"
                    onClick={() => onToggleWishlist(item)}
                    title="Remove from wishlist"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary bar */}
        <div className="wishlist-summary">
          <div className="wishlist-summary-info">
            <span className="wishlist-summary-label">Total Wishlist Value</span>
            <span className="wishlist-summary-total">
              {fmt(wishlist.reduce((s, i) => s + i.price, 0))}
            </span>
            {wishlist.some(i => i.originalPrice) && (
              <span className="wishlist-summary-savings">
                You save {fmt(wishlist.reduce((s, i) => s + (i.originalPrice ? i.originalPrice - i.price : 0), 0))} total
              </span>
            )}
          </div>
          <button
            className="wishlist-checkout-all"
            onClick={() => wishlist.forEach(item => onAddToCart(item))}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Add All to Cart
          </button>
        </div>

        {/* Recommendations */}
        {recommended.length > 0 && (
          <div className="wishlist-recommend-section">
            <div className="wishlist-recommend-header">
              <span className="section-eyebrow">You Might Also Like</span>
              <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Recommended <span>For You</span></h2>
            </div>
            <div className="wishlist-recommend-grid">
              {recommended.map(p => (
                <WishlistRecommendCard
                  key={p.id}
                  product={p}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.some(w => w.id === p.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Small recommend card */
function WishlistRecommendCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  const fmt = n => `₹${n.toLocaleString('en-IN')}`;
  return (
    <div className="wl-rec-card">
      <div className="wl-rec-img">
        <img src={product.image} alt={product.name} loading="lazy" />
        <button
          className={`wl-rec-heart${isWishlisted ? ' active' : ''}`}
          onClick={() => onToggleWishlist(product)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div className="wl-rec-body">
        <span className="wl-rec-cat">{product.category}</span>
        <p className="wl-rec-name">{product.name}</p>
        <div className="wl-rec-footer">
          <span className="wl-rec-price">{fmt(product.price)}</span>
          <button className="wl-rec-add" onClick={() => onAddToCart(product)}>+ Cart</button>
        </div>
      </div>
    </div>
  );
}
