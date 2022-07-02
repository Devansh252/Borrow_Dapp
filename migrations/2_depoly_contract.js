const StableToken = artifacts.require("StableToken");
const CypherToken = artifacts.require("CypherToken");

const Vault = artifacts.require("Vault");

module.exports = async function(deployer, network, accounts) {
  //Deploy DAI Token
  await deployer.deploy(CypherToken);
  const cypherToken = await CypherToken.deployed();

  await deployer.deploy(StableToken);
  const stableToken = await StableToken.deployed();

  await deployer.deploy(Vault, stableToken.address, cypherToken.address);
  const vault = await Vault.deployed();

  await stableToken.transfer(vault.address, "1000000000000000000000000");

  await cypherToken.transfer(accounts[1], "1000000000000000000000000");
};
