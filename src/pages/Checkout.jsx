import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import '../styles/checkout.css';

export default function Checkout({ cart, onClearCart }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Billing Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // UPI
    upiId: '',
    
    // Additional Options
    sameAsBilling: true,
    saveInfo: false,
    newsletter: false
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
      if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    }
    
    if (step === 3) {
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
        if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits';
        if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Format: MM/YY';
        if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
        if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3-4 digits';
        if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      } else if (formData.paymentMethod === 'upi') {
        if (!formData.upiId.trim()) newErrors.upiId = 'UPI ID is required';
        if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) newErrors.upiId = 'Invalid UPI ID format';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsProcessing(true);

    try {
      const { order } = await ordersAPI.create({
        items: cart,
        billing: formData,
        totals: { subtotal, shipping, tax, total },
      });
      await onClearCart();
      navigate('/order-confirmation', { state: { order } });
    } catch (err) {
      setErrors({ submit: err.message });
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add some items to proceed with checkout</p>
            <button onClick={() => navigate('/shop')} className="btn-pink">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <div className="checkout-steps">
            <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Billing</span>
            </div>
            <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Shipping</span>
            </div>
            <div className={`step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Payment</span>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Billing Information */}
              {currentStep === 1 && (
                <div className="checkout-step">
                  <h2>Billing Information</h2>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'error' : ''}
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'error' : ''}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" onClick={nextStep} className="btn-pink">
                      Continue to Shipping
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep === 2 && (
                <div className="checkout-step">
                  <h2>Shipping Address</h2>
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label>Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className={errors.address ? 'error' : ''}
                        placeholder="House number, street name, area"
                      />
                      {errors.address && <span className="error-text">{errors.address}</span>}
                    </div>
                    <div className="form-group">
                      <label>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? 'error' : ''}
                      />
                      {errors.city && <span className="error-text">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={errors.state ? 'error' : ''}
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                      {errors.state && <span className="error-text">{errors.state}</span>}
                    </div>
                    <div className="form-group">
                      <label>Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={errors.pincode ? 'error' : ''}
                        placeholder="6-digit pincode"
                      />
                      {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" onClick={prevStep} className="btn-outline">
                      Back to Billing
                    </button>
                    <button type="button" onClick={nextStep} className="btn-pink">
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="checkout-step">
                  <h2>Payment Method</h2>
                  
                  <div className="payment-methods">
                    <label className="payment-method">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                      />
                      <span className="payment-method-label">
                        <span className="payment-icon">💳</span>
                        Credit/Debit Card
                      </span>
                    </label>
                    
                    <label className="payment-method">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                      />
                      <span className="payment-method-label">
                        <span className="payment-icon">📱</span>
                        UPI Payment
                      </span>
                    </label>
                    
                    <label className="payment-method">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                      />
                      <span className="payment-method-label">
                        <span className="payment-icon">💰</span>
                        Cash on Delivery
                      </span>
                    </label>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="payment-details">
                      <div className="form-grid">
                        <div className="form-group full-width">
                          <label>Card Number *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => {
                              const formatted = formatCardNumber(e.target.value);
                              if (formatted.replace(/\s/g, '').length <= 16) {
                                handleInputChange({ target: { name: 'cardNumber', value: formatted } });
                              }
                            }}
                            className={errors.cardNumber ? 'error' : ''}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                          />
                          {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                        </div>
                        <div className="form-group">
                          <label>Expiry Date *</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) => {
                              const formatted = formatExpiryDate(e.target.value);
                              if (formatted.length <= 5) {
                                handleInputChange({ target: { name: 'expiryDate', value: formatted } });
                              }
                            }}
                            className={errors.expiryDate ? 'error' : ''}
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                          {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                        </div>
                        <div className="form-group">
                          <label>CVV *</label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={(e) => {
                              if (/^\d{0,4}$/.test(e.target.value)) {
                                handleInputChange(e);
                              }
                            }}
                            className={errors.cvv ? 'error' : ''}
                            placeholder="123"
                            maxLength="4"
                          />
                          {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                        </div>
                        <div className="form-group full-width">
                          <label>Cardholder Name *</label>
                          <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            className={errors.cardName ? 'error' : ''}
                            placeholder="Name as on card"
                          />
                          {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'upi' && (
                    <div className="payment-details">
                      <div className="form-group">
                        <label>UPI ID *</label>
                        <input
                          type="text"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          className={errors.upiId ? 'error' : ''}
                          placeholder="yourname@paytm"
                        />
                        {errors.upiId && <span className="error-text">{errors.upiId}</span>}
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'cod' && (
                    <div className="payment-details">
                      <div className="cod-info">
                        <p>💰 Pay when your order is delivered</p>
                        <p>Additional ₹50 COD charges may apply</p>
                      </div>
                    </div>
                  )}

                  <div className="form-actions">
                    <button type="button" onClick={prevStep} className="btn-outline">
                      Back to Shipping
                    </button>
                    <button 
                      type="submit" 
                      className="btn-pink"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Place Order - ₹${total.toLocaleString('en-IN')}`}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary-checkout">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cart.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.qty}</p>
                    <p className="item-price">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="total-row">
                <span>Tax (GST 18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="total-row final-total">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}