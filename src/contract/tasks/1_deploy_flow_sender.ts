import { task } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import { ContractFactory } from "ethers";

task("deploy:flow-sender", "deploy FlowSender Contract")
  .setAction(async (args, hre) => {
    try {
      const factory = (await hre.ethers.getContractFactory(
        "FlowSender"
      )) as ContractFactory;

      const tokenAddresses = [
        "0x9Ce2062b085A2268E8d769fFC040f6692315fd2c",
        "0x30a6933Ca9230361972E413a15dC8114c952414e",
        "0xb598E6C621618a9f63788816ffb50Ee2862D443B"
      ]

      const contract = await factory.deploy(tokenAddresses);

      await contract.waitForDeployment();

      console.log(
        "🚀 FlowSender contract deployed to:",
        await contract.getAddress()
      );
    } catch (e) {
      console.error(e);
    }
  });
