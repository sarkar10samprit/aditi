import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Heart, Sparkles, SkipForward } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';
import { playPop } from '../utils/soundEffects';

export default function AudioPlayer({ autoPlay = false, mode = 'romantic' }) {
  const romanticPlaylist = birthdayData.playlist || [
    {
      id: 1,
      title: 'Her',
      artist: 'JVKE',
      src: `${import.meta.env.BASE_URL}birthday_song.mp3`
    },
    {
      id: 2,
      title: 'This Love',
      artist: 'Elliot James Reay',
      src: `${import.meta.env.BASE_URL}this_love.mp3`
    }
  ];

  const memePlaylist = birthdayData.memePlaylist || [
    {
      id: 'meme-1',
      title: 'Ale Le Le',
      artist: 'Desi Meme',
      src: `${import.meta.env.BASE_URL}ale-le-le.mp3`
    },
    {
      id: 'meme-2',
      title: 'Aji Mangal',
      artist: 'Classic Meme',
      src: `${import.meta.env.BASE_URL}aji-mangal.mp3`
    }
  ];

  const playlist = mode === 'memes' ? memePlaylist : romanticPlaylist;

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [floatingNotes, setFloatingNotes] = useState([]);
  const [volume, setVolume] = useState(0.20); // 20%: Golden ratio for ambient "back of the mind" volume
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  
  const audioRef = useRef(null);
  const playlistRef = useRef(playlist);
  const trackIndexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const volumeRef = useRef(0.20);
  const fadeAnimRef = useRef(null);
  const modeRef = useRef(mode);

  // Sync ref values for access in async events
  playlistRef.current = playlist;
  trackIndexRef.current = currentTrackIndex;
  isPlayingRef.current = isPlaying;
  volumeRef.current = volume;
  modeRef.current = mode;

  const cancelFade = () => {
    if (fadeAnimRef.current) {
      cancelAnimationFrame(fadeAnimRef.current);
      fadeAnimRef.current = null;
    }
  };

  /**
   * Psychoacoustic smooth fade-in: ramps volume effortlessly so it feels
   * like entering subconscious background thoughts rather than cutting in.
   */
  const smoothFadeIn = (audio, targetVol = volumeRef.current, durationMs = 1500) => {
    if (!audio) return;
    cancelFade();
    audio.volume = 0;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      // Ease-out quadratic curve for natural sound entry
      const current = targetVol * (1 - (1 - progress) * (1 - progress));
      audio.volume = Math.min(Math.max(current, 0), 1);

      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(step);
      } else {
        audio.volume = targetVol;
        fadeAnimRef.current = null;
      }
    };
    fadeAnimRef.current = requestAnimationFrame(step);
  };

  /**
   * Gentle fade-out before pausing to avoid harsh sudden clicks
   */
  const smoothFadeOut = (audio, durationMs = 350) => {
    return new Promise((resolve) => {
      if (!audio) return resolve();
      cancelFade();
      const startVol = audio.volume;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        audio.volume = Math.max(0, startVol * (1 - progress));

        if (progress < 1) {
          fadeAnimRef.current = requestAnimationFrame(step);
        } else {
          audio.pause();
          audio.volume = volumeRef.current;
          fadeAnimRef.current = null;
          resolve();
        }
      };
      fadeAnimRef.current = requestAnimationFrame(step);
    });
  };

  const currentTrack = playlist[currentTrackIndex] || playlist[0];

  const preloadUpcomingTrack = (src) => {
    try {
      const p = new Audio();
      p.preload = 'auto';
      p.src = src;
    } catch (e) {}
  };

  const playTrack = (index) => {
    const audio = audioRef.current;
    const currentList = playlistRef.current;
    if (!audio || !currentList || !currentList[index]) return;

    cancelFade();
    trackIndexRef.current = index;
    setCurrentTrackIndex(index);

    // Direct source change without audio.load() to prevent AbortError
    if (audio.src !== currentList[index].src) {
      audio.src = currentList[index].src;
    }
    audio.volume = volumeRef.current; // Immediate 20% default sound

    // Pre-cache next song in the background
    const upcomingIndex = (index + 1) % currentList.length;
    preloadUpcomingTrack(currentList[upcomingIndex].src);

    const doPlay = () => {
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
          audio.volume = volumeRef.current;
        }).catch((err) => {
          console.warn('Track transition play deferred, waiting for canplay:', err);
          const onCanPlay = () => {
            audio.removeEventListener('canplay', onCanPlay);
            audio.play().then(() => {
              setIsPlaying(true);
              isPlayingRef.current = true;
              audio.volume = volumeRef.current;
            }).catch((e) => console.error('canplay play failed:', e));
          };
          audio.addEventListener('canplay', onCanPlay, { once: true });
        });
      }
    };

    doPlay();
  };

  useEffect(() => {
    const initialList = playlistRef.current;
    const audio = new Audio(initialList[0].src);
    audio.loop = false; // Must be false so 'ended' fires to switch tracks!
    audio.volume = 0.20; // Default 20% ambient sound
    audioRef.current = audio;

    // Immediately pre-cache Track 2 into browser memory
    if (initialList.length > 1) {
      preloadUpcomingTrack(initialList[1].src);
    }

    const handleEnded = () => {
      // Loop sequentially: Track 1 -> Track 2 -> Track 1 -> Track 2...
      const currentList = playlistRef.current;
      const nextIndex = (trackIndexRef.current + 1) % currentList.length;
      playTrack(nextIndex);
    };

    audio.addEventListener('ended', handleEnded);

    const startPlayback = () => {
      if (audioRef.current && !isPlayingRef.current) {
        audioRef.current.volume = volumeRef.current;
        const p = audioRef.current.play();
        if (p !== undefined) {
          p.then(() => {
            setIsPlaying(true);
            isPlayingRef.current = true;
          }).catch((err) => {
            console.warn('Auto-playback waiting for touch/click interaction:', err);
            const gestureStart = () => {
              if (audioRef.current && !isPlayingRef.current) {
                audioRef.current.volume = volumeRef.current;
                audioRef.current.play().then(() => {
                  setIsPlaying(true);
                  isPlayingRef.current = true;
                }).catch(() => {});
              }
            };
            window.addEventListener('click', gestureStart, { once: true });
            window.addEventListener('touchstart', gestureStart, { once: true });
          });
        }
      }
    };

    const handleUnlockAudio = (e) => {
      const targetMode = e?.detail?.mode;
      if (targetMode && targetMode !== modeRef.current) {
        const targetList = targetMode === 'memes' ? memePlaylist : romanticPlaylist;
        playlistRef.current = targetList;
        trackIndexRef.current = 0;
        setCurrentTrackIndex(0);
        if (audioRef.current) {
          audioRef.current.src = targetList[0].src;
        }
      }
      startPlayback();
    };

    window.addEventListener('unlock-success', handleUnlockAudio);

    return () => {
      cancelFade();
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      window.removeEventListener('unlock-success', handleUnlockAudio);
      audioRef.current = null;
    };
  }, []);

  // Handle dynamic switching between Romantic playlist and Meme playlist
  const prevModeRef = useRef(mode);
  useEffect(() => {
    if (prevModeRef.current !== mode) {
      prevModeRef.current = mode;
      const currentList = mode === 'memes' ? memePlaylist : romanticPlaylist;
      playlistRef.current = currentList;
      trackIndexRef.current = 0;
      setCurrentTrackIndex(0);

      const audio = audioRef.current;
      if (audio) {
        cancelFade();
        audio.src = currentList[0].src;
        audio.volume = volumeRef.current;
        if (currentList.length > 1) {
          preloadUpcomingTrack(currentList[1].src);
        }
        if (isPlayingRef.current || autoPlay) {
          audio.play().then(() => {
            setIsPlaying(true);
            isPlayingRef.current = true;
          }).catch(() => {});
        }
      }
    }
  }, [mode, autoPlay]);

  // React to autoPlay prop update (when entering main page)
  useEffect(() => {
    if (autoPlay && !isPlaying && audioRef.current) {
      if (!isPlayingRef.current) {
        audioRef.current.volume = volumeRef.current; // 20% default sound
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          isPlayingRef.current = true;
        }).catch((err) => {
          console.warn('autoPlay prop waiting for gesture:', err);
        });
      }
    }
  }, [autoPlay, isPlaying]);

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
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      smoothFadeOut(audio, 300).then(() => {
        setIsPlaying(false);
      });
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        smoothFadeIn(audio, volumeRef.current, 1600);
      }).catch((err) => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  const nextTrack = (e) => {
    if (e) e.stopPropagation();
    playPop();
    const currentList = playlistRef.current;
    const nextIndex = (trackIndexRef.current + 1) % currentList.length;
    playTrack(nextIndex);
  };

  return (
    <div className="fixed top-5 right-5 z-[110] flex items-center select-none">
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
        className={`group flex items-center gap-3.5 pl-2.5 pr-3.5 py-2 rounded-full border transition-all duration-300 backdrop-blur-md shadow-lg ${
          isPlaying
            ? 'bg-black/75 border-pink-400/50 shadow-glow-rose'
            : 'bg-black/45 border-white/20'
        }`}
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
              {mode === 'memes' ? (
                <span className="text-[9px] leading-none select-none">😂</span>
              ) : (
                <Heart className="w-2.5 h-2.5 text-white fill-white drop-shadow-xs" />
              )}
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
        <div className="flex flex-col min-w-[70px]">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-xs font-semibold text-pink-100 tracking-wide truncate max-w-[90px]">
              {currentTrack.title}
            </span>
            {isPlaying && <Sparkles className="w-3 h-3 text-pink-300 animate-pulse shrink-0" />}
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
                <span className="font-sans text-[10px] text-pink-200/90 font-medium">Track {currentTrackIndex + 1}/2 ♪</span>
              </>
            ) : (
              <span className="font-sans text-[10px] text-white/60 font-medium">Paused</span>
            )}
          </div>
        </div>

        {/* Action icons: Next Track & Volume Control */}
        <div className="flex items-center gap-1 pl-1">
          {/* Skip to Next Track Button */}
          <button
            type="button"
            onClick={nextTrack}
            title="Next Track"
            className="p-1.5 rounded-full text-white/70 hover:text-pink-300 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Volume toggle & slider container */}
          <div
            className="flex items-center gap-1"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            {/* Volume toggle & slider trigger */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowVolumeSlider((prev) => !prev);
              }}
              title={`Adjust volume (Currently ${Math.round(volume * 100)}%)`}
              className="p-1.5 rounded-full text-white/70 hover:text-pink-300 hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isPlaying && volume > 0 ? (
                <Volume2 className="w-4 h-4 text-pink-300" />
              ) : (
                <VolumeX className="w-4 h-4 text-white/40" />
              )}
            </button>

            {/* Smooth 0-100 Volume Slider (Reveals on hover or tap) */}
            <div
              onClick={(e) => e.stopPropagation()}
              className={`transition-all duration-300 flex items-center gap-1.5 overflow-hidden ${
                showVolumeSlider ? 'w-24 opacity-100 ml-0.5' : 'w-0 opacity-0 pointer-events-none'
              }`}
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const newVol = parseFloat(e.target.value);
                  setVolume(newVol);
                  volumeRef.current = newVol;
                  if (audioRef.current) {
                    audioRef.current.volume = newVol;
                  }
                }}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-400"
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
              <span className="font-mono text-[9px] text-pink-200/80 font-bold shrink-0 min-w-[24px]">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
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
