import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/auth-form.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email?.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const res = await authAPI.forgotPassword(email.toLowerCase().trim());
      setShowSuccess(true);
      setMessage(res.message || '✓ Password reset link sent successfully!');
      setEmail('');

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Unable to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1611003228941-98852ba62227?w=1000&q=85"
          alt="Security"
        />

        <div className="auth-visual-overlay">
          <div className="auth-visual-logo">
            TERRA<span>COTTA</span>
          </div>

          <div className="auth-visual-text">
            <h2>Secure Your Account</h2>
            <p>
              We'll help you regain access to your account with a secure
              password reset process.
            </p>

            <div className="auth-visual-dots">
              <span />
              <span className="active" />
              <span />
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

            <h1 className="auth-heading">Forgot Password?</h1>

            <p className="auth-subheading">
              No problem! Enter your email address and we'll send you a link to
              reset your password.
            </p>

            {showSuccess ? (
              <div className="auth-success-box">
                <div className="success-icon">✓</div>
                <p>{message}</p>
                <p className="success-hint">
                  Redirecting to login in a moment...
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="auth-error-box">
                    ⚠️ {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address
                    </label>

                    <div className="form-input-wrap">
                      <input
                        id="email"
                        type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError('');
                        }}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="auth-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="auth-spinner" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </button>
                </form>

                <div className="auth-divider">or</div>

                <Link to="/login" className="secondary-btn">
                  ← Back to Login
                </Link>

                <p className="auth-footer-text">
                  Don't have an account?{' '}
                  <Link to="/signup">Sign up here</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}