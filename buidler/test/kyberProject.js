const { ethers } = require("ethers")

describe("The Kyber Project", function () {
    it("should have the correct name", async function (){
        const Contract = await ethers.getContractFactory("The Kyber Project");
        const contract = await Contract.deploy();
        await token.deployed();

        console.log(token.address);
    })
})