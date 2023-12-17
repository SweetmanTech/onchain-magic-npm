const ETH_MAINNET = ""
const ZORA_MAINNET = ""
const OP_MAINNET = "0x78b524931e9d847c40BcBf225c25e154a7B05fDA"
const BASE_MAINNET = ""
const GOERLI_TESTNET = ""
const ZORA_TESTNET = ""
const OP_TESTNET = "0xb0C56317E9cEBc6E0f7A59458a83D0A9ccC3e955"
const BASE_TESTNET = ""

const getZora1155ProxyAddress = (chainId) => {
  if (chainId === 1) {
    return ETH_MAINNET
  }
  if (chainId === 7777777) {
    return ZORA_MAINNET
  }
  if (chainId === 10) {
    return OP_MAINNET
  }
  if (chainId === 8453) {
    return BASE_MAINNET
  }
  if (chainId === 5) {
    return GOERLI_TESTNET
  }
  if (chainId === 999) {
    return ZORA_TESTNET
  }
  if (chainId === 420) {
    return OP_TESTNET
  }
  if (chainId === 84531) {
    return BASE_TESTNET
  }
  return ETH_MAINNET
}

export default getZora1155ProxyAddress
