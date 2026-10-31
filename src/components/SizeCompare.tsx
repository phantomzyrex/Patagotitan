import React, { useState } from 'react';
import { getSizeComparisonData, SizeComparisonEntity } from '../data/patagotitanData';

export const SizeCompare: React.FC = () => {
  const [estimateMode, setEstimateMode] = useState<'later' | '2017'>('later');
  const [includeArgentinosaurus, setIncludeArgentinosaurus] = useState<boolean>(false);

  const entities = getSizeComparisonData(estimateMode, includeArgentinosaurus);

  const renderSilhouetteSvg = (entity: SizeComparisonEntity) => {
    switch (entity.id) {
      case 'human':
        return (
          <svg viewBox="0 0 24 60" className="h-10 w-auto fill-[#FFF6EA]" aria-hidden="true">
            <circle cx="12" cy="8" r="5" />
            <path d="M7,15 H17 L19,34 H15 L14,58 H10 L9,34 H5 Z" />
          </svg>
        );
      case 'elephant':
        return (
          <svg viewBox="0 0 120 75" className="h-14 w-auto fill-[#8E9A6B]" aria-hidden="true">
            <path d="M20,30 C25,14 55,12 75,20 C90,22 102,28 106,42 C108,52 106,64 102,64 C99,64 100,48 96,42 L90,72 H78 L76,48 H52 L50,72 H38 L36,46 L26,72 H14 L16,38 Z" />
          </svg>
        );
      case 'bus':
        return (
          <svg viewBox="0 0 200 65" className="h-14 w-auto fill-[#DDEBDD]/75" aria-hidden="true">
            <rect x="6" y="10" width="188" height="42" rx="6" />
            <circle cx="42" cy="54" r="9" fill="#08211C" stroke="#DDEBDD" strokeWidth="3" />
            <circle cx="156" cy="54" r="9" fill="#08211C" stroke="#DDEBDD" strokeWidth="3" />
          </svg>
        );
      case 'trex':
        return (
          <svg viewBox="0 0 210 80" className="h-16 w-auto fill-[#D07A45]" aria-hidden="true">
            <path d="M12,38 C45,36 78,32 108,24 C128,18 148,10 172,12 C188,13 198,20 196,28 C186,32 174,31 166,28 C156,36 144,44 132,48 L142,76 H128 L118,52 L102,76 H88 L96,46 C64,48 36,44 12,38 Z" />
          </svg>
        );
      case 'blue_whale':
        return (
          <svg viewBox="0 0 420 75" className="h-16 w-auto fill-[#2E6B55]" aria-hidden="true">
            <path d="M8,40 C24,32 45,36 68,38 C145,24 255,18 355,26 C392,29 412,36 414,42 C385,54 310,58 225,54 C145,50 68,46 32,44 L10,56 L16,42 L4,30 Z" />
          </svg>
        );
      case 'patagotitan':
      case 'argentinosaurus': {
        const isPatago = entity.id === 'patagotitan';
        return (
          <svg
            viewBox="0 0 520 110"
            className="h-24 sm:h-28 w-full preserve-3d"
            aria-label={`${entity.name} generic sauropod silhouette with dashed skull outline`}
          >
            {/* Body, Neck, Limbs and Tail Silhouette */}
            <path
              d="M12,72 C58,70 112,64 168,52 C205,42 245,38 282,42 C315,44 345,34 388,18 C422,6 452,4 472,6 L474,14 C448,16 418,24 385,42 C355,58 340,68 334,78 L338,106 H320 L314,80 C282,82 252,82 224,78 L218,106 H200 L198,74 C135,76 72,78 12,72 Z"
              fill={isPatago ? '#F6B27A' : '#8E9A6B'}
              fillOpacity={isPatago ? '0.92' : '0.78'}
            />
            {/* Dashed Skull Reconstruction Outline ("not preserved: reconstructed from relatives") */}
            <path
              d="M472,5 C484,4 496,7 500,12 C496,16 484,16 474,14 Z"
              fill="none"
              stroke="#FFF6EA"
              strokeWidth="1.8"
              strokeDasharray="3 2"
            />
            <text
              x="412"
              y="29"
              fill="#FFF6EA"
              fontSize="8.5"
              fontFamily="Marcellus, serif"
            >
              Skull dashed (not preserved)
            </text>
          </svg>
        );
      }
      default:
        return null;
    }
  };

  return (
    <section
      id="size-comparison"
      aria-labelledby="size-heading"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header & Interactive Toggles */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#FFF6EA]/15">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                05
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                MORPHOMETRIC SCALE · 0 TO 38 METRES
              </span>
            </div>
            <h2
              id="size-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
            >
              Size Comparison
            </h2>
          </div>

          {/* Required Interactive Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle 1: Later estimate (31m, ~57t) vs 2017 estimate (37m, 69t) */}
            <div
              role="group"
              aria-label="Select Patagotitan size estimate"
              className="flex items-center gap-1 p-1 rounded-xl bg-[#123D33]/70 border border-[#FFF6EA]/15"
            >
              <button
                type="button"
                onClick={() => setEstimateMode('later')}
                className={`px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  estimateMode === 'later'
                    ? 'bg-[#F6B27A] text-[#14100A]'
                    : 'text-[#FFF6EA]/80 hover:text-[#FFF6EA]'
                }`}
              >
                Later estimate (31 m, about 57 tonnes)
              </button>
              <button
                type="button"
                onClick={() => setEstimateMode('2017')}
                className={`px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-[0.08em] transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  estimateMode === '2017'
                    ? 'bg-[#F6B27A] text-[#14100A]'
                    : 'text-[#FFF6EA]/80 hover:text-[#FFF6EA]'
                }`}
              >
                2017 estimate (37 m, 69 tonnes)
              </button>
            </div>

            {/* Toggle 2: Add Argentinosaurus (about 30-35 m, 65-80 tonnes) */}
            <button
              type="button"
              onClick={() => setIncludeArgentinosaurus((prev) => !prev)}
              aria-pressed={includeArgentinosaurus}
              className={`px-4 py-2 rounded-xl text-xs font-display uppercase tracking-[0.08em] border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                includeArgentinosaurus
                  ? 'bg-[#8E9A6B] text-[#14100A] border-[#FFF6EA]'
                  : 'bg-[#123D33]/40 text-[#FFF6EA] border-[#FFF6EA]/25 hover:border-[#F6B27A]'
              }`}
            >
              {includeArgentinosaurus
                ? '✓ Argentinosaurus Added (30–35 m, 65–80 t)'
                : '+ Add Argentinosaurus (about 30–35 m, 65–80 tonnes)'}
            </button>
          </div>
        </div>

        {/* Scale Ruler Axis (0m to 38m) */}
        <div className="mt-10 hidden sm:flex items-center justify-between text-xs font-display text-[#DDEBDD]/60 border-b border-[#FFF6EA]/15 pb-2 tabular-nums">
          <span>0 m</span>
          <span>10 m</span>
          <span>20 m</span>
          <span>30 m</span>
          <span>38 m</span>
        </div>

        {/* Silhouette Scale Chart Rows */}
        <div className="mt-6 space-y-5">
          {entities.map((entity) => (
            <div
              key={entity.id}
              className={`p-5 rounded-2xl border transition-all ${
                entity.isHighlighted
                  ? 'bg-[#123D33]/65 border-[#F6B27A]/60 shadow-[0_0_30px_rgba(246,178,122,0.12)]'
                  : entity.isComparisonTarget
                  ? 'bg-[#123D33]/45 border-[#8E9A6B]/60'
                  : 'bg-[#123D33]/25 border-[#FFF6EA]/10'
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-display text-lg sm:text-xl text-[#FFF6EA] uppercase tracking-[0.03em]">
                    {entity.name}
                  </h3>
                  <span className="text-xs text-[#DDEBDD]/70">
                    {entity.subtitle} ·{' '}
                    <strong className="text-[#F6B27A] uppercase font-display">
                      {entity.certainty}
                    </strong>
                  </span>
                </div>

                <div className="text-xs sm:text-sm font-display text-[#FFD3A1] tabular-nums">
                  {entity.lengthLabel} · {entity.massLabel}
                </div>
              </div>

              {/* Proportional Horizontal Scale Bar + Silhouette */}
              <div className="relative w-full bg-[#08211C]/90 rounded-xl p-4 overflow-hidden border border-[#FFF6EA]/8">
                <div
                  className="transition-all duration-500 ease-out flex items-end"
                  style={{ width: `${Math.max(8, entity.widthPercent)}%` }}
                >
                  {renderSilhouetteSvg(entity)}
                </div>
                <div
                  className="mt-2 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${entity.widthPercent}%`,
                    background: entity.isHighlighted
                      ? 'linear-gradient(90deg, #D07A45, #F6B27A)'
                      : entity.isComparisonTarget
                      ? 'linear-gradient(90deg, #5E8A58, #8E9A6B)'
                      : 'rgba(221, 235, 221, 0.35)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Required Scientific Caption & Generic Skull Reconstruction Note */}
        <div className="mt-10 p-6 rounded-2xl bg-[#123D33]/40 border border-[#FFF6EA]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-[#FFF6EA]/90">
          <p className="leading-relaxed max-w-3xl">
            <strong className="font-display uppercase tracking-wider text-[#F6B27A] mr-2">
              Debated Size Ranking:
            </strong>
            Which titanosaur was biggest is debated. The 2017 study put <em>Patagotitan</em> about
            10% above <em>Argentinosaurus</em>, but later work found its back-vertebra column
            shorter (about 3.67 m vs about 4.47 m).
          </p>
          <p className="text-xs text-[#DDEBDD]/75 font-display uppercase tracking-[0.08em] shrink-0">
            Note: Sauropod silhouette is a generic reconstruction because the skull is unknown.
          </p>
        </div>
      </div>
    </section>
  );
};
