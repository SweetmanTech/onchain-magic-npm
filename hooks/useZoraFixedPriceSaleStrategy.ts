import { Contract } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useEthersSigner } from "./useEthersSigner";
import abi from "../lib/abi/ZoraCreatorFixedPriceSaleStrategy.json";
import { ZORA_FEE } from "../lib/consts";

type UseZoraFixedPriceSaleStrategyParams = {
  saleConfig: string;
  drops: any[];
};

const useZoraFixedPriceSaleStrategy = ({
  saleConfig,
  drops,
}: UseZoraFixedPriceSaleStrategyParams) => {
  const [priceValues, setPriceValues] = useState([] as string[]);
  const signer = useEthersSigner();
  const saleConfigContract = useMemo(
    () => saleConfig && new Contract(saleConfig, abi, signer),
    [saleConfig, signer]
  );

  const sale = useCallback(
    async (tokenContract: string, tokenId: string) => {
      try {
        if (!saleConfigContract) return;
        const response = await saleConfigContract.sale(tokenContract, tokenId);
        return response;
      } catch (error) {
        return error;
      }
    },
    [saleConfigContract]
  );

  useEffect(() => {
    const getValues = async () => {
      if (drops.length === 0) return;
      const pricesPromises = drops.map((drop: any) =>
        sale(drop.contractAddress, drop.tokenId)
      );
      const prices = await Promise.all(pricesPromises);
      const values = prices.map((price) =>
        price.pricePerToken.add(ZORA_FEE).toString()
      );
      setPriceValues(values);
    };

    getValues();
  }, [drops, sale]);

  return { sale, priceValues };
};

export default useZoraFixedPriceSaleStrategy;
