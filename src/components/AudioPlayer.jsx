import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';
import { playPop } from '../utils/soundEffects';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [floatingNotes, setFloatingNotes] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/birthday_song.mp3');
    audio.loop = true;
    audio.volume = 0.55;
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

  // Float musical notes while playing
  useEffect(() => {
    if (!isPlaying) return;

    const symbols = ['♪', '♫', '♡', '♬', '✨'];
    const interval = setInterval(() => {
      const newNote = {
        id: Date.now() + Math.random(),
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        left: Math.random() * 24 - 12
      };

      setFloatingNotes((prev) => [...prev.slice(-4), newNote]);

      setTimeout(() => {
        setFloatingNotes((prev) => prev.filter((n) => n.id !== newNote.id));
      }, 1800);
    }, 900);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleMusic = () => {
    playPop();
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
    <div className="fixed top-5 right-5 z-50 flex items-center select-none">
      {/* Floating Notes Container */}
      <div className="absolute -top-3 left-3 pointer-events-none">
        {floatingNotes.map((note) => (
          <span
            key={note.id}
            className="absolute text-pink-300 font-bold text-xs"
            style={{
              left: `${note.left}px`,
              animation: 'floatNote 1.8s ease-out forwards'
            }}
          >
            {note.symbol}
          </span>
        ))}
      </div>

      <div
        onClick={toggleMusic}
        className={`group flex items-center gap-3.5 pl-2.5 pr-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer shadow-lg ${
          isPlaying
            ? 'bg-black/70 border-pink-400/60 shadow-glow-rose scale-105'
            : 'bg-black/45 border-white/20 hover:bg-black/60 hover:border-pink-300/40'
        }`}
        title={isPlaying ? 'Pause Melody' : 'Play Melody'}
        role="button"
        tabIndex={0}
      >
        {/* Precision Mini Turntable Deck */}
        <div className="relative w-12 h-11 flex items-center justify-start shrink-0">
          {/* Vinyl Disc Body */}
          <div
            className={`w-11 h-11 rounded-full border border-zinc-700/90 shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex items-center justify-center relative overflow-hidden transition-all duration-700 ${
              isPlaying ? 'animate-[spin_3.5s_linear_infinite]' : 'rotate-0'
            }`}
            style={{
              background:
                'conic-gradient(from 0deg, #09090b 0deg, #27272a 45deg, #09090b 90deg, #27272a 135deg, #09090b 180deg, #27272a 225deg, #09090b 270deg, #27272a 315deg, #09090b 360deg)',
            }}
          >
            {/* Micro-grooves */}
            <div className="absolute inset-1 rounded-full border border-white/[0.1] pointer-events-none"></div>
            <div className="absolute inset-2 rounded-full border border-white/[0.06] pointer-events-none"></div>
            <div className="absolute inset-3 rounded-full border border-white/[0.09] pointer-events-none"></div>

            {/* Center Record Label */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-amber-300 flex items-center justify-center shadow-inner relative z-10 border border-white/25">
              <Heart className="w-2.5 h-2.5 text-white fill-white drop-shadow-xs" />
            </div>

            {/* Spindle center hole */}
            <div className="absolute w-1 h-1 bg-zinc-950 rounded-full z-20 border border-zinc-700"></div>
          </div>

          {/* Precision Vector Tonearm (SVG) with realistic turntable pivot & stylus */}
          <svg
            viewBox="0 0 24 44"
            className={`absolute -top-0.5 right-0 w-[20px] h-[38px] pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              isPlaying ? 'rotate-[24deg]' : 'rotate-[-3deg]'
            }`}
            style={{ transformOrigin: '16px 6px' }}
          >
            <defs>
              <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#D4D4D8" />
                <stop offset="100%" stopColor="#A1A1AA" />
              </linearGradient>
              <radialGradient id="pivotGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#A1A1AA" />
                <stop offset="100%" stopColor="#52525B" />
              </radialGradient>
            </defs>

            {/* Cue Rest Stand */}
            <rect x="13.5" y="16" width="5" height="2" rx="1" fill="#71717A" opacity="0.6" />

            {/* Metallic Tonearm Wand */}
            <path
              d="M 16 6 L 16 16 L 11 31 L 9 35"
              fill="none"
              stroke="url(#armGrad)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Cartridge Headshell */}
            <rect
              x="6.5"
              y="32.5"
              width="4.5"
              height="7"
              rx="1"
              transform="rotate(-15 8.75 36)"
              fill="#27272A"
              stroke="#F472B6"
              strokeWidth="0.8"
            />
            {/* Stylus Needle tip */}
            <circle cx="8" cy="39.5" r="0.8" fill="#FDE047" />

            {/* Pivot Base & Metallic Counterweight */}
            <circle cx="16" cy="6" r="3.8" fill="url(#pivotGrad)" stroke="#3F3F46" strokeWidth="0.6" />
            <circle cx="16" cy="6" r="1.5" fill="#F472B6" />
          </svg>
        </div>

        {/* Text & Equalizer */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-xs font-medium text-pink-100 tracking-wide">
              Melody
            </span>
            {isPlaying && <Sparkles className="w-3 h-3 text-pink-300 animate-pulse" />}
          </div>

          <div className="flex items-center gap-1.5">
            {isPlaying ? (
              <>
                <div className="flex items-center gap-0.5 h-2.5">
                  <span className="w-0.5 bg-pink-400 rounded-full animate-pulse h-2"></span>
                  <span className="w-0.5 bg-rose-300 rounded-full animate-pulse h-3" style={{ animationDelay: '0.15s' }}></span>
                  <span className="w-0.5 bg-pink-400 rounded-full animate-pulse h-1.5" style={{ animationDelay: '0.3s' }}></span>
                  <span className="w-0.5 bg-rose-200 rounded-full animate-pulse h-2.5" style={{ animationDelay: '0.45s' }}></span>
                </div>
                <span className="font-sans text-[10px] text-pink-200/90 font-medium">Playing ♪</span>
              </>
            ) : (
              <span className="font-sans text-[10px] text-white/60 font-medium">Paused</span>
            )}
          </div>
        </div>

        {/* Sound toggle icon */}
        <div className="ml-1 text-white/70 group-hover:text-pink-300 transition-colors">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-pink-300" />
          ) : (
            <VolumeX className="w-4 h-4 text-white/40" />
          )}
        </div>
      </div>

      <style>{`
        @keyframes floatNote {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.6);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-38px) scale(1.15) rotate(15deg);
          }
        }
      `}</style>
    </div>
  );
}
