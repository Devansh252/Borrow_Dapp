const Vault = artifacts.require("Vault");

module.exports = async function(callback) {
  let tokenFarm = await Vault.deployed();
  await tokenFarm.issueToken();
  console.log("Credited Stable Coins");
  callback();
};
