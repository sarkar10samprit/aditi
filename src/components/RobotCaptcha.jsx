import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Check, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime, playPop } from '../utils/soundEffects';

const RAW_ITEMS = [
  { id: 'cat_stare', src: `${import.meta.env.BASE_URL}captcha/cat_stare.webp`, isCat: true, name: 'Staring Cat' },
  { id: 'cat_rose', src: `${import.meta.env.BASE_URL}captcha/cat_rose.webp`, isCat: true, name: 'Romantic Cat' },
  { id: 'cat_thug', src: `${import.meta.env.BASE_URL}captcha/cat_thug.webp`, isCat: true, name: 'Thug Life Cat' },
  { id: 'cat_cute', src: `${import.meta.env.BASE_URL}captcha/cat_cute.webp`, isCat: true, name: 'Cute Kitten' },
  { id: 'tiger_squat', src: `${import.meta.env.BASE_URL}captcha/tiger_squat.webp`, isCat: 'tiger', name: 'Squatting Tiger' },
  { id: 'dog_rock', src: `${import.meta.env.BASE_URL}captcha/dog_rock.webp`, isCat: false, animal: 'dog', name: 'Rock Dog' },
  { id: 'dog_shiba', src: `${import.meta.env.BASE_URL}captcha/dog_shiba.webp`, isCat: false, animal: 'dog', name: 'Shiba Inu' },
  { id: 'horse_eyebrow', src: `${import.meta.env.BASE_URL}captcha/horse_eyebrow.webp`, isCat: false, animal: 'horse', name: 'Sassy Horse' },
  { id: 'monkey_plot', src: `${import.meta.env.BASE_URL}captcha/monkey_plot.webp`, isCat: false, animal: 'monkey', name: 'Plotting Monkey' },
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function RobotCaptcha({ onSuccess }) {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Shuffle 3x3 items on initial mount
  useEffect(() => {
    setItems(shuffleArray(RAW_ITEMS));
  }, []);

  const handleReshuffle = () => {
    playPop();
    setItems(shuffleArray(RAW_ITEMS));
    setSelected([]);
    setErrorMsg('');
  };

  const handleToggleTile = (id) => {
    playPop();
    setErrorMsg('');
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleVerify = () => {
    const catIds = ['cat_stare', 'cat_rose', 'cat_thug', 'cat_cute'];
    const nonCatIds = ['dog_rock', 'dog_shiba', 'horse_eyebrow', 'monkey_plot'];

    const hasSelectedAllCats = catIds.every((id) => selected.includes(id));
    const selectedNonCats = nonCatIds.filter((id) => selected.includes(id));
    const hasNoNonCats = selectedNonCats.length === 0;

    if (selected.length === 0) {
      setErrorMsg('Select all squares with a cat first! 🐾');
      triggerShake();
      return;
    }

    if (!hasNoNonCats) {
      if (selected.includes('monkey_plot')) {
        setErrorMsg("That's a plotting monkey, not a kitty! 🐒");
      } else if (selected.includes('horse_eyebrow')) {
        setErrorMsg("That horse is giving you the side-eye! 🐴");
      } else {
        setErrorMsg("That good boy is barking, not meowing! 🐶");
      }
      triggerShake();
      return;
    }

    if (!hasSelectedAllCats) {
      const remaining = 4 - catIds.filter((id) => selected.includes(id)).length;
      setErrorMsg(`Almost there! You missed ${remaining} ${remaining === 1 ? 'cat' : 'cats'} 🐾`);
      triggerShake();
      return;
    }

    // Success! All cats selected, zero non-cats
    playChime();
    setIsSuccess(true);
    setErrorMsg('');

    // Trigger instant background music start on this direct user gesture
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('unlock-success'));
    }

    confetti({
      particleCount: 55,
      spread: 85,
      origin: { y: 0.5 },
      colors: ['#F472B6', '#34D399', '#FCD34D', '#FFFFFF']
    });

    setTimeout(() => {
      onSuccess();
    }, 750);
  };

  const triggerShake = () => {
    playPop();
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        x: isShaking ? [-8, 8, -6, 6, -3, 3, 0] : 0
      }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] rounded-[32px] p-5 sm:p-6 flex flex-col items-center border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-2xl"
      style={{
        background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 60%, rgba(232, 114, 155, 0.08) 100%)',
      }}
    >
      {/* Top Cute Header Banner */}
      <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500/30 to-rose-400/20 border border-pink-400/30 flex items-center justify-center shadow-inner">
            <ShieldCheck className="w-4 h-4 text-pink-300" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-mono text-[10px] tracking-widest uppercase text-pink-300 font-bold">
              Robot Verification
            </span>
            <span className="font-serif italic text-xs text-pink-100/90">
              Select all squares with a <strong className="text-white font-bold not-italic font-sans">cat</strong>
            </span>
          </div>
        </div>

        {/* Reshuffle / Refresh Button */}
        <button
          type="button"
          onClick={handleReshuffle}
          title="Shuffle tiles"
          className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-pink-200 hover:text-white transition-all cursor-pointer active:scale-90"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3x3 Shuffled Image Grid */}
      <div className="grid grid-cols-3 gap-2 w-full aspect-square mb-3">
        {items.map((item) => {
          const isSelected = selected.includes(item.id);
          return (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.93 }}
              onClick={() => handleToggleTile(item.id)}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 border aspect-square ${
                isSelected
                  ? 'border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.5)] scale-[0.98]'
                  : 'border-white/15 hover:border-pink-300/40 hover:scale-[1.02]'
              }`}
            >
              {/* Tile Image */}
              <img
                src={item.src}
                alt={item.name}
                loading="eager"
                decoding="sync"
                className="w-full h-full object-cover pointer-events-none select-none transition-transform duration-300"
              />

              {/* Tint overlay when selected */}
              {isSelected && (
                <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[0.5px] pointer-events-none" />
              )}

              {/* Checkmark Badge */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-emerald-500 border border-white flex items-center justify-center shadow-md pointer-events-none"
                  >
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Error or Hint Feedback Banner */}
      <div className="h-6 flex items-center justify-center w-full mb-2">
        {errorMsg ? (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-[11px] font-semibold text-rose-300 tracking-wide text-center"
          >
            {errorMsg}
          </motion.span>
        ) : (
          <span className="font-sans text-[10px] text-pink-200/60 uppercase tracking-widest text-center">
            {selected.length === 0 ? 'Tap every square with a cat' : `${selected.length} tile${selected.length > 1 ? 's' : ''} selected`}
          </span>
        )}
      </div>

      {/* Verify Button (Liquid Emerald Glass) */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleVerify}
        type="button"
        disabled={isSuccess}
        className={`w-full py-3 rounded-2xl font-sans text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
          isSuccess
            ? 'bg-emerald-500 text-white border-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.7)]'
            : selected.length > 0
            ? 'bg-gradient-to-r from-emerald-500/80 to-teal-500/80 text-white border-emerald-400/50 shadow-[0_6px_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_22px_rgba(52,211,153,0.55)]'
            : 'bg-white/10 text-white/50 border-white/15'
        }`}
      >
        {isSuccess ? (
          <>
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Verified Human! 🐾</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Verify 🐾</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
}
