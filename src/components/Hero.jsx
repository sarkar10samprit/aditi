import React from 'react';
import ThreeGiftBox from './ThreeGiftBox';
import { birthdayData } from '../config/birthdayData';
import { Heart, Sparkles, Cake, Image as ImageIcon, Mail, Flame } from 'lucide-react';

export default function Hero({ onGiftOpen }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-20 pb-16 px-4 text-center overflow-hidden">
      {/* Decorative ambient blurred glow spots */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-blush-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-16 right-1/4 w-80 h-80 bg-lavender-200/50 rounded-full blur-3xl pointer-events-none animate-pulse-soft" style={{ animationDelay: '1.5s' }} />

      {/* Floating decorative mini elements */}
      <div className="absolute top-28 left-8 sm:left-24 animate-float-slow hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-blush-100 shadow-sm text-xs text-blush-500 font-heading">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Certified Most Iconic Person</span>
      </div>
      <div className="absolute top-36 right-8 sm:right-28 animate-float-reverse hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-lavender-100 shadow-sm text-xs text-lavender-500 font-heading">
        <Heart className="w-3.5 h-3.5 fill-lavender-300" />
        <span>100% Unconditionally Loved</span>
      </div>

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-blush-200 shadow-sm text-blush-600 font-heading text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 animate-pulse-soft">
        <Sparkles className="w-4 h-4 text-sparkle" />
        <span>{birthdayData.ageMilestone}</span>
        <Sparkles className="w-4 h-4 text-sparkle" />
      </div>

      {/* Main Title */}
      <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-charcoal max-w-4xl leading-[1.15] mb-4">
        Happy Birthday,{' '}
        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blush-500 via-blush-600 to-lavender-500">
          {birthdayData.bestieName}
          <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 100 12" preserveAspectRatio="none">
            <path d="M0,8 Q50,0 100,8" fill="none" stroke="#FFA3B5" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </span>
        ! ✨
      </h1>

      {/* Heartfelt Subtext */}
      <p className="font-body text-base sm:text-xl text-charcoal/80 max-w-2xl font-normal leading-relaxed mb-8">
        {birthdayData.heroGreeting}{' '}
        <span className="italic text-blush-600 font-medium">
          {birthdayData.heroSubtext}
        </span>
      </p>

      {/* 3D Interactive Three.js Gift Box */}
      <div className="my-2 z-10">
        <ThreeGiftBox onOpen={onGiftOpen} />
      </div>

      {/* Quick Navigation Action Pills */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-xl z-10">
        <button
          onClick={() => scrollTo('memories')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-blush-200 text-charcoal hover:text-blush-600 hover:border-blush-300 font-heading text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <ImageIcon className="w-4 h-4 text-blush-400" />
          <span>Memory Polaroids</span>
        </button>

        <button
          onClick={() => scrollTo('letters')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-blush-200 text-charcoal hover:text-blush-600 hover:border-blush-300 font-heading text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Mail className="w-4 h-4 text-blush-400" />
          <span>Love & Flirty Letters</span>
        </button>

        <button
          onClick={() => scrollTo('cake')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 border border-blush-200 text-charcoal hover:text-blush-600 hover:border-blush-300 font-heading text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Cake className="w-4 h-4 text-sparkle" />
          <span>Blow Out Candles</span>
        </button>
      </div>
    </section>
  );
}
