import React, { useEffect } from 'react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const MENU_LINKS = [
  { num: '01', id: 'hero', label: 'Floodplain Canopy (Hero)' },
  { num: '02', id: 'overview', label: 'Overview — The Patagonian Giant' },
  { num: '03', id: 'discovery', label: 'Discovery & History' },
  { num: '04', id: 'anatomy', label: 'Skeletal Anatomy & Hotspots' },
  { num: '05', id: 'size-comparison', label: 'Size Comparison & Scale' },
  { num: '06', id: 'diet-life', label: 'Diet, Ontogeny & Taphonomy' },
  { num: '07', id: 'habitat', label: 'Habitat & Distribution' },
  { num: '08', id: 'classification', label: 'Classification & Relatives' },
  { num: '09', id: 'evolution', label: 'Evolution & Extinction' },
  { num: '10', id: 'myth-reality', label: 'Myth vs Reality' },
  { num: '11', id: 'gallery', label: 'Exhibition Gallery' },
  { num: '12', id: 'fast-facts', label: 'Fast Facts & Sources' },
  { num: '13', id: 'contact', label: 'Contact & Colophon' },
];

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Exhibition Chapter Navigation"
      className="fixed inset-0 z-50 bg-[#081C17] text-[#FFF6EA] flex flex-col justify-between overflow-y-auto transition-all duration-500"
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }}
    >
      {/* Decorative organic water-edge wave SVG at top */}
      <svg
        className="absolute top-0 left-0 w-full h-16 text-[#2E6B55]/20 pointer-events-none"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M0,48 C240,76 480,12 720,40 C960,68 1200,18 1440,42 L1440,0 L0,0 Z"
        />
      </svg>

      {/* Top Row with CLOSE button */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 pt-7 pb-4 flex items-center justify-between border-b border-[#FFF6EA]/10">
        <span className="font-display text-sm uppercase tracking-[0.12em] text-[#FFF6EA]/70">
          PATAGOTITAN MAYORUM · DIGITAL MONOGRAPH
        </span>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close Exhibition Menu"
          className="group flex flex-col items-center cursor-pointer bg-transparent border-0 p-1.5 focus-visible:outline-2 focus-visible:outline-[#F6B27A]"
        >
          <span
            aria-hidden="true"
            className="block h-[1px] w-[72px] bg-[#FFF6EA]/80 mb-1.5 transition-all duration-300 group-hover:w-[96px] group-hover:bg-[#F6B27A]"
          />
          <span className="font-display text-sm uppercase tracking-[0.1em] text-[#FFF6EA] group-hover:text-[#F6B27A]">
            CLOSE
          </span>
        </button>
      </div>

      {/* Main Content Grid: Links + Creature Preview */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        <nav
          aria-label="Section Chapters"
          className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3"
        >
          {MENU_LINKS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigateSection(item.id);
                onClose();
              }}
              className="group flex items-baseline gap-4 py-2 border-b border-[#FFF6EA]/10 hover:border-[#F6B27A]/60 transition-colors focus-visible:outline-2 focus-visible:outline-[#F6B27A]"
            >
              <span className="font-display text-sm text-[#F6B27A]/80 tabular-nums shrink-0">
                {item.num}
              </span>
              <span className="font-display text-lg sm:text-xl uppercase tracking-[0.04em] text-[#FFF6EA] group-hover:text-[#FFD3A1] group-hover:translate-x-1.5 transition-all">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Small Creature Vignette Card */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl border border-[#FFF6EA]/12 bg-[#123D33]/40 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 25%, rgba(246,178,122,0.35), transparent 70%)',
            }}
          />
          <img
            src="/assets/patagotitan-hero.png"
            alt="Patagotitan mayorum artistic profile reconstruction"
            referrerPolicy="no-referrer"
            className="h-52 w-auto object-contain relative z-10"
          />
          <p className="mt-4 font-display text-xs uppercase tracking-[0.14em] text-[#FFF6EA]/80 text-center">
            Cerro Castaño Member · ~101.6 Ma
          </p>
          <p className="mt-1 text-xs text-[#DDEBDD]/70 text-center max-w-xs">
            Scroll from the warm, semi-arid apricot haze into the humid conifer floodplain shade.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full max-w-[1360px] mx-auto px-6 sm:px-10 py-4 border-t border-[#FFF6EA]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#DDEBDD]/60">
        <span>Chubut Province, Patagonia, Argentina · Holotype MPEF-PV 3400</span>
        <span>Press ESC to close</span>
      </div>
    </div>
  );
};
