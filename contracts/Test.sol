// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

contract Test {

    uint256 internal a;
    uint256 internal b;

    function setNumberA(uint256 a_) external {
        a = a_;
    }

    function setNumberB(uint256 b_) external {
        b = b_;
    }

    function getResult() external view returns(uint256){
        return a + b;
    }
}