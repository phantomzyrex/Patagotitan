import React from 'react';

interface NavProps {
  onOpenMenu: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Nav: React.FC<NavProps> = ({ onOpenMenu, onNavigateSection }) => {
  return (
    <header
      className="fixed top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 z-40 pointer-events-none rounded-t-[22px] overflow-hidden"
      aria-label="Primary Navigation"
    >
      {/* Very soft dark scrim behind the nav row so it stays readable on the bright apricot glow */}
      <div
        className="w-full px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-8 pointer-events-auto"
        style={{
          background:
            'linear-gradient(to bottom, rgba(20, 16, 10, 0.42) 0%, rgba(20, 16, 10, 0.16) 65%, transparent 100%)',
        }}
      >
        {/* Zone 1: Left Brand Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('hero');
          }}
          className="font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] text-[#FFF6EA] whitespace-nowrap shrink-0 transition-all duration-300 hover:text-[#FFD3A1] focus-visible:outline-2 focus-visible:outline-[#F6B27A] focus-visible:outline-offset-4"
          style={{
            textShadow: '0 1px 8px rgba(30, 20, 10, 0.45)',
          }}
        >
          PATAGOTITAN
        </a>

        {/* Zone 2: Centre MENU with a thin 1px line (about 80px wide) above it */}
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open Exhibition Menu"
          className="group flex flex-col items-center justify-center cursor-pointer bg-transparent border-0 p-1 focus-visible:outline-2 focus-visible:outline-[#F6B27A] focus-visible:outline-offset-4 whitespace-nowrap shrink-0"
        >
          <span
            aria-hidden="true"
            className="block h-[1px] w-[68px] sm:w-[80px] bg-[#FFF6EA]/80 mb-1.5 transition-all duration-300 group-hover:w-[108px] group-hover:bg-[#FFD3A1] group-hover:shadow-[0_0_10px_rgba(246,178,122,0.8)]"
          />
          <span
            className="font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] text-[#FFF6EA] transition-all duration-300 group-hover:text-[#FFD3A1] group-hover:drop-shadow-[0_0_10px_rgba(246,178,122,0.65)]"
            style={{
              textShadow: '0 1px 8px rgba(30, 20, 10, 0.45)',
            }}
          >
            MENU
          </span>
        </button>

        {/* Zone 3: Right CONTACT */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('contact');
          }}
          className="font-display text-[13px] sm:text-[15px] uppercase tracking-[0.08em] text-[#FFF6EA] whitespace-nowrap shrink-0 transition-all duration-300 hover:text-[#FFD3A1] hover:drop-shadow-[0_0_10px_rgba(246,178,122,0.65)] focus-visible:outline-2 focus-visible:outline-[#F6B27A] focus-visible:outline-offset-4"
          style={{
            textShadow: '0 1px 8px rgba(30, 20, 10, 0.45)',
          }}
        >
          CONTACT
        </a>
      </div>
    </header>
  );
};
