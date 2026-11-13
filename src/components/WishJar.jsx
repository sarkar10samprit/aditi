import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WishJar() {
  const [inputWish, setInputWish] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!inputWish.trim()) return;

    setIsSubmitted(true);
    setInputWish('');

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E']
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto relative">
      <div className="glass-panel p-8 sm:p-14 border border-white/25 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
            <span>The Time Capsule</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-3">
            Inscribe a Wish
          </h2>
          <p className="font-sans text-white/75 text-sm sm:text-base font-light">
            type your wish
          </p>
        </div>

        {/* Typing Area / Form */}
        <form onSubmit={handleAddWish} className="max-w-xl mx-auto space-y-4">
          <div>
            <input
              type="text"
              value={inputWish}
              onChange={(e) => setInputWish(e.target.value)}
              placeholder="Type your wish for Coco here..."
              className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/25 focus:outline-none focus:ring-2 focus:ring-cosmic-rose font-sans text-sm text-white placeholder-white/40 backdrop-blur-md"
            />
          </div>

          <button
            type="submit"
            className="w-full luxury-button py-3.5 rounded-2xl text-white font-sans font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-glow-rose active:scale-[0.99] transition-transform"
          >
            <Send className="w-4 h-4" />
            <span>Seal Inside Capsule</span>
          </button>
        </form>

        {/* Temporary Submission Feedback */}
        {isSubmitted && (
          <div className="mt-6 flex items-center justify-center gap-2 text-cosmic-champagne font-sans text-sm animate-pulse-subtle">
            <CheckCircle2 className="w-4 h-4 text-cosmic-gold" />
            <span>Your wish has been sealed inside the capsule for Coco ✨</span>
          </div>
        )}
      </div>
    </section>
  );
}
