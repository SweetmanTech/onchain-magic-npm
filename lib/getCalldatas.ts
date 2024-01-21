import { utils } from "ethers";
import getEncodedMinterArgs from "./getEncodedMinterArgs";
import abi from "./abi/Zora1155Drop.json";

const getCalldatas = (
  count: number,
  minter: string,
  referral: string,
  to: string
) => {
  const iface = new utils.Interface(abi);
  const quantity = 1;
  const mintReferral = referral;
  const minterArguments = getEncodedMinterArgs(to, "MAGIC");

  return Array.from({ length: count }, (_, index) => {
    const tokenId = index + 1;
    return iface.encodeFunctionData("mintWithRewards", [
      minter,
      tokenId,
      quantity,
      minterArguments,
      mintReferral,
    ]);
  });
};

export default getCalldatas;
