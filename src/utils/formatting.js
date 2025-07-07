// Format wallet address to show only first and last 4 characters
export const truncateAddress = (address) => {
  if (!address || typeof address !== 'string') return 'Unknown';

  if (address.length <= 10) return address;

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format ETH amounts
export const formatETH = (amount) => {
  if (!amount || isNaN(amount)) return '0 ETH';

  if (amount < 0.001) {
    return `${(amount * 1000).toFixed(2)} mETH`;
  }

  return `${amount.toFixed(4)} ETH`;
};

// Format currency values
export const formatCurrency = (amount) => {
  if (!amount || isNaN(amount)) return '$0';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};