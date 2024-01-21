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

type UseCollectionParams = {
  collectionAddress: string;
  chainId: number;
  minterOverride?: string;
};

const useCollection = ({
  collectionAddress,
  chainId,
  minterOverride,
}: UseCollectionParams) => {
  const [drops, setDrops] = useState([] as any);
  const [priceValues, setPriceValues] = useState([] as string[]);
  const { mintBatchWithoutFees } = useUniversalMinter(chainId);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const minter =
    minterOverride ||
    zoraCreatorFixedPriceSaleStrategyAddress[
      chainId as keyof typeof zoraCreatorFixedPriceSaleStrategyAddress
    ];
  const { sale } = useZoraFixedPriceSaleStrategy(minter);
  const { switchNetwork } = useSwitchNetwork();

  const collectAll = async () => {
    if (chain?.id !== chainId) {
      switchNetwork?.(chainId);
      return false;
    }
    const targets = Array(drops.length).fill(collectionAddress);
    const calldatas = getCalldatas(
      drops.length,
      minter,
      address as string,
      address as string
    );
    const totalValue = priceValues.reduce(
      (total, value) => total.add(BigNumber.from(value)),
      BigNumber.from(0)
    );
    const response = await mintBatchWithoutFees(
      targets,
      calldatas,
      priceValues,
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

  useEffect(() => {
    const getValues = async () => {
      if (drops.length === 0) return;
      const pricesPromises = drops.map((_: any, index: number) => {
        const tokenId = BigNumber.from(index + 1);
        return sale(collectionAddress, tokenId.toString());
      });
      const prices = await Promise.all(pricesPromises);
      const values = prices.map((price) =>
        price.pricePerToken.add(ZORA_FEE).toString()
      );
      setPriceValues(values);
    };

    getValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minter, drops]);

  return { drops, collectAll, priceValues };
};

export default useCollection;
