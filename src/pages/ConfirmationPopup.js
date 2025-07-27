import React from 'react';
import './PaymentPage.css';

const ConfirmationPopup = ({ ticket, onClose, onConfirm }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box ticket-popup">
        <h3>🎫 Ticket Generated Successfully!</h3>
        
        <div className="ticket-details">
          <div className="ticket-header">
            <h4>Your Ticket Details</h4>
            <div className="ticket-id">#{ticket.ticketId}</div>
          </div>
          
          <div className="ticket-info">
            <div className="info-row">
              <span className="label">Transport Mode:</span>
              <span className="value">{ticket.mode}</span>
            </div>
            <div className="info-row">
              <span className="label">Payment Method:</span>
              <span className="value">{ticket.method}</span>
            </div>
            <div className="info-row">
              <span className="label">Fare:</span>
              <span className="value">₹{ticket.fare}</span>
            </div>
            <div className="info-row">
              <span className="label">Date & Time:</span>
              <span className="value">{ticket.date}</span>
            </div>
          </div>
          
          <div className="ticket-footer">
            <p>✅ Payment Successful!</p>
          </div>
        </div>

        <div className="popup-buttons">
          <button onClick={onConfirm} className="success-btn">
            Continue to Rewards
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
