import React from 'react';
import { birthdayData } from '../config/birthdayData';
import { Star, Heart } from 'lucide-react';
import AestheticSticker from './AestheticSticker';

export default function ReasonsGrid() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto relative overflow-visible">
      {/* Aesthetic Scrapbook Stickers */}
      <AestheticSticker
        name="guitar"
        alt="Electric Guitar"
        className="top-12 -left-2 sm:left-2 lg:-left-12"
        rotate={-8}
        size="w-14 sm:w-20 md:w-24"
      />
      <AestheticSticker
        name="headphones"
        alt="Ribbon Headphones"
        className="top-14 -right-2 sm:right-2 lg:-right-12"
        rotate={10}
        size="w-16 sm:w-22 md:w-26"
      />
      <AestheticSticker
        name="coca_cola"
        alt="Coca Cola Can"
        className="bottom-6 -right-2 sm:right-4 lg:-right-10"
        rotate={6}
        size="w-12 sm:w-16 md:w-20"
      />
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-4">
          🎀 10 Reasons You're Irreplaceable
        </h2>
        <p className="font-sans text-white/80 text-base sm:text-lg font-light leading-relaxed italic">
          In case you ever forget just how special, beautiful, and incredibly loved you are.
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

            {/* Content */}
            <div className="flex-1 pt-1">
              <h3 className="font-serif text-lg sm:text-xl font-normal text-white mb-2 group-hover:text-cosmic-champagne transition-colors">
                {reason.title}
              </h3>
              <p className="font-sans text-sm sm:text-base text-white/80 leading-relaxed font-light tracking-wide">
                {reason.text}
              </p>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-cosmic-rose pt-1">
              <Heart className="w-4 h-4 fill-cosmic-rose" />
            </div>
          </div>
        ))}
      </div>

      {/* Closing Banner */}
      {birthdayData.reasonsClosing && (
        <div className="mt-8 sm:mt-10 text-center max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl glass-panel border border-white/20 shadow-glass-card">
          <h3 className="font-serif text-2xl sm:text-4xl text-white mb-3 font-normal">
            {birthdayData.reasonsClosing.title}
          </h3>
          <p className="font-sans text-white/85 text-sm sm:text-base italic font-light leading-relaxed max-w-xl mx-auto">
            {birthdayData.reasonsClosing.subtext}
          </p>
        </div>
      )}
    </section>
  );
}
