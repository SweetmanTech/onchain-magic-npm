import { base, baseGoerli, goerli, mainnet, polygon, sepolia } from "@wagmi/core/chains"

const ETH = "https://eth-mainnet.g.alchemy.com/"
const GOERLI = "https://eth-goerli.g.alchemy.com/"
const SEPOLIA = "https://eth-sepolia.g.alchemy.com/"
const POLYGON = "https://polygon-mainnet.g.alchemy.com/"
const BASE = "https://base-mainnet.g.alchemy.com/"
const BASE_GOERLI = "https://base-goerli.g.alchemy.com/"

const getAlchemyBaseUrl = (chainId: number) => {
  switch (chainId) {
    case mainnet.id:
      return ETH
    case sepolia.id:
      return SEPOLIA
    case goerli.id:
      return GOERLI
    case base.id:
      return BASE
    case baseGoerli.id:
      return BASE_GOERLI
    case polygon.id:
      return POLYGON
    default:
      return ETH
  }
}

export default getAlchemyBaseUrl
