import abi from "../lib/abi/Zora1155CreatorProxy.json";
import { getZoraBlob, store } from "../lib/ipfs";
import { Contract } from "ethers";
import { useAccount } from "wagmi";
import { useEthersSigner } from "./useEthersSigner";
import type { Create1155ContractArgs } from "../lib/types/Create1155ContractArgs";

const useCreate1155Contract = () => {
  const signer = useEthersSigner();
  const { address } = useAccount() as any;
  const factoryAddress = "0x777777C338d93e2C7adf08D102d45CA7CC4Ed021";
  const defaultContractName = "ONCHAINMAGIC🪄";

  const signTransaction = async (args: any[]) => {
    const factory = new Contract(factoryAddress, abi, signer);
    const tx = await factory.createContract(...args);
    const response = await tx.wait();
    return response;
  };

  const createContract = async (contractArgs?: Create1155ContractArgs) => {
    if (!signer)
      return {
        error: "Please connect a wallet client using wagmi / ethers / viem.",
      };

    try {
      const ipfs =
        contractArgs?.contentURI ||
        (await store(
          getZoraBlob(address),
          defaultContractName,
          contractArgs?.description || "",
          address
        ));
      const setupActions = contractArgs?.setupActions || ([] as any[]);
      const royaltyConfig = contractArgs?.royaltyConfig || {
        royaltyRecipient: "0x0000000000000000000000000000000000000000",
        royaltyMintSchedule: 0,
        royaltyBPS: 0,
      };
      const args = [
        `ipfs://${ipfs}`,
        contractArgs?.name || defaultContractName,
        royaltyConfig,
        contractArgs?.defaultAdmin || address,
        setupActions,
      ];
      await signTransaction(args);
    } catch (error) {
      return { error };
    }
  };

  return {
    deploy: createContract,
  };
};

export default useCreate1155Contract;
