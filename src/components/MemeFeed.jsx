import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Share2, Plus, Home, Palette, Coins, TrendingUp } from 'lucide-react';

const MemeFeed = ({ memes: propMemes, selectedMemeId, onNavigateToEditor, onNavigateHome }) => {
  const [memes, setMemes] = useState([]);
  const memeRefs = useRef({});

  useEffect(() => {
    // Use the memes passed from parent component
    setMemes(propMemes || []);
  }, [propMemes]);

  useEffect(() => {
    if (selectedMemeId && memeRefs.current[selectedMemeId]) {
      memeRefs.current[selectedMemeId].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedMemeId, memes]);

  const handleLike = (memeId) => {
    const updatedMemes = memes.map(meme => {
      if (meme.id === memeId) {
        return { ...meme, likes: meme.likes + 1 };
      }
      return meme;
    });
    setMemes(updatedMemes);
  };

  const goToEditor = () => {
    if (onNavigateToEditor) {
      onNavigateToEditor();
    }
  };

  const goHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  // Inline styles for fallback
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '24px'
    },
    maxWidth: {
      maxWidth: '80rem',
      margin: '0 auto'
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      background: 'linear-gradient(135deg, rgba(88,28,135,0.9) 0%, rgba(30,58,138,0.9) 50%, rgba(49,46,129,0.9) 100%)',
      paddingBottom: '16px',
      marginBottom: '32px',
      borderRadius: '0 0 16px 16px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '24px',
      paddingLeft: '8px',
      paddingRight: '8px'
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    buttonContainer: {
      display: 'flex',
      gap: '16px'
    },
    homeButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      borderRadius: '9999px',
      background: '#2563eb',
      color: 'white',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    createButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      borderRadius: '9999px',
      background: 'linear-gradient(to right, #fb923c, #fbbf24)',
      color: 'white',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '32px'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'box-shadow 0.3s'
    },
    cardHeader: {
      padding: '16px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    avatar: {
      width: '40px',
      height: '40px',
      background: 'linear-gradient(to right, #fb923c, #fbbf24)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold'
    },
    userName: {
      color: 'white',
      fontWeight: '600'
    },
    date: {
      color: '#9ca3af',
      fontSize: '0.875rem'
    },
    valueInfo: {
      textAlign: 'right'
    },
    value: {
      color: '#fbbf24',
      fontWeight: 'bold',
      fontSize: '1.125rem',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    valueLabel: {
      color: '#9ca3af',
      fontSize: '0.875rem'
    },
    imageContainer: {
      padding: '16px',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: '100%',
      maxWidth: '300px',
      margin: '0 auto',
      borderRadius: '8px',
      background: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
    textInfo: {
      padding: '0 16px 8px',
    },
    textBox: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      padding: '12px'
    },
    textLine: {
      color: 'white',
      fontSize: '0.875rem',
      marginBottom: '4px'
    },
    textLabel: {
      color: '#9ca3af'
    },
    actions: {
      padding: '16px',
      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    actionButtons: {
      display: 'flex',
      gap: '12px'
    },
    likeButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '9999px',
      background: 'linear-gradient(to right, #ec4899, #ef4444)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    commentButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '9999px',
      background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    shareButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      borderRadius: '9999px',
      background: 'linear-gradient(to right, #10b981, #14b8a6)',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      color: 'white',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    buyButton: {
      background: 'linear-gradient(to right, #fbbf24, #fb923c)',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '9999px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    emptyState: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      borderRadius: '12px',
      padding: '48px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'center'
    },
    emptyTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '16px'
    },
    emptyText: {
      color: '#d1d5db',
      marginBottom: '32px'
    },
    emptyButton: {
      background: 'linear-gradient(to right, #fb923c, #fbbf24)',
      color: 'white',
      padding: '16px 32px',
      borderRadius: '8px',
      fontSize: '1.125rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      margin: '0 auto',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s'
    }
  };

  if (memes.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            <TrendingUp size={32} style={{color: '#fbbf24'}} />
            Meme Feed
          </h1>
          <div style={styles.buttonContainer}>
            <button
              onClick={goHome}
              style={styles.homeButton}
              onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.background = '#2563eb'}
            >
              <Home size={24} /> Home
            </button>
            <button
              onClick={goToEditor}
              style={styles.createButton}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <Palette size={24} /> Create Meme
            </button>
          </div>
        </div>

        <div style={styles.emptyState}>
          <div style={{fontSize: '4rem', marginBottom: '24px'}}>🎭</div>
          <h2 style={styles.emptyTitle}>No Memes Yet!</h2>
          <p style={styles.emptyText}>
            Be the first to create and mint a meme. Start building the meme economy!
          </p>
          <button
            onClick={goToEditor}
            style={styles.emptyButton}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            <Palette size={24} />
            Create Your First Meme
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            <TrendingUp size={32} style={{color: '#fbbf24'}} />
            Meme Feed
          </h1>
          <div style={styles.buttonContainer}>
            <button
              onClick={goHome}
              style={styles.homeButton}
              onMouseOver={(e) => e.target.style.background = '#1d4ed8'}
              onMouseOut={(e) => e.target.style.background = '#2563eb'}
            >
              <Home size={24} /> Home
            </button>
            <button
              onClick={goToEditor}
              style={styles.createButton}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              <Palette size={24} /> Create Meme
            </button>
          </div>
        </div>
      </div>

      <div style={styles.grid}>
        {memes.map((meme) => (
          <div
            key={meme.id}
            ref={el => memeRefs.current[meme.id] = el}
            style={styles.card}
            onMouseOver={(e) => e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.4)'}
            onMouseOut={(e) => e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}
          >
            <div style={styles.cardHeader}>
              <div style={styles.userInfo}>
                <div style={styles.avatar}>
                  {meme.creator.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p style={styles.userName}>{meme.creator}</p>
                  <p style={styles.date}>
                    {meme.createdAt ? new Date(meme.createdAt).toLocaleDateString() : '—'}
                  </p>
                </div>
              </div>
              <div style={styles.valueInfo}>
                <p style={styles.value}>
                  <Coins size={20} />
                  ${meme.value}
                </p>
                <p style={styles.valueLabel}>Market Value</p>
              </div>
            </div>

            <div style={styles.imageContainer}>
              <img
                src={meme.image}
                alt="Meme"
                style={styles.image}
              />
            </div>

            {(meme.topText || meme.bottomText) && (
              <div style={styles.textInfo}>
                <div style={styles.textBox}>
                  {meme.topText && (
                    <p style={styles.textLine}>
                      <span style={styles.textLabel}>Top:</span> {meme.topText}
                    </p>
                  )}
                  {meme.bottomText && (
                    <p style={styles.textLine}>
                      <span style={styles.textLabel}>Bottom:</span> {meme.bottomText}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div style={styles.actions}>
              <div style={styles.actionButtons}>
                <button
                  onClick={() => handleLike(meme.id)}
                  style={styles.likeButton}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <Heart size={20} />
                  <span>{meme.likes}</span>
                </button>
                <button
                  style={styles.commentButton}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <MessageCircle size={20} />
                  <span>Comment</span>
                </button>
                <button
                  style={styles.shareButton}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
              <button
                style={styles.buyButton}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                <Coins size={16} />
                Buy Coin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemeFeed;