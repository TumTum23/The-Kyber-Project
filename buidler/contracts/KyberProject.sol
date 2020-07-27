
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

contract KyberProject {
    string public name = "The Kyber Project";

    address[] public registeredUsers;
	
	mapping (address => bool) public check_registration;

    function registerUser(address newUserAddress) public {
    	require(check_registration[newUserAddress] != true, "USER ALREADY REGISTERED");

        registeredUsers.push(newUserAddress);
        check_registration[newUserAddress] = true;
    }

    struct Vote {
        string articleName;
        address article;
    }

    mapping (address => Vote[]) public articlesVotedOn;

    function registerAVote(address userAddress, string memory _articleName, address _articleAddress) public {
    	require(check_registration[userAddress] == true, "USER MUST REGISTER FIRST");
        
        Vote memory v;
        v.articleName = _articleName;
        v.article = _articleAddress;

        articlesVotedOn[msg.sender].push(v);
    }

    //function getRegisteredUser() public view returns(address[] memory) {
        //return articlesVotedOn;
    //}
}