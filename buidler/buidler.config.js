require('dotenv').config();
usePlugin("@nomiclabs/buidler-waffle");

const INFURA_PROJECT_ID = `${process.env.INF_ID}`;

const ROPSTEN_PRIVATE_KEY = `${process.env.ROP_KEY}`;
module.exports = {
    solc: {
        version: "0.6.8"
    },
    networks: {
        ropsten: {
            url: `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`,
            accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
        }
    }
};
