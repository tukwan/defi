require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const privateKeys = process.env.PRIVATE_KEYS || ''

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(','), //TO UPDATE - arr of account private keys
          `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`, //TO UPDATE - url to an ethereum node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42,
    }
  },
  plugins: ['solidity-coverage'],
  contracts_directory: './contracts',
  contracts_build_directory: './abis',
  compilers: {
    solc: {
      // version: '0.5.0',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}
