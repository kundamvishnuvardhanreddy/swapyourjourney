import React from 'react';
import './RoleSwitcher.css';

function RoleSwitcher({ onSelect }) {
  return (
    <div className="role-container">
      <div className="role-card">
        <div className="role-header">
          <div className="role-icon">🎭</div>
          <h1 className="role-title gradient-text">Choose Your Role</h1>
          <p className="role-subtitle">How would you like to use Swap Your Journey?</p>
        </div>

        <div className="role-options">
          <div className="role-option" onClick={() => onSelect('buyer')}>
            <div className="role-option-icon">🛒</div>
            <h3 className="role-option-title">Buyer</h3>
            <p className="role-option-desc">
              Browse and purchase available bus tickets from sellers
            </p>
            <div className="role-option-features">
              <div className="feature">✓ View available tickets</div>
              <div className="feature">✓ Book tickets instantly</div>
              <div className="feature">✓ Track your purchases</div>
            </div>
            <button className="btn btn-primary btn-block">
              Continue as Buyer
            </button>
          </div>

          <div className="role-option" onClick={() => onSelect('seller')}>
            <div className="role-option-icon">💼</div>
            <h3 className="role-option-title">Seller</h3>
            <p className="role-option-desc">
              List and sell your unused bus tickets to buyers
            </p>
            <div className="role-option-features">
              <div className="feature">✓ Create ticket listings</div>
              <div className="feature">✓ Manage your tickets</div>
              <div className="feature">✓ Track sales</div>
            </div>
            <button className="btn btn-secondary btn-block">
              Continue as Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleSwitcher;