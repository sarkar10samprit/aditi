import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Flame, Sparkles, RotateCcw, Heart, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CakeSection() {
  const [isBlown, setIsBlown] = useState(false);
  const [candles, setCandles] = useState([true, true, true, true, true]);

  const playFanfare = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const freqs = [392, 523.25, 659.25, 783.99, 1046.5]; // G, C, E, G, C (fanfare)
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

    // High intensity celebration fireworks confetti
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#FF9EAA', '#FFD166', '#E8D5FF', '#FFCCD5', '#98FF98'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
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
    <section id="cake" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center relative">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sparkle/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sparkle/20 text-charcoal font-heading text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sparkle" />
          <span>Interactive Virtual Cake</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-charcoal mb-4">
          {birthdayData.cakeSection.title}
        </h2>
        <p className="font-body text-charcoal/75 text-base sm:text-lg max-w-xl mx-auto">
          {birthdayData.cakeSection.instructions}
        </p>
      </div>

      {/* Visual Cake Graphic */}
      <div className="relative inline-flex flex-col items-center justify-center my-8 z-10">
        {/* 5 Birthday Candles */}
        <div className="flex justify-center items-end gap-6 sm:gap-8 mb-[-4px] z-20">
          {candles.map((isLit, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Flame or Smoke */}
              <div className="h-8 flex items-center justify-center">
                {isLit ? (
                  <div className="relative cursor-pointer group" onClick={handleBlowCandles}>
                    <div className="w-4 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-white rounded-full animate-pulse shadow-glow-gold filter drop-shadow-md" />
                    <div className="absolute inset-0 w-4 h-6 bg-yellow-400 rounded-full blur-xs opacity-75 animate-wiggle" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="w-1 h-3 bg-charcoal/40 rounded-full animate-bounce" />
                    <span className="text-[10px] text-charcoal/50 font-mono">💨</span>
                  </div>
                )}
              </div>
              {/* Candle Wick */}
              <div className="w-0.5 h-2 bg-charcoal/70" />
              {/* Candle Body */}
              <div
                className={`w-3.5 sm:w-4 h-12 sm:h-14 rounded-t-sm shadow-md border-x border-t ${
                  index % 2 === 0
                    ? 'bg-gradient-to-b from-blush-200 to-blush-400 border-blush-300'
                    : 'bg-gradient-to-b from-lavender-200 to-lavender-400 border-lavender-300'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Cake Layer 1 (Top Tier) */}
        <div className="w-56 sm:w-64 h-14 bg-gradient-to-r from-blush-100 via-white to-blush-100 rounded-t-3xl border-2 border-blush-200 shadow-md relative overflow-hidden flex items-center justify-around px-4">
          <span className="text-sm">🍓</span>
          <span className="text-sm">✨</span>
          <span className="text-sm">🍒</span>
          <span className="text-sm">✨</span>
          <span className="text-sm">🍓</span>
        </div>

        {/* Frosting Drips */}
        <div className="w-56 sm:w-64 h-3 bg-blush-200 rounded-full -mt-1 z-10 shadow-xs" />

        {/* Cake Layer 2 (Bottom Tier) */}
        <div className="w-72 sm:w-80 h-20 bg-gradient-to-r from-buttercream via-[#FFF2F4] to-buttercream rounded-t-2xl border-2 border-blush-200 shadow-lg relative flex items-center justify-around px-6">
          <div className="w-full flex items-center justify-around text-blush-400/80">
            <Heart className="w-4 h-4 fill-blush-300 text-blush-300" />
            <Sparkles className="w-4 h-4 text-sparkle" />
            <Heart className="w-4 h-4 fill-blush-300 text-blush-300" />
            <Sparkles className="w-4 h-4 text-sparkle" />
            <Heart className="w-4 h-4 fill-blush-300 text-blush-300" />
          </div>
        </div>

        {/* Cake Plate Stand */}
        <div className="w-80 sm:w-96 h-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full shadow-lg border border-gray-300" />
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 flex flex-col items-center gap-4 mt-6">
        {!isBlown ? (
          <button
            onClick={handleBlowCandles}
            className="clay-button px-8 py-3.5 rounded-full text-white font-heading text-base font-bold flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-transform"
          >
            <Flame className="w-5 h-5 text-yellow-200 fill-yellow-200" />
            <span>Blow Out The Candles! 🎂</span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="p-5 rounded-2xl bg-white/95 border-2 border-blush-300 shadow-xl max-w-md animate-pulse-soft">
              <div className="flex items-center justify-center gap-2 text-blush-600 font-heading font-bold text-lg mb-1">
                <Sparkles className="w-5 h-5 text-sparkle" />
                <span>Wish Dispatched to the Stars! ✨</span>
              </div>
              <p className="font-body text-charcoal/80 text-sm">
                {birthdayData.cakeSection.blownSuccessMessage}
              </p>
            </div>

            <button
              onClick={handleRelight}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 border border-charcoal/10 text-charcoal/70 hover:text-blush-600 font-heading text-xs font-semibold shadow-xs hover:shadow-sm transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Relight Candles (Make Another Wish)</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
