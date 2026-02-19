import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

function HomePage({ role }) {
  const navigate = useNavigate();
  const [userTickets, setUserTickets] = useState([]);

  const fetchUserTickets = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      let res;
      
      if (role === 'seller') {
        // Get sold tickets for seller
        res = await axios.get('/api/tickets/sold', {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Get purchased tickets for buyer
        res = await axios.get('/api/tickets/purchases', {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      // Get only the 3 most recent tickets
      setUserTickets(res.data.slice(0, 3));
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setUserTickets([]);
    }
  }, [role]);

  useEffect(() => {
    fetchUserTickets();
  }, [fetchUserTickets]);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🎫 Your Ticket Marketplace</div>
          <h1 className="hero-title">
            Swap Your Journey,
            <br />
            
          </h1>
          <p className="hero-subtitle">
            Sell the ticket if you don't want. Buy the ticket if you want.
          </p>
          <div className="hero-buttons">
            <button className="hero-btn primary" onClick={() => navigate('/')}>
              Browse Tickets
              <span className="arrow">→</span>
            </button>
            {role === 'seller' && (
              <button className="hero-btn secondary" onClick={() => navigate('/create-ticket')}>
                Sell Your Ticket
              </button>
            )}
          </div>
        </div>

        {/* Show user's tickets only if they have any */}
        {userTickets.length > 0 && (
          <div className="hero-visual">
            {userTickets.map((ticket, index) => (
              <div key={ticket._id} className={`floating-ticket ticket-${index + 1}`}>
                <div className="ticket-mini">
                  <div className="ticket-route">
                    {ticket.from.substring(0, 3).toUpperCase()} → {ticket.to.substring(0, 3).toUpperCase()}
                  </div>
                  <div className="ticket-price">₹{ticket.sellPrice}</div>
                  <div className="ticket-status">
                    {role === 'seller' ? '✓ Sold' : '✓ Purchased'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-icon">📝</div>
            <h3>1. List Your Ticket</h3>
            <p>Got a ticket you can't use? List it in seconds with all journey details.</p>
          </div>
          <div className="step">
            <div className="step-icon">🔍</div>
            <h3>2. Browse & Buy</h3>
            <p>Find tickets for your route at discounted prices from verified sellers.</p>
          </div>
          <div className="step">
            <div className="step-icon">💰</div>
            <h3>3. Save Money</h3>
            <p>Pay less, travel more. Save up to 50% on your bus journeys.</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Booking</h3>
            <p>Book tickets in seconds with our seamless payment system</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>100% Secure</h3>
            <p>Your transactions are protected with bank-grade security</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Easy Payments</h3>
            <p>Pay with UPI, cards, or any payment method you prefer</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>24/7 Support</h3>
            <p>Our team is always ready to help you anytime, anywhere</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Saving?</h2>
          <p>Join thousands of smart travelers today</p>
          <button className="cta-button" onClick={() => navigate('/')}>
            Get Started Now
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;