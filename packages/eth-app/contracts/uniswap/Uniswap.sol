pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../SToken.sol";
import "./IUniswap.sol";

contract Uniswap {
    IUniswapFactoryInterface uniswapFactory;

    constructor() public {
        uniswapFactory = IUniswapFactoryInterface(0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36);
    }

    function createExchange(address token) external {
        uniswapFactory.createExchange(token);
    }

    function getExchange(address token) external view returns (address exchange) {
        return uniswapFactory.getExchange(token);
    }

    function buy(address tokenAddress) external payable {
        IUniswapExchangeInterface uniswapExchange = IUniswapExchangeInterface(tokenAddress);
        uint256 tokenAmount = uniswapExchange.getEthToTokenOutputPrice(msg.value);
        uniswapExchange.ethToTokenTransferInput{value: msg.value}(tokenAmount, now + 120, msg.sender);
    }

    function addLiqudity(address tokenAddress) external payable {
        IUniswapExchangeInterface uniswapExchange = IUniswapExchangeInterface(tokenAddress);
        uint256 tokenAmount = uniswapExchange.getEthToTokenOutputPrice(msg.value);
        IERC20(tokenAddress).transferFrom(msg.sender, address(this), tokenAmount);
        uniswapExchange.addLiquidity{value: msg.value}(tokenAmount, tokenAmount, now + 120);
    }
}
