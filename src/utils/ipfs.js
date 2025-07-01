import { NFTStorage, File } from 'nft.storage'

console.log('NFT_STORAGE_TOKEN:', import.meta.env.VITE_NFT_STORAGE_TOKEN)

const client = new NFTStorage({
  token: import.meta.env.VITE_NFT_STORAGE_TOKEN
})

export async function uploadToIPFS(canvas, name, description) {
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
    throw error
  }
}