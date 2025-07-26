// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title EcoToken
 * @dev ERC20 token used as a reward system for eco-friendly transport.
 *      The contract allows the owner (admin) to reward users with ECO tokens,
 *      and users can redeem them for benefits like free rides.
 */
contract EcoToken is ERC20, Ownable {
    /**
     * @dev Constructor initializes token with name, symbol and mints initial supply to deployer.
     */
    constructor()
        ERC20("EcoToken", "ECO")
        Ownable(msg.sender)  // Set deployer as the owner
    {
        _mint(msg.sender, 1000000 * 10 ** decimals());  // Mint 1 million ECO to the deployer
    }

    /**
     * @dev Rewards users with ECO tokens. Only owner can call this.
     * @param to The address to reward
     * @param amount The number of ECO tokens to reward (not including decimals)
     */
    function reward(address to, uint256 amount) external onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }

    /**
     * @dev Allows users to redeem tokens (burn them) in exchange for real-world rewards.
     *      Example: 100 ECO = 1 free ride.
     * @param amount The number of ECO tokens to redeem (not including decimals)
     */
    function redeem(uint256 amount) external {
        _burn(msg.sender, amount * 10 ** decimals());
    }
}
