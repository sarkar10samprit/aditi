import React, { useState, useEffect } from 'react';
import { birthdayData } from '../config/birthdayData';


export default function CakeSection() {
  const [isBlown, setIsBlown] = useState(false);
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [flameFrame, setFlameFrame] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // 8-bit Flame animation cycle (flickers every 180ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setFlameFrame((prev) => (prev === 0 ? 1 : 0));
    }, 180);
    return () => clearInterval(timer);
  }, []);

  const spawnFloatingHearts = () => {
    const emojis = ['💖', '💕', '💓', '💗', '❤️', '✨', '🌸', '💝'];
    const count = 45;
    const newHearts = [];

    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: Date.now() + i,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: 8 + Math.random() * 84, // percentage
        bottom: -10 + Math.random() * 30, // px
        size: 20 + Math.random() * 26, // px
        duration: 3 + Math.random() * 2.5, // seconds
        delay: Math.random() * 1.6, // seconds
        sway: -35 + Math.random() * 70, // px horizontal sway
        rot: -25 + Math.random() * 50, // deg rotation
      });
    }

    setFloatingHearts(newHearts);
  };

  const handleBlowCandles = () => {
    if (isBlown) return;
    setIsBlown(true);
    setCandles([false, false, false, false, false]);

    // Sound effect removed as requested (background song continues undisturbed)
    // Flow floating heart emojis instead of confetti
    spawnFloatingHearts();
  };


  // 5 candle X positions on a 32x32 chunky pixel grid
  const candlePositions = [7, 11, 15, 19, 23];

  return (
    <section id="cake" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center relative overflow-hidden">
      {/* Floating Heart Emojis Stream */}
      {floatingHearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart-emoji"
          style={{
            left: `${heart.left}%`,
            bottom: `${heart.bottom}px`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            '--sway': `${heart.sway}px`,
            '--rot': `${heart.rot}deg`,
          }}
        >
          {heart.emoji}
        </span>
      ))}

      {/* Header */}
      <div className="mb-10 relative z-10">
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-4">
          Make a Secret Wish, Coco
        </h2>
        <p className="font-sans text-white/80 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
          Close your eyes, make your wish, and tap the pixel cake to extinguish the candles.
        </p>
      </div>

      {/* Ultra-Chunky 32x32 Retro Pixel Art Cake */}
      <div className="relative inline-flex flex-col items-center justify-center my-6 z-10">
        <div 
          onClick={handleBlowCandles}
          className="relative cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95"
          title="Click to blow out the chunky pixel candles!"
        >
          {/* Scalable 32x32 Chunky Pixel Grid SVG */}
          <svg
            viewBox="0 0 32 32"
            className="w-64 h-64 sm:w-80 sm:h-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
            style={{
              imageRendering: 'pixelated',
              shapeRendering: 'crispEdges',
            }}
          >
            {/* Ambient Base Shadow */}
            <rect x="2" y="31" width="28" height="1" fill="rgba(0,0,0,0.3)" />

            {/* --- PEDESTAL & PLATE (Chunky 32x32) --- */}
            {/* Stand Base */}
            <rect x="9" y="30" width="14" height="1" fill="#1C0612" />
            <rect x="10" y="29" width="12" height="1" fill="#CBD5E1" />
            <rect x="11" y="29" width="10" height="1" fill="#FFFFFF" />

            {/* Stand Stem */}
            <rect x="14" y="27" width="4" height="2" fill="#1C0612" />
            <rect x="15" y="27" width="2" height="2" fill="#94A3B8" />

            {/* Plate Rim */}
            <rect x="2" y="25" width="28" height="2" fill="#1C0612" />
            <rect x="3" y="25" width="26" height="1" fill="#FFFFFF" />
            <rect x="3" y="26" width="26" height="1" fill="#CBD5E1" />

            {/* --- BOTTOM TIER (Chunky Blocks) --- */}
            {/* Outline */}
            <rect x="3" y="17" width="26" height="8" fill="#1C0612" />
            {/* Cake Sponge Body */}
            <rect x="4" y="18" width="24" height="7" fill="#F472B6" />
            {/* Biscuit Cream Layer */}
            <rect x="4" y="22" width="24" height="1" fill="#FDE047" />
            {/* Shading on right edge */}
            <rect x="25" y="18" width="3" height="7" fill="#DB2777" />

            {/* White Frosting & Chunky Drips */}
            <rect x="4" y="18" width="24" height="2" fill="#FFFFFF" />
            <rect x="5" y="20" width="2" height="2" fill="#FFFFFF" />
            <rect x="9" y="20" width="2" height="1" fill="#FFFFFF" />
            <rect x="13" y="20" width="2" height="2" fill="#FFFFFF" />
            <rect x="17" y="20" width="2" height="1" fill="#FFFFFF" />
            <rect x="21" y="20" width="2" height="2" fill="#FFFFFF" />
            <rect x="25" y="20" width="2" height="1" fill="#FFFFFF" />

            {/* Chunky Pixel Hearts on Bottom Tier */}
            {/* Heart 1 */}
            <rect x="7" y="23" width="1" height="1" fill="#BE185D" />
            <rect x="9" y="23" width="1" height="1" fill="#BE185D" />
            <rect x="7" y="24" width="3" height="1" fill="#BE185D" />
            <rect x="8" y="25" width="1" height="1" fill="#BE185D" />

            {/* Heart 2 (Center) */}
            <rect x="15" y="23" width="1" height="1" fill="#BE185D" />
            <rect x="17" y="23" width="1" height="1" fill="#BE185D" />
            <rect x="15" y="24" width="3" height="1" fill="#BE185D" />
            <rect x="16" y="25" width="1" height="1" fill="#BE185D" />

            {/* Heart 3 */}
            <rect x="23" y="23" width="1" height="1" fill="#BE185D" />
            <rect x="25" y="23" width="1" height="1" fill="#BE185D" />
            <rect x="23" y="24" width="3" height="1" fill="#BE185D" />
            <rect x="24" y="25" width="1" height="1" fill="#BE185D" />

            {/* --- TOP TIER (Chunky Blocks) --- */}
            {/* Outline */}
            <rect x="6" y="10" width="20" height="7" fill="#1C0612" />
            {/* Cake Sponge Body */}
            <rect x="7" y="11" width="18" height="6" fill="#FB7185" />
            {/* Jam Filling */}
            <rect x="7" y="14" width="18" height="1" fill="#BE185D" />
            {/* Shading on right edge */}
            <rect x="22" y="11" width="3" height="6" fill="#E11D48" />

            {/* Top White Frosting & Chunky Drips */}
            <rect x="7" y="11" width="18" height="2" fill="#FFFFFF" />
            <rect x="8" y="13" width="2" height="2" fill="#FFFFFF" />
            <rect x="13" y="13" width="2" height="2" fill="#FFFFFF" />
            <rect x="18" y="13" width="2" height="2" fill="#FFFFFF" />
            <rect x="22" y="13" width="2" height="1" fill="#FFFFFF" />

            {/* Chunky Strawberries on Top Tier */}
            {/* Berry 1 */}
            <rect x="9" y="9" width="2" height="2" fill="#E11D48" />
            <rect x="10" y="8" width="1" height="1" fill="#22C55E" />
            <rect x="10" y="9" width="1" height="1" fill="#FFFFFF" />

            {/* Berry 2 */}
            <rect x="15" y="9" width="2" height="2" fill="#E11D48" />
            <rect x="16" y="8" width="1" height="1" fill="#22C55E" />
            <rect x="16" y="9" width="1" height="1" fill="#FFFFFF" />

            {/* Berry 3 */}
            <rect x="21" y="9" width="2" height="2" fill="#E11D48" />
            <rect x="22" y="8" width="1" height="1" fill="#22C55E" />
            <rect x="22" y="9" width="1" height="1" fill="#FFFFFF" />

            {/* --- CHUNKY CANDLES & PIXEL FLAMES --- */}
            {candlePositions.map((cx, idx) => {
              const isLit = candles[idx];
              return (
                <g key={idx}>
                  {/* Candle Outline */}
                  <rect x={cx} y="5" width="2" height="5" fill="#1C0612" />
                  {/* Candle Wax */}
                  <rect x={cx} y="5" width="1" height="4" fill={idx % 2 === 0 ? '#F472B6' : '#C084FC'} />
                  <rect x={cx + 1} y="5" width="1" height="4" fill="#FFFFFF" />

                  {/* Candle Wick */}
                  <rect x={cx} y="4" width="1" height="1" fill="#271406" />

                  {/* Chunky Pixel Flame / Smoke */}
                  {isLit ? (
                    flameFrame === 0 ? (
                      /* Frame 0 */
                      <g>
                        <rect x={cx - 1} y="1" width="3" height="3" fill="#F97316" />
                        <rect x={cx} y="1" width="1" height="2" fill="#FDE047" />
                        <rect x={cx} y="2" width="1" height="1" fill="#FFFFFF" />
                      </g>
                    ) : (
                      /* Frame 1 */
                      <g>
                        <rect x={cx - 1} y="2" width="3" height="2" fill="#F97316" />
                        <rect x={cx} y="1" width="1" height="2" fill="#FDE047" />
                        <rect x={cx} y="2" width="1" height="1" fill="#FFFFFF" />
                      </g>
                    )
                  ) : (
                    /* Chunky Pixel Smoke Puff */
                    <g>
                      <rect x={cx} y="3" width="1" height="1" fill="#94A3B8" />
                      <rect x={cx - 1} y="1" width="2" height="1" fill="#CBD5E1" />
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>


      </div>

      {/* Action Button */}
      {!isBlown && (
        <div className="relative z-10 flex flex-col items-center gap-4 mt-6">
          <button
            onClick={handleBlowCandles}
            className="px-8 py-3.5 bg-gradient-to-r from-cosmic-rose to-cosmic-deep text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            [ BLOW OUT CANDLES ]
          </button>
        </div>
      )}
    </section>
  );
}
