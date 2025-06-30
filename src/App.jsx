import React, { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import WalletConnect from './components/WalletConnect'
import MemeEditor from './components/MemeEditor'
import MemeFeed from './components/MemeFeed'
import './App.css'

  // Mock components since the original imports might be missing
  const Toaster = () => <div></div>
  
  const WalletConnect = () => (
    <button style={{
      padding: '0.5rem 1rem',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '25px',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      cursor: 'pointer',
      fontSize: '0.9rem'
    }}>
      🔗 Connect Wallet
    </button>
  )
  
  const MemeEditor = ({ onMemeCreated, onNavigateToFeed }) => (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎨 Create Your Meme</h2>
      <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
        Upload an image and add your text to create the next viral meme!
      </p>
      
      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="file" 
          accept="image/*"
          style={{
            padding: '1rem',
            border: '2px dashed rgba(255, 255, 255, 0.3)',
            borderRadius: '15px',
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            marginBottom: '1rem',
            width: '100%',
            maxWidth: '400px'
          }}
        />
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Top text..."
          style={{
            padding: '1rem',
            margin: '0.5rem',
            border: 'none',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            width: '300px'
          }}
        />
        <br />
        <input 
          type="text" 
          placeholder="Bottom text..."
          style={{
            padding: '1rem',
            margin: '0.5rem',
            border: 'none',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            width: '300px'
          }}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button 
          onClick={() => {
            // Create a sample meme
            const newMeme = {
              id: Date.now(),
              image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=New+Meme',
              topText: 'Your meme',
              bottomText: 'Is created!',
              value: Math.floor(Math.random() * 500) + 100,
              likes: Math.floor(Math.random() * 50),
              creator: '0x' + Math.random().toString(16).substr(2, 8)
            }
            onMemeCreated(newMeme)
          }}
          style={{
            padding: '1rem 2rem',
            border: 'none',
            borderRadius: '25px',
            background: 'linear-gradient(45deg, #feca57, #ff6b6b)',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🚀 Create & Mint NFT
        </button>
        
        <button 
          onClick={onNavigateToFeed}
          style={{
            padding: '1rem 2rem',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '25px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          View Feed
        </button>
      </div>
    </div>
  )
  
  const MemeFeed = ({ memes }) => {
    if (!memes || memes.length === 0) {
      return (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎭</div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No memes yet!</h3>
          <p style={{ opacity: 0.8 }}>Create your first meme to get started.</p>
        </div>
      )
    }
  
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {memes.map((meme) => (
          <div key={meme.id} style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <img 
              src={meme.image} 
              alt="Meme" 
              style={{
                width: '100%',
                height: '250px',
                objectFit: 'cover',
                borderRadius: '15px',
                marginBottom: '1rem'
              }}
            />
            
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                {meme.topText || meme.bottomText || 'Custom Meme'}
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                By: {meme.creator}
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                background: 'linear-gradient(45deg, #feca57, #ff6b6b)',
                padding: '0.5rem 1rem',
                borderRadius: '15px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                💰 ${meme.value}
              </span>
              <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                ❤️ {meme.likes}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                👍 Like
              </button>
              <button style={{
                flex: 1,
                padding: '0.75rem',
                border: 'none',
                borderRadius: '10px',
                background: 'linear-gradient(45deg, #feca57, #ff6b6b)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                💸 Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
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
  
    // Load sample memes on app start
    useEffect(() => {
      const sampleMemes = [
        {
          id: 1,
          image: 'https://via.placeholder.com/400x300/667eea/ffffff?text=Sample+Meme+1',
          topText: 'When you finally',
          bottomText: 'Create your first meme NFT',
          value: 150,
          likes: 42,
          creator: '0x123...abc'
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/400x300/764ba2/ffffff?text=Sample+Meme+2',
          topText: 'MemeCoinify be like',
          bottomText: 'Turn memes into money',
          value: 250,
          likes: 67,
          creator: '0x456...def'
        }
      ]
      setMemes(sampleMemes)
    }, [])
  
    // Function to add new meme
    const handleMemeCreated = (newMeme) => {
      const updatedMemes = [newMeme, ...memes]
      setMemes(updatedMemes)
      setCurrentRoute('feed') // Navigate to feed after creating
    }
  
    const navigate = (route) => {
      setCurrentRoute(route)
    }
  
    const handleTabChange = (tab) => {
      setCurrentRoute(tab)
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
  
              <MemeFeed memes={memes} />
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
                  <MemeFeed memes={memes} />
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
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative'
      }}>
        <FloatingParticles />
        <Toaster />
        
        {/* Header */}
        <header style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div 
              onClick={() => navigate('home')}
              style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #feca57, #ff6b6b)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                cursor: 'pointer'
              }}
            >
              MemeCoinify
            </div>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              padding: '0.5rem'
            }}>
              {[
                { key: 'home', label: '🏠 Home' },
                { key: 'feed', label: '🚀 Feed' },
                { key: 'create', label: '✨ Create' },
                { key: 'portfolio', label: '💎 Portfolio' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '25px',
                    background: currentRoute === tab.key 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'transparent',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
  
            <WalletConnect />
          </div>
        </header>
  
        {/* Main Content */}
        <main style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
          position: 'relative',
          zIndex: 5
        }}>
          {renderCurrentRoute()}
        </main>
  
        {/* Floating Action Button */}
        <button
          onClick={() => navigate('create')}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(45deg, #feca57, #ff6b6b)',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            zIndex: 100,
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          +
        </button>
  
        {/* Add keyframes for particle animation */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.5; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
          }
        `}</style>
      </div>
    )
  }