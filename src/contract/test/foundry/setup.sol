// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test} from "forge-std/Test.sol";
import {FlowSender} from "../../contracts/FlowSender.sol";
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract setup is Test {
    using SuperTokenV1Library for ISuperToken;
    FlowSender public flowSender;
    address admin = address(1);
    address user1 = address(2);
    address user2 = address(3);
    address user3 = address(4);
    ISuperToken fDAIx = ISuperToken(0x9Ce2062b085A2268E8d769fFC040f6692315fd2c);
    ISuperToken fETHx = ISuperToken(0x30a6933Ca9230361972E413a15dC8114c952414e);
    ISuperToken fUSDCx =
        ISuperToken(0xb598E6C621618a9f63788816ffb50Ee2862D443B);
    ISuperToken INVALID_TOKEN = ISuperToken(address(0));

    function setUp() public {
        vm.startPrank(admin);
        address[] memory tokenAddresses = new address[](3);
        tokenAddresses[0] = address(fDAIx);
        tokenAddresses[1] = address(fETHx);
        tokenAddresses[2] = address(fUSDCx);
        flowSender = new FlowSender(tokenAddresses);
        vm.label(admin, "Admin");
        vm.label(user1, "User1");
        vm.label(user2, "User2");
        vm.label(user3, "User3");
        vm.stopPrank();
    }
}
