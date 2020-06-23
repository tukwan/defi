pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../SToken.sol";
import "./IUniswap.sol";

contract Uniswap {
    IUniswapFactoryInterface uniswapFactory;
    mapping(address => address) public exchangeAddressOf;

    constructor() public {
        uniswapFactory = IUniswapFactoryInterface(0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36);
    }

    function createExchange(address token) external {
        address exchangeAddress = uniswapFactory.createExchange(token);
        exchangeAddressOf[token] = exchangeAddress;
    }

    function addLiquidity(address tokenAddress, uint256 tokenAmount) external payable {
        address exchangeAddress = exchangeAddressOf[tokenAddress];
        IUniswapExchangeInterface exchange = IUniswapExchangeInterface(exchangeAddress);
        exchange.addLiquidity{value: msg.value}(1, tokenAmount, now + 300);
    }

    function buy(address tokenAddress) external payable {
        IUniswapExchangeInterface uniswapExchange = IUniswapExchangeInterface(exchangeAddressOf[tokenAddress]);
        uint256 tokenAmount = uniswapExchange.getEthToTokenOutputPrice(msg.value);
        uniswapExchange.ethToTokenTransferInput{value: msg.value}(tokenAmount, now + 300, msg.sender);
    }
}
