//truffle exec scripts/seed.js
//truffle exec scripts/seed.js --network kovan
const Token = artifacts.require('Token')

module.exports = async function (callback) {
  try {
    // fetch accounts from wallet - these are unlocked
    const accounts = await web3.eth.getAccounts()
    //fetch the deployed token
    const token = await Token.deployed()
    console.log('Token fetched ', token.address)
  }
  catch (error) {
    console.log(error)
  }

  callback()
}

