import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';
import { Feather, ArrowRight, ArrowLeft } from 'lucide-react';
import { playPop } from '../utils/soundEffects';

export default function ParchmentLetter() {
  const letter = birthdayData.parchmentLetter;
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);

  // Track revealed status for each of the 2 pages
  const [revealedPages, setRevealedPages] = useState({ 1: false, 2: false });
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const [visibleChars, setVisibleChars] = useState({ 1: 0, 2: 0 });

  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  const pagesData = letter.pages || [
    {
      pageNumber: 1,
      paragraphs: letter.paragraphs.slice(0, 4)
    },
    {
      pageNumber: 2,
      paragraphs: letter.paragraphs.slice(4),
      signoff: letter.signoff,
      sender: letter.sender
    }
  ];

  // Helper to compute character counts per page
  const getPageTotalChars = (pageIdx) => {
    const page = pagesData[pageIdx];
    let count = 0;
    if (pageIdx === 0) count += (letter.recipient || '').length;
    page.paragraphs.forEach((p) => { count += p.length; });
    if (page.signoff) count += page.signoff.length;
    if (page.sender) count += page.sender.length;
    return count;
  };

  // Trigger typing automatically when scrolling into letter section
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasScrolledIn) {
          setHasScrolledIn(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasScrolledIn]);

  // Typing animation loop for current active page (28ms)
  useEffect(() => {
    if (!hasScrolledIn) return;
    const pageIdx = currentPage - 1;
    const totalChars = getPageTotalChars(pageIdx);
    const currentChars = visibleChars[currentPage] || 0;

    if (revealedPages[currentPage] || currentChars >= totalChars) {
      if (currentChars >= totalChars && !revealedPages[currentPage]) {
        setRevealedPages((prev) => ({ ...prev, [currentPage]: true }));
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      setVisibleChars((prev) => ({ ...prev, [currentPage]: (prev[currentPage] || 0) + 1 }));
    }, 28);

    return () => clearTimeout(timerRef.current);
  }, [hasScrolledIn, currentPage, visibleChars, revealedPages]);

  // Turn page handler
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > 2 || newPage === currentPage) return;
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
    try {
      playPop();
    } catch (e) {}
  };

  // Instant reveal handler when tapping on page
  const revealActivePage = () => {
    const pageIdx = currentPage - 1;
    const totalChars = getPageTotalChars(pageIdx);
    setVisibleChars((prev) => ({ ...prev, [currentPage]: totalChars }));
    setRevealedPages((prev) => ({ ...prev, [currentPage]: true }));
  };

  // Helper to render animated or static text block
  const renderTextBlock = (text, globalOffset, currentChars, isFullyRevealed) => {
    if (isFullyRevealed) {
      return <span>{text}</span>;
    }

    const chars = text.split('');
    const blockEnd = globalOffset + chars.length;

    if (currentChars < globalOffset) {
      return null;
    }

    const visibleInBlock = Math.min(chars.length, Math.max(0, currentChars - globalOffset));
    const isCurrentlyTypingHere = currentChars >= globalOffset && currentChars < blockEnd;

    return (
      <span>
        {chars.slice(0, visibleInBlock).map((char, index) => {
          const isLatest = globalOffset + index === currentChars - 1;
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

  // Render Page 1 Contents (Paragraphs 1 to 4)
  const renderPage1Content = () => {
    const page = pagesData[0];
    const isRevealed = revealedPages[1] || (visibleChars[1] || 0) >= getPageTotalChars(0);
    const currentCharCount = visibleChars[1] || 0;
    let cumulative = 0;

    return (
      <div 
        onClick={revealActivePage}
        title="Tap to reveal full page"
        className="vintage-ink flex flex-col justify-between h-full select-text cursor-pointer"
      >
        <div className="space-y-2.5 sm:space-y-3">
          {/* Recipient */}
          {(() => {
            const text = letter.recipient;
            const offset = cumulative;
            cumulative += text.length;
            return (
              <h3 className="font-serif italic font-bold text-xl sm:text-2xl md:text-3xl tracking-tight mb-1 text-[#2E160C]">
                {renderTextBlock(text, offset, currentCharCount, isRevealed)}
              </h3>
            );
          })()}

          {/* Paragraphs 1 through 4 (Completely fills the empty 50% space) */}
          {page.paragraphs.map((p, pIdx) => {
            const offset = cumulative;
            cumulative += p.length;
            return (
              <p
                key={pIdx}
                className="font-serif text-[11.5px] sm:text-[13px] md:text-[14px] leading-[1.62] sm:leading-[1.68] text-[#2E160C]/90 font-medium tracking-normal text-justify"
              >
                {renderTextBlock(p, offset, currentCharCount, isRevealed)}
              </p>
            );
          })}
        </div>

        {/* Elevated Navigation Bar inside the paper */}
        <div className="pt-3 pb-1 border-t border-[#8B5A2B]/25 flex items-center justify-between mt-3 sm:mt-4">
          <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B] font-semibold tracking-wide">
            Page 1 of 2
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePageChange(2);
            }}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#8B5A2B]/20 to-[#8B5A2B]/35 hover:from-[#8B5A2B]/35 hover:to-[#8B5A2B]/50 border border-[#8B5A2B]/35 text-[#3D1407] font-serif text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Turn to Page 2</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5A2B]" />
          </button>
        </div>
      </div>
    );
  };

  // Render Page 2 Contents (Paragraphs 5 to 10 + Signoff & Sender)
  const renderPage2Content = () => {
    const page = pagesData[1];
    const isRevealed = revealedPages[2] || (visibleChars[2] || 0) >= getPageTotalChars(1);
    const currentCharCount = visibleChars[2] || 0;
    let cumulative = 0;

    return (
      <div 
        onClick={revealActivePage}
        title="Tap to reveal full page"
        className="vintage-ink flex flex-col justify-between h-full select-text cursor-pointer"
      >
        <div className="space-y-2.5 sm:space-y-3">
          {/* Subheading header */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B]/85 font-semibold tracking-wide">
              Continued for Coco...
            </span>
          </div>

          {/* Paragraphs 5 through 10 */}
          {page.paragraphs.map((p, pIdx) => {
            const offset = cumulative;
            cumulative += p.length;
            const isHighlight = p.includes('Happy Birthday, Coco!');

            return (
              <p
                key={pIdx}
                className={`font-serif text-[11.5px] sm:text-[13px] md:text-[14px] leading-[1.62] sm:leading-[1.68] tracking-normal text-justify ${
                  isHighlight 
                    ? 'font-bold text-[#5C2410] text-sm sm:text-base my-0.5' 
                    : 'text-[#2E160C]/90 font-medium'
                }`}
              >
                {renderTextBlock(p, offset, currentCharCount, isRevealed)}
              </p>
            );
          })}

          {/* Signoff and Sender */}
          {page.signoff && (() => {
            const offset = cumulative;
            cumulative += page.signoff.length;
            return (
              <div className="pt-2 sm:pt-3 border-t border-[#8B5A2B]/20">
                <p className="font-serif italic text-xs sm:text-sm text-[#2E160C]/85 font-semibold">
                  {renderTextBlock(page.signoff, offset, currentCharCount, isRevealed)}
                </p>
                {page.sender && (() => {
                  const sOffset = cumulative;
                  cumulative += page.sender.length;
                  return (
                    <p className="font-serif text-xs sm:text-sm font-bold text-[#5C2410] mt-0.5">
                      {renderTextBlock(page.sender, sOffset, currentCharCount, isRevealed)}
                    </p>
                  );
                })()}
              </div>
            );
          })()}
        </div>

        {/* Elevated Navigation Bar inside the paper */}
        <div className="pt-3 pb-1 border-t border-[#8B5A2B]/25 flex items-center justify-between mt-3 sm:mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePageChange(1);
            }}
            className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#8B5A2B]/20 to-[#8B5A2B]/35 hover:from-[#8B5A2B]/35 hover:to-[#8B5A2B]/50 border border-[#8B5A2B]/35 text-[#3D1407] font-serif text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5A2B]" />
            <span>Back to Page 1</span>
          </button>
          <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B] font-semibold tracking-wide ml-auto">
            Page 2 of 2 • Fin ❤️
          </span>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="letters" 
      ref={sectionRef} 
      className="py-14 sm:py-20 px-4 sm:px-8 max-w-4xl mx-auto relative scroll-mt-10"
    >
      {/* Clean Header with User's Requested Line */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-3">
          <Feather className="w-3.5 h-3.5" />
          <span>Handwritten Parchment</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-2">
          A Letter for My Dearest Coco
        </h2>
        <p className="font-serif italic text-rose-200/90 text-sm sm:text-base font-light tracking-wide">
          Don't forget to turn the page 📖✨
        </p>
      </div>

      {/* Foldable 2-Page Book with Silky Smooth 3D Flip */}
      <div className="relative max-w-2xl mx-auto [perspective:1400px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ 
              opacity: 0, 
              rotateY: direction > 0 ? -20 : 20,
              x: direction > 0 ? 20 : -20,
              scale: 0.97
            }}
            animate={{ 
              opacity: 1, 
              rotateY: 0,
              x: 0,
              scale: 1 
            }}
            exit={{ 
              opacity: 0, 
              rotateY: direction > 0 ? 20 : -20,
              x: direction > 0 ? -20 : 20,
              scale: 0.97 
            }}
            transition={{ 
              duration: 0.38, 
              ease: [0.25, 1, 0.5, 1] 
            }}
            className="relative filter drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)] origin-center"
          >
            {/* Transparent Cutout Torn Paper Background Image */}
            <img
              src={`${import.meta.env.BASE_URL}torn_paper.png`}
              alt={`Vintage Torn Letter Page ${currentPage}`}
              className="w-full h-auto block pointer-events-none select-none"
            />

            {/* Completely fills the paper: balanced padding, elevated bottom buttons */}
            <div className="absolute inset-0 pt-10 pb-16 px-8 sm:pt-14 sm:pb-20 sm:px-14 md:pt-16 md:pb-24 md:px-16 flex flex-col justify-between overflow-y-auto overflow-x-hidden">
              {currentPage === 1 ? renderPage1Content() : renderPage2Content()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prominent Quick-Switch Navigation Bar right below the letter */}
      <div className="flex items-center justify-center gap-4 mt-5 relative z-20">
        {currentPage === 1 ? (
          <button
            onClick={() => handlePageChange(2)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cosmic-rose to-pink-500 hover:from-pink-500 hover:to-rose-400 text-white font-serif text-sm font-bold shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Turn to Page 2</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => handlePageChange(1)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cosmic-rose to-pink-500 hover:from-pink-500 hover:to-rose-400 text-white font-serif text-sm font-bold shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Page 1</span>
          </button>
        )}
      </div>
    </section>
  );
}
