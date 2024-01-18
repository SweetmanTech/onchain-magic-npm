import { Contract } from "ethers";
import { useMemo } from "react";
import { useEthersSigner } from "./useEthersSigner";
import abi from "../lib/abi/ZoraCreatorFixedPriceSaleStrategy.json";

const useZoraFixedPriceSaleStrategy = (saleConfig: string) => {
  const signer = useEthersSigner();
  const saleConfigContract = useMemo(
    () => new Contract(saleConfig, abi, signer),
    [saleConfig, signer]
  );

  const sale = async (tokenContract: string, tokenId: string) => {
    try {
      const response = await saleConfigContract.sale(tokenContract, tokenId);
      return response;
    } catch (error) {
      return error;
    }
  };

  return { sale };
};

export default useZoraFixedPriceSaleStrategy;
