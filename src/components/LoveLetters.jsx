import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Mail, Heart, Sparkles, Feather, Flame, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetters() {
  const [activeLetterId, setActiveLetterId] = useState(birthdayData.loveLetters[0].id);
  const [heartCount, setHeartCount] = useState(0);

  const activeLetter = birthdayData.loveLetters.find((l) => l.id === activeLetterId) || birthdayData.loveLetters[0];

  const triggerHeartBurst = () => {
    setHeartCount((prev) => prev + 1);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF9EAA', '#FFA3B5', '#FF7597']
    });
  };

  const getTagBadge = (tag) => {
    if (tag.includes('Flirty')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-peach/40 text-blush-600 font-heading text-xs font-semibold border border-blush-200">
          <Flame className="w-3.5 h-3.5 text-blush-500 fill-blush-500" />
          <span>{tag}</span>
        </span>
      );
    }
    if (tag.includes('Pure')) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blush-100 text-blush-600 font-heading text-xs font-semibold border border-blush-200">
          <Heart className="w-3.5 h-3.5 text-blush-500 fill-blush-500" />
          <span>{tag}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lavender-100 text-lavender-600 font-heading text-xs font-semibold border border-lavender-200">
        <Sparkles className="w-3.5 h-3.5 text-sparkle" />
        <span>{tag}</span>
      </span>
    );
  };

  return (
    <section id="letters" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blush-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush-100 text-blush-600 font-heading text-xs font-semibold uppercase tracking-wider mb-3">
          <Feather className="w-3.5 h-3.5" />
          <span>From My Heart To Yours</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-charcoal mb-4">
          Letters You Were Meant To Read 💌
        </h2>
        <p className="font-body text-charcoal/75 text-base sm:text-lg">
          A blend of sincere affection, deep appreciation, and just a little bit of shameless flirting. Tap through the envelopes below.
        </p>
      </div>

      {/* Interactive Tabs / Envelope Selectors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 relative z-10">
        {birthdayData.loveLetters.map((letter) => {
          const isSelected = letter.id === activeLetterId;
          return (
            <button
              key={letter.id}
              onClick={() => setActiveLetterId(letter.id)}
              className={`text-left p-4 rounded-2xl transition-all duration-300 relative cursor-pointer ${
                isSelected
                  ? 'bg-white shadow-clay-card border-2 border-blush-300 -translate-y-1'
                  : 'bg-white/70 hover:bg-white/95 border border-blush-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="mb-2">{getTagBadge(letter.tag)}</div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-charcoal line-clamp-1">
                {letter.title}
              </h3>
              <p className="font-body text-xs text-charcoal/60 mt-1 line-clamp-2">
                {letter.preview}
              </p>
            </button>
          );
        })}
      </div>

      {/* Open Letter Display with Stationery Paper Styling */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border-2 border-blush-100 relative overflow-hidden">
        {/* Decorative corner stamp */}
        <div className="absolute top-6 right-6 w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-blush-300 rounded-2xl flex flex-col items-center justify-center rotate-6 pointer-events-none opacity-70">
          <Heart className="w-6 h-6 text-blush-400 fill-blush-200" />
          <span className="text-[10px] font-heading font-bold text-blush-400 uppercase tracking-widest mt-1">
            AIR MAIL
          </span>
        </div>

        {/* Letter Tag & Title */}
        <div className="mb-6">
          {getTagBadge(activeLetter.tag)}
          <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mt-3">
            {activeLetter.title}
          </h3>
        </div>

        {/* Letter Body */}
        <div className="prose max-w-none">
          {activeLetter.content.split('\n\n').map((paragraph, idx) => (
            <p
              key={idx}
              className="font-body text-base sm:text-lg text-charcoal/85 leading-relaxed mb-4"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Handwritten Signoff */}
        <div className="mt-8 pt-6 border-t border-blush-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-handwriting text-2xl sm:text-3xl text-blush-600">
              Forever your biggest fan, confidant & partner in crime,
            </p>
            <p className="font-heading text-sm text-charcoal/60 font-semibold mt-0.5">
              Always and without exception ✨
            </p>
          </div>

          {/* Interactive Heart Reaction Button */}
          <button
            onClick={triggerHeartBurst}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-blush-50 hover:bg-blush-100 border border-blush-200 text-blush-600 font-heading text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <Heart className={`w-4 h-4 text-blush-500 fill-blush-400 group-hover:scale-125 transition-transform ${heartCount > 0 ? 'animate-bounce' : ''}`} />
            <span>Send Love Back ({heartCount})</span>
          </button>
        </div>
      </div>
    </section>
  );
}
