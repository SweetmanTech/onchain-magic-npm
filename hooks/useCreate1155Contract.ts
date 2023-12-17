import { Interface } from "ethers/lib/utils";
import abi from "../src/lib/abi/Zora1155CreatorProxy.json";
import dropAbi from "../src/lib/abi/Zora1155Drop.json";
import { getZoraBlob, store } from "../src/lib/ipfs";
import getZora1155ProxyAddress from "../src/lib/zora/get1155ProxyAddress";
import { Contract } from "ethers";
import { useAccount, useNetwork } from "wagmi";

const useCreate1155Contract = (signer: any) => {
  const { address } = useAccount() as any;
  const { chain } = useNetwork();
  const factoryAddress = getZora1155ProxyAddress(chain?.id || 1);
  const contractName = "S T O R I E S 🪄";

  const signTransaction = async (args: any[]) => {
    const factory = new Contract(factoryAddress, abi, signer);
    const tx = await factory.createContract(...args);
    const response = await tx.wait();
    return response;
  };

  const createContract = async () => {
    console.log("SWEETS CREATING CONTRACT");
    try {
      const ipfs = await store(getZoraBlob(address), contractName, "", address);
      console.log("SWEETS ipfs", ipfs);

      const adminPermissionArgs = [0, address, 2];
      const minterPermissionArgs = [
        0,
        process.env.NEXT_PUBLIC_FIXED_PRICE_SALE_STRATEGY,
        4,
      ];
      const minterPermissionCall = new Interface(dropAbi).encodeFunctionData(
        "addPermission",
        minterPermissionArgs
      );
      const adminPermissionCall = new Interface(dropAbi).encodeFunctionData(
        "addPermission",
        adminPermissionArgs
      );
      const setupActions = [adminPermissionCall, minterPermissionCall];

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

      signTransaction(args);
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
