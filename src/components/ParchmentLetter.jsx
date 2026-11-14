import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';
import { Feather, ArrowRight, ArrowLeft } from 'lucide-react';
import { playPop } from '../utils/soundEffects';

export default function ParchmentLetter() {
  const letter = birthdayData.parchmentLetter;
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);

  // Track revealed status for each of the 4 pages so re-reading doesn't re-trigger typing
  const [revealedPages, setRevealedPages] = useState({ 1: false, 2: false, 3: false, 4: false });
  const [hasScrolledIn, setHasScrolledIn] = useState(false);
  const [visibleChars, setVisibleChars] = useState({ 1: 0, 2: 0, 3: 0, 4: 0 });

  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  // Prepare items for each page
  const pagesData = letter.pages || [
    {
      pageNumber: 1,
      paragraphs: letter.paragraphs.slice(0, 2)
    },
    {
      pageNumber: 2,
      paragraphs: letter.paragraphs.slice(2, 4)
    },
    {
      pageNumber: 3,
      paragraphs: letter.paragraphs.slice(4, 7)
    },
    {
      pageNumber: 4,
      paragraphs: letter.paragraphs.slice(7),
      signoff: letter.signoff,
      sender: letter.sender
    }
  ];

  // Helper to compute page character counts
  const getPageTotalChars = (pageIdx) => {
    const page = pagesData[pageIdx];
    let count = 0;
    if (pageIdx === 0) count += (letter.recipient || '').length;
    page.paragraphs.forEach((p) => { count += p.length; });
    if (page.signoff) count += page.signoff.length;
    if (page.sender) count += page.sender.length;
    return count;
  };

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

  // Typing animation loop for the active page (28ms)
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
    if (newPage < 1 || newPage > 4 || newPage === currentPage) return;
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

  // Render content of any of the 4 pages
  const renderPageContent = (pageNum) => {
    const pageIdx = pageNum - 1;
    const page = pagesData[pageIdx];
    const isRevealed = revealedPages[pageNum] || (visibleChars[pageNum] || 0) >= getPageTotalChars(pageIdx);
    const currentCharCount = visibleChars[pageNum] || 0;
    let cumulative = 0;

    return (
      <div 
        onClick={revealActivePage}
        title="Tap to reveal full page"
        className="vintage-ink flex flex-col justify-between h-full select-text cursor-pointer"
      >
        <div className="space-y-4 sm:space-y-5">
          {/* Recipient on Page 1 */}
          {pageNum === 1 && (
            <div>
              {(() => {
                const text = letter.recipient;
                const offset = cumulative;
                cumulative += text.length;
                return (
                  <h3 className="font-serif italic font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-2 text-[#2E160C]">
                    {renderTextBlock(text, offset, currentCharCount, isRevealed)}
                  </h3>
                );
              })()}
            </div>
          )}

          {/* Subheading header for continuation pages */}
          {pageNum > 1 && (
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B]/85 font-semibold tracking-wide">
                Continued for Coco...
              </span>
            </div>
          )}

          {/* Paragraphs */}
          {page.paragraphs.map((p, pIdx) => {
            const offset = cumulative;
            cumulative += p.length;
            const isHighlight = p.includes('Happy Birthday, Coco!');

            return (
              <p
                key={pIdx}
                className={`font-serif text-[13px] sm:text-[14.5px] md:text-[16px] leading-[1.75] sm:leading-[1.8] tracking-normal text-justify ${
                  isHighlight 
                    ? 'font-bold text-[#5C2410] text-base sm:text-lg my-1' 
                    : 'text-[#2E160C]/90 font-medium'
                }`}
              >
                {renderTextBlock(p, offset, currentCharCount, isRevealed)}
              </p>
            );
          })}

          {/* Signoff and Sender on Page 4 */}
          {page.signoff && (() => {
            const offset = cumulative;
            cumulative += page.signoff.length;
            return (
              <div className="pt-3 sm:pt-4 border-t border-[#8B5A2B]/20">
                <p className="font-serif italic text-xs sm:text-sm text-[#2E160C]/85 font-semibold">
                  {renderTextBlock(page.signoff, offset, currentCharCount, isRevealed)}
                </p>
                {page.sender && (() => {
                  const sOffset = cumulative;
                  cumulative += page.sender.length;
                  return (
                    <p className="font-serif text-xs sm:text-sm font-bold text-[#5C2410] mt-1">
                      {renderTextBlock(page.sender, sOffset, currentCharCount, isRevealed)}
                    </p>
                  );
                })()}
              </div>
            );
          })()}
        </div>

        {/* Elevated Bottom Navigation Bar */}
        <div className="pt-4 pb-2 border-t border-[#8B5A2B]/25 flex items-center justify-between mt-auto">
          {/* Previous Button or Spacer */}
          {pageNum > 1 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePageChange(pageNum - 1);
              }}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#8B5A2B]/20 to-[#8B5A2B]/35 hover:from-[#8B5A2B]/35 hover:to-[#8B5A2B]/50 border border-[#8B5A2B]/30 text-[#3D1407] font-serif text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5A2B]" />
              <span>Previous</span>
            </button>
          ) : (
            <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B] font-semibold tracking-wide">
              Page 1 of 4
            </span>
          )}

          {/* Center Page indicator on pages 2 & 3 */}
          {(pageNum === 2 || pageNum === 3) && (
            <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B] font-semibold tracking-wide">
              {pageNum} of 4
            </span>
          )}

          {/* Next Button or Final Sign */}
          {pageNum < 4 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePageChange(pageNum + 1);
              }}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#8B5A2B]/20 to-[#8B5A2B]/35 hover:from-[#8B5A2B]/35 hover:to-[#8B5A2B]/50 border border-[#8B5A2B]/30 text-[#3D1407] font-serif text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer ml-auto"
            >
              <span>Turn Page</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5A2B]" />
            </button>
          ) : (
            <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B] font-semibold tracking-wide ml-auto">
              Page 4 of 4 • Fin ❤️
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <section 
      id="letters" 
      ref={sectionRef} 
      className="py-14 sm:py-20 px-6 sm:px-10 max-w-4xl mx-auto relative scroll-mt-10"
    >
      {/* Clean Header with User's Requested Line */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-cosmic-champagne font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <Feather className="w-3.5 h-3.5" />
          <span>Handwritten Parchment</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-2.5">
          A Letter for My Dearest Coco
        </h2>
        <p className="font-serif italic text-rose-200/90 text-sm sm:text-base font-light tracking-wide">
          Don't forget to turn the page 📖✨
        </p>
      </div>

      {/* Foldable 4-Page Book with Silky Smooth 3D Page Turn */}
      <div className="relative max-w-2xl mx-auto px-2 sm:px-4 [perspective:1400px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ 
              opacity: 0, 
              rotateY: direction > 0 ? -22 : 22,
              x: direction > 0 ? 25 : -25,
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
              rotateY: direction > 0 ? 22 : -22,
              x: direction > 0 ? -25 : 25,
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

            {/* Generous safe margins: side gap, top gap, elevated bottom buttons */}
            <div className="absolute inset-0 pt-12 pb-20 px-10 sm:pt-18 sm:pb-24 sm:px-16 md:pt-22 md:pb-28 md:px-18 flex flex-col justify-between overflow-y-auto overflow-x-hidden">
              {renderPageContent(currentPage)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
