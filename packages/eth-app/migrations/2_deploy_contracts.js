// truffle migrate --reset
// truffle migrate --network rinkeby
// yarn truffle-flattener contracts/SToken.sol > STokenflat.sol
// const { BN, ether, time } = require('@openzeppelin/test-helpers')
// ganache-cli --fork https://rinkeby.infura.io/v3/d2b6be223087401fb875522c75d84571 --unlock 0xA01caBAaAf53E2835F89d3CCe25A2242A4abAEF6

const SToken = artifacts.require('SToken')
const Uniswap = artifacts.require('Uniswap')

module.exports = async function(deployer, _network, accounts) {
  // const myWallet = accounts[0] // Metamask Rinkebery_1 on --network rinkebery
  const myWallet = '0xA01caBAaAf53E2835F89d3CCe25A2242A4abAEF6' // Metamask Rinkebery_1 on ganache-fork

  // Balances
  // const myBalanceWei = await web3.eth.getBalance(myWallet)
  // const myBalance = web3.utils.fromWei(myBalanceWei, 'ether')
  // console.log(`Wallet balance: ${myBalance} ETH`)
  // console.log(`URL: https://rinkeby.etherscan.io/tx/${SToken.transactionHash}`)

  // Deploy SToken
  await deployer.deploy(SToken, { from: myWallet })
  const sToken = await SToken.deployed()

  // Deploy Uniswap
  await deployer.deploy(Uniswap, { from: myWallet })
  const uniswap = await Uniswap.deployed()

  // 1_create_exchange
  await uniswap.createExchange(sToken.address)

  // 2_get_exchange
  const tokenExchangeAddress = await uniswap.getExchange(sToken.address)
  console.log(`Token exchange address: https://rinkeby.etherscan.io/address/${tokenExchangeAddress}`)

  // 3_approve

  // 4_add_liquidity

  // 5_swap_eth_token

  // 6_swap_token_token
}
