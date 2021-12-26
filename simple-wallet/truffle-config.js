const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      gas: 0,
    },
  },
  compilers: {
    solc: {
      optimizer: {
        enable: true,
        runs: 200,
      },
      version: "0.8.0",
    },
  },
};