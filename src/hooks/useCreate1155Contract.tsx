import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";
import { Interface } from "ethers/lib/utils";
import abi from "../lib/abi/abi-Zora1155CreatorProxy.json";
import dropAbi from "../lib/abi/abi-ERC1155Drop.json";
import handleTxError from "../lib/handleTxError";
import { useDeploy } from "../providers/DeployContext";
import usePrivySendTransaction from "./usePrivySendTransaction";
import { chainId } from "../lib/consts";
import { getZoraBlob, store } from "../lib/ipfs";
import getZora1155ProxyAddress from "../lib/zora/getZora1155ProxyAddress";
import { getCreated1155DropsByAddress } from "../lib/zora/getCreated1155DropsByAddress";
import { useUserProvider } from "../providers/UserProvider";

const useCreate1155Contract = () => {
  const { direccionDePago } = useDeploy();
  const { authenticated } = usePrivy();
  const { sendTransaction } = usePrivySendTransaction();
  const factoryAddress = getZora1155ProxyAddress(chainId);
  const { connectedWallet } = useUserProvider();
  const { push } = useRouter();
  const contractName = "S T O R I E S 🪄";

  const createContract = async () => {
    try {
      const ipfs = await store(
        getZoraBlob(direccionDePago),
        contractName,
        "",
        direccionDePago
      );
      const adminPermissionArgs = [0, connectedWallet, 2];
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
        direccionDePago,
        setupActions,
      ];
      signTransaction(args);
    } catch (err) {
      handleTxError(err);
    }
  };

  return {
    deploy: createContract,
  };
};

export default useCreate1155Contract;
