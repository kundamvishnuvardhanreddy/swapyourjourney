import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TicketList.css';

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/tickets/my-tickets', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm('Are you sure you want to delete this ticket?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tickets/delete/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Ticket deleted successfully!');
      fetchTickets();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert(err.response?.data?.msg || 'Failed to delete ticket');
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
          <h1 className="page-title gradient-text">My Tickets</h1>
          <p className="page-subtitle">Manage your listed tickets</p>
        </div>

        {message && <div className="alert alert-success">{message}</div>}

        {tickets.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎫</div>
            <h3>No tickets listed</h3>
            <p>Create your first ticket to get started</p>
          </div>
        ) : (
          <div className="tickets-grid">
            {tickets.map((ticket) => (
              <div key={ticket._id} className="ticket-card">
                <div className="ticket-badge">
                  <span className={`badge ${ticket.status === 'available' ? 'badge-success' : 'badge-danger'}`}>
                    {ticket.status}
                  </span>
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
                    <span className="detail-label">💺 Seat</span>
                    <span className="detail-value">{ticket.seatNo} ({ticket.seatCategory})</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">💰 Selling Price</span>
                    <span className="detail-value">₹{ticket.sellPrice}</span>
                  </div>
                </div>

                {ticket.status === 'available' && (
                  <button
                    className="btn btn-danger btn-block"
                    onClick={() => handleDelete(ticket._id)}
                  >
                    Delete Ticket
                  </button>
                )}

                {ticket.status === 'booked' && (
                  <div className="alert alert-info">
                    This ticket has been booked and cannot be deleted
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTickets;