const nonces = new Map();

export function getNonce(address) {
  const nonce = `Login to EcoApp at ${Date.now()}`;
  nonces.set(address.toLowerCase(), nonce);
  return nonce;
}

export function verifyNonce(address, nonce) {
  return nonces.get(address.toLowerCase()) === nonce;
}

export function clearNonce(address) {
  nonces.delete(address.toLowerCase());
}