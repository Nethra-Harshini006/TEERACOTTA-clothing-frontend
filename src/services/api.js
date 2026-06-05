const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'fashion_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const authAPI = {
  signup: (body) => request('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  demo: () => request('/auth/demo', { method: 'POST' }),
  google: () => request('/auth/google', { method: 'POST' }),
  me: () => request('/auth/me'),
  updateProfile: (body) => request('/auth/profile', { method: 'PATCH', body: JSON.stringify(body) }),

  forgotPassword: (email) =>
  request('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),

resetPassword: (token, password, confirmPassword) =>
  request(`/auth/reset-password/${token}`, {
    method: 'POST',
    body: JSON.stringify({ password, confirmPassword }),
  }),
};

export const cartAPI = {
  get: () => request('/cart'),
  save: (items) => request('/cart', { method: 'PUT', body: JSON.stringify({ items }) }),
};

export const wishlistAPI = {
  get: () => request('/wishlist'),
  save: (items) => request('/wishlist', { method: 'PUT', body: JSON.stringify({ items }) }),
};

export const ordersAPI = {
  list: () => request('/orders'),
  latest: () => request('/orders/latest'),
  get: (id) => request(`/orders/${id}`),
  create: (body) => request('/orders', { method: 'POST', body: JSON.stringify(body) }),
};

export const feedbackAPI = {
  submit: (body) => request('/feedback', { method: 'POST', body: JSON.stringify(body) }),
};

export const subscriptionsAPI = {
  subscribe: (email) => request('/subscriptions', { method: 'POST', body: JSON.stringify({ email }) }),
};

export const contactAPI = {
  submit: (body) => request('/contact', { method: 'POST', body: JSON.stringify(body) }),
};

// Optional client-side email notifications (no-op when not configured)
export const emailAPI = {
  sendSignupEmail: () => Promise.resolve({ ok: true }),
  sendLoginEmail: () => Promise.resolve({ ok: true }),
  sendContactEmail: () => Promise.resolve({ ok: true }),
  sendFeedbackEmail: () => Promise.resolve({ ok: true }),
  sendOrderEmail: () => Promise.resolve({ ok: true }),
};
