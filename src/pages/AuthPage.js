// // src/pages/AuthPage.js
// import React, { useState } from 'react';
// import { ethers } from 'ethers';

// function AuthPage() {
//   const [account, setAccount] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   async function connectWallet() {
//     if (!window.ethereum) {
//       setError("MetaMask not detected. Please install it.");
//       return;
//     }
//     try {
//       setLoading(true);
//       setError('');
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const accounts = await provider.send("eth_requestAccounts", []);
//       setAccount(accounts[0]);
//     } catch (err) {
//       console.error("Wallet connection error:", err);
//       setError("Wallet connection failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function signMessageAndLogin() {
//     if (!account) {
//       setError("Connect your wallet first.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError('');
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const message = "Log in to ECOPORT";
//       const signature = await signer.signMessage(message);

//       const response = await fetch('http://localhost:5000/api/auth/metamask-login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ address: account, signature }),
//       });

//       const data = await response.json();

//       if (response.ok && data.token) {
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('userAddress', account);
//         alert('Login successful!');
//         // You can redirect to dashboard here
//         window.location.href = '/dashboard';
//       } else {
//         setError(data.error || 'Login failed.');
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Signing or login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Login with MetaMask</h2>

//       {!account ? (
//         <button 
//           onClick={connectWallet} 
//           disabled={loading}
//           style={{ 
//             padding: '10px 20px', 
//             fontSize: '16px', 
//             cursor: loading ? 'not-allowed' : 'pointer',
//             backgroundColor: loading ? '#ccc' : '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px'
//           }}
//         >
//           {loading ? 'Connecting...' : 'Connect Wallet'}
//         </button>
//       ) : (
//         <>
//           <p>Connected: {account}</p>
//           <button 
//             onClick={signMessageAndLogin} 
//             disabled={loading}
//             style={{ 
//               padding: '10px 20px', 
//               fontSize: '16px', 
//               cursor: loading ? 'not-allowed' : 'pointer',
//               backgroundColor: loading ? '#ccc' : '#28a745',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px'
//             }}
//           >
//             {loading ? 'Signing...' : 'Sign Message & Login'}
//           </button>
//         </>
//       )}

//       {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//     </div>
//   );
// }

// export default AuthPage;

import React, { useState, useEffect } from "react";
import axios from "axios";

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
      console.log("Connected account:", account);
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
      const { data } = await axios.get(`http://localhost:5000/api/auth/nonce?address=${account}`);
      const nonce = data.nonce;
      console.log("Nonce to sign:", nonce);

      // Step 2: Ask MetaMask to sign the nonce
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [nonce, account], // [message, address]
      });
      console.log("Signature:", signature);

      // Step 3: Send address and signature to backend for verification
      const response = await axios.post("http://localhost:5000/api/auth/verify", {
        address: account,
        signature,
      });

      console.log("Verification response:", response.data);

      if (response.data.success) {
        setMessage(`Logged in as ${response.data.address}`);
        localStorage.setItem('userAddress', account);
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        setError(response.data.message || "Signature verification failed.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        console.error("Server response:", err.response.data);
        setError(err.response.data.message || err.response.data.error || "Login failed.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Login with MetaMask</h2>
      {address ? (
        <p>Connected: {address}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginWithMetaMask;
