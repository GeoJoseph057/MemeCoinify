// Revenue sharing constants (similar to PhotoCoin platform)
export const REVENUE_SHARES = {
  CREATOR_SHARE: 60,    // 60% to meme creator
  VIEWER_SHARE: 30,     // 30% to meme viewer
  PLATFORM_SHARE: 10    // 10% to platform
};

export const DEFAULT_VIEW_REVENUE = 0.001; // ETH per view

// Simulate revenue sharing when a meme is viewed
export const handleMemeView = (meme, viewerAddress, creatorAddress) => {
  if (!meme || !viewerAddress || !creatorAddress) {
    return null;
  }

  // Don't give revenue if viewer is the creator
  if (viewerAddress.toLowerCase() === creatorAddress.toLowerCase()) {
    return {
      memeId: meme.id,
      viewer: viewerAddress,
      creator: creatorAddress,
      totalRevenue: 0,
      creatorRevenue: 0,
      viewerRevenue: 0,
      platformRevenue: 0,
      viewCount: meme.viewCount + 1
    };
  }

  const totalRevenue = DEFAULT_VIEW_REVENUE;
  const creatorRevenue = (totalRevenue * REVENUE_SHARES.CREATOR_SHARE) / 100;
  const viewerRevenue = (totalRevenue * REVENUE_SHARES.VIEWER_SHARE) / 100;
  const platformRevenue = totalRevenue - creatorRevenue - viewerRevenue;

  return {
    memeId: meme.id,
    viewer: viewerAddress,
    creator: creatorAddress,
    totalRevenue,
    creatorRevenue,
    viewerRevenue,
    platformRevenue,
    viewCount: meme.viewCount + 1
  };
};

// Calculate total earnings for a user
export const calculateUserEarnings = (memes, userAddress) => {
  if (!memes || !userAddress) return 0;

  return memes.reduce((total, meme) => {
    if (meme.creator?.toLowerCase() === userAddress.toLowerCase()) {
      return total + (meme.earnings || 0);
    }
    return total;
  }, 0);
};

// Format ETH amounts
export const formatETH = (amount) => {
  return parseFloat(amount).toFixed(4);
};