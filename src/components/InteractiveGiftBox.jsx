import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, X, Plus, Image as ImageIcon } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export default function InteractiveGiftBox({ onOpen }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    setIsOpened(true);
    setIsModalOpen(true);

    // Multi-stage celebratory confetti burst
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

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
          <span>{isOpened ? "Open Surprise Scrapbook" : "Unwrap Your Birthday Gift"}</span>
        </button>
        <p className="text-[11px] text-white/60 mt-2 font-sans tracking-wide">
          Tap to open the box and reveal Coco's scrapbook gifts
        </p>
      </div>

      {/* 2nd Layer: Blurry Backdrop Modal with Emerging Scrapbook Gifts */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl py-8 px-4 sm:px-8 text-center my-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-4 sm:top-4 sm:right-6 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white flex items-center justify-center transition-all cursor-pointer z-50 shadow-md"
              title="Close Scrapbook (Esc)"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
                <span>Inside Coco's Gift Box</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-5xl font-normal text-white">
                Scrapbook Tokens & Cheat Notes
              </h3>
              <p className="font-sans text-white/75 text-sm sm:text-base font-light mt-2 max-w-lg mx-auto">
                Surprise gifts pulled straight out of the box. Drop your custom PNGs in <code className="bg-white/10 px-1.5 py-0.5 rounded text-cosmic-champagne font-mono text-xs">public/gifts/</code> anytime!
              </p>
            </div>

            {/* Scrapbook Cards Grid (2nd Layer) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-4">
              {birthdayData.giftBoxItems.map((item, idx) => {
                const hasPng = Boolean(item.src && item.src.trim().length > 0);

                return (
                  <div
                    key={item.id}
                    style={{
                      transform: `rotate(${item.rotation || '0deg'})`,
                    }}
                    className="relative group bg-[#FFF9F3] p-4 sm:p-5 rounded-2xl shadow-[0_20px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_25px_45px_rgba(0,0,0,0.55)] transition-all duration-300 hover:scale-105 hover:rotate-0 border border-neutral-300/80 text-left cursor-pointer flex flex-col justify-between"
                  >
                    {/* Washi Tape Header */}
                    <div
                      style={{ backgroundColor: item.washi || 'rgba(232, 114, 155, 0.6)' }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-xs opacity-90 shadow-xs transform -rotate-1 pointer-events-none z-10"
                    />

                    {/* Image / PNG Slot */}
                    <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 overflow-hidden flex flex-col items-center justify-center p-3 text-center mb-3 group-hover:border-cosmic-rose/40 transition-colors">
                      {hasPng ? (
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center space-y-2 text-neutral-400 p-2">
                          <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-neutral-200 flex items-center justify-center text-cosmic-rose/70 group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6 stroke-[1.8]" />
                          </div>
                          <div>
                            <span className="font-serif text-xs font-bold text-neutral-700 block">
                              PNG Slot #{idx + 1}
                            </span>
                            <span className="font-sans text-[10px] text-neutral-500 block leading-tight mt-0.5">
                              Ready for your gift PNG
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Note Content */}
                    <div className="space-y-1">
                      <h4 className="font-serif text-sm font-bold text-neutral-900 line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="font-serif italic text-xs text-neutral-700 leading-snug">
                        "{item.note}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Dismiss Tip */}
            <div className="mt-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-white/20 hover:bg-white/30 border border-white/30 text-white font-sans text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
              >
                Return to Celebration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
