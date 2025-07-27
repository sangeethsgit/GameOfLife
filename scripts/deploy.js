async function main() {
  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("EcoScoreToken");
  const token = await Token.deploy();

  console.log(`Token deployed to: ${token.target}`);

  const System = await ethers.getContractFactory("EcoScoreSystem");
  const system = await System.deploy(token.target);

  console.log(`EcoScoreSystem deployed to: ${system.target}`);

  await token.transferOwnership(system.target);
  console.log(`Ownership of token transferred to EcoScoreSystem`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
