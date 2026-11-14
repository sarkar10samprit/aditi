import React, { useState, useEffect, useRef } from 'react';
import { birthdayData } from '../config/birthdayData';
import { Feather } from 'lucide-react';

export default function ParchmentLetter() {
  const letter = birthdayData.parchmentLetter;

  // Flatten the entire letter into structured elements with cumulative character lengths
  const fullContent = [
    { type: 'recipient', text: letter.recipient },
    ...letter.paragraphs.map((p) => ({ type: 'paragraph', text: p })),
    { type: 'signoff', text: letter.signoff },
    { type: 'sender', text: letter.sender }
  ];

  const totalCharacters = fullContent.reduce((sum, item) => sum + item.text.length, 0);

  const [visibleChars, setVisibleChars] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  // Trigger typing automatically when scrolling into the letter section
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsPlaying(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [hasStarted]);

  // Typing animation loop restored to original speed (28ms per character)
  useEffect(() => {
    if (!isPlaying || visibleChars >= totalCharacters) return;

    timerRef.current = setTimeout(() => {
      setVisibleChars((prev) => prev + 1);
    }, 28);

    return () => clearTimeout(timerRef.current);
  }, [visibleChars, isPlaying, totalCharacters]);

  // Helper to render text with character-by-character blur-in animation
  const renderAnimatedBlock = (text, globalOffset) => {
    const chars = text.split('');
    const blockEnd = globalOffset + chars.length;

    if (visibleChars < globalOffset) {
      return null;
    }

    const visibleInBlock = Math.min(chars.length, Math.max(0, visibleChars - globalOffset));
    const isCurrentlyTypingHere = visibleChars >= globalOffset && visibleChars < blockEnd;

    return (
      <span>
        {chars.slice(0, visibleInBlock).map((char, index) => {
          const charGlobalIndex = globalOffset + index;
          const isLatest = charGlobalIndex === visibleChars - 1;

          return (
            <span
              key={index}
              className={`char-blur-in ${isLatest ? 'text-cosmic-rose' : ''}`}
            >
              {char}
            </span>
          );
        })}
        {isCurrentlyTypingHere && <span className="typewriter-cursor" />}
      </span>
    );
  };

  let cumulativeOffset = 0;

  return (
    <section 
      id="letters" 
      ref={sectionRef} 
      className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto relative scroll-mt-10"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Feather className="w-3.5 h-3.5" />
          <span>Handwritten Parchment for Coco</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-3">
          A Letter for My Dearest Coco
        </h2>
        <p className="font-sans text-white/80 text-sm sm:text-base font-light leading-relaxed">
          Written from the bottom of my heart, just for you.
        </p>
      </div>

      {/* Pure Cutout Parchment Letter Container (Clean with zero buttons) */}
      <div className="relative max-w-2xl mx-auto filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)] select-text">
        {/* Transparent Cutout Torn Paper Background Image */}
        <img
          src={`${import.meta.env.BASE_URL}torn_paper.png`}
          alt="Vintage Torn Letter for Coco"
          className="w-full h-auto block pointer-events-none select-none"
        />

        {/* Overlay Content strictly padded within the torn paper edges */}
        <div 
          onClick={() => setVisibleChars(totalCharacters)}
          title="Click to reveal full letter"
          className="absolute inset-0 pt-12 pb-14 px-10 sm:pt-20 sm:pb-24 sm:px-16 md:pt-24 md:pb-28 md:px-20 flex flex-col justify-between overflow-y-auto overflow-x-hidden cursor-pointer"
        >
          <div className="vintage-ink space-y-3.5 sm:space-y-4">
            {/* Recipient */}
            {(() => {
              const item = fullContent[0];
              const offset = cumulativeOffset;
              cumulativeOffset += item.text.length;
              return (
                <h3 className="font-serif italic font-bold text-xl sm:text-2xl md:text-3xl tracking-tight mb-2 text-[#2E160C]">
                  {renderAnimatedBlock(item.text, offset)}
                </h3>
              );
            })()}

            {/* Paragraphs */}
            {letter.paragraphs.map((para, pIdx) => {
              const offset = cumulativeOffset;
              cumulativeOffset += para.length;
              return (
                <p
                  key={pIdx}
                  className="font-serif text-[12px] sm:text-[14px] md:text-[15px] leading-[1.65] sm:leading-[1.7] text-[#2E160C]/90 font-medium tracking-normal text-justify"
                >
                  {renderAnimatedBlock(para, offset)}
                </p>
              );
            })}

            {/* Signoff & Sender */}
            <div className="pt-2 sm:pt-4 border-t border-[#8B5A2B]/20">
              {(() => {
                const item = fullContent[fullContent.length - 2];
                const offset = cumulativeOffset;
                cumulativeOffset += item.text.length;
                return (
                  <p className="font-serif italic text-sm sm:text-base text-[#2E160C]/85 font-semibold">
                    {renderAnimatedBlock(item.text, offset)}
                  </p>
                );
              })()}

              {(() => {
                const item = fullContent[fullContent.length - 1];
                const offset = cumulativeOffset;
                cumulativeOffset += item.text.length;
                return (
                  <p className="font-serif text-sm sm:text-base font-bold text-[#5C2410] mt-0.5">
                    {renderAnimatedBlock(item.text, offset)}
                  </p>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
