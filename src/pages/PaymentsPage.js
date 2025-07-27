import React, { useState } from 'react';
import PaymentFormFields from './PaymentFormFields';
import ConfirmationPopup from './ConfirmationPopup';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentsPage = () => {
  const [mode, setMode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();

  const fareMap = {
    metro: 30,
    eBus: 25,
    cityBus: 20,
    waterMetro: 15,
    myByke: 10
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketDetails = {
      mode,
      method: paymentMethod,
      fare: fareMap[mode],
      date: new Date().toLocaleString(),
      ticketId: `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    setTicket(ticketDetails);
    setShowPopup(true);
  };

  const handlePaymentSuccess = () => {
    setShowPopup(false);
    // Navigate to rewards page after showing ticket
    setTimeout(() => {
      navigate("/rewards");
    }, 2000); // Wait 2 seconds before navigating
  };

  return (
    <div className="dashboard-container">
      <h2>Book a Ticket</h2>

      <form onSubmit={handleSubmit} className="payment-form">
        <label>Select Transport Mode:</label>
        <select value={mode} onChange={e => setMode(e.target.value)} required>
          <option value="">--Select--</option>
          <option value="metro">Metro</option>
          <option value="eBus">Electric Bus</option>
          <option value="cityBus">City Bus</option>
          <option value="waterMetro">Water Metro</option>
          <option value="myByke">MyByke</option>
        </select>

        {mode && <p>Fare: ₹{fareMap[mode]}</p>}

        <label>Select Payment Method:</label>
        <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} required>
          <option value="">--Select--</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
          <option value="Netbanking">Net Banking</option>
          <option value="Wallet">Wallet</option>
        </select>

        {paymentMethod && <PaymentFormFields method={paymentMethod} />}

        <button type="submit">Pay Now</button>
      </form>

      {showPopup && ticket && (
        <ConfirmationPopup 
          ticket={ticket} 
          onClose={handlePaymentSuccess}
          onConfirm={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default PaymentsPage;


