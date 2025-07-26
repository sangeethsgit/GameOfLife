const hre = require("hardhat");

async function main() {
  const EcoToken = await hre.ethers.getContractFactory("EcoToken");
  const ecoToken = await EcoToken.deploy();

  console.log("EcoToken deployed to:", await ecoToken.getAddress());
  console.log(`✅ EcoToken deployed at: ${ecoToken.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
