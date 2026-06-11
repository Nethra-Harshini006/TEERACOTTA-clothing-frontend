import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

export default function Login() {
  const { login, signInWithGoogle } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = e => { setForm(f => ({ ...f, [e.target.name]: e.target.value })); setError(''); };

  const runAuthAction = async (action) => {
    setError('');
    setLoading(true);
    const result = await action();
    setLoading(false);
    if (result.ok) navigate('/');
    else setError(result.error);
  };

  const handleSubmit = e => {
    e.preventDefault();
    runAuthAction(() => login({ email: form.email, password: form.password }));
  };

  
  const handleGoogleLogin = () => runAuthAction(signInWithGoogle);

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1000&q=85" alt="Fashion" />
        <div className="auth-visual-overlay">
          <div className="auth-visual-logo">TERRA<span>COTTA</span></div>
          <div className="auth-visual-text">
            <h2>Welcome Back to<br />TERRACOTTA</h2>
            <p>Your style journey continues here. Sign in to access your exclusive collections and orders.</p>
            <div className="auth-visual-dots"><span className="active" /><span /><span /></div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <div className="auth-card">
            <div className="auth-logo"><div className="auth-logo-dot" />TERRACOTTA</div>
            <h1 className="auth-heading">Sign In</h1>
            <p className="auth-subheading">Enter your credentials to access your account.</p>

            {error && (
              <div className="auth-error-box">⚠️ {error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <div className="form-input-wrap">
                  <input id="email" name="email" type="email" className="form-input"
                    placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="form-input-wrap">
                  <input id="password" name="password" type={showPw ? 'text' : 'password'}
                    className="form-input has-toggle" placeholder="••••••••"
                    value={form.password} onChange={handleChange} required />
                  <button type="button" className="pw-toggle" onClick={() => setShowPw(s => !s)}>
                    {showPw ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginBottom: '15px' }}>
  <Link to="/forgot-password" className="forgot-password-link">
    Forgot Password?
  </Link>
</div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <span className="auth-spinner" /> : 'Sign In'}
              </button>
            </form>

          
            <div className="auth-divider">or continue with</div>
            <button type="button" className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
              <svg className="google-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p className="auth-footer-text">
              Don't have an account? <Link to="/signup">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
