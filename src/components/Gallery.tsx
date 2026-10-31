import React, { useRef, useState } from 'react';
import { GALLERY_PLATES, GalleryPlateItem } from '../data/patagotitanData';

export const Gallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedPlate, setSelectedPlate] = useState<GalleryPlateItem | null>(null);
  const [missingImages, setMissingImages] = useState<Record<string, boolean>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  const handleImageError = (id: string) => {
    setMissingImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftStart(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    scrollContainerRef.current.scrollLeft = scrollLeftStart - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scrollGalleryBy = (delta: number) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // Renders clearly labelled SVG paleontological plate when /assets/gallery-01..06.jpg fails to load
  const renderPlaceholderPlateSvg = (plate: GalleryPlateItem) => {
    return (
      <svg
        viewBox="0 0 480 320"
        className="w-full h-full object-cover"
        aria-label={`${plate.title} — Illustrated Exhibition Plate Placeholder`}
      >
        <defs>
          <linearGradient id={`grad-${plate.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F6B27A" stopOpacity="0.45" />
            <stop offset="35%" stopColor="#8E9A6B" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#2E6B55" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#08211C" stopOpacity="0.98" />
          </linearGradient>
        </defs>

        <rect width="480" height="320" fill="#08211C" />
        <rect width="480" height="320" fill={`url(#grad-${plate.id})`} />

        {plate.svgTheme === 'quarry' && (
          <g stroke="#FFF6EA" strokeOpacity="0.55" fill="none">
            <path d="M0,175 Q120,165 240,178 T480,172" strokeWidth="2" />
            <path d="M0,210 Q140,202 260,214 T480,206" strokeWidth="2" stroke="#F6B27A" />
            <path d="M0,245 Q130,238 250,248 T480,242" strokeWidth="2" />
            <text x="24" y="166" fill="#FFD3A1" fontSize="10" fontFamily="Marcellus, serif" stroke="none">
              3.43 m BONEBED HORIZONS (LAYERS 1–3)
            </text>
          </g>
        )}

        {plate.svgTheme === 'femur' && (
          <g>
            <path
              d="M95,165 C95,140 120,132 140,145 L340,148 C362,135 385,142 385,168 C385,192 360,198 340,185 L140,182 C118,195 95,188 95,165 Z"
              fill="#F6B27A"
              fillOpacity="0.35"
              stroke="#FFD3A1"
              strokeWidth="2"
            />
            <line x1="95" y1="215" x2="385" y2="215" stroke="#FFF6EA" strokeWidth="1.2" strokeDasharray="4 3" />
            <text x="240" y="232" textAnchor="middle" fill="#FFF6EA" fontSize="11" fontFamily="Marcellus, serif">
              FEMUR LENGTH: ABOUT 2.38 METRES
            </text>
          </g>
        )}

        {plate.svgTheme === 'floodplain' && (
          <g>
            <polygon points="80,95 55,185 105,185" fill="#123D33" />
            <polygon points="125,80 95,185 155,185" fill="#2E6B55" />
            <polygon points="380,88 352,185 408,185" fill="#123D33" />
            <rect x="0" y="185" width="480" height="90" fill="#123D33" fillOpacity="0.65" />
            <ellipse cx="240" cy="215" rx="140" ry="14" fill="none" stroke="#F6B27A" strokeOpacity="0.5" />
          </g>
        )}

        {plate.svgTheme === 'mount' && (
          <g stroke="#FFD3A1" fill="none" strokeWidth="1.8">
            <path d="M40,210 Q140,200 220,165 Q280,140 355,85" />
            <rect
              x="355"
              y="72"
              width="34"
              height="18"
              rx="4"
              stroke="#FFF6EA"
              strokeDasharray="3 2"
            />
            <line x1="210" y1="168" x2="210" y2="245" />
            <line x1="285" y1="145" x2="285" y2="245" />
          </g>
        )}

        {plate.svgTheme === 'vertebra' && (
          <g stroke="#FFF6EA" fill="none" strokeWidth="1.5">
            <circle cx="240" cy="185" r="36" fill="#123D33" stroke="#F6B27A" />
            <path d="M225,149 L228,78 L252,78 L255,149" fill="#2E6B55" fillOpacity="0.45" />
            <line x1="175" y1="165" x2="305" y2="165" stroke="#FFD3A1" strokeDasharray="3 2" />
          </g>
        )}

        {plate.svgTheme === 'forest' && (
          <g fill="#5E8A58" opacity="0.8">
            <polygon points="150,75 110,205 190,205" fill="#2E6B55" />
            <polygon points="240,55 190,205 290,205" fill="#123D33" stroke="#8E9A6B" />
            <polygon points="330,85 295,205 365,205" fill="#2E6B55" />
          </g>
        )}

        <rect
          x="18"
          y="18"
          width="444"
          height="34"
          rx="6"
          fill="#08211C"
          fillOpacity="0.82"
          stroke="#FFF6EA"
          strokeOpacity="0.2"
        />
        <text x="30" y="39" fill="#FFD3A1" fontSize="10.5" fontFamily="Marcellus, serif">
          {plate.plateNumber} · ARCHIVAL PLACEHOLDER ({plate.src})
        </text>
      </svg>
    );
  };

  return (
    <>
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
      >
        <div className="max-w-[1280px] mx-auto">
          {/* Header & Scroll Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#FFF6EA]/15">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                  11
                </span>
                <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                  EXHIBITION PLATES · DRAG OR CLICK TO INSPECT
                </span>
              </div>
              <h2
                id="gallery-heading"
                className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
              >
                Floodplain & Osteology Gallery
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollGalleryBy(-380)}
                aria-label="Scroll gallery left"
                className="px-4 py-2 rounded-xl bg-[#123D33]/60 border border-[#FFF6EA]/20 hover:border-[#F6B27A] text-xs font-display uppercase tracking-[0.1em] cursor-pointer"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => scrollGalleryBy(380)}
                aria-label="Scroll gallery right"
                className="px-4 py-2 rounded-xl bg-[#123D33]/60 border border-[#FFF6EA]/20 hover:border-[#F6B27A] text-xs font-display uppercase tracking-[0.1em] cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Required Scientific Note on Skin Colour */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-[#FFD3A1] font-display uppercase tracking-[0.12em]">
            <span>Note: Colours are artistic; the real skin colour is unknown.</span>
            <span className="text-[#DDEBDD]/70">
              Asset path: /public/assets/gallery-01.jpg ... gallery-06.jpg
            </span>
          </div>

          {/* Horizontal Drag-Scroll Track */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="mt-8 flex items-stretch gap-6 overflow-x-auto pb-6 select-none cursor-grab active:cursor-grabbing snap-x snap-mandatory"
          >
            {GALLERY_PLATES.map((plate) => {
              const isMissing = Boolean(missingImages[plate.id]);
              return (
                <article
                  key={plate.id}
                  className="min-w-[300px] sm:min-w-[380px] max-w-[380px] snap-start rounded-2xl bg-[#123D33]/35 border border-[#FFF6EA]/15 overflow-hidden flex flex-col justify-between shrink-0 group hover:border-[#F6B27A]/60 transition-all"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-[#08211C]">
                      {!isMissing ? (
                        <img
                          src={plate.src}
                          alt={plate.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(plate.id)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          style={{
                            filter: 'contrast(1.1) saturate(1.05)',
                          }}
                        />
                      ) : (
                        renderPlaceholderPlateSvg(plate)
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs font-display uppercase tracking-[0.12em] text-[#F6B27A] mb-1.5">
                        <span>{plate.plateNumber}</span>
                        <span>· {plate.certainty}</span>
                      </div>
                      <h3 className="font-display text-xl text-[#FFF6EA] mb-2">
                        {plate.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#FFF6EA]/80 leading-relaxed">
                        {plate.caption}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-5 pt-3 border-t border-[#FFF6EA]/10 flex items-center justify-between">
                    <span className="text-[11px] text-[#DDEBDD]/70 truncate max-w-[200px]">
                      {plate.location}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedPlate(plate)}
                      aria-label={`Open lightbox for ${plate.title}`}
                      className="text-xs font-display uppercase tracking-[0.12em] text-[#FFD3A1] hover:text-[#FFF6EA] cursor-pointer whitespace-nowrap"
                    >
                      Inspect Plate ↗
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPlate && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Lightbox: ${selectedPlate.title}`}
          className="fixed inset-0 z-50 bg-[#08211C]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedPlate(null)}
        >
          <div
            className="max-w-3xl w-full rounded-2xl bg-[#123D33] border border-[#F6B27A]/50 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 border-b border-[#FFF6EA]/15 flex items-center justify-between gap-4">
              <div>
                <span className="font-display text-xs uppercase tracking-[0.14em] text-[#F6B27A] block">
                  {selectedPlate.plateNumber} · {selectedPlate.location}
                </span>
                <h3 className="font-display text-2xl text-[#FFF6EA]">
                  {selectedPlate.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPlate(null)}
                aria-label="Close Lightbox"
                className="px-4 py-2 rounded-lg bg-[#08211C] text-xs font-display uppercase tracking-[0.12em] text-[#FFF6EA] hover:text-[#F6B27A] cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            <div className="h-72 sm:h-96 w-full bg-[#08211C]">
              {!missingImages[selectedPlate.id] ? (
                <img
                  src={selectedPlate.src}
                  alt={selectedPlate.title}
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(selectedPlate.id)}
                  className="w-full h-full object-contain"
                />
              ) : (
                renderPlaceholderPlateSvg(selectedPlate)
              )}
            </div>

            <div className="p-6 bg-[#08211C]">
              <p className="text-sm sm:text-base text-[#FFF6EA]/90 leading-relaxed mb-3">
                {selectedPlate.caption}
              </p>
              <p className="text-xs text-[#FFD3A1] font-display uppercase tracking-[0.1em]">
                Colours are artistic; the real skin colour is unknown. Status: {selectedPlate.certainty}.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
