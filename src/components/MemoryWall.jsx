import React, { useState, useEffect, useCallback } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Camera, Sparkles, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { playPop } from '../utils/soundEffects';
import AestheticSticker from './AestheticSticker';

export default function MemoryWall() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const currentIndex = selectedPhoto
    ? birthdayData.photos.findIndex((p) => p.id === selectedPhoto.id)
    : -1;

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    playPop();
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + birthdayData.photos.length) % birthdayData.photos.length;
    setSelectedPhoto(birthdayData.photos[prevIdx]);
  }, [currentIndex]);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    playPop();
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % birthdayData.photos.length;
    setSelectedPhoto(birthdayData.photos[nextIdx]);
  }, [currentIndex]);

  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, handlePrev, handleNext]);

  return (
    <section id="memories" className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto relative overflow-visible">
      {/* Aesthetic Scrapbook Stickers */}
      <AestheticSticker
        name="canon_camera"
        alt="Vintage Canon Camera"
        className="top-10 left-2 sm:left-4 lg:-left-10"
        rotate={-8}
        size="w-16 sm:w-22 md:w-26"
      />
      <AestheticSticker
        name="moon"
        alt="Full Moon"
        className="top-8 right-2 sm:right-6 lg:-right-8"
        rotate={14}
        size="w-12 sm:w-16 md:w-20"
      />
      <AestheticSticker
        name="vinyl_record"
        alt="Vinyl Record"
        className="-bottom-4 right-3 sm:right-8 lg:-right-10"
        rotate={22}
        size="w-14 sm:w-20 md:w-24"
      />
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Camera className="w-3.5 h-3.5 text-cosmic-gold" />
          <span>Curated Moments</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-4">
          The Memory Archive
        </h2>
        <p className="font-sans text-white/80 text-base sm:text-lg font-light leading-relaxed">
          Moments frozen in time—unapologetic laughter, quiet late-night truths, and memories saved forever.
        </p>
      </div>

      {/* Grid of Exhibition Cards (Clean, Modern & Uncropped) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {birthdayData.photos.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                playPop();
                setSelectedPhoto(item);
              }}
              className="group relative glass-card-light p-4 sm:p-5 rounded-3xl shadow-glass-card hover:shadow-glass-hover transition-all duration-300 hover:scale-[1.025] hover:-translate-y-1 cursor-pointer border border-white/80"
            >
              {/* Photo Area with 9:16 vertical ratio matching the aesthetic collage */}
              <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-neutral-900/10 shadow-md">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Date Tag */}
                <div className="absolute top-3.5 right-3.5 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-white/95 font-sans font-semibold tracking-wider uppercase shadow-xs">
                  {item.date}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <div className="bg-white/95 px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5 text-xs font-sans font-semibold text-neutral-800">
                    <ZoomIn className="w-3.5 h-3.5 text-cosmic-rose" />
                    <span>Expand Photo</span>
                  </div>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="pt-4 pb-1 text-center">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-cosmic-rose transition-colors leading-snug">
                  {item.title}
                </h3>
                {item.caption && (
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 mt-1.5 leading-relaxed line-clamp-2 px-1 font-normal">
                    "{item.caption}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-lg w-full rounded-3xl p-5 sm:p-7 shadow-2xl relative border border-white/80 max-h-[95vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="flex items-center justify-between mb-2 pr-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cosmic-blush/30 text-cosmic-deep text-xs font-sans font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
                <span>{selectedPhoto.date}</span>
              </div>
              <span className="font-mono text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                {currentIndex + 1} / {birthdayData.photos.length}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-3 text-center">
              {selectedPhoto.title}
            </h3>

            {/* Full Uncropped Photo */}
            <div className="relative w-full rounded-2xl bg-neutral-900/5 flex items-center justify-center overflow-hidden my-3 shadow-inner">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[62vh] w-auto max-w-full object-contain rounded-xl shadow-xs"
              />

              {/* Carousel Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-900 shadow-md flex items-center justify-center transition-all hover:scale-105 cursor-pointer z-10"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-neutral-900 shadow-md flex items-center justify-center transition-all hover:scale-105 cursor-pointer z-10"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Caption Box */}
            {selectedPhoto.caption && (
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 mt-3">
                <p className="font-serif italic text-base sm:text-lg text-neutral-800 leading-relaxed text-center">
                  "{selectedPhoto.caption}"
                </p>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-4 flex items-center justify-end">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="luxury-button px-6 py-2 rounded-full text-white font-sans text-xs font-semibold tracking-wider uppercase cursor-pointer"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
