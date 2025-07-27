// src/components/DisclaimerPopup.js
import React from 'react';
import './dashboard.css';

const DisclaimerPopup = ({ onAccept, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h4>⚠️ Risk Disclaimer</h4>
        <p>
          This challenge includes a monetary deposit. If you don't win, your deposit may be lost. Please proceed only if you understand the risks.
        </p>
        <div className="popup-buttons">
          <button onClick={onAccept}>I Understand & Continue</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPopup;
