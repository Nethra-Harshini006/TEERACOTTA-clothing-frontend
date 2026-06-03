import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../data/products';
import { ProductMainImage, ProductCardImage } from '../components/ProductImage';
import '../styles/productdetail.css';

function Stars({ rating, size = 'normal' }) {
  return (
    <div className={`stars ${size}`}>
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

function ReviewSection({ reviews, rating, productName }) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  // Default reviews if none exist
  const defaultReviews = [
    { id: 1, name: "Verified Customer", rating: 5, comment: "Great quality product! Highly recommend.", date: "2024-01-20", verified: true },
    { id: 2, name: "Happy Buyer", rating: 4, comment: "Good value for money. Fast delivery.", date: "2024-01-18", verified: true }
  ];
  
  const reviewList = reviews && reviews.length > 0 ? reviews : defaultReviews;
  const displayedReviews = showAllReviews ? reviewList : reviewList.slice(0, 3);
  
  const ratingDistribution = {
    5: Math.floor(reviewList.length * 0.6),
    4: Math.floor(reviewList.length * 0.25),
    3: Math.floor(reviewList.length * 0.1),
    2: Math.floor(reviewList.length * 0.03),
    1: Math.floor(reviewList.length * 0.02)
  };

  return (
    <div className="review-section">
      <div className="review-header">
        <h3>Customer Reviews</h3>
        <div className="overall-rating">
          <div className="rating-summary">
            <div className="rating-number">{rating}</div>
            <div className="rating-details">
              <Stars rating={rating} size="large" />
              <p>Based on {reviewList.length} reviews</p>
            </div>
          </div>
          
          <div className="rating-breakdown">
            {[5, 4, 3, 2, 1].map(star => (
              <div key={star} className="rating-bar">
                <span className="star-label">{star}★</span>
                <div className="bar-container">
                  <div 
                    className="bar-fill" 
                    style={{ width: `${(ratingDistribution[star] / reviewList.length) * 100}%` }}
                  ></div>
                </div>
                <span className="count">({ratingDistribution[star]})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reviews-list">
        {displayedReviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header-item">
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  {review.name.charAt(0).toUpperCase()}
                </div>
                <div className="reviewer-details">
                  <h4>{review.name}</h4>
                  {review.verified && <span className="verified-badge">✓ Verified Purchase</span>}
                </div>
              </div>
              <div className="review-meta">
                <Stars rating={review.rating} size="small" />
                <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>

      {reviewList.length > 3 && (
        <button 
          className="show-more-reviews"
          onClick={() => setShowAllReviews(!showAllReviews)}
        >
          {showAllReviews ? 'Show Less Reviews' : `Show All ${reviewList.length} Reviews`}
        </button>
      )}
    </div>
  );
}

export default function ProductDetail({ onAddToCart, onToggleWishlist, wishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="container">
          <div className="product-not-found">
            <h2>Product Not Found</h2>
            <p>The product you're looking for doesn't exist.</p>
            <button onClick={() => navigate('/shop')} className="btn-pink">
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isWishlisted = wishlist?.some(w => w.id === product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const handleAddToCart = () => {
    const productToAdd = { ...product, selectedSize, quantity };
    for (let i = 0; i < quantity; i++) {
      onAddToCart(productToAdd);
    }
  };

  return (
    <div className="product-detail-container">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <button onClick={() => navigate('/')} className="breadcrumb-link">Home</button>
          <span className="breadcrumb-separator">/</span>
          <button onClick={() => navigate('/shop')} className="breadcrumb-link">Shop</button>
          <span className="breadcrumb-separator">/</span>
          <button onClick={() => navigate(`/shop?cat=${product.category}`)} className="breadcrumb-link">
            {product.category}
          </button>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="product-detail-grid">
          <div className="product-image-section">
            <div className="image-gallery">
              <div className="main-image-container">
                <div className="main-image">
                  <ProductMainImage key={product.id} product={product} alt={product.name} />
                </div>
              </div>
            </div>
            {product.badge && (
              <span className={`product-badge ${product.badge.toLowerCase()}`}>
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="product-badge sale">-{discount}%</span>
            )}
          </div>

          <div className="product-info-section">
            <div className="product-category-tag">{product.category}</div>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating-section">
              <Stars rating={product.rating} />
              <span className="rating-text">({product.rating} out of 5)</span>
              <span className="review-count">{product.reviews?.length || 2} reviews</span>
            </div>

            <div className="product-price-section">
              <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="discount-percent">Save {discount}%</span>
                </>
              )}
            </div>

            <div className="product-short-description">
              <p>{product.description}</p>
            </div>

            {/* Size Selection */}
            {(product.category === 'Men' || product.category === 'Women') && (
              <div className="size-selection">
                <h4>Size</h4>
                <div className="size-options">
                  {sizes.map(size => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="quantity-selection">
              <h4>Quantity</h4>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button 
                className="btn-add-to-cart"
                onClick={handleAddToCart}
                disabled={!selectedSize && (product.category === 'Men' || product.category === 'Women')}
              >
                Add to Cart
              </button>
              <button 
                className={`btn-wishlist ${isWishlisted ? 'wishlisted' : ''}`}
                onClick={() => onToggleWishlist(product)}
              >
                {isWishlisted ? '♥' : '♡'}
              </button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <div className="description-content">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                <ul>
                  <li>High-quality materials</li>
                  <li>Comfortable fit</li>
                  <li>Easy care instructions</li>
                  <li>Available in multiple sizes</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewSection 
                reviews={product.reviews} 
                rating={product.rating} 
                productName={product.name}
              />
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h3>Related Products</h3>
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="related-product-card">
                  <ProductCardImage
                    product={relatedProduct}
                    alt={relatedProduct.name}
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                  />
                  <h4>{relatedProduct.name}</h4>
                  <p>₹{relatedProduct.price.toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}