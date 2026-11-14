import React, { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer';
import PawTrail from './components/PawTrail';
import Hero from './components/Hero';
import MemoryWall from './components/MemoryWall';
import ParchmentLetter from './components/ParchmentLetter';
import CakeSection from './components/CakeSection';
import ReasonsGrid from './components/ReasonsGrid';
import WishJar from './components/WishJar';
import Footer from './components/Footer';
import confetti from 'canvas-confetti';

export default function App() {
  const [unwrapped, setUnwrapped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.3 },
        colors: ['#E8729B', '#FCD34D', '#FFFFFF', '#D64E7E']
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleGiftOpen = () => {
    setUnwrapped(true);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Interactive Paw-Print & Sparkle Trail */}
      <PawTrail />

      {/* Floating Audio Controller */}
      <AudioPlayer />

      {/* Main Content Sections */}
      <main>
        <Hero onGiftOpen={handleGiftOpen} />
        <MemoryWall />
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
