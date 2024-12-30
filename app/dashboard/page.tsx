'use client';

import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';
import { useSession } from "next-auth/react";

interface QueueItem {
  id: string;
  type: string;
  url: string;
  extractedId: string;
  title: string;
  smallImg: string;
  bigImg: string;
  active: boolean;
  userId: string;
  upvotes: number;
  haveupvoted: boolean;
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default function StreamPage() {
  const { data: session } = useSession();
  const user = session?.user as User;
  const [url, setUrl] = useState('');
  const [isStreamer, setIsStreamer] = useState(true);
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueue = async () => {
      if (user?.id) {
        const response = await axios.get(`/api/streams?creatorId=${user.id}`);
        if (response.data.streams) {
          setQueueItems(response.data.streams);
        }
      }
    };
    fetchQueue();
  }, [user?.id]);

  const handleVote = async (itemId: string, voteType: 'up' | 'down') => {
    const updatedQueue = queueItems.map(item => {
      if (item.id === itemId) {
        if (item.haveupvoted && voteType === 'up') return item;
        return {
          ...item,
          upvotes: voteType === 'up' ? item.upvotes + 1 : item.upvotes - 1,
          haveupvoted: voteType === 'up'
        };
      }
      return item;
    });
    setQueueItems(updatedQueue);
  };

  const handleDelete = async (itemId: string) => {
    try {
      await axios.delete(`/api/streams/${itemId}`);
      setQueueItems(queueItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  const handlePriority = (itemId: string, newUpvotes: number) => {
    setQueueItems(queueItems.map(item => 
      item.id === itemId ? { ...item, upvotes: newUpvotes } : item
    ));
  };

  const handleSubmit = async () => {
    if (!url || !user?.id) return;

    const videoId = url.split('v=')[1]?.split('&')[0];
    if (!videoId) return;

    const videoExists = queueItems.some(item => item.extractedId === videoId);
    if (videoExists) {
      alert("This video is already in queue!");
      setUrl('');
      return;
    }

    try {
      const response = await axios.post('/api/streams', {
        creatorId: user.id,
        url: url
      });

      const newQueueItem: QueueItem = {
        id: response.data.id,
        type: "youtube",
        url: url,
        extractedId: videoId,
        title: response.data.title,
        smallImg: response.data.smallImg,
        bigImg: response.data.bigImg,
        active: false,
        userId: user.id,
        upvotes: 0,
        haveupvoted: false
      };

      setQueueItems([...queueItems, newQueueItem]);
      setUrl('');
    } catch (error) {
      alert("Failed to add video to queue");
    }
  };

  const onVideoEnd = () => {
    const nextSong = queueItems
      .filter(item => !item.active)
      .sort((a, b) => b.upvotes - a.upvotes)[0];

    if (nextSong) {
      const updatedQueue = queueItems.map(item => ({
        ...item,
        active: item.id === nextSong.id
      }));

      setQueueItems(updatedQueue);
      setCurrentVideo(nextSong.extractedId);
    }
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
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Music Stream</h1>
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

          <div className="w-full max-w-3xl mx-auto h-[400px] rounded-xl overflow-hidden shadow-2xl bg-gray-800">
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
              onEnd={onVideoEnd}
              className="w-full h-full"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl shadow-xl">
              <h2 className="p-6 text-2xl font-bold text-white border-b border-gray-700">
                Song Queue
              </h2>
              <div className="divide-y divide-gray-700 max-h-[600px] overflow-y-auto">
                {queueItems.sort((a,b)=>b.upvotes-a.upvotes).map((item) => (
                  <div key={item.id} className="p-6 flex items-center gap-6">
                    <img
                      src={item.bigImg}
                      alt={item.title}
                      className="w-32 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <div className="flex items-center gap-4 mt-3">
                        <button
                          onClick={() => handleVote(item.id, 'up')}
                          disabled={item.haveupvoted}
                          className={`p-2 rounded-lg transition-colors ${
                            item.haveupvoted 
                              ? 'bg-purple-600 text-white cursor-not-allowed' 
                              : 'hover:bg-purple-600/50 text-gray-300'
                          }`}
                        >
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <span className="text-xl font-bold text-white">{item.upvotes}</span>
                        
                        {isStreamer && (
                          <div className="flex items-center gap-2 ml-4">
                            <input
                              type="number"
                              value={item.upvotes}
                              onChange={(e) => handlePriority(item.id, parseInt(e.target.value))}
                              className="w-20 p-2 bg-gray-700 text-white rounded-lg"
                            />
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                            >
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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