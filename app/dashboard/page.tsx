'use client';
import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const refreshinterval = 1000;

interface QueueItem {
  id: string;
  title: string;
  thumbnail: string;
  votes: number;
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([
    {
      id: '1',
      title: 'Sample Video 1',
      thumbnail: 'thumbnail1.jpg',
      votes: 10
    },
    {
      id: '2',
      title: 'Sample Video 2',
      thumbnail: 'thumbnail2.jpg',
      votes: 5
    }
  ]);
  const [currvideo, setCurrVideo] = useState<string | null>(null);

  async function refreshstreams() {
    const res = await axios.get("/api/streams/my");
    // Handle the response as needed
  }

  useEffect(() => {
    refreshstreams();
    const interval = setInterval(() => {
      refreshstreams();
    }, refreshinterval);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    // Add submission logic here
  };

  const shareStream = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: 'Join my music stream!',
        text: 'Vote for the next song in my stream queue',
        url: shareUrl
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <div>
      <main className="min-h-screen bg-gray-900 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={shareStream}
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share Stream</span>
            </button>
          </div>

          {/* Video Player */}
          <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-2xl">
            <YouTube
              videoId="dQw4w9WgXcQ"
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 1,
                  modestbranding: 1,
                  controls: 1
                }
              }}
              className="w-full h-full"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Queue */}
            <div className="w-full bg-gray-800 rounded-xl shadow-xl">
              <h2 className="p-6 text-2xl font-bold text-white border-b border-gray-700">Up Next</h2>
              <div className="divide-y divide-gray-700 max-h-[600px] overflow-y-auto">
                {queueItems.sort((a, b) => b.votes - a.votes).map((item) => (
                  <div key={item.id} className="p-6 flex items-center space-x-6">
                    <img src={item.thumbnail} alt={item.title} className="w-32 h-24 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <div className="flex items-center space-x-4 mt-3">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <span className="text-xl font-bold text-white">{item.votes}</span>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
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

            {/* Submission Form */}
            <div className="w-full p-6 bg-gray-800 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Add to Queue</h2>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste YouTube URL here"
                className="w-full p-4 bg-gray-700 text-white border-none rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-lg"
              />
              {preview && (
                <div className="mt-6 aspect-video rounded-lg overflow-hidden">
                  <img src={preview} alt="Video thumbnail" className="w-full h-full object-cover" />
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="mt-6 w-full px-6 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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