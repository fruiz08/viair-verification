
import "hardhat-contract-sizer";
import "hardhat-deploy";
import { HardhatUserConfig } from "hardhat/config";
import { resolve } from "path";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  hardhat: 31337,
  rskTestnet: 31,
};

let mnemonic: string;
if (!process.env.MNEMONIC) {
  throw new Error("Please set your MNEMONIC in a .env file");
} else {
  mnemonic = process.env.MNEMONIC;
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
      },
      chainId: chainIds.hardhat,
      allowUnlimitedContractSize: true,
    },
    rskTestnet: {
      accounts: process.env.PK ? [`0x${process.env.PK}`] : { mnemonic },
      chainId: chainIds.rskTestnet,
      url: "https://public-node.testnet.rsk.co",
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.20",
    settings: {
      // https://hardhat.org/hardhat-network/#solidity-optimizer-support
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yulDetails: {
            // solves viaIR issue that inline internal functions: https://github.com/ethereum/solidity/issues/13858#issuecomment-1428754261
            optimizerSteps:
              "dhfoDgvulfnTUtnIf[xa[r]EscLMcCTUtTOntnfDIulLculVcul[j]Tpeulxa[rul]xa[r]cLgvifCTUca[r]LSsTOtfDnca[r]Iulc]jmul[jul]VcTOculjmul",
          },
        },
      },
      viaIR: process.env.VIA_IR === undefined ? true : process.env.VIA_IR == "true",
      evmVersion: "london", // FIXME: latest evm version supported by rsk explorers, keep it updated
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  mocha: {
    timeout: 100000,
  },
};

export default config;
