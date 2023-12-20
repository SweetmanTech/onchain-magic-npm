# onchain-magic

## 0.1.24

### Patch Changes

- I try another attempt to return tx receipt.

## 0.1.23

### Patch Changes

- I return the tx receipt from create 1155 contract hook.

## 0.1.22

### Patch Changes

- I init zora lib to handle cases when zora factory is not at deterministic crosschain address.

## 0.1.21

### Patch Changes

- I init dependencies with nft.storage to ensure applications will automatically download required packages. Originally, this package was a peerDependency. peerDependencies are not automatically installed in npm versions 3 and later.

## 0.1.20

### Patch Changes

- I add description to Create1155ContractArgs

## 0.1.19

### Patch Changes

- 565fba7: I rearrange console logs and reduce the setupActions to try debugging final hiccups for first prototype.
- 4684a88: I update ethers imports in useCreate1155Contract hook to only reference top-level ethers package.
- 565fba7: I remove the get1155ProxyAddress lib. Now, all chains are deployed to deterministic Zora Factory1155 address: 0x777777C338d93e2C7adf08D102d45CA7CC4Ed021"
- f7e3af4: I update export structure.
- 687833f: I update tsconfig module type from NextJS to ES2020."
- 37e69dc: I add all exports necessary for initial version of subparticles with ProducedByDav."
- e87779c: I follow a new youtube tutorial: Blazing Fast Tips: Publishing to NPM
- b4dc219: fix type declarations on returns of ipfs lib.
- cff4fa6: I update tsconfig to attempt to resolve zoralabs import error.
