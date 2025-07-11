import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Type,
  Download,
  Sparkles,
  Home,
  ArrowLeft,
  Coins,
} from "lucide-react";
import { useZora } from '../hooks/useZora';
import { uploadToIPFS } from '../utils/ipfs';
import { useAccount } from 'wagmi';
import { DEFAULT_VIEW_REVENUE, REVENUE_SHARES } from '../utils/revenueSharing';

const MemeEditor = ({ onMemeCreated, onNavigateToFeed }) => {
  const canvasRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const { mintMeme: zoraMint, isLoading, error } = useZora();
  const [isMinting, setIsMinting] = useState(false);
  const { address: walletAddress } = useAccount();

  // Base64 encoded small template images (you can replace these with actual images)
  const templates = [
    {
      id: 1,
      name: "Drake",
      src: "/meme-templates/drake.png",
    },
    {
      id: 2,
      name: "Distracted Boyfriend",
      src: "/meme-templates/distracted-boyfriend.png",
    },
    {
      id: 3,
      name: "Woman Yelling Cat",
      src: "/meme-templates/woman-yelling-cat.png",
    },
  ];

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (selectedTemplate || uploadedImage) {
      const img = new Image();
      img.onload = () => {
        // Draw background image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Draw text
        drawText(ctx);
      };
      img.src = uploadedImage || selectedTemplate;
    } else {
      // Draw placeholder
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#666";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "Select a template or upload an image",
        canvas.width / 2,
        canvas.height / 2
      );

      // Still draw text if any
      if (topText || bottomText) {
        drawText(ctx);
      }
    }
  };

  const drawText = (ctx) => {
    // Configure text style
    ctx.font = "bold 40px Impact, Arial Black, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    // Draw top text
    if (topText) {
      const lines = wrapText(
        ctx,
        topText.toUpperCase(),
        canvasRef.current.width - 20
      );
      lines.forEach((line, index) => {
        const y = 50 + index * 50;
        ctx.strokeText(line, canvasRef.current.width / 2, y);
        ctx.fillText(line, canvasRef.current.width / 2, y);
      });
    }

    // Draw bottom text
    if (bottomText) {
      const lines = wrapText(
        ctx,
        bottomText.toUpperCase(),
        canvasRef.current.width - 20
      );
      const startY = canvasRef.current.height - lines.length * 50 - 20;
      lines.forEach((line, index) => {
        const y = startY + index * 50;
        ctx.strokeText(line, canvasRef.current.width / 2, y);
        ctx.fillText(line, canvasRef.current.width / 2, y);
      });
    }
  };

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const loadTemplate = (templateSrc) => {
    setSelectedTemplate(templateSrc);
    setUploadedImage(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      setSelectedTemplate(null);
    };
    reader.readAsDataURL(file);
  };

  const downloadMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "meme.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const mintMeme = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if there's actually content to mint
    if (!selectedTemplate && !uploadedImage && !topText && !bottomText) {
      alert("Please add some content to your meme before minting!");
      return;
    }

    // Check if wallet is connected
    if (!walletAddress) {
      alert("Please connect your wallet to mint memes!");
      return;
    }

    setIsMinting(true);
    try {
      // Step 1: Upload to IPFS
      const { imageUrl, metadataUrl } = await uploadToIPFS(
        canvas,
        topText || bottomText || 'Meme',
        'A meme created with MemeCoinify'
      );

      // Step 2: Try to mint on Zora (with fallback)
      let result = null;
      try {
        result = await zoraMint({
          title: topText || bottomText || 'Meme',
          description: 'A meme created with MemeCoinify',
          imageUrl
        });
      } catch (zoraError) {
        console.warn('Zora minting failed, using demo mode:', zoraError);
        // Continue with demo mode
      }

      // Step 3: Add to parent component with revenue sharing data
      const meme = {
        id: Date.now(),
        image: imageUrl,
        topText,
        bottomText,
        template: selectedTemplate || "custom",
        createdAt: new Date().toISOString(),
        likes: 0,
        viewCount: 0,
        earnings: 0, // Initial earnings
        value: Math.floor(Math.random() * 1000) + 100, // Random value for demo
        creator: walletAddress, // Use actual wallet address
        coinId: result?.tokenId || 'demo-' + Date.now(),
        transactionHash: result?.transactionHash || 'demo-tx',
        coinSymbol: result?.coinSymbol || 'DEMO',
        metadataUrl,
        // Revenue sharing data
        revenuePerView: DEFAULT_VIEW_REVENUE,
        creatorShare: REVENUE_SHARES.CREATOR_SHARE,
        viewerShare: REVENUE_SHARES.VIEWER_SHARE,
        platformShare: REVENUE_SHARES.PLATFORM_SHARE
      };

      if (onMemeCreated) {
        onMemeCreated(meme);
      }

      const successMessage = result
        ? `🚀 Meme minted as ${result.coinSymbol}! You'll earn ${REVENUE_SHARES.CREATOR_SHARE}% of revenue when others view your meme!`
        : `🎨 Meme created in demo mode! You'll earn ${REVENUE_SHARES.CREATOR_SHARE}% of revenue when others view your meme!`;

      alert(successMessage);

      // Clear the form
      setTopText("");
      setBottomText("");
      setSelectedTemplate(null);
      setUploadedImage(null);
      if (onNavigateToFeed) {
        onNavigateToFeed();
      }
      console.log("Meme minted with revenue sharing:", meme);
    } catch (error) {
      console.error("Error minting meme:", error);
      alert("Error minting meme. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };


  // Redraw when text or template changes
  useEffect(() => {
    drawMeme();
  }, [topText, bottomText, selectedTemplate, uploadedImage]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 500;
      canvas.height = 500;
      drawMeme();
    }
  }, []);

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1.5rem'
  };

  const mainContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '3rem'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'white',
    margin: 0
  };

  const subtitleStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const subtitleTextStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1.25rem',
    margin: 0
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '2rem'
  };

  const leftPanelStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const cardHeaderStyle = {
    textAlign: 'center',
    marginBottom: '1.5rem'
  };

  const iconStyle = {
    width: '4rem',
    height: '4rem',
    background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem auto'
  };

  const cardTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 0.5rem 0'
  };

  const cardSubtitleStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.875rem',
    margin: 0
  };

  const templateButtonsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  };

  const templateButtonStyle = (isSelected) => ({
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '15px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    fontSize: '1rem',
    background: isSelected
      ? 'linear-gradient(135deg, #ff6b6b, #feca57)'
      : 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: isSelected ? 'transparent' : 'rgba(255, 255, 255, 0.2)'
  });

  const fileInputStyle = {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '15px',
    color: 'white',
    fontSize: '0.875rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '15px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const labelStyle = {
    display: 'block',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '0.5rem',
    fontWeight: '500'
  };

  const rightPanelStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const previewHeaderStyle = {
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const previewTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    margin: '0 0 0.5rem 0'
  };

  const canvasContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem'
  };

  const canvasStyle = {
    border: '4px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '15px',
    maxWidth: '100%',
    height: 'auto',
    background: 'white',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
  };

  const actionButtonsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'center'
  };

  const actionButtonStyle = (gradient) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 2rem',
    background: gradient,
    borderRadius: '25px',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '1rem',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
  });

  const actionIconStyle = {
    width: '2.5rem',
    height: '2.5rem',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={mainContainerStyle}>
        {/* Header with Navigation */}
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            🎨 Create Your Meme
          </h2>
        </div>

        {/* Main Content */}
        <div style={subtitleStyle}>
          <p style={subtitleTextStyle}>
            Design unique memes and turn them into valuable NFT tokens
          </p>
        </div>

        <div style={gridStyle}>
          {/* Left Panel - Templates and Upload */}
          <div style={leftPanelStyle}>
            {/* Templates Section */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{...iconStyle, background: 'linear-gradient(135deg, #ff9a56, #ffad56)'}}>
                  <span style={{fontSize: '1.5rem'}}>🖼️</span>
                </div>
                <h3 style={cardTitleStyle}>
                  Choose Template
                </h3>
                <p style={cardSubtitleStyle}>
                  Select from popular meme templates
                </p>
              </div>

              <div style={templateButtonsStyle}>
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template.src)}
                    style={templateButtonStyle(selectedTemplate === template.src)}
                    onMouseEnter={(e) => {
                      if (selectedTemplate !== template.src) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTemplate !== template.src) {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      }
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={template.src} alt={template.name} style={{ width: '2.5rem', height: '2.5rem', borderRadius: '8px', objectFit: 'cover', boxShadow: selectedTemplate === template.src ? '0 0 0 2px #ff6b6b' : 'none' }} />
                      {template.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Section */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{...iconStyle, background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
                  <Upload size={24} />
                </div>
                <h3 style={cardTitleStyle}>Upload Image</h3>
                <p style={cardSubtitleStyle}>
                  Or use your own custom image
                </p>
              </div>
              <label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={fileInputStyle}
                />
              </label>
            </div>

            {/* Text Controls */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{...iconStyle, background: 'linear-gradient(135deg, #11cdef, #1171ef)'}}>
                  <Type size={24} />
                </div>
                <h3 style={cardTitleStyle}>Add Text</h3>
                <p style={cardSubtitleStyle}>
                  Make your meme speak
                </p>
              </div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                  <label style={labelStyle}>
                    Top Text:
                  </label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Enter top text..."
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>
                    Bottom Text:
                  </label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Enter bottom text..."
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 107, 107, 0.5)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
                  />
                </div>
              </div>
            </div>

            {/* Revenue Sharing Info */}
            <div style={cardStyle}>
              <div style={cardHeaderStyle}>
                <div style={{...iconStyle, background: 'linear-gradient(135deg, #10b981, #059669)'}}>
                  <Coins size={24} />
                </div>
                <h3 style={cardTitleStyle}>💰 Earn ETH</h3>
                <p style={cardSubtitleStyle}>
                  Monetize your creativity
                </p>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>Creator Share:</span>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>60%</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>Viewer Share:</span>
                  <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>30%</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>Platform Share:</span>
                  <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>10%</span>
                </div>
              </div>

              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.8rem',
                textAlign: 'center',
                margin: 0
              }}>
                Earn {DEFAULT_VIEW_REVENUE} ETH per view! 🚀
              </p>
            </div>
          </div>

          {/* Right Panel - Canvas and Actions */}
          <div style={rightPanelStyle}>
            <div style={previewHeaderStyle}>
              <h3 style={previewTitleStyle}>Preview</h3>
              <p style={cardSubtitleStyle}>See your meme come to life</p>
            </div>

            {/* Canvas */}
            <div style={canvasContainerStyle}>
              <canvas
                ref={canvasRef}
                style={canvasStyle}
              />
            </div>

            {/* Action Buttons */}
            <div style={actionButtonsStyle}>
              <button
                onClick={downloadMeme}
                style={actionButtonStyle('linear-gradient(135deg, #11cdef, #1171ef)')}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                disabled={isMinting || isLoading}
              >
                <div style={actionIconStyle}>
                  <Download size={20} />
                </div>
                Download
              </button>
              <button
                onClick={mintMeme}
                style={{
                  ...actionButtonStyle('linear-gradient(135deg, #ff6b6b, #feca57)'),
                  opacity: (isMinting || isLoading) ? 0.6 : 1,
                  pointerEvents: (isMinting || isLoading) ? 'none' : 'auto'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                disabled={isMinting || isLoading}
              >
                <div style={actionIconStyle}>
                  {isMinting || isLoading ? (
                    <span className="loading-dots" style={{ fontSize: '1.5rem' }}>⏳</span>
                  ) : (
                    <Sparkles size={20} />
                  )}
                </div>
                {isMinting || isLoading ? 'Minting...' : 'Mint as Coin'}
              </button>
            </div>
            {error && (
              <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center', fontWeight: 600 }}>
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeEditor;