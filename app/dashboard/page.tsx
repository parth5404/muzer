'use client';

import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

interface QueueItem {
  id: string;
  title: string;
  thumbnail: string;
  votes: number;
}

export default function StreamPage() {
  const [url, setUrl] = useState('');
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    {
      id: '1',
      title: 'Current Top Song',
      thumbnail: '/thumbnails/default.jpg',
      votes: 10
    }
  ]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const handleVote = async (itemId: string, voteType: 'up' | 'down') => {
    // Implement voting logic
    const updatedQueue = queueItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          votes: voteType === 'up' ? item.votes + 1 : item.votes - 1
        };
      }
      return item;
    });
    setQueueItems(updatedQueue);
  };

  const handleSubmit = async () => {
    if (!url) return;
    // Add YouTube URL validation and processing
    // Add to queue logic
  };

  const shareStream = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: 'Join our Muzer Stream!',
        text: 'Vote for songs and influence the music stream in real-time!',
        url: shareUrl
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <main className="container mx-auto p-8">
        <div className="space-y-8">
          {/* Share Button */}
          <div className="flex justify-end">
            <button
              onClick={shareStream}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Stream
            </button>
          </div>

         {/* Video Player */}
<div className="w-full max-w-5xl mx-auto h-[500px] rounded-xl overflow-hidden shadow-2xl bg-gray-800">
  <YouTube
    videoId={currentVideo || 'dQw4w9WgXcQ'}
    opts={{
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
      }
    }}
    className="w-full h-full"
  />
</div>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Queue */}
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl">
              <h2 className="p-6 text-2xl font-bold text-white border-b border-gray-700">
                Song Queue
              </h2>
              <div className="divide-y divide-gray-700 max-h-[600px] overflow-y-auto">
                {queueItems.map((item) => (
                  <div key={item.id} className="p-6 flex items-center gap-6">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-32 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <div className="flex items-center gap-4 mt-3">
                        <button 
                          onClick={() => handleVote(item.id, 'up')}
                          className="p-2 hover:bg-purple-600/50 rounded-lg transition-colors"
                        >
                          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <span className="text-xl font-bold text-white">{item.votes}</span>
                        <button 
                          onClick={() => handleVote(item.id, 'down')}
                          className="p-2 hover:bg-purple-600/50 rounded-lg transition-colors"
                        >
                          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Queue Form */}
            <div className="p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Add Song to Queue</h2>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL here"
                className="w-full p-4 bg-gray-700 text-white border-none rounded-lg focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-lg"
              />
              <button
                onClick={handleSubmit}
                className="mt-6 w-full px-6 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add to Queue
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
