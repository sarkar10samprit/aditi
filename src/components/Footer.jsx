import React from 'react';
import { birthdayData } from '../config/birthdayData';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-6 pb-12 px-4 text-center relative">
      <div className="max-w-xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2 text-cosmic-champagne">
          <Sparkles className="w-4 h-4 text-cosmic-gold" />
          <Heart className="w-5 h-5 fill-cosmic-rose text-cosmic-rose animate-pulse" />
          <Sparkles className="w-4 h-4 text-cosmic-gold" />
        </div>

        <div className="space-y-2">
          <p className="font-sans text-xl sm:text-2xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cosmic-champagne via-cosmic-blush to-white drop-shadow-sm">
            From your loving and caring meowww 🐾
          </p>
          <p className="font-sans text-sm sm:text-base text-white/90 font-light leading-relaxed max-w-md mx-auto drop-shadow-sm">
            Again wishing you happiest birthdayyy to my beloved Coco ✨
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={scrollToTop}
            className="text-xs font-sans font-semibold text-cosmic-champagne/80 hover:text-white uppercase tracking-widest underline decoration-cosmic-champagne/40 underline-offset-4 cursor-pointer transition-colors"
          >
            Return to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
