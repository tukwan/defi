pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract SToken is Ownable, ERC20Capped {
    using SafeMath for uint256;

    uint256 TOTAL_SUPPLY = uint256(100).mul(10**18);

    constructor() public ERC20("SToken", "S") ERC20Capped(TOTAL_SUPPLY) Ownable() {
        _mint(msg.sender, TOTAL_SUPPLY.div(2));
    }

    function mint(address recipient, uint256 amount) external onlyOwner {
        _mint(recipient, amount);
    }

    function mintForEth(address recipient, uint256 amount) external payable {
        require(msg.value >= 0.05 ether, "Minimum mint fee 0.05 ETH");
        _mint(recipient, amount);
    }
}
