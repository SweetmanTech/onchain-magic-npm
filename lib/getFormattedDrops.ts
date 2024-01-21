const getFormattedDrops = (drops: any[], chainId: any) =>
  drops.map((item) => ({
    contractAddress: item.contract.address,
    chainId,
    uri: item.tokenUri,
    blockNumber: item.mint ? item?.mint?.blockNumber?.toString?.() : null,
    type: item.tokenType,
    timestamp: item.timestamp,
    tokenId: item.tokenId,
  }));

export default getFormattedDrops;
