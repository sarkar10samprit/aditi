import React, { useEffect, useState, useRef } from 'react';

/**
 * Tap-Only Cat Paw Prints for Mobile, Tablet & Desktop.
 * - Removed pointer movement generation (no paws while scrolling/moving cursor)
 * - Spawns on direct screen tap / mouse click
 * - Alternating left/right cat paw rotation (simulates kitten stepping where you tap)
 * - Hardware-accelerated CSS pop & fade
 */
export default function PawTrail() {
  const [paws, setPaws] = useState([]);
  const isLeftPawRef = useRef(false);

  useEffect(() => {
    const handleTap = (clientX, clientY) => {
      if (typeof clientX !== 'number' || typeof clientY !== 'number') return;

      // Alternate left & right paw orientation
      isLeftPawRef.current = !isLeftPawRef.current;
      const angle = (isLeftPawRef.current ? -16 : 16) + (Math.random() - 0.5) * 12;

      const newPaw = {
        id: `${Date.now()}-${Math.random()}`,
        x: clientX,
        y: clientY,
        rotation: angle,
      };

      setPaws((prev) => {
        // Keep maximum 10 active paws on screen
        const trimmed = prev.length >= 10 ? prev.slice(prev.length - 9) : prev;
        return [...trimmed, newPaw];
      });

      // Remove after 850ms
      setTimeout(() => {
        setPaws((prev) => prev.filter((p) => p.id !== newPaw.id));
      }, 850);
    };

    const onPointerDown = (e) => {
      // Trigger purely on tap/click (clientX & clientY)
      handleTap(e.clientX, e.clientY);
    };

    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {paws.map((paw) => (
        <span
          key={paw.id}
          className="absolute text-2xl pointer-events-none drop-shadow-[0_2px_8px_rgba(232,114,155,0.4)]"
          style={{
            left: `${paw.x}px`,
            top: `${paw.y}px`,
            '--rot': `${paw.rotation}deg`,
            animation: 'tapPawPop 0.85s ease-out forwards',
            willChange: 'opacity, transform',
          }}
        >
          🐾
        </span>
      ))}

      <style>{`
        @keyframes tapPawPop {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.4) rotate(var(--rot));
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.25) rotate(var(--rot));
          }
          50% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(1) rotate(var(--rot));
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.7) translateY(-8px) rotate(var(--rot));
          }
        }
      `}</style>
    </div>
  );
}
