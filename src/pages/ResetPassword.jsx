import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import '../styles/auth-form.css';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setError('');
  };

  const validatePassword = (pwd) => {
    if (!pwd) return 'Password is required';
    if (pwd.length < 8) return 'Password must be at least 8 characters';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords
    const pwError = validatePassword(form.password);
    if (pwError) {
      setError(pwError);
      return;
    }

    if (!form.confirmPassword) {
      setError('Please confirm your password');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const res = await authAPI.resetPassword(
        token,
        form.password,
        form.confirmPassword
      );
      setShowSuccess(true);
      setMessage(res.message || '✓ Password reset successful!');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = {
    hasMini: form.password.length >= 8,
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img
          src="https://images.unsplash.com/photo-1526374965328-7f5ae4e8a83f?w=1000&q=85"
          alt="Reset Password"
        />

        <div className="auth-visual-overlay">
          <div className="auth-visual-logo">
            TERRA<span>COTTA</span>
          </div>

          <div className="auth-visual-text">
            <h2>Create New Password</h2>
            <p>
              Make your account secure with a strong, unique password that you'll
              remember.
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

            <h1 className="auth-heading">Reset Your Password</h1>

            <p className="auth-subheading">
              Create a new secure password for your account.
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
                    <label className="form-label" htmlFor="password">
                      New Password
                    </label>

                    <div className="form-input-wrap">
                      <input
                        id="password"
                        name="password"
                        type={showPw ? 'text' : 'password'}
                        className="form-input has-toggle"
                        placeholder="Min. 8 characters"
                        value={form.password}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                      <button
                        type="button"
                        className="pw-toggle"
                        onClick={() => setShowPw((s) => !s)}
                        disabled={loading}
                      >
                        {showPw ? 'Hide' : 'Show'}
                      </button>
                    </div>

                    <div className="password-requirements">
                      <div
                        className={`requirement ${
                          passwordStrength.hasMini ? 'met' : ''
                        }`}
                      >
                        {passwordStrength.hasMini ? '✓' : '○'} At least 8
                        characters
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">
                      Confirm Password
                    </label>

                    <div className="form-input-wrap">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirm ? 'text' : 'password'}
                        className="form-input has-toggle"
                        placeholder="Repeat your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />

                      <button
                        type="button"
                        className="pw-toggle"
                        onClick={() => setShowConfirm((s) => !s)}
                        disabled={loading}
                      >
                        {showConfirm ? 'Hide' : 'Show'}
                      </button>
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
                        Resetting...
                      </>
                    ) : (
                      'Reset Password'
                    )}
                  </button>
                </form>

                <div className="auth-divider">or</div>

                <Link to="/login" className="secondary-btn">
                  ← Back to Login
                </Link>

                <p className="auth-footer-text">
                  Remember your password?{' '}
                  <Link to="/login">Sign in here</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}