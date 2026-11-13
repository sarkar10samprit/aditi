import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';

export default function CakeSection() {
  const [isBlown, setIsBlown] = useState(false);
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [flameFrame, setFlameFrame] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [isCut, setIsCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);

  // Flame animation flicker cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setFlameFrame((prev) => (prev === 0 ? 1 : 0));
    }, 180);
    return () => clearInterval(timer);
  }, []);

  const spawnFloatingHearts = () => {
    const emojis = ['💖', '💕', '💓', '💗', '❤️', '✨', '🌸', '💝', '🎀', '🍰', '🧁', '⭐', '💫', '🌷', '🤍'];
    const count = 165;
    const newHearts = [];

    for (let i = 0; i < count; i++) {
      newHearts.push({
        id: `${Date.now()}-${i}`,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 98,
        bottom: -40 - Math.random() * 80,
        size: 22 + Math.random() * 32,
        duration: 4.2 + Math.random() * 3.6,
        delay: Math.random() * 2.8,
        sway: -45 + Math.random() * 90,
        rot: -30 + Math.random() * 60,
      });
    }

    setFloatingHearts(newHearts);

    try {
      const heartShape = confetti.shapeFromText({ text: '💖', scalar: 2.2 });
      const starShape = confetti.shapeFromText({ text: '✨', scalar: 2 });
      const flowerShape = confetti.shapeFromText({ text: '🌸', scalar: 2.2 });
      const loveShape = confetti.shapeFromText({ text: '💕', scalar: 2.2 });

      confetti({
        shapes: [heartShape, starShape, flowerShape, loveShape],
        particleCount: 55,
        spread: 140,
        startVelocity: 55,
        origin: { x: 0.5, y: 1 },
        scalar: 2.2,
        ticks: 240,
      });

      setTimeout(() => {
        confetti({
          shapes: [heartShape, loveShape],
          particleCount: 35,
          angle: 65,
          spread: 75,
          startVelocity: 60,
          origin: { x: 0.1, y: 1 },
          scalar: 2.2,
          ticks: 240,
        });
        confetti({
          shapes: [flowerShape, starShape],
          particleCount: 35,
          angle: 115,
          spread: 75,
          startVelocity: 60,
          origin: { x: 0.9, y: 1 },
          scalar: 2.2,
          ticks: 240,
        });
      }, 250);
    } catch (e) {
      // Graceful fallback
    }
  };

  const handleBlowCandles = () => {
    if (isBlown) return;
    setIsBlown(true);
    setCandles([false, false, false, false, false]);
    spawnFloatingHearts();
  };

  const handleCutCake = () => {
    setIsCutting(true);

    setTimeout(() => {
      setIsCut(true);
      setIsCutting(false);
    }, 450);

    confetti({
      particleCount: 85,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#F43F5E', '#FB7185', '#FDE047', '#38BDF8', '#FFFFFF', '#D64E7E', '#FEF3C7'],
    });
  };

  // 4 candles on main cake, 1 candle on the cut slice
  const mainCandles = [
    { x: 130, y: 115, color: '#F472B6' },
    { x: 170, y: 95, color: '#C084FC' },
    { x: 220, y: 90, color: '#F472B6' },
    { x: 270, y: 95, color: '#C084FC' },
  ];

  return (
    <section id="cake" className="py-24 px-4 sm:px-6 max-w-5xl mx-auto text-center relative">
      {/* Full-Screen Floating Emoji Ocean */}
      {floatingHearts.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {floatingHearts.map((heart) => (
            <span
              key={heart.id}
              className="floating-heart-emoji"
              style={{
                left: `${heart.left}vw`,
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
        </div>
      )}

      {/* Header */}
      <div className="mb-10 relative z-10">
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-4">
          Make a Secret Wish, Coco
        </h2>
        <p className="font-sans text-white/80 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
          Close your eyes, make your wish, and tap the cake to extinguish the candles.
        </p>
      </div>

      {/* Interactive 3D Cake & Sassy Knife Cat */}
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 my-4 z-10">
        {/* 3D Isometric Cake SVG with 3D V-Cut Piece */}
        <div 
          onClick={!isBlown ? handleBlowCandles : undefined}
          className="relative cursor-pointer group transition-transform duration-300 hover:scale-105 active:scale-95"
          title={!isBlown ? "Click to blow out the candles!" : (isCut ? "A slice has been cut for Coco!" : "Ready to cut the cake!")}
        >
          <svg
            viewBox="0 0 540 360"
            className="w-[310px] h-[210px] sm:w-[460px] sm:h-[310px] md:w-[520px] md:h-[350px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.65)] overflow-visible select-none"
          >
            <defs>
              {/* Radial gradient for top frosting sheen */}
              <radialGradient id="cakeSheen" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="65%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#F43F5E" />
              </radialGradient>

              {/* Shading gradient for outer cylindrical cake wall */}
              <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="35%" stopColor="#F43F5E" />
                <stop offset="70%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#BE185D" />
              </linearGradient>

              {/* Pedestal porcelain gradient */}
              <linearGradient id="plateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="85%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>

              {/* Sponge cake texture pattern */}
              <pattern id="spongeDots" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.7" fill="#F97316" opacity="0.25" />
                <circle cx="6" cy="5" r="0.8" fill="#D97706" opacity="0.3" />
              </pattern>
            </defs>

            {/* --- 1. PEDESTAL & MAIN PORCELAIN STAND --- */}
            {/* Pedestal Base Shadow */}
            <ellipse cx="220" cy="290" rx="155" ry="40" fill="rgba(0,0,0,0.3)" />

            {/* Pedestal Foot */}
            <path d="M 180 265 L 170 290 L 270 290 L 260 265 Z" fill="#CBD5E1" stroke="#2A081D" strokeWidth="3" />
            <ellipse cx="220" cy="290" rx="50" ry="12" fill="#E2E8F0" stroke="#2A081D" strokeWidth="2.5" />

            {/* Pedestal Rim & Top Plate */}
            <ellipse cx="220" cy="245" rx="160" ry="60" fill="#2A081D" />
            <ellipse cx="220" cy="240" rx="158" ry="58" fill="url(#plateGradient)" stroke="#2A081D" strokeWidth="3" />
            <ellipse cx="220" cy="238" rx="146" ry="52" fill="#FFFFFF" stroke="#FCD34D" strokeWidth="2.5" />

            {/* --- 2. MAIN CAKE BODY (CYLINDER) --- */}
            {/* Outer Cylindrical Front Wall */}
            <path
              d="M 85 130 A 135 52 0 0 0 355 130 L 355 210 A 135 52 0 0 1 85 210 Z"
              fill="url(#wallGradient)"
              stroke="#2A081D"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Luscious Frosting Drips on Outer Front Wall */}
            <path
              d="M 85 130 
                 Q 95 155 105 130 
                 Q 115 165 125 130 
                 Q 140 170 155 130 
                 Q 170 160 185 130 
                 Q 200 175 215 130 
                 Q 230 160 245 130 
                 Q 260 170 275 130 
                 Q 290 165 305 130 
                 Q 320 155 335 130 
                 Q 345 150 355 130"
              fill="none"
              stroke="#FB7185"
              strokeWidth="6"
              strokeLinecap="round"
            />

            {/* Main Cake Top Frosting Surface */}
            {/* If cut, the top ellipse has the V-cut missing */}
            <path
              d={
                isCut
                  ? "M 220 130 L 346.9 147.8 A 135 52 0 1 0 238.8 181.5 Z"
                  : "M 85 130 A 135 52 0 1 0 355 130 A 135 52 0 1 0 85 130 Z"
              }
              fill="url(#cakeSheen)"
              stroke="#2A081D"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Top Swirl Cream Dollops & Strawberries on Main Cake */}
            <g>
              {/* Cream Swirl 1 */}
              <circle cx="115" cy="115" r="7" fill="#FFFFFF" stroke="#2A081D" strokeWidth="2" />
              <circle cx="115" cy="113" r="3" fill="#FDA4AF" />
              {/* Cream Swirl 2 */}
              <circle cx="155" cy="95" r="7" fill="#FFFFFF" stroke="#2A081D" strokeWidth="2" />
              <circle cx="155" cy="93" r="3" fill="#FDA4AF" />
              {/* Cream Swirl 3 */}
              <circle cx="220" cy="85" r="7" fill="#FFFFFF" stroke="#2A081D" strokeWidth="2" />
              <circle cx="220" cy="83" r="3" fill="#FDA4AF" />
              {/* Cream Swirl 4 */}
              <circle cx="285" cy="95" r="7" fill="#FFFFFF" stroke="#2A081D" strokeWidth="2" />
              <circle cx="285" cy="93" r="3" fill="#FDA4AF" />

              {/* Decorative Rainbow Sprinkles on Top */}
              <rect x="140" y="115" width="6" height="2.5" rx="1.2" fill="#FACC15" transform="rotate(-25 140 115)" />
              <rect x="175" y="130" width="6" height="2.5" rx="1.2" fill="#38BDF8" transform="rotate(35 175 130)" />
              <rect x="195" y="105" width="6" height="2.5" rx="1.2" fill="#FFFFFF" transform="rotate(-15 195 105)" />
              <rect x="250" y="110" width="6" height="2.5" rx="1.2" fill="#A855F7" transform="rotate(40 250 110)" />
              <rect x="160" y="145" width="6" height="2.5" rx="1.2" fill="#EF4444" transform="rotate(10 160 145)" />
            </g>

            {/* --- 3. EXPOSED V-CUT CAVITY (Visible when cake is cut) --- */}
            {isCut && (
              <g>
                {/* Plate base showing inside cavity floor */}
                <path d="M 220 210 L 346.9 227.8 A 135 52 0 0 1 238.8 261.5 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

                {/* Right Inner Cut Wall (depth from (220,130) to (346.9,147.8)) */}
                <path
                  d="M 220 130 L 346.9 147.8 L 346.9 227.8 L 220 210 Z"
                  fill="#FED7AA"
                  stroke="#2A081D"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />

                {/* Internal Layer Stripes on Right Wall */}
                {/* Sponge Layer 1 */}
                <path d="M 220 144 L 346.9 161.8 L 346.9 180 L 220 162 Z" fill="#FDBA74" />
                {/* Raspberry Jam Layer 1 */}
                <path d="M 220 162 L 346.9 180 L 346.9 186 L 220 168 Z" fill="#BE185D" />
                {/* Vanilla Cream Layer 1 */}
                <path d="M 220 168 L 346.9 186 L 346.9 191 L 220 173 Z" fill="#FFFFFF" />
                {/* Sponge Layer 2 */}
                <path d="M 220 173 L 346.9 191 L 346.9 208 L 220 190 Z" fill="#FDBA74" />
                {/* Raspberry Jam Layer 2 */}
                <path d="M 220 190 L 346.9 208 L 346.9 213 L 220 195 Z" fill="#BE185D" />
                {/* Vanilla Cream Layer 2 */}
                <path d="M 220 195 L 346.9 213 L 346.9 218 L 220 200 Z" fill="#FFFFFF" />
                {/* Sponge Layer 3 */}
                <path d="M 220 200 L 346.9 218 L 346.9 227.8 L 220 210 Z" fill="#FDBA74" />

                {/* Cavity Ambient Occlusion Shadow */}
                <path d="M 220 130 L 346.9 147.8 L 346.9 227.8 L 220 210 Z" fill="rgba(42,8,29,0.22)" />

                {/* Left Inner Cut Wall Depth Edge */}
                <path d="M 220 130 L 238.8 181.5 L 238.8 261.5 L 220 210 Z" fill="rgba(42,8,29,0.35)" />
              </g>
            )}

            {/* --- 4. THE 3D V-SHAPED WEDGE SLICE (Separates smoothly when cut) --- */}
            <g
              style={{
                transform: isCut ? 'translate(80px, 28px)' : 'none',
                transition: 'transform 0.65s cubic-bezier(0.34, 1.35, 0.64, 1)',
              }}
            >
              {/* Separate Porcelain Saucer Plate for the Slice (Visible when cut) */}
              {isCut && (
                <g>
                  {/* Plate Shadow */}
                  <ellipse cx="288" cy="272" rx="72" ry="24" fill="rgba(0,0,0,0.35)" />
                  {/* Plate Base */}
                  <ellipse cx="288" cy="268" rx="68" ry="22" fill="#E2E8F0" stroke="#2A081D" strokeWidth="2.5" />
                  <ellipse cx="288" cy="266" rx="62" ry="19" fill="#FFFFFF" stroke="#FCD34D" strokeWidth="2" />
                </g>
              )}

              {/* 4A. Left Exposed Lateral Cut Wall (Directly matches sample image) */}
              <g>
                {/* Full Base Quad of Exposed Left Cut Face */}
                <path
                  d="M 220 130 L 238.8 181.5 L 238.8 261.5 L 220 210 Z"
                  fill="#FED7AA"
                  stroke="#2A081D"
                  strokeWidth="3.2"
                  strokeLinejoin="round"
                />

                {/* Sponge Layer 1 */}
                <path d="M 220 144 L 238.8 195.5 L 238.8 213.5 L 220 162 Z" fill="#FDBA74" />
                {/* Raspberry Jam Layer 1 */}
                <path d="M 220 162 L 238.8 213.5 L 238.8 219.5 L 220 168 Z" fill="#BE185D" />
                {/* Vanilla Cream Layer 1 */}
                <path d="M 220 168 L 238.8 219.5 L 238.8 225.5 L 220 174 Z" fill="#FFFFFF" />
                {/* Sponge Layer 2 */}
                <path d="M 220 174 L 238.8 225.5 L 238.8 243.5 L 220 192 Z" fill="#FDBA74" />
                {/* Raspberry Jam Layer 2 */}
                <path d="M 220 192 L 238.8 243.5 L 238.8 249.5 L 220 198 Z" fill="#BE185D" />
                {/* Vanilla Cream Layer 2 */}
                <path d="M 220 198 L 238.8 249.5 L 238.8 255.5 L 220 204 Z" fill="#FFFFFF" />
                {/* Sponge Layer 3 */}
                <path d="M 220 204 L 238.8 255.5 L 238.8 261.5 L 220 210 Z" fill="#FDBA74" />

                {/* Delicious Scalloped Pink Frosting Drip over the Left Face */}
                <path
                  d="M 220 130 L 238.8 181.5 
                     L 238.8 198 
                     Q 234 208 230 192 
                     Q 226 214 223 186 
                     L 220 144 Z"
                  fill="#F43F5E"
                  stroke="#2A081D"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </g>

              {/* 4B. Outer Curved Crust Wall of the Slice */}
              <path
                d="M 238.8 181.5 A 135 52 0 0 0 346.9 147.8 L 346.9 227.8 A 135 52 0 0 1 238.8 261.5 Z"
                fill="url(#wallGradient)"
                stroke="#2A081D"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />

              {/* Drips along outer crust */}
              <path
                d="M 238.8 181.5 Q 265 210 292 165 Q 320 205 346.9 147.8"
                fill="none"
                stroke="#FB7185"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* 4C. Top Triangular V-Shaped Surface */}
              <path
                d="M 220 130 L 346.9 147.8 A 135 52 0 0 1 238.8 181.5 Z"
                fill="url(#cakeSheen)"
                stroke="#2A081D"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />

              {/* Colorful Sprinkles on Top Face (Exact sample style) */}
              <g>
                {/* Blue Sprinkle */}
                <rect x="250" y="150" width="7" height="3" rx="1.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="0.8" transform="rotate(-30 250 150)" />
                {/* Yellow Sprinkle */}
                <rect x="275" y="145" width="7" height="3" rx="1.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.8" transform="rotate(45 275 145)" />
                {/* Red Sprinkle */}
                <rect x="290" y="160" width="7" height="3" rx="1.5" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.8" transform="rotate(-15 290 160)" />
                {/* Blue Sprinkle 2 */}
                <rect x="310" y="152" width="7" height="3" rx="1.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="0.8" transform="rotate(20 310 152)" />
                {/* Yellow Sprinkle 2 */}
                <rect x="270" y="165" width="7" height="3" rx="1.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.8" transform="rotate(-40 270 165)" />
                {/* Red Sprinkle 2 */}
                <rect x="238" y="155" width="7" height="3" rx="1.5" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.8" transform="rotate(15 238 155)" />
              </g>

              {/* Candle 5 Riding on Slice */}
              <g>
                {/* Candle Stick */}
                <rect x="275" y="115" width="4" height="24" rx="2" fill="#F472B6" stroke="#2A081D" strokeWidth="2" />
                <rect x="275" y="120" width="4" height="3" fill="#FFFFFF" />
                <rect x="275" y="128" width="4" height="3" fill="#FFFFFF" />
                {/* Wick */}
                <line x1="277" y1="115" x2="277" y2="110" stroke="#2A081D" strokeWidth="1.5" />

                {/* Candle Flame / Smoke */}
                {candles[4] ? (
                  <g>
                    <ellipse cx="277" cy={flameFrame === 0 ? "103" : "102"} rx="4" ry="7" fill="#F97316" />
                    <ellipse cx="277" cy={flameFrame === 0 ? "104" : "103"} rx="2.5" ry="4.5" fill="#FDE047" />
                    <circle cx="277" cy="105" r="1.5" fill="#FFFFFF" />
                  </g>
                ) : (
                  <g>
                    <path d="M 277 108 Q 275 102 278 98 Q 281 94 278 90" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
                  </g>
                )}
              </g>
            </g>

            {/* --- 5. CANDLES 1 through 4 (On Main Cake Top) --- */}
            {mainCandles.map((c, idx) => {
              const isLit = candles[idx];
              return (
                <g key={idx}>
                  {/* Candle Body */}
                  <rect x={c.x} y={c.y} width="4" height="24" rx="2" fill={c.color} stroke="#2A081D" strokeWidth="2" />
                  <rect x={c.x} y={c.y + 6} width="4" height="3" fill="#FFFFFF" />
                  <rect x={c.x} y={c.y + 14} width="4" height="3" fill="#FFFFFF" />
                  {/* Wick */}
                  <line x1={c.x + 2} y1={c.y} x2={c.x + 2} y2={c.y - 5} stroke="#2A081D" strokeWidth="1.5" />

                  {/* Flame or Smoke */}
                  {isLit ? (
                    <g>
                      <ellipse cx={c.x + 2} cy={flameFrame === 0 ? c.y - 12 : c.y - 13} rx="4" ry="7" fill="#F97316" />
                      <ellipse cx={c.x + 2} cy={flameFrame === 0 ? c.y - 11 : c.y - 12} rx="2.5" ry="4.5" fill="#FDE047" />
                      <circle cx={c.x + 2} cy={c.y - 10} r="1.5" fill="#FFFFFF" />
                    </g>
                  ) : (
                    <g>
                      <path
                        d={`M ${c.x + 2} ${c.y - 6} Q ${c.x} ${c.y - 12} ${c.x + 3} ${c.y - 17} Q ${c.x + 6} ${c.y - 22} ${c.x + 3} ${c.y - 26}`}
                        fill="none"
                        stroke="#CBD5E1"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
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
                <span>{isCut ? "Here's your 3D V-slice, Coco! 🍰💖" : "Ready to cut the V-slice! 🎀🔪"}</span>
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
                title="Click to cut a 3D slice of cake for Coco!"
              >
                <img
                  src="/knife_cat.png"
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
            <button
              onClick={handleCutCake}
              className="px-8 py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-cosmic-deep text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{isCut ? "[ CUT ANOTHER V-SLICE 🍰 ]" : "[ CUT A 3D V-SLICE FOR COCO 🍰 ]"}</span>
            </button>

            {isCut && (
              <div className="px-5 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-cosmic-champagne font-sans text-xs tracking-wide shadow-lg">
                ✨ The sweetest 3D V-slice is served to Coco! Slay your birthday! 🍰💖
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
