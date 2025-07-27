// src/components/RewardCard.js
import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';

const RewardCard = ({ reward }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const total = reward.expiresAt - (reward.expiresAt - 1000 * 60 * 60 * 24);
      const left = reward.expiresAt - now;
      const percentage = Math.max((left / total) * 100, 0);
      setProgress(percentage);
    }, 1000);

    return () => clearInterval(interval);
  }, [reward.expiresAt]);

  const handleRedeem = () => {
    alert('Reward Redeemed! 🎉');
    // TODO: Call backend to mark reward as redeemed
  };

  return (
    <div className="reward-card">
      <h3>{reward.title}</h3>
      <p>{reward.description}</p>
      <ProgressBar progress={progress} />
      <button onClick={handleRedeem} disabled={progress <= 0}>
        {progress <= 0 ? 'Expired' : 'Redeem Now'}
      </button>
    </div>
  );
};

export default RewardCard;
