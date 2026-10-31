import React, { useState } from 'react';
import { MYTH_CARDS } from '../data/patagotitanData';

export const MythReality: React.FC = () => {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allFlipped = MYTH_CARDS.every((c) => flippedIds[c.id]);

  const handleToggleAll = () => {
    if (allFlipped) {
      setFlippedIds({});
    } else {
      const next: Record<string, boolean> = {};
      for (const c of MYTH_CARDS) {
        next[c.id] = true;
      }
      setFlippedIds(next);
    }
  };

  return (
    <section
      id="myth-reality"
      aria-labelledby="myth-heading"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-[#08211C] via-[#123D33] to-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-[#FFF6EA]/15">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                10
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                CRITICAL REVIEW · HEADLINES VS EVIDENCE
              </span>
            </div>
            <h2
              id="myth-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
            >
              Myth vs Reality
            </h2>
          </div>

          <button
            type="button"
            onClick={handleToggleAll}
            className="px-4 py-2 rounded-xl bg-[#08211C] border border-[#FFF6EA]/20 hover:border-[#F6B27A] text-xs font-display uppercase tracking-[0.12em] text-[#FFF6EA] transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap shrink-0"
          >
            {allFlipped ? 'Reset All Cards to Myth' : 'Reveal All Scientific Realities'}
          </button>
        </div>

        {/* 6 Interactive Flip Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MYTH_CARDS.map((card) => {
            const isFlipped = Boolean(flippedIds[card.id]);
            return (
              <div key={card.id} className="perspective-1000 h-full min-h-[260px]">
                <button
                  type="button"
                  onClick={() => toggleCard(card.id)}
                  aria-pressed={isFlipped}
                  aria-label={`Myth ${card.number}: ${card.myth}. Click to flip between popular myth and scientific reality.`}
                  className="w-full h-full text-left p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-[#F6B27A]"
                  style={{
                    backgroundColor: isFlipped ? 'rgba(18, 61, 51, 0.72)' : 'rgba(8, 33, 28, 0.85)',
                    borderColor: isFlipped
                      ? 'rgba(246, 178, 122, 0.65)'
                      : 'rgba(255, 246, 234, 0.14)',
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-display uppercase tracking-[0.14em] mb-4">
                      <span className={isFlipped ? 'text-[#F6B27A]' : 'text-[#D07A45]'}>
                        {isFlipped ? `REALITY ${card.number} · ${card.verdict}` : `POPULAR MYTH ${card.number}`}
                      </span>
                      <span className="text-[#DDEBDD]/70">· {card.certainty}</span>
                    </div>

                    {!isFlipped ? (
                      <h3 className="font-display text-xl sm:text-2xl text-[#FFF6EA] leading-snug">
                        {card.myth}
                      </h3>
                    ) : (
                      <div>
                        <div className="text-xs text-[#FFD3A1]/80 font-display mb-2 line-through">
                          {card.myth}
                        </div>
                        <p className="text-sm sm:text-base text-[#FFF6EA] leading-relaxed font-normal">
                          {card.reality}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#FFF6EA]/10 flex items-center justify-between text-xs font-display uppercase tracking-[0.12em] text-[#FFD3A1]">
                    <span>{isFlipped ? 'Showing Scientific Evidence' : 'Click to Reveal Evidence'}</span>
                    <span aria-hidden="true">{isFlipped ? '↺ Flip Back' : '↻ Flip Card'}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
