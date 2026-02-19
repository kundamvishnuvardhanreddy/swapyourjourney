import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Signup({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate email format
    if (!validateEmail(form.email)) {
      setError('Please enter a valid email address (e.g., user@example.com)');
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Validate phone number (basic validation)
    if (form.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/auth/signup', form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🚀</div>
          <h1 className="auth-title gradient-text">Join Us</h1>
          <p className="auth-subtitle">Create your account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="input"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              minLength="2"
            />
          </div>

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
            {form.email && !validateEmail(form.email) && (
              <small style={{color: '#FF3B30', fontSize: '12px', marginTop: '4px', display: 'block'}}>
                Please enter a valid email format
              </small>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="input"
              placeholder="+91 1234567890"
              value={form.phone}
              onChange={handleChange}
              required
              minLength="10"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
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
            {form.password && form.password.length < 6 && (
              <small style={{color: '#FF3B30', fontSize: '12px', marginTop: '4px', display: 'block'}}>
                Password must be at least 6 characters
              </small>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          <div className="auth-footer">
            <span>Already have an account?</span>
            <Link to="/" className="auth-link">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;