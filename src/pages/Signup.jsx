import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';
import '../styles/signup.css';

export default function Signup() {
  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    dateOfBirth: '',
    terms: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));

    setError('');
  };

  const runAuthAction = async (action) => {
    setError('');
    setLoading(true);

    const result = await action();

    setLoading(false);

    if (result.ok) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (!form.terms) {
      setError('Please accept the terms and conditions.');
      return;
    }
runAuthAction(() =>
  signup({
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    password: form.password,
    dateOfBirth: form.dateOfBirth,
  })
);
};

const handleGoogleSignUp = () => runAuthAction(signInWithGoogle);

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
              Join the TERRACOTTA
              <br />
              Community
            </h2>

            <p>
              Exclusive access to premium collections, early drops,
              and member-only deals.
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

            <h1 className="auth-heading">Create Account</h1>

            <p className="auth-subheading">
              Join thousands of fashion-forward individuals today.
            </p>

            {error && (
              <div className="auth-error-box">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label
                    className="form-label"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>

                  <div className="form-input-wrap">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className="form-input"
                      placeholder="Priya"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label
                    className="form-label"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>

                  <div className="form-input-wrap">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className="form-input"
                      placeholder="Sharma"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

            <div className="form-group">
  <label className="form-label" htmlFor="dateOfBirth">
    Date of Birth
  </label>

  <div className="form-input-wrap">
    <input
      id="dateOfBirth"
      name="dateOfBirth"
      type="date"
      className="form-input"
      value={form.dateOfBirth}
      onChange={handleChange}
      required
    />
  </div>
</div>

              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor="email"
                >
                  Email Address
                </label>

                <div className="form-input-wrap">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor="password"
                >
                  Password
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
                  />

                  <button
                    type="button"
                    className="pw-toggle"
                    onClick={() => setShowPw((s) => !s)}
                  >
                    {showPw ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label
                  className="form-label"
                  htmlFor="confirm"
                >
                  Confirm Password
                </label>

                <div className="form-input-wrap">
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    className="form-input"
                    placeholder="Repeat your password"
                    value={form.confirm}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="terms-row">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                />

                <label htmlFor="terms">
                  I agree to the{' '}
                  <a href="#">Terms of Service</a> and{' '}
                  <a href="#">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="auth-spinner" />
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-divider">
              or sign up with
            </div>

            <button
              type="button"
              className="google-btn"
              onClick={handleGoogleSignUp}
              disabled={loading}
            >
              <svg
                className="google-icon"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>

              Continue with Google
            </button>

            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

