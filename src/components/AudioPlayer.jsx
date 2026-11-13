import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/birthday_song.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleMusic}
        className={`group flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer ${
          isPlaying
            ? 'bg-white/20 border-white/40 text-white shadow-glow-rose scale-105'
            : 'bg-black/35 border-white/15 text-white/80 hover:bg-white/10 hover:text-white'
        }`}
        aria-label={isPlaying ? 'Pause song' : 'Play song for Coco'}
        title={isPlaying ? 'Pause looping song' : 'Play your song for Coco (Looping)'}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-1 bg-cosmic-champagne rounded-full animate-pulse h-3"></span>
              <span className="w-1 bg-cosmic-champagne rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.15s' }}></span>
              <span className="w-1 bg-cosmic-champagne rounded-full animate-pulse h-2" style={{ animationDelay: '0.3s' }}></span>
              <span className="w-1 bg-cosmic-champagne rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.45s' }}></span>
            </div>
            <span className="font-sans text-xs font-medium tracking-wide">Playing in Loop</span>
            <Volume2 className="w-4 h-4 text-cosmic-champagne" />
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-cosmic-blush group-hover:rotate-12 transition-transform" />
            <span className="font-sans text-xs font-medium tracking-wide">Play Song</span>
            <VolumeX className="w-4 h-4 text-white/50" />
          </>
        )}
      </button>
    </div>
  );
}
