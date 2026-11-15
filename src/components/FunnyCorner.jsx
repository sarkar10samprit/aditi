import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowLeft } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';
import { playPop } from '../utils/soundEffects';

export default function FunnyCorner({ onBack }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const memes = birthdayData.funnyMemes || [];

  // Lock body scroll while viewing memes
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle ESC key to close photo zoom or return to password page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedPhoto) {
          setSelectedPhoto(null);
        } else if (onBack) {
          onBack();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, onBack]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-xl overflow-y-auto px-4 py-8 sm:p-10 flex flex-col items-center select-none">
      {/* Top Bar with Navigation & Title */}
      <div className="w-full max-w-6xl flex items-center justify-between pb-6 border-b border-white/10 sticky top-0 z-30 bg-black/40 backdrop-blur-md pt-2 px-2">
        <div>
          <h3 className="font-serif text-2xl sm:text-4xl font-normal text-white flex items-center gap-2">
            The meme corner 😂🌚
          </h3>
          <p className="font-sans text-xs sm:text-sm text-pink-200/80 font-normal mt-0.5">
            Birthday pe ye vi toh chalta haiii
          </p>
        </div>

        {/* Top Bar Back Button */}
        <button
          onClick={() => {
            playPop();
            if (onBack) onBack();
          }}
          className="px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white font-sans text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer border border-white/25 shadow-lg active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Meme Photos Grid (Title-less and Caption-less) */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 my-8">
        {memes.map((meme, idx) => (
          <motion.div
            key={meme.id}
            whileHover={{ scale: 1.04, y: -4, rotate: 0 }}
            style={{ rotate: meme.rotation || '0deg' }}
            transition={{ type: 'spring', stiffness: 240, damping: 16 }}
            onClick={() => {
              playPop();
              setSelectedPhoto(meme);
            }}
            className="relative bg-white rounded-2xl p-3.5 sm:p-4 shadow-2xl cursor-pointer border border-neutral-200 group flex flex-col items-center"
          >
            {/* Washi Tape Pin at Top */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-200/90 backdrop-blur-xs border border-amber-300/60 shadow-xs z-20 pointer-events-none"
              style={{
                clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)',
                transform: `translateX(-50%) rotate(${idx % 2 === 0 ? '-2deg' : '2deg'})`
              }}
            />

            {/* Clean Photo Container (Zero titles or captions) */}
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center border border-neutral-200/80 shadow-inner group">
              <picture className="w-full h-full flex items-center justify-center">
                {meme.webp && <source srcSet={meme.webp} type="image/webp" />}
                <img
                  src={meme.src}
                  alt="Coco Meme"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </picture>

              {/* Hover Zoom Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                <div className="bg-white/95 px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-sans font-bold text-neutral-900">
                  <ZoomIn className="w-3.5 h-3.5 text-rose-500" />
                  <span>Zoom</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-4 mb-8 flex items-center justify-center">
        <button
          onClick={() => {
            playPop();
            if (onBack) onBack();
          }}
          className="luxury-button px-8 py-3 rounded-full text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Fullscreen Single Photo Lightbox (Completely title-less and caption-less) */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full flex flex-col items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Pure Uncropped Photo */}
              <div className="relative rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl border border-white/20">
                <picture>
                  {selectedPhoto.webp && <source srcSet={selectedPhoto.webp} type="image/webp" />}
                  <img
                    src={selectedPhoto.src}
                    alt="Coco Meme"
                    className="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl"
                  />
                </picture>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
