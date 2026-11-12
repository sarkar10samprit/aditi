import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Flame, Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CakeSection() {
  const [isBlown, setIsBlown] = useState(false);
  const [candles, setCandles] = useState([true, true, true, true, true]);

  const playFanfare = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const freqs = [392, 523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.8);
      });
    } catch (e) {
      // Audio fallback
    }
  };

  const handleBlowCandles = () => {
    if (isBlown) return;
    setIsBlown(true);
    setCandles([false, false, false, false, false]);

    playFanfare();

    const end = Date.now() + 2.5 * 1000;
    const colors = ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E', '#FEF3C7'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const handleRelight = () => {
    setIsBlown(false);
    setCandles([true, true, true, true, true]);
  };

  return (
    <section id="cake" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center relative">
      <div className="mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
          <span>Interactive Wish Ritual</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-4">
          Make a Secret Birthday Wish
        </h2>
        <p className="font-sans text-white/80 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
          Close your eyes, think of the one dream that makes your heart race, and blow out the candles.
        </p>
      </div>

      {/* Visual Cake with atmospheric styling */}
      <div className="relative inline-flex flex-col items-center justify-center my-8 z-10">
        {/* Candles */}
        <div className="flex justify-center items-end gap-6 sm:gap-9 mb-[-4px] z-20">
          {candles.map((isLit, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-8 flex items-center justify-center">
                {isLit ? (
                  <div className="relative cursor-pointer group" onClick={handleBlowCandles}>
                    <div className="w-3.5 h-6 bg-gradient-to-t from-orange-400 via-amber-200 to-white rounded-full animate-pulse shadow-glow-gold filter drop-shadow-md" />
                    <div className="absolute inset-0 w-3.5 h-6 bg-amber-300 rounded-full blur-2xs opacity-80 animate-wiggle" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="w-1 h-3 bg-white/40 rounded-full animate-bounce" />
                    <span className="text-[10px] text-white/60 font-mono">✨</span>
                  </div>
                )}
              </div>
              <div className="w-0.5 h-2 bg-neutral-400" />
              <div
                className={`w-3.5 sm:w-4 h-12 sm:h-14 rounded-t-sm shadow-md border-x border-t ${
                  index % 2 === 0
                    ? 'bg-gradient-to-b from-cosmic-blush to-cosmic-rose border-white/30'
                    : 'bg-gradient-to-b from-cosmic-champagne to-amber-300 border-white/30'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Top Cake Tier */}
        <div className="w-60 sm:w-72 h-14 bg-gradient-to-r from-[#FFF0F4] via-white to-[#FFF0F4] rounded-t-3xl border border-white/60 shadow-xl relative overflow-hidden flex items-center justify-around px-5 text-neutral-800">
          <span className="text-sm">✨</span>
          <span className="text-sm">🍓</span>
          <span className="text-sm">✨</span>
          <span className="text-sm">🍓</span>
          <span className="text-sm">✨</span>
        </div>

        {/* Frosting accent */}
        <div className="w-60 sm:w-72 h-3 bg-cosmic-blush rounded-full -mt-1 z-10 shadow-xs" />

        {/* Bottom Cake Tier */}
        <div className="w-76 sm:w-88 h-20 bg-gradient-to-r from-cosmic-light via-white to-cosmic-light rounded-t-2xl border border-white/70 shadow-2xl relative flex items-center justify-around px-6">
          <div className="w-full flex items-center justify-around text-cosmic-rose">
            <span className="font-serif italic text-sm tracking-widest text-neutral-700">★ ★ ★ ★ ★</span>
          </div>
        </div>

        {/* Pedestal Stand */}
        <div className="w-84 sm:w-98 h-4 bg-gradient-to-r from-neutral-200 via-white to-neutral-200 rounded-full shadow-2xl border border-white" />
      </div>

      {/* Action */}
      <div className="relative z-10 flex flex-col items-center gap-4 mt-6">
        {!isBlown ? (
          <button
            onClick={handleBlowCandles}
            className="luxury-button px-9 py-3.5 rounded-full text-white font-sans text-xs sm:text-sm font-semibold tracking-widest uppercase flex items-center gap-2.5 cursor-pointer shadow-xl hover:scale-105 active:scale-95 transition-transform"
          >
            <Flame className="w-4 h-4 text-cosmic-champagne fill-cosmic-champagne" />
            <span>Blow Out The Candles</span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 rounded-3xl glass-panel border border-white/30 max-w-md shadow-2xl animate-pulse-subtle">
              <div className="flex items-center justify-center gap-2 text-cosmic-champagne font-serif text-xl sm:text-2xl mb-2">
                <Sparkles className="w-5 h-5 text-cosmic-gold" />
                <span>Wish Dispatched to the Universe</span>
              </div>
              <p className="font-sans text-white/85 text-sm font-light leading-relaxed">
                {birthdayData.cakeSection.blownSuccessMessage}
              </p>
            </div>

            <button
              onClick={handleRelight}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill hover:bg-white/20 text-white/80 hover:text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Make Another Wish</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
