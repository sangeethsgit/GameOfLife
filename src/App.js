
// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import VerifierDashboard from './pages/VerifierDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/verifier" element={<VerifierDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;