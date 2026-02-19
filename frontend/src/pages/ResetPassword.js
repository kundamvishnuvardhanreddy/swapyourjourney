import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function ResetPassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    code: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/reset-password', form);
      setMessage(res.data.msg);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to reset password. Please check your code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🔑</div>
          <h1 className="auth-title gradient-text">Reset Password</h1>
          <p className="auth-subtitle">Enter your reset code and new password</p>
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Reset Code</label>
            <input
              type="text"
              name="code"
              className="input mono"
              placeholder="123456"
              value={form.code}
              onChange={handleChange}
              required
              maxLength="6"
            />
          </div>

          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          <button type="submit" className="btn btn-success btn-block" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

          <div className="auth-footer">
            <Link to="/" className="auth-link">← Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;