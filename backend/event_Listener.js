const Web3 = require("web3");
const EthereumEvents = require("ethereum-events");
const artifactsDChainStack = require("./ABI/DChainStackDollars.json");
const destinationWebSockerProvider = new Web3(
  process.env.DESTINATION_WSS_ENDPOINT
);

const contracts = [
  {
    name: "DChainStackDollars",
    address: process.env.DESTINATION_TOKEN_CONTRACT_ADDRESS,
    abi: artifactsDChainStack.abi,
    events: ["Transfer"], // optional event filter (default: all events)
  },
];

const options = {
  pollInterval: 13000, // period between polls in milliseconds (default: 13000)
  confirmations: 2, // n° of confirmation blocks (default: 12)
  chunkSize: 10000, // n° of blocks to fetch at a time (default: 10000)
  concurrency: 10, // maximum n° of concurrent web3 requests (default: 10)
  backoff: 1000, // retry backoff in milliseconds (default: 1000)
};

const BRIDGE_WALLET = process.env.BRIDGE_WALLET;

const web3 = new Web3(destinationWebSockerProvider);

const ethereumEvents = new EthereumEvents(web3, contracts, options);

async function start() {
  ethereumEvents.on("block.confirmed", (blockNumber, events, done) => {
    let event;
    for (e in events) {
      console.log(`Transfer Details for block ${blockNumber} =====>`);
      event = events[e];

      if (event.name == "Transfer") {
        console.log(
          `${event.values.from} just sent ${event.values.value} to ${event.values.to}`
        );
      }
    }
    done();
  });

  let options = {
    // filter: {
    //   value: ['1000', '1337'], //Only get events where transfer value was 1000 or 1337
    // },
    fromBlock: 0, //Number || "earliest" || "pending" || "latest"
    toBlock: "latest",
  };
  const startBlock = await web3.eth.getBlockNumber(); //28182533 IMPORTANT TODO: Change this to the latest block on the day of code deploy.

  ethereumEvents.start(startBlock); // startBlock defaults to 'latest' when omitted

  if (ethereumEvents.isRunning()) {
    console.log("---------- Running ------- ");
  }
}

module.exports = start;
