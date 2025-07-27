import React, { useState } from "react";
import axios from "axios";
// import "./Homepage.css";  // For CSS variables and shared styles
import "./AuthPage.css";  // Your new auth page styles

const LoginWithMetaMask = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      setError("MetaMask not detected. Please install it.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setAddress(account);
      setError("");
      await loginWithMetaMask(account);
    } catch (err) {
      console.error(err);
      setError("User denied wallet connection.");
    }
  };

  const loginWithMetaMask = async (account) => {
    try {
      // Step 1: Get nonce from server
      const { data } = await axios.get(
        `http://localhost:5000/api/auth/nonce?address=${account}`
      );
      const nonce = data.nonce;

      // Step 2: Ask MetaMask to sign the nonce
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [nonce, account], // [message, address]
      });

      // Step 3: Send address and signature to backend for verification
      const response = await axios.post("http://localhost:5000/api/auth/verify", {
        address: account,
        signature,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        // Optional: redirect user after login
        // window.location.href = "/";
      } else {
        setError(response.data.message || "Signature verification failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        setError(err.response.data.message || err.response.data.error || "Login failed.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to ECOPORT</h2>

      {!address ? (
        <button onClick={connectWallet}>Connect MetaMask Wallet</button>
      ) : (
        <button disabled title={address}>
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </button>
      )}

      {error && <p className="error">{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginWithMetaMask;
