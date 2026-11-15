import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';

export default function WishJar() {
  const [inputWish, setInputWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const recipientEmail = birthdayData.recipientEmail || 'sarkarsamrprit08@gmail.com';

  const handleAddWish = async (e) => {
    e.preventDefault();
    const wish = inputWish.trim();
    if (!wish || isSubmitting) return;

    setIsSubmitting(true);

    // Safe offline local backup
    try {
      const existing = JSON.parse(localStorage.getItem('coco_wishes') || '[]');
      existing.push({ wish, date: new Date().toISOString() });
      localStorage.setItem('coco_wishes', JSON.stringify(existing));
    } catch (err) {}

    // Send directly to Gmail inbox via FormSubmit AJAX API
    try {
      await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'From': 'Coco ❤️',
          'Birthday Wish': wish,
          '_subject': '🎂 New Birthday Wish from Coco! ✨',
          '_template': 'table',
          '_captcha': 'false'
        })
      });
    } catch (err) {
      console.warn('Submission notice:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setInputWish('');

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E']
        });
      } catch (e) {}

      setTimeout(() => {
        setIsSubmitted(false);
      }, 6000);
    }
  };

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 max-w-4xl mx-auto relative">
      <div className="glass-panel p-6 sm:p-12 border border-white/25 shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
            <span>The Time Capsule</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
            Inscribe a Wish
          </h2>
        </div>

        {/* Typing Area / Form */}
        <form onSubmit={handleAddWish} className="max-w-xl mx-auto space-y-4">
          <div>
            <input
              type="text"
              value={inputWish}
              onChange={(e) => setInputWish(e.target.value)}
              placeholder="type your wish"
              disabled={isSubmitting}
              className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/25 focus:outline-none focus:ring-2 focus:ring-cosmic-rose font-sans text-sm text-white placeholder-white/40 backdrop-blur-md transition-all disabled:opacity-60"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full luxury-button py-3.5 rounded-2xl text-white font-sans font-semibold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-glow-rose active:scale-[0.99] transition-transform disabled:opacity-75 disabled:cursor-wait"
          >
            {isSubmitting ? (
              <>
                <Sparkles className="w-4 h-4 text-cosmic-gold animate-spin" />
                <span>Sealing Inside Capsule...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Seal Inside Capsule</span>
              </>
            )}
          </button>
        </form>

        {/* Submission Feedback */}
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
