const SimpleContract = artifacts.require("SimpleContract");
const HelloWorld = artifacts.require("HelloWorld");

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

  it("It should deplpoy", async () => {
    const helloWorld = await HelloWorld.new();
    const salute = await helloWorld.hello();
    assert(salute, "Hello World");
  });
});
