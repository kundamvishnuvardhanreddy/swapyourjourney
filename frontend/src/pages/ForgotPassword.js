import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      setMessage(res.data.msg);
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🔐</div>
          <h1 className="auth-title gradient-text">Forgot Password</h1>
          <p className="auth-subtitle">We'll send you a reset code</p>
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!sent ? (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>

            <div className="auth-footer">
              <Link to="/" className="auth-link">← Back to Login</Link>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <Link to="/reset-password" className="btn btn-primary btn-block">
              Reset Password →
            </Link>
            <div className="auth-footer mt-3">
              <Link to="/" className="auth-link">← Back to Login</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;