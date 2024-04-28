//SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.23;

import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {SuperTokenV1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperTokenV1Library.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IFlowSender} from "./IFlowSender.sol";

interface IFakeDAI is IERC20, IFlowSender {
    function mint(address account, uint256 amount) external;
}

contract FlowSender {
    using SuperTokenV1Library for ISuperToken;

    mapping(address => bool) public accountList;
    mapping(address => ISuperToken) public superTokens;

    constructor(address[] memory tokenAddresses) {
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            superTokens[tokenAddresses[i]] = ISuperToken(tokenAddresses[i]);
        }
    }

    /// @dev Wraps the underlying token into its SuperToken equivalent
    function gainWrapToken(address tokenAddress, uint256 amount) external {
        ISuperToken token = superTokens[tokenAddress];
        if (address(token) == address(0)) revert IFlowSender.InvalidTokenAddress();

        token.upgrade(amount);
        emit IFlowSender.TokenWrapped(tokenAddress, amount);
    }

    /// @dev creates a stream from this contract to desired receiver at desired rate
    function createStream(address tokenAddress, int96 flowRate, address receiver) external {
        ISuperToken token = superTokens[tokenAddress];
        if (address(token) == address(0)) revert IFlowSender.InvalidTokenAddress();

        token.createFlow(receiver, flowRate);
        emit IFlowSender.StreamCreated(tokenAddress, flowRate, receiver);
    }

    /// @dev updates a stream from this contract to desired receiver to desired rate
    function updateStream(address tokenAddress, int96 flowRate, address receiver) external {
        ISuperToken token = superTokens[tokenAddress];
        if (address(token) == address(0)) revert IFlowSender.InvalidTokenAddress();

        token.updateFlow(receiver, flowRate);
        emit IFlowSender.StreamUpdated(tokenAddress, flowRate, receiver);
    }

    /// @dev deletes a stream from this contract to desired receiver
    function deleteStream(address tokenAddress, address receiver) external {
        ISuperToken token = superTokens[tokenAddress];
        if (address(token) == address(0)) revert IFlowSender.InvalidTokenAddress();

        token.deleteFlow(address(this), receiver);
        emit IFlowSender.StreamDeleted(tokenAddress, receiver);
    }

    /// @dev get flow rate between this contract to certain receiver
    function readFlowRate(address tokenAddress, address receiver) external view returns (int96 flowRate) {
        ISuperToken token = superTokens[tokenAddress];
        if (address(token) == address(0)) revert IFlowSender.InvalidTokenAddress();

        return token.getFlowRate(address(this), receiver);
    }
}
