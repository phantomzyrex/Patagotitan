import React, { useState } from 'react';
import { SeasonGaugeState } from '../data/patagotitanData';

interface SeasonGaugeProps {
  seasonState: SeasonGaugeState;
}

export const SeasonGauge: React.FC<SeasonGaugeProps> = ({ seasonState }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <aside
      aria-label="Seasonal Biome Gauge"
      className="fixed right-4 sm:right-7 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end select-none"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      <button
        type="button"
        aria-label={`Season Gauge: currently ${seasonState.label} (${seasonState.sublabel}). Decorative: the rocks record wetter and drier conditions, but the actual seasonal cycle is inferred.`}
        className="group relative flex items-center gap-3 bg-transparent border-0 p-2 cursor-help focus-visible:outline-2 focus-visible:outline-[#F6B27A] rounded-lg"
      >
        {/* Labels column */}
        <div className="flex flex-col justify-between h-44 text-right font-display text-[10px] tracking-[0.16em] uppercase">
          <div
            className={`transition-opacity duration-300 ${
              seasonState.phase === 'DRY' ? 'text-[#F6B27A] opacity-100' : 'text-[#FFF6EA]/45'
            }`}
          >
            <div>DRY</div>
            <div className="text-[8px] tracking-[0.12em] opacity-75">SEMI-ARID</div>
          </div>

          <div
            className={`transition-opacity duration-300 ${
              seasonState.phase === 'TRANSITION'
                ? 'text-[#DDEBDD] opacity-100'
                : 'text-[#FFF6EA]/45'
            }`}
          >
            <div>TRANSITION</div>
          </div>

          <div
            className={`transition-opacity duration-300 ${
              seasonState.phase === 'WET' ? 'text-[#DDEBDD] opacity-100' : 'text-[#FFF6EA]/45'
            }`}
          >
            <div>WET</div>
            <div className="text-[8px] tracking-[0.12em] opacity-75">HUMID</div>
          </div>
        </div>

        {/* Vertical gauge track + droplet marker */}
        <div className="relative h-44 w-4 flex justify-center">
          <div
            className="h-full w-[1px]"
            style={{
              background:
                'linear-gradient(to bottom, #F6B27A 0%, #8E9A6B 50%, #2E6B55 100%)',
            }}
          />

          {/* Droplet-shaped marker */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150"
            style={{
              top: `${seasonState.dropletYPercent}%`,
            }}
          >
            <svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              aria-hidden="true"
              className="drop-shadow-[0_0_8px_rgba(246,178,122,0.7)]"
            >
              <path
                d="M7 1C7 1 13 8.2 13 12C13 15.3137 10.3137 17 7 17C3.68629 17 1 15.3137 1 12C1 8.2 7 1 7 1Z"
                fill={
                  seasonState.phase === 'DRY'
                    ? '#F6B27A'
                    : seasonState.phase === 'TRANSITION'
                    ? '#8E9A6B'
                    : '#DDEBDD'
                }
                stroke="#FFF6EA"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Scientific disclaimer tooltip */}
      {showTooltip && (
        <div
          role="tooltip"
          className="mt-2 max-w-[240px] p-3 rounded-xl bg-[#08211C]/95 border border-[#FFF6EA]/20 text-[11px] leading-relaxed text-[#FFF6EA]/90 shadow-xl backdrop-blur-md text-right"
        >
          <span className="font-display uppercase tracking-wider text-[#F6B27A] block mb-0.5">
            Inferred Palaeo-Climate
          </span>
          Decorative: the rocks record wetter and drier conditions, but the actual seasonal cycle is inferred.
        </div>
      )}
    </aside>
  );
};
