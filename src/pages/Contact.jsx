import { useState } from 'react';
import { contactAPI } from '../services/api';
import '../styles/contact.css';

const TOPICS = ['Order Issue', 'Return / Exchange', 'Product Question', 'Shipping Query', 'Partnership', 'Other'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Please enter your name.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.topic)          e.topic   = 'Please select a topic.';
    if (!form.message.trim()) e.message = 'Please write your message.';
    return e;
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    try {
      await contactAPI.submit(form);
      setSubmitted(true);
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', email: '', phone: '', topic: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="contact-page">

      {/* Header */}
      <div className="contact-header">
        <div className="container">
          <span className="section-eyebrow">Get in Touch</span>
          <h1 className="contact-title">We'd Love to <span>Hear From You</span></h1>
          <p className="contact-subtitle">Have a question, a concern, or just want to say hello? Our team responds within 4 business hours.</p>
        </div>
      </div>

      <div className="container contact-body">

        {/* Info cards */}
        <div className="contact-info-row">
          <a href="tel:+919876543210" className="contact-info-card">
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
              </svg>
            </div>
            <h4>Call Us</h4>
            <p>+91 98765 43210</p>
            <span>Mon – Sat, 9 AM – 7 PM</span>
          </a>

          <a href="mailto:hello@terracotta.in" className="contact-info-card">
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h4>Email Us</h4>
            <p>hello@terracotta.in</p>
            <span>Reply within 4 hours</span>
          </a>

          <a
            href="https://maps.google.com/?q=42+Avinashi+Road+RS+Puram+Coimbatore"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-card"
          >
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h4>Visit Us</h4>
            <p>42, Avinashi Road, RS Puram</p>
            <span>Coimbatore, TN — 641002</span>
          </a>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-card contact-whatsapp"
          >
            <div className="contact-info-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </div>
            <h4>WhatsApp</h4>
            <p>+91 98765 43210</p>
            <span>Chat with us instantly</span>
          </a>
        </div>

        {/* Form + Map */}
        <div className="contact-main">

          {/* Form */}
          <div className="contact-form-card">
            {submitted ? (
              <div className="contact-success">
                <div className="contact-success-icon">🎉</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. We'll get back to you at <strong>{form.email}</strong> within 4 business hours.</p>
                <button className="btn-pink" onClick={handleReset}>Send Another</button>
              </div>
            ) : (
              <>
                <h2 className="contact-form-title">Send Us a Message</h2>
                <form className="contact-form" onSubmit={handleSubmit} noValidate>

                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label>Your Name *</label>
                      <input name="name" type="text" placeholder="Priya Sharma" value={form.name} onChange={handleChange} />
                      {errors.name && <span className="contact-error">{errors.name}</span>}
                    </div>
                    <div className="contact-field">
                      <label>Email Address *</label>
                      <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                      {errors.email && <span className="contact-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="contact-form-row">
                    <div className="contact-field">
                      <label>Phone <span>(optional)</span></label>
                      <input name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="contact-field">
                      <label>Topic *</label>
                      <select name="topic" value={form.topic} onChange={handleChange}>
                        <option value="">Select a topic…</option>
                        {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.topic && <span className="contact-error">{errors.topic}</span>}
                    </div>
                  </div>

                  <div className="contact-field">
                    <label>Message *</label>
                    <textarea name="message" rows={5} placeholder="Describe your issue or question in detail…" value={form.message} onChange={handleChange} />
                    {errors.message && <span className="contact-error">{errors.message}</span>}
                  </div>

                  <button type="submit" className="contact-submit" disabled={loading}>
                    {loading
                      ? <><span className="contact-spinner" /> Sending…</>
                      : <>Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z"/></svg></>
                    }
                  </button>

                </form>
              </>
            )}
          </div>

          {/* Map */}
          <div className="contact-map-card">
            <div className="contact-map-header">
              <h3>Find Our Store</h3>
              <p>42, Avinashi Road, RS Puram, Coimbatore — 641002</p>
            </div>
            <div className="contact-map-embed">
              <iframe
                title="TERRACOTTA Store Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.478!2d76.9558!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzAwLjUiTiA3NsKwNTcnMjEuMCJF!5e0!3m2!1sen!2sin!4v1"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="contact-map-hours">
              <h4>Store Hours</h4>
              <div className="contact-hours-grid">
                <span>Monday – Friday</span><span>10:00 AM – 9:00 PM</span>
                <span>Saturday</span><span>10:00 AM – 10:00 PM</span>
                <span>Sunday</span><span>11:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
