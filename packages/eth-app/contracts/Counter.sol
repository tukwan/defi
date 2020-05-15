pragma solidity ^0.5.0;

contract Counter {
    uint256 private _count;
    address private _owner;

    constructor(uint256 count) public {
        _owner = msg.sender;
        _count = count;
    }

    function owner() public view returns (address) {
        return _owner;
    }

    function getCounter() public view returns (uint256) {
        return _count;
    }

    function increaseCounter(uint256 amount) public {
        _count = _count + amount;
    }
}
