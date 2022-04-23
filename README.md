<img src="https://raw.githubusercontent.com/worldcoin/world-id-js/main/world-id-logo.svg" alt="World ID logo" width="300" />

# World ID Example - Mesha Airdrop

This repository contains an example decentralized application (dapp) for [World ID](https://id.worlcoin.org). With Mesha Airdrop test airdropping an ERC-20 token validating a single person can only claim a token once.

> World ID is a mechanism to verify a single human has performed a specific action only once without exposing any personal information.

This repository contains the frontend dapp example. **Please check [this repository][smartcontract] for the smart contract example.**

The Javascript integration is the simplest way to integrate [World ID](https://id.worldcoin.org). The package currently supports web applications and requires only a few lines of code.

## 🚀 Quick start

You can test this dApp right away with our deployed smart contract in the [Polygon Mumbai Testnet](https://mumbai.polygonscan.com) (address `0x330C8452C879506f313D1565702560435b0fee4C`). This deployed contract uses the [World ID Test Network](https://id.worldcoin.org/test) for verified identities.

1. Install dependencies.

```bash
npm install
```

2. Run app (will open browser automatically).

```bash
npm run dev
```

3. Go to [Usage instructions](#-usage-instructions).

## 🗝 Usage instructions

To test this dApp in the [Polygon Mumbai Testnet](https://mumbai.polygonscan.com), follow these steps:

1. Prepare a wallet that has access to the Mumbai Testnet. We recommend using Metamask mobile (you will need to add the Mumbai network manually). Our [docs](https://id.worldcoin.org) contain more detailed instructions on how to do this. Alternatively, there's instructions for how to use the [WalletConnect Test Wallet](https://github.com/WalletConnect/walletconnect-test-wallet).
2. Fund the wallet with some `MATIC`. You can use the [official faucet](https://faucet.polygon.technology) or any other faucet.
3. Launch the mockWLD app (app that holds World ID identities and generates ZKPs) at: [https://mock-app.id.worldcoin.org](https://mock-app.id.worldcoin.org) & follow instructions to generate/fetch your identity and add it to the list of verified identities.

And you're good to go! The airdrop app will guide you through the process:

- You'll first connect your wallet (e.g. Metamask).
- You will then do the World ID verification process.
- You will then execute the smart contract transaction with your wallet.

## 🤓 Advanced setup (custom deployment)

Follow these steps if you want to use your own smart contract and/or use a different network.

1. Deploy your own smart contract using the Airdrop smart contract from [this repository][smartcontract].
2. Set the contract address using the `WLD_CONTRACT_ADDRESS` env var (or edit `const.tsx` directly).
3. Update the contract's ABI in `const.tsx` (if you changed the contract's `claim` function).

## 📄 Documentation

Full documentation for this and all World ID examples can be found at [https://id.worldcoin.org/docs/examples](https://id.worldcoin.org/docs/examples).

## 🧑‍⚖️ License

This repository is MIT licensed. Please review the LICENSE file in this repository.

Copyright (C) 2022 Tools for Humanity Corporation.

[smartcontract]: https://github.com/worldcoin/world-id-example-airdrop
