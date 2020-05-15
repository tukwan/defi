const { accounts, contract, web3 } = require('@openzeppelin/test-environment')
const { BN } = require('@openzeppelin/test-helpers')

const Counter = contract.fromArtifact('Counter')

describe('Counter', () => {
  const [owner] = accounts
  let counter
  const _count = new BN(9999)
  const add = new BN(1)

  beforeEach(async function() {
    counter = await Counter.new(_count, { from: owner })
  })

  it('should have proper owner', async () => {
    ;(await counter.owner()).should.equal(owner)
  })

  it('should have proper default value', async () => {
    ;(await counter.getCounter()).should.bignumber.equal(_count)
  })

  it('should increase counter value', async () => {
    await counter.increaseCounter(add)
    ;(await counter.getCounter()).should.bignumber.equal(_count.add(add))
  })
})
