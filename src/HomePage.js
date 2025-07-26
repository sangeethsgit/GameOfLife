import React, { useState } from 'react';
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

  const handleSearch = (e) => {
    e.preventDefault();
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
        <h1>ECOPORT<span role="img" aria-label="Earth">🌍</span></h1>
        <p>Smart, sustainable transit across Kochi</p>
      </header>

      <main className="main-content">
        <section className="form-section">
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
              {isLoading ? "Searching..." : "Find Routes"}
            </button>

            {error && <div className="error">{error}</div>}
          </form>
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
