
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
        bool archived;
    }

    mapping (address => Vote[]) public articlesVotedOn;

    function registerAVote(address _userAddress, string memory _articleName, address _articleAddress) public {
    	require(check_registration[_userAddress] == true, "USER MUST REGISTER FIRST");

        Vote memory v;
        v.articleName = _articleName;
        v.article = _articleAddress;
        v.archived = true;

        articlesVotedOn[msg.sender].push(v);
    }

    //function getRegisteredUserInfo(address _userAddress) public view returns(address[] memory) {
        //return articlesVotedOn[_userAddress];
    //}

    address[] articleList;

    function getArticlesVotedOn(address userAddress) public returns (address[] memory) {
        require(check_registration[userAddress] == true, "USER MUST REGISTER FIRST");
        require(articlesVotedOn[userAddress].length > 0, "USER SHOULD HAVE VOTED ON AT LEAST ONE ARTICLE");

        Vote[] memory v = articlesVotedOn[userAddress];

        for(uint i=0;i<v.length;i++) {
            articleList.push(v[i].article);
        }

        return (articleList);
    }

    /*function getOwnArticlesVotedOn() public view returns (address[] memory) {
        require(check_registration[msg.sender] != true, "IS A REGISTERED USER");
        require(articlesVotedOn[msg.sender].archived == true, "HAS VOTED ON AT LEAST ONE ARTICLE");

        //Need a loop to push articles into and return a tuple

        return articlesVotedOn[msg.sender];
    }*/
}
