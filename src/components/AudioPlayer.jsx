import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef(null);

  const notes = [
    { freq: 261.63, dur: 0.35, pause: 0.1 },  // C4
    { freq: 261.63, dur: 0.35, pause: 0.1 },  // C4
    { freq: 293.66, dur: 0.7, pause: 0.1 },   // D4
    { freq: 261.63, dur: 0.7, pause: 0.1 },   // C4
    { freq: 349.23, dur: 0.7, pause: 0.1 },   // F4
    { freq: 329.63, dur: 1.2, pause: 0.2 },   // E4
    
    { freq: 261.63, dur: 0.35, pause: 0.1 },  // C4
    { freq: 261.63, dur: 0.35, pause: 0.1 },  // C4
    { freq: 293.66, dur: 0.7, pause: 0.1 },   // D4
    { freq: 261.63, dur: 0.7, pause: 0.1 },   // C4
    { freq: 392.00, dur: 0.7, pause: 0.1 },   // G4
    { freq: 349.23, dur: 1.2, pause: 0.2 },   // F4
    
    { freq: 261.63, dur: 0.35, pause: 0.1 },  // C4
    { freq: 261.63, dur: 0.35, pause: 0.1 },  // C4
    { freq: 523.25, dur: 0.7, pause: 0.1 },   // C5
    { freq: 440.00, dur: 0.7, pause: 0.1 },   // A4
    { freq: 349.23, dur: 0.7, pause: 0.1 },   // F4
    { freq: 329.63, dur: 0.7, pause: 0.1 },   // E4
    { freq: 293.66, dur: 0.9, pause: 0.2 },   // D4

    { freq: 466.16, dur: 0.35, pause: 0.1 },  // Bb4
    { freq: 466.16, dur: 0.35, pause: 0.1 },  // Bb4
    { freq: 440.00, dur: 0.7, pause: 0.1 },   // A4
    { freq: 349.23, dur: 0.7, pause: 0.1 },   // F4
    { freq: 392.00, dur: 0.7, pause: 0.1 },   // G4
    { freq: 349.23, dur: 1.6, pause: 1.2 },   // F4
  ];

  const playChime = (freq, duration, ctx) => {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  };

  const startMelodyLoop = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioCtx();
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    let noteIndex = 0;
    isPlayingRef.current = true;

    const scheduleNext = () => {
      if (!isPlayingRef.current) return;
      const currentNote = notes[noteIndex];
      playChime(currentNote.freq, currentNote.dur, ctx);

      const delay = (currentNote.dur + currentNote.pause) * 1000;
      noteIndex = (noteIndex + 1) % notes.length;

      timerRef.current = setTimeout(scheduleNext, delay);
    };

    scheduleNext();
  };

  const stopMelody = () => {
    isPlayingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMelody();
      setIsPlaying(false);
    } else {
      startMelodyLoop();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopMelody();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleMusic}
        className={`group flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer ${
          isPlaying
            ? 'bg-white/20 border-white/40 text-white shadow-glow-rose scale-105'
            : 'bg-black/30 border-white/15 text-white/80 hover:bg-white/10 hover:text-white'
        }`}
        aria-label={isPlaying ? 'Pause soundtrack' : 'Play soundtrack'}
        title={isPlaying ? 'Pause soundtrack' : 'Play melody'}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3.5">
              <span className="w-1 bg-cosmic-champagne rounded-full animate-pulse h-3"></span>
              <span className="w-1 bg-cosmic-champagne rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.15s' }}></span>
              <span className="w-1 bg-cosmic-champagne rounded-full animate-pulse h-2" style={{ animationDelay: '0.3s' }}></span>
              <span className="w-1 bg-cosmic-champagne rounded-full animate-pulse h-3.5" style={{ animationDelay: '0.45s' }}></span>
            </div>
            <span className="font-sans text-xs font-medium tracking-wide">Soundtrack Active</span>
            <Volume2 className="w-4 h-4 text-cosmic-champagne" />
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-cosmic-blush group-hover:rotate-12 transition-transform" />
            <span className="font-sans text-xs font-medium tracking-wide">Play Melody</span>
            <VolumeX className="w-4 h-4 text-white/50" />
          </>
        )}
      </button>
    </div>
  );
}
