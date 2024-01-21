import { useMemo } from "react";
import { BigNumber, Contract, utils } from "ethers";
import { useEthersSigner } from "./useEthersSigner";
import abi from "../lib/abi/Zora1155Drop.json";
import { ZORA_FEE, useZoraFixedPriceSaleStrategy } from "..";
import getEncodedMinterArgs from "../lib/zora/getEncodedMinterArgs";

const use1155Collect = (zora1155Drop: string, minterAddress: string) => {
  const signer = useEthersSigner();
  const zora1155DropContract = useMemo(
    () => new Contract(zora1155Drop, abi, signer),
    [zora1155Drop, signer]
  );
  const { sale } = useZoraFixedPriceSaleStrategy({ saleConfig: minterAddress });

  const mintWithRewards = async (
    tokenId: string,
    to: string,
    referral: string,
    comment = "🪄🪄🪄"
  ) => {
    const response = await sale(zora1155Drop, "1");
    const value = BigNumber.from(response.pricePerToken.toString()).add(
      ZORA_FEE
    );
    const minterArguments = getEncodedMinterArgs(to, comment);
    const tx = await zora1155DropContract.mintWithRewards(
      minterAddress,
      tokenId,
      1,
      minterArguments,
      referral,
      {
        value,
      }
    );

    const receipt = await tx.wait();
    return receipt;
  };

  return { mintWithRewards };
};

export default use1155Collect;
