import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, role, setUser, setRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setRole(null);
    navigate('/');
  };

  const handleRoleSwitch = () => {
    localStorage.removeItem('role');
    setRole(null);
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/home" className="navbar-logo">
          <span className="logo-icon">🎫</span>
          <span className="logo-text">Swap Your Journey</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">All Tickets</Link>
          
          {role === 'seller' && (
            <>
              <Link to="/create-ticket" className="nav-link">Create Ticket</Link>
              <Link to="/my-tickets" className="nav-link">My Tickets</Link>
              <Link to="/my-sold-tickets" className="nav-link">Sold Tickets</Link>
            </>
          )}
          
          {role === 'buyer' && (
            <Link to="/my-purchases" className="nav-link">My Purchases</Link>
          )}
          
          <Link to="/profile" className="nav-link">Profile</Link>
        </div>

        <div className="navbar-actions">
          <div className="user-info">
            <span className="user-name">Hi, {user.name}</span>
            <span className="user-role badge badge-info">{role}</span>
          </div>
          <button onClick={handleRoleSwitch} className="btn btn-outline btn-sm">
            Switch Role
          </button>
          <button onClick={handleLogout} className="btn btn-danger btn-sm">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;