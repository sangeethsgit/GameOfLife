import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './PaymentPage.css';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userAddress } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Get selected route from location state
  const routeData = location.state?.routeData;

  useEffect(() => {
    if (!routeData) {
      navigate('/');
      return;
    }
    setSelectedOption(routeData);
  }, [routeData, navigate]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setIsProcessing(true);

    try {
      // Here you would integrate with your smart contract
      // For now, we'll simulate the payment process
      
      // Call smart contract to mint tokens based on eco score
      const ecoScore = selectedOption.eco_score;
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to rewards page with success message
      navigate('/rewards', { 
        state: { 
          paymentSuccess: true, 
          ecoScore: ecoScore,
          transportMode: selectedOption.transport_mode,
          amount: selectedOption.price
        } 
      });
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedOption) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2>Complete Your Booking</h2>
        
        <div className="route-summary">
          <h3>Selected Route</h3>
          <div className="route-details">
            <div className="transport-info">
              <span className="transport-mode">{selectedOption.transport_mode}</span>
              <span className="eco-score">🌱 {selectedOption.eco_score} Eco Points</span>
            </div>
            <div className="route-info">
              <p><strong>Duration:</strong> {selectedOption.duration} mins</p>
              <p><strong>Price:</strong> ₹{selectedOption.price}</p>
              <p><strong>Eco Rating:</strong> {selectedOption.eco}</p>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <h3>Payment Method</h3>
          <div className="payment-methods">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                checked={paymentMethod === 'UPI'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-label">UPI</span>
            </label>
            
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="Card"
                checked={paymentMethod === 'Card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-label">Credit/Debit Card</span>
            </label>
            
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="Wallet"
                checked={paymentMethod === 'Wallet'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-label">Digital Wallet</span>
            </label>
          </div>
        </div>

        <div className="total-section">
          <div className="total-row">
            <span>Ticket Price:</span>
            <span>₹{selectedOption.price}</span>
          </div>
          <div className="total-row">
            <span>Eco Points Earned:</span>
            <span className="eco-points">+{selectedOption.eco_score}</span>
          </div>
          <div className="total-row total">
            <span>Total:</span>
            <span>₹{selectedOption.price}</span>
          </div>
        </div>

        <div className="payment-actions">
          <button 
            className="pay-button"
            onClick={handlePayment}
            disabled={!paymentMethod || isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay ₹${selectedOption.price}`}
          </button>
          
          <button 
            className="cancel-button"
            onClick={() => navigate('/')}
            disabled={isProcessing}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 