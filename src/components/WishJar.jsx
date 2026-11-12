import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Sparkles, Send, Heart, MessageSquareHeart } from 'lucide-react';
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
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#FF9EAA', '#E8D5FF', '#FFD166']
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto relative">
      <div className="clay-card p-8 sm:p-12 relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blush-100 text-blush-600 font-heading text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>Interactive Wish Capsule</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-3">
            Drop a Wish in the Jar 🏺✨
          </h2>
          <p className="font-body text-charcoal/70 text-sm sm:text-base">
            Leave a cute wish, goal, or inside joke for this upcoming year.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAddWish} className="max-w-xl mx-auto mb-10 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={inputWish}
              onChange={(e) => setInputWish(e.target.value)}
              placeholder="e.g. Catch flights together, zero drama this year..."
              className="flex-1 px-4 py-3 rounded-2xl bg-white border border-blush-200 focus:outline-none focus:ring-2 focus:ring-blush-400 font-body text-sm text-charcoal shadow-xs"
            />
            <input
              type="text"
              value={inputAuthor}
              onChange={(e) => setInputAuthor(e.target.value)}
              placeholder="Your name or alias"
              className="w-full sm:w-44 px-4 py-3 rounded-2xl bg-white border border-blush-200 focus:outline-none focus:ring-2 focus:ring-blush-400 font-body text-sm text-charcoal shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="w-full clay-button py-3 rounded-2xl text-white font-heading font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            <Send className="w-4 h-4" />
            <span>Drop Wish Into Capsule ✨</span>
          </button>
        </form>

        {/* Floating Wish Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="p-4 rounded-2xl bg-white/90 border border-blush-100 shadow-xs flex items-start gap-3 hover:shadow-sm transition-shadow"
            >
              <div className="p-2 rounded-xl bg-blush-50 text-blush-500 flex-shrink-0 mt-0.5">
                <Heart className="w-4 h-4 fill-blush-400" />
              </div>
              <div className="flex-1">
                <p className="font-body text-sm text-charcoal/90 font-medium leading-snug">
                  "{wish.text}"
                </p>
                <span className="block font-heading text-xs text-blush-500 font-semibold mt-1">
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
