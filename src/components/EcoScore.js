// src/components/EcoScore.js
import React from 'react';

const badges = [
  { threshold: 50, name: 'Eco Novice', emoji: '🌱' },
  { threshold: 100, name: 'Eco Warrior', emoji: '🌿' },
  { threshold: 200, name: 'Eco Champion', emoji: '🌳' },
];

export default function EcoScore({ score }) {
  // Find highest badge for score
  const earnedBadge = badges.slice().reverse().find(b => score >= b.threshold);

  return (
    <div style={{
      padding: '10px',
      background: '#e6f2f0',
      borderRadius: '10px',
      marginBottom: '20px',
      maxWidth: '300px'
    }}>
      <h3>Your Eco Score: {score}</h3>
      {earnedBadge ? (
        <p>
          Badge Earned: {earnedBadge.emoji} <strong>{earnedBadge.name}</strong>
        </p>
      ) : (
        <p>Keep going to earn badges!</p>
      )}
    </div>
  );
}
