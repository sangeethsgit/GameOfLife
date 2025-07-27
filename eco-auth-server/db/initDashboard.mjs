import Database from 'better-sqlite3';
const db = new Database('dashboard.db');

// Drop existing tables in correct order (dev-only)
db.exec(`DROP TABLE IF EXISTS challenges`);
db.exec(`DROP TABLE IF EXISTS rewards`);
db.exec(`DROP TABLE IF EXISTS users`);

// Create Users Table
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    wallet_address TEXT UNIQUE NOT NULL
  );
`);

// Create Rewards Table
db.exec(`
  CREATE TABLE rewards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date TEXT,
    metro INTEGER DEFAULT 0,
    electric_bus INTEGER DEFAULT 0,
    city_bus INTEGER DEFAULT 0,
    water_metro INTEGER DEFAULT 0,
    mybyke INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Create Challenges Table
db.exec(`
  CREATE TABLE challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    creator_id INTEGER,
    participant_wallets TEXT,
    deposit_eth REAL,
    status TEXT DEFAULT 'active',
    FOREIGN KEY (creator_id) REFERENCES users(id)
  );
`);

// Insert Users
const users = db.prepare(`
  INSERT INTO users (name, wallet_address) VALUES (?, ?)
`);
const userData = [
  ['You', '0xYou123'],
  ['Anjali', '0xAnjali456'],
  ['Ravi', '0xRavi789'],
  ['Nila', '0xNila321'],
  ['Farhan', '0xFarhan654']
];
userData.forEach(u => users.run(...u));

// Insert Rewards
const getUserId = db.prepare(`SELECT id FROM users WHERE name = ?`);

const rewards = db.prepare(`
  INSERT INTO rewards (user_id, date, metro, electric_bus, city_bus, water_metro, mybyke)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

// Add rewards for all users with random data
const dates = ['2025-07-23', '2025-07-24', '2025-07-25'];
const allUsers = ['You', 'Anjali', 'Ravi', 'Nila', 'Farhan'];

for (const userName of allUsers) {
  const userId = getUserId.get(userName).id;
  
  for (const date of dates) {
    const metro = Math.floor(Math.random() * 3);
    const electric = Math.floor(Math.random() * 2);
    const city = Math.floor(Math.random() * 2);
    const water = Math.floor(Math.random() * 2);
    const mybyke = Math.floor(Math.random() * 2);

    rewards.run(userId, date, metro, electric, city, water, mybyke);
  }
}

// Insert a mock challenge
const insertChallenge = db.prepare(`
  INSERT INTO challenges (name, creator_id, participant_wallets, deposit_eth)
  VALUES (?, ?, ?, ?)
`);

insertChallenge.run('Green Race', getUserId.get('You').id, '0xAnjali456,0xRavi789', 0.05);

console.log('📦 Dashboard database initialized.');
  