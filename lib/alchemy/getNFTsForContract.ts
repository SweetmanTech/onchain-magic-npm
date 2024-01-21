import { base } from "viem/chains";
import getAlchemyBaseUrl from "./getAlchemyBaseUrl";

const getNFTsForContract = async (
  contractAddress: string,
  chainId: number = base.id
) => {
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  const response = await fetch(
    `${getAlchemyBaseUrl(
      chainId
    )}nft/v3/${alchemyKey}/getNFTsForContract?contractAddress=${contractAddress}&withMetadata=true`
  );

  if (!response.ok) {
    return { error: response };
  }

  const data = await response.json();
  return data;
};

export default getNFTsForContract;
