import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  reducedMotion: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ reducedMotion }) => {
  const [cursorPos, setCursorPos] = useState({
    x: -100,
    y: -100,
    hovered: false,
  });

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined' || window.innerWidth < 1024) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, [role="button"], img')
      );
      setCursorPos({ x: e.clientX, y: e.clientY, hovered: isInteractive });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed top-0 left-0 z-50 pointer-events-none hidden lg:block rounded-full border border-[#F6B27A]/70 bg-[#F6B27A]/10 transition-transform duration-150 ease-out ${
        cursorPos.hovered ? 'w-11 h-11 -ml-5.5 -mt-5.5' : 'w-6 h-6 -ml-3 -mt-3'
      }`}
      style={{
        transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
      }}
    />
  );
};
