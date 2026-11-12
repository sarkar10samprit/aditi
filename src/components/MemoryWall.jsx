import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Camera, Sparkles, X, ZoomIn, Heart } from 'lucide-react';

export default function MemoryWall() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="memories" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Camera className="w-3.5 h-3.5" />
          <span>Curated Moments</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-4">
          The Polaroid Archive
        </h2>
        <p className="font-sans text-white/80 text-base sm:text-lg font-light leading-relaxed">
          Moments frozen in time—unapologetic laughter, quiet late-night truths, and every second in between.
        </p>

        {/* Customization tip */}
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/30 backdrop-blur-md border border-white/15 text-xs text-white/80 font-sans">
          <span className="font-semibold text-cosmic-champagne">Photo placeholders ready:</span>
          <span>Drop your image files in <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">public/photos/</code> and link in <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-mono">birthdayData.js</code></span>
        </div>
      </div>

      {/* Grid of Exhibition Polaroids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {birthdayData.photos.map((item, index) => {
          const hasCustomImage = Boolean(item.src && item.src.trim().length > 0);

          return (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              style={{
                transform: `rotate(${item.rotation || '0deg'})`,
              }}
              className="group relative glass-card-light p-5 sm:p-6 rounded-2xl shadow-glass-card hover:shadow-glass-hover transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:z-20 cursor-pointer border border-white/60"
            >
              {/* Tape Accent */}
              <div
                style={{ backgroundColor: item.tapeColor || 'rgba(232, 114, 155, 0.45)' }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 rounded-sm opacity-90 shadow-xs transform -rotate-1 pointer-events-none z-10"
              />

              {/* Memory Tag */}
              <div className="absolute top-7 right-7 z-10 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-sm text-[10px] text-white/90 font-sans font-semibold tracking-wider uppercase">
                {item.date}
              </div>

              {/* Photo Area */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 border border-neutral-300 flex flex-col items-center justify-center p-6 text-center">
                {hasCustomImage ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3 text-neutral-500">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-neutral-400 group-hover:scale-110 group-hover:text-cosmic-rose transition-all duration-300">
                      <Camera className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <div>
                      <span className="font-serif text-base font-semibold text-neutral-800 block">
                        Memory Frame #{index + 1}
                      </span>
                      <span className="font-sans text-xs text-neutral-500 block mt-0.5">
                        Click to view memory note
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-cosmic-deep bg-cosmic-blush/25 px-2.5 py-0.5 rounded-full font-sans font-medium">
                      <Heart className="w-3 h-3 fill-cosmic-rose text-cosmic-rose" />
                      <span>Ready for photo</span>
                    </div>
                  </div>
                )}

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-cosmic-deep/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <div className="bg-white/95 px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5 text-xs font-sans font-semibold text-neutral-800">
                    <ZoomIn className="w-3.5 h-3.5 text-cosmic-rose" />
                    <span>Expand</span>
                  </div>
                </div>
              </div>

              {/* Elegant Typography */}
              <div className="pt-5 pb-1 text-center">
                <h3 className="font-serif text-xl font-bold text-neutral-900 group-hover:text-cosmic-rose transition-colors">
                  {item.title}
                </h3>
                <p className="font-serif italic text-base sm:text-lg text-neutral-700 mt-1.5 leading-snug line-clamp-2">
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
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-white/80"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cosmic-blush/30 text-cosmic-deep text-xs font-sans font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
              <span>{selectedPhoto.date}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
              {selectedPhoto.title}
            </h3>

            <div className="w-full aspect-video rounded-2xl bg-neutral-100 border border-neutral-200 flex flex-col items-center justify-center my-4 p-4 text-center">
              {selectedPhoto.src ? (
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="space-y-2 text-neutral-500">
                  <Camera className="w-9 h-9 mx-auto text-neutral-400" />
                  <p className="font-serif text-sm font-semibold text-neutral-800">
                    Blank Picture Frame Ready
                  </p>
                  <p className="text-xs text-neutral-500 max-w-xs font-sans">
                    Place your photo inside <code className="bg-neutral-200 px-1 py-0.5 rounded text-neutral-800">public/photos/</code> and link it in <code className="bg-neutral-200 px-1 py-0.5 rounded text-neutral-800">birthdayData.js</code>.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200">
              <p className="font-serif italic text-lg sm:text-xl text-neutral-800 leading-relaxed">
                "{selectedPhoto.caption}"
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="luxury-button px-6 py-2.5 rounded-full text-white font-sans text-xs font-semibold tracking-wider uppercase cursor-pointer"
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
