import React from 'react';
import './PaymentPage.css';

const ConfirmationPopup = ({ ticket, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h4>Your ticket Ticket Confirmed!</h4>
        <p><strong>Mode:</strong> {ticket.mode}</p>
        <p><strong>Payment Method:</strong> {ticket.method}</p>
        <p><strong>Amount Paid:</strong> ₹{ticket.fare}</p>
        <p><strong>Date:</strong> {ticket.date}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
