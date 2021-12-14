const SimpleContract = artifacts.require('SimpleContract')

contract('SimpleContract', () => {
    it ('It should deploy', async () => {
        const simpleContract = await SimpleContract.deployed()
        assert(simpleContract.address !== '')
    })
})