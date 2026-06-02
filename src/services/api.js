// Email API Service
const API_BASE = 'http://localhost:5000/api';

export const emailAPI = {
  // Send signup welcome email
  sendSignupEmail: async (firstName, email) => {
    try {
      const res = await fetch(`${API_BASE}/email/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });
      if (!res.ok) throw new Error(`Email error: ${res.status}`);
      return { ok: true };
    } catch (err) {
      console.error('Signup email failed:', err);
      return { ok: false, error: err.message };
    }
  },

  // Send login alert email
  sendLoginEmail: async (firstName, email) => {
    try {
      const res = await fetch(`${API_BASE}/email/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });
      if (!res.ok) throw new Error(`Email error: ${res.status}`);
      return { ok: true };
    } catch (err) {
      console.error('Login email failed:', err);
      return { ok: false, error: err.message };
    }
  },

  // Send contact form reply
  sendContactEmail: async (name, email, topic, message) => {
    try {
      const res = await fetch(`${API_BASE}/email/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, topic, message }),
      });
      if (!res.ok) throw new Error(`Email error: ${res.status}`);
      return { ok: true };
    } catch (err) {
      console.error('Contact email failed:', err);
      return { ok: false, error: err.message };
    }
  },

  // Send feedback thank you email
  sendFeedbackEmail: async (name, email, rating, topic) => {
    try {
      const res = await fetch(`${API_BASE}/email/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, rating, topic }),
      });
      if (!res.ok) throw new Error(`Email error: ${res.status}`);
      return { ok: true };
    } catch (err) {
      console.error('Feedback email failed:', err);
      return { ok: false, error: err.message };
    }
  },

  // Send newsletter confirmation email
  sendNewsletterEmail: async (email) => {
    try {
      const res = await fetch(`${API_BASE}/email/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(`Email error: ${res.status}`);
      return { ok: true };
    } catch (err) {
      console.error('Newsletter email failed:', err);
      return { ok: false, error: err.message };
    }
  },

  // Send order confirmation email
  sendOrderEmail: async (billing, items, totals, orderId) => {
    try {
      const res = await fetch(`${API_BASE}/email/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billing, items, totals, orderId }),
      });
      if (!res.ok) throw new Error(`Email error: ${res.status}`);
      return { ok: true };
    } catch (err) {
      console.error('Order email failed:', err);
      return { ok: false, error: err.message };
    }
  },
};
