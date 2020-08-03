const { ethers } = require("@nomiclabs/buidler")
const { expect } = require('chai')

describe("The Kyber Project", function () {

    let contract;

    beforeEach(async function() {
        const Contract = await ethers.getContractFactory("KyberProject");
        contract = await Contract.deploy();
        await contract.deployed();
    })
    
    it("should have the correct name", async function (){
        console.log(contract.address);
        expect(await contract.name()).to.equal("The Kyber Project", "Wrong name")
    })

    it("should register a new user", async function (){
        const [owner, addr1] = await ethers.getSigners();

        console.log(addr1.address);
        await contract.connect(addr1).registerUser(addr1.address);
        console.log(await contract.registeredUsers());

        expect(await contract.registerUser()).to.equal("The Kyber Project")
    })
})