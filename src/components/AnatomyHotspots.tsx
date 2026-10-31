import React, { useState } from 'react';
import { ANATOMY_HOTSPOTS, AnatomyHotspot } from '../data/patagotitanData';

export const AnatomyHotspots: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<AnatomyHotspot>(ANATOMY_HOTSPOTS[0]);
  const [showOsteologyOverlay, setShowOsteologyOverlay] = useState<boolean>(true);

  return (
    <section
      id="anatomy"
      aria-labelledby="anatomy-heading"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-[#08211C] via-[#123D33] to-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#FFF6EA]/15">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                04
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                OSTEOLOGY & DIAGNOSTIC TRAITS
              </span>
            </div>
            <h2
              id="anatomy-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
            >
              Skeletal Anatomy
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowOsteologyOverlay((prev) => !prev)}
              aria-pressed={showOsteologyOverlay}
              className="px-4 py-2 rounded-xl bg-[#08211C] border border-[#FFF6EA]/20 hover:border-[#F6B27A] text-xs font-display uppercase tracking-[0.12em] text-[#FFF6EA] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {showOsteologyOverlay
                ? 'Hide Skeletal & Dashed Skull Guide'
                : 'Show Skeletal & Dashed Skull Guide'}
            </button>
          </div>
        </div>

        {/* Interactive Annotated Specimen Viewer + Detail Inspector */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 cols: Interactive Annotated Side-View Canvas */}
          <div className="lg:col-span-7 relative rounded-2xl bg-[#08211C]/90 border border-[#FFF6EA]/15 p-6 sm:p-8 flex flex-col justify-between overflow-hidden min-h-[480px] sm:min-h-[560px]">
            {/* Ambient Floodplain Glow */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-45"
              style={{
                background:
                  'radial-gradient(ellipse at 45% 30%, rgba(246,178,122,0.22) 0%, rgba(46,107,85,0.25) 55%, transparent 80%)',
              }}
            />

            {/* Top Legend Banner inside Diagram */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#DDEBDD]/80 border-b border-[#FFF6EA]/10 pb-3">
              <span className="font-display uppercase tracking-[0.12em]">
                Interactive Specimen Profile · Click any anatomical marker (01–10)
              </span>
              <span className="text-[#F6B27A] font-display uppercase tracking-[0.1em]">
                Colours are artistic; real skin colour is unknown
              </span>
            </div>

            {/* Creature Cutout + Dashed Skull Reconstruction SVG + Clickable Hotspots */}
            <div className="relative my-auto py-6 flex items-center justify-center">
              <div className="relative w-full max-w-[540px] aspect-[3/4] mx-auto flex items-center justify-center">
                <img
                  src="/assets/patagotitan-side.png"
                  alt="Annotated side view of Patagotitan mayorum showing neck, dorsal column, limbs, and tail"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain select-none"
                  style={{
                    filter: 'contrast(1.12) saturate(1.06)',
                  }}
                />

                {/* Required Dashed Outline Skull Reconstruction & Vertebral Axis SVG Overlay */}
                {showOsteologyOverlay && (
                  <svg
                    viewBox="0 0 400 520"
                    className="absolute inset-0 w-full h-full pointer-events-none z-10"
                    aria-label="Dashed skull outline labelled not preserved: reconstructed from relatives"
                  >
                    {/* Dashed Skull Reconstruction Box & Cranial Outline */}
                    <g>
                      <path
                        d="M78,18 C96,12 126,15 138,28 C144,35 140,46 125,49 C106,52 88,48 76,42 Z"
                        fill="rgba(246, 178, 122, 0.08)"
                        stroke="#F6B27A"
                        strokeWidth="1.8"
                        strokeDasharray="4 3"
                      />
                      <line
                        x1="138"
                        y1="26"
                        x2="188"
                        y2="18"
                        stroke="#F6B27A"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                      />
                      <rect
                        x="188"
                        y="6"
                        width="198"
                        height="30"
                        rx="4"
                        fill="#08211C"
                        fillOpacity="0.9"
                        stroke="#F6B27A"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                      />
                      <text
                        x="195"
                        y="19"
                        fill="#FFD3A1"
                        fontSize="8.5"
                        fontFamily="Marcellus, serif"
                      >
                        SKULL NOT PRESERVED:
                      </text>
                      <text
                        x="195"
                        y="30"
                        fill="#FFF6EA"
                        fontSize="8"
                        fontFamily="Jost, sans-serif"
                      >
                        Reconstructed from relatives (1 tooth known)
                      </text>
                    </g>

                    {/* Articulated 3.67m Dorsal Vertebrae Span Indicator */}
                    <g opacity="0.8">
                      <path
                        d="M128,238 Q195,248 258,278"
                        fill="none"
                        stroke="#DDEBDD"
                        strokeWidth="1.5"
                        strokeDasharray="5 4"
                      />
                      <text
                        x="158"
                        y="232"
                        fill="#DDEBDD"
                        fontSize="8.5"
                        fontFamily="Marcellus, serif"
                      >
                        ~3.67 m dorsal series (estimate)
                      </text>
                    </g>
                  </svg>
                )}

                {/* Interactive Hotspot Buttons */}
                {ANATOMY_HOTSPOTS.map((spot, index) => {
                  const isSelected = selectedHotspot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setSelectedHotspot(spot)}
                      aria-label={`Inspect anatomy hotspot: ${spot.label} (${spot.certainty})`}
                      aria-pressed={isSelected}
                      style={{
                        left: `${spot.xPercent}%`,
                        top: `${spot.yPercent}%`,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-display text-xs tabular-nums transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FFF6EA] ${
                        isSelected
                          ? 'bg-[#F6B27A] text-[#14100A] scale-115 shadow-[0_0_18px_rgba(246,178,122,0.9)] border-2 border-[#FFF6EA]'
                          : spot.isDashedReconstruction
                          ? 'bg-[#08211C]/90 text-[#FFD3A1] border border-dashed border-[#F6B27A] hover:bg-[#123D33]'
                          : 'bg-[#08211C]/90 text-[#FFF6EA] border border-[#FFF6EA]/50 hover:border-[#F6B27A] hover:scale-105'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#DDEBDD]/70 border-t border-[#FFF6EA]/10 pt-3">
              <span> Dashed cranial outline = not preserved: reconstructed from relatives</span>
              <span>Femur benchmark: ~2.38 m</span>
            </div>
          </div>

          {/* Right 5 cols: Active Hotspot Scientific Inspector + Quick Selector List */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Active Hotspot Detail Card */}
            <div
              aria-live="polite"
              className="p-6 sm:p-8 rounded-2xl bg-[#08211C]/90 border border-[#F6B27A]/45 shadow-lg"
            >
              <div className="flex items-center justify-between gap-2 text-xs text-[#F6B27A] font-display uppercase tracking-[0.14em] mb-2">
                <span>Selected Osteological Region</span>
                <span>Status · {selectedHotspot.certainty}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl text-[#FFF6EA] uppercase tracking-[0.02em] mb-3">
                {selectedHotspot.label}
              </h3>

              {selectedHotspot.isDashedReconstruction && (
                <div className="mb-4 p-3 rounded-lg bg-[#3A2A1C]/60 border border-dashed border-[#F6B27A]/70 text-xs text-[#FFD3A1]">
                  <strong>Not preserved: reconstructed from relatives.</strong> Only a single tooth
                  was recovered at La Flecha.
                </div>
              )}

              <p className="text-base font-medium text-[#FFD3A1] mb-3">
                {selectedHotspot.summary}
              </p>

              <p className="text-sm sm:text-base text-[#FFF6EA]/85 leading-relaxed">
                {selectedHotspot.details}
              </p>
            </div>

            {/* All 10 Anatomical Regions List */}
            <div className="p-5 rounded-2xl bg-[#08211C]/70 border border-[#FFF6EA]/12">
              <div className="font-display text-xs uppercase tracking-[0.14em] text-[#DDEBDD]/70 mb-3">
                All 10 Diagnostic Regions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ANATOMY_HOTSPOTS.map((spot) => {
                  const active = selectedHotspot.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => setSelectedHotspot(spot)}
                      className={`text-left px-3 py-2 rounded-lg text-xs font-display uppercase tracking-[0.06em] transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                        active
                          ? 'bg-[#F6B27A] text-[#14100A] font-medium'
                          : 'bg-[#123D33]/40 text-[#FFF6EA]/85 hover:bg-[#123D33]/80'
                      }`}
                    >
                      <span className="truncate">{spot.label}</span>
                      <span className="text-[10px] opacity-75 shrink-0">{spot.certainty}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
