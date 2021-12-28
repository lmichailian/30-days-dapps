// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SplitPayment {

    function send(address payable[] memory to, uint[] memory amount) public payable {
        require(to.length == amount.length, "Arrays dont have the same size");

        for (uint i = 0; i < to.length; i++) {
            (bool success, ) = to[i].call{value: amount[i]}("");
            require(success, "Transaction failed");
        }
    }
}