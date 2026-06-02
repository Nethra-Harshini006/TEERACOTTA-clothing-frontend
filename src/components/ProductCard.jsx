import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/productcard.css';

function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(i => {
        const filled = i <= Math.floor(rating);
        const half = !filled && i === Math.ceil(rating) && rating % 1 >= 0.5;
        return (
          <span key={i} className={`star${filled ? ' filled' : half ? ' half' : ''}`}>★</span>
        );
      })}
    </div>
  );
}

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleWishlist = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking wishlist
    onToggleWishlist && onToggleWishlist(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />

        <div className="product-badge-wrap">
          {product.badge && (
            <span className={`product-badge${product.badge === 'New' ? ' new' : product.badge === 'Sale' ? ' sale' : ''}`}>
              {product.badge}
            </span>
          )}
          {discount && <span className="product-badge sale">-{discount}%</span>}
        </div>

        <button
          className={`product-wishlist-btn${isWishlisted ? ' active' : ''}`}
          onClick={handleWishlist}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        <div className="product-quick-add" onClick={handleAdd}>
          ⚡ Quick Add to Cart
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <p className="product-name">{product.name}</p>

        <div className="product-rating">
          <Stars rating={product.rating} />
          <span className="rating-count">({product.rating})</span>
        </div>

        <div className="product-footer">
          <div className="product-price-wrap">
            <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="product-price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button
            className="add-to-cart-btn"
            onClick={handleAdd}
          >
            {added ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
