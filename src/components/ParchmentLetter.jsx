import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';
import { Feather, BookOpen, Heart, ArrowRight, ArrowLeft, BookMarked } from 'lucide-react';
import { playPop } from '../utils/soundEffects';

export default function ParchmentLetter() {
  const letter = birthdayData.parchmentLetter;
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSpreadView, setIsSpreadView] = useState(false);

  // Track revealed status for each page so re-reading doesn't re-trigger typing
  const [revealedPages, setRevealedPages] = useState({ 1: false, 2: false });
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const [visibleCharsPage1, setVisibleCharsPage1] = useState(0);
  const [visibleCharsPage2, setVisibleCharsPage2] = useState(0);

  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  // Content breakdown for Page 1
  const page1Items = [
    { type: 'recipient', text: letter.recipient },
    ...(letter.page1Paragraphs || letter.paragraphs.slice(0, 4)).map((p) => ({ type: 'paragraph', text: p }))
  ];
  const page1TotalChars = page1Items.reduce((sum, item) => sum + item.text.length, 0);

  // Content breakdown for Page 2
  const page2Items = [
    ...(letter.page2Paragraphs || letter.paragraphs.slice(4)).map((p) => ({ type: 'paragraph', text: p })),
    { type: 'signoff', text: letter.signoff },
    { type: 'sender', text: letter.sender }
  ];
  const page2TotalChars = page2Items.reduce((sum, item) => sum + item.text.length, 0);

  // Trigger typing automatically when scrolling into the letter section
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasScrolledIn) {
          setHasScrolledIn(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasScrolledIn]);

  // Page 1 typing animation loop (28ms)
  useEffect(() => {
    if (!hasScrolledIn || revealedPages[1] || visibleCharsPage1 >= page1TotalChars) {
      if (visibleCharsPage1 >= page1TotalChars && !revealedPages[1]) {
        setRevealedPages((prev) => ({ ...prev, 1: true }));
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      setVisibleCharsPage1((prev) => prev + 1);
    }, 28);

    return () => clearTimeout(timerRef.current);
  }, [hasScrolledIn, visibleCharsPage1, page1TotalChars, revealedPages]);

  // Page 2 typing animation loop (28ms) once on page 2
  useEffect(() => {
    if (!hasScrolledIn || currentPage !== 2 || revealedPages[2] || visibleCharsPage2 >= page2TotalChars) {
      if (visibleCharsPage2 >= page2TotalChars && !revealedPages[2]) {
        setRevealedPages((prev) => ({ ...prev, 2: true }));
      }
      return;
    }

    timerRef.current = setTimeout(() => {
      setVisibleCharsPage2((prev) => prev + 1);
    }, 28);

    return () => clearTimeout(timerRef.current);
  }, [hasScrolledIn, currentPage, visibleCharsPage2, page2TotalChars, revealedPages]);

  // Turn page handler
  const handlePageChange = (newPage) => {
    if (newPage === currentPage) return;
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
    try {
      playPop();
    } catch (e) {}
  };

  // Instant reveal handler
  const revealCurrentPage = (pageNumber) => {
    if (pageNumber === 1) {
      setVisibleCharsPage1(page1TotalChars);
      setRevealedPages((prev) => ({ ...prev, 1: true }));
    } else {
      setVisibleCharsPage2(page2TotalChars);
      setRevealedPages((prev) => ({ ...prev, 2: true }));
    }
  };

  // Helper to render animated or static text block
  const renderTextBlock = (text, globalOffset, currentVisibleChars, isFullyRevealed) => {
    if (isFullyRevealed) {
      return <span>{text}</span>;
    }

    const chars = text.split('');
    const blockEnd = globalOffset + chars.length;

    if (currentVisibleChars < globalOffset) {
      return null;
    }

    const visibleInBlock = Math.min(chars.length, Math.max(0, currentVisibleChars - globalOffset));
    const isCurrentlyTypingHere = currentVisibleChars >= globalOffset && currentVisibleChars < blockEnd;

    return (
      <span>
        {chars.slice(0, visibleInBlock).map((char, index) => {
          const isLatest = globalOffset + index === currentVisibleChars - 1;
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

  // Render Page 1 Contents
  const renderPage1Content = () => {
    let cumulative = 0;
    const isRevealed = revealedPages[1] || visibleCharsPage1 >= page1TotalChars;

    return (
      <div 
        onClick={() => revealCurrentPage(1)}
        title="Tap to reveal full page"
        className="vintage-ink flex flex-col justify-between h-full select-text cursor-pointer"
      >
        <div className="space-y-3 sm:space-y-3.5">
          {/* Recipient */}
          {(() => {
            const item = page1Items[0];
            const offset = cumulative;
            cumulative += item.text.length;
            return (
              <h3 className="font-serif italic font-bold text-xl sm:text-2xl md:text-3xl tracking-tight mb-2 text-[#2E160C]">
                {renderTextBlock(item.text, offset, visibleCharsPage1, isRevealed)}
              </h3>
            );
          })()}

          {/* Paragraphs 1 to 4 */}
          {page1Items.slice(1).map((item, pIdx) => {
            const offset = cumulative;
            cumulative += item.text.length;
            return (
              <p
                key={pIdx}
                className="font-serif text-[12px] sm:text-[13.5px] md:text-[14.5px] leading-[1.65] sm:leading-[1.7] text-[#2E160C]/90 font-medium tracking-normal text-justify"
              >
                {renderTextBlock(item.text, offset, visibleCharsPage1, isRevealed)}
              </p>
            );
          })}
        </div>

        {/* Page 1 Bottom Navigation */}
        <div className="pt-3 sm:pt-4 border-t border-[#8B5A2B]/20 flex items-center justify-between mt-auto">
          <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B]/80 font-medium">
            Page 1 of 2
          </span>
          {!isSpreadView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePageChange(2);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8B5A2B]/15 hover:bg-[#8B5A2B]/25 text-[#4A1D0E] font-serif text-xs sm:text-sm font-bold tracking-wide transition-all hover:scale-105 active:scale-95 shadow-2xs"
            >
              <span>Turn to Page 2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    );
  };

  // Render Page 2 Contents
  const renderPage2Content = () => {
    let cumulative = 0;
    const isRevealed = revealedPages[2] || visibleCharsPage2 >= page2TotalChars;
    const paragraphs = page2Items.filter((i) => i.type === 'paragraph');
    const signoffItem = page2Items.find((i) => i.type === 'signoff');
    const senderItem = page2Items.find((i) => i.type === 'sender');

    return (
      <div 
        onClick={() => revealCurrentPage(2)}
        title="Tap to reveal full page"
        className="vintage-ink flex flex-col justify-between h-full select-text cursor-pointer"
      >
        <div className="space-y-3 sm:space-y-3.5">
          {/* Header label */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B]/80 font-semibold tracking-wide">
              Continued for Coco...
            </span>
          </div>

          {/* Paragraphs 5 to 10 */}
          {paragraphs.map((item, pIdx) => {
            const offset = cumulative;
            cumulative += item.text.length;
            const isHighlight = item.text.includes('Happy Birthday, Coco!');
            return (
              <p
                key={pIdx}
                className={`font-serif text-[12px] sm:text-[13.5px] md:text-[14.5px] leading-[1.65] sm:leading-[1.7] tracking-normal text-justify ${
                  isHighlight 
                    ? 'font-bold text-[#5C2410] text-sm sm:text-base' 
                    : 'text-[#2E160C]/90 font-medium'
                }`}
              >
                {renderTextBlock(item.text, offset, visibleCharsPage2, isRevealed)}
              </p>
            );
          })}

          {/* Signoff & Sender */}
          <div className="pt-2 sm:pt-3 border-t border-[#8B5A2B]/20">
            {signoffItem && (() => {
              const offset = cumulative;
              cumulative += signoffItem.text.length;
              return (
                <p className="font-serif italic text-xs sm:text-sm text-[#2E160C]/85 font-semibold">
                  {renderTextBlock(signoffItem.text, offset, visibleCharsPage2, isRevealed)}
                </p>
              );
            })()}

            {senderItem && (() => {
              const offset = cumulative;
              cumulative += senderItem.text.length;
              return (
                <p className="font-serif text-xs sm:text-sm font-bold text-[#5C2410] mt-0.5">
                  {renderTextBlock(senderItem.text, offset, visibleCharsPage2, isRevealed)}
                </p>
              );
            })()}
          </div>
        </div>

        {/* Page 2 Bottom Navigation */}
        <div className="pt-3 sm:pt-4 border-t border-[#8B5A2B]/20 flex items-center justify-between mt-auto">
          {!isSpreadView && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePageChange(1);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8B5A2B]/15 hover:bg-[#8B5A2B]/25 text-[#4A1D0E] font-serif text-xs sm:text-sm font-bold tracking-wide transition-all hover:scale-105 active:scale-95 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Page 1</span>
            </button>
          )}
          <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B]/80 font-medium ml-auto">
            Page 2 of 2
          </span>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="letters" 
      ref={sectionRef} 
      className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto relative scroll-mt-10"
    >
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Feather className="w-3.5 h-3.5" />
          <span>Handwritten Foldable Parchment</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-3">
          A Letter for My Dearest Coco
        </h2>
        <p className="font-sans text-white/80 text-sm sm:text-base font-light leading-relaxed">
          Foldable into two vintage pages—take your time reading both.
        </p>
      </div>

      {/* Book Controls & Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 relative z-10">
        {/* Page 1 Tab */}
        <button
          onClick={() => handlePageChange(1)}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-sans font-medium transition-all flex items-center gap-2 cursor-pointer ${
            currentPage === 1 && !isSpreadView
              ? 'bg-gradient-to-r from-cosmic-rose to-pink-500 text-white shadow-lg shadow-pink-500/25 scale-105 font-semibold'
              : 'glass-pill text-white/75 hover:text-white hover:bg-white/10'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Page 1: Memories & Teasing</span>
        </button>

        {/* Page 2 Tab */}
        <button
          onClick={() => handlePageChange(2)}
          className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-sans font-medium transition-all flex items-center gap-2 cursor-pointer ${
            currentPage === 2 && !isSpreadView
              ? 'bg-gradient-to-r from-cosmic-rose to-pink-500 text-white shadow-lg shadow-pink-500/25 scale-105 font-semibold'
              : 'glass-pill text-white/75 hover:text-white hover:bg-white/10'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Page 2: Wishes & Love</span>
        </button>

        {/* Desktop Side-by-Side Spread Toggle (hidden on mobile) */}
        <button
          onClick={() => setIsSpreadView(!isSpreadView)}
          className={`hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium transition-all cursor-pointer ${
            isSpreadView
              ? 'bg-cosmic-gold/25 border border-cosmic-gold text-amber-200 shadow-md'
              : 'glass-pill text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>{isSpreadView ? 'Fold to 1 Page 📜' : 'Open 2-Page Book 📖'}</span>
        </button>
      </div>

      {/* Main Container */}
      {isSpreadView ? (
        /* Desktop Two-Page Open Book Spread */
        <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)]">
          {/* Left Page (Page 1) */}
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}torn_paper.png`}
              alt="Vintage Torn Letter Page 1"
              className="w-full h-auto block pointer-events-none select-none"
            />
            <div className="absolute inset-0 pt-10 pb-12 px-8 sm:pt-16 sm:pb-18 sm:px-12 md:pt-18 md:pb-20 md:px-14 flex flex-col justify-between overflow-y-auto overflow-x-hidden">
              {renderPage1Content()}
            </div>
          </div>

          {/* Right Page (Page 2) */}
          <div className="relative">
            <img
              src={`${import.meta.env.BASE_URL}torn_paper.png`}
              alt="Vintage Torn Letter Page 2"
              className="w-full h-auto block pointer-events-none select-none"
            />
            <div className="absolute inset-0 pt-10 pb-12 px-8 sm:pt-16 sm:pb-18 sm:px-12 md:pt-18 md:pb-20 md:px-14 flex flex-col justify-between overflow-y-auto overflow-x-hidden">
              {renderPage2Content()}
            </div>
          </div>
        </div>
      ) : (
        /* Foldable Single-Page Book with 3D Flip */
        <div className="relative max-w-2xl mx-auto [perspective:1200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ 
                opacity: 0, 
                rotateY: direction > 0 ? -18 : 18,
                scale: 0.96 
              }}
              animate={{ 
                opacity: 1, 
                rotateY: 0,
                scale: 1 
              }}
              exit={{ 
                opacity: 0, 
                rotateY: direction > 0 ? 18 : -18,
                scale: 0.96 
              }}
              transition={{ 
                duration: 0.38, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className="relative filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)] origin-center"
            >
              {/* Transparent Cutout Torn Paper Background Image */}
              <img
                src={`${import.meta.env.BASE_URL}torn_paper.png`}
                alt={`Vintage Torn Letter Page ${currentPage}`}
                className="w-full h-auto block pointer-events-none select-none"
              />

              {/* Overlay Content strictly padded within the torn paper edges */}
              <div className="absolute inset-0 pt-10 pb-12 px-8 sm:pt-16 sm:pb-18 sm:px-12 md:pt-18 md:pb-20 md:px-14 flex flex-col justify-between overflow-y-auto overflow-x-hidden">
                {currentPage === 1 ? renderPage1Content() : renderPage2Content()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
