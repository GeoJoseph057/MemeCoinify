import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import WalletConnect from './components/WalletConnect'
import MemeEditor from './components/MemeEditor'
import MemeFeed from './components/MemeFeed'
import './App.css'

const NAV_TABS = [
  { key: 'home', label: 'Home' },
  { key: 'feed', label: 'Feed' },
  { key: 'create', label: 'Create' },
  { key: 'portfolio', label: 'Portfolio' },
];

// Floating particles component
const FloatingParticles = () => {
  useEffect(() => {
    const particles = document.getElementById('particles')
    if (!particles) return

    const particleCount = 30
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.cssText = `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        animation: float ${Math.random() * 3 + 3}s ease-in-out infinite;
        animation-delay: ${Math.random() * 6}s;
      `
      particles.appendChild(particle)
    }

    return () => {
      if (particles) particles.innerHTML = ''
    }
  }, [])

  return (
    <div
      id="particles"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  )
}

// Home component
function Home({ memes, onCreateMeme, onNavigateToFeed }) {
  return (
    <>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #feca57, #ff6b6b)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}>
          Welcome to MemeCoinify
        </h1>
        <p style={{
          fontSize: '1.2rem',
          opacity: 0.9,
          marginBottom: '2rem',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          Create, mint, and trade your memes as NFTs on the blockchain!
          Turn your creativity into cryptocurrency.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button
            onClick={onCreateMeme}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '50px',
              background: 'linear-gradient(45deg, #feca57, #ff6b6b)',
              color: 'white',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🎨 Create Meme
          </button>
          <button
            onClick={onNavigateToFeed}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🔥 View Feed
          </button>
        </div>
      </section>
      {/* Featured Memes */}
      {memes.length > 0 && (
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'white'
          }}>
            🌟 Latest Creations
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {memes.slice(0, 6).map((meme) => (
              <div key={meme.id} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                <img
                  src={meme.image}
                  alt="Meme"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '15px',
                    marginBottom: '1rem'
                  }}
                />
                <div style={{ color: 'white' }}>
                  <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
                    {meme.topText || meme.bottomText || 'Custom Meme'}
                  </p>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Value: ${meme.value || 100}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Features */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
            Create
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Design unique memes with our easy-to-use editor
          </p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🪙</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
            Mint
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Turn your memes into valuable NFT tokens
          </p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white', marginBottom: '1rem' }}>
            Trade
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Buy, sell, and collect meme coins from the community
          </p>
        </div>
      </div>
    </>
  )
}

// NotFound component
function NotFound({ onNavigateHome }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '1rem'
      }}>
        404
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: '2rem'
      }}>
        Page Not Found
      </p>
      <button
        onClick={onNavigateHome}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '50px',
          background: 'linear-gradient(45deg, #feca57, #ff6b6b)',
          color: 'white',
          cursor: 'pointer',
          transition: 'transform 0.3s ease'
        }}
      >
        Go Home
      </button>
    </div>
  )
}

function App() {
  const [currentRoute, setCurrentRoute] = useState('home')
  const [activeFilter, setActiveFilter] = useState('recent')
  const [memes, setMemes] = useState([])

  const handleMemeCreated = (newMeme) => {
    const updatedMemes = [newMeme, ...memes]
    setMemes(updatedMemes)
    setCurrentRoute('feed') // Navigate to feed after creating
  }

  const navigate = (route) => {
    setCurrentRoute(route)
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  const renderCurrentRoute = () => {
    switch(currentRoute) {
      case 'home':
        return (
          <Home
            memes={memes}
            onCreateMeme={() => navigate('create')}
            onNavigateToFeed={() => navigate('feed')}
          />
        )
      case 'create':
        return (
          <MemeEditor
            onMemeCreated={handleMemeCreated}
            onNavigateToFeed={() => navigate('feed')}
          />
        )
      case 'feed':
        return (
          <>
            {/* Search and Filter */}
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '2rem',
                color: 'white'
              }}>
                🚀 Meme Feed
              </h2>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '2rem'
              }}>
                <div style={{
                  position: 'relative',
                  flex: '1',
                  minWidth: '300px'
                }}>
                  <input
                    type="text"
                    placeholder="Search for trending memes, creators, or topics..."
                    style={{
                      width: '100%',
                      padding: '1rem 1rem 1rem 3rem',
                      border: 'none',
                      borderRadius: '25px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.2rem'
                  }}>
                    🔍
                  </span>
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                {[
                  { key: 'recent', label: '🔥 Recent' },
                  { key: 'trending', label: '📈 Trending' },
                  { key: 'liked', label: '❤️ Most Liked' },
                  { key: 'valuable', label: '💰 Most Valuable' },
                  { key: 'my-memes', label: '👤 My Memes' }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => handleFilterChange(filter.key)}
                    style={{
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '20px',
                      background: activeFilter === filter.key
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '0.9rem'
                    }}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </section>
            <MemeFeed
              memes={memes}
              onNavigateToEditor={() => navigate('create')}
              onNavigateHome={() => navigate('home')}
            />
          </>
        )
      case 'portfolio':
        return (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>💎 Your Portfolio</h2>
            <p style={{ opacity: 0.8, marginBottom: '3rem', fontSize: '1.1rem' }}>
              Track your meme investments and earnings here!
            </p>
            {/* Portfolio Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>
                  {memes.length}
                </div>
                <div style={{ opacity: 0.8 }}>Memes Created</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  background: 'linear-gradient(45deg, #feca57, #ff6b6b)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}>
                  ${memes.reduce((sum, meme) => sum + (meme.value || 0), 0)}
                </div>
                <div style={{ opacity: 0.8 }}>Total Value</div>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>
                  {memes.reduce((sum, meme) => sum + (meme.likes || 0), 0)}
                </div>
                <div style={{ opacity: 0.8 }}>Total Likes</div>
              </div>
            </div>
            {memes.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', opacity: 0.9, color: 'white' }}>
                  Your Memes
                </h3>
                <MemeFeed
                  memes={memes}
                  onNavigateToEditor={() => navigate('create')}
                  onNavigateHome={() => navigate('home')}
                />
              </div>
            )}
          </div>
        )
      case 'wallet':
        return (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>🔗 Wallet Connection</h2>
            <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
              Connect your wallet to start trading meme NFTs!
            </p>
            <WalletConnect />
          </div>
        )
      default:
        return <NotFound onNavigateHome={() => navigate('home')} />
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/Logo (2).png" alt="Logo" style={{ height: '5.4rem', width: '5.4rem', objectFit: 'contain' }} />
            MemeCoinify
          </div>
          <nav className="nav-tabs">
            {NAV_TABS.map(tab => (
              <button
                key={tab.key}
                className={`nav-tab${currentRoute === tab.key ? ' active' : ''}`}
                onClick={() => setCurrentRoute(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <WalletConnect />
        </div>
      </header>
      <main className="main-content">
        {renderCurrentRoute()}
      </main>
      <Toaster />
      <FloatingParticles />
    </div>
  )
}

export default App;