import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  Check, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Lock, 
  Unlock,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playChime, playPop } from '../utils/soundEffects';

export default function PasswordGate({ onUnlock, isAssetsReady }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [hintMessage, setHintMessage] = useState('');
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
        // Auto-verify on 3rd digit
        verifyPin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    playPop();
    setError(false);
    setPin((prev) => prev.slice(0, -1));
  };

  const handleNext = () => {
    playPop();
    if (pin.length === 0) {
      setHintMessage('💡 Tap 4, 5, 6 to enter Coco\'s birthday sanctuary!');
    } else {
      setHintMessage(`Current code: "${pin}". Passcode is 3 digits.`);
    }
  };

  const handleSend = () => {
    playPop();
    setHintMessage('📲 Hint dispatched from Samprit: "The passcode is 456!"');
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
        spread: 75,
        origin: { y: 0.5 },
        colors: ['#34D399', '#60A5FA', '#F472B6', '#FCD34D']
      });

      // Wait a moment for celebration feedback before unlocking
      setTimeout(() => {
        onUnlock();
      }, 700);
    } else {
      setError(true);
      playPop();
      setHintMessage('❌ Incorrect key. Try 456 or tap "E-mail" / "Phone" below!');
      setTimeout(() => {
        setPin('');
      }, 750);
    }
  };

  const triggerModalHint = (type) => {
    playPop();
    if (type === 'phone') {
      setHintMessage('📞 Dialing Samprit... "Hey Coco, type 456 to enter!"');
    } else if (type === 'email') {
      setHintMessage('✉️ New Message: From Samprit • "Passcode is 456"');
    } else if (type === 'address') {
      setHintMessage('📍 Location: Coco\'s 18th Birthday Sanctuary');
    } else if (type === 'web') {
      setHintMessage('🌐 hbdcoco-18.vercel.app • Verified VIP Portal');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 select-none overflow-y-auto"
      style={{
        backgroundColor: '#F8FAFC',
        backgroundImage: `
          linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px'
      }}
    >
      {/* Central Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.04)] border border-slate-200/90 p-6 sm:p-8 flex flex-col items-center my-auto"
      >
        {/* Lock Icon & Header */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-100 to-white shadow-inner border border-slate-200 flex items-center justify-center mb-3.5">
          {isVerifying ? (
            <Unlock className="w-6 h-6 text-emerald-500 animate-bounce" />
          ) : (
            <Lock className="w-6 h-6 text-slate-700" />
          )}
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 text-center tracking-tight">
          Sanctuary Access
        </h1>
        <p className="font-sans text-xs text-slate-500 text-center mt-1 mb-5">
          Enter 3-digit security code to unlock Coco's celebration
        </p>

        {/* 3 PIN Display Boxes */}
        <motion.div 
          animate={error ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-3.5 mb-5"
        >
          {[0, 1, 2].map((idx) => {
            const digit = pin[idx];
            return (
              <div
                key={idx}
                className={`w-13 h-14 sm:w-14 sm:h-15 rounded-2xl flex items-center justify-center font-mono text-2xl font-bold transition-all duration-200 ${
                  error
                    ? 'border-2 border-rose-400 bg-rose-50 text-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                    : isVerifying
                    ? 'border-2 border-emerald-400 bg-emerald-50 text-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                    : digit
                    ? 'border-2 border-slate-700 bg-slate-50 text-slate-800 shadow-sm'
                    : 'border-2 border-slate-200 bg-white text-slate-300'
                }`}
              >
                {digit ? digit : '•'}
              </div>
            );
          })}
        </motion.div>

        {/* Dynamic Hint / Status Banner */}
        <div className="min-h-[22px] flex items-center justify-center mb-3">
          {hintMessage && (
            <p className="font-sans text-xs font-semibold text-slate-600 text-center animate-fade-in">
              {hintMessage}
            </p>
          )}
        </div>

        {/* Numeric Keypad for Mobile / Mouse Taps */}
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-[280px] mb-5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((item) => {
            const isClear = item === 'C';
            const isBack = item === '⌫';
            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (isClear) {
                    playPop();
                    setPin('');
                    setError(false);
                  } else if (isBack) {
                    handleBackspace();
                  } else {
                    handleDigitPress(item);
                  }
                }}
                className={`h-11 rounded-xl font-sans text-sm font-semibold transition-all cursor-pointer flex items-center justify-center active:scale-95 ${
                  isClear || isBack
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-white hover:bg-slate-50 text-slate-800 shadow-sm border border-slate-200 hover:border-slate-300'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* 4 Large Rounded Rectangular Buttons */}
        <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-3 mb-6">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBackspace}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 text-slate-700 font-sans text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-600" />
            <span>Back</span>
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 text-slate-700 font-sans text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4 text-slate-600" />
          </button>

          {/* Send Button (Blue airplane with soft blue glow on left) */}
          <button
            type="button"
            onClick={handleSend}
            className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-b from-white to-blue-50/30 border border-slate-200/90 border-l-4 border-l-blue-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[-6px_0_16px_-2px_rgba(59,130,246,0.35)] text-slate-700 font-sans text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4 text-blue-500" />
            <span>Send</span>
          </button>

          {/* Submit Button (Green checkmark with soft green glow on left) */}
          <button
            type="button"
            onClick={handleSubmit}
            className="relative flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-b from-white to-emerald-50/30 border border-slate-200/90 border-l-4 border-l-emerald-500 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[-6px_0_16px_-2px_rgba(34,197,94,0.35)] text-slate-700 font-sans text-xs sm:text-sm font-semibold transition-all active:scale-95 cursor-pointer"
          >
            <Check className="w-4 h-4 text-emerald-500 stroke-[2.5]" />
            <span>Submit</span>
          </button>
        </div>

        {/* 4 Smaller Circular Icon Buttons with Minimalist Labels */}
        <div className="w-full pt-5 border-t border-slate-100 flex items-center justify-around px-2">
          {/* Phone */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => triggerModalHint('phone')}
              title="Get phone hint"
              className="w-11 h-11 rounded-full bg-white border border-slate-200/90 shadow-sm hover:shadow-md flex items-center justify-center text-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 text-slate-800" />
            </button>
            <span className="font-sans text-[11px] font-medium text-slate-600 mt-1.5 tracking-tight">
              Phone
            </span>
          </div>

          {/* E-mail */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => triggerModalHint('email')}
              title="Get e-mail hint"
              className="w-11 h-11 rounded-full bg-white border border-slate-200/90 shadow-sm hover:shadow-md flex items-center justify-center text-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-slate-800" />
            </button>
            <span className="font-sans text-[11px] font-medium text-slate-600 mt-1.5 tracking-tight">
              E-mail
            </span>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => triggerModalHint('address')}
              title="View location info"
              className="w-11 h-11 rounded-full bg-white border border-slate-200/90 shadow-sm hover:shadow-md flex items-center justify-center text-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-slate-800" />
            </button>
            <span className="font-sans text-[11px] font-medium text-slate-600 mt-1.5 tracking-tight">
              Address
            </span>
          </div>

          {/* Web */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => triggerModalHint('web')}
              title="View domain info"
              className="w-11 h-11 rounded-full bg-white border border-slate-200/90 shadow-sm hover:shadow-md flex items-center justify-center text-slate-800 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4 text-slate-800" />
            </button>
            <span className="font-sans text-[11px] font-medium text-slate-600 mt-1.5 tracking-tight">
              Web
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
