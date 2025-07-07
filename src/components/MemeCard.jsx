import { useState } from "react";
import { Heart, Share2, ExternalLink, Copy, Calendar } from "lucide-react";
import { toast } from "react-hot-toast";
import { truncateAddress } from "../utils/formatting";

export default function MemeCard({ meme }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(meme.likes || 0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => prev - 1);
      setIsLiked(false);
      toast.success("Like removed!");
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
      toast.success("Meme liked!");
    }
  };

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    toast.success(message);
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const text = `Check out this awesome meme: "${meme.title}" created on MemeCoinify! 🎭💰`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(meme.imageUrl)}`;
    window.open(url, "_blank");
    setShowShareMenu(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Meme Image */}
      <div className="aspect-square bg-gray-100 relative group">
        <img
          src={meme.imageUrl}
          alt={meme.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/placeholder-meme.png"; // Fallback image
          }}
        />

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => window.open(meme.imageUrl, "_blank")}
            className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
            title="View full size"
          >
            <ExternalLink className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>

      {/* Meme Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-800 text-lg leading-tight">
            {meme.title}
          </h3>
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-blue-500 to-purple-400 shadow-lg hover:brightness-110 hover:-translate-y-1 transition-all font-bold text-white"
            >
              <Share2 className="w-7 h-7 text-white" />
              <span>Share</span>
            </button>

            {/* Share dropdown */}
            {showShareMenu && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10 min-w-48">
                <button
                  onClick={shareToTwitter}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                >
                  <span>📱</span>
                  <span>Share on Twitter</span>
                </button>
                <button
                  onClick={() =>
                    copyToClipboard(meme.imageUrl, "Image URL copied!")
                  }
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Copy className="w-7 h-7 text-white" />
                  <span>Copy Image URL</span>
                </button>
                <button
                  onClick={() =>
                    copyToClipboard(meme.coinId, "Coin ID copied!")
                  }
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Copy className="w-7 h-7 text-white" />
                  <span>Copy Coin ID</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {meme.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {meme.description}
          </p>
        )}

        {/* Creator & Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <span>By</span>
            <span className="font-medium text-zora-purple">
              {truncateAddress(meme.creator)}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-7 h-7 text-white" />
            <span>{formatDate(meme.timestamp)}</span>
          </div>
        </div>

        {/* Coin Info */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">Coin ID</p>
              <p className="font-mono text-sm text-gray-800">{meme.coinId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-600 mb-1">Market Cap</p>
              <p className="font-semibold text-zora-purple">
                ${Math.floor(Math.random() * 10000)} {/* Placeholder */}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-br from-pink-500 to-yellow-400 shadow-lg hover:brightness-110 hover:-translate-y-1 transition-all font-bold text-white ${
              isLiked ? "ring-2 ring-pink-400" : ""
            }`}
          >
            <Heart className="w-7 h-7 text-white" />
            <span className="text-white font-bold">{likes}</span>
          </button>

          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-zora-purple text-white text-sm rounded-lg hover:bg-purple-600 transition-colors">
              Buy Coin
            </button>
            <button className="px-4 py-2 border border-zora-purple text-zora-purple text-sm rounded-lg hover:bg-purple-50 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
}
