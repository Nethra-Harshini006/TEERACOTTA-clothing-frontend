import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/faq.css';

const faqs = [
  {
    category: 'Orders & Payment',
    icon: '🛒',
    items: [
      { q: 'How do I place an order?', a: 'Browse our shop, add items to your cart, and proceed to checkout. You can pay via Credit/Debit Card, UPI, Google Pay, or Cash on Delivery.' },
      { q: 'Can I modify or cancel my order after placing it?', a: 'Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed. Please contact us immediately at hello@terracotta.in.' },
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, UPI (GPay, PhonePe, Paytm), Net Banking, and Cash on Delivery for orders below ₹5,000.' },
      { q: 'Is it safe to use my card on your website?', a: 'Yes, absolutely. All transactions are encrypted with 256-bit SSL and we never store your card details. We are PCI-DSS compliant.' },
      { q: 'Will I receive an invoice for my order?', a: 'Yes, a GST-compliant invoice is automatically emailed to you after every successful order.' },
    ],
  },
  {
    category: 'Shipping & Delivery',
    icon: '🚚',
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery takes 5–7 business days. Express delivery (2–3 days) is available for an additional ₹99. Same-day delivery is available in Coimbatore.' },
      { q: 'Do you offer free shipping?', a: 'Yes! Orders above ₹999 qualify for free standard shipping across India. Use code TERRA20 on your first order for 20% off.' },
      { q: 'Do you ship outside India?', a: 'Currently we ship across all 28 states and 8 union territories of India. International shipping is coming soon.' },
      { q: 'How do I track my order?', a: 'Once your order is shipped, you will receive a tracking link via SMS and email. You can also track it from your Account page.' },
    ],
  },
  {
    category: 'Returns & Exchanges',
    icon: '🔄',
    items: [
      { q: 'What is your return policy?', a: 'We offer hassle-free returns within 30 days of delivery. Items must be unworn, unwashed, and have original tags attached.' },
      { q: 'How do I initiate a return?', a: 'Go to My Account → Orders → select the order → click "Return Item". Our team will arrange a free pickup within 2 business days.' },
      { q: 'When will I get my refund?', a: 'Refunds are processed within 5–7 business days after we receive the returned item. For UPI/card payments, it reflects in 3–5 days. COD refunds are issued as store credit.' },
      { q: 'Can I exchange for a different size or color?', a: 'Yes! Select "Exchange" instead of "Return" in your account. We will dispatch the replacement as soon as we receive the original item.' },
      { q: 'Are there any items that cannot be returned?', a: 'Jewellery, innerwear, and items marked "Final Sale" cannot be returned for hygiene reasons.' },
    ],
  },
  {
    category: 'Products & Sizing',
    icon: '👗',
    items: [
      { q: 'How do I find my size?', a: 'Each product page has a detailed Size Guide button. We recommend measuring your chest, waist, and hips and comparing with the size chart.' },
      { q: 'Are the product colours accurate in photos?', a: 'We photograph all items in natural light. Slight variations may occur depending on your screen calibration, but we aim for maximum accuracy.' },
      { q: 'How should I care for my TERRACOTTA clothing?', a: 'Care instructions are printed on every garment tag. Generally, cold machine wash or hand wash is recommended for most pieces.' },
      { q: 'Do you restock sold-out items?', a: "Popular items are restocked every 2\u20134 weeks. Click 'Notify Me' on a sold-out product to get an email when it's back." },
    ],
  },
  {
    category: 'Account & Loyalty',
    icon: '👤',
    items: [
      { q: 'Do I need an account to shop?', a: 'Yes, an account is required to place orders. It lets you track orders, save wishlists, and access exclusive member deals.' },
      { q: 'I forgot my password. What do I do?', a: 'Click "Forgot Password" on the login page and we will send a reset link to your registered email within 2 minutes.' },
      { q: 'Is there a loyalty or rewards programme?', a: 'Yes! TERRACOTTA Stars is our loyalty programme. Earn 1 star per ₹100 spent. Redeem stars for discounts on future orders. Coming fully live in Q3 2025.' },
      { q: 'How do I delete my account?', a: 'Email us at hello@terracotta.in with the subject "Account Deletion Request". We will process it within 7 business days.' },
    ],
  },
];

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
}

export default function FAQ() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="faq-page">

      {/* Header */}
      <div className="faq-header">
        <div className="container">
          <span className="section-eyebrow">Help Centre</span>
          <h1 className="faq-title">Frequently Asked <span>Questions</span></h1>
          <p className="faq-subtitle">Everything you need to know about shopping with TERRACOTTA. Can't find an answer? <Link to="/contact">Contact us</Link>.</p>
        </div>
      </div>

      <div className="container faq-body">

        {/* Category tabs */}
        <div className="faq-tabs">
          {faqs.map((cat, i) => (
            <button
              key={cat.category}
              className={`faq-tab${activeTab === i ? ' active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              <span>{cat.icon}</span>
              {cat.category}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="faq-accordion">
          <h3 className="faq-cat-heading">
            {faqs[activeTab].icon} {faqs[activeTab].category}
          </h3>
          {faqs[activeTab].items.map(item => (
            <AccordionItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        {/* Still need help */}
        <div className="faq-still-help">
          <h3>Still have questions?</h3>
          <p>Our support team is available Monday – Saturday, 9 AM – 7 PM IST.</p>
          <div className="faq-help-cards">
            <a href="tel:+918668068485" className="faq-help-card">
              <span className="faq-help-icon">📞</span>
              <div>
                <strong>Call Us</strong>
                <span>+91 86680 68485</span>
              </div>
            </a>
            <a href="mailto:nethrasudharsan006@gmail.com" className="faq-help-card">
              <span className="faq-help-icon">✉️</span>
              <div>
                <strong>Email Us</strong>
                <span>nethrasudharsan006@gmail.com</span>
              </div>
            </a>
            <Link to="/contact" className="faq-help-card">
              <span className="faq-help-icon">💬</span>
              <div>
                <strong>Live Chat</strong>
                <span>Get instant answers</span>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
