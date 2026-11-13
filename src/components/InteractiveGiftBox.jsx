import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles } from 'lucide-react';

export default function InteractiveGiftBox({ onOpen }) {
  const [isOpened, setIsOpened] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isOpened) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle 3D tilt
    const rotateX = (-y / (rect.height / 2)) * 14;
    const rotateY = (x / (rect.width / 2)) * 14;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleOpenGift = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Multi-stage confetti celebration
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E', '#FEF3C7']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0.1 },
        colors: ['#E8729B', '#FCD34D', '#FFFFFF']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 0.9 },
        colors: ['#E8729B', '#FCD34D', '#FFFFFF']
      });
    }, 250);

    if (onOpen) onOpen();
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-4 select-none">
      {/* 3D Interactive Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenGift}
        style={{
          perspective: '1000px',
        }}
        className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] flex items-center justify-center cursor-pointer group"
      >
        <div
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1)`,
            transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
        >
          {/* Ambient Glow behind the box */}
          <div className="absolute inset-4 bg-gradient-to-tr from-cosmic-rose/40 to-cosmic-gold/30 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

          {/* Luxury Gift Box Image */}
          <img
            src="/gift_box.png"
            alt="Luxury 3D Birthday Gift Box"
            className={`w-full h-full object-contain relative z-10 transition-all duration-700 pointer-events-none select-none ${
              isOpened ? 'scale-110 filter brightness-110' : 'group-hover:brightness-105'
            }`}
          />

          {/* Surprise Particle Burst emerging on open */}
          {isOpened && (
            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none animate-pulse">
              <div className="w-16 h-16 rounded-full bg-cosmic-champagne/90 shadow-glow-gold flex items-center justify-center scale-125 transform -translate-y-8 animate-bounce">
                <Heart className="w-9 h-9 fill-cosmic-rose text-cosmic-rose" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Button & Subtext */}
      <div className="mt-2 flex flex-col items-center z-10">
        {!isOpened ? (
          <button
            onClick={handleOpenGift}
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full luxury-button text-white font-sans text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-glow-rose transition-all cursor-pointer"
          >
            <Gift className="w-4 h-4 text-cosmic-champagne group-hover:rotate-12 transition-transform" />
            <span>Unwrap Your Birthday Gift</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-5 py-2 rounded-full glass-pill text-cosmic-champagne font-sans text-xs sm:text-sm font-medium border border-white/20 animate-pulse-subtle">
            <Heart className="w-4 h-4 text-cosmic-blush fill-cosmic-blush" />
            <span>Surprise Unwrapped • Scroll Down 💖</span>
          </div>
        )}
        <p className="text-[11px] text-white/60 mt-2 font-sans tracking-wide">
          {isOpened ? "Your gift is unlocked" : "Interactive 3D • Move cursor to rotate • Tap to open"}
        </p>
      </div>
    </div>
  );
}
