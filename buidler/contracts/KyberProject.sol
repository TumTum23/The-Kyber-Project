
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

contract KyberProject {
    string public name = "The Kyber Project";

    address[] public registeredUsers;

    function registerUser(address newUserAddress) public {
        registeredUsers.push(newUserAddress);
    }

    struct Vote {
        string articleName;
        address article;
    }

    mapping (address => Vote) public articlesVotedOn;

    function registerAVote(address userAddress, string memory _articleName, address _articleAddress) public {
        Vote[msg.sender].articleName = _articleName;
        Vote[msg.sender].article = _articleAddress;

        registeredUsers.push(userAddress);
    }

    function getRegisteredUser() public view returns(address[] memory) {
        return articlesVotedOn;
    }
}