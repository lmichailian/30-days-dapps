const { expectRevert } = require('@openzeppelin/test-helpers');

const Crud = artifacts.require('Crud');

contract('Crud', () => {

    let crud

    beforeEach(async () => {
        crud = await Crud.new()
    })

    it('should deploy', async () => {
        assert(crud !== '')
    })

    it('should create a user', async () => {
        await crud.create('Lucas')
        await crud.create('Gonzalo')

        const user1 = await crud.read(1);

        assert(user1.name === 'Lucas')

        const user2 = await crud.read(2);
        assert(user2.name === 'Gonzalo')
    })

    it('should update a user', async () => {
        await crud.create('Lucas')
        await crud.update(1, 'Gonzalo')

        const user1 = await crud.read(1);
        assert(user1.name === 'Gonzalo')
    })


    it('delete a user', async () => {
        await crud.create('Lucas')

        await crud.destroy(1);

        await expectRevert(
            crud.read(1),
            "User does not exist!"
        )
    })

    it('should fail if user dont existst', async () => {
        await expectRevert(
            crud.read(1),
            "User does not exist!"
        )
    })
})