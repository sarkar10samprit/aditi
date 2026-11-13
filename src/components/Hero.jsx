import React, { useState } from 'react';
import InteractiveGiftBox from './InteractiveGiftBox';
import { birthdayData } from '../config/birthdayData';
import { Sparkles, Image as ImageIcon, Mail, Cake, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero({ onGiftOpen }) {
  const [isOpened, setIsOpened] = useState(false);
  const [activeCatMessage, setActiveCatMessage] = useState(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpen = () => {
    setIsOpened(true);
    if (onGiftOpen) onGiftOpen();
  };

  // 7 Cutout Cats with Chocolates & Food
  const catItems = [
    {
      id: 1,
      src: '/cats/cat1.png',
      alt: 'Cat with NY cap and Dairy Milk Silk',
      caption: 'Silk just for Coco! 🍫',
      className: 'top-8 left-3 sm:top-14 sm:left-8 w-28 sm:w-36 md:w-44 -rotate-6',
    },
    {
      id: 2,
      src: '/cats/cat2.png',
      alt: 'Cat with chocolate frappe',
      caption: 'Iced chocolate drink! 🥤',
      className: 'bottom-12 left-4 sm:bottom-16 sm:left-12 w-24 sm:w-32 md:w-40 rotate-6',
    },
    {
      id: 3,
      src: '/cats/cat3.png',
      alt: 'Cat with pink bow and KitKat',
      caption: 'Break time with KitKat! 🎀',
      className: 'top-10 right-4 sm:top-14 sm:right-8 w-24 sm:w-32 md:w-40 rotate-6',
    },
    {
      id: 4,
      src: '/cats/cat4.png',
      alt: 'Cat with Kinder Joy',
      caption: 'Kinder Joy surprise! 🥚',
      className: 'top-1/2 -translate-y-1/2 left-2 sm:left-8 w-28 sm:w-36 md:w-44 -rotate-3',
    },
    {
      id: 5,
      src: '/cats/cat5.png',
      alt: 'Cat with pink Monster Energy',
      caption: 'Pink Monster energy! ⚡',
      className: 'bottom-10 right-4 sm:bottom-16 sm:right-12 w-28 sm:w-36 md:w-44 -rotate-6',
    },
    {
      id: 6,
      src: '/cats/cat6.png',
      alt: 'Cat with Biryani and Diet Coke',
      caption: 'Biryani & Diet Coke for Coco! 🍗',
      className: 'top-1/2 -translate-y-1/2 right-2 sm:right-8 w-28 sm:w-36 md:w-44 rotate-4',
    },
    {
      id: 7,
      src: '/cats/cat7.png',
      alt: 'Cat with plate of momos',
      caption: 'Steaming hot momos for Coco! 🥟',
      className: 'top-2 sm:top-4 left-1/2 -translate-x-1/2 w-28 sm:w-36 md:w-44 -rotate-2',
    },
  ];

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
    <section className="relative min-h-[96vh] flex flex-col items-center justify-center pt-24 pb-20 px-4 text-center overflow-hidden">
      {/* 7 Cute Cutout Cats Scattered Across the Screen when Box is Opened */}
      {isOpened && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {catItems.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleCatClick(cat)}
              className={`absolute pointer-events-auto cursor-pointer group transform transition-all duration-500 ease-out hover:scale-120 hover:z-30 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.55)] ${
                idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-reverse'
              } ${cat.className}`}
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {/* Cat Cutout Image */}
              <img
                src={cat.src}
                alt={cat.alt}
                className="w-full h-auto object-contain select-none transition-transform duration-300 group-hover:rotate-6"
              />

              {/* Floating Tooltip Bubble */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/95 text-neutral-900 font-sans text-[11px] font-bold shadow-lg whitespace-nowrap pointer-events-none border border-cosmic-rose/40">
                {cat.caption}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Cat Tap Toast Message */}
      {activeCatMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-white/95 text-neutral-900 font-sans text-xs sm:text-sm font-bold shadow-2xl border border-cosmic-rose/50 animate-bounce flex items-center gap-2 pointer-events-none">
          <Heart className="w-4 h-4 fill-cosmic-rose text-cosmic-rose" />
          <span>{activeCatMessage}</span>
        </div>
      )}

      {/* Editorial Pill Tag */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-pill border border-white/25 text-white/90 font-sans text-xs font-semibold tracking-[0.2em] uppercase mb-8 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
        <span>A Tribute to My Favorite Human</span>
        <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
      </div>

      {/* Main Luxury Title with Editorial Serif */}
      <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-white max-w-5xl leading-[1.08] mb-6 drop-shadow-md">
        Happy Birthday,{' '}
        <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cosmic-champagne via-cosmic-blush to-white">
          {birthdayData.bestieName}
        </span>
      </h1>

      {/* Editorial Subtitle */}
      <p className="font-sans text-base sm:text-xl text-white/85 max-w-2xl font-light leading-relaxed mb-10 tracking-wide">
        To the one whose laugh turns chaos into poetry, whose warmth outshines the stars, and who remains effortlessly, dangerously unforgettable.
      </p>

      {/* Luxury 3D Interactive Gift Box */}
      <div className="my-2 z-10">
        <InteractiveGiftBox onOpen={handleOpen} isOpened={isOpened} />
      </div>

      {/* Refined Frosted Navigation Actions */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5 max-w-xl z-10">
        <button
          onClick={() => scrollTo('memories')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill hover:bg-white/20 text-white font-sans text-xs sm:text-sm font-medium tracking-wide transition-all active:scale-95 cursor-pointer"
        >
          <ImageIcon className="w-4 h-4 text-cosmic-blush" />
          <span>The Memory Wall</span>
        </button>

        <button
          onClick={() => scrollTo('letters')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill hover:bg-white/20 text-white font-sans text-xs sm:text-sm font-medium tracking-wide transition-all active:scale-95 cursor-pointer"
        >
          <Mail className="w-4 h-4 text-cosmic-blush" />
          <span>Letter for Coco</span>
        </button>

        <button
          onClick={() => scrollTo('cake')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-pill hover:bg-white/20 text-white font-sans text-xs sm:text-sm font-medium tracking-wide transition-all active:scale-95 cursor-pointer"
        >
          <Cake className="w-4 h-4 text-cosmic-gold" />
          <span>Make a Wish</span>
        </button>
      </div>
    </section>
  );
}
