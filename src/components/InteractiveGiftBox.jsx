import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift } from 'lucide-react';
import { playChime, playMeow } from '../utils/soundEffects';

export default function InteractiveGiftBox({ onOpen, isOpened: externalIsOpened }) {
  const [internalOpened, setInternalOpened] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeCatId, setActiveCatId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const cardRef = useRef(null);

  const isOpened = externalIsOpened !== undefined ? externalIsOpened : internalOpened;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Collision-free responsive orbit dimensions (uniform 51.4° spacing with wide margin)
  const orbitRadiusX = windowWidth < 480 ? 150 : windowWidth < 768 ? 210 : 270;
  const orbitRadiusY = windowWidth < 480 ? 105 : windowWidth < 768 ? 140 : 175;
  const catSize = windowWidth < 480 ? 64 : windowWidth < 768 ? 80 : 96;

  // 7 Cutout Cats uniformly spaced (360° / 7 = 51.43°) so they never collide
  const base = import.meta.env.BASE_URL;
  const catsData = [
    {
      id: 7,
      src: `${base}cats/cat7.png`,
      alt: 'Cat with plate of momos',
      caption: 'Steaming hot momos for Coco! 🥟',
      angle: -90, // Top center
      rot: -2,
    },
    {
      id: 3,
      src: `${base}cats/cat3.png`,
      alt: 'Cat with pink bow and KitKat',
      caption: 'Break time with KitKat! 🎀',
      angle: -90 + (360 / 7) * 1, // ~ -38.6° (upper right)
      rot: 6,
    },
    {
      id: 6,
      src: `${base}cats/cat6.png`,
      alt: 'Cat with Biryani and Diet Coke',
      caption: 'Biryani & Diet Coke for Coco! 🍗',
      angle: -90 + (360 / 7) * 2, // ~ +12.9° (mid right)
      rot: 4,
    },
    {
      id: 5,
      src: `${base}cats/cat5.png`,
      alt: 'Cat with pink Monster Energy',
      caption: 'Pink Monster energy! ⚡',
      angle: -90 + (360 / 7) * 3, // ~ +64.3° (lower right)
      rot: -5,
    },
    {
      id: 2,
      src: `${base}cats/cat2.png`,
      alt: 'Cat with chocolate frappe',
      caption: 'Iced chocolate drink! 🥤',
      angle: -90 + (360 / 7) * 4, // ~ +115.7° (lower left)
      rot: 5,
    },
    {
      id: 4,
      src: `${base}cats/cat4.png`,
      alt: 'Cat with Kinder Joy',
      caption: 'Kinder Joy surprise! 🥚',
      angle: -90 + (360 / 7) * 5, // ~ +167.1° (mid left)
      rot: -4,
    },
    {
      id: 1,
      src: `${base}cats/cat1.png`,
      alt: 'Cat with NY cap and Dairy Milk Silk',
      caption: 'Silk just for Coco! 🍫',
      angle: -90 + (360 / 7) * 6, // ~ +218.6° (upper left)
      rot: -6,
    },
  ];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / (rect.height / 2)) * 14;
    const rotateY = (x / (rect.width / 2)) * 14;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleOpenGift = () => {
    playChime();
    setInternalOpened(true);

    // Single crisp, optimized celebration pop (tablet friendly)
    confetti({
      particleCount: 35,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E'],
      ticks: 140,
    });

    if (onOpen) onOpen();
  };

  const handleCatClick = (cat) => {
    playMeow();
    setActiveCatId(cat.id);
    setTimeout(() => {
      setActiveCatId((prev) => (prev === cat.id ? null : prev));
    }, 2800);
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-6 select-none w-full">
      {/* Anchor Container: Center Point for Gift Box and Orbiting Cats */}
      <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[340px] sm:h-[340px]">
        {/* 7 Cutout Cats Bursting from Box into Orbit */}
        <AnimatePresence>
          {isOpened && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
              {catsData.map((cat, idx) => {
                const rad = (cat.angle * Math.PI) / 180;
                const targetX = Math.round(Math.cos(rad) * orbitRadiusX);
                const targetY = Math.round(Math.sin(rad) * orbitRadiusY);

                return (
                  <motion.div
                    key={cat.id}
                    initial={{
                      opacity: 0,
                      scale: 0.05,
                      x: 0,
                      y: 0,
                      zIndex: 10,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: targetX,
                      y: targetY,
                      zIndex: 35,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 140,
                      damping: 16,
                      mass: 0.75,
                      delay: idx * 0.05,
                    }}
                    whileHover={{
                      scale: 1.16,
                      zIndex: 50,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => handleCatClick(cat)}
                    style={{
                      width: `${catSize}px`,
                      height: `${catSize}px`,
                      left: '50%',
                      top: '50%',
                      marginLeft: `-${catSize / 2}px`,
                      marginTop: `-${catSize / 2}px`,
                    }}
                    className="absolute pointer-events-auto cursor-pointer group flex items-center justify-center"
                  >
                    {/* Inner Gentle Floating Bob Container (starts after burst lands) */}
                    <motion.div
                      animate={{
                        y: idx % 2 === 0 ? [-5, 5, -5] : [5, -5, 5],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.8 + (idx % 3) * 0.5,
                        ease: 'easeInOut',
                        delay: 0.6 + idx * 0.05,
                      }}
                      className="w-full h-full relative flex items-center justify-center"
                    >
                      <img
                        src={cat.src}
                        alt={cat.alt}
                        style={{ transform: `rotate(${cat.rot}deg)` }}
                        className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)] select-none pointer-events-none"
                      />

                      {/* Cute Floating Tooltip above the Cat's Head */}
                      <div
                        className={`transition-all duration-300 absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/95 text-neutral-900 font-sans text-[11px] font-bold shadow-xl whitespace-nowrap pointer-events-none border border-cosmic-rose/40 z-50 ${
                          activeCatId === cat.id ? 'opacity-100 scale-105' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        {cat.caption}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* 3D Interactive Gift Box */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleOpenGift}
          animate={
            isOpened
              ? { scale: [1, 1.08, 0.98, 1.02, 1] }
              : { scale: isHovered ? 1.05 : 1 }
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            perspective: '1000px',
          }}
          className="w-full h-full flex items-center justify-center cursor-pointer group relative z-20"
        >
          <div
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s ease-out',
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
          >
            {/* Ambient Specular Glow */}
            <div className="absolute inset-4 bg-gradient-to-tr from-cosmic-rose/40 to-cosmic-gold/30 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

            {/* Luxury 3D Gift Box Image */}
            <img
              src={`${base}gift_box.png`}
              alt="Luxury 3D Birthday Gift Box"
              className={`w-full h-full object-contain relative z-10 transition-all duration-500 pointer-events-none select-none ${
                isOpened ? 'brightness-105' : 'group-hover:brightness-105'
              }`}
            />
          </div>
        </motion.div>
      </div>

      {/* Button Underneath */}
      <div className="mt-4 sm:mt-6 flex flex-col items-center relative z-20">
        <button
          onClick={handleOpenGift}
          className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full luxury-button text-white font-sans text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-glow-rose transition-all cursor-pointer active:scale-95"
        >
          <Gift className="w-4 h-4 text-cosmic-champagne group-hover:rotate-12 transition-transform" />
          <span>{isOpened ? 'Gifts & Chocolates Unwrapped! 🍫' : 'Unwrap Your Birthday Gift'}</span>
        </button>
        <p className="text-[11px] text-white/60 mt-2 font-sans tracking-wide">
          {isOpened ? 'Click any cat in the circle to say hi!' : 'Tap the gift box to unleash the chocolate cats'}
        </p>
      </div>
    </div>
  );
}
