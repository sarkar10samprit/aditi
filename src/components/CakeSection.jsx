import React, { useState, useEffect } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Sparkles, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CakeSection() {
  const [isBlown, setIsBlown] = useState(false);
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [flameFrame, setFlameFrame] = useState(0);

  // 8-bit Flame animation cycle (flickers every 180ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setFlameFrame((prev) => (prev === 0 ? 1 : 0));
    }, 180);
    return () => clearInterval(timer);
  }, []);

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

  const candlePositions = [18, 24, 31, 38, 45];

  return (
    <section id="cake" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center relative">
      <div className="mb-10 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
          <span>Pixel Birthday Ritual</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-4">
          Make a Secret Wish, Coco
        </h2>
        <p className="font-sans text-white/80 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
          Close your eyes, make your wish, and click the pixel cake to blow out the candles.
        </p>
      </div>

      {/* Retro Pixel Art Cake Container */}
      <div className="relative inline-flex flex-col items-center justify-center my-6 z-10">
        <div 
          onClick={handleBlowCandles}
          className="relative cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95"
          title="Click to blow out the pixel candles!"
        >
          {/* Scalable Pure Pixel Art SVG */}
          <svg
            viewBox="0 0 64 64"
            className="w-64 h-64 sm:w-80 sm:h-80 drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
            style={{
              imageRendering: 'pixelated',
              shapeRendering: 'crispEdges',
            }}
          >
            {/* Outline & Drop Shadow on Plate */}
            <rect x="2" y="58" width="60" height="2" fill="rgba(0,0,0,0.25)" />

            {/* --- CAKE STAND / PEDESTAL --- */}
            {/* Plate Base */}
            <rect x="20" y="56" width="24" height="2" fill="#2E101D" />
            <rect x="21" y="55" width="22" height="2" fill="#E2E8F0" />
            <rect x="22" y="55" width="20" height="1" fill="#FFFFFF" />

            {/* Pedestal Stem */}
            <rect x="28" y="51" width="8" height="5" fill="#2E101D" />
            <rect x="29" y="51" width="6" height="5" fill="#CBD5E1" />
            <rect x="30" y="51" width="2" height="5" fill="#FFFFFF" />

            {/* Plate Top Rim */}
            <rect x="4" y="49" width="56" height="3" fill="#2E101D" />
            <rect x="5" y="48" width="54" height="3" fill="#E2E8F0" />
            <rect x="6" y="48" width="52" height="1" fill="#FFFFFF" />
            <rect x="6" y="50" width="52" height="1" fill="#94A3B8" />

            {/* --- BOTTOM TIER --- */}
            {/* Outline */}
            <rect x="7" y="34" width="50" height="15" fill="#2E101D" />
            {/* Sponge Body */}
            <rect x="8" y="35" width="48" height="13" fill="#F472B6" />
            {/* Cream Layer */}
            <rect x="8" y="42" width="48" height="2" fill="#FEF08A" />
            <rect x="8" y="43" width="48" height="1" fill="#FDE047" />
            {/* Shadow side */}
            <rect x="50" y="35" width="6" height="13" fill="#DB2777" />

            {/* Bottom Frosting & Drips */}
            <rect x="8" y="35" width="48" height="3" fill="#FFF0F5" />
            <rect x="10" y="38" width="3" height="3" fill="#FFF0F5" />
            <rect x="17" y="38" width="2" height="4" fill="#FFF0F5" />
            <rect x="23" y="38" width="3" height="2" fill="#FFF0F5" />
            <rect x="30" y="38" width="3" height="4" fill="#FFF0F5" />
            <rect x="37" y="38" width="2" height="3" fill="#FFF0F5" />
            <rect x="43" y="38" width="3" height="4" fill="#FFF0F5" />
            <rect x="49" y="38" width="3" height="2" fill="#FFF0F5" />

            {/* Decorative Pixel Hearts on Bottom Tier */}
            {/* Heart 1 */}
            <rect x="15" y="44" width="1" height="1" fill="#BE185D" />
            <rect x="17" y="44" width="1" height="1" fill="#BE185D" />
            <rect x="15" y="45" width="3" height="1" fill="#BE185D" />
            <rect x="16" y="46" width="1" height="1" fill="#BE185D" />

            {/* Heart 2 (Center) */}
            <rect x="31" y="44" width="1" height="1" fill="#BE185D" />
            <rect x="33" y="44" width="1" height="1" fill="#BE185D" />
            <rect x="31" y="45" width="3" height="1" fill="#BE185D" />
            <rect x="32" y="46" width="1" height="1" fill="#BE185D" />

            {/* Heart 3 */}
            <rect x="47" y="44" width="1" height="1" fill="#BE185D" />
            <rect x="49" y="44" width="1" height="1" fill="#BE185D" />
            <rect x="47" y="45" width="3" height="1" fill="#BE185D" />
            <rect x="48" y="46" width="1" height="1" fill="#BE185D" />

            {/* --- TOP TIER --- */}
            {/* Outline */}
            <rect x="14" y="21" width="36" height="14" fill="#2E101D" />
            {/* Sponge Body */}
            <rect x="15" y="22" width="34" height="12" fill="#FB7185" />
            {/* Jam Filling */}
            <rect x="15" y="28" width="34" height="2" fill="#BE185D" />
            {/* Shadow side */}
            <rect x="44" y="22" width="5" height="12" fill="#E11D48" />

            {/* Top White Icing & Drips */}
            <rect x="15" y="22" width="34" height="3" fill="#FFFFFF" />
            <rect x="17" y="25" width="2" height="3" fill="#FFFFFF" />
            <rect x="23" y="25" width="3" height="2" fill="#FFFFFF" />
            <rect x="30" y="25" width="2" height="4" fill="#FFFFFF" />
            <rect x="36" y="25" width="3" height="2" fill="#FFFFFF" />
            <rect x="42" y="25" width="2" height="3" fill="#FFFFFF" />

            {/* Top Pixel Strawberries */}
            {/* Berry 1 */}
            <rect x="18" y="19" width="3" height="3" fill="#E11D48" />
            <rect x="19" y="18" width="1" height="1" fill="#22C55E" />
            <rect x="19" y="20" width="1" height="1" fill="#FFFFFF" />

            {/* Berry 2 (Center) */}
            <rect x="31" y="19" width="3" height="3" fill="#E11D48" />
            <rect x="32" y="18" width="1" height="1" fill="#22C55E" />
            <rect x="32" y="20" width="1" height="1" fill="#FFFFFF" />

            {/* Berry 3 */}
            <rect x="44" y="19" width="3" height="3" fill="#E11D48" />
            <rect x="45" y="18" width="1" height="1" fill="#22C55E" />
            <rect x="45" y="20" width="1" height="1" fill="#FFFFFF" />

            {/* --- PIXEL CANDLES & FLAMES --- */}
            {candlePositions.map((cx, idx) => {
              const isLit = candles[idx];
              return (
                <g key={idx}>
                  {/* Candle Outline & Body */}
                  <rect x={cx - 1} y="14" width="4" height="8" fill="#2E101D" />
                  <rect x={cx} y="14" width="2" height="7" fill={idx % 2 === 0 ? '#F472B6' : '#C084FC'} />
                  <rect x={cx} y="16" width="2" height="1" fill="#FFFFFF" />
                  <rect x={cx} y="19" width="2" height="1" fill="#FFFFFF" />

                  {/* Candle Wick */}
                  <rect x={cx} y="12" width="1" height="2" fill="#271406" />

                  {/* Flame or Pixel Smoke */}
                  {isLit ? (
                    flameFrame === 0 ? (
                      /* Flame Frame 0 */
                      <g>
                        <rect x={cx - 1} y="6" width="3" height="6" fill="#F97316" />
                        <rect x={cx} y="7" width="1" height="4" fill="#FDE047" />
                        <rect x={cx} y="8" width="1" height="1" fill="#FFFFFF" />
                        <rect x={cx} y="4" width="1" height="1" fill="#FDE047" />
                      </g>
                    ) : (
                      /* Flame Frame 1 */
                      <g>
                        <rect x={cx - 1} y="7" width="3" height="5" fill="#F97316" />
                        <rect x={cx} y="8" width="1" height="3" fill="#FDE047" />
                        <rect x={cx} y="9" width="1" height="1" fill="#FFFFFF" />
                        <rect x={cx + 1} y="5" width="1" height="1" fill="#FDE047" />
                      </g>
                    )
                  ) : (
                    /* Pixel Smoke Puff when blown */
                    <g>
                      <rect x={cx - 1} y="9" width="2" height="2" fill="#94A3B8" />
                      <rect x={cx} y="6" width="2" height="2" fill="#CBD5E1" />
                      <rect x={cx - 1} y="3" width="1" height="2" fill="#E2E8F0" />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Retro Pixel Tag Underneath */}
        <p className="text-[11px] font-mono tracking-widest text-cosmic-champagne/90 uppercase mt-2">
          {isBlown ? "★ Candles Blown Out ★" : "✦ 8-Bit Birthday Cake • Tap to Blow ✦"}
        </p>
      </div>

      {/* Retro 8-bit Action Button */}
      <div className="relative z-10 flex flex-col items-center gap-4 mt-6">
        {!isBlown ? (
          <button
            onClick={handleBlowCandles}
            className="px-8 py-3.5 bg-gradient-to-r from-cosmic-rose to-cosmic-deep text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            [ BLOW OUT CANDLES ]
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="p-6 rounded-2xl glass-panel border border-white/30 max-w-md shadow-2xl animate-pulse-subtle">
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
              className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold tracking-widest uppercase border-2 border-white/40 rounded-lg transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>[ RELIGHT PIXEL CAKE ]</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
