const SimpleContract = artifacts.require("SimpleContract");
const HelloWorld = artifacts.require("HelloWorld");
const SimpleStorage = artifacts.require("SimpleStorage");
const AdvancedStorage = artifacts.require("AdvancedStorage");

contract("SimpleContract", () => {
  it("It should deploy", async () => {
    const simpleContract = await SimpleContract.deployed();
    assert(simpleContract.address !== "");
  });
});

contract("Hello World", () => {
  it("It should deplpoy", async () => {
    const helloWorld = await HelloWorld.deployed();
    assert(helloWorld.address !== "");
  });
});

contract("SimpleStorage", () => {
  it("It should deplpoy", async () => {
    const simpleStorage = await SimpleStorage.new();
    await simpleStorage.setData("Hello");
    const data = await simpleStorage.getData();
    assert(data, "Hello");
  });
});

contract("AdvancedStorage", () => {
  it("It should deplpoy", async () => {
    const advancedStorage = await AdvancedStorage.new();
    await advancedStorage.setIds(40);
    const ids = await advancedStorage.getAll();
    const id = await advancedStorage.getId(0);
    const size = await advancedStorage.getSize();
    assert(ids, [40]);
    assert(id, 40);
    assert(size, 1);
  });
});
