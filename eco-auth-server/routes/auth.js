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

// POST /api/auth/verify
router.post("/verify", async (req, res) => {
  const { address, signature } = req.body;

  const nonce = getNonce(address);
  if (!verifyNonce(address, nonce)) {
    return res.status(400).json({ success: false, message: "Invalid nonce" });
  }

  try {
    const recovered = ethers.verifyMessage(nonce, signature); // ethers v6
    if (recovered.toLowerCase() === address.toLowerCase()) {
      clearNonce(address);
      // You can now create a JWT or session
      return res.json({ success: true, address });
    } else {
      return res.status(401).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;