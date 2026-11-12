import React from 'react';
import { birthdayData } from '../config/birthdayData';
import { Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 px-4 text-center border-t border-white/10 bg-black/30 backdrop-blur-md relative">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-center gap-2 text-cosmic-champagne">
          <Sparkles className="w-4 h-4 text-cosmic-gold" />
          <Heart className="w-5 h-5 fill-cosmic-rose text-cosmic-rose animate-pulse" />
          <Sparkles className="w-4 h-4 text-cosmic-gold" />
        </div>

        <p className="font-serif text-2xl font-normal text-white">
          Dedicated to {birthdayData.bestieName}
        </p>

        <p className="font-sans text-xs text-white/70 leading-relaxed max-w-sm mx-auto font-light">
          "Some people make the world more special just by being in it."
        </p>

        <div className="pt-3">
          <button
            onClick={scrollToTop}
            className="text-xs font-sans font-semibold text-cosmic-champagne hover:text-white uppercase tracking-widest underline decoration-cosmic-champagne/40 underline-offset-4 cursor-pointer"
          >
            Return to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
