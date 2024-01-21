import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { zoraCreatorFixedPriceSaleStrategyAddress } from "@zoralabs/protocol-deployments";
import getNFTsForContract from "../lib/alchemy/getNFTsForContract";
import getFormattedDrops from "../lib/getFormattedDrops";
import useUniversalMinter from "./useUniversalMinter";
import getCalldatas from "../lib/getCalldatas";
import useZoraFixedPriceSaleStrategy from "./useZoraFixedPriceSaleStrategy";

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
  const { mintBatchWithoutFees } = useUniversalMinter(chainId);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const minter =
    minterOverride ||
    zoraCreatorFixedPriceSaleStrategyAddress[
      chainId as keyof typeof zoraCreatorFixedPriceSaleStrategyAddress
    ];
  const { priceValues } = useZoraFixedPriceSaleStrategy({
    saleConfig: minter,
    drops,
  });
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
      (total: any, value: any) => total.add(BigNumber.from(value)),
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

  return { drops, collectAll, priceValues };
};

export default useCollection;
