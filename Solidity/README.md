PS C:\Program Files\nodejs\BlockchainBridgeScratch\Solidity> npm i hardhat

PS C:\Program Files\nodejs\BlockchainBridgeScratch\Solidity> npx hardhat >>>> create a js project

PS C:\Program Files\nodejs\BlockchainBridgeScratch\Solidity> npx hardhat compile

PS C:\Program Files\nodejs\BlockchainBridgeScratch\Solidity>npx hardhat test

PS C:\Program Files\nodejs\BlockchainBridgeScratch\Solidity> npx hardhat run ./scripts/deployOrigin.js --network origin
Deploying contracts with account: 0xbFe8118607f2DD6609cC4D7c4bf5352E4FF7BC7e
Account balance: 489868977928091773
contract ChainstackDollars deployed to address: 0xCf4F2e5fb7dBA4E21D05859c97E65871692D5355

PS C:\Program Files\nodejs\BlockchainBridgeScratch\Solidity> npx hardhat run ./scripts/deployDestination.js --network destination
Deploying contracts with account: 0xbFe8118607f2DD6609cC4D7c4bf5352E4FF7BC7e
Account balance: 1986783879890967232
contract DChainstackDollars deployed to address: 0xe7b30642139e1DfF68A2B4A0204b12C5Ec8a36CF
