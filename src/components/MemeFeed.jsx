import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Plus, Home } from 'lucide-react';

const MemeFeed = ({ memes: propMemes }) => {
  const navigate = useNavigate();
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    // Use memes from props if available, otherwise load from localStorage
    if (propMemes && propMemes.length > 0) {
      setMemes(propMemes);
    } else {
      const savedMemes = localStorage.getItem('memes');
      if (savedMemes) {
        setMemes(JSON.parse(savedMemes));
      }
    }
  }, [propMemes]);

  const handleLike = (memeId) => {
    const updatedMemes = memes.map(meme => {
      if (meme.id === memeId) {
        return { ...meme, likes: meme.likes + 1 };
      }
      return meme;
    });
    setMemes(updatedMemes);
    localStorage.setItem('memes', JSON.stringify(updatedMemes));
  };

  const goToEditor = () => {
    navigate('/editor');
  };

  const goHome = () => {
    navigate('/');
  };

  if (memes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">🔥 Meme Feed</h1>
            <div className="flex gap-3">
              <button
                onClick={goHome}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={goToEditor}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Meme
              </button>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-12 border border-white/20 text-center">
            <div className="text-6xl mb-6">🎭</div>
            <h2 className="text-2xl font-bold text-white mb-4">No Memes Yet!</h2>
            <p className="text-gray-300 mb-8">
              Be the first to create and mint a meme. Start building the meme economy!
            </p>
            <button
              onClick={goToEditor}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Create Your First Meme 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">🔥 Meme Feed</h1>
          <div className="flex gap-3">
            <button
              onClick={goHome}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
            <button
              onClick={goToEditor}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Meme
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {memes.map((meme) => (
            <div
              key={meme.id}
              className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden"
            >
              {/* Meme Header */}
              <div className="p-4 border-b border-white/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {meme.creator.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{meme.creator}</p>
                      <p className="text-gray-400 text-sm">
                        {new Date(meme.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-lg">${meme.value}</p>
                    <p className="text-gray-400 text-sm">Market Value</p>
                  </div>
                </div>
              </div>

              {/* Meme Content */}
              <div className="p-4">
                <img
                  src={meme.image}
                  alt="Meme"
                  className="w-full max-w-md mx-auto rounded-lg bg-white"
                />
              </div>

              {/* Meme Info */}
              {(meme.topText || meme.bottomText) && (
                <div className="px-4 pb-2">
                  <div className="bg-white/5 rounded-lg p-3">
                    {meme.topText && (
                      <p className="text-white text-sm mb-1">
                        <span className="text-gray-400">Top:</span> {meme.topText}
                      </p>
                    )}
                    {meme.bottomText && (
                      <p className="text-white text-sm">
                        <span className="text-gray-400">Bottom:</span> {meme.bottomText}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="p-4 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(meme.id)}
                      className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{meme.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Buy Coin
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemeFeed;