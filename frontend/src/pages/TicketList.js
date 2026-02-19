import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentModal from '../components/PaymentModal';
import './TicketList.css';

function TicketList({ role }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get('/api/tickets/available');
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/tickets/book/${selectedTicket._id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessage('Ticket booked successfully!');
      setShowPayment(false);
      fetchTickets();
      
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Booking error:', err);
      alert(err.response?.data?.msg || 'Failed to book ticket');
      setShowPayment(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="page-container">
        <div className="container">
          <div className="page-header">
            <h1 className="page-title gradient-text">Available Tickets</h1>
            <p className="page-subtitle">Find your perfect journey</p>
          </div>

          {message && <div className="alert alert-success">{message}</div>}

          {tickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎫</div>
              <h3>No tickets available</h3>
              <p>Check back later for new listings</p>
            </div>
          ) : (
            <div className="tickets-grid">
              {tickets.map((ticket) => (
                <div key={ticket._id} className="ticket-card">
                  <div className="ticket-badge">
                    <span className="badge badge-success">Available</span>
                  </div>

                  <div className="ticket-route">
                    <div className="route-point">
                      <div className="route-icon">📍</div>
                      <div className="route-name">{ticket.from}</div>
                    </div>
                    <div className="route-arrow">→</div>
                    <div className="route-point">
                      <div className="route-icon">📍</div>
                      <div className="route-name">{ticket.to}</div>
                    </div>
                  </div>

                  <div className="ticket-details">
                    <div className="detail-row">
                      <span className="detail-label">📅 Date</span>
                      <span className="detail-value">
                        {new Date(ticket.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">🕐 Departure</span>
                      <span className="detail-value">{ticket.depTime}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">🚌 Bus</span>
                      <span className="detail-value">{ticket.busType}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">💺 Seat</span>
                      <span className="detail-value">{ticket.seatNo} ({ticket.seatCategory})</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">📌 Landmark</span>
                      <span className="detail-value">{ticket.landmark}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">👤 Seller</span>
                      <span className="detail-value">{ticket.sellerName}</span>
                    </div>
                  </div>

                  <div className="ticket-price">
                    <div className="price-row">
                      <span className="price-label">Original Price</span>
                      <span className="price-original">₹{ticket.actualPrice}</span>
                    </div>
                    <div className="price-row">
                      <span className="price-label">Selling Price</span>
                      <span className="price-current">₹{ticket.sellPrice}</span>
                    </div>
                    {ticket.actualPrice > ticket.sellPrice && (
                      <div className="price-save">
                        Save ₹{ticket.actualPrice - ticket.sellPrice}
                      </div>
                    )}
                  </div>

                  {role === 'buyer' && (
                    <button 
                      className="btn btn-success btn-block glow-on-hover"
                      onClick={() => handleBookClick(ticket)}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showPayment && selectedTicket && (
        <PaymentModal
          ticket={selectedTicket}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}

export default TicketList;