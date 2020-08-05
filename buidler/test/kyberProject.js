const { ethers } = require("@nomiclabs/buidler")
const { expect } = require('chai')

describe("The Kyber Project", function () {

    let contract;
    let owner, addr1, addr2, addr3;

    beforeEach(async function() {
        const Contract = await ethers.getContractFactory("KyberProject");
        contract = await Contract.deploy();
        await contract.deployed();

        [owner, addr1, addr2, addr3] = await ethers.getSigners();
    })
    
    it("should have the correct name", async function (){

        console.log(contract.address);

        expect(await contract.name()).to.equal("The Kyber Project", "Wrong name");
    })

    it("should register a new user", async function (){

        let tx = await contract.connect(addr1).registerUser(addr1.getAddress());
        await contract.connect(addr2).registerUser(addr2.getAddress());
        await contract.connect(addr3).registerUser(addr3.getAddress());
        
        await tx.wait();

        let address1 = await addr1.getAddress();
        console.log("addr1 address: ", address1);

        let isRegistered = await contract.returnUsers().then(arr => {
            console.log(arr);
            return arr.includes(address1);
        });

        expect(isRegistered).to.equal(true, 'The user was not registered.');
    })

    describe("Registering and Retrieving Votes on Articles", function () {

        it("should register a vote by a registered user", async function (){

            let address1 = await addr1.getAddress();
            console.log('registering user');
            await contract.connect(addr1).registerUser(addr1.getAddress());

            let isRegistered = await contract.returnUsers().then(arr => {
                console.log(arr);
                return arr.includes(address1);
            });
            console.log(isRegistered);

            let tx = await contract.connect(addr1).registerAVote(address1, "The New York Times", "Article Address");
            await tx.wait();
            
            let votedOnArticle = await contract.articlesVotedOn(address1, 0).then(vote => {
                return vote.archived;
            });
    
            expect(votedOnArticle).to.equal(true, 'The vote was not registered.');
        })

        it("should return articles voted on by a registered user into an array", async function (){

            let address = await owner.getAddress();

            const artAddr1 = "0001";
            const artAddr2 = "0002";
            const artAddr3 = "0003";

            await contract.connect(owner).registerUser(owner.getAddress());
            await contract.connect(owner).registerAVote(address, "The New York Times", artAddr1);
            await contract.connect(owner).registerAVote(address, "The Post", artAddr2);
            await contract.connect(owner).registerAVote(address, "HackFS News", artAddr3);
            
            let length = await contract.getArticlesVotedOnLength(owner.getAddress())
                .then(bNum => bNum._hex)
                .then(hex => parseInt(hex, 16));
            console.log("length is: ", length);
            
            let articleList = [];
            //let tx = await contract.connect(owner).getArticlesVoted(owner.getAddress(),0);
            for (let i = 0; i < length; i++) {
                let data = await contract.getArticlesVoted(address,i);
                articleList.push(data);
            }
            let pass = articleList.includes(artAddr1) 
                && articleList.includes(artAddr2) 
                && articleList.includes(artAddr3);
            expect(pass).to.equal(true, 'Articles voted on not recorded or archived');
        })
    })
})
