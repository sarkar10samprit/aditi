import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Send, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WishJar() {
  const [wishes, setWishes] = useState(birthdayData.initialWishes);
  const [inputWish, setInputWish] = useState('');
  const [inputAuthor, setInputAuthor] = useState('');

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!inputWish.trim()) return;

    const newWish = {
      id: Date.now(),
      text: inputWish.trim(),
      author: inputAuthor.trim() || 'Secret Admirer 💖'
    };

    setWishes([newWish, ...wishes]);
    setInputWish('');
    setInputAuthor('');

    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.8 },
      colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E']
    });
  };

  return (
    <section className="py-24 px-4 sm:px-6 max-w-5xl mx-auto relative">
      <div className="glass-panel p-8 sm:p-14 border border-white/25 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
            <span>The Time Capsule</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white mb-3">
            Inscribe a Wish
          </h2>
          <p className="font-sans text-white/75 text-sm sm:text-base font-light">
            Leave an aspiration, a secret inside joke, or a blessing for this year.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAddWish} className="max-w-xl mx-auto mb-12 space-y-3.5">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inputWish}
              onChange={(e) => setInputWish(e.target.value)}
              placeholder="e.g. Endless travels, effortless victories, and boundless joy..."
              className="flex-1 px-4 py-3.5 rounded-2xl bg-white/10 border border-white/25 focus:outline-none focus:ring-2 focus:ring-cosmic-rose font-sans text-sm text-white placeholder-white/40 backdrop-blur-md"
            />
            <input
              type="text"
              value={inputAuthor}
              onChange={(e) => setInputAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full sm:w-44 px-4 py-3.5 rounded-2xl bg-white/10 border border-white/25 focus:outline-none focus:ring-2 focus:ring-cosmic-rose font-sans text-sm text-white placeholder-white/40 backdrop-blur-md"
            />
          </div>
          <button
            type="submit"
            className="w-full luxury-button py-3.5 rounded-2xl text-white font-sans font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-glow-rose"
          >
            <Send className="w-4 h-4" />
            <span>Seal Inside Capsule</span>
          </button>
        </form>

        {/* Wishes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md shadow-xs flex items-start gap-3.5 hover:bg-white/15 transition-all"
            >
              <div className="p-2 rounded-xl bg-cosmic-rose/20 text-cosmic-champagne flex-shrink-0 mt-0.5">
                <Heart className="w-4 h-4 fill-cosmic-champagne" />
              </div>
              <div className="flex-1">
                <p className="font-sans text-sm sm:text-base text-white/95 font-light leading-snug">
                  "{wish.text}"
                </p>
                <span className="block font-serif italic text-xs text-cosmic-champagne mt-1.5">
                  — {wish.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
