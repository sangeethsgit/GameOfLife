
// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import VerifierDashboard from './pages/VerifierDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/verifier" element={<VerifierDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import HomePage from './HomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;

