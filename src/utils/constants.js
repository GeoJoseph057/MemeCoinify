import { mainnet, base, zora } from 'wagmi/chains'

export const SUPPORTED_CHAINS = [mainnet, base, zora]

export const MEME_TEMPLATES = [
  { id: 'drake', name: 'Drake Pointing', url: '/meme-templates/drake.jpg' },
  { id: 'distracted', name: 'Distracted Boyfriend', url: '/meme-templates/distracted-boyfriend.jpg' },
  { id: 'cat', name: 'Woman Yelling at Cat', url: '/meme-templates/woman-yelling-cat.jpg' }
]

export const CONTRACT_ADDRESSES = {
  ZORA_COIN_V4: '0x777777751622c0d3258f214F9DF38E35BF45baF3', // Add actual Zora CoinV4 contract address
}