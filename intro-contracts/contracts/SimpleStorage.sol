// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {
    string public data;

    function setData(string memory _data) external {
        data = _data;
    }
}