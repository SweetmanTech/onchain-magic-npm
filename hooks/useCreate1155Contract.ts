import abi from "../lib/abi/Zora1155CreatorProxy.json";
import { getZoraBlob, store } from "../lib/ipfs";
import { Contract } from "ethers";
import { useAccount } from "wagmi";
import { useEthersSigner } from "./useEthersSigner";

const useCreate1155Contract = () => {
  const signer = useEthersSigner()
  const { address } = useAccount() as any;
  const factoryAddress = "0x777777C338d93e2C7adf08D102d45CA7CC4Ed021"
  const contractName = "ONCHAINMAGIC🪄";

  const signTransaction = async (args: any[]) => {
    console.log("SWEETS SIGNING", factoryAddress);
    const factory = new Contract(factoryAddress, abi, signer);
    console.log("SWEETS SIGNING", factory);
    const tx = await factory.createContract(...args);
    const response = await tx.wait();
    return response;
  };

  const createContract = async () => {
    console.log("SWEETS CREATING CONTRACT");
    try {
      const ipfs = await store(getZoraBlob(address), contractName, "", address);
      console.log("SWEETS ipfs", ipfs);
      const setupActions = [] as any[];

      const args = [
        `ipfs://${ipfs}`,
        contractName,
        {
          royaltyRecipient: "0x0000000000000000000000000000000000000000",
          royaltyMintSchedule: 0,
          royaltyBPS: 0,
        },
        address,
        setupActions,
      ];
      console.log("SWEETS args", args);
      await signTransaction(args);
    } catch (error) {
      console.log("SWEETS error", error);
      return { error };
    }
  };

  return {
    deploy: createContract,
  };
};

export default useCreate1155Contract;
