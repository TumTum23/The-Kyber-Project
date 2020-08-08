require('dotenv').config();
const ethers = require('ethers');
const { abi } = require('./abi');

const provider = new ethers.getDefaultProvider('ropsten', { 'infura': `${INF_ID}` });
const address = `${process.env.CONTRACT_ADDRESS}`;

const kyContract = new ethers.Contract( address, abi, provider );


async function getName(){
    let foo = await kyContract.name();
    console.log(foo);
}

async function getRegisteredUsers(){
    let foo = await kyContract.returnUsers();
    console.log(foo);
}

async function getVotedArticlesLength(_userAddress){
    let foo = await kyContract.getArticlesVotedOnLength(_userAddress);
    console.log(foo);
}

async function getUserArticlesVotedOn(_userAddress, _index){
    let artAddr = await kyContract.getArticlesVoted(_userAddress, _index);
    let artName = await kyContract.articlesVotedOn(_userAddress, _index).then(data => data.articleName);
    
    console.log([artName, artAddr]);
}

module.exports = {
    abi,
    address,
    kyContract,
    getName,
    getRegisteredUsers,
    getVotedArticlesLength,
    getUserArticlesVotedOn
}

// metamask
//let provider = ethers.providers.Web3Provider(web3.currentProvider);