import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime, playPop } from '../utils/soundEffects';

export default function PasswordGate({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const CORRECT_PASS = '456';

  // Listen to physical keyboard events (0-9, Backspace, Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        if (pin.length < 3) {
          handleDigitPress(e.key);
        }
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  const handleDigitPress = (digit) => {
    playPop();
    setError(false);
    if (pin.length < 3) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 3) {
        verifyPin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    playPop();
    setError(false);
    setPin((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    verifyPin(pin);
  };

  const verifyPin = (codeToVerify) => {
    if (codeToVerify === CORRECT_PASS) {
      playChime();
      setIsVerifying(true);
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#F472B6', '#FCD34D', '#34D399', '#FFFFFF']
      });

      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setError(true);
      playPop();
      setTimeout(() => {
        setPin('');
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 select-none overflow-hidden bg-[#180410]">
      {/* Ambient Cosmic Liquid Glows */}
      <div className="absolute inset-0 bg-radial from-[#380E23] via-[#1A0411] to-[#0A0107] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rose-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-400/15 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Central Glassmorphism Liquid Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[340px] sm:max-w-[370px] rounded-[32px] p-6 sm:p-7 flex flex-col items-center border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-2xl"
        style={{
          background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 60%, rgba(232, 114, 155, 0.08) 100%)',
        }}
      >
        {/* Liquid Glowing Lock Emblem */}
        <div className="w-14 h-14 rounded-2xl mb-3 flex items-center justify-center relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_25px_rgba(0,0,0,0.4)] border border-white/25 bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-md">
          {isVerifying ? (
            <Unlock className="w-6 h-6 text-emerald-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-bounce" />
          ) : (
            <Lock className="w-6 h-6 text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.6)]" />
          )}
        </div>

        {/* Title Matching Main Page Aesthetics */}
        <h1 className="font-serif italic text-2xl sm:text-3xl font-normal text-pink-100 text-center tracking-wide">
          Secret Sanctuary
        </h1>
        <p className="font-sans text-[11px] sm:text-xs text-pink-200/70 text-center tracking-wider uppercase mt-1 mb-6">
          Enter 3-digit passcode for Coco
        </p>

        {/* 3 Liquid Glass PIN Display Pods */}
        <motion.div
          animate={error ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
          transition={{ duration: 0.35 }}
          className="flex items-center justify-center gap-3.5 mb-7"
        >
          {[0, 1, 2].map((idx) => {
            const digit = pin[idx];
            return (
              <div
                key={idx}
                className={`w-14 h-15 rounded-2xl flex items-center justify-center font-mono text-2xl font-bold transition-all duration-300 ${
                  error
                    ? 'border-rose-400/80 bg-rose-500/20 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                    : isVerifying
                    ? 'border-emerald-400/80 bg-emerald-500/25 text-emerald-200 shadow-[0_0_25px_rgba(52,211,153,0.6)]'
                    : digit
                    ? 'border-pink-300/60 bg-gradient-to-b from-white/25 to-pink-500/20 text-white shadow-[0_0_18px_rgba(232,114,155,0.45),inset_0_1px_1px_rgba(255,255,255,0.5)] scale-105'
                    : 'border-white/15 bg-white/[0.04] text-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]'
                } border backdrop-blur-md`}
              >
                {digit ? digit : '•'}
              </div>
            );
          })}
        </motion.div>

        {/* Liquid Keypad: Numbers 1-9, Erase, 0, Custom Liquid Tick */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {/* Numbers 1 through 9 */}
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <motion.button
              key={num}
              whileTap={{ scale: 0.91 }}
              onClick={() => handleDigitPress(num)}
              type="button"
              className="h-13.5 rounded-2xl font-sans text-xl font-medium text-pink-100 flex items-center justify-center cursor-pointer transition-all border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_6px_16px_rgba(0,0,0,0.3)] hover:border-pink-300/40 hover:shadow-[0_0_15px_rgba(232,114,155,0.3)] active:bg-white/20 backdrop-blur-md"
              style={{
                background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 100%)'
              }}
            >
              {num}
            </motion.button>
          ))}

          {/* Erase / Backspace Liquid Button */}
          <motion.button
            whileTap={{ scale: 0.91 }}
            onClick={handleBackspace}
            type="button"
            title="Erase"
            className="h-13.5 rounded-2xl flex items-center justify-center cursor-pointer transition-all border border-rose-300/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_6px_16px_rgba(0,0,0,0.3)] hover:border-rose-400/40 hover:shadow-[0_0_15px_rgba(244,114,182,0.3)] backdrop-blur-md text-pink-200"
            style={{
              background: 'linear-gradient(145deg, rgba(244, 114, 182, 0.22) 0%, rgba(255, 255, 255, 0.04) 100%)'
            }}
          >
            {/* Custom Handcrafted Liquid Erase Icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              <path
                d="M 20 6 L 9 6 L 3.5 12 L 9 18 L 20 18 C 20.6 18 21 17.6 21 17 L 21 7 C 21 6.4 20.6 6 20 6 Z M 12 9.5 L 16.5 14.5 M 16.5 9.5 L 12 14.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>

          {/* Number 0 */}
          <motion.button
            whileTap={{ scale: 0.91 }}
            onClick={() => handleDigitPress('0')}
            type="button"
            className="h-13.5 rounded-2xl font-sans text-xl font-medium text-pink-100 flex items-center justify-center cursor-pointer transition-all border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_6px_16px_rgba(0,0,0,0.3)] hover:border-pink-300/40 hover:shadow-[0_0_15px_rgba(232,114,155,0.3)] active:bg-white/20 backdrop-blur-md"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.04) 100%)'
            }}
          >
            0
          </motion.button>

          {/* Custom Liquid Tick Button (No emoji, custom handcrafted SVG tick) */}
          <motion.button
            whileTap={{ scale: 0.91 }}
            onClick={handleSubmit}
            type="button"
            title="Unlock"
            className="h-13.5 rounded-2xl flex items-center justify-center cursor-pointer transition-all border border-emerald-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_20px_rgba(16,185,129,0.35)] hover:border-emerald-300 hover:shadow-[0_0_22px_rgba(52,211,153,0.55)] backdrop-blur-md text-emerald-300"
            style={{
              background: 'linear-gradient(145deg, rgba(52, 211, 153, 0.32) 0%, rgba(16, 185, 129, 0.12) 100%)'
            }}
          >
            {/* Custom Handcrafted Vector Tick Icon */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-[0_0_8px_rgba(52,211,153,0.85)]">
              <path
                d="M 4.5 12.5 L 9.5 17.5 L 19.5 6.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
