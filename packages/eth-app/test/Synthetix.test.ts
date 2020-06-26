// ganache-cli --fork https://mainnet.infura.io/v3/d2b6be223087401fb875522c75d84571 --unlock 0x197c92e5a3f7c40e657ff6e8277d45a87e76b072 -i 777 -p 8777
const legos = require('@studydefi/money-legos').legos

const UniswapFactory = artifacts.require('IUniswapFactory')
const UniswapExchange = artifacts.require('IUniswapExchange')
const IERC20 = artifacts.require('IERC20')

contract('Synthetix', ([deployer]) => {
  const wallet = '0x197c92e5a3f7c40e657ff6e8277d45a87e76b072' // random mainnet wallet

  it('get some SNX from Uniswap', async () => {
    const snxToken = await IERC20.at(legos.erc20.snx.address)
    const uniswapFactory = await UniswapFactory.at(legos.uniswap.factory.address)
    const snxExchangeAddress = await uniswapFactory.getExchange(snxToken.address)
    const snxExchange = await UniswapExchange.at(snxExchangeAddress)

    // before
    const snxBefore = await snxToken.balanceOf(wallet)
    expect(snxBefore.toString()).to.equal('0')

    // swap
    const ethToSell = toWei('5')
    const expectedSnx = await snxExchange.getEthToTokenInputPrice(ethToSell)
    const min = 1
    const deadline = 2525644800
    await snxExchange.ethToTokenSwapInput(min, deadline, { gasLimit: 4000000, value: ethToSell, from: wallet })

    // after
    const snxAfter = await snxToken.balanceOf(wallet)
    expect(fromWei(snxAfter)).to.equal(fromWei(expectedSnx))
  })
})

// helpers
const toWei = x => web3.utils.toWei(x, 'ether')
const fromWei = x => web3.utils.fromWei(x, 'ether')
