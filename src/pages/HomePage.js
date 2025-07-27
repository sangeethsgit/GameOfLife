import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const kochiPlaces = [
  "Fort Kochi", "Marine Drive", "Edappally", "Kakkanad", "Aluva",
  "Vyttila Hub", "Mattancherry", "Palarivattom", "Kaloor", "InfoPark", "Wonderla"
];

function HomePage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { isAuthenticated, userAddress, logout } = useAuth();

  const handleLogout = () => {
    logout();
    // Clear form when logging out
    setFrom('');
    setTo('');
    setRoutes([]);
    setError('');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please login first to search for routes.');
      return;
    }
    if (!from || !to) {
      setError('Please select both a starting and destination point.');
      return;
    }
    if (from === to) {
      setError('"From" and "To" locations cannot be the same.');
      return;
    }

    setIsLoading(true);
    setRoutes([]);
    setError('');

    const mockRoutes = [
  { id: 0, mode: 'MyByk 🚴‍♂️', duration: '25 mins', price: 10, eco: '🌟 Ultra' }, // new most eco-friendly option
  { id: 1, mode: 'Kochi Metro 🚇', duration: '30 mins', price: 40, eco: '🌿 High' },
  { id: 2, mode: 'Electric Bus ⚡️🚌', duration: '45 mins', price: 25, eco: '🌱 High' },
  { id: 3, mode: 'City Bus 🚌', duration: '50 mins', price: 20, eco: '🌾 Medium' },
  { id: 4, mode: 'Water Metro 🚤', duration: '35 mins', price: 30, eco: '🌿 High' }
];

    setTimeout(() => {
      setRoutes(mockRoutes);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="top-bar">
          <h1>ECOPORT</h1>
          {isAuthenticated ? (
            <div className="auth-section">
              <span className="user-address">
                {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
              </span>
              <button className="auth-button logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <button className="auth-button">Login / Register</button>
            </Link>
          )}
        </div>
        <p>Smart, sustainable transit across Kochi</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          {!isAuthenticated ? (
            <div className="login-prompt">
              <h2>Welcome to ECOPORT!</h2>
              <p>Please login or register to start planning your eco-friendly journey.</p>
              <Link to="/auth">
                <button className="auth-button large">Login / Register</button>
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSearch} className="search-form">
                <div className="field">
                  <label htmlFor="from">From</label>
                  <select id="from" value={from} onChange={(e) => setFrom(e.target.value)}>
                    <option value="">Select starting point</option>
                    {kochiPlaces.map(place => (
                      <option key={place} value={place}>{place}</option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="to">To</label>
                  <select id="to" value={to} onChange={(e) => setTo(e.target.value)}>
                    <option value="">Select destination</option>
                    {kochiPlaces.map(place => (
                      <option key={place} value={place}>{place}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Searching..." : "View Transport Modes"}
                </button>

                {error && <div className="error">{error}</div>}
              </form>
              <Link to="/rewards" style={{ textDecoration: 'none' }}>
                <button type="button" className="reward-button">
                  🎁 See Rewards
                </button>
              </Link>
            </>
          )}
        </section>

        <section className="results">
          {isLoading && (
            <div className="card loading">
              <div className="text shimmer" style={{ width: "70%" }}></div>
              <div className="text shimmer" style={{ width: "40%" }}></div>
            </div>
          )}

          {!isLoading && routes.length > 0 && (
            <>
              <h2 className="section-title">Available Routes</h2>
              <div className="route-list">
                {routes.map(route => (
                  <div className="card" key={route.id}>
                    <div className="info">
                      <h3>{route.mode}</h3>
                      <p>{route.duration} • {route.eco}</p>
                    </div>
                    <div className="price">₹{route.price}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default HomePage;