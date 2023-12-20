import { sepolia } from "wagmi";

const getFactoryAddress = (chainId: number) => {
  switch (chainId) {
    case sepolia.id:
      return "0x13dAA8E9e3f68deDE7b1386ACdc12eA98F2FB688";
    default:
      return "0x777777C338d93e2C7adf08D102d45CA7CC4Ed021";
  }
};

export default getFactoryAddress;
