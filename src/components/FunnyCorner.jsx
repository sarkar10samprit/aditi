import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';
import { playPop } from '../utils/soundEffects';

export default function FunnyCorner({ initialOpen = false, isMemeMode = false, onSwitchToMain = null }) {
  const [isChamberOpen, setIsChamberOpen] = useState(initialOpen);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (initialOpen) {
      setIsChamberOpen(true);
    }
  }, [initialOpen]);

  const memes = birthdayData.funnyMemes || [];

  // Lock body scroll when chamber or zoom modal is open
  useEffect(() => {
    if (isChamberOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isChamberOpen]);

  // Handle ESC key to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedPhoto) {
          setSelectedPhoto(null);
        } else if (isChamberOpen) {
          setIsChamberOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, isChamberOpen]);

  return (
    <section id="funny-corner" className="py-10 sm:py-14 px-4 sm:px-6 max-w-4xl mx-auto select-none">
      {/* Main Page Portal Card */}
      <div className="relative glass-card-light p-6 sm:p-10 rounded-3xl border border-white/60 shadow-glass-card hover:shadow-glass-hover transition-all text-center flex flex-col items-center justify-center overflow-hidden group">
        {/* Ambient Back Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Section Title & Subtitle */}
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-neutral-900 mb-2">
          The meme corner 😂🌚
        </h2>
        <p className="font-sans text-sm sm:text-base text-neutral-700 font-medium mb-6">
          Birthday pe ye vi toh chalta haiii
        </p>

        {/* Enter Chamber Button */}
        <button
          onClick={() => {
            playPop();
            setIsChamberOpen(true);
          }}
          className="luxury-button px-8 py-3.5 rounded-full text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
        >
          <span>Open Meme Chamber 🚪😂</span>
        </button>
      </div>

      {/* Secret Fullscreen Chamber Modal */}
      <AnimatePresence>
        {isChamberOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-xl overflow-y-auto px-4 py-8 sm:p-10 flex flex-col items-center"
          >
            {/* Top Bar with Navigation & Title */}
            <div className="w-full max-w-6xl flex items-center justify-between pb-6 border-b border-white/10 sticky top-0 z-30 bg-black/40 backdrop-blur-md pt-2 px-2">
              <div>
                <h3 className="font-serif text-2xl sm:text-4xl font-normal text-white flex items-center gap-2">
                  The meme corner 😂🌚
                </h3>
                <p className="font-sans text-xs sm:text-sm text-pink-200/80 font-normal mt-0.5">
                  {isMemeMode
                    ? '🎉 Secret Passcode 654 Unlocked! Birthday pe ye vi toh chalta haiii'
                    : 'Birthday pe ye vi toh chalta haiii'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {onSwitchToMain && (
                  <button
                    onClick={() => {
                      playPop();
                      setIsChamberOpen(false);
                      onSwitchToMain();
                    }}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/80 to-rose-400/80 hover:from-pink-500 hover:to-rose-400 text-white font-sans text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-pink-300/40 shadow-[0_0_15px_rgba(232,114,155,0.4)]"
                  >
                    <span>Romantic Sanctuary 🌸✨</span>
                  </button>
                )}

                {/* Close Chamber Button */}
                <button
                  onClick={() => {
                    playPop();
                    setIsChamberOpen(false);
                  }}
                  className="px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                </button>
              </div>
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

            {/* Bottom Action Buttons */}
            <div className="mt-4 mb-8 flex flex-col sm:flex-row items-center gap-3">
              {onSwitchToMain && (
                <button
                  onClick={() => {
                    playPop();
                    setIsChamberOpen(false);
                    onSwitchToMain();
                  }}
                  className="luxury-button px-8 py-3 rounded-full text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase cursor-pointer"
                >
                  Switch to Romantic Sanctuary 🌸✨
                </button>
              )}
              <button
                onClick={() => {
                  playPop();
                  setIsChamberOpen(false);
                }}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-xs sm:text-sm font-semibold tracking-wider cursor-pointer border border-white/20"
              >
                Close Chamber 🚪
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </section>
  );
}
