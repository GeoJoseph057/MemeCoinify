<<<<<<< HEAD
# 🪙 MemeCoinify – Web3 Meme Creation & NFT Revenue Platform

=======

# 🪙 MemeCoinify – Web3 Meme Creation & NFT Revenue Platform

>>>>>>> b4f4da2a13df7af4b69610d0d4a3231dbd11f791
**Create. Mint. Earn. Meme.**

---

## 📌 Overview

**MemeCoinify** is a cutting-edge Web3 platform that transforms viral meme culture into a decentralized economy. Designed for meme creators and crypto enthusiasts alike, MemeCoinify enables users to create, mint, and monetize memes as NFTs—with a built-in revenue-sharing model that rewards both creators and viewers in cryptocurrency.

---

## 💡 Core Value Proposition

* 🎨 **Built-in Meme Editor** with ready-to-use templates & real-time preview
* ⛓️ **One-click NFT Minting** with IPFS & Zora Protocol integration
* 💸 **Automated ETH Rewards** distributed between creators, viewers, and platform
* 🌐 **Web3 Social Layer** featuring wallet connection, meme feed, and portfolio tracking

---

## ⚙️ Technical Architecture

### 🖥️ Frontend Stack

```
<<<<<<< HEAD
React 19 + Vite + Tailwind CSS
Component-based modular architecture
Responsive design & performance optimization
Web3 connectivity with Wagmi + RainbowKit
=======
React 19 + Vite + Tailwind CSS  
Component-based modular architecture  
Responsive design & performance optimization  
Web3 connectivity with Wagmi + RainbowKit  
>>>>>>> b4f4da2a13df7af4b69610d0d4a3231dbd11f791
```

### 🔗 Blockchain & Backend

* NFT minting via **Zora Protocol**
* Decentralized storage with **IPFS** or **Filebase**
* Smart contracts for **ETH revenue distribution**
* Multi-chain deployment: Ethereum Mainnet, Base, and Zora Network

### 🔁 Data Flow

```
<<<<<<< HEAD
User Interaction → Meme Editor → IPFS Upload
→ Smart Contract Mint → NFT Listing & Revenue Triggers
=======
User Interaction → Meme Editor → IPFS Upload  
→ Smart Contract Mint → NFT Listing & Revenue Triggers  
>>>>>>> b4f4da2a13df7af4b69610d0d4a3231dbd11f791
→ View Event → ETH Split (Creator, Viewer, Platform)
```

---

## ✨ Key Features

### 🖼 Meme Creation Studio

* Template gallery and upload support
* Text overlays with real-time canvas preview
* Download/export capability

### 🔗 NFT Minting Infrastructure

* IPFS-based metadata storage
* Seamless one-click minting with Zora Protocol
* Real-time transaction status and blockchain explorer support
* Marketplace visibility via Zora & OpenSea

### 💰 Revenue Sharing System

* Automatic ETH rewards per meme view
* **60/30/10 split**: Creator / Viewer / Platform
* Per-meme analytics and earning dashboard
* Smart contract-based distribution for transparency

### 🌍 Web3 & Social Ecosystem

* Wallet connection via MetaMask, RainbowKit
* Public meme feed with like, search & filter functionality
* Personal NFT portfolio with earnings tracking
* Optional **meme coin** creation using Zora CoinV4

---

## 💸 Revenue Model

### 📈 ETH Distribution (Per Meme View)

```
Total: 0.001 ETH
├── 60% → Creator (0.0006 ETH)
├── 30% → Viewer (0.0003 ETH)
└── 10% → Platform (0.0001 ETH)
```

### 🔁 Revenue Streams

1. Meme minting and trading
2. Community engagement and viewing
3. Social sharing and virality
4. Portfolio performance & viewer-based rewards

---

## 🧰 Tech Stack

### Frontend

| Technology   | Purpose               |
| ------------ | --------------------- |
| React 19     | UI Development        |
| Vite         | Build Optimization    |
| Tailwind CSS | Utility-first Styling |
| RainbowKit   | Wallet UI Integration |
| Wagmi        | Web3 State Management |

### Web3 & Blockchain

| Tool            | Function                   |
| --------------- | -------------------------- |
| Ethers.js       | Smart Contract Interaction |
| Zora Protocol   | NFT & Coin Minting         |
| IPFS / Filebase | Decentralized Storage      |
| Ethereum, Base  | Blockchain Networks        |

### Dev & Build Tools

| Tool     | Purpose           |
| -------- | ----------------- |
| ESLint   | Code Quality      |
| Prettier | Code Formatting   |
| PostCSS  | CSS Preprocessing |

---

## 🔌 API Integration Snippets

### 🧾 IPFS Upload

```ts
const { imageUrl, metadataUrl } = await uploadToIPFS(canvas, title, description);
```

### 🪙 Zora NFT Minting

```ts
const result = await zoraMint({
  title: memeTitle,
  description: memeDescription,
  imageUrl: imageUrl
});
```

### 💵 Revenue Distribution

```ts
const revenueData = handleMemeView(memeId, viewerAddress, creatorAddress);
```

---

<<<<<<< HEAD
## 🔧 Configuration

### Environment Setup

Create a `.env` file in the root directory:

```env
# Required for production
VITE_NFT_STORAGE_TOKEN=your_nft_storage_token
VITE_FILEBASE_API_KEY=your_filebase_api_key
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Optional
VITE_FILEBASE_ENDPOINT=https://api.filebase.io
VITE_FILEBASE_BUCKET=memecoinify
```

### Demo Mode

If no API keys are configured, the app runs in **demo mode**:
- ✅ All features work locally
- ✅ Memes persist in browser localStorage
- ✅ Demo memes are loaded automatically
- ⚠️ No real IPFS uploads

See [CONFIGURATION.md](./CONFIGURATION.md) for detailed setup instructions.

=======
>>>>>>> b4f4da2a13df7af4b69610d0d4a3231dbd11f791
## 🪪 License

This project is licensed under the **MIT License**.
Fork it. Remix it. Meme on.

---
