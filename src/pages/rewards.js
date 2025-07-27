// src/pages/RewardsPage.js
import React from 'react';
import RewardCard from './RewardCard';
import './rewards.css';

const RewardsPage = () => {
  const reward = {
    title: 'Free Ride Earned!',
    description: 'You have earned a free ride. Redeem within 24 hours!',
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 // 24 hours from now
  };

  return (
    <div className="rewards-container">
      <h2>Your Rewards</h2>
      <RewardCard reward={reward} />
    </div>
  );
};

export default RewardsPage;
