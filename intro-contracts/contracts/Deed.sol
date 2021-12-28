// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Deed {
    address public lawyer;
    address payable public beneficiary;
    uint256 public earliest;

    constructor(
        address _lawyer,
        address payable _beneficiary,
        uint256 fromNow
    ) payable {
        lawyer = _lawyer;
        beneficiary = _beneficiary;
        fromNow = block.timestamp + fromNow;
    }

    function withdraw() public {
        require(msg.sender == lawyer, "lawyer only");
        require(block.timestamp >= earliest, "to early");

        (bool success, ) = beneficiary.call{value: address(this).balance}("");
        require(success, "Transaction failed");
    }
}
