import { useState } from 'react';
import { authAPI } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

export default function ForgotPassword() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match.');
    }

    if (form.password.length < 8) {
      return setError('Password must be at least 8 characters.');
    }

    setLoading(true);

    try {
      const res = await authAPI.forgotPassword(form);

      if (res.ok) {
        setMessage('✅ Password updated successfully! Redirecting...');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-page">

      <div className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=85"
          alt="Fashion"
        />

        <div className="auth-visual-overlay">
          <div className="auth-visual-logo">
            TERRA<span>COTTA</span>
          </div>

          <div className="auth-visual-text">
            <h2>
              Secure Your
              <br />
              Account
            </h2>

            <p>
              Create a new password and get back to shopping your
              favourite fashion collections.
            </p>

            <div className="auth-visual-dots">
              <span />
              <span />
              <span className="active" />
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <div className="auth-card">

            <div className="auth-logo">
              <div className="auth-logo-dot" />
              TERRACOTTA
            </div>

            <h1 className="auth-heading">Reset Password</h1>

            <p className="auth-subheading">
              Enter your account email and choose a new password.
            </p>

            {error && (
              <div className="auth-error-box">
                ⚠️ {error}
              </div>
            )}

            {message && (
              <div
                style={{
                  background: '#f0fff4',
                  color: '#15803d',
                  border: '1px solid #86efac',
                  padding: '12px',
                  borderRadius: '10px',
                  marginBottom: '18px'
                }}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label className="form-label">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  New Password
                </label>

                <div className="form-input-wrap">
                  <input
                    type={showPw ? 'text' : 'password'}
                    name="password"
                    className="form-input has-toggle"
                    placeholder="Minimum 8 characters"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="button"
                    className="pw-toggle"
                    onClick={() => setShowPw(!showPw)}
                  >
                    {showPw ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="auth-spinner" />
                ) : (
                  'Update Password'
                )}
              </button>

            </form>

            <p className="auth-footer-text">
              Remember your password?{' '}
              <Link to="/login">Back to Login</Link>
            </p>

          </div>
        </div>
      </div>

    </div>
  );
}