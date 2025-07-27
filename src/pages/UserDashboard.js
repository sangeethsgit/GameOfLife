// import React from 'react';
// import RewardsTable from './RewardsTable';
// import CommunityGraph from './CommunityGraph';
import './dashboard.css';
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



// import React, { useState } from 'react';
// import RewardsTable from './RewardsTable';
// import CommunityGraph from './CommunityGraph';
// import DisclaimerPopup from './DisclaimerPopup';
// import './dashboard.css';
// import { userRewards, communityData } from './sampleUserData';

// const UserDashboard = () => {
//   const [challenges, setChallenges] = useState([]);
//   const [showDisclaimer, setShowDisclaimer] = useState(false);
//   const [newChallenge, setNewChallenge] = useState(null);

//   // Handle challenge form submission
//   const handleCreateChallenge = (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const challenge = {
//       name: form.challengeName.value,
//       deposit: form.deposit.value,
//       invitees: form.invitees.value.split(',').map(id => id.trim())
//     };
//     setNewChallenge(challenge);
//     setShowDisclaimer(true); // show warning
//   };

//   const confirmChallenge = () => {
//     setChallenges(prev => [...prev, newChallenge]);
//     setShowDisclaimer(false);
//     setNewChallenge(null);
//     alert("✅ Challenge created and invites sent!");
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Welcome, User!</h2>

//       {/* Section 1: Daily Rewards */}
//       <section>
//         <h3>Your Daily Rewards</h3>
//         <RewardsTable rewards={userRewards} />
//       </section>

//       {/* Section 2: Community Leaderboard */}
//       <section>
//         <h3>Community Leaderboard</h3>
//         <CommunityGraph data={communityData} />
//       </section>

//       {/* Section 3: Create Challenge */}
//       <section className="challenge-section">
//         <h3>Create Community Challenge</h3>
//         <form onSubmit={handleCreateChallenge} className="challenge-form">
//           <input type="text" name="challengeName" placeholder="Challenge Name" required />
//           <input type="text" name="invitees" placeholder="MetaMask IDs (comma-separated)" required />
//           <input type="number" name="deposit" placeholder="Deposit (ETH)" step="0.01" required />
//           <button type="submit">Create Challenge</button>
//         </form>
//       </section>

//       {/* Section 4: Active Challenges */}
//       <section className="challenge-list">
//         <h3>Active Challenges</h3>
//         {challenges.length === 0 ? (
//           <p>No active challenges yet.</p>
//         ) : (
//           <ul>
//             {challenges.map((c, i) => (
//               <li key={i}>
//                 <strong>{c.name}</strong> — {c.invitees.length} invited — Deposit: {c.deposit} ETH
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       {/* Section 5: Disclaimer Popup */}
//       {showDisclaimer && (
//         <DisclaimerPopup
//           onAccept={confirmChallenge}
//           onCancel={() => setShowDisclaimer(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const wallet = "0xYou123"; // Logged-in user's wallet

export default function Dashboard() {
  const [rewards, setRewards] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [form, setForm] = useState({ name: "", participants: "", eth: "" });

  useEffect(() => {
    axios.get(`http://localhost:3001/dashboard/${wallet}`)
      .then(res => {
        setRewards(res.data.rewards);
        setLeaderboard(res.data.leaderboard);
      });

    axios.get(`http://localhost:3001/challenges`)
      .then(res => setChallenges(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2>Welcome, User!</h2>

      <h3>Your Daily Rewards</h3>
      <table className="border mt-2">
        <thead>
          <tr>
            <th>Date</th><th>Metro</th><th>Electric Bus</th><th>City Bus</th>
            <th>Water Metro</th><th>MyByke</th><th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {rewards.map((r, idx) => (
            <tr key={idx}>
              <td>{r.date}</td>
              <td>{r.metro}</td>
              <td>{r.electric_bus}</td>
              <td>{r.city_bus}</td>
              <td>{r.water_metro}</td>
              <td>{r.mybyke}</td>
              <td>{r.total_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="mt-8">Community Leaderboard</h3>
      <BarChart width={500} height={250} data={leaderboard}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total_points" fill="#00C49F" />
      </BarChart>
      <h3 className="mt-8">Create Community Challenge</h3>
      <input
        type="text"
        placeholder="Challenge Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="MetaMask IDs (comma-separated)"
        value={form.participants}
        onChange={e => setForm({ ...form, participants: e.target.value })}
      />
      <input
        type="number"
        placeholder="Deposit (ETH)"
        value={form.eth}
        onChange={e => setForm({ ...form, eth: e.target.value })}
      />
      <button
        onClick={() => {
          axios.post('http://localhost:3001/challenges', {
            name: form.name,
            creator_wallet: wallet,
            participant_wallets: form.participants.split(','),
            deposit_eth: parseFloat(form.eth)
          }).then(() => window.location.reload());
        }}
      >Create Challenge</button>

      <h4 className="mt-4">Active Challenges</h4>
      {challenges.length === 0 ? (
        <p>No active challenges yet.</p>
      ) : (
        <ul>
          {challenges.map(c => (
            <li key={c.id}>{c.name} — Stake: {c.deposit_eth} ETH</li>
          ))}
        </ul>
      )}
    </div>
  );
}
