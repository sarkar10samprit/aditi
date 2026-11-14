import React, { useEffect, useState, useRef } from 'react';

/**
 * Ultra-lightweight, high-performance Paw Trail for tablet & desktop.
 * - Distance-based throttling (spawns only when moved >= 36px)
 * - ONLY paws (🐾), zero stars/sparkles
 * - Alternating left/right cat paw rotation (simulates walking kitten)
 * - Maximum 8 paws active at once
 * - Hardware-accelerated CSS opacity fade (zero canvas canvas-redraw overhead)
 */
export default function PawTrail() {
  const [paws, setPaws] = useState([]);
  const lastPosRef = useRef({ x: -100, y: -100 });
  const isLeftPawRef = useRef(false);

  useEffect(() => {
    const handleMove = (x, y) => {
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Only spawn when moved at least 36px
      if (dist < 36) return;
      lastPosRef.current = { x, y };

      // Alternate left & right paw angle
      isLeftPawRef.current = !isLeftPawRef.current;
      const angle = isLeftPawRef.current ? -16 : 16;
      const offset = isLeftPawRef.current ? -6 : 6;

      const newPaw = {
        id: `${Date.now()}-${Math.random()}`,
        x: x + offset,
        y: y + offset,
        rotation: angle + (Math.random() - 0.5) * 10,
      };

      setPaws((prev) => {
        // Keep maximum 8 paws on screen to protect tablet memory/GPU
        const trimmed = prev.length >= 8 ? prev.slice(prev.length - 7) : prev;
        return [...trimmed, newPaw];
      });

      // Remove after 850ms
      setTimeout(() => {
        setPaws((prev) => prev.filter((p) => p.id !== newPaw.id));
      }, 850);
    };

    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
      {paws.map((paw) => (
        <span
          key={paw.id}
          className="absolute text-xl pointer-events-none"
          style={{
            left: `${paw.x}px`,
            top: `${paw.y}px`,
            transform: `translate(-50%, -50%) rotate(${paw.rotation}deg)`,
            animation: 'pawFade 0.85s ease-out forwards',
            willChange: 'opacity, transform',
          }}
        >
          🐾
        </span>
      ))}

      <style>{`
        @keyframes pawFade {
          0% {
            opacity: 0.85;
            transform: translate(-50%, -50%) scale(0.85);
          }
          40% {
            opacity: 0.75;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.65);
          }
        }
      `}</style>
    </div>
  );
}
