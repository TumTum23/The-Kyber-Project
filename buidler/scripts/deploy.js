async function main() {
    const [ deployer ] = await ethers.getSigners();

    console.log(
        "Deploying contracts with the account: ",
        await deployer.getAddress()
    );

    console.log("Account balance: ", (await deployer.getBalance()).toString());

    const Contract = await ethers.getContractFactory("KyberProject");
    const contract = await Contract.deploy();

    await contract.deployed();

    console.log("Contract address: ", contract.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });