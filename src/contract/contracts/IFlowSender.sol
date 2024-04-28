//SPDX-License-Identifier: Unlicensed
pragma solidity 0.8.23;

import {ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

interface IFlowSender {
    event TokenWrapped(address indexed tokenAddress, uint256 amount);
    event StreamCreated(address indexed tokenAddress, int96 flowRate, address indexed receiver);
    event StreamUpdated(address indexed tokenAddress, int96 flowRate, address indexed receiver);
    event StreamDeleted(address indexed tokenAddress, address indexed receiver);

    error InvalidTokenAddress();

    function accountList(address account) external view returns (bool);
    function superTokens(address tokenAddress) external view returns (ISuperToken);

    function gainWrapToken(address tokenAddress, uint256 amount) external;
    function createStream(address tokenAddress, int96 flowRate, address receiver) external;
    function updateStream(address tokenAddress, int96 flowRate, address receiver) external;
    function deleteStream(address tokenAddress, address receiver) external;
    function readFlowRate(address tokenAddress, address receiver) external view returns (int96 flowRate);
}
