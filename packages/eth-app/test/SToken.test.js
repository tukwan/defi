// const { BN, ether, balance } = require('@openzeppelin/test-helpers')

const SToken = artifacts.require('SToken')

contract('SToken', ([deployer, user]) => {

  it('should pass the test', async () => {
    const sToken = await SToken.new({ from: deployer })
    const result = await sToken.name()


    // // mint for free - only owner
    // ;(await sToken.balanceOf(user)).should.bignumber.equal('0')
    // await sToken.mint(user, 100, { from: owner })
    // ;(await sToken.balanceOf(user)).should.bignumber.equal('100')

    // mint for eth
    // const balanceUserBefore = await balance.current(user, 'ether')
    // console.log(balanceUserBefore.toString())
    const balance = await sToken.balanceOf(user)
    expect(balance.toNumber()).to.equal(0)

    // await sToken.mintForEth(user, 100, { from: user, value: ether('5') })
    // ;(await sToken.balanceOf(user)).should.bignumber.equal('100')
    // const balanceTokenEth = await balance.current(sToken.address, 'ether')
    // console.log(balanceTokenEth.toString())

    // const balanceUserAfter = await balance.current(user, 'ether')
  })
})
