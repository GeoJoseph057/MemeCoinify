import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css'

import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http } from 'viem'
import { SUPPORTED_CHAINS } from './utils/constants'

const config = getDefaultConfig({
  appName: 'MemeCoinify',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: SUPPORTED_CHAINS,
  transports: SUPPORTED_CHAINS.reduce((obj, chain) => {
    obj[chain.id] = http()
    return obj
  }, {}),
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)