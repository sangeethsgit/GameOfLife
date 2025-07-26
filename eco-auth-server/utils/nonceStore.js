const nonces = new Map();
import crypto from "crypto";

export function getNonce(address) {
  let nonce = nonces.get(address.toLowerCase());
  if (!nonce) {
    // Generate a more user-friendly nonce
    nonce = `Login to ECOPORT - Nonce: ${crypto.randomBytes(8).toString("hex")}`;
    nonces.set(address.toLowerCase(), nonce);
  }
  return nonce;
}

export function verifyNonce(address, nonce) {
  return nonces.get(address.toLowerCase()) === nonce;
}

export function clearNonce(address) {
  nonces.delete(address.toLowerCase());
}