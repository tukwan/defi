// Get new Token exchange address
const resolve = require('path').resolve
require('dotenv').config({ path: resolve(__dirname, '../.env') })
const Web3 = require('web3')

// connect to Ethereum
const { INFURA_PROJECT_ID } = process.env
const chainRinkeby = `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`
const web3 = new Web3(new Web3.providers.HttpProvider(chainRinkeby))

const addressUniswapExchangeFactory = '0xf5d915570bc477f9b8d6c0e980aa81757a3aac36'
const addressToken = '0xEee19F7bEfc27CD68Fcc5c8f09c983887bAF8072' // SToken

const uniswapExchangeFactoryABI =
  '[{"name":"NewExchange","inputs":[{"type":"address","name":"token","indexed":true},{"type":"address","name":"exchange","indexed":true}],"anonymous":false,"type":"event"},{"name":"initializeFactory","outputs":[],"inputs":[{"type":"address","name":"template"}],"constant":false,"payable":false,"type":"function","gas":35725},{"name":"createExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":false,"payable":false,"type":"function","gas":187911},{"name":"getExchange","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"token"}],"constant":true,"payable":false,"type":"function","gas":715},{"name":"getToken","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"address","name":"exchange"}],"constant":true,"payable":false,"type":"function","gas":745},{"name":"getTokenWithId","outputs":[{"type":"address","name":"out"}],"inputs":[{"type":"uint256","name":"token_id"}],"constant":true,"payable":false,"type":"function","gas":736},{"name":"exchangeTemplate","outputs":[{"type":"address","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":633},{"name":"tokenCount","outputs":[{"type":"uint256","name":"out"}],"inputs":[],"constant":true,"payable":false,"type":"function","gas":663}]'
const uniswapExchangeFactory = new web3.eth.Contract(
  JSON.parse(uniswapExchangeFactoryABI),
  addressUniswapExchangeFactory
)

;(async () => {
  const result = await uniswapExchangeFactory.methods.getExchange(addressToken).call()
  console.log(result) //Token Exchange: 0xc17202D7EBA454eE119540175C5eD6C4A154468e (IUniswapExchangeInterface)
})()
