import React from 'react';
import { birthdayData } from '../config/birthdayData';
import { Heart, Sparkles, Star } from 'lucide-react';

export default function ReasonsGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-600 font-heading text-xs font-semibold uppercase tracking-wider mb-3">
          <Star className="w-3.5 h-3.5 fill-sparkle text-sparkle" />
          <span>The Definitive List</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-charcoal mb-4">
          10 Reasons Why You're My Favorite Human ✨
        </h2>
        <p className="font-body text-charcoal/75 text-base sm:text-lg">
          Just in case you ever need a reminder of how rare, stunning, and irreplaceable you are.
        </p>
      </div>

      {/* Grid of 10 reasons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {birthdayData.reasonsWhy.map((reason) => (
          <div
            key={reason.number}
            className="group p-5 sm:p-6 rounded-2xl bg-white/80 hover:bg-white border border-blush-100 shadow-sm hover:shadow-clay-card hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
          >
            {/* Number Pill */}
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blush-100 to-lavender-100 border border-blush-200 flex items-center justify-center font-heading font-bold text-base text-blush-600 shadow-xs group-hover:scale-110 transition-transform">
              {reason.number}
            </div>

            {/* Text */}
            <div className="flex-1 pt-1">
              <p className="font-body text-base text-charcoal/90 leading-relaxed font-medium">
                {reason.text}
              </p>
            </div>

            {/* Mini Heart */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-blush-400">
              <Heart className="w-4 h-4 fill-blush-300" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
