module.exports = {
  // accounts: {
  //   amount: 10, // Number of unlocked accounts
  //   ether: 100, // Initial balance of unlocked accounts (in ether)
  // },
  contracts: {
    type: 'truffle' // Contract abstraction to use: 'truffle' for @truffle/contract or 'web3' for web3-eth-contract
    // defaultGas: 6e6, // Maximum gas for contract calls (when unspecified)
    // defaultGasPrice: 20e9, // Gas price for contract calls (when unspecified)
    // artifactsDir: './abis', // Directory where contract artifacts are stored
  },
  // blockGasLimit: 8e6, // Maximum gas per block
  node: {
    // Options passed directly to Ganache client
    // fork: 'https://rinkeby.infura.io/v3/d2b6be223087401fb875522c75d84571',
    // unlocked_accounts: ['0xA01caBAaAf53E2835F89d3CCe25A2242A4abAEF6']
  }
}

require('@openzeppelin/test-helpers')
require('chai').should()
