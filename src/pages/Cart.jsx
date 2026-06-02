import { Link } from 'react-router-dom';
import '../styles/cart.css';

const FREE_SHIPPING_THRESHOLD = 999;

export default function Cart({ cart, onUpdateQty, onRemove }) {
  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal > 0 ? (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99) : 0;
  const total     = subtotal + shipping;
  const progress  = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  const fmt = n => `₹${n.toLocaleString('en-IN')}`;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-page-header">
          <div className="container">
            <h1 className="cart-page-title">Shopping Cart</h1>
          </div>
        </div>
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛍️</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet. Start exploring our collections!</p>
            <Link to="/shop" className="btn-pink">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <div className="container">
          <div className="cart-breadcrumb">
            <Link to="/">Home</Link>
            <span>›</span>
            <Link to="/shop">Shop</Link>
            <span>›</span>
            <span style={{ color: 'var(--text-dark)' }}>Cart</span>
          </div>
          <h1 className="cart-page-title">Shopping Cart</h1>
          <p className="cart-page-sub">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>
      </div>

      <div className="container">
        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items-wrap">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-body">
                  <p className="cart-item-cat">{item.category}</p>
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-unit-price">{fmt(item.price)} per item</p>
                  <div className="qty-row">
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                      <span className="qty-value">{item.qty}</span>
                      <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                    <span className="cart-item-subtotal">{fmt(item.price * item.qty)}</span>
                    <button className="remove-btn" onClick={() => onRemove(item.id)}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="order-summary">
            <h2 className="summary-heading">Order Summary</h2>

            {/* Free shipping bar */}
            <div className="free-shipping-bar">
              {remaining > 0 ? (
                <p className="free-shipping-text">
                  Add <strong>{fmt(remaining)}</strong> more for free shipping!
                </p>
              ) : (
                <p className="free-shipping-text">🎉 You've unlocked <strong>free shipping!</strong></p>
              )}
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="summary-row">
              <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span>{fmt(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? '#2e7d32' : 'inherit' }}>
                {shipping === 0 ? '🎉 Free' : fmt(shipping)}
              </span>
            </div>
            <div className="summary-row">
              <span>Tax (GST 18%)</span>
              <span>{fmt(Math.round(subtotal * 0.18))}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{fmt(total + Math.round(subtotal * 0.18))}</span>
            </div>

            {/* Coupon */}
            <div className="coupon-row">
              <input className="coupon-input" type="text" placeholder="Coupon code" />
              <button className="coupon-btn">Apply</button>
            </div>

            <Link to="/checkout" className="checkout-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Secure Checkout
            </Link>

            <Link to="/shop" className="continue-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Continue Shopping
            </Link>

            <div className="secure-badges">
              <span className="secure-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                SSL Secure
              </span>
              <span className="secure-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Easy Returns
              </span>
              <span className="secure-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                </svg>
                All Cards
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
