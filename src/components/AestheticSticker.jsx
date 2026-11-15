import React from 'react';
import { motion } from 'framer-motion';
import { playPop } from '../utils/soundEffects';

export default function AestheticSticker({
  name,
  alt = 'Sticker',
  className = '',
  rotate = 0,
  size = 'w-14 sm:w-20',
  zIndex = 'z-20'
}) {
  const base = import.meta.env.BASE_URL;

  return (
    <motion.div
      whileHover={{ scale: 1.16, rotate: 0 }}
      whileTap={{ scale: 0.92 }}
      onClick={() => playPop()}
      style={{ rotate: `${rotate}deg` }}
      className={`absolute pointer-events-auto cursor-pointer transition-transform duration-200 select-none ${zIndex} ${className}`}
    >
      <picture>
        <source srcSet={`${base}stickers/romantic/${name}.webp`} type="image/webp" />
        <img
          src={`${base}stickers/romantic/${name}.png`}
          alt={alt}
          loading="eager"
          decoding="sync"
          className={`${size} h-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.5)] hover:drop-shadow-[0_12px_24px_rgba(244,114,182,0.45)] transition-all`}
        />
      </picture>
    </motion.div>
  );
}
