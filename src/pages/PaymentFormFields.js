import React from 'react';

const PaymentFormFields = ({ method }) => {
  switch (method) {
    case 'upi':
      return (
        <div>
          <label>UPI ID:</label>
          <input type="text" placeholder="example@upi" required />
        </div>
      );
    case 'card':
      return (
        <div>
          <label>Card Number:</label>
          <input type="text" placeholder="1234 5678 9012 3456" required />
          <label>Expiry:</label>
          <input type="text" placeholder="MM/YY" required />
          <label>CVV:</label>
          <input type="password" placeholder="***" required />
        </div>
      );
    case 'netbanking':
      return (
        <div>
          <label>Bank Name:</label>
          <input type="text" placeholder="HDFC / SBI / etc." required />
          <label>Account Number:</label>
          <input type="text" required />
        </div>
      );
    case 'wallet':
      return (
        <div>
          <label>Wallet Provider:</label>
          <input type="text" placeholder="Paytm / PhonePe" required />
          <label>Mobile Number:</label>
          <input type="text" required />
        </div>
      );
    case 'crypto':
      return (
        <div>
          <label>MetaMask Address:</label>
          <input type="text" placeholder="0x..." required />
          <p style={{ fontSize: '12px' }}>Make sure MetaMask is connected to your browser.</p>
        </div>
      );
    default:
      return null;
  }
};

export default PaymentFormFields;
