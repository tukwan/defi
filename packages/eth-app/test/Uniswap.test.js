const { BN, ether, balance } = require('@openzeppelin/test-helpers')

const SToken = artifacts.require('SToken')
const Uniswap = artifacts.require('Uniswap')

contract('Uniswap', ([deployer, receiver, exchange]) => {
  const myWallet = '0xA01caBAaAf53E2835F89d3CCe25A2242A4abAEF6' // Metamask Rinkebery_1 on ganache-fork
  // const myWallet = deployer // Metamask Rinkebery_1 on ganache-fork

  describe.only('truffle', () => {
    it('deploy test', async () => {
      // Deploy SToken
      const token = await SToken.new({ from: myWallet })
      const tokenAddress = token.address

      // Deploy Uniswap
      const uniswap = await Uniswap.new({ from: myWallet })

      // 1_create_exchange
      await uniswap.createExchange(tokenAddress)

      // 2_get_exchange
      const tokenExchangeAddress = await uniswap.exchangeAddressOf.call(tokenAddress)

      // 3_approve
      const tokensToApprove = ether('20')
      await token.approve(tokenExchangeAddress, tokensToApprove)

      const balance = await token.balanceOf(myWallet)
      console.log('balance token: ', balance.toString())
      console.log('tokenExchangeAddress: ', tokenExchangeAddress)

      // 4_add_liquidity
      const tokensToAdd = ether('10')
      const ethToAdd = ether('0.1')
      await uniswap.addLiquidity(tokenAddress, tokensToAdd, { value: ethToAdd, from: myWallet })

      // 5_swap_eth_token

      // 6_swap_token_token
    })
  })
})
