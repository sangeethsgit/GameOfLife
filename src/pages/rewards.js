import React, { useEffect, useState } from 'react';
import RewardCard from './RewardCard';
import './rewards.css';

const scoreMap = {
  'MyByk 🚴‍♂️': 12,
  'Kochi Metro 🚇': 10,
  'Electric Bus ⚡️🚌': 8,
  'Water Metro 🚤': 7,
  'City Bus 🚌': 4,
};

const rewardLevels = [
  {
    threshold: 12,
    title: '🚴‍♂️ Eco Champion!',
    description: 'Amazing! You earned the highest score by choosing the most eco-friendly option. Enjoy 2 free rides!',
  },
  { threshold: 10, title: '🎁 Free Ride Earned!', description: 'You have earned a free ride. Redeem within 24 hours!' },
  { threshold: 8, title: '✨ 50% Off Next Ride', description: 'Enjoy 50% off your next trip. Keep choosing green!' },
  { threshold: 6, title: '👏 Green Star Badge', description: 'Nice choice! You earned a green badge!' },
  { threshold: 0, title: '🚶 Keep Riding Green', description: 'Choose eco-friendly modes to unlock rewards!' }
];

const RewardsPage = () => {
  const [reward, setReward] = useState(null);

  useEffect(() => {
    const selectedRoute = JSON.parse(localStorage.getItem('eco-choice'));  //{ mode: 'MyByk 🚴‍♂️' }; 
    if (!selectedRoute || !selectedRoute.mode) {
      setReward(rewardLevels[rewardLevels.length - 1]); // fallback message
      return;
    }

    const points = scoreMap[selectedRoute.mode] || 0;

    // Determine appropriate reward based on score
    const matchedReward =
      rewardLevels.find(r => points >= r.threshold) || rewardLevels[rewardLevels.length - 1];;

    setReward({
      ...matchedReward,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 // 24 hours from now
    });
  }, []);

  return (
    <div className="rewards-container">
      <h2>Your Rewards</h2>
      {reward ? <RewardCard reward={reward} /> : <p>Loading reward...</p>}
    </div>
  );
};

export default RewardsPage;
