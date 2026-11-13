import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Heart } from 'lucide-react';

export default function InteractiveGiftBox({ onOpen, isOpened }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

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
    // Multi-stage celebratory confetti burst
    confetti({
      particleCount: 95,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E', '#FEF3C7']
    });

    setTimeout(() => {
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 65,
        origin: { x: 0.1 },
        colors: ['#E8729B', '#FCD34D', '#FFFFFF']
      });
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 65,
        origin: { x: 0.9 },
        colors: ['#E8729B', '#FCD34D', '#FFFFFF']
      });
    }, 250);

    if (onOpen) onOpen();
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-4 select-none">
      {/* 3D Interactive Gift Box */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenGift}
        style={{
          perspective: '1000px',
        }}
        className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] flex items-center justify-center cursor-pointer group relative z-10"
      >
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-4 bg-gradient-to-tr from-cosmic-rose/40 to-cosmic-gold/30 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

          {/* Luxury 3D Gift Box Image */}
          <img
            src="/gift_box.png"
            alt="Luxury 3D Birthday Gift Box"
            className={`w-full h-full object-contain relative z-10 transition-all duration-700 pointer-events-none select-none ${
              isOpened ? 'scale-105 filter brightness-105' : 'group-hover:brightness-105'
            }`}
          />
        </div>
      </div>

      {/* Button */}
      <div className="mt-2 flex flex-col items-center z-10">
        <button
          onClick={handleOpenGift}
          className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full luxury-button text-white font-sans text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-glow-rose transition-all cursor-pointer"
        >
          <Gift className="w-4 h-4 text-cosmic-champagne group-hover:rotate-12 transition-transform" />
          <span>{isOpened ? "Gifts & Chocolates Unwrapped! 🍫" : "Unwrap Your Birthday Gift"}</span>
        </button>
        <p className="text-[11px] text-white/60 mt-2 font-sans tracking-wide">
          {isOpened ? "Tap any cat to say hi!" : "Tap the gift box to unlock Coco's chocolate cats"}
        </p>
      </div>
    </div>
  );
}
