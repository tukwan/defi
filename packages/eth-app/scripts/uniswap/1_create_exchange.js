// Create new exchange - send a signed transaction createExchange to the deployed Uniswap Factory contract
const resolve = require('path').resolve
require('dotenv').config({ path: resolve(__dirname, '../.env') })
const Web3 = require('web3')
const axios = require('axios')
const Tx = require('ethereumjs-tx').Transaction

// connect to Ethereum
const { INFURA_PROJECT_ID, PRIVATE_KEY_RINKEBY } = process.env
const chainRinkeby = `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`
const web3 = new Web3(new Web3.providers.HttpProvider(chainRinkeby))

// txData: consts
const addressFrom = '0xA01caBAaAf53E2835F89d3CCe25A2242A4abAEF6' // Metamask Rinkebery_1
const addressFromPrivateKey = PRIVATE_KEY_RINKEBY
const addressTo = '0xf5d915570bc477f9b8d6c0e980aa81757a3aac36' // UniswapExchangeFactory contract (IUniswapFactoryInterface)
const addressToken = '0xEee19F7bEfc27CD68Fcc5c8f09c983887bAF8072' // SToken
// txData: data:encodeABI
const uniswapExchangeFactoryABI =
  '[{"name":"NewExchange","inputs":[{"type":"address","name":"token","indexed":true},{"type":"address","name":"exchange","indexed":true}],"anonymous":false,"type":"event"},{"name":"initializeFactory","outputs":[],"inputs":[{"type":"address","name":"template"}],"constant":false,"payable":false,"type":"function","gas":35725},{"name":"createExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":false,"payable":false,"type":"function","gas":187911},{"name":"getExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":true,"payable":false,"type":"function","gas":715},{"name":"getToken","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"exchange"}],"constant":true,"payable":false,"type":"function","gas":745},{"name":"getTokenWithId","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"uint256","name":"token_id"}],"constant":true,"payable":false,"type":"function","gas":736},{"name":"exchangeTemplate","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":633},{"name":"tokenCount","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":663}]'
const uniswapExchangeFactory = new web3.eth.Contract(JSON.parse(uniswapExchangeFactoryABI))
const encodedABI = uniswapExchangeFactory.methods.createExchange(addressToken).encodeABI()

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
