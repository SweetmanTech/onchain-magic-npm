import { Contract } from "ethers";
import { useMemo } from "react";
import { base } from "viem/chains";
import { zoraUniversalMinterAddress } from "@zoralabs/universal-minter";
import abi from "../lib/abi/ZoraUniversalMinter.json";
import { useEthersSigner } from "./useEthersSigner";

const useUniversalMinter = (chainId: number = base.id) => {
  const universalMinter =
    zoraUniversalMinterAddress[
      chainId as keyof typeof zoraUniversalMinterAddress
    ];
  const signer = useEthersSigner();

  const universalMinterContract = useMemo(
    () => universalMinter && new Contract(universalMinter, abi, signer),
    [universalMinter, signer]
  );

  const mintBatchWithoutFees = async (
    targets: any[],
    calldatas: any[],
    values: any[],
    value: any
  ) => {
    try {
      const tx = await universalMinterContract.mintBatchWithoutFees(
        targets,
        calldatas,
        values,
        {
          value,
        }
      );
      const receipt = await tx.wait();
      return receipt;
    } catch (error) {
      return { error };
    }
  };

  return { mintBatchWithoutFees, universalMinter };
};

export default useUniversalMinter;
