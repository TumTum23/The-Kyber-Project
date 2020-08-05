const { ENGINE_METHOD_CIPHERS } = require("constants");

const ethers = require('ethers');
let infuraProvider = new ethers.providers.EtherscanProvider('ropsten');
// metamask
//let provider = ethers.providers.Web3Provider(web3.currentProvider);