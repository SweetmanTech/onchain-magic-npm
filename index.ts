import useCreate1155Contract from "./hooks/useCreate1155Contract";
import { useEthersSigner } from "./hooks/useEthersSigner"
import  { uploadToIpfs, store } from "@/lib/ipfs"
import type { Create1155ContractArgs } from "@/lib/types/Create1155ContractArgs"
import useZoraFixedPriceSaleStrategy from "@/hooks/useZoraFixedPriceSaleStrategy";
import getEncodedMinterArgs from "@/lib/zora/getEncodedMinterArgs";
import useUniversalMinter from "@/hooks/useUniversalMinter";
import useCollection from "@/hooks/useCollection";
import usePermission from "@/hooks/useCollection";
import useCallSale from "@/hooks/useCollection";
import useErc20FixedPriceSaleStrategy from "./hooks/useErc20FixedPriceSaleStrategy";
import getNFTsForContract from "@/lib/alchemy/getNFTsForContract";
import getFormattedDrops from "@/lib/getFormattedDrops";
import getDefaultProvider from "@/lib/getDefaultProvider";
import getCalldatas from "@/lib/getCalldatas";
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
    getNFTsForContract,
    
    // IPFS 
    store,
    uploadToIpfs,

    // Misc.
    getCalldatas,
    getDefaultProvider,
    getEncodedMinterArgs,
    getFormattedDrops
};

