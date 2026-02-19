import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [buyMsg, setBuyMsg] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`/api/tickets/all`)
      .then(res => {
        const found = res.data.find(t => t._id === id);
        if (!found) {
          setError('Ticket not found');
        } else {
          setTicket(found);
        }
      })
      .catch(() => setError('Error loading ticket'));
  }, [id]);

  const handleEdit = () => {
    navigate('/my-tickets');
  };

  const handleBuy = async () => {
    try {
      const res = await axios.post(`/api/tickets/request/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBuyMsg('Booked successfully!');
      setTicket({ ...ticket, status: 'booked' });
    } catch (err) {
      setBuyMsg(err.response?.data?.msg || 'Error booking');
    }
  };

  if (error) return <div>{error}</div>;
  if (!ticket) return <div>Loading...</div>;

  return (
    <div style={{margin: '40px auto', maxWidth: 600, background: "#fff", borderRadius: 8, padding: 24}}>
      <h2>Ticket Details</h2>
      <b>{ticket.from} → {ticket.to}</b> <br />
      Bus Operator: {ticket.busOperator} <br />
      Date & Time: {new Date(ticket.travelDate).toLocaleString()}<br />
      Departure: {ticket.departureTime}<br />
      Seat: {ticket.seatNumber}<br />
      Original Price: Rs.{ticket.originalPrice} <br />
      Selling Price: Rs.{ticket.sellingPrice}<br />
      Status: {ticket.status}<br />
      Bus Type: {ticket.busType}<br />
      {ticket.ticketImage && (
        <div><img src={ticket.ticketImage} alt="Ticket" style={{maxWidth: "100%", margin: "20px 0"}} /></div>
      )}
      Seller: {ticket.seller?.name} ({ticket.seller?.email})<br />
      <hr />
      {user && ticket.seller?._id === user._id && (
        <button onClick={handleEdit}>Edit or Delete (via My Tickets)</button>
      )}
      {user && ticket.seller?._id !== user._id && ticket.status === 'available' && (
        <button onClick={handleBuy} style={{marginTop: 16, background: "#28a745", color: "#fff", padding: "10px"}}>
          Book/Request Ticket
        </button>
      )}
      {buyMsg && <div style={{color: buyMsg.includes('success') ? 'green' : 'red'}}>{buyMsg}</div>}
    </div>
  );
}

export default TicketDetails;
