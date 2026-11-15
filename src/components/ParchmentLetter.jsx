import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';
import { Feather, ArrowRight, ArrowLeft } from 'lucide-react';
import { playPop } from '../utils/soundEffects';

export default function ParchmentLetter() {
  const letter = birthdayData.parchmentLetter;
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);

  // Track revealed status for the 2 pages
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

  const totalPages = pagesData.length;

  // Helper to compute character counts per page
  const getPageTotalChars = (pageIdx) => {
    const page = pagesData[pageIdx];
    if (!page) return 0;
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
      setVisibleChars((prev) => ({ ...prev, [currentPage]: (prev[currentPage] || 0) + 3 }));
    }, 16);

    return () => clearTimeout(timerRef.current);
  }, [hasScrolledIn, currentPage, visibleChars, revealedPages]);

  // Turn page handler
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
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

  // Helper to format text with adjusted classic ampersand font
  const formatTextWithAmpersand = (text) => {
    if (typeof text !== 'string' || !text.includes('&')) return text;
    const parts = text.split('&');
    return parts.map((part, idx) => (
      <React.Fragment key={idx}>
        {idx > 0 && <span className="vintage-ampersand">&amp;</span>}
        {part}
      </React.Fragment>
    ));
  };

  // Helper to render animated or static text block
  const renderTextBlock = (text, globalOffset, currentChars, isFullyRevealed) => {
    if (isFullyRevealed) {
      return <span>{formatTextWithAmpersand(text)}</span>;
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
          const isAmp = char === '&';
          return (
            <span
              key={index}
              className={`char-blur-in ${isLatest ? 'text-cosmic-rose' : ''} ${isAmp ? 'vintage-ampersand' : ''}`}
            >
              {char}
            </span>
          );
        })}
        {isCurrentlyTypingHere && <span className="typewriter-cursor" />}
      </span>
    );
  };

  // Render Page Content for any of the 3 pages
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
        <div className="space-y-3 sm:space-y-3.5">
          {/* Recipient on Page 1 */}
          {pageNum === 1 && (
            <div className="mb-1.5 sm:mb-2">
              {(() => {
                const text = letter.recipient;
                const offset = cumulative;
                cumulative += text.length;
                return (
                  <h3 className="font-serif italic font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-[#2E160C]">
                    {renderTextBlock(text, offset, currentCharCount, isRevealed)}
                  </h3>
                );
              })()}
            </div>
          )}

          {/* Subheading header for continuation pages */}
          {pageNum > 1 && (
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B]/85 font-semibold tracking-wide">
                Continued for Coco...
              </span>
            </div>
          )}

          {/* Paragraphs with balanced line-height and size to fill parchment cleanly */}
          {page.paragraphs.map((p, pIdx) => {
            const offset = cumulative;
            cumulative += p.length;
            const isHighlight = p.includes('Happy Birthday, Coco!');

            return (
              <p
                key={pIdx}
                className={`font-serif text-[12px] sm:text-[13.5px] md:text-[14.5px] leading-[1.62] sm:leading-[1.68] md:leading-[1.72] tracking-normal text-justify ${
                  isHighlight 
                    ? 'font-bold text-[#5C2410] text-[13.5px] sm:text-[15.5px] md:text-[16.5px] my-1' 
                    : 'text-[#2E160C]/90 font-medium'
                }`}
              >
                {renderTextBlock(p, offset, currentCharCount, isRevealed)}
              </p>
            );
          })}

          {/* Signoff and Sender on final page */}
          {page.signoff && (() => {
            const offset = cumulative;
            cumulative += page.signoff.length;
            return (
              <div className="pt-2.5 sm:pt-3 border-t border-[#8B5A2B]/20">
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

        {/* Elevated Navigation Bar inside the paper */}
        <div className="pt-3 pb-1 border-t border-[#8B5A2B]/25 flex items-center justify-between mt-3 sm:mt-4">
          {pageNum > 1 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePageChange(pageNum - 1);
              }}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#8B5A2B]/20 to-[#8B5A2B]/35 hover:from-[#8B5A2B]/35 hover:to-[#8B5A2B]/50 border border-[#8B5A2B]/35 text-[#3D1407] font-serif text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5A2B]" />
              <span>Back to Page 1</span>
            </button>
          ) : (
            <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B] font-semibold tracking-wide">
              Page 1 of {totalPages}
            </span>
          )}

          {pageNum < totalPages ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePageChange(pageNum + 1);
              }}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#8B5A2B]/20 to-[#8B5A2B]/35 hover:from-[#8B5A2B]/35 hover:to-[#8B5A2B]/50 border border-[#8B5A2B]/35 text-[#3D1407] font-serif text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer ml-auto"
            >
              <span>Turn to Page 2</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B5A2B]" />
            </button>
          ) : (
            <span className="font-serif italic text-xs sm:text-sm text-[#8B5A2B] font-semibold tracking-wide ml-auto">
              Page 2 of 2 • Fin ❤️
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

      {/* Foldable Book with Silky Smooth 3D Flip */}
      <div className="relative max-w-2xl mx-auto px-2 sm:px-4 [perspective:1400px]">
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

            {/* Generous safe margins: large top gap, expanded side gaps, elevated bottom buttons */}
            <div className="absolute inset-0 pt-12 pb-14 px-10 sm:pt-16 sm:pb-16 sm:px-16 md:pt-18 md:pb-20 md:px-20 flex flex-col justify-between overflow-y-auto overflow-x-hidden">
              {renderPageContent(currentPage)}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prominent Quick-Switch Navigation Bar right below the letter */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 relative z-20">
        {currentPage === 1 ? (
          <button
            onClick={() => handlePageChange(2)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-cosmic-rose to-pink-500 hover:from-pink-500 hover:to-rose-400 text-white font-serif text-xs sm:text-sm font-bold shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Turn to Page 2</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => handlePageChange(1)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-pill hover:bg-white/15 text-white font-serif text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Page 1</span>
          </button>
        )}
      </div>
    </section>
  );
}
