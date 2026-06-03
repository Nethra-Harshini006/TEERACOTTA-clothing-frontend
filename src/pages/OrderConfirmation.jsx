import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import '../styles/order-confirmation.css';

export default function OrderConfirmation() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadOrder = async () => {
      if (location.state?.order) {
        setOrderData(location.state.order);
        setLoading(false);
        return;
      }
      try {
        const { order } = await ordersAPI.latest();
        setOrderData(order);
      } catch {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    loadOrder();
  }, [location.state, navigate]);

  if (loading || !orderData) {
    return (
      <div className="order-confirmation-container">
        <div className="container">
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  const { orderNumber, items, billing, totals, date, createdAt } = orderData;
  const orderDate = new Date(date || createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="order-confirmation-container">
      <div className="container">
        <div className="confirmation-content">
          <div className="success-header">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase. Your order has been saved to your account.</p>
          </div>

          <div className="order-details-section">
            <div className="order-info-grid">
              <div className="order-summary-card">
                <h2>Order Summary</h2>
                <div className="order-meta">
                  <div className="meta-item">
                    <span className="label">Order Number:</span>
                    <span className="value">{orderNumber}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Order Date:</span>
                    <span className="value">{orderDate}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Estimated Delivery:</span>
                    <span className="value">{estimatedDelivery}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Payment Method:</span>
                    <span className="value">
                      {billing.paymentMethod === 'card' && '💳 Credit/Debit Card'}
                      {billing.paymentMethod === 'upi' && '📱 UPI Payment'}
                      {billing.paymentMethod === 'cod' && '💰 Cash on Delivery'}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  <h3>Items Ordered</h3>
                  {items.map(item => (
                    <div key={item.id} className="order-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p className="item-category">{item.category}</p>
                        <div className="item-details">
                          <span>Qty: {item.qty}</span>
                          <span className="item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-totals">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>₹{totals.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping</span>
                    <span>{totals.shipping === 0 ? 'Free' : `₹${totals.shipping}`}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax (GST 18%)</span>
                    <span>₹{totals.tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="total-row final-total">
                    <span>Total Paid</span>
                    <span>₹{totals.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="address-info-card">
                <h2>Delivery Information</h2>
                <div className="address-section">
                  <h3>Shipping Address</h3>
                  <div className="address">
                    <p><strong>{billing.firstName} {billing.lastName}</strong></p>
                    <p>{billing.address}</p>
                    <p>{billing.city}, {billing.state} {billing.pincode}</p>
                    <p>{billing.country}</p>
                    <p>📞 {billing.phone}</p>
                    <p>✉️ {billing.email}</p>
                  </div>
                </div>

                <div className="delivery-timeline">
                  <h3>Delivery Timeline</h3>
                  <div className="timeline">
                    <div className="timeline-item completed">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h4>Order Confirmed</h4>
                        <p>Your order has been placed successfully</p>
                        <span className="timeline-date">Today</span>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h4>Processing</h4>
                        <p>We're preparing your items</p>
                        <span className="timeline-date">1-2 days</span>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h4>Shipped</h4>
                        <p>Your order is on the way</p>
                        <span className="timeline-date">3-5 days</span>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-dot"></div>
                      <div className="timeline-content">
                        <h4>Delivered</h4>
                        <p>Enjoy your new items!</p>
                        <span className="timeline-date">{estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <Link to="/shop" className="btn-outline">Continue Shopping</Link>
            <Link to="/account" className="btn-pink">Track Order</Link>
            <button onClick={() => window.print()} className="btn-outline">Print Receipt</button>
          </div>

          <div className="additional-info">
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">📦</div>
                <h3>Order Saved</h3>
                <p>View this order anytime from your account under My Orders</p>
              </div>
              <div className="info-card">
                <div className="info-icon">📱</div>
                <h3>Track Your Order</h3>
                <p>Check status updates on the account page</p>
              </div>
              <div className="info-card">
                <div className="info-icon">🔄</div>
                <h3>Easy Returns</h3>
                <p>30-day return policy for all items</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
