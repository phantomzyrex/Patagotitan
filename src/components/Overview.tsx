import React from 'react';
import { OVERVIEW_STATS } from '../data/patagotitanData';

export const Overview: React.FC = () => {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-[#08211C] via-[#123D33] to-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#FFF6EA]/15">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                02
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                OVERVIEW · PALAEONTOLOGICAL DOSSIER
              </span>
            </div>
            <h2
              id="overview-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
            >
              The Patagonian Giant
            </h2>
          </div>

          <p className="text-xs uppercase tracking-[0.14em] text-[#DDEBDD]/75 font-display">
            Holotype MPEF-PV 3400 · Cerro Barcino Formation
          </p>
        </div>

        {/* Scientific Editorial Intro */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <p className="text-lg sm:text-xl leading-relaxed text-[#FFF6EA]/95 font-light max-w-[68ch]">
              <em className="font-display not-italic text-[#FFD3A1]">Patagotitan mayorum</em> was a
              gigantic, long-necked, plant-eating sauropod—a titanosaur—from Chubut Province in
              Patagonia, Argentina. It was announced in 2014 and named in 2017, at first billed as
              the biggest land animal known, though later studies lowered its size estimates. It
              remains one of the best-known giant titanosaurs because its remains come from at least
              six individuals.
            </p>
          </div>

          <div className="lg:col-span-4 p-5 rounded-xl bg-[#08211C]/80 border border-[#FFF6EA]/12 text-xs leading-relaxed text-[#DDEBDD]/85">
            <div className="font-display uppercase tracking-[0.14em] text-[#F6B27A] mb-1.5">
              Scientific Epistemology Note
            </div>
            <p>
              <em>Patagotitan</em>’s exact dimensions are debated and its skull is unpreserved.
              Throughout this monograph, metrics are explicitly designated as{' '}
              <strong className="text-[#FFF6EA] font-medium">estimate</strong>, contested rankings
              as <strong className="text-[#FFF6EA] font-medium">debated</strong>, and palaeo-biological
              deductions as <strong className="text-[#FFF6EA] font-medium">inferred</strong>.
            </p>
          </div>
        </div>

        {/* Stat Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OVERVIEW_STATS.map((stat) => (
            <article
              key={stat.id}
              className="p-6 rounded-2xl bg-[#08211C]/75 border border-[#FFF6EA]/12 hover:border-[#F6B27A]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs text-[#DDEBDD]/70 mb-2">
                  <span className="font-display uppercase tracking-[0.12em]">
                    {stat.label}
                  </span>
                  {stat.certainty && (
                    <span className="uppercase tracking-[0.12em] text-[11px] text-[#F6B27A]">
                      · {stat.certainty}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-xl sm:text-2xl text-[#FFF6EA] tracking-[0.01em] mb-3 tabular-nums">
                  {stat.value}
                </h3>
              </div>

              <p className="text-sm text-[#FFF6EA]/80 leading-relaxed border-t border-[#FFF6EA]/10 pt-3">
                {stat.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
