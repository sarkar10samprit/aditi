import React from 'react';
import InteractiveGiftBox from './InteractiveGiftBox';
import { birthdayData } from '../config/birthdayData';
import { Sparkles, Image as ImageIcon, Mail, Cake } from 'lucide-react';

export default function Hero({ onGiftOpen }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24 pb-20 px-4 text-center overflow-hidden">
      {/* Editorial Pill Tag */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-pill border border-white/25 text-white/90 font-sans text-xs font-semibold tracking-[0.2em] uppercase mb-8 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
        <span>A Tribute to My Favorite Human</span>
        <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
      </div>

      {/* Main Luxury Title with Editorial Serif */}
      <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-white max-w-5xl leading-[1.08] mb-6 drop-shadow-md">
        Happy Birthday,{' '}
        <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cosmic-champagne via-cosmic-blush to-white">
          {birthdayData.bestieName}
        </span>
      </h1>

      {/* Editorial Subtitle */}
      <p className="font-sans text-base sm:text-xl text-white/85 max-w-2xl font-light leading-relaxed mb-10 tracking-wide">
        To the one whose laugh turns chaos into poetry, whose warmth outshines the stars, and who remains effortlessly, dangerously unforgettable.
      </p>

      {/* Luxury 3D Interactive Gift Box */}
      <div className="my-2 z-10">
        <InteractiveGiftBox onOpen={onGiftOpen} />
      </div>

      {/* Refined Frosted Navigation Actions */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5 max-w-xl z-10">
        <button
          onClick={() => scrollTo('memories')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill hover:bg-white/20 text-white font-sans text-xs sm:text-sm font-medium tracking-wide transition-all active:scale-95 cursor-pointer"
        >
          <ImageIcon className="w-4 h-4 text-cosmic-blush" />
          <span>The Memory Wall</span>
        </button>

        <button
          onClick={() => scrollTo('letters')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill hover:bg-white/20 text-white font-sans text-xs sm:text-sm font-medium tracking-wide transition-all active:scale-95 cursor-pointer"
        >
          <Mail className="w-4 h-4 text-cosmic-blush" />
          <span>Letter for Coco</span>
        </button>

        <button
          onClick={() => scrollTo('cake')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill hover:bg-white/20 text-white font-sans text-xs sm:text-sm font-medium tracking-wide transition-all active:scale-95 cursor-pointer"
        >
          <Cake className="w-4 h-4 text-cosmic-gold" />
          <span>Make a Wish</span>
        </button>
      </div>
    </section>
  );
}
