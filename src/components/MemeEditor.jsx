import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Type, Download, Sparkles, Home, ArrowLeft } from 'lucide-react';

const MemeEditor = ({ onMemeCreated }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  // Base64 encoded small template images (you can replace these with actual images)
  const templates = [
    { 
      id: 1, 
      name: 'Drake', 
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjI1MCIgZmlsbD0iIzMzNzNkYyIvPgogIDxyZWN0IHk9IjI1MCIgd2lkdGg9IjUwMCIgaGVpZ2h0PSIyNTAiIGZpbGw9IiNmZjZiNmIiLz4KICA8dGV4dCB4PSIyNTAiIHk9IjEzNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RHJha2UgVGVtcGxhdGU8L3RleHQ+CiAgPHRleHQgeD0iMjUwIiB5PSIzODUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRyYWtlIFRlbXBsYXRlPC90ZXh0Pgo8L3N2Zz4K' 
    },
    { 
      id: 2, 
      name: 'Distracted Boyfriend', 
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iIzJkM2E4YyIvPgogIDx0ZXh0IHg9IjI1MCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5EaXN0cmFjdGVkIEJveWZyaWVuZDwvdGV4dD4KPC9zdmc+' 
    },
    { 
      id: 3, 
      name: 'Woman Yelling Cat', 
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjUwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmOWY0MyIvPgogIDxyZWN0IHg9IjI1MCIgd2lkdGg9IjI1MCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNmZmY3ZWQiLz4KICA8dGV4dCB4PSIxMjUiIHk9IjI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+V29tYW48L3RleHQ+CiAgPHRleHQgeD0iMzc1IiB5PSIyNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iYmxhY2siIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNhdDwvdGV4dD4KPC9zdmc+' 
    }
  ];

  const drawMeme = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
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
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#666';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Select a template or upload an image', canvas.width / 2, canvas.height / 2);
      
      // Still draw text if any
      if (topText || bottomText) {
        drawText(ctx);
      }
    }
  };

  const drawText = (ctx) => {
    // Configure text style
    ctx.font = 'bold 40px Impact, Arial Black, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;

    // Draw top text
    if (topText) {
      const lines = wrapText(ctx, topText.toUpperCase(), canvasRef.current.width - 20);
      lines.forEach((line, index) => {
        const y = 50 + (index * 50);
        ctx.strokeText(line, canvasRef.current.width / 2, y);
        ctx.fillText(line, canvasRef.current.width / 2, y);
      });
    }

    // Draw bottom text
    if (bottomText) {
      const lines = wrapText(ctx, bottomText.toUpperCase(), canvasRef.current.width - 20);
      const startY = canvasRef.current.height - (lines.length * 50) - 20;
      lines.forEach((line, index) => {
        const y = startY + (index * 50);
        ctx.strokeText(line, canvasRef.current.width / 2, y);
        ctx.fillText(line, canvasRef.current.width / 2, y);
      });
    }
  };

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
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

    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const mintMeme = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if there's actually content to mint
    if (!selectedTemplate && !uploadedImage && !topText && !bottomText) {
      alert('Please add some content to your meme before minting!');
      return;
    }

    try {
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        // Create meme object
        const meme = {
          id: Date.now(),
          image: canvas.toDataURL(),
          topText,
          bottomText,
          template: selectedTemplate || 'custom',
          createdAt: new Date().toISOString(),
          likes: 0,
          value: Math.floor(Math.random() * 1000) + 100, // Random value for demo
          creator: 'You'
        };

        // Add to parent component or save to localStorage
        if (onMemeCreated) {
          onMemeCreated(meme);
        } else {
          // Fallback: save to localStorage
          const existingMemes = JSON.parse(localStorage.getItem('memes') || '[]');
          existingMemes.unshift(meme);
          localStorage.setItem('memes', JSON.stringify(existingMemes));
        }

        // Show success message
        alert('🚀 Meme minted successfully! Check your feed!');

        // Clear the form
        setTopText('');
        setBottomText('');
        setSelectedTemplate(null);
        setUploadedImage(null);

        // Navigate to feed after successful mint
        navigate('/feed');

        console.log('Meme minted:', meme);
      });
    } catch (error) {
      console.error('Error minting meme:', error);
      alert('Error minting meme. Please try again.');
    }
  };

  const goHome = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1); // Go back to previous page
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            🎨 Meme Creator
          </h1>
          <div className="flex gap-3">
            <button
              onClick={goBack}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              onClick={goHome}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Templates and Upload */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Templates & Upload
              </h3>
              
              {/* Template Selection */}
              <div className="grid grid-cols-1 gap-3 mb-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template.src)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      selectedTemplate === template.src
                        ? 'bg-purple-600 text-white'
                        : 'bg-purple-600/60 hover:bg-purple-600 text-white'
                    }`}
                  >
                    {template.name}
                  </button>
                ))}
              </div>

              {/* Custom Upload */}
              <label className="block">
                <span className="text-white mb-2 block">Or upload your own:</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                />
              </label>
            </div>

            {/* Text Controls */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Type className="w-5 h-5" />
                Add Text
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Top Text:</label>
                  <input
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    placeholder="Enter top text..."
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                
                <div>
                  <label className="block text-white mb-2">Bottom Text:</label>
                  <input
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    placeholder="Enter bottom text..."
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Preview</h3>
                <div className="flex gap-3">
                  <button
                    onClick={downloadMeme}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button
                    onClick={mintMeme}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Mint as Coin
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="border border-white/30 rounded-lg max-w-full bg-white"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeEditor;