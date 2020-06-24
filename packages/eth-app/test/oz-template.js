// // OZ TESTS
// const { accounts, contract, web3 } = require('@openzeppelin/test-environment')
// const { BN, ether, balance } = require('@openzeppelin/test-helpers')

// const SToken = contract.fromArtifact('SToken')

// describe('SToken', () => {
//   const [owner, user] = accounts
//   it('should pass the test', async () => {
//     const sToken = await SToken.new({ from: owner })
//     const result = await sToken.name()
//     result.should.equal('SToken')

//     // // mint for free - only owner
//     // ;(await sToken.balanceOf(user)).should.bignumber.equal('0')
//     // await sToken.mint(user, 100, { from: owner })
//     // ;(await sToken.balanceOf(user)).should.bignumber.equal('100')

//     // mint for eth
//     // const balanceUserBefore = await balance.current(user, 'ether')
//     // console.log(balanceUserBefore.toString())

//     ;(await sToken.balanceOf(user)).should.bignumber.equal('0')
//     await sToken.mintForEth(user, 100, { from: user, value: ether('5') })
//     ;(await sToken.balanceOf(user)).should.bignumber.equal('100')
//     const balanceTokenEth = await balance.current(sToken.address, 'ether')
//     console.log(balanceTokenEth.toString())

//     // const balanceUserAfter = await balance.current(user, 'ether')
//     // console.log(balanceUserAfter.toString())

//   })
// })
