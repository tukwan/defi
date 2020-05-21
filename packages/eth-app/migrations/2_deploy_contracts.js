//yarn truffle-flattener contracts/SToken.sol > STokenflat.sol
const SToken = artifacts.require('SToken')

module.exports = async function(deployer, _network, accounts) {
  await deployer.deploy(SToken)
}
