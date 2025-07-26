import express from "express";
import { ethers } from "ethers";
import { getNonce, verifyNonce, clearNonce } from "../utils/nonceStore.js";

const router = express.Router();

// GET /api/auth/nonce?address=0x...
router.get("/nonce", (req, res) => {
  const { address } = req.query;
  if (!address) return res.status(400).json({ error: "Address required" });
  const nonce = getNonce(address);
  res.json({ nonce });
});

// POST /api/auth/metamask-login - Simple login with message signing
router.post("/metamask-login", async (req, res) => {
  const { address, signature } = req.body;

  if (!address || !signature) {
    return res.status(400).json({ error: "Address and signature required" });
  }

  try {
    const message = "Log in to ECOPORT";
    const recovered = ethers.verifyMessage(message, signature);
    
    if (recovered.toLowerCase() === address.toLowerCase()) {
      // Create a simple token (in production, use JWT)
      const token = `token_${Date.now()}_${address}`;
      return res.json({ 
        success: true, 
        token,
        address,
        message: "Login successful"
      });
    } else {
      return res.status(401).json({ error: "Invalid signature" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
});

// POST /api/auth/verify
router.post("/verify", async (req, res) => {
  const { address, signature } = req.body;

  if (!address || !signature) {
    return res.status(400).json({ success: false, message: "Address and signature required" });
  }

  const storedNonce = getNonce(address);
  if (!storedNonce) {
    return res.status(400).json({ success: false, message: "No nonce found for address" });
  }

  try {
    console.log("Verifying signature for address:", address);
    console.log("Stored nonce:", storedNonce);
    console.log("Signature:", signature);
    
    const recovered = ethers.verifyMessage(storedNonce, signature);
    console.log("Recovered address:", recovered);
    
    if (recovered.toLowerCase() === address.toLowerCase()) {
      clearNonce(address);
      return res.json({ success: true, address });
    } else {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid signature",
        expected: address.toLowerCase(),
        recovered: recovered.toLowerCase()
      });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;