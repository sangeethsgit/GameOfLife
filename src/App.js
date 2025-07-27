// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserDashboard from './pages/UserDashboard';
import VerifierDashboard from './pages/VerifierDashboard';
import Rewards from './pages/rewards';
import Payment from './pages/PaymentsPage';
function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/verifier" element={<VerifierDashboard />} />
        <Route path="/rewards" element={<Rewards/>} />
        <Route path="/user" element={<UserDashboard/>} />
        <Route path="/pay" element={<Payment/>} />

      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;