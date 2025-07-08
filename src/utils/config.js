// Configuration management for API keys and environment variables
export const CONFIG = {
  // IPFS/NFT Storage Configuration
  NFT_STORAGE: {
    token: import.meta.env.VITE_NFT_STORAGE_TOKEN || null,
    enabled: !!import.meta.env.VITE_NFT_STORAGE_TOKEN
  },

  // Filebase Configuration (Sponsor Tech)
  FILEBASE: {
    apiKey: import.meta.env.VITE_FILEBASE_API_KEY || null,
    endpoint: import.meta.env.VITE_FILEBASE_ENDPOINT || 'https://api.filebase.io',
    bucket: import.meta.env.VITE_FILEBASE_BUCKET || 'memecoinify',
    enabled: !!import.meta.env.VITE_FILEBASE_API_KEY
  },

  // WalletConnect Configuration
  WALLETCONNECT: {
    projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
    enabled: !!import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
  },

  // Zora Protocol Configuration
  ZORA: {
    contractAddress: import.meta.env.VITE_ZORA_CONTRACT_ADDRESS || '0x777777751622c0d3258f214F9DF38E35BF45baF3',
    networkId: import.meta.env.VITE_ZORA_NETWORK_ID || 7777777,
    enabled: true // Always enabled for demo purposes
  },

  // App Configuration
  APP: {
    name: 'MemeCoinify',
    version: '1.0.0',
    demoMode: !import.meta.env.VITE_NFT_STORAGE_TOKEN && !import.meta.env.VITE_FILEBASE_API_KEY
  }
};

// Validation functions
export const validateConfig = () => {
  const issues = [];

  if (!CONFIG.NFT_STORAGE.enabled && !CONFIG.FILEBASE.enabled) {
    issues.push('No IPFS storage configured - using demo mode');
  }

  if (!CONFIG.WALLETCONNECT.enabled) {
    issues.push('WalletConnect not configured - using demo project ID');
  }

  return {
    isValid: issues.length === 0,
    issues,
    isDemoMode: CONFIG.APP.demoMode
  };
};

// Get storage provider preference
export const getStorageProvider = () => {
  if (CONFIG.FILEBASE.enabled) {
    return 'filebase';
  } else if (CONFIG.NFT_STORAGE.enabled) {
    return 'nft-storage';
  } else {
    return 'demo';
  }
};

// Log configuration status
export const logConfigStatus = () => {
  const validation = validateConfig();

  console.log('🔧 MemeCoinify Configuration Status:');
  console.log(`📦 Storage Provider: ${getStorageProvider()}`);
  console.log(`🔗 WalletConnect: ${CONFIG.WALLETCONNECT.enabled ? '✅' : '⚠️'}`);
  console.log(`🎭 Demo Mode: ${CONFIG.APP.demoMode ? '✅' : '❌'}`);

  if (validation.issues.length > 0) {
    console.warn('⚠️ Configuration Issues:');
    validation.issues.forEach(issue => console.warn(`  - ${issue}`));
  }

  return validation;
};

// Environment variable documentation
export const ENV_VARS = {
  VITE_NFT_STORAGE_TOKEN: 'NFT.Storage API token for IPFS storage',
  VITE_FILEBASE_API_KEY: 'Filebase API key for decentralized storage',
  VITE_FILEBASE_ENDPOINT: 'Filebase API endpoint (optional)',
  VITE_FILEBASE_BUCKET: 'Filebase bucket name (optional)',
  VITE_WALLETCONNECT_PROJECT_ID: 'WalletConnect project ID',
  VITE_ZORA_CONTRACT_ADDRESS: 'Zora Protocol contract address (optional)',
  VITE_ZORA_NETWORK_ID: 'Zora network ID (optional)'
};