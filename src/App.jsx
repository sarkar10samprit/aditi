import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import AudioPlayer from './components/AudioPlayer';
import PawTrail from './components/PawTrail';
import Hero from './components/Hero';
import MemoryWall from './components/MemoryWall';
import FunnyCorner from './components/FunnyCorner';
import ParchmentLetter from './components/ParchmentLetter';
import CakeSection from './components/CakeSection';
import ReasonsGrid from './components/ReasonsGrid';
import WishJar from './components/WishJar';
import Footer from './components/Footer';
import PasswordGate from './components/PasswordGate';
import { preloadAllAssets } from './utils/preloadAssets';

export default function App() {
  const isPreviewLoading = typeof window !== 'undefined' && window.location.search.includes('preview=loading');
  const showMemeCorner = typeof window !== 'undefined' && window.location.search.includes('view=memes');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAssetsReady, setIsAssetsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(isPreviewLoading ? 76 : 0);
  const [unwrapped, setUnwrapped] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Eagerly pre-cache and hardware-decode all assets in the background while typing password
    preloadAllAssets((progress) => {
      if (isMounted) setLoadProgress(progress);
    }).then(() => {
      if (isMounted) {
        setIsAssetsReady(true);
        setLoadProgress(100);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  const handleGiftOpen = () => {
    setUnwrapped(true);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background-Loading Security Password Gate (Passcode: 456) */}
      <AnimatePresence>
        {!isUnlocked && (
          <PasswordGate onUnlock={handleUnlock} isAssetsReady={isAssetsReady} />
        )}
      </AnimatePresence>

      {/* Legacy Preview Loading Screen (Only active if ?preview=loading is in URL) */}
      <AnimatePresence mode="wait">
        {isPreviewLoading && !isUnlocked && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#2B0B19] select-none px-6"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(214, 78, 126, 0.28) 0%, rgba(20, 4, 11, 0.95) 100%)'
            }}
          >
            {/* Center Glowing Icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500/30 to-rose-400/20 border border-pink-400/40 flex items-center justify-center shadow-[0_0_35px_rgba(232,114,155,0.4)]"
            >
              <Heart className="w-9 h-9 text-pink-300 fill-pink-400/80" />
              <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-300 animate-pulse" />
            </motion.div>

            {/* Typography */}
            <h1 className="font-serif italic text-2xl sm:text-3xl text-pink-100 mt-6 tracking-wide text-center">
              For My Dearest Coco
            </h1>
            <p className="font-sans text-[11px] sm:text-xs text-pink-200/70 uppercase tracking-[0.25em] mt-2 font-medium text-center">
              Gathering all your birthday surprises...
            </p>

            {/* Glowing Luxury Progress Bar */}
            <div className="w-52 sm:w-64 h-1.5 bg-black/40 border border-white/10 rounded-full mt-7 overflow-hidden relative shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-pink-400 via-rose-300 to-amber-200 rounded-full transition-all duration-200"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            <span className="font-mono text-[11px] text-pink-300/85 mt-2.5 font-semibold">
              {loadProgress}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Paw-Print & Sparkle Trail */}
      <PawTrail />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Hidden Hardware DOM Pre-mount for 0ms Instant Cat & Media Decoding */}
      <div
        className="opacity-0 pointer-events-none absolute -top-[9999px] -left-[9999px] w-1 h-1 overflow-hidden"
        aria-hidden="true"
      >
        <img src={`${import.meta.env.BASE_URL}knife_cat.webp`} decoding="sync" loading="eager" alt="" />
        <img src={`${import.meta.env.BASE_URL}gift_box.png`} decoding="sync" loading="eager" alt="" />
        <img src={`${import.meta.env.BASE_URL}cats/cat1.webp`} decoding="sync" loading="eager" alt="" />
        <img src={`${import.meta.env.BASE_URL}cats/cat2.webp`} decoding="sync" loading="eager" alt="" />
        <img src={`${import.meta.env.BASE_URL}cats/cat3.webp`} decoding="sync" loading="eager" alt="" />
        <img src={`${import.meta.env.BASE_URL}cats/cat4.webp`} decoding="sync" loading="eager" alt="" />
        <img src={`${import.meta.env.BASE_URL}cats/cat5.webp`} decoding="sync" loading="eager" alt="" />
        <img src={`${import.meta.env.BASE_URL}cats/cat6.webp`} decoding="sync" loading="eager" alt="" />
        <img src={`${import.meta.env.BASE_URL}cats/cat7.webp`} decoding="sync" loading="eager" alt="" />
      </div>

      {/* Main Content Sections */}
      <main>
        <Hero onGiftOpen={handleGiftOpen} />
        <MemoryWall />
        {showMemeCorner && <FunnyCorner />}
        <ParchmentLetter />
        <CakeSection />
        <ReasonsGrid />
        <WishJar />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
