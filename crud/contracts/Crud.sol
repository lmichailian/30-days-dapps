// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Crud {
    struct User {
        uint256 id;
        string name;
    }

    mapping(uint256 => User) users;
    uint256 public nextId = 1;

    function create(string memory name) public {
        users[nextId] = User(nextId, name);
        nextId++;
    }

    function read(uint256 id) public view userExists(id) returns (User memory) {
        return users[id];
    }

    function update(uint256 id, string memory name) public userExists(id) {
        users[id].name = name;
    }

    function destroy(uint256 id) public userExists(id) {
        delete users[id];
    }

    modifier userExists(uint256 id) {
        require(users[id].id != 0, "User does not exists.");
        _;
    }
}
