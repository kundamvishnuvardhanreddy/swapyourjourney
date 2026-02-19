import React from 'react';
import './Profile.css';

function Profile({ user }) {
  return (
    <div className="page-container">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title gradient-text">My Profile</h1>
          <p className="page-subtitle">Your account information</p>
        </div>

        <div className="profile-container">
          <div className="profile-avatar">
            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <span className="info-label">Full Name</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email Address</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Current Role</span>
              <span className="info-value">
                <span className={`badge ${user.role === 'buyer' ? 'badge-info' : 'badge-success'}`}>
                  {user.role}
                </span>
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Member Since</span>
              <span className="info-value">
                {new Date(user.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn btn-outline btn-block" onClick={() => {
              localStorage.removeItem('role');
              window.location.reload();
            }}>
              Switch Role
            </button>
            <button className="btn btn-danger btn-block" onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;