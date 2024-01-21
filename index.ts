import useCreate1155Contract from "./hooks/useCreate1155Contract";
import { useEthersSigner } from "./hooks/useEthersSigner"
import  { uploadToIpfs, store } from "./lib/ipfs"
import type { Create1155ContractArgs } from "./lib/types/Create1155ContractArgs"
import use1155Collect from "./hooks/use1155Collect";
import useZoraFixedPriceSaleStrategy from "./hooks/useZoraFixedPriceSaleStrategy";
import getEncodedMinterArgs from "./lib/zora/getEncodedMinterArgs";
import useUniversalMinter from "./hooks/useUniversalMinter";
import useCollection from "./hooks/useCollection";
import getNFTsForContract from "./lib/alchemy/getNFTsForContract";
import getFormattedDrops from "./lib/getFormattedDrops";
import getCalldatas from "./lib/getCalldatas";
import { ZORA_FEE } from "./lib/consts";
export {
    // ZORA
    type Create1155ContractArgs,
    getEncodedMinterArgs,
    use1155Collect,
    useCollection,
    useCreate1155Contract,
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
    getFormattedDrops
};

