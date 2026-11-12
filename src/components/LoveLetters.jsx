import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Mail, Heart, Sparkles, Feather, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetters() {
  const [activeLetterId, setActiveLetterId] = useState(birthdayData.loveLetters[0].id);
  const [heartCount, setHeartCount] = useState(0);

  const activeLetter = birthdayData.loveLetters.find((l) => l.id === activeLetterId) || birthdayData.loveLetters[0];

  const triggerHeartBurst = () => {
    setHeartCount((prev) => prev + 1);
    confetti({
      particleCount: 28,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E']
    });
  };

  const getTagBadge = (tag) => {
    if (tag.includes('Flirty')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cosmic-rose/25 text-cosmic-champagne font-sans text-xs font-semibold border border-cosmic-rose/40">
          <Flame className="w-3.5 h-3.5 text-cosmic-gold fill-cosmic-gold" />
          <span>{tag}</span>
        </span>
      );
    }
    if (tag.includes('Pure')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cosmic-blush/25 text-white font-sans text-xs font-semibold border border-cosmic-blush/40">
          <Heart className="w-3.5 h-3.5 text-cosmic-rose fill-cosmic-rose" />
          <span>{tag}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/15 text-cosmic-champagne font-sans text-xs font-semibold border border-white/20">
        <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
        <span>{tag}</span>
      </span>
    );
  };

  return (
    <section id="letters" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Feather className="w-3.5 h-3.5" />
          <span>Unfiltered Correspondence</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-4">
          Letters Written Just for You
        </h2>
        <p className="font-sans text-white/80 text-base sm:text-lg font-light leading-relaxed">
          The honest truth about how much you matter, how much you brighten every room, and why life without you would be dreadfully boring.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 relative z-10">
        {birthdayData.loveLetters.map((letter) => {
          const isSelected = letter.id === activeLetterId;
          return (
            <button
              key={letter.id}
              onClick={() => setActiveLetterId(letter.id)}
              className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 relative cursor-pointer ${
                isSelected
                  ? 'glass-panel border-white/40 bg-white/20 -translate-y-1 shadow-glass-hover'
                  : 'glass-panel hover:bg-white/10 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="mb-2.5">{getTagBadge(letter.tag)}</div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-white line-clamp-1">
                {letter.title}
              </h3>
              <p className="font-sans text-xs text-white/70 mt-1 line-clamp-2 font-light">
                {letter.preview}
              </p>
            </button>
          );
        })}
      </div>

      {/* Open Letter Station */}
      <div className="relative z-10 glass-panel p-8 sm:p-12 md:p-14 shadow-2xl border border-white/30 relative overflow-hidden">
        {/* Decorative Watermark */}
        <div className="absolute top-8 right-8 w-20 h-20 border border-white/20 rounded-full flex flex-col items-center justify-center rotate-12 pointer-events-none opacity-40">
          <Heart className="w-7 h-7 text-cosmic-champagne" />
          <span className="text-[9px] font-sans font-bold text-cosmic-champagne uppercase tracking-widest mt-1">
            VERIFIED
          </span>
        </div>

        {/* Header inside letter */}
        <div className="mb-8">
          {getTagBadge(activeLetter.tag)}
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mt-4 leading-tight">
            {activeLetter.title}
          </h3>
        </div>

        {/* Letter Prose */}
        <div className="space-y-5 max-w-3xl">
          {activeLetter.content.split('\n\n').map((paragraph, idx) => (
            <p
              key={idx}
              className="font-sans text-base sm:text-lg text-white/90 leading-relaxed font-light tracking-wide"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Signoff */}
        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-serif italic text-2xl sm:text-3xl text-cosmic-champagne">
              Forever your biggest fan, confidant & partner in chaos,
            </p>
            <p className="font-sans text-xs text-white/60 font-medium tracking-widest uppercase mt-1">
              With unconditional devotion ✨
            </p>
          </div>

          <button
            onClick={triggerHeartBurst}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full luxury-button text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all active:scale-95 cursor-pointer shadow-lg hover:shadow-glow-rose"
          >
            <Heart className={`w-4 h-4 text-cosmic-champagne fill-cosmic-champagne ${heartCount > 0 ? 'scale-125' : ''} transition-transform`} />
            <span>Send Love Back ({heartCount})</span>
          </button>
        </div>
      </div>
    </section>
  );
}
