import React, { useState, useEffect } from 'react';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.95)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999999,
  padding: '20px'
};

const modalStyle = {
  background: '#1C1C1E',
  border: '1px solid #38383A',
  borderRadius: '24px',
  padding: '32px',
  maxWidth: '500px',
  width: '100%',
  maxHeight: '90vh',
  overflowY: 'auto',
  color: '#FFFFFF',
  position: 'relative',
  zIndex: 1000000
};

function PaymentModal({ ticket, onClose, onSuccess }) {
  const [method, setMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardMM, setCardMM] = useState('');
  const [cardYY, setCardYY] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const isValid = () => {
    if (method === 'upi') {
      return /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9]{2,}$/.test(upiId);
    }
    if (method === 'card') {
      return cardNumber.length === 16 && cardMM.length === 2 && cardYY.length === 2 && cardCVV.length === 3;
    }
    return false;
  };

  const handlePay = () => {
    if (!isValid()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const success = Math.random() < 0.7;
      setResult(success ? 'success' : 'failure');
      if (success) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    }, 1500);
  };

  if (result) {
    return (
      <div style={overlayStyle} onClick={onClose}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <div style={{textAlign: 'center', padding: '40px 20px'}}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '48px',
              fontWeight: 'bold',
              background: result === 'success' ? 'rgba(48, 209, 88, 0.2)' : 'rgba(255, 59, 48, 0.2)',
              color: result === 'success' ? '#30D158' : '#FF3B30',
              border: result === 'success' ? '3px solid #30D158' : '3px solid #FF3B30'
            }}>
              {result === 'success' ? '✓' : '✗'}
            </div>
            <h2 style={{fontSize: '28px', marginBottom: '12px', fontWeight: 800, color: '#FFFFFF'}}>
              {result === 'success' ? 'Payment Successful!' : 'Payment Failed'}
            </h2>
            <p style={{color: '#8E8E93', marginBottom: '32px', fontSize: '16px'}}>
              {result === 'success' ? 'Your ticket has been booked successfully!' : 'Payment failed. Please try again.'}
            </p>
            <button onClick={onClose} style={{
              width: '100%',
              padding: '16px',
              fontSize: '16px',
              fontWeight: 700,
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              background: '#0A84FF',
              color: 'white'
            }}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px'}}>
          <h2 style={{fontSize: '24px', fontWeight: 800, color: '#FFFFFF'}}>Complete Payment</h2>
          <button onClick={onClose} style={{
            background: 'transparent',
            border: 'none',
            fontSize: '32px',
            color: '#8E8E93',
            cursor: 'pointer',
            width: '40px',
            height: '40px',
            borderRadius: '50%'
          }}>×</button>
        </div>

        <div style={{
          background: '#2C2C2E',
          border: '2px solid #38383A',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <span style={{fontSize: '14px', color: '#8E8E93', fontWeight: 600, textTransform: 'uppercase'}}>Amount to Pay</span>
          <span style={{fontSize: '36px', fontWeight: 900, color: '#30D158'}}>₹{ticket.sellPrice}</span>
        </div>

        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#8E8E93', textTransform: 'uppercase'}}>
            Payment Method
          </label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} style={{
            width: '100%',
            padding: '14px 18px',
            fontSize: '16px',
            background: '#2C2C2E',
            border: '2px solid #38383A',
            borderRadius: '12px',
            color: '#FFFFFF'
          }}>
            <option value="">Choose payment method</option>
            <option value="upi">UPI</option>
            <option value="card">Credit/Debit Card</option>
          </select>
        </div>

        {method === 'upi' && (
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#8E8E93', textTransform: 'uppercase'}}>
              UPI ID
            </label>
            <input
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="username@upi"
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '16px',
                background: '#2C2C2E',
                border: '2px solid #38383A',
                borderRadius: '12px',
                color: '#FFFFFF'
              }}
            />
          </div>
        )}

        {method === 'card' && (
          <>
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#8E8E93', textTransform: 'uppercase'}}>
                Card Number
              </label>
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="1234567812345678"
                maxLength="16"
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  fontSize: '16px',
                  background: '#2C2C2E',
                  border: '2px solid #38383A',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontFamily: 'monospace'
                }}
              />
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#8E8E93', textTransform: 'uppercase'}}>
                  MM
                </label>
                <input
                  value={cardMM}
                  onChange={(e) => setCardMM(e.target.value.replace(/\D/g, ''))}
                  placeholder="12"
                  maxLength="2"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '16px',
                    background: '#2C2C2E',
                    border: '2px solid #38383A',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#8E8E93', textTransform: 'uppercase'}}>
                  YY
                </label>
                <input
                  value={cardYY}
                  onChange={(e) => setCardYY(e.target.value.replace(/\D/g, ''))}
                  placeholder="25"
                  maxLength="2"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '16px',
                    background: '#2C2C2E',
                    border: '2px solid #38383A',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: '#8E8E93', textTransform: 'uppercase'}}>
                  CVV
                </label>
                <input
                  value={cardCVV}
                  onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  maxLength="3"
                  type="password"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    fontSize: '16px',
                    background: '#2C2C2E',
                    border: '2px solid #38383A',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
            </div>
          </>
        )}

        <button
          onClick={handlePay}
          disabled={!isValid() || loading}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: '16px',
            fontWeight: 700,
            border: 'none',
            borderRadius: '999px',
            cursor: isValid() && !loading ? 'pointer' : 'not-allowed',
            background: '#30D158',
            color: 'white',
            opacity: !isValid() || loading ? 0.5 : 1,
            marginTop: '10px'
          }}
        >
          {loading ? 'Processing...' : `Pay ₹${ticket.sellPrice}`}
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;