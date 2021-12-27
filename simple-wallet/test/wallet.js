const Wallet = artifacts.require('Wallet');

contract('Wallet', (accounts) => {
    let wallet;

    beforeEach(async () => {
        wallet = await Wallet.new(accounts[0]);
    })

    it('should owner is the same to wallet first element', async () => {
        const owner = await wallet.owner.call();
        assert(owner == accounts[0]);
    })

    it('should deposit founds', async () => {
        await wallet.deposit({ from: accounts[0], value: web3.utils.toWei('1') });
        const balanceOf = await wallet.balanceOf();
        assert(parseInt(balanceOf) == web3.utils.toWei('1'))
    })

    it('should send founds to other account', async () => {
        await wallet.deposit({ from: accounts[0], value: web3.utils.toWei('1') });
        const previousBalance = await web3.eth.getBalance(accounts[1]);
        await wallet.send(accounts[1], web3.utils.toWei('1'), { from: accounts[0] })
        const currentAmount = await web3.eth.getBalance(accounts[1]);
        assert(parseInt(previousBalance) + parseInt(web3.utils.toWei('1')) === parseInt(currentAmount))
    })
})