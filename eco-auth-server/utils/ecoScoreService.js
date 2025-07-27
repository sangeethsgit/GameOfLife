const { ethers } = require("ethers");
const fs = require("fs");

// Load ABI
const contractJSON = JSON.parse(
  fs.readFileSync("artifacts/contracts/EcoScoreSystem.sol/EcoScoreSystem.json", "utf8")
);

const provider = new ethers.JsonRpcProvider("http://localhost:8545");
const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
const signer = provider.getSigner(); // Use first account

const ecoScoreContract = new ethers.Contract(
  contractAddress,
  contractJSON.abi,
  await signer
);