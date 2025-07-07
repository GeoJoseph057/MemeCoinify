# 🪙 MemeCoinify – Web3 Meme Creation & NFT Platform

**MemeCoinify** is a Web3-enabled React application that empowers users to **create**, **mint**, and **trade memes** as NFTs on the blockchain. Built for meme lovers and crypto enthusiasts, it combines the creativity of meme-making with the power of decentralized technologies.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Web3 wallet (MetaMask, etc.)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with:
   ```
   VITE_NFT_STORAGE_TOKEN=your_nft_storage_token_here
   VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
   ```
4. Start the development server: `npm run dev`

### Environment Variables Setup
- **VITE_NFT_STORAGE_TOKEN**: Get from [NFT.Storage](https://nft.storage/) (free)
- **VITE_WALLETCONNECT_PROJECT_ID**: Get from [WalletConnect Cloud](https://cloud.walletconnect.com/) (free)

> **Note**: If you don't have these tokens, the app will still work with mock data for demo purposes.

---

## 🎨 Core Features

### 🖼 Meme Creation

* Built-in meme editor with popular templates
* Add custom top and bottom text overlays
* Upload your own images to make personalized memes
* Real-time meme preview using HTML5 Canvas

### 🔗 NFT Minting

* Integrated with the **Zora Protocol** for minting NFTs
* Decentralized image & metadata storage using **IPFS**
* Multi-chain support: Ethereum Mainnet, Base, and Zora Network

### 🌐 Web3 Integration

* Wallet connection via **RainbowKit** (MetaMask, WalletConnect, etc.)
* Blockchain communication using **Wagmi** and **Ethers.js**

### 🧑‍🤝‍🧑 Social Features

* Discover community memes in the **Meme Feed**
* Like, search, and filter memes
* Personal **Portfolio View** to showcase your own minted NFTs

---

## 🚀 User Flow

1. **Connect** your Web3 wallet
2. **Create** a meme using templates or upload your own image
3. **Customize** it with your own text overlays
4. **Mint** the meme as an NFT via Zora Protocol
5. **Share or trade** your meme NFT in the community feed

---

## 💸 Monetization

* Each meme can be assigned a random value (for demo purposes)
* Trade meme NFTs for cryptocurrency on supported networks
* Optional integration with **Zora's CoinV4** for meme coin creation

---

## ⚙️ How Minting Works (Zora Integration FAQ)

### 🧾 Does minting a meme record it on the Zora blockchain?

Yes, **if properly integrated** with Zora's smart contracts. The NFT is minted and stored on-chain (Ethereum, Zora Network, etc.) via a transaction.

### 🔍 How does it get recorded?

1. **User creates a meme** and clicks "Mint"
2. **Smart contract call** is made using `ethers.js` / `wagmi` to Zora's protocol
3. **Metadata is stored** on IPFS (image + title + description)
4. **NFT is minted**, and a transaction is recorded on-chain
5. You can **view it on Zora's block explorer**

### ✅ How to verify it's minting?

* Look for transaction hashes in the frontend after minting
* Check integration with Zora's SDK or contracts (e.g. `@zoralabs/protocol-sdk`)
* Confirm the NFT is visible on Zora or OpenSea

---

## 🛠 Tech Stack

* **React** (Frontend)
* **Ethers.js** + **Wagmi** (Blockchain communication)
* **RainbowKit** (Wallet UI)
* **Zora Protocol** (NFT & Coin Minting)
* **IPFS** (Decentralized media storage)
* **HTML5 Canvas** (Meme editing)

---

## 📂 Project Structure (Optional Section)

```
/src
  /components     // Meme editor, feed, wallet, etc.
  /hooks          // Web3 and custom logic
  /utils          // IPFS, Zora helpers
  /assets         // Templates and default memes
```

---

## 📜 License

MIT License. Feel free to fork, remix, and meme on.

---

