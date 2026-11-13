import React from 'react';
import { birthdayData } from '../config/birthdayData';
import { Star, Heart } from 'lucide-react';

export default function ReasonsGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-4">
          10 Reasons You’re Irreplaceable
        </h2>
        <p className="font-sans text-white/80 text-base sm:text-lg font-light leading-relaxed">
          In case you ever forget how radiant, rare, and deeply adored you truly are.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {birthdayData.reasonsWhy.map((reason) => (
          <div
            key={reason.number}
            className="group p-6 sm:p-7 rounded-2xl glass-panel hover:bg-white/15 border border-white/20 hover:border-white/40 shadow-glass-card hover:shadow-glass-hover hover:-translate-y-1 transition-all duration-300 flex items-start gap-5"
          >
            {/* Number Pill */}
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center font-serif text-lg font-bold text-cosmic-champagne shadow-xs group-hover:scale-110 group-hover:bg-white/20 transition-all">
              {reason.number}
            </div>

            {/* Text */}
            <div className="flex-1 pt-1">
              <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed font-light tracking-wide">
                {reason.text}
              </p>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-cosmic-rose pt-1">
              <Heart className="w-4 h-4 fill-cosmic-rose" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
