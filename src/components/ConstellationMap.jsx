import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';
import { playChime, playPop } from '../utils/soundEffects';

// Line connections forming the letters "C O C O"
const CONSTELLATION_LINES = [
  // C (1 - 4)
  [1, 2], [2, 3], [3, 4],
  // O (5 - 9)
  [5, 6], [6, 7], [7, 8], [8, 9], [9, 5],
  // C (10 - 13)
  [10, 11], [11, 12], [12, 13],
  // O (14 - 18)
  [14, 15], [15, 16], [16, 17], [17, 18], [18, 14]
];

export default function ConstellationMap() {
  const stars = birthdayData.constellationData || [];
  const [illuminated, setIlluminated] = useState(new Set([1])); // Star 1 active by default
  const [activeStarId, setActiveStarId] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const autoSequenceRef = useRef(null);

  const activeStar = stars.find((s) => s.id === activeStarId) || stars[0];
  const count = illuminated.size;

  // Handle clicking an individual star
  const handleStarClick = (star) => {
    playChime();
    setActiveStarId(star.id);

    setIlluminated((prev) => {
      const next = new Set(prev);
      next.add(star.id);

      if (next.size === stars.length && !isCompleted) {
        setIsCompleted(true);
        triggerGrandConfetti();
      }
      return next;
    });
  };

  // Grand celebration confetti burst when all 18 stars connect
  const triggerGrandConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FCD34D', '#F472B6', '#FFFFFF', '#E8729B']
    });
  };

  // Auto-connect all 18 stars in sequence
  const handleAutoConnect = () => {
    playPop();
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx >= stars.length) {
        clearInterval(interval);
        return;
      }
      const star = stars[currentIdx];
      playChime();
      setActiveStarId(star.id);

      setIlluminated((prev) => {
        const next = new Set(prev);
        next.add(star.id);
        if (next.size === stars.length) {
          setIsCompleted(true);
          triggerGrandConfetti();
        }
        return next;
      });

      currentIdx++;
    }, 280);

    autoSequenceRef.current = interval;
  };

  // Reset constellation
  const handleReset = () => {
    playPop();
    if (autoSequenceRef.current) clearInterval(autoSequenceRef.current);
    setIlluminated(new Set([1]));
    setActiveStarId(1);
    setIsCompleted(false);
  };

  useEffect(() => {
    return () => {
      if (autoSequenceRef.current) clearInterval(autoSequenceRef.current);
    };
  }, []);

  return (
    <section id="constellation" className="py-14 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto relative select-none">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
          <span>18th Celestial Alignment</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-2">
          The Coco Constellation
        </h2>

        <p className="font-sans text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
          18 golden stars written across the night sky for your 18th birthday. Tap each star to awaken a memory and illuminate your name.
        </p>

        {/* Counter & Action Controls */}
        <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
          <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold text-pink-200">
            ✨ {count} / 18 Stars Awakened
          </div>

          {!isCompleted ? (
            <button
              onClick={handleAutoConnect}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400/90 to-rose-400/90 hover:from-amber-400 hover:to-rose-400 text-neutral-900 font-sans text-xs font-bold tracking-wide shadow-md transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Star className="w-3.5 h-3.5 fill-neutral-900" />
              <span>Connect All Stars ✨</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-semibold tracking-wide border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay Constellation</span>
            </button>
          )}
        </div>
      </div>

      {/* Cosmic Sky Canvas Container */}
      <div className="relative w-full rounded-3xl bg-radial from-[#24081B] via-[#12030E] to-[#080106] p-4 sm:p-8 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Subtle Ambient Nebula Glows */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Constellation SVG Canvas (Spelling C O C O) */}
        <div className="relative w-full aspect-[900/340] max-h-[380px]">
          <svg
            viewBox="0 0 900 340"
            className="w-full h-full overflow-visible"
          >
            <defs>
              {/* Golden Stardust Beam Gradient */}
              <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#F472B6" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FDE047" stopOpacity="0.9" />
              </linearGradient>

              {/* Star Glow Filter */}
              <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Constellation Lines */}
            {CONSTELLATION_LINES.map(([fromId, toId], idx) => {
              const fromStar = stars.find((s) => s.id === fromId);
              const toStar = stars.find((s) => s.id === toId);
              if (!fromStar || !toStar) return null;

              const isConnected = illuminated.has(fromId) && illuminated.has(toId);

              return (
                <line
                  key={`line-${idx}`}
                  x1={fromStar.x}
                  y1={fromStar.y}
                  x2={toStar.x}
                  y2={toStar.y}
                  stroke={isConnected ? 'url(#beamGrad)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth={isConnected ? (isCompleted ? 2.5 : 2) : 1}
                  strokeDasharray={isConnected ? 'none' : '3 3'}
                  className={isConnected ? 'transition-all duration-700' : ''}
                />
              );
            })}

            {/* 18 Interactive Stars */}
            {stars.map((star) => {
              const isLit = illuminated.has(star.id);
              const isActive = activeStarId === star.id;

              return (
                <g
                  key={star.id}
                  onClick={() => handleStarClick(star)}
                  className="cursor-pointer group"
                >
                  {/* Outer pulse ring for active/illuminated star */}
                  {isLit && (
                    <circle
                      cx={star.x}
                      cy={star.y}
                      r={isActive ? 16 : 10}
                      fill="none"
                      stroke={isActive ? '#FCD34D' : '#F472B6'}
                      strokeWidth="1.2"
                      opacity={isActive ? 0.8 : 0.4}
                      className="animate-ping"
                      style={{ animationDuration: isActive ? '1.8s' : '3.2s' }}
                    />
                  )}

                  {/* Halo Glow */}
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={isLit ? 9 : 5}
                    fill={isLit ? (isActive ? '#FDE047' : '#F472B6') : '#94A3B8'}
                    opacity={isLit ? 0.35 : 0.15}
                    filter="url(#starGlow)"
                  />

                  {/* Core Star Diamond */}
                  <circle
                    cx={star.x}
                    cy={star.y}
                    r={isLit ? (isActive ? 5.5 : 4) : 3}
                    fill={isLit ? '#FFFFFF' : '#64748B'}
                    className="group-hover:scale-125 transition-transform origin-center"
                  />

                  {/* Star Number Badge */}
                  <text
                    x={star.x}
                    y={star.y - 12}
                    textAnchor="middle"
                    fill={isLit ? (isActive ? '#FCD34D' : '#FBCFE8') : '#64748B'}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                    className="pointer-events-none select-none transition-colors"
                  >
                    {star.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Star Insight Card */}
        <AnimatePresence mode="wait">
          {activeStar && (
            <motion.div
              key={activeStar.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-6 pt-5 border-t border-white/10 text-center max-w-xl mx-auto"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 text-amber-200 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <span>Star #{activeStar.id}</span>
                <span>•</span>
                <span>Letter '{activeStar.letter}'</span>
              </div>

              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1.5">
                {activeStar.title}
              </h4>

              <p className="font-sans text-sm sm:text-base text-pink-100/90 leading-relaxed font-light">
                "{activeStar.text}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grand Completion Banner */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-rose-500/20 border border-amber-300/40 text-center shadow-xl"
            >
              <div className="flex items-center justify-center gap-2 mb-2 text-amber-300">
                <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="font-serif italic text-lg sm:text-xl font-bold text-white">
                  The Coco Constellation is Complete ✨
                </span>
                <Heart className="w-5 h-5 fill-rose-400 text-rose-400 animate-pulse" />
              </div>
              <p className="font-sans text-xs sm:text-sm text-pink-100 max-w-lg mx-auto leading-relaxed">
                18 stars aligned across the cosmos spelling your name. May your 18th year be as luminous and radiant as you make every single room feel. 💖
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
