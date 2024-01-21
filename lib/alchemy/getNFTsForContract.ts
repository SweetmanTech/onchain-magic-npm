import axios from "axios"
import { base } from "viem/chains"
import getAlchemyBaseUrl from "./getAlchemyBaseUrl"

const getNFTsForContract = async (contractAddress: string, chainId: number = base.id) => {
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  const { data } = await axios.get(
    `${getAlchemyBaseUrl(
      chainId,
    )}nft/v3/${alchemyKey}/getNFTsForContract?contractAddress=${contractAddress}&withMetadata=true`,
  )
  return data
}

export default getNFTsForContract
