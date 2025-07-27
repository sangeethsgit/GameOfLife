// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EcoScoreToken is ERC20, Ownable {
    constructor() ERC20("EcoToken", "ECO") Ownable(msg.sender) {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * (10 ** decimals()));
    }
}

contract EcoScoreSystem is Ownable {
    EcoScoreToken public token;

    mapping(address => mapping(string => bool)) public hasClaimed;

    constructor(address tokenAddress) Ownable(msg.sender) {
        token = EcoScoreToken(tokenAddress);
    }

    function claimEcoScore(address user, string memory mode, uint ticketPaid) external onlyOwner {
        require(ticketPaid == 1, "Ticket not paid");

        require(!hasClaimed[user][mode], "Already claimed for this mode");

        uint reward = getScore(mode);
        require(reward > 0, "No reward for this mode");

        hasClaimed[user][mode] = true;
        token.mint(user, reward);
    }

    function getScore(string memory mode) public pure returns (uint) {
        bytes32 m = keccak256(abi.encodePacked(mode));

        if (m == keccak256("Metro") || m == keccak256("Water Metro")) return 10;
        if (m == keccak256("Passenger Train") || m == keccak256("MEMU Train")) return 8;
        if (m == keccak256("Electric Bus") || m == keccak256("MyByk")) return 5;

        return 0;
    }
}