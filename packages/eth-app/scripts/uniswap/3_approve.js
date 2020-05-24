// Approve Tokens to be spend on exchange
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

// txData: consts
const addressFrom = '0xA01caBAaAf53E2835F89d3CCe25A2242A4abAEF6' // Metamask Rinkebery_1
const addressFromPrivateKey = PRIVATE_KEY_RINKEBY
const addressToken = '0xEee19F7bEfc27CD68Fcc5c8f09c983887bAF8072' // SToken
const addressExchange = '0xc17202D7EBA454eE119540175C5eD6C4A154468e' // Token Exchange contract
const tokensToApprove = web3.utils.toWei('20', 'ether') // Approve 20 STokens
// txData: data:encodeABI
const contractLoader = setupLoader({ provider: web3 })
const sToken = contractLoader.web3.fromArtifact('SToken')
const encodedABI = sToken.methods.approve(addressExchange, tokensToApprove).encodeABI()


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
    to: addressToken,
    gasLimit: web3.utils.toHex(1e6),
    gasPrice: web3.utils.toHex(gasPrices.high * 1e9),
    nonce: nonce,
    chainId: 4,
    data: encodedABI
  }

  const tx = new Tx(txData, { chain: 'rinkeby' })
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
