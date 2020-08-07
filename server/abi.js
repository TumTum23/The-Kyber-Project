module.exports = {
    "abi": [
    {
        "inputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "name": "articlesVotedOn",
        "outputs": [
            {
            "internalType": "string",
            "name": "articleName",
            "type": "string"
            },
            {
            "internalType": "string",
            "name": "articleAddress",
            "type": "string"
            },
            {
            "internalType": "bool",
            "name": "archived",
            "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "name": "check_registration",
        "outputs": [
            {
            "internalType": "bool",
            "name": "",
            "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "_index",
            "type": "uint256"
            }
        ],
        "name": "getArticlesVoted",
        "outputs": [
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
            }
        ],
        "name": "getArticlesVotedOnLength",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
            "internalType": "string",
            "name": "",
            "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "_userAddress",
            "type": "address"
            },
            {
            "internalType": "string",
            "name": "_articleName",
            "type": "string"
            },
            {
            "internalType": "string",
            "name": "_articleAddress",
            "type": "string"
            }
        ],
        "name": "registerAVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "address",
            "name": "newUserAddress",
            "type": "address"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "inputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "name": "registeredUsers",
        "outputs": [
            {
            "internalType": "address",
            "name": "",
            "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        },
        {
        "inputs": [],
        "name": "returnUsers",
        "outputs": [
            {
            "internalType": "address[]",
            "name": "",
            "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
        }
    ]
};