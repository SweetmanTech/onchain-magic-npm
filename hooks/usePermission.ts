const usePermission = (collectionContract: any) => {
  const isAdminOrRole = async (user: string, tokenId: number, role: number) => {
    if (!collectionContract) return false;
    const response = await collectionContract.isAdminOrRole(
      user,
      tokenId,
      role
    );
    return response;
  };

  const addPermission = async (tokenId: number, user: string, role: number) => {
    if (!collectionContract) return false;
    const tx = await collectionContract.addPermission(tokenId, user, role);
    const receipt = await tx.wait();
    return receipt;
  };

  return { addPermission, isAdminOrRole };
};

export default usePermission;
