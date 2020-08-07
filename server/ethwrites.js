const { abi, address, provider } = require('./ethquery');
const { providers , ethers } = require('ethers');

// provider = new providers.JsonRpcProvider();
// signer = provider.getSigner(0);

let privateKey = 'PRIVATE_KEY';  
let wallet = new ethers.Wallet(privateKey, provider);

const kyContract = new ethers.Contract( address, abi, wallet );

let test = kyContract.callStatic.registerAUser('USER_ADDRESS');
test.then((tx)=>{
    console.log(tx);
})
async function registerAUser_TEST(_userAddress) {
    let foo = await kyContract.callStatic.registerUser(_userAddress);
    console.log(foo);
}

async function registerUserVotedArticle_TEST(_userAddress, _articleName, _articleId) {
    //kyContract.callStatic.registerAVote(_userAddress, _articleName, _articleId);
}

async function registerAUser(_userAddress) {

}

async function registerUserVotedArticle() {

}
registerAUser_TEST(signer);

module.exports = {
    registerAUser,
    registerUserVotedArticle
}