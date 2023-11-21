import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployFunc: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  const deployImplResult = await deploy("Test", {
    contract: "Test",
    from: deployer,
  });
  console.log(`Test deployed at ${deployImplResult.address}`);
  return hre.network.live; // prevents re execution on live networks
};
export default deployFunc;

deployFunc.id = "deployed_Test"; // id required to prevent re-execution
deployFunc.tags = ["Test"];