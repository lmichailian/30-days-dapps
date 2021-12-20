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

    function read(uint256 id) public view returns (User memory) {
        //require(users[id] != 0, "ERROR");
        return users[id];
    }

    function update(uint256 id, string memory name) public {
        users[id].name = name;
    }

    function destroy(uint256 id) public {
        delete users[id];
    }
}
