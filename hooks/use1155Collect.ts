import { useMemo } from "react";
import { Contract, utils } from "ethers";
import { useEthersSigner } from "./useEthersSigner";
import abi from "../lib/abi/Zora1155Drop.json";

const use1155Collect = (zora1155Drop: string, minterAddress: string) => {
  const signer = useEthersSigner();
  const zora1155DropContract = useMemo(
    () => new Contract(zora1155Drop, abi, signer),
    [zora1155Drop, signer]
  );

  const mintWithRewards = async (
    tokenId: string,
    to: string,
    referral: string,
    comment = "🪄🪄🪄"
  ) => {
    const minterArguments = utils.defaultAbiCoder.encode(
      ["address", "string"],
      [to, comment]
    );
    const tx = await zora1155DropContract.mintWithRewards(
      minterAddress,
      tokenId,
      1,
      minterArguments,
      referral,
      {
        value: "1554000000000000",
      }
    );

    const receipt = await tx.wait();
    return receipt;
  };

  return { mintWithRewards };
};

export default use1155Collect;
