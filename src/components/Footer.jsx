import React from 'react';
import { birthdayData } from '../config/birthdayData';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 px-4 text-center border-t border-blush-200/60 bg-white/40 backdrop-blur-sm relative">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-center gap-1.5 text-blush-500">
          <Sparkles className="w-4 h-4 text-sparkle" />
          <Heart className="w-5 h-5 fill-blush-500 animate-pulse" />
          <Sparkles className="w-4 h-4 text-sparkle" />
        </div>

        <p className="font-heading text-lg font-bold text-charcoal">
          Made with infinite love, laughter & endless teasing for {birthdayData.bestieName} 💖
        </p>

        <p className="font-body text-xs text-charcoal/60 leading-relaxed max-w-sm mx-auto">
          "Friendship isn't about who you've known the longest. It's about who walked into your life, said 'I'm here for you', and proved it."
        </p>

        <div className="pt-2">
          <button
            onClick={scrollToTop}
            className="text-xs font-heading font-semibold text-blush-600 hover:text-blush-700 underline decoration-blush-300 underline-offset-4 cursor-pointer"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
