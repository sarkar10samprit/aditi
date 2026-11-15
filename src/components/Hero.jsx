import React, { useState } from 'react';
import InteractiveGiftBox from './InteractiveGiftBox';
import { birthdayData } from '../config/birthdayData';
import AestheticSticker from './AestheticSticker';

export default function Hero({ onGiftOpen }) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    if (onGiftOpen) onGiftOpen();
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-20 pb-6 px-4 text-center overflow-visible">
      {/* Scattered Aesthetic Scrapbook Stickers */}
      <AestheticSticker
        name="ribbon_bow"
        alt="Satin Ribbon Bow"
        className="top-6 left-3 sm:left-10 lg:left-24"
        rotate={-10}
        size="w-12 sm:w-16 md:w-20"
      />
      <AestheticSticker
        name="cherries"
        alt="Sweet Cherries"
        className="top-8 right-3 sm:right-10 lg:right-24"
        rotate={12}
        size="w-12 sm:w-16 md:w-20"
      />
      <AestheticSticker
        name="snoopy"
        alt="Sleeping Snoopy"
        className="bottom-0 right-4 sm:right-14 lg:right-32"
        rotate={4}
        size="w-18 sm:w-24 md:w-28"
      />

      {/* Main Luxury Title with Editorial Serif */}
      <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-white max-w-5xl leading-[1.08] mb-4 sm:mb-6 drop-shadow-md">
        Happy Birthday,{' '}
        <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cosmic-champagne via-cosmic-blush to-white">
          {birthdayData.bestieName}
        </span>
      </h1>

      {/* Editorial Subtitle */}
      <p className="font-sans text-base sm:text-lg text-white/85 max-w-2xl font-light leading-relaxed mb-4 sm:mb-6 tracking-wide">
        To the one whose laugh turns chaos into poetry, whose warmth outshines the stars, and who remains effortlessly, dangerously unforgettable.
      </p>

      {/* Luxury 3D Interactive Gift Box with Radial Cat Burst */}
      <div className="my-2 sm:my-4 z-10 w-full flex items-center justify-center">
        <InteractiveGiftBox onOpen={handleOpen} isOpened={isOpened} />
      </div>
    </section>
  );
}
