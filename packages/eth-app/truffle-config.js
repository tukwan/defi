require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')

const { INFURA_PROJECT_ID, MNEMONIC, PRIVATE_KEY_RINKEBY } = process.env

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      skipDryRun: true
    },
    test: {
      host: '127.0.0.1',
      port: 8777,
      network_id: 777
    },
    rinkeby: {
      provider: () => new HDWalletProvider(PRIVATE_KEY_RINKEBY, 'https://rinkeby.infura.io/v3/' + INFURA_PROJECT_ID),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000,
      skipDryRun: true
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, 'https://ropsten.infura.io/v3/' + INFURA_PROJECT_ID)
      },
      network_id: '3',
      gas: 4465030,
      gasPrice: 10000000000
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, 'https://kovan.infura.io/v3/' + INFURA_PROJECT_ID)
      },
      network_id: '42',
      gas: 4465030,
      gasPrice: 10000000000
    },
    main: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://mainnet.infura.io/v3/' + INFURA_PROJECT_ID),
      network_id: 1,
      gas: 3000000,
      gasPrice: 10000000000
    }
  },
  plugins: ['solidity-coverage'],
  mocha: {
    enableTimeouts: false
  },
  compilers: {
    solc: {
      version: '0.6.7',
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  }
}
