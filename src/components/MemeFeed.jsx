import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Plus, Home, Palette, Coins, TrendingUp } from 'lucide-react';

const MemeFeed = ({ memes: propMemes, onNavigateToEditor, onNavigateHome }) => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    // Use memes from props if available, otherwise load from localStorage
    if (propMemes && propMemes.length > 0) {
      setMemes(propMemes);
    } else {
      // Mock data for demo since localStorage isn't available
      const mockMemes = [
        {
          id: '1',
          creator: 'MemeKing',
          createdAt: '2024-06-25',
          value: 150,
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjOEI1Q0Y2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0Ij5TYW1wbGUgTWVtZTwvdGV4dD4KPC9zdmc+',
          topText: 'When you finally',
          bottomText: 'Understand React hooks',
          likes: 42
        },
        {
          id: '2',
          creator: 'CryptoMemer',
          createdAt: '2024-06-24',
          value: 250,
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0Ij5Bbm90aGVyIE1lbWU8L3RleHQ+Cjwvc3ZnPg==',
          topText: 'MemeCoinify be like',
          bottomText: 'Making memes profitable',
          likes: 78
        }
      ];
      setMemes(mockMemes);
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

  if (memes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              Meme Feed
            </h1>
            <div className="flex gap-4">
              <button
                onClick={goHome}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow-lg transition-transform hover:scale-105"
              >
                <Home className="w-6 h-6" /> Home
              </button>
              <button
                onClick={goToEditor}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white text-lg font-bold shadow-lg transition-transform hover:scale-105"
              >
                <Palette className="w-6 h-6" /> Create Meme
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
              className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Palette className="w-6 h-6" />
              Create Your First Meme
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="sticky top-0 z-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 bg-opacity-90 pb-4 mb-8 rounded-b-2xl shadow-lg">
          <div className="flex justify-between items-center pt-6 px-2">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              Meme Feed
            </h1>
            <div className="flex gap-4">
              <button
                onClick={goHome}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow-lg transition-transform hover:scale-105"
              >
                <Home className="w-6 h-6" /> Home
              </button>
              <button
                onClick={goToEditor}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white text-lg font-bold shadow-lg transition-transform hover:scale-105"
              >
                <Palette className="w-6 h-6" /> Create Meme
              </button>
            </div>
          </div>
        </div>
        {/* Meme Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {memes.map((meme) => (
            <div
              key={meme.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Meme Header */}
              <div className="p-4 border-b border-white/20 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {meme.creator.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{meme.creator}</p>
                    <p className="text-gray-400 text-sm">
                      {meme.createdAt ? new Date(meme.createdAt).toLocaleDateString() : '—'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 font-bold text-lg flex items-center gap-1">
                    <Coins className="w-5 h-5" />
                    ${meme.value}
                  </p>
                  <p className="text-gray-400 text-sm">Market Value</p>
                </div>
              </div>
              {/* Meme Content */}
              <div className="p-4 flex-1 flex items-center justify-center">
                <img
                  src={meme.image}
                  alt="Meme"
                  className="w-full max-w-xs mx-auto rounded-lg bg-white shadow-md"
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
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleLike(meme.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 shadow-lg hover:brightness-110 hover:-translate-y-1 transition-all font-bold text-white"
                    >
                      <Heart className="w-5 h-5 text-white" />
                      <span>{meme.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg hover:brightness-110 hover:-translate-y-1 transition-all font-bold text-white">
                      <MessageCircle className="w-5 h-5 text-white" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-teal-500 shadow-lg hover:brightness-110 hover:-translate-y-1 transition-all font-bold text-white">
                      <Share2 className="w-5 h-5 text-white" />
                      <span>Share</span>
                    </button>
                  </div>
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white px-4 py-2 rounded-full transition-all shadow-md font-semibold flex items-center gap-2 transform hover:scale-105">
                    <Coins className="w-4 h-4" />
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