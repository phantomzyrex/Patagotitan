import React, { useState } from 'react';
import { FAST_FACTS, SCIENTIFIC_SOURCES } from '../data/patagotitanData';

export const FastFactsSources: React.FC = () => {
  const [sourceQuery, setSourceQuery] = useState<string>('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filteredSources = SCIENTIFIC_SOURCES.filter((src) =>
    src.toLowerCase().includes(sourceQuery.trim().toLowerCase())
  );

  const handleCopyCitation = (text: string, idx: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedIndex(idx);
    window.setTimeout(() => {
      setCopiedIndex((prev) => (prev === idx ? null : prev));
    }, 1800);
  };

  return (
    <section
      id="fast-facts"
      aria-labelledby="facts-heading"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-[#08211C] via-[#123D33] to-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#FFF6EA]/15">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                12
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                SYNTHESIS & BIBLIOGRAPHY
              </span>
            </div>
            <h2
              id="facts-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
            >
              Fast Facts and Sources
            </h2>
          </div>

          <p className="text-xs font-display uppercase tracking-[0.14em] text-[#DDEBDD]/75">
            8 Key Takeaways · 18 Peer-Reviewed & Institutional References
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* 8 "Did You Know" Fast Facts */}
          <div className="lg:col-span-6">
            <h3 className="font-display text-lg uppercase tracking-[0.12em] text-[#FFD3A1] mb-5">
              Did You Know? (8 Essential Facts)
            </h3>
            <ol className="space-y-3.5">
              {FAST_FACTS.map((fact, index) => (
                <li
                  key={index}
                  className="p-4 rounded-xl bg-[#08211C]/85 border border-[#FFF6EA]/12 hover:border-[#F6B27A]/40 transition-colors flex items-baseline gap-4"
                >
                  <span className="font-display text-sm text-[#F6B27A] tabular-nums shrink-0">
                    0{index + 1}
                  </span>
                  <span className="text-sm text-[#FFF6EA]/90 leading-relaxed">
                    {fact}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Scientific Sources List with Search Filter & Copy Citation */}
          <div className="lg:col-span-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h3 className="font-display text-lg uppercase tracking-[0.12em] text-[#FFD3A1]">
                Primary Scientific Sources & Institutions
              </h3>

              <div className="relative">
                <label htmlFor="source-filter-input" className="sr-only">
                  Filter bibliography sources
                </label>
                <input
                  id="source-filter-input"
                  type="search"
                  value={sourceQuery}
                  onChange={(e) => setSourceQuery(e.target.value)}
                  placeholder="Filter by author, year, museum..."
                  className="w-full sm:w-64 px-3.5 py-1.5 rounded-lg bg-[#08211C] border border-[#FFF6EA]/20 text-xs text-[#FFF6EA] placeholder-[#DDEBDD]/50 focus:outline-none focus:border-[#F6B27A]"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#08211C]/85 border border-[#FFF6EA]/12">
              {filteredSources.length === 0 ? (
                <p className="text-sm text-[#DDEBDD]/70 py-4 text-center">
                  No sources match &ldquo;{sourceQuery}&rdquo;.
                </p>
              ) : (
                <ul className="divide-y divide-[#FFF6EA]/10 text-xs sm:text-sm text-[#FFF6EA]/80">
                  {filteredSources.map((source, idx) => (
                    <li
                      key={source}
                      className="py-2.5 flex items-baseline justify-between gap-4 leading-relaxed"
                    >
                      <span>{source}</span>
                      <button
                        type="button"
                        onClick={() => handleCopyCitation(source, idx)}
                        aria-label={`Copy citation: ${source}`}
                        className="text-[11px] font-display uppercase tracking-[0.1em] text-[#F6B27A] hover:text-[#FFD3A1] shrink-0 cursor-pointer"
                      >
                        {copiedIndex === idx ? 'Copied' : 'Cite'}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
