import { BigNumber, utils } from "ethers";
import abi from "@/lib/abi/ERC20FixedPriceSaleStrategy.json";

type GetCallSaleDataType = {
  tokenId: string | number | bigint | BigNumber;
  saleStart: string | number | bigint | BigNumber;
  saleEnd: string | number | bigint | BigNumber;
  maxTokensPerAddress: string | number | bigint | BigNumber;
  pricePerToken: string | number | bigint | BigNumber;
  fundsRecipient: string;
  erc20Address: string;
};

const getCallSaleData = ({
  tokenId,
  saleStart,
  saleEnd,
  maxTokensPerAddress,
  pricePerToken,
  fundsRecipient,
  erc20Address,
}: GetCallSaleDataType) => {
  const iface = new utils.Interface(abi);

  return iface.encodeFunctionData("setSale", [
    tokenId,
    {
      saleStart,
      saleEnd,
      maxTokensPerAddress,
      pricePerToken,
      fundsRecipient,
      erc20Address,
    },
  ]);
};

export default getCallSaleData;
