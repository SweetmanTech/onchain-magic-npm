import { utils } from "ethers";

const getEncodedMinterArgs = (to: string, comment: string) => {
  return utils.defaultAbiCoder.encode(["address", "string"], [to, comment]);
};

export default getEncodedMinterArgs;
