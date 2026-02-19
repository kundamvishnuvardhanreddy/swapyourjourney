import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TicketList.css';

function MySoldTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/tickets/sold', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching sold tickets:', err);
    } finally {
      setLoading(false);
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
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title gradient-text">Sold Tickets</h1>
          <p className="page-subtitle">Your successful sales</p>
        </div>

        {tickets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💰</div>
            <h3>No tickets sold yet</h3>
            <p>When buyers book your tickets, they'll appear here</p>
          </div>
        ) : (
          <div className="tickets-grid">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="ticket-card">
                <div className="ticket-badge">
                  <span className="badge badge-info">Sold</span>
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
                    <span className="detail-label">💺 Seat</span>
                    <span className="detail-value">{ticket.seatNo}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">💰 Sold For</span>
                    <span className="detail-value text-success">₹{ticket.sellPrice}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">👤 Buyer</span>
                    <span className="detail-value">{ticket.buyer?.name || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">📧 Buyer Email</span>
                    <span className="detail-value">{ticket.buyer?.email || 'N/A'}</span>
                  </div>
                  {ticket.bookedAt && (
                    <div className="detail-row">
                      <span className="detail-label">📅 Sold On</span>
                      <span className="detail-value">
                        {new Date(ticket.bookedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MySoldTickets;