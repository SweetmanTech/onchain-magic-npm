import useCreate1155Contract from "./hooks/useCreate1155Contract";
import { useEthersSigner } from "./hooks/useEthersSigner"
import  { uploadToIpfs, store, getIpfsLink } from "@/lib/ipfs"
import type { Create1155ContractArgs } from "@/lib/types/Create1155ContractArgs"
import useZoraFixedPriceSaleStrategy from "@/hooks/useZoraFixedPriceSaleStrategy";
import getEncodedMinterArgs from "@/lib/zora/getEncodedMinterArgs";
import useUniversalMinter from "@/hooks/useUniversalMinter";
import useCollection from "@/hooks/useCollection";
import usePermission from "@/hooks/usePermission";
import useCallSale from "@/hooks/useCallSale";
import useErc20FixedPriceSaleStrategy from "./hooks/useErc20FixedPriceSaleStrategy";
import getAlchemyBaseUrl from "@/lib/alchemy/getAlchemyBaseUrl";
import getNFTsForContract from "@/lib/alchemy/getNFTsForContract";
import getFormattedDrops from "@/lib/getFormattedDrops";
import getDefaultProvider from "@/lib/getDefaultProvider";
import getCalldatas from "@/lib/getCalldatas";
import getCallSaleData from "@/lib/zora/getCallSaleData";
import { ZORA_FEE } from "@/lib/consts";

export {
    // ZORA
    type Create1155ContractArgs,
    useCollection,
    useCreate1155Contract,
    useCallSale,
    useErc20FixedPriceSaleStrategy,
    usePermission,
    useZoraFixedPriceSaleStrategy,
    useUniversalMinter,
    ZORA_FEE,

    // ETHERS
    useEthersSigner,

    // ALCHEMY
    getAlchemyBaseUrl,
    getNFTsForContract,
    
    // IPFS 
    getIpfsLink,
    store,
    uploadToIpfs,

    // Misc.
    getCalldatas,
    getCallSaleData,
    getDefaultProvider,
    getEncodedMinterArgs,
    getFormattedDrops
};

