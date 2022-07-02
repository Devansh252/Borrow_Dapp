pragma solidity ^0.8.7;

import "./CypherToken.sol";
import "./StableToken.sol";


contract Vault {
    string public name = " Stable Token Vault";
    address public owner;
    CypherToken public cypherToken;
    StableToken public stableToken;
  
    
    mapping( address => uint ) public stakingBalance;
    mapping( address => bool ) public hasStaked;
    mapping( address => bool ) public isStaking;

    address[] public stakers;
    
    constructor(StableToken _stableToken, CypherToken _cypherToken) {
        stableToken = _stableToken;
        cypherToken = _cypherToken;
        owner = msg.sender;

    }

    function stakeTokens(uint _amount) public {

        require(_amount > 0, "Amount cannot be 0");

        cypherToken.transferFrom(msg.sender, address(this), _amount);
        // Update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;
        
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);

        }

        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true; 

         

    }

    function issueToken() public {
        require(msg.sender == owner, "caller must be owner ");
        for (uint i = 0; i < stakers.length ; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0){
            stableToken.transfer(recipient, balance);
            }
        }
    }

     // Unstaking Tokens (Withdraw)
    function unstakeTokens() public {
        // Fetch staking balance
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance cannot be 0");
        cypherToken.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }


}


