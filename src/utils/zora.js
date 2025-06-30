import { ethers } from 'ethers'

// Zora CoinV4 Contract ABI (simplified - you'll need the full ABI)
const COIN_V4_ABI = [
  "function mint(address to, string memory name, string memory symbol, string memory description, string memory image) external returns (uint256)",
  "function tokenURI(uint256 tokenId) external view returns (string)",
  "function balanceOf(address owner) external view returns (uint256)",
  "event CoinCreated(uint256 indexed tokenId, address indexed creator, string name)"
]

// Contract addresses (update with actual addresses)
const CONTRACTS = {
  ZORA_COIN_V4: "0x777777751622c0d3258f214F9DF38E35BF45baF3", // Replace with actual Zora CoinV4 contract address
  ZORA_NETWORK_ID: 7777777 // Zora mainnet chain ID
}

export class ZoraMinter {
  constructor(signer) {
    this.signer = signer
    this.contract = new ethers.Contract(
      CONTRACTS.ZORA_COIN_V4,
      COIN_V4_ABI,
      signer
    )
  }

  async mintMemeCoin(memeData) {
    try {
      const { title, description, imageUrl, creator } = memeData
      
      // Generate coin symbol from title
      const symbol = title
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '')
        .substring(0, 6) || 'MEME'

      console.log('Minting meme coin:', { title, symbol, description, imageUrl })

      // Call the mint function
      const tx = await this.contract.mint(
        creator,
        title,
        symbol,
        description,
        imageUrl
      )

      console.log('Transaction sent:', tx.hash)
      
      // Wait for transaction confirmation
      const receipt = await tx.wait()
      console.log('Transaction confirmed:', receipt)

      // Extract token ID from events
      const coinCreatedEvent = receipt.events?.find(
        event => event.event === 'CoinCreated'
      )
      
      const tokenId = coinCreatedEvent?.args?.tokenId?.toString()

      return {
        success: true,
        tokenId,
        transactionHash: tx.hash,
        coinSymbol: symbol
      }

    } catch (error) {
      console.error('Minting failed:', error)
      throw new Error(`Minting failed: ${error.message}`)
    }
  }

  async getCoinInfo(tokenId) {
    try {
      const tokenURI = await this.contract.tokenURI(tokenId)
      return { tokenURI }
    } catch (error) {
      console.error('Failed to get coin info:', error)
      return null
    }
  }
}
