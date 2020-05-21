const resolve = require('path').resolve
require('dotenv').config({ path: resolve(__dirname, '../.env') })
const Web3 = require('web3')
const axios = require('axios')
const Tx = require('ethereumjs-tx').Transaction
const { setupLoader } = require('@openzeppelin/contract-loader')

// connect to Ethereum
const { INFURA_PROJECT_ID, PRIVATE_KEY_RINKEBY } = process.env
const chainRinkeby = `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`
const web3 = new Web3(new Web3.providers.HttpProvider(chainRinkeby))

console.log('INFURA_PROJECT_ID', INFURA_PROJECT_ID)
// txData: consts
const addressFrom = '0xA01caBAaAf53E2835F89d3CCe25A2242A4abAEF6' // Metamask Rinkebery_1
const addressFromPrivateKey = PRIVATE_KEY_RINKEBY
const addressTo = '0xEee19F7bEfc27CD68Fcc5c8f09c983887bAF8072' // SToken
const recipientAddress = '0x1Da897E2C64a273c8B6Af30966F9dE2Df65E6F10' // Metamask Rinkebery_2
const amountToSend = web3.utils.toWei('0.05', 'ether')
const tokensToMint = web3.utils.toWei('1', 'ether') // 1 token = 1 eth (18 decimals)
// txData: data:encodeABI
const contractLoader = setupLoader({ provider: web3 })
const sToken = contractLoader.web3.fromArtifact('SToken')
const encodedABI = sToken.methods.mintForEth(recipientAddress, tokensToMint).encodeABI()

// send signed raw transaction
const sendTx = async () => {
  const myBalanceWei = await web3.eth.getBalance(addressFrom)
  const myBalance = web3.utils.fromWei(myBalanceWei, 'ether')
  console.log(`Wallet balance: ${myBalance} ETH`)

  // get increased sender's nonce
  const nonce = await web3.eth.getTransactionCount(addressFrom)
  console.log(`Outgoing transaction count/nonce: ${nonce}`)

  const gasPrices = await getCurrentGasPrices()

  const txData = {
    from: addressFrom,
    to: addressTo,
    gasLimit: web3.utils.toHex(1e6),
    gasPrice: web3.utils.toHex(gasPrices.high * 1e9), // gwei -> wei
    nonce: nonce,
    chainId: 4, // EIP 155 - mainnet: 1, rinkeby: 4
    data: encodedABI, // send raw data
    value: web3.utils.toHex(amountToSend)
  }

  const tx = new Tx(txData, { chain: 'rinkeby' }) // default mainnet
  // sign tx with privateKey
  tx.sign(Buffer.from(addressFromPrivateKey, 'hex'))
  // serlize to send over a net
  const serializedTransaction = tx.serialize()

  try {
    const result = await web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex'))
    console.log('TX details:')
    console.dir(result)
    console.log(`URL: https://rinkeby.etherscan.io/tx/${result.transactionHash}`)
  } catch (error) {
    console.log(error)
  }
}

// FIRE!!!
sendTx()

// helpers
const getCurrentGasPrices = async () => {
  const response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
  const prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10
  }
  console.log('Current ETH Gas Prices:')
  console.log(`Low: ${prices.low} gwei`)
  console.log(`Standard: ${prices.medium} gwei`)
  console.log(`Fast: ${prices.high} gwei`)
  return prices
}
