// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Wallet {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function deposit() public payable {}

    function send(address payable to, uint256 amount) public {
        require(balanceOf() >= amount, "Insuficient founds");
        require(owner == msg.sender, "Dont allowed");

        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer Failed");
    }

    function balanceOf() public view returns (uint256) {
        return address(this).balance;
    }
}
