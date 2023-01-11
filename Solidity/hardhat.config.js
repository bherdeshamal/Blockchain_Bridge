require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  paths: {
    sources: "./contracts",
    artifacts: "../web/src/artifacts",
    tests: "./test",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ganache: {
      chainId: 5777,
      url: "http://127.0.0.1:7545",
    },
    origin: {
      url: process.env.DEPLOY_ENDPOINT_ORIGIN,
      accounts: [process.env.DEPLOY_ACC_KEY],
    },
    destination: {
      url: process.env.DEPLOY_ENDPOINT_DESTINATION,
      accounts: [process.env.DEPLOY_ACC_KEY],
    },
  },
};
