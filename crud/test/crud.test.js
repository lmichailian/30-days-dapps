const Crud = artifacts.require('Crud');

contract('Crud', () => {

    let crud

    before(async () => {
        crud = await Crud.deployed()
    })

    it('should deploy', async () => {
        assert(crud !== '')
    })

    it('should create a user', async () => {
        await crud.create('Lucas')
        await crud.create('Gonzalo')
        
        const user1 = await crud.read(0);
        assert(user1.name, 'Lucas')

        const user2 = await crud.read(1);
        assert(user2.name === 'Gonzalo')
    })
})