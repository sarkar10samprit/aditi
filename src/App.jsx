import React, { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Hero from './components/Hero';
import MemoryWall from './components/MemoryWall';
import LoveLetters from './components/LoveLetters';
import CakeSection from './components/CakeSection';
import ReasonsGrid from './components/ReasonsGrid';
import WishJar from './components/WishJar';
import Footer from './components/Footer';
import confetti from 'canvas-confetti';

export default function App() {
  const [unwrapped, setUnwrapped] = useState(false);

  useEffect(() => {
    // Gentle welcome confetti burst
    const timer = setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.3 },
        colors: ['#FF9EAA', '#E8D5FF', '#FFD166']
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleGiftOpen = () => {
    setUnwrapped(true);
  };

  return (
    <div className="relative min-h-screen text-charcoal overflow-hidden">
      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Main Content Sections */}
      <main>
        <Hero onGiftOpen={handleGiftOpen} />
        <MemoryWall />
        <LoveLetters />
        <CakeSection />
        <ReasonsGrid />
        <WishJar />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
