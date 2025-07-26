// src/pages/AuthPage.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import './AuthPage.css';

function AuthPage() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function connectWallet() {
    if (!window.ethereum) {
      setError("MetaMask not detected. Please install it.");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setError('');
    } catch (err) {
      setError("Wallet connection failed.");
    }
  }

  async function signMessageAndLogin() {
    if (!account) {
      setError("Connect your wallet first.");
      return;
    }

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const message = "Log in to ECOPORT";
      const signature = await signer.signMessage(message);

      const response = await fetch('/api/auth/metamask-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: account, signature }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        // Optional: redirect user after login
        // window.location.href = '/';
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError("Signing or login failed.");
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <h2>Login to ECOPORT</h2>

      {!account ? (
        <button onClick={connectWallet}>Connect MetaMask Wallet</button>
      ) : (
        <>
          <p>Connected: {account}</p>
          <button onClick={signMessageAndLogin} disabled={loading}>
            {loading ? 'Signing...' : 'Sign Message & Login'}
          </button>
        </>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default AuthPage;
