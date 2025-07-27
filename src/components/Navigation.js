import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <h1>ECOPORT<span role="img" aria-label="Earth">🌍</span></h1>
          </Link>
        </div>

        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                <span className="nav-icon">🏠</span>
                Home
              </Link>
              
              <Link 
                to="/user" 
                className={`nav-link ${location.pathname === '/user' ? 'active' : ''}`}
              >
                <span className="nav-icon">📊</span>
                Dashboard
              </Link>
              
              <Link 
                to="/rewards" 
                className={`nav-link ${location.pathname === '/rewards' ? 'active' : ''}`}
              >
                <span className="nav-icon">🎁</span>
                Rewards
              </Link>
              
              <button onClick={handleLogout} className="nav-link logout-btn">
                <span className="nav-icon">🚪</span>
                Logout
              </button>
            </>
          ) : (
            <Link to="/auth" className="nav-link auth-link">
              <span className="nav-icon">🔐</span>
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 