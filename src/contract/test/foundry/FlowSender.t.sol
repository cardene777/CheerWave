// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Test} from "forge-std/Test.sol";
import {setup} from "./setup.sol";
import {FlowSender} from "../../contracts/FlowSender.sol";
import {IFlowSender} from "../../contracts/IFlowSender.sol";
import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";

contract FlowSenderTest is Test, setup {
    function testGainWrapTokenSuccess() public {
        uint256 amount = 100;
        vm.prank(user1);
        fDAIx.upgrade(amount);
        assertEq(fDAIx.balanceOf(address(flowSender)), amount);
    }

    function testGainWrapTokenInvalidToken() public {
        uint256 amount = 100;
        vm.prank(user1);
        vm.expectRevert(IFlowSender.InvalidTokenAddress.selector);
        flowSender.gainWrapToken(address(INVALID_TOKEN), amount);
    }

    function testCreateStreamSuccess() public {
        int96 flowRate = 10;
        vm.prank(admin);
        flowSender.createStream(address(fDAIx), flowRate, user2);
        assertEq(flowSender.readFlowRate(address(fDAIx), user2), flowRate);
    }

    function testCreateStreamInvalidToken() public {
        int96 flowRate = 10;
        vm.prank(admin);
        vm.expectRevert(IFlowSender.InvalidTokenAddress.selector);
        flowSender.createStream(address(INVALID_TOKEN), flowRate, user2);
    }

    function testUpdateStreamSuccess() public {
        int96 initialFlowRate = 10;
        int96 updatedFlowRate = 20;
        vm.prank(admin);
        flowSender.createStream(address(fDAIx), initialFlowRate, user2);
        vm.prank(admin);
        flowSender.updateStream(address(fDAIx), updatedFlowRate, user2);
        assertEq(flowSender.readFlowRate(address(fDAIx), user2), updatedFlowRate);
    }

    function testUpdateStreamInvalidToken() public {
        int96 flowRate = 10;
        vm.prank(admin);
        vm.expectRevert(IFlowSender.InvalidTokenAddress.selector);
        flowSender.updateStream(address(INVALID_TOKEN), flowRate, user2);
    }

    function testDeleteStreamSuccess() public {
        int96 flowRate = 10;
        vm.prank(admin);
        flowSender.createStream(address(fDAIx), flowRate, user2);
        vm.prank(admin);
        flowSender.deleteStream(address(fDAIx), user2);
        assertEq(flowSender.readFlowRate(address(fDAIx), user2), 0);
    }

    function testDeleteStreamInvalidToken() public {
        vm.prank(admin);
        vm.expectRevert(IFlowSender.InvalidTokenAddress.selector);
        flowSender.deleteStream(address(INVALID_TOKEN), user2);
    }

    function testReadFlowRateSuccess() public {
        int96 flowRate = 10;
        vm.prank(admin);
        flowSender.createStream(address(fDAIx), flowRate, user2);
        assertEq(flowSender.readFlowRate(address(fDAIx), user2), flowRate);
    }

    function testReadFlowRateInvalidToken() public {
        vm.prank(admin);
        vm.expectRevert(IFlowSender.InvalidTokenAddress.selector);
        flowSender.readFlowRate(address(INVALID_TOKEN), user2);
    }
}
