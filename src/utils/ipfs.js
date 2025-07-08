import { NFTStorage, File } from 'nft.storage'
import { CONFIG, logConfigStatus } from './config'

// Log configuration status on import
logConfigStatus()

// Initialize NFT.Storage client if token is available
const nftStorageClient = CONFIG.NFT_STORAGE.enabled ? new NFTStorage({ token: CONFIG.NFT_STORAGE.token }) : null

export async function uploadToIPFS(canvas, name, description) {
  // Try Filebase first (sponsor tech), then NFT.Storage, then fallback to demo
  if (CONFIG.FILEBASE.enabled) {
    return await uploadToFilebase(canvas, name, description);
  } else if (CONFIG.NFT_STORAGE.enabled && nftStorageClient) {
    return await uploadToNFTStorage(canvas, name, description);
  } else {
    console.warn('No IPFS storage configured. Using demo mode with local data URLs');
    return {
      imageUrl: canvas.toDataURL(),
      metadataUrl: 'demo-metadata-url',
      isDemo: true
    };
  }
}

async function uploadToNFTStorage(canvas, name, description) {
  try {
    // Convert canvas to blob
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, 'image/png')
    })

    // Create metadata
    const metadata = await nftStorageClient.store({
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
      metadataUrl: `https://ipfs.io/ipfs/${metadata.ipnft}`,
      provider: 'nft-storage'
    }
  } catch (error) {
    console.error('NFT.Storage upload failed:', error)
    throw error;
  }
}

async function uploadToFilebase(canvas, name, _description) {
  try {
    // Convert canvas to blob
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, 'image/png')
    })

    // Create form data for Filebase upload
    const formData = new FormData();
    formData.append('file', blob, `${name}.png`);

    // Upload to Filebase using S3-compatible API
    const response = await fetch(`${CONFIG.FILEBASE.endpoint}/s3/${CONFIG.FILEBASE.bucket}/${name}.png`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${CONFIG.FILEBASE.apiKey}`,
        'Content-Type': 'image/png'
      },
      body: blob
    });

    if (!response.ok) {
      throw new Error(`Filebase upload failed: ${response.statusText}`);
    }

    // Get the IPFS hash from response headers
    const ipfsHash = response.headers.get('x-amz-meta-ipfs-hash') ||
                    response.headers.get('x-filebase-ipfs-hash') ||
                    'demo-hash';

    return {
      imageUrl: `https://ipfs.filebase.io/ipfs/${ipfsHash}`,
      metadataUrl: `https://ipfs.filebase.io/ipfs/${ipfsHash}`,
      provider: 'filebase',
      cid: ipfsHash
    }
  } catch (error) {
    console.error('Filebase upload failed:', error)
    // Fallback to demo mode if Filebase fails
    return {
      imageUrl: canvas.toDataURL(),
      metadataUrl: 'demo-metadata-url',
      provider: 'demo',
      isDemo: true
    };
  }
}