
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


    function getArticlesVotedOn(address userAddress) public view returns (string memory articleName, address article, bool archived) {
        require(check_registration[userAddress] != true, "IS A REGISTERED USER");
        require(articlesVotedOn[userAddress].length > 0, "USER SHOULD HAVE VOTED ON AT LEAST ONE ARTICLE");

        //Vote storage v = articlesVotedOn[userAddress];

        //Need a loop to push articles into and return a tuple

        //Might need to push this into a tuple before returning an entire tuple. 
        //Currently it is only returning a single article info instead of all articles that were voted on
        return (articlesVotedOn[userAddress].articleName, articlesVotedOn[userAddress].article, articlesVotedOn[userAddress].archived);
    }
    function getOwnArticlesVotedOn() public view returns (address[] memory) {
        require(check_registration[msg.sender] != true, "IS A REGISTERED USER");
        require(articlesVotedOn[msg.sender].archived == true, "HAS VOTED ON AT LEAST ONE ARTICLE");

        //Need a loop to push articles into and return a tuple

        return articlesVotedOn[msg.sender];
    }
}
