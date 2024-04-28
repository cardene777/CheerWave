# CheerWave

## Quick Start


### Install

```bash
bun install
forge install
```

### `.env`

```bash
cp .env.example .env
```

### Compile

```bash
forge build
```

- output

```bash
[⠢] Compiling...
[⠔] Compiling 47 files with 0.8.23
[⠒] Solc 0.8.23 finished in ...s
Compiler run successful!
```

### Test

```bash
forge test
```

- output

```bash
[⠢] Compiling...
[⠃] Compiling 47 files with 0.8.23
[⠑] Solc 0.8.23 finished in ...s
Compiler run successful!

No tests found in project! Forge looks for functions that starts with `test`.
```

### Deploy

```bash
npx hardhat deploy:flow-sender --network sepolia
```

## Check Contract

### Install

```bash
poetry shell
poetry install
```

### Check Solc

```bash
solc-select install 0.8.23
```

- output

```bash
Installing solc '0.8.23'...
Version '0.8.23' installed.
```

### Run

```bash
slither contracts

# or

slither contracts/HardhatFoundryERC721.sol
```

## Contract

| Contract | Contract Address | Explorer |
| :------: | :--------------: | :------: |
| FlowSender | `0x063Fb2C8132B8311715458114F8CF10AC2d59204` | https://sepolia.etherscan.io/address/0x063Fb2C8132B8311715458114F8CF10AC2d59204 |
