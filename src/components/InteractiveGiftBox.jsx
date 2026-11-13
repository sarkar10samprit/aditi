import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Heart } from 'lucide-react';

export default function InteractiveGiftBox({ onOpen, isOpened: externalIsOpened }) {
  const [internalOpened, setInternalOpened] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeCatMessage, setActiveCatMessage] = useState(null);
  const cardRef = useRef(null);

  const isOpened = externalIsOpened !== undefined ? externalIsOpened : internalOpened;

  // 7 Cutout Cats with exact coordinates forming a circular ring around the gift box
  const catItems = [
    {
      id: 7,
      src: '/cats/cat7.png',
      alt: 'Cat with plate of momos',
      caption: 'Steaming hot momos for Coco! 🥟',
      targetX: '0px',
      targetY: '-235px',
      rot: '-2deg',
      delay: '0.0s',
      width: 'clamp(100px, 12vw, 155px)',
    },
    {
      id: 3,
      src: '/cats/cat3.png',
      alt: 'Cat with pink bow and KitKat',
      caption: 'Break time with KitKat! 🎀',
      targetX: '235px',
      targetY: '-145px',
      rot: '6deg',
      delay: '0.08s',
      width: 'clamp(95px, 11vw, 145px)',
    },
    {
      id: 6,
      src: '/cats/cat6.png',
      alt: 'Cat with Biryani and Diet Coke',
      caption: 'Biryani & Diet Coke for Coco! 🍗',
      targetX: '295px',
      targetY: '45px',
      rot: '4deg',
      delay: '0.16s',
      width: 'clamp(105px, 12vw, 160px)',
    },
    {
      id: 5,
      src: '/cats/cat5.png',
      alt: 'Cat with pink Monster Energy',
      caption: 'Pink Monster energy! ⚡',
      targetX: '135px',
      targetY: '215px',
      rot: '-5deg',
      delay: '0.24s',
      width: 'clamp(100px, 12vw, 150px)',
    },
    {
      id: 2,
      src: '/cats/cat2.png',
      alt: 'Cat with chocolate frappe',
      caption: 'Iced chocolate drink! 🥤',
      targetX: '-135px',
      targetY: '215px',
      rot: '5deg',
      delay: '0.32s',
      width: 'clamp(95px, 11vw, 145px)',
    },
    {
      id: 4,
      src: '/cats/cat4.png',
      alt: 'Cat with Kinder Joy',
      caption: 'Kinder Joy surprise! 🥚',
      targetX: '-295px',
      targetY: '45px',
      rot: '-4deg',
      delay: '0.40s',
      width: 'clamp(105px, 12vw, 160px)',
    },
    {
      id: 1,
      src: '/cats/cat1.png',
      alt: 'Cat with NY cap and Dairy Milk Silk',
      caption: 'Silk just for Coco! 🍫',
      targetX: '-235px',
      targetY: '-145px',
      rot: '-6deg',
      delay: '0.48s',
      width: 'clamp(105px, 12vw, 160px)',
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
    setInternalOpened(true);

    confetti({
      particleCount: 95,
      spread: 80,
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

  const handleCatClick = (cat) => {
    setActiveCatMessage(cat.caption);
    confetti({
      particleCount: 22,
      spread: 50,
      origin: { y: 0.4 },
      colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E']
    });
    setTimeout(() => setActiveCatMessage(null), 3000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-6 select-none w-full">
      {/* Center Anchor for 3D Box and Emerging Circular Cats */}
      <div className="relative flex items-center justify-center">
        {/* The 7 Cats Erupting Outward in a Circle from under/inside the box */}
        {isOpened && (
          <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
            {catItems.map((cat, idx) => (
              <div
                key={cat.id}
                onClick={() => handleCatClick(cat)}
                style={{
                  '--target-x': cat.targetX,
                  '--target-y': cat.targetY,
                  '--rot': cat.rot,
                  animationDelay: cat.delay,
                  width: cat.width,
                }}
                className={`cat-radial-item pointer-events-auto cursor-pointer group filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] hover:scale-120 hover:z-40 transition-transform duration-300 ${
                  idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-reverse'
                }`}
              >
                <img
                  src={cat.src}
                  alt={cat.alt}
                  className="w-full h-auto object-contain select-none transition-transform duration-300 group-hover:rotate-6"
                />

                {/* Speech Tooltip on Hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/95 text-neutral-900 font-sans text-[11px] font-bold shadow-lg whitespace-nowrap pointer-events-none border border-cosmic-rose/40 z-50">
                  {cat.caption}
                </div>
              </div>
            ))}
          </div>
        )}

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
          className="w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] flex items-center justify-center cursor-pointer group relative z-20"
        >
          <div
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1)`,
              transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full h-full flex items-center justify-center filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
          >
            {/* Ambient Specular Glow */}
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
      </div>

      {/* Toast Notification when a Cat is Tapped */}
      {activeCatMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-white/95 text-neutral-900 font-sans text-xs sm:text-sm font-bold shadow-2xl border border-cosmic-rose/50 animate-bounce flex items-center gap-2 pointer-events-none">
          <Heart className="w-4 h-4 fill-cosmic-rose text-cosmic-rose" />
          <span>{activeCatMessage}</span>
        </div>
      )}

      {/* Button Underneath */}
      <div className="mt-4 flex flex-col items-center z-20">
        <button
          onClick={handleOpenGift}
          className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full luxury-button text-white font-sans text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-glow-rose transition-all cursor-pointer"
        >
          <Gift className="w-4 h-4 text-cosmic-champagne group-hover:rotate-12 transition-transform" />
          <span>{isOpened ? "Gifts & Chocolates Unwrapped! 🍫" : "Unwrap Your Birthday Gift"}</span>
        </button>
        <p className="text-[11px] text-white/60 mt-2 font-sans tracking-wide">
          {isOpened ? "Click any cat in the circle to say hi!" : "Tap the gift box to unleash the chocolate cats"}
        </p>
      </div>
    </div>
  );
}
