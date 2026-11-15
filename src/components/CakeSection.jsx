import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';
import { playChime, playPop } from '../utils/soundEffects';

export default function CakeSection() {
  const [isBlown, setIsBlown] = useState(false);
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [flameFrame, setFlameFrame] = useState(0);
  const [isCut, setIsCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // 8-bit Flame animation cycle (flickers every 180ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setFlameFrame((prev) => (prev === 0 ? 1 : 0));
    }, 180);
    return () => clearInterval(timer);
  }, []);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Zero-lag, 60fps GPU-accelerated full-screen rising emoji celebration
  const startEmojiStorm = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Viewport dimensions with capped DPR for smooth rendering on tablets and mobile
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Festive emoji collection
    const emojis = ['💖', '🎂', '✨', '💕', '🌸', '🍰', '🥳', '🧁', '🎀', '💫', '🧸', '💝', '🎉', '🌟'];

    // Pre-rasterize emojis onto offscreen canvases once (zero text rasterization during flight)
    const spriteCache = emojis.map((emoji) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 72;
      offscreen.height = 72;
      const octx = offscreen.getContext('2d');
      octx.font = '52px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillText(emoji, 36, 38);
      return offscreen;
    });

    // High density across entire screen: 85 emojis on phones, 140 on tablets/desktop
    const particleCount = width < 640 ? 85 : 140;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const sprite = spriteCache[Math.floor(Math.random() * spriteCache.length)];
      const size = 26 + Math.random() * 26; // 26px to 52px
      const baseX = Math.random() * width;
      const delaySec = Math.random() * 2.2; // Staggered rising entry over 2.2s
      const speedY = 2.0 + Math.random() * 2.5; // Upward velocity
      const swayAmp = 18 + Math.random() * 32; // Horizontal floating drift
      const swayFreq = 0.002 + Math.random() * 0.003;
      const phase = Math.random() * Math.PI * 2;
      const opacity = 0.88 + Math.random() * 0.12;

      particles.push({
        sprite,
        size,
        baseX,
        x: baseX,
        y: height + 20 + delaySec * speedY * 60,
        speedY,
        swayAmp,
        swayFreq,
        phase,
        opacity,
      });
    }

    const render = (now) => {
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speedY;
        p.x = p.baseX + Math.sin(now * p.swayFreq + p.phase) * p.swayAmp;

        if (p.y > -p.size && p.y < height + 80) {
          activeCount++;

          // Smooth fade-out near top of viewport
          let alpha = p.opacity;
          if (p.y < 120) {
            alpha = Math.max(0, (p.y + p.size) / (120 + p.size) * p.opacity);
          }

          ctx.globalAlpha = alpha;
          ctx.drawImage(p.sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else if (p.y >= height + 80) {
          // Waiting to emerge from bottom
          activeCount++;
        }
      }

      ctx.globalAlpha = 1;

      if (activeCount > 0) {
        animFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(render);

    // Celebratory confetti burst from the cake
    try {
      confetti({
        particleCount: 45,
        spread: 90,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.75 },
        colors: ['#F472B6', '#FB7185', '#FDE047', '#FFFFFF', '#D64E7E'],
        ticks: 200,
      });
    } catch (e) {}
  };

  const handleBlowCandles = () => {
    if (isBlown) return;
    playChime();
    setIsBlown(true);
    setCandles([false, false, false, false, false]);
    startEmojiStorm();
  };

  const handleCutCake = () => {
    playPop();
    playChime();
    setIsCutting(true);

    setTimeout(() => {
      setIsCut(true);
      setIsCutting(false);
    }, 450);

    confetti({
      particleCount: 35,
      spread: 75,
      origin: { y: 0.65 },
      colors: ['#F472B6', '#FB7185', '#FDE047', '#FFFFFF', '#D64E7E'],
      ticks: 160,
    });
  };

  // 5 candle X positions on a 32x32 chunky pixel grid
  const candlePositions = [7, 11, 15, 19, 23];

  return (
    <section id="cake" className="py-14 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto text-center relative">
      {/* Zero-Lag GPU-Accelerated Floating Emoji Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Header */}
      <div className="mb-6 relative z-10">
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-2">
          It's cake time !!!🥳🥳
        </h2>
      </div>

      {/* Ultra-Chunky 32x32 Retro Pixel Art Cake & Sassy Knife Cat */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-12 my-6 z-10">
        {/* Ultra-Chunky 32x32 Retro Pixel Art Cake */}
        <div 
          onClick={!isBlown ? handleBlowCandles : undefined}
          className="relative cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95"
          title={!isBlown ? "Click to blow out the chunky pixel candles!" : (isCut ? "A slice has been cut for Coco!" : "Candles extinguished!")}
        >
          {/* Scalable 32x32 Chunky Pixel Grid SVG */}
          <svg
            viewBox="0 0 32 32"
            className="w-64 h-64 sm:w-80 sm:h-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] overflow-visible"
            style={{
              imageRendering: 'pixelated',
              shapeRendering: 'crispEdges',
            }}
          >
            {/* Ambient Base Shadow */}
            <rect x="2" y="31" width="28" height="1" fill="rgba(0,0,0,0.3)" />

            {/* --- PEDESTAL & PLATE (Chunky 32x32) --- */}
            <rect x="9" y="30" width="14" height="1" fill="#1C0612" />
            <rect x="10" y="29" width="12" height="1" fill="#CBD5E1" />
            <rect x="11" y="29" width="10" height="1" fill="#FFFFFF" />

            <rect x="14" y="27" width="4" height="2" fill="#1C0612" />
            <rect x="15" y="27" width="2" height="2" fill="#94A3B8" />

            <rect x="2" y="25" width={isCut ? "30" : "28"} height="2" fill="#1C0612" />
            <rect x="3" y="25" width={isCut ? "28" : "26"} height="1" fill="#FFFFFF" />
            <rect x="3" y="26" width={isCut ? "28" : "26"} height="1" fill="#CBD5E1" />

            {/* --- MAIN BASE CAKE BODY (Left / Center section) --- */}
            {/* Bottom Tier Base */}
            <rect x="3" y="17" width="18" height="8" fill="#1C0612" />
            <rect x="4" y="18" width="17" height="7" fill="#F472B6" />
            <rect x="4" y="22" width="17" height="1" fill="#FDE047" />

            {/* Bottom Tier Frosting */}
            <rect x="4" y="18" width="17" height="2" fill="#FFFFFF" />
            <rect x="5" y="20" width="2" height="2" fill="#FFFFFF" />
            <rect x="9" y="20" width="2" height="1" fill="#FFFFFF" />
            <rect x="13" y="20" width="2" height="2" fill="#FFFFFF" />
            <rect x="17" y="20" width="2" height="1" fill="#FFFFFF" />

            {/* Pixel Hearts on Base Bottom Tier */}
            <rect x="7" y="23" width="1" height="1" fill="#BE185D" />
            <rect x="9" y="23" width="1" height="1" fill="#BE185D" />
            <rect x="7" y="24" width="3" height="1" fill="#BE185D" />
            <rect x="8" y="25" width="1" height="1" fill="#BE185D" />

            <rect x="15" y="23" width="1" height="1" fill="#BE185D" />
            <rect x="17" y="23" width="1" height="1" fill="#BE185D" />
            <rect x="15" y="24" width="3" height="1" fill="#BE185D" />
            <rect x="16" y="25" width="1" height="1" fill="#BE185D" />

            {/* Top Tier Base */}
            <rect x="6" y="10" width="14" height="7" fill="#1C0612" />
            <rect x="7" y="11" width="13" height="6" fill="#FB7185" />
            <rect x="7" y="14" width="13" height="1" fill="#BE185D" />

            {/* Top Tier Frosting */}
            <rect x="7" y="11" width="13" height="2" fill="#FFFFFF" />
            <rect x="8" y="13" width="2" height="2" fill="#FFFFFF" />
            <rect x="13" y="13" width="2" height="2" fill="#FFFFFF" />
            <rect x="18" y="13" width="2" height="2" fill="#FFFFFF" />

            {/* Strawberries 1 & 2 */}
            <rect x="9" y="9" width="2" height="2" fill="#E11D48" />
            <rect x="10" y="8" width="1" height="1" fill="#22C55E" />
            <rect x="10" y="9" width="1" height="1" fill="#FFFFFF" />

            <rect x="15" y="9" width="2" height="2" fill="#E11D48" />
            <rect x="16" y="8" width="1" height="1" fill="#22C55E" />
            <rect x="16" y="9" width="1" height="1" fill="#FFFFFF" />

            {/* Exposed Cut Crumb Layers when sliced */}
            {isCut && (
              <g>
                {/* Exposed Cut Line Top Tier */}
                <rect x="20" y="10" width="1" height="7" fill="#1C0612" />
                <rect x="20" y="11" width="1" height="2" fill="#FDE047" />
                <rect x="20" y="13" width="1" height="1" fill="#FFFFFF" />
                <rect x="20" y="14" width="1" height="1" fill="#BE185D" />
                <rect x="20" y="15" width="1" height="2" fill="#FDE047" />

                {/* Exposed Cut Line Bottom Tier */}
                <rect x="21" y="17" width="1" height="8" fill="#1C0612" />
                <rect x="21" y="18" width="1" height="2" fill="#FDE047" />
                <rect x="21" y="20" width="1" height="1" fill="#FFFFFF" />
                <rect x="21" y="21" width="1" height="1" fill="#BE185D" />
                <rect x="21" y="22" width="1" height="3" fill="#FDE047" />
              </g>
            )}

            {/* --- SEPARABLE / SLICED PIECE --- */}
            <g
              style={{
                transform: isCut ? 'translate(4.5px, -1px)' : 'none',
                transition: 'transform 0.5s cubic-bezier(0.34, 1.35, 0.64, 1)',
              }}
            >
              {/* Exposed cut face on the slice itself */}
              {isCut && (
                <g>
                  <rect x="20" y="10" width="1" height="7" fill="#1C0612" />
                  <rect x="21" y="17" width="1" height="8" fill="#1C0612" />
                </g>
              )}

              {/* Bottom Tier Slice */}
              <rect x="21" y="17" width="8" height="8" fill="#1C0612" />
              <rect x="21" y="18" width="7" height="7" fill="#F472B6" />
              <rect x="21" y="22" width="7" height="1" fill="#FDE047" />
              <rect x="26" y="18" width="2" height="7" fill="#DB2777" />

              {/* Bottom Frosting */}
              <rect x="21" y="18" width="7" height="2" fill="#FFFFFF" />
              <rect x="21" y="20" width="2" height="2" fill="#FFFFFF" />
              <rect x="25" y="20" width="2" height="1" fill="#FFFFFF" />

              {/* Heart 3 on Slice */}
              <rect x="23" y="23" width="1" height="1" fill="#BE185D" />
              <rect x="25" y="23" width="1" height="1" fill="#BE185D" />
              <rect x="23" y="24" width="3" height="1" fill="#BE185D" />
              <rect x="24" y="25" width="1" height="1" fill="#BE185D" />

              {/* Top Tier Slice */}
              <rect x="20" y="10" width="6" height="7" fill="#1C0612" />
              <rect x="20" y="11" width="5" height="6" fill="#FB7185" />
              <rect x="20" y="14" width="5" height="1" fill="#BE185D" />
              <rect x="23" y="11" width="2" height="6" fill="#E11D48" />

              {/* Top Frosting on Slice */}
              <rect x="20" y="11" width="5" height="2" fill="#FFFFFF" />
              <rect x="22" y="13" width="2" height="1" fill="#FFFFFF" />

              {/* Strawberry 3 on Slice */}
              <rect x="21" y="9" width="2" height="2" fill="#E11D48" />
              <rect x="22" y="8" width="1" height="1" fill="#22C55E" />
              <rect x="22" y="9" width="1" height="1" fill="#FFFFFF" />

              {/* Candle 5 on Slice */}
              <g>
                <rect x="23" y="5" width="2" height="5" fill="#1C0612" />
                <rect x="23" y="5" width="1" height="4" fill="#F472B6" />
                <rect x="24" y="5" width="1" height="4" fill="#FFFFFF" />
                <rect x="23" y="4" width="1" height="1" fill="#271406" />

                {candles[4] ? (
                  flameFrame === 0 ? (
                    <g>
                      <rect x="22" y="1" width="3" height="3" fill="#F97316" />
                      <rect x="23" y="1" width="1" height="2" fill="#FDE047" />
                      <rect x="23" y="2" width="1" height="1" fill="#FFFFFF" />
                    </g>
                  ) : (
                    <g>
                      <rect x="22" y="2" width="3" height="2" fill="#F97316" />
                      <rect x="23" y="1" width="1" height="2" fill="#FDE047" />
                      <rect x="23" y="2" width="1" height="1" fill="#FFFFFF" />
                    </g>
                  )
                ) : (
                  <g>
                    <rect x="23" y="3" width="1" height="1" fill="#94A3B8" />
                    <rect x="22" y="1" width="2" height="1" fill="#CBD5E1" />
                  </g>
                )}
              </g>
            </g>

            {/* --- CANDLES 1 through 4 (On Main Cake Body) --- */}
            {candlePositions.slice(0, 4).map((cx, idx) => {
              const isLit = candles[idx];
              return (
                <g key={idx}>
                  <rect x={cx} y="5" width="2" height="5" fill="#1C0612" />
                  <rect x={cx} y="5" width="1" height="4" fill={idx % 2 === 0 ? '#F472B6' : '#C084FC'} />
                  <rect x={cx + 1} y="5" width="1" height="4" fill="#FFFFFF" />
                  <rect x={cx} y="4" width="1" height="1" fill="#271406" />

                  {isLit ? (
                    flameFrame === 0 ? (
                      <g>
                        <rect x={cx - 1} y="1" width="3" height="3" fill="#F97316" />
                        <rect x={cx} y="1" width="1" height="2" fill="#FDE047" />
                        <rect x={cx} y="2" width="1" height="1" fill="#FFFFFF" />
                      </g>
                    ) : (
                      <g>
                        <rect x={cx - 1} y="2" width="3" height="2" fill="#F97316" />
                        <rect x={cx} y="1" width="1" height="2" fill="#FDE047" />
                        <rect x={cx} y="2" width="1" height="1" fill="#FFFFFF" />
                      </g>
                    )
                  ) : (
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

        {/* --- SASSY KNIFE CAT (Appears after blowing out candles) --- */}
        <AnimatePresence>
          {isBlown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
              className="relative flex flex-col items-center select-none"
            >
              {/* Sassy Floating Speech Bubble */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                className="mb-2 px-4 py-1.5 rounded-full bg-white text-neutral-900 font-sans text-xs font-bold shadow-xl border border-cosmic-rose/40 flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{isCut ? "A slice just for Coco! 🍰💖" : "Ready to slice the cake! 🎀🔪"}</span>
              </motion.div>

              {/* Cat Image with Knife Slice Animation */}
              <motion.div
                animate={
                  isCutting
                    ? { rotate: [-16, 22, -10, 14, 0], scale: [1, 1.12, 1] }
                    : { rotate: [-2, 2, -2] }
                }
                transition={
                  isCutting
                    ? { duration: 0.45, ease: 'easeInOut' }
                    : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }
                }
                onClick={handleCutCake}
                className="w-40 sm:w-52 h-auto cursor-pointer group"
                title="Click to cut a slice of cake for Coco!"
              >
                <img
                  src={`${import.meta.env.BASE_URL}knife_cat.png`}
                  alt="Sassy Kitten with Pink Knife"
                  className="w-full h-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)] group-hover:scale-105 transition-transform"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Button Section */}
      <div className="relative z-10 flex flex-col items-center gap-4 mt-6">
        {!isBlown ? (
          <button
            onClick={handleBlowCandles}
            className="px-8 py-3.5 bg-gradient-to-r from-cosmic-rose to-cosmic-deep text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            [ BLOW OUT CANDLES ]
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {!isCut && (
              <button
                onClick={handleCutCake}
                className="luxury-button px-8 py-3 rounded-full text-white font-sans text-sm font-semibold tracking-wide shadow-lg hover:shadow-glow-rose transition-all cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <span>Cut a Slice</span>
              </button>
            )}

            {isCut && (
              <div className="px-6 py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-cosmic-champagne font-sans text-sm tracking-wide shadow-lg">
                ✨ The first slice is served to Coco! Slay your birthday! 🍰💖
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}