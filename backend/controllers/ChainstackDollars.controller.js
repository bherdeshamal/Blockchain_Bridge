const Web3 = require("web3");
const ChainstackDollars = require("../ABI/ChainstackDollars.json");
const DChainStackDollars = require("../ABI/DChainStackDollars.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const ChainstackDollarsABI = ChainstackDollars.abi;
const ChainstackDollarsAddress = ChainstackDollars.address;
const DchainstackDollarsABI = DChainStackDollars.abi;
const DchainstackDollarsAddress = DChainStackDollars.address;
const BRIDGE_WALLET = process.env.BRIDGE_WALLET;
const ORIGIN_TOKEN_CONTRACT_ADDRESS = process.env.ORIGIN_TOKEN_CONTRACT_ADDRESS;
const DESTINATION_TOKEN_CONTRACT_ADDRESS =
  process.env.DESTINATION_TOKEN_CONTRACT_ADDRESS;
const Mnemonic = process.env.Mnemonic;
const DESTINATION_HTTPS_ENDPOINT = process.env.DESTINATION_HTTPS_ENDPOINT;

if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
} else {
  const provider = new HDWalletProvider(Mnemonic, DESTINATION_HTTPS_ENDPOINT);
  var web3 = new Web3(provider);
}

web3.eth.handleRevert = true;

const chainContract = new web3.eth.Contract(
  ChainstackDollarsABI,
  ChainstackDollarsAddress
);

const contract = new web3.eth.Contract(
  DchainstackDollarsABI,
  DchainstackDollarsAddress
);

module.exports.mintTokens = async (request, response) => {
  const amount = request.body.amount;
  const address = BRIDGE_WALLET;

  try {
    const receipt = await contract.methods
      .mint(address, Web3.utils.toWei(amount.toString()))
      .send({ from: BRIDGE_WALLET, gas: 3000000 });

    console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
    console.log(
      `mintTokens > You can see this transaction in ${process.env.DESTINATION_EXPLORER}${receipt.transactionHash}`
    );

    response.status(200).send("Mint Tokens successfully");
  } catch (error) {
    response.status(500).send("Error ", error.message);
  }
};

module.exports.ApproveBeforeTransfer = async (request, response) => {
  const amount = request.body.amount;
  const address = DESTINATION_TOKEN_CONTRACT_ADDRESS;

  try {
    const receipt = await contract.methods
      .approve(address, Web3.utils.toWei(amount.toString()))
      .send({ from: BRIDGE_WALLET, gas: 3000000 });

    console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
    console.log(
      `mintTokens > You can see this transaction in ${process.env.DESTINATION_EXPLORER}${receipt.transactionHash}`
    );

    response.json("Tokens Approve Successfully");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

module.exports.transferToken = async (request, response) => {
  const amount = request.body.amount;
  const address = ORIGIN_TOKEN_CONTRACT_ADDRESS;

  try {
    const receipt = await contract.methods
      .transfer(Web3.utils.toWei(amount.toString()), address)
      .send({ from: BRIDGE_WALLET, gas: 3000000 });

    console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
    console.log(
      `transferToEthWallet > You can see this transaction in ${process.env.ORIGIN_EXPLORER}${receipt.transactionHash}`
    );
    response.json("Token transfer from user to admin successfully");
  } catch (error) {
    response.status(500).send(error.reason);
  }
};

module.exports.ApproveBeforeBurn = async (request, response) => {
  const amount = request.body.amount;
  const address = BRIDGE_WALLET;

  try {
    const receipt = await contract.methods
      .approve(address, Web3.utils.toWei(amount.toString()))
      .send({ from: BRIDGE_WALLET, gas: 3000000 });

    console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
    console.log(
      `mintTokens > You can see this transaction in ${process.env.DESTINATION_EXPLORER}${receipt.transactionHash}`
    );

    response.json("Tokens Approve Successfully");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

module.exports.burnTokens = async (request, response) => {
  const amount = request.body.amount;
  const address = BRIDGE_WALLET;

  try {
    const receipt = await contract.methods
      .burnFrom(address, Web3.utils.toWei(amount.toString()))
      .send({ from: BRIDGE_WALLET, gas: 3000000 });

    console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
    console.log(
      `transferToEthWallet > You can see this transaction in ${process.env.DESTINATION_EXPLORER}${receipt.transactionHash}`
    );
    response.json("Token Burn successfully");
  } catch (error) {
    response.status(500).send(error.reason);
  }
};

module.exports.ApproveOrigin = async (request, response) => {
  const amount = request.body.amount;
  const address = ORIGIN_TOKEN_CONTRACT_ADDRESS;

  try {
    const receipt = await chainContract.methods
      .approve(address, Web3.utils.toWei(amount.toString()))
      .send({ from: BRIDGE_WALLET, gas: 3000000 });

    console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
    console.log(
      `mintTokens > You can see this transaction in ${process.env.ORIGIN_EXPLORER}${receipt.transactionHash}`
    );

    response.json("Tokens Approve Successfully");
  } catch (error) {
    response.status(500).send(error.message);
  }
};

module.exports.transferTokenOnOrigin = async (request, response) => {
  const amount = request.body.amount;
  const address = ORIGIN_TOKEN_CONTRACT_ADDRESS;

  try {
    const receipt = await chainContract.methods
      .transfer(Web3.utils.toWei(amount.toString()), address)
      .send({ from: BRIDGE_WALLET, gas: 3000000 });

    console.log(`Transaction sent, hash is ${receipt.transactionHash}`);
    console.log(
      `transferToEthWallet > You can see this transaction in ${process.env.ORIGIN_EXPLORER}${receipt.transactionHash}`
    );
    response.json("Token transfer from user to admin successfully");
  } catch (error) {
    response.status(500).send(error.reason);
  }
};
