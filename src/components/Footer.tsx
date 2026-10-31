import React from 'react';

interface FooterProps {
  onBackToDrySeason: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onBackToDrySeason,
  onNavigateSection,
}) => {
  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full pt-24 pb-14 px-6 sm:px-10 lg:px-16 bg-[#061814] text-[#FFF6EA] border-t border-[#FFF6EA]/12 overflow-hidden select-none"
    >
      {/* Subtle Floodplain Top Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-44 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(246,178,122,0.4), rgba(46,107,85,0.2) 55%, transparent 75%)',
        }}
      />

      {/* Subtle Constellation / Geometric Mesh Lines (matching the reference screenshot) */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#5E8A58" strokeWidth="0.9" fill="none">
          {/* Top-left triangle near 13 */}
          <polygon points="118,52 178,78 134,112" strokeOpacity="0.45" />
          <circle cx="118" cy="52" r="2.2" fill="#8E9A6B" />
          <circle cx="178" cy="78" r="1.8" fill="#8E9A6B" />

          {/* Upper-right geometric constellation near the return button */}
          <line x1="958" y1="30" x2="922" y2="118" strokeOpacity="0.5" />
          <polygon
            points="922,118 1020,192 958,248 858,158"
            strokeOpacity="0.45"
          />
          <circle cx="922" cy="118" r="2.5" fill="#8E9A6B" />
          <circle cx="858" cy="158" r="2.5" fill="#8E9A6B" />
          <circle cx="958" cy="248" r="2" fill="#F6B27A" />

          {/* Lower-left triangle behind "Shivang" */}
          <polygon
            points="376,348 418,415 344,432"
            strokeOpacity="0.38"
          />
          <circle cx="376" cy="348" r="1.8" fill="#8E9A6B" />
          <circle cx="418" cy="415" r="2" fill="#8E9A6B" />

          {/* Subtle ambient specks */}
          <circle cx="552" cy="192" r="2" fill="#5E8A58" opacity="0.6" />
          <circle cx="1405" cy="418" r="2" fill="#5E8A58" opacity="0.6" />
        </g>
      </svg>

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* TOP ZONE: 13 Kicker + LET'S TALK + Links on Left | Return Button on Right */}
        <div className="pb-14 border-b border-[#FFF6EA]/12 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div>
            {/* 13 + CURATORIAL INQUIRIES & DIGITAL PORTFOLIO */}
            <div className="flex items-baseline gap-3.5 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                13
              </span>
              <span className="font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-[#F6B27A]">
                CURATORIAL INQUIRIES &amp; DIGITAL PORTFOLIO
              </span>
            </div>

            {/* Large LET'S TALK in Marcellus Flared Serif */}
            <h2
              id="contact-heading"
              className="font-display text-5xl sm:text-7xl md:text-[5.25rem] uppercase tracking-[0.02em] text-[#FFF6EA] leading-[0.95]"
            >
              LET&apos;S TALK
            </h2>

            {/* Contact Links Row: techhelp.shivang@gmail.com · github.com/phantomzyrex · Paleo-Dossier */}
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
              <a
                href="mailto:techhelp.shivang@gmail.com"
                className="text-[#F6B27A] hover:text-[#FFD3A1] font-normal tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-[#F6B27A]"
              >
                techhelp.shivang@gmail.com
              </a>
              <span aria-hidden="true" className="text-[#FFF6EA]/25">
                ·
              </span>
              <a
                href="https://github.com/phantomzyrex"
                target="_blank"
                rel="noreferrer"
                className="text-[#DDEBDD]/80 hover:text-[#FFF6EA] transition-colors focus-visible:outline-2 focus-visible:outline-[#F6B27A]"
              >
                github.com/phantomzyrex
              </a>
              <span aria-hidden="true" className="text-[#FFF6EA]/25">
                ·
              </span>
              <a
                href="#overview"
                onClick={(e) => {
                  if (onNavigateSection) {
                    e.preventDefault();
                    onNavigateSection('overview');
                  }
                }}
                className="text-[#DDEBDD]/80 hover:text-[#FFF6EA] transition-colors focus-visible:outline-2 focus-visible:outline-[#F6B27A]"
              >
                Paleo-Dossier
              </a>
            </div>
          </div>

          {/* Right Column: Return to Canopy / Dry Season Button + Caption */}
          <div className="flex flex-col items-start lg:items-end gap-2.5">
            <button
              type="button"
              onClick={onBackToDrySeason}
              className="px-6 py-3.5 rounded-xl bg-[#123D33]/45 hover:bg-[#123D33]/80 border border-[#5E8A58]/60 hover:border-[#F6B27A] text-[#FFF6EA] font-display text-xs sm:text-[13px] uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 shadow-[0_0_24px_rgba(46,107,85,0.25)] focus-visible:outline-2 focus-visible:outline-[#F6B27A]"
            >
              ↑ RETURN TO THE CANOPY (101.6 MYA)
            </button>
            <span className="text-[11px] text-[#DDEBDD]/55 tracking-wide lg: pr-1">
              Resets seasonal floodplain gauge to semi-arid canopy
            </span>
          </div>
        </div>

        {/* MIDDLE ZONE: Giant "Shivang Studios" Wordmark with Warm Floodplain Glow */}
        <div className="relative py-14 sm:py-20 border-b border-[#FFF6EA]/12 flex items-center justify-center text-center overflow-hidden">
          <div
            aria-hidden="true"
            className="
              absolute inset-x-12 top-1/2 -translate-y-1/2 h-28 pointer-events-none opacity-35
            "
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, rgba(94, 138, 88, 0.55) 0%, rgba(246, 178, 122, 0.22) 45%, transparent 75%)',
            }}
          />
          <div
            aria-label="Shivang Studios"
            className="relative z-10 font-sans font-bold tracking-[-0.03em] text-[#FFF6EA] leading-none select-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(2.75rem, 9.6vw, 8.6rem)',
              textShadow: '0 0 18px rgba(219, 238, 219, 0.32)',
            }}
          >
            Shivang Studios
          </div>
        </div>

        {/* BOTTOM ZONE: Shivang Gupta · Created with ♥ by Shivang Studios | GitHub · Email */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#DDEBDD]/75">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#FFF6EA]">Shivang Gupta</span>
            <span aria-hidden="true" className="text-[#FFF6EA]/30">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#DDEBDD]/75">
              Created with
              <span
                aria-label="love"
                className="inline-block text-[#8AD879]"
              >
                ♥
              </span>
              by Shivang Studios
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs sm:text-sm text-[#DDEBDD]/80">
            <a
              href="https://github.com/phantomzyrex"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#F6B27A] transition-colors focus-visible:outline-2 focus-visible:outline-[#F6B27A]"
            >
              GitHub
            </a>
            <a
              href="mailto:techhelp.shivang@gmail.com"
              className="hover:text-[#F6B27A] transition-colors focus-visible:outline-2 focus-visible:outline-[#F6B27A]"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
