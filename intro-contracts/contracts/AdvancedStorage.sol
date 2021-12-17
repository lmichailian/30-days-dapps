// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract AdvancedStorage {
    uint256[] public ids;

    function setIds(uint256 id) public {
        ids.push(id);
    }

    function getId(uint256 index) public view returns (uint256) {
        return ids[index];
    }

    function getAll() public view returns (uint256[] memory) {
        return ids;
    }

    function getSize() public view returns (uint256) {
        return ids.length;
    }
}
