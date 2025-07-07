import { NFTStorage, File } from 'nft.storage'

const NFT_STORAGE_TOKEN = import.meta.env.VITE_NFT_STORAGE_TOKEN

if (!NFT_STORAGE_TOKEN) {
  console.warn('NFT_STORAGE_TOKEN not found. Please add VITE_NFT_STORAGE_TOKEN to your .env file')
}

const client = NFT_STORAGE_TOKEN ? new NFTStorage({ token: NFT_STORAGE_TOKEN }) : null

export async function uploadToIPFS(canvas, name, description) {
  // If no client, use mock data immediately
  if (!client) {
    console.warn('NFT.Storage client not initialized. Using mock IPFS URL for demo purposes')
    return {
      imageUrl: canvas.toDataURL(),
      metadataUrl: 'mock-metadata-url'
    }
  }

  try {
    // Convert canvas to blob
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, 'image/png')
    })

    // Create metadata
    const metadata = await client.store({
      name,
      description,
      image: new File([blob], `${name}.png`, { type: 'image/png' }),
      attributes: [
        { trait_type: 'Type', value: 'Meme' },
        { trait_type: 'Created', value: new Date().toISOString() }
      ]
    })

    return {
      imageUrl: `https://ipfs.io/ipfs/${metadata.data.image.pathname.slice(7)}`,
      metadataUrl: `https://ipfs.io/ipfs/${metadata.ipnft}`
    }
  } catch (error) {
    console.error('IPFS upload failed:', error)
    console.warn('Using mock IPFS URL for demo purposes')

    return {
      imageUrl: canvas.toDataURL(),
      metadataUrl: 'mock-metadata-url'
    }
  }
}