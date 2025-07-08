// Storage utilities for persistent data management
const STORAGE_KEYS = {
  MEMES: 'memecoinify_memes',
  USER_PREFERENCES: 'memecoinify_preferences',
  WALLET_HISTORY: 'memecoinify_wallet_history'
};

// Meme storage functions
export const saveMemes = (memes) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MEMES, JSON.stringify(memes));
    return true;
  } catch (error) {
    console.error('Failed to save memes to localStorage:', error);
    return false;
  }
};

export const loadMemes = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MEMES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load memes from localStorage:', error);
    return [];
  }
};

export const addMeme = (meme) => {
  try {
    const existingMemes = loadMemes();
    const updatedMemes = [meme, ...existingMemes];
    saveMemes(updatedMemes);
    return true;
  } catch (error) {
    console.error('Failed to add meme:', error);
    return false;
  }
};

export const updateMeme = (memeId, updates) => {
  try {
    const existingMemes = loadMemes();
    const updatedMemes = existingMemes.map(meme =>
      meme.id === memeId ? { ...meme, ...updates } : meme
    );
    saveMemes(updatedMemes);
    return true;
  } catch (error) {
    console.error('Failed to update meme:', error);
    return false;
  }
};

export const deleteMeme = (memeId) => {
  try {
    const existingMemes = loadMemes();
    const updatedMemes = existingMemes.filter(meme => meme.id !== memeId);
    saveMemes(updatedMemes);
    return true;
  } catch (error) {
    console.error('Failed to delete meme:', error);
    return false;
  }
};

// User preferences storage
export const saveUserPreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
    return true;
  } catch (error) {
    console.error('Failed to save user preferences:', error);
    return false;
  }
};

export const loadUserPreferences = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load user preferences:', error);
    return {};
  }
};

// Wallet history storage
export const saveWalletHistory = (walletAddress, history) => {
  try {
    const existing = loadWalletHistory();
    existing[walletAddress] = history;
    localStorage.setItem(STORAGE_KEYS.WALLET_HISTORY, JSON.stringify(existing));
    return true;
  } catch (error) {
    console.error('Failed to save wallet history:', error);
    return false;
  }
};

export const loadWalletHistory = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.WALLET_HISTORY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to load wallet history:', error);
    return {};
  }
};

// Demo data for initial load
export const getDemoMemes = () => [
  {
    id: 'demo-1',
    title: 'Drake Meme',
    topText: 'Creating memes',
    bottomText: 'Minting NFTs',
    image: '/meme-templates/drake.png',
    creator: '0x1234...5678',
    value: 150,
    likes: 42,
    viewCount: 156,
    earnings: 0.0024,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    isDemo: true
  },
  {
    id: 'demo-2',
    title: 'Distracted Boyfriend',
    topText: 'Old social media',
    bottomText: 'MemeCoinify',
    image: '/meme-templates/distracted-boyfriend.png',
    creator: '0x8765...4321',
    value: 89,
    likes: 23,
    viewCount: 89,
    earnings: 0.0012,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    isDemo: true
  },
  {
    id: 'demo-3',
    title: 'Woman Yelling Cat',
    topText: 'When someone',
    bottomText: 'steals your meme idea',
    image: '/meme-templates/woman-yelling-cat.png',
    creator: '0x9999...8888',
    value: 234,
    likes: 67,
    viewCount: 234,
    earnings: 0.0036,
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    isDemo: true
  }
];

// Clear all data (useful for testing)
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Failed to clear data:', error);
    return false;
  }
};