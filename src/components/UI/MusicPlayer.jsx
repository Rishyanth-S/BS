import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { CONFIG } from '../../config';

const MusicPlayer = ({ autoPlay = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      const playAudio = () => {
        audioRef.current.play().catch(e => console.log("Autoplay blocked, waiting for interaction"));
        setIsPlaying(true);
      };
      window.addEventListener('click', playAudio, { once: true });
      return () => window.removeEventListener('click', playAudio);
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <audio ref={audioRef} src={CONFIG.musicUrl} loop />
      <button
        onClick={togglePlay}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all group"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-romantic-pink animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
        <span className="text-sm font-medium text-white/80 hidden group-hover:block transition-all">
          {isPlaying ? "Playing Romantic Tune" : "Music Muted"}
        </span>
      </button>
    </div>
  );
};

export default MusicPlayer;
