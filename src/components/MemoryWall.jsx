import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Camera, Heart, Sparkles, X, ZoomIn } from 'lucide-react';

export default function MemoryWall() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="memories" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush-100 text-blush-600 font-heading text-xs font-semibold uppercase tracking-wider mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Our Visual Journey</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-charcoal mb-4">
          The Polaroid Memory Wall 📸
        </h2>
        <p className="font-body text-charcoal/75 text-base sm:text-lg">
          Snapshots of laughter, late-night talks, and chaotic moments. Currently loaded with aesthetic placeholder frames ready for your memories!
        </p>

        {/* Helpful Tip for user */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 border border-blush-200 shadow-sm text-xs text-charcoal/80 font-body">
          <span className="font-semibold text-blush-600">💡 Customization note:</span>
          <span>Swap these blank cards with your real photos anytime in <code className="bg-blush-50 text-blush-700 px-1.5 py-0.5 rounded font-mono">birthdayData.js</code></span>
        </div>
      </div>

      {/* Polaroids Grid with 3D tilt and organic rotations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
        {birthdayData.photos.map((item, index) => {
          const hasCustomImage = Boolean(item.src && item.src.trim().length > 0);

          return (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              style={{
                transform: `rotate(${item.rotation || '0deg'})`,
              }}
              className="group relative bg-white p-4 sm:p-5 rounded-2xl shadow-polaroid hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:z-20 cursor-pointer border border-black/5"
            >
              {/* Cute Washi Tape at Top */}
              <div
                style={{ backgroundColor: item.tapeColor || 'rgba(255, 182, 193, 0.7)' }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 rounded-sm opacity-85 shadow-sm transform -rotate-1 backdrop-blur-xs pointer-events-none z-10"
              />

              {/* Memory Number Badge */}
              <div className="absolute top-6 right-6 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[11px] text-white font-heading font-medium tracking-wide">
                {item.date}
              </div>

              {/* Photo Area / Blank Placeholder */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#FFF5F7] via-[#FFF9F5] to-[#F7F3FF] border border-blush-100 flex flex-col items-center justify-center p-6 text-center group-hover:border-blush-300 transition-colors">
                {hasCustomImage ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-clay-card flex items-center justify-center text-blush-400 group-hover:scale-110 group-hover:text-blush-500 transition-all duration-300">
                      <Camera className="w-8 h-8 stroke-[1.6]" />
                    </div>
                    <div>
                      <span className="font-heading text-sm font-semibold text-charcoal/80 block">
                        Photo Placeholder #{index + 1}
                      </span>
                      <span className="font-body text-xs text-charcoal/50 block mt-0.5">
                        Click to preview caption & memory
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-blush-600 bg-blush-100/70 px-2.5 py-0.5 rounded-full font-heading">
                      <Heart className="w-3 h-3 fill-blush-400 text-blush-400" />
                      <span>Ready for your photo</span>
                    </div>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-blush-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/95 px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 text-xs font-heading font-semibold text-blush-600 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View Memory</span>
                  </div>
                </div>
              </div>

              {/* Handwritten Title & Caption */}
              <div className="pt-4 pb-2 text-center">
                <h3 className="font-heading text-lg font-bold text-charcoal group-hover:text-blush-600 transition-colors">
                  {item.title}
                </h3>
                <p className="font-handwriting text-xl sm:text-2xl text-charcoal/80 mt-1 leading-snug line-clamp-2">
                  "{item.caption}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-pulse-soft border border-blush-100"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-blush-50 text-charcoal/70 hover:text-blush-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100 text-blush-600 text-xs font-heading font-semibold mb-3">
              <Sparkles className="w-3 h-3 text-sparkle" />
              <span>{selectedPhoto.date}</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-charcoal mb-2">
              {selectedPhoto.title}
            </h3>

            {/* Photo frame in modal */}
            <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-blush-50 to-lavender-50 border border-blush-200 flex flex-col items-center justify-center my-4 p-4 text-center">
              {selectedPhoto.src ? (
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="space-y-2">
                  <Camera className="w-10 h-10 text-blush-400 mx-auto" />
                  <p className="font-heading text-sm font-semibold text-charcoal">
                    Blank Picture Frame Ready
                  </p>
                  <p className="text-xs text-charcoal/60 max-w-xs font-body">
                    When you are ready, add your photo image file to <code className="bg-white px-1.5 py-0.5 rounded text-blush-600">public/photos/</code> and link it in <code className="bg-white px-1.5 py-0.5 rounded text-blush-600">birthdayData.js</code>.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-blush-50/70 p-4 rounded-2xl border border-blush-100">
              <p className="font-handwriting text-2xl text-charcoal leading-relaxed">
                "{selectedPhoto.caption}"
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="clay-button px-6 py-2 rounded-full text-white font-heading text-sm font-semibold cursor-pointer"
              >
                Close Memory
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
