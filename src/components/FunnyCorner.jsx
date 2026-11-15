import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, X, ZoomIn, Laugh, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';
import { playPop, playMeow } from '../utils/soundEffects';

export default function FunnyCorner() {
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [reactions, setReactions] = useState({});
  const [imgErrors, setImgErrors] = useState({});

  const memes = birthdayData.funnyMemes || [];

  // Spam Laugh emoji burst
  const triggerLaughBurst = () => {
    playMeow();
    // Confetti burst of funny colors
    confetti({
      particleCount: 45,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FDE047', '#EC4899', '#FB7185', '#38BDF8', '#A855F7']
    });
  };

  const handleReaction = (e, memeId) => {
    e.stopPropagation();
    playPop();
    setReactions((prev) => ({
      ...prev,
      [memeId]: (prev[memeId] || 0) + 1
    }));
  };

  const handleImageError = (memeId) => {
    setImgErrors((prev) => ({
      ...prev,
      [memeId]: true
    }));
  };

  return (
    <section id="funny-corner" className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto relative select-none">
      {/* Playful Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 font-mono text-xs font-bold uppercase tracking-[0.2em] mb-3 shadow-lg">
          <Laugh className="w-4 h-4 text-amber-300" />
          <span>Top Secret Chaos Vault</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-3 flex items-center justify-center gap-2 flex-wrap">
          <span>The Meme Vault</span>
          <span className="text-2xl sm:text-4xl animate-bounce">🤡💀</span>
        </h2>

        <p className="font-sans text-white/80 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
          A strictly confidential archive of Coco's most unhinged expressions, double chins, and certified 10/10 meme moments.
        </p>

        {/* Interactive Laugh Button */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={triggerLaughBurst}
            className="group px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-neutral-900 font-sans text-xs sm:text-sm font-bold tracking-wide shadow-lg hover:shadow-amber-400/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <span className="group-hover:rotate-12 transition-transform">😂</span>
            <span>Spam Laugh Track</span>
          </button>
        </div>
      </div>

      {/* Meme Polaroids Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {memes.map((meme, idx) => {
          const hasError = imgErrors[meme.id];
          const reactionCount = (reactions[meme.id] || 0) + 12 + idx * 7;

          return (
            <motion.div
              key={meme.id}
              whileHover={{ scale: 1.03, y: -4, rotate: 0 }}
              style={{ rotate: meme.rotation || '0deg' }}
              transition={{ type: 'spring', stiffness: 220, damping: 16 }}
              onClick={() => {
                playPop();
                setSelectedMeme(meme);
              }}
              className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.55)] cursor-pointer border border-neutral-200 group flex flex-col justify-between"
            >
              {/* Fun Washi Tape Pin at Top */}
              <div
                className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-200/80 backdrop-blur-xs border border-amber-300/60 shadow-sm z-20 pointer-events-none"
                style={{
                  clipPath: 'polygon(0% 0%, 95% 0%, 100% 100%, 5% 100%)',
                  transform: `translateX(-50%) rotate(${idx % 2 === 0 ? '-2deg' : '2deg'})`
                }}
              />

              {/* Meme Badge / Threat Level */}
              <div className="flex items-center justify-between mb-3 z-10 pt-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-900 text-amber-300 font-mono text-[10px] font-bold tracking-wider uppercase shadow-xs">
                  {meme.badge}
                </span>
                <span className="font-mono text-[10px] text-neutral-400 font-bold">
                  #{String(meme.id).padStart(2, '0')}
                </span>
              </div>

              {/* Photo Area */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center border border-neutral-200/80 shadow-inner group">
                {!hasError ? (
                  <picture className="w-full h-full flex items-center justify-center">
                    {meme.webp && <source srcSet={meme.webp} type="image/webp" />}
                    <img
                      src={meme.src}
                      alt={meme.title}
                      loading="lazy"
                      onError={() => handleImageError(meme.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </picture>
                ) : (
                  // Ready-to-fill Upload Slot Placeholder
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-800 to-neutral-900 border-2 border-dashed border-neutral-600 rounded-xl select-none">
                    <div className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-3">
                      <ImageIcon className="w-7 h-7 text-amber-300/80 animate-pulse" />
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-300 tracking-wider uppercase mb-1">
                      Slot #{meme.id} Ready
                    </span>
                    <p className="font-sans text-[11px] text-neutral-400 max-w-[180px] leading-snug">
                      Drop meme photo in <code className="text-amber-200">public/memes/meme{meme.id}.jpg</code>
                    </p>
                  </div>
                )}

                {/* Hover Zoom Stamp */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <div className="bg-white/95 px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-sans font-bold text-neutral-900">
                    <ZoomIn className="w-3.5 h-3.5 text-rose-500" />
                    <span>Inspect Chaos</span>
                  </div>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="pt-3 pb-1">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-rose-600 transition-colors leading-snug">
                  {meme.title}
                </h3>
                <p className="font-sans text-xs text-neutral-600 mt-1 leading-relaxed line-clamp-2">
                  "{meme.caption}"
                </p>
              </div>

              {/* Card Footer: Reaction button */}
              <div className="pt-2.5 mt-2 border-t border-neutral-100 flex items-center justify-between">
                <span className="font-sans text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                  Meme Archive
                </span>
                <button
                  onClick={(e) => handleReaction(e, meme.id)}
                  title="Spam this reaction"
                  className="px-2.5 py-1 rounded-full bg-neutral-100 hover:bg-rose-50 border border-neutral-200 text-neutral-800 text-xs font-bold flex items-center gap-1.5 active:scale-90 transition-all cursor-pointer"
                >
                  <span>{meme.reaction}</span>
                  <span className="font-mono text-[11px] text-neutral-600">{reactionCount}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Fullscreen Meme Inspector Modal */}
      <AnimatePresence>
        {selectedMeme && (
          <div
            onClick={() => setSelectedMeme(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-lg w-full rounded-3xl p-5 sm:p-6 shadow-2xl relative border border-white/80 max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMeme(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Threat Level Badge */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-neutral-900 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
                  {selectedMeme.badge}
                </span>
                <span className="font-mono text-xs text-neutral-400 font-bold">
                  Slot #{selectedMeme.id}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
                {selectedMeme.title}
              </h3>

              {/* Full Image or Upload Placeholder */}
              <div className="relative w-full rounded-2xl bg-neutral-900 flex items-center justify-center overflow-hidden my-3 shadow-inner min-h-[300px]">
                {!imgErrors[selectedMeme.id] ? (
                  <picture className="max-h-[60vh] w-auto max-w-full flex items-center justify-center">
                    {selectedMeme.webp && <source srcSet={selectedMeme.webp} type="image/webp" />}
                    <img
                      src={selectedMeme.src}
                      alt={selectedMeme.title}
                      onError={() => handleImageError(selectedMeme.id)}
                      className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl"
                    />
                  </picture>
                ) : (
                  <div className="p-8 text-center flex flex-col items-center">
                    <AlertTriangle className="w-12 h-12 text-amber-400 mb-3 animate-bounce" />
                    <h4 className="font-mono text-base font-bold text-white mb-1">
                      Ready for Photo Upload
                    </h4>
                    <p className="font-sans text-xs text-neutral-400 max-w-xs leading-relaxed">
                      Upload your image or tell me to drop your photo into{' '}
                      <code className="text-amber-300 font-mono">public/memes/meme{selectedMeme.id}.jpg</code>!
                    </p>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/80 mt-3">
                <p className="font-sans text-sm sm:text-base text-neutral-800 leading-relaxed text-center font-medium">
                  "{selectedMeme.caption}"
                </p>
              </div>

              {/* Modal Footer */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={(e) => handleReaction(e, selectedMeme.id)}
                  className="px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-neutral-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{selectedMeme.reaction}</span>
                  <span>React to this meme</span>
                </button>
                <button
                  onClick={() => setSelectedMeme(null)}
                  className="px-5 py-2 rounded-full bg-neutral-900 text-white font-sans text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-neutral-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
