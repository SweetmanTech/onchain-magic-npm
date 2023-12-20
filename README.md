# Getting Started with OnchainMagic 🪄

## Getting started

```bash
npm install onchain-magic
# or
yarn add onchain-magic
```

```
import { useCreate1155Contract } from 'onchain-magic';

const MyComponent = () => {
    const { createContract } = useCreate1155Contract()

    const handleClick = () => {
        createContract()
    }

    return(
        <button onClick={handleClick}>Deploy on Zora</button>
    )
}

export default MyComponent
```
