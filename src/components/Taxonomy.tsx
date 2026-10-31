import React, { useState } from 'react';
import { TAXONOMY_STOPS, RELATIVE_TAXA } from '../data/patagotitanData';

export const Taxonomy: React.FC = () => {
  const [selectedStopIndex, setSelectedStopIndex] = useState<number>(4); // Default 2022 redefinition
  const activeStop = TAXONOMY_STOPS[selectedStopIndex];

  const taxonomyRanks = [
    { rank: 'Kingdom', name: 'Animalia' },
    { rank: 'Phylum', name: 'Chordata' },
    { rank: 'Clade', name: 'Dinosauria' },
    { rank: 'Order / Clade', name: 'Saurischia > Sauropodomorpha' },
    { rank: 'Clade', name: 'Sauropoda > Macronaria' },
    { rank: 'Clade', name: 'Titanosauria' },
    { rank: 'Clade', name: 'Colossosauria (as redefined in 2022)' },
    { rank: 'Clade', name: 'Lognkosauria' },
    { rank: 'Genus', name: 'Patagotitan' },
    { rank: 'Species', name: 'P. mayorum (only known species)' },
  ];

  return (
    <section
      id="classification"
      aria-labelledby="taxonomy-heading"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-[#08211C] via-[#123D33] to-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#FFF6EA]/15">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                08
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                SYSTEMATICS & PHYLOGENETICS
              </span>
            </div>
            <h2
              id="taxonomy-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
            >
              Classification and Species
            </h2>
          </div>

          <p className="text-xs font-display uppercase tracking-[0.14em] text-[#DDEBDD]/75">
            Monotypic Genus · Type & Only Species: P. mayorum
          </p>
        </div>

        {/* Main Grid: Taxonomy Hierarchy Card + Interactive Study Stops Slider */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 5 cols: Taxonomy Card */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#08211C]/90 border border-[#FFF6EA]/15 flex flex-col justify-between">
            <div>
              <div className="font-display text-xs uppercase tracking-[0.14em] text-[#F6B27A] mb-2">
                Systematic Hierarchy
              </div>
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-6">
                Linnaean & Cladistic Rank
              </h3>

              <dl className="divide-y divide-[#FFF6EA]/10">
                {taxonomyRanks.map((item) => (
                  <div
                    key={item.name}
                    className="py-2.5 flex items-baseline justify-between gap-4 text-sm"
                  >
                    <dt className="font-display text-xs uppercase tracking-[0.1em] text-[#DDEBDD]/70">
                      {item.rank}
                    </dt>
                    <dd className="text-right font-medium text-[#FFF6EA]">
                      {item.name}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-6 text-xs text-[#FFD3A1]/90 border-t border-[#FFF6EA]/10 pt-3">
              <em>Patagotitan mayorum</em> is the only known species within the genus{' '}
              <em>Patagotitan</em>.
            </p>
          </div>

          {/* Right 7 cols: Interactive "Who are its closest relatives?" Study Slider */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#08211C]/85 border border-[#FFF6EA]/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs font-display uppercase tracking-[0.14em] text-[#F6B27A] mb-2">
                <span>Interactive Phylogenetic History (2017–2022)</span>
                <span>Status · {activeStop.certainty}</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-4">
                Who Are Its Closest Relatives?
              </h3>

              {/* Study Stop Selector Buttons */}
              <div
                role="group"
                aria-label="Select phylogenetic study year"
                className="grid grid-cols-5 gap-2 mb-6"
              >
                {TAXONOMY_STOPS.map((stop, idx) => (
                  <button
                    key={stop.year}
                    type="button"
                    onClick={() => setSelectedStopIndex(idx)}
                    aria-pressed={selectedStopIndex === idx}
                    className={`py-2.5 px-2 rounded-xl font-display text-xs sm:text-sm uppercase tracking-[0.08em] transition-all cursor-pointer border tabular-nums ${
                      selectedStopIndex === idx
                        ? 'bg-[#F6B27A] text-[#14100A] border-[#FFF6EA] shadow-md'
                        : 'bg-[#123D33]/50 text-[#FFF6EA]/80 border-[#FFF6EA]/15 hover:border-[#F6B27A]'
                    }`}
                  >
                    {stop.year}
                  </button>
                ))}
              </div>

              {/* Active Study Card */}
              <div className="p-6 rounded-xl bg-[#123D33]/40 border border-[#F6B27A]/35">
                <div className="text-xs font-display uppercase tracking-[0.12em] text-[#FFD3A1] mb-1">
                  {activeStop.authors}
                </div>
                <h4 className="font-display text-xl text-[#FFF6EA] mb-3">
                  {activeStop.headline}
                </h4>
                <p className="text-sm sm:text-base text-[#FFF6EA]/85 leading-relaxed mb-5">
                  {activeStop.summary}
                </p>

                {/* Recovered Clade Path */}
                <div className="pt-4 border-t border-[#FFF6EA]/10">
                  <div className="text-[11px] font-display uppercase tracking-[0.12em] text-[#DDEBDD]/70 mb-2">
                    Recovered Clade Topology
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#FFD3A1] font-display">
                    {activeStop.cladePath.map((node, i) => (
                      <React.Fragment key={node}>
                        <span>{node}</span>
                        {i < activeStop.cladePath.length - 1 && (
                          <span aria-hidden="true" className="text-[#FFF6EA]/40">
                            &gt;
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Range input scrubber for quick keyboard/drag sliding */}
            <div className="mt-6 pt-4 border-t border-[#FFF6EA]/10 flex items-center gap-4">
              <label
                htmlFor="phylogeny-year-slider"
                className="text-xs font-display uppercase tracking-[0.12em] text-[#DDEBDD]/75 whitespace-nowrap"
              >
                Scrub Studies:
              </label>
              <input
                id="phylogeny-year-slider"
                type="range"
                min={0}
                max={TAXONOMY_STOPS.length - 1}
                step={1}
                value={selectedStopIndex}
                onChange={(e) => setSelectedStopIndex(Number(e.target.value))}
                aria-label="Who are its closest relatives study slider"
                className="w-full accent-[#F6B27A] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Relatives Grid (7 Titanosaur Relatives) */}
        <div className="mt-10">
          <h3 className="font-display text-sm uppercase tracking-[0.16em] text-[#F6B27A] mb-4">
            Key Titanosaur Relatives Compared in the Literature
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATIVE_TAXA.map((rel) => (
              <article
                key={rel.name}
                className="p-4 rounded-xl bg-[#08211C]/75 border border-[#FFF6EA]/12"
              >
                <h4 className="font-display text-base text-[#FFD3A1] italic mb-1">
                  {rel.name}
                </h4>
                <p className="text-xs text-[#FFF6EA]/80 leading-relaxed">
                  {rel.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
