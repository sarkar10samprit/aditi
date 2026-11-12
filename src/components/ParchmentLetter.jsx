import React, { useState, useEffect, useRef } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Play, Pause, RotateCcw, FastForward, Heart, Volume2, VolumeX, Feather, Gauge } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ParchmentLetter() {
  const letter = birthdayData.parchmentLetter;

  // Flatten the entire letter into structured elements with cumulative character lengths
  const fullContent = [
    { type: 'recipient', text: letter.recipient },
    ...letter.paragraphs.map((p) => ({ type: 'paragraph', text: p })),
    { type: 'signoff', text: letter.signoff },
    { type: 'sender', text: letter.sender }
  ];

  const totalCharacters = fullContent.reduce((sum, item) => sum + item.text.length, 0);

  const [visibleChars, setVisibleChars] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(68); // 68ms per character
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  const sectionRef = useRef(null);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Only start typing when user scrolls and reaches the letter section
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsPlaying(true);
        }
      },
      {
        threshold: 0.2, // Triggers when 20% of section enters viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  // Soft vintage quill / typewriter click
  const playTypingSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300 + Math.random() * 100, ctx.currentTime);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Audio fallback
    }
  };

  // Typing animation loop with decreased speed
  useEffect(() => {
    if (!isPlaying || visibleChars >= totalCharacters) return;

    timerRef.current = setTimeout(() => {
      setVisibleChars((prev) => {
        const next = prev + 1;
        if (next % 2 === 0) playTypingSound();
        return next;
      });
    }, typingSpeed);

    return () => clearTimeout(timerRef.current);
  }, [visibleChars, isPlaying, totalCharacters, typingSpeed, soundEnabled]);

  const handleRestart = () => {
    setVisibleChars(0);
    setHasStarted(true);
    setIsPlaying(true);
  };

  const handleSkip = () => {
    setVisibleChars(totalCharacters);
    setIsPlaying(false);
    setHasStarted(true);
  };

  const toggleSpeed = () => {
    if (typingSpeed === 68) setTypingSpeed(95);
    else if (typingSpeed === 95) setTypingSpeed(42);
    else setTypingSpeed(68);
  };

  const getSpeedLabel = () => {
    if (typingSpeed === 95) return 'Pace: Slow';
    if (typingSpeed === 42) return 'Pace: Brisk';
    return 'Pace: Gentle';
  };

  const handleSendLove = () => {
    setHeartCount((prev) => prev + 1);
    confetti({
      particleCount: 35,
      spread: 65,
      origin: { y: 0.75 },
      colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E']
    });
  };

  // Helper to render text with character-by-character blur-in animation
  const renderAnimatedBlock = (text, globalOffset) => {
    const chars = text.split('');
    const blockEnd = globalOffset + chars.length;

    if (visibleChars < globalOffset) {
      return null;
    }

    const visibleInBlock = Math.min(chars.length, Math.max(0, visibleChars - globalOffset));
    const isCurrentlyTypingHere = visibleChars >= globalOffset && visibleChars < blockEnd;

    return (
      <span>
        {chars.slice(0, visibleInBlock).map((char, index) => {
          const charGlobalIndex = globalOffset + index;
          const isLatest = charGlobalIndex === visibleChars - 1;

          return (
            <span
              key={index}
              className={`char-blur-in ${isLatest ? 'text-cosmic-rose' : ''}`}
            >
              {char}
            </span>
          );
        })}
        {isCurrentlyTypingHere && <span className="typewriter-cursor" />}
      </span>
    );
  };

  let cumulativeOffset = 0;

  return (
    <section 
      id="letters" 
      ref={sectionRef} 
      className="py-24 px-4 sm:px-6 max-w-5xl mx-auto relative scroll-mt-10"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Feather className="w-3.5 h-3.5" />
          <span>Handwritten Parchment for Coco</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-3">
          A Letter for My Dearest Coco
        </h2>
        <p className="font-sans text-white/80 text-sm sm:text-base font-light leading-relaxed">
          {hasStarted 
            ? "Watch the ink appear word by word, character by character across the aged parchment."
            : "Scroll down to this parchment to begin reading Coco's letter."}
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 relative z-10">
        <button
          onClick={() => {
            if (!hasStarted) {
              setHasStarted(true);
              setIsPlaying(true);
            } else {
              setIsPlaying(!isPlaying);
            }
          }}
          disabled={visibleChars >= totalCharacters}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-pill hover:bg-white/20 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all disabled:opacity-40 cursor-pointer"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 text-cosmic-champagne" /> : <Play className="w-3.5 h-3.5 text-cosmic-champagne" />}
          <span>{isPlaying ? 'Pause Typing' : hasStarted ? 'Resume Typing' : 'Start Reading'}</span>
        </button>

        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-pill hover:bg-white/20 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cosmic-champagne" />
          <span>Restart</span>
        </button>

        <button
          onClick={toggleSpeed}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-pill hover:bg-white/20 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
          title="Adjust letter reveal speed"
        >
          <Gauge className="w-3.5 h-3.5 text-cosmic-champagne" />
          <span>{getSpeedLabel()}</span>
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-pill hover:bg-white/20 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
        >
          <FastForward className="w-3.5 h-3.5 text-cosmic-champagne" />
          <span>Reveal All</span>
        </button>

        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full glass-pill transition-all cursor-pointer ${
            soundEnabled ? 'bg-white/20 text-cosmic-champagne border-white/40' : 'text-white/70 hover:text-white'
          }`}
          title="Toggle typewriter audio feedback"
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cosmic-champagne" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="font-sans text-xs font-semibold uppercase tracking-wider">
            {soundEnabled ? 'Typing Sound: ON' : 'Typing Sound: OFF'}
          </span>
        </button>
      </div>

      {/* Cutout Parchment Letter Container */}
      <div className="relative max-w-2xl mx-auto filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)] select-text">
        {/* Transparent Cutout Torn Paper Background Image */}
        <img
          src="/torn_paper.png"
          alt="Vintage Torn Letter for Coco"
          className="w-full h-auto block pointer-events-none select-none"
        />

        {/* Overlay Content strictly padded within the torn paper edges */}
        <div className="absolute inset-0 pt-12 pb-14 px-10 sm:pt-20 sm:pb-24 sm:px-16 md:pt-24 md:pb-28 md:px-20 flex flex-col justify-between overflow-y-auto overflow-x-hidden">
          <div className="vintage-ink space-y-3.5 sm:space-y-4">
            {/* Recipient */}
            {(() => {
              const item = fullContent[0];
              const offset = cumulativeOffset;
              cumulativeOffset += item.text.length;
              return (
                <h3 className="font-serif italic font-bold text-xl sm:text-2xl md:text-3xl tracking-tight mb-2 text-[#2E160C]">
                  {renderAnimatedBlock(item.text, offset)}
                </h3>
              );
            })()}

            {/* Paragraphs */}
            {letter.paragraphs.map((para, pIdx) => {
              const offset = cumulativeOffset;
              cumulativeOffset += para.length;
              return (
                <p
                  key={pIdx}
                  className="font-serif text-[12px] sm:text-[14px] md:text-[15px] leading-[1.65] sm:leading-[1.7] text-[#2E160C]/90 font-medium tracking-normal text-justify"
                >
                  {renderAnimatedBlock(para, offset)}
                </p>
              );
            })}

            {/* Signoff & Sender */}
            <div className="pt-2 sm:pt-4 border-t border-[#8B5A2B]/20">
              {(() => {
                const item = fullContent[fullContent.length - 2];
                const offset = cumulativeOffset;
                cumulativeOffset += item.text.length;
                return (
                  <p className="font-serif italic text-sm sm:text-base text-[#2E160C]/85 font-semibold">
                    {renderAnimatedBlock(item.text, offset)}
                  </p>
                );
              })()}

              {(() => {
                const item = fullContent[fullContent.length - 1];
                const offset = cumulativeOffset;
                cumulativeOffset += item.text.length;
                return (
                  <p className="font-serif text-sm sm:text-base font-bold text-[#5C2410] mt-0.5">
                    {renderAnimatedBlock(item.text, offset)}
                  </p>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Love Reaction Button below parchment */}
      <div className="mt-10 flex flex-col items-center justify-center gap-2 relative z-10">
        <button
          onClick={handleSendLove}
          className="flex items-center gap-2 px-7 py-3 rounded-full luxury-button text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-xl hover:shadow-glow-rose transition-all active:scale-95 cursor-pointer"
        >
          <Heart className={`w-4 h-4 text-cosmic-champagne fill-cosmic-champagne ${heartCount > 0 ? 'scale-125' : ''} transition-transform`} />
          <span>Send Coco Love Back ({heartCount})</span>
        </button>
        <span className="text-[11px] text-white/60 font-sans tracking-wide">
          Tap to send floating stardust hearts to Coco
        </span>
      </div>
    </section>
  );
}
