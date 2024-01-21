import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@zoralabs/protocol-deployments";
import getNFTsForContract from "../lib/alchemy/getNFTsForContract";
import getFormattedDrops from "../lib/getFormattedDrops";
import useUniversalMinter from "./useUniversalMinter";
import getCalldatas from "../lib/getCalldatas";
import { ZORA_FEE } from "../lib/consts";
import { useZoraFixedPriceSaleStrategy } from "..";

const useCollection = (collectionAddress: string, chainId: number) => {
  const [drops, setDrops] = useState([] as any);
  const { mintBatchWithoutFees } = useUniversalMinter(chainId);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const defaultMinter =
    zoraCreatorFixedPriceSaleStrategyAddress[
      chainId as keyof typeof zoraCreatorFixedPriceSaleStrategyAddress
    ];
  const { sale } = useZoraFixedPriceSaleStrategy(defaultMinter);
  const { switchNetwork } = useSwitchNetwork();

  const getValues = async () => {
    const pricesPromises = drops.map((_: any, index: number) => {
      const tokenId = BigNumber.from(index + 1);
      return sale(collectionAddress, tokenId.toString());
    });
    const prices = await Promise.all(pricesPromises);
    const values = prices.map((price) =>
      price.pricePerToken.add(ZORA_FEE).toString()
    );
    return values;
  };

  const collectAll = async (minter: string = defaultMinter) => {
    if (chain?.id !== chainId) {
      switchNetwork?.(chainId);
      return false;
    }
    const targets = Array(drops.length).fill(collectionAddress);
    console.log("SWEETS TARGETS", targets)
    const calldatas = getCalldatas(
      drops.length,
      minter,
      address as string,
      address as string
    );
    console.log("SWEETS calldatas", calldatas)
    const values = await getValues();
    console.log("SWEETS values", values)
    const totalValue = values.reduce(
      (total, value) => total.add(BigNumber.from(value)),
      BigNumber.from(0)
    );
    console.log("SWEETS totalValue", totalValue)

    const response = await mintBatchWithoutFees(
      targets,
      calldatas,
      values,
      totalValue
    );
    return response;
  };

  useEffect(() => {
    const init = async () => {
      const response = await getNFTsForContract(collectionAddress, chainId);
      const formattedDrops = getFormattedDrops(response.nfts, chainId);
      setDrops(formattedDrops);
    };

    init();
  }, [collectionAddress, chainId]);

  return { drops, collectAll };
};

export default useCollection;
