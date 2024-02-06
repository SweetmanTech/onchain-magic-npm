const useCallSale = (collectionContract: any) => {
  const callSale = async (
    tokenId: number,
    salesConfig: string,
    data: string
  ) => {
    const tx = await collectionContract.callSale(tokenId, salesConfig, data);
    const receipt = await tx.wait();
    return receipt;
  };

  return { callSale };
};

export default useCallSale;
