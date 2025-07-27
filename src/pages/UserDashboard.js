// import React from 'react';
// import RewardsTable from './RewardsTable';
// import CommunityGraph from './CommunityGraph';
// import './dashboard.css';
// import { userRewards, communityData } from './sampleUserData';

// const UserDashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <h2>Welcome, User!</h2>
//       <section>
//         <h3>Your Daily Rewards</h3>
//         <RewardsTable rewards={userRewards} />
//       </section>
//       <section>
//         <h3>Community Challenge</h3>
//         <CommunityGraph data={communityData} />
//       </section>
//     </div>
//   );
// };

// export default UserDashboard;



import React, { useState } from 'react';
import RewardsTable from './RewardsTable';
import CommunityGraph from './CommunityGraph';
import DisclaimerPopup from './DisclaimerPopup';
import './dashboard.css';
import { userRewards, communityData } from './sampleUserData';

const UserDashboard = () => {
  const [challenges, setChallenges] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [newChallenge, setNewChallenge] = useState(null);

  // Handle challenge form submission
  const handleCreateChallenge = (e) => {
    e.preventDefault();
    const form = e.target;
    const challenge = {
      name: form.challengeName.value,
      deposit: form.deposit.value,
      invitees: form.invitees.value.split(',').map(id => id.trim())
    };
    setNewChallenge(challenge);
    setShowDisclaimer(true); // show warning
  };

  const confirmChallenge = () => {
    setChallenges(prev => [...prev, newChallenge]);
    setShowDisclaimer(false);
    setNewChallenge(null);
    alert("✅ Challenge created and invites sent!");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, User!</h2>

      {/* Section 1: Daily Rewards */}
      <section>
        <h3>Your Daily Rewards</h3>
        <RewardsTable rewards={userRewards} />
      </section>

      {/* Section 2: Community Leaderboard */}
      <section>
        <h3>Community Leaderboard</h3>
        <CommunityGraph data={communityData} />
      </section>

      {/* Section 3: Create Challenge */}
      <section className="challenge-section">
        <h3>Create Community Challenge</h3>
        <form onSubmit={handleCreateChallenge} className="challenge-form">
          <input type="text" name="challengeName" placeholder="Challenge Name" required />
          <input type="text" name="invitees" placeholder="MetaMask IDs (comma-separated)" required />
          <input type="number" name="deposit" placeholder="Deposit (ETH)" step="0.01" required />
          <button type="submit">Create Challenge</button>
        </form>
      </section>

      {/* Section 4: Active Challenges */}
      <section className="challenge-list">
        <h3>Active Challenges</h3>
        {challenges.length === 0 ? (
          <p>No active challenges yet.</p>
        ) : (
          <ul>
            {challenges.map((c, i) => (
              <li key={i}>
                <strong>{c.name}</strong> — {c.invitees.length} invited — Deposit: {c.deposit} ETH
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Section 5: Disclaimer Popup */}
      {showDisclaimer && (
        <DisclaimerPopup
          onAccept={confirmChallenge}
          onCancel={() => setShowDisclaimer(false)}
        />
      )}
    </div>
  );
};

export default UserDashboard;
