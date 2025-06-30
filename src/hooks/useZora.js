import { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { ZoraMinter } from '../utils/zora'

export function useZora() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { address } = useAccount()
  const { data: signer } = useSigner()

  const mintMeme = async (memeData) => {
    if (!signer || !address) {
      throw new Error('Wallet not connected')
    }

    setIsLoading(true)
    setError(null)

    try {
      const minter = new ZoraMinter(signer)
      const result = await minter.mintMemeCoin({
        ...memeData,
        creator: address
      })
      
      return result
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    mintMeme,
    isLoading,
    error
  }
}

// Updated MemeEditor component to use real Zora minting
// src/components/MemeEditor.jsx (UPDATE the mintMeme function)

// Replace the mintMeme function in MemeEditor.jsx with this:
/*
const mintMeme = async () => {
  if (!canvas || !isConnected) {
    toast.error('Please connect your wallet first!')
    return
  }

  if (!memeTitle.trim()) {
    toast.error('Please enter a title for your meme!')
    return
  }

  setIsMinting(true)
  
  try {
    // Step 1: Upload to IPFS
    toast.loading('Uploading to IPFS...', { id: 'minting' })
    const { imageUrl, metadataUrl } = await uploadToIPFS(
      canvas.getElement(),
      memeTitle,
      memeDescription || 'A meme created with MemeCoinify'
    )

    // Step 2: Mint on Zora using real contract
    toast.loading('Minting on Zora...', { id: 'minting' })
    
    const { mintMeme: zoraMint } = useZora()
    const result = await zoraMint({
      title: memeTitle,
      description: memeDescription || 'A meme created with MemeCoinify',
      imageUrl
    })
    
    const newMeme = {
      id: Date.now(),
      title: memeTitle,
      description: memeDescription,
      imageUrl,
      metadataUrl,
      creator: address,
      timestamp: new Date().toISOString(),
      coinId: result.tokenId,
      transactionHash: result.transactionHash,
      coinSymbol: result.coinSymbol
    }
    
    onMemeCreated(newMeme)
    toast.success(`Meme minted as ${result.coinSymbol}!`, { id: 'minting' })
    
    // Reset form
    setMemeTitle('')
    setMemeDescription('')
    clearCanvas()
    
  } catch (error) {
    console.error('Minting failed:', error)
    toast.error('Failed to mint meme. Please try again.', { id: 'minting' })
  } finally {
    setIsMinting(false)
  }
}
*/