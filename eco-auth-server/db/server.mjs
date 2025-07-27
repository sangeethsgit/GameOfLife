import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';

const app = express();
const db = new Database('dashboard.db');

app.use(cors());
app.use(express.json());

// Helper: Calculate total points (weights: Metro=10, Electric=8, City=6, Water=9, MyByke=5)
function calculatePoints(entry) {
  return (
    entry.metro * 10 +
    entry.electric_bus * 8 +
    entry.city_bus * 6 +
    entry.water_metro * 9 +
    entry.mybyke * 5
  );
}

// GET /dashboard/:wallet_address
app.get('/dashboard/:wallet', (req, res) => {
  const wallet = req.params.wallet;

  const user = db.prepare('SELECT * FROM users WHERE wallet_address = ?').get(wallet);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const rewards = db.prepare(
    `SELECT date, metro, electric_bus, city_bus, water_metro, mybyke
     FROM rewards WHERE user_id = ? ORDER BY date DESC`
  ).all(user.id);

  const rewardsWithPoints = rewards.map(r => ({
    ...r,
    total_points: calculatePoints(r)
  }));

  const leaderboard = db.prepare(`
    SELECT users.name, SUM(metro) AS metro, SUM(electric_bus) AS electric_bus,
           SUM(city_bus) AS city_bus, SUM(water_metro) AS water_metro, SUM(mybyke) AS mybyke
    FROM rewards
    JOIN users ON rewards.user_id = users.id
    GROUP BY users.id
  `).all().map(entry => ({
    name: entry.name,
    total_points: calculatePoints(entry)
  }));

  res.json({
    user: { id: user.id, name: user.name },
    rewards: rewardsWithPoints,
    leaderboard
  });
});

// GET /challenges
app.get('/challenges', (req, res) => {
  const challenges = db.prepare(`SELECT * FROM challenges WHERE status = 'active'`).all();
  res.json(challenges);
});

// POST /challenges
app.post('/challenges', (req, res) => {
  const { name, creator_wallet, participant_wallets, deposit_eth } = req.body;

  const user = db.prepare('SELECT id FROM users WHERE wallet_address = ?').get(creator_wallet);
  if (!user) return res.status(400).json({ error: 'Invalid creator wallet' });

  const insert = db.prepare(`
    INSERT INTO challenges (name, creator_id, participant_wallets, deposit_eth)
    VALUES (?, ?, ?, ?)
  `);
  const result = insert.run(name, user.id, participant_wallets.join(','), deposit_eth);

  res.json({ success: true, id: result.lastInsertRowid });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
