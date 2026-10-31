import React, { useState } from 'react';
import { TIMELINE_EVENTS } from '../data/patagotitanData';

export const Timeline: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'excavation' | 'studies'>('all');

  const filteredEvents = TIMELINE_EVENTS.filter((ev) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'excavation') {
      return ['2010', 'Late 2012', '2013–2015', 'January 2016', '1 June 2018', 'Mar 2023 – Jan 2024'].includes(
        ev.year
      );
    }
    return ['2014', '2017', '2019', '2020', '2022', '2025', 'Today'].includes(ev.year);
  });

  return (
    <section
      id="discovery"
      aria-labelledby="discovery-heading"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[#FFF6EA]/15">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                03
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                CHRONOLOGY · LA FLECHA TO GLOBAL MUSEUMS
              </span>
            </div>
            <h2
              id="discovery-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
            >
              Discovery and History
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Filter timeline milestones"
            className="flex items-center gap-1.5 p-1 rounded-xl bg-[#123D33]/60 border border-[#FFF6EA]/12 self-start lg:self-auto"
          >
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-display uppercase tracking-[0.1em] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#F6B27A] text-[#14100A]'
                  : 'text-[#FFF6EA]/80 hover:text-[#FFF6EA]'
              }`}
            >
              All Milestones (13)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('excavation')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-display uppercase tracking-[0.1em] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'excavation'
                  ? 'bg-[#F6B27A] text-[#14100A]'
                  : 'text-[#FFF6EA]/80 hover:text-[#FFF6EA]'
              }`}
            >
              Digs & Museum Mounts
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('studies')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-display uppercase tracking-[0.1em] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeFilter === 'studies'
                  ? 'bg-[#F6B27A] text-[#14100A]'
                  : 'text-[#FFF6EA]/80 hover:text-[#FFF6EA]'
              }`}
            >
              Scientific Revisions
            </button>
          </div>
        </div>

        {/* Vertical Timeline with Animated Draw-Line */}
        <div className="mt-14 relative pl-6 sm:pl-12">
          {/* Vertical Spine Line */}
          <div
            aria-hidden="true"
            className="absolute left-2 sm:left-4 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#F6B27A] via-[#5E8A58] to-[#2E6B55]"
          />

          <div className="space-y-8">
            {filteredEvents.map((event) => (
              <article
                key={event.year}
                className="relative group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-6 rounded-2xl bg-[#123D33]/35 border border-[#FFF6EA]/12 hover:border-[#F6B27A]/45 transition-all"
              >
                {/* Timeline node marker on vertical spine */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[21px] sm:-left-[37px] top-8 w-3 h-3 rounded-full bg-[#08211C] border-2 border-[#F6B27A] group-hover:scale-125 transition-transform"
                />

                {/* Year & Certainty Column */}
                <div className="md:col-span-3 flex flex-col justify-start">
                  <span className="font-display text-xl sm:text-2xl text-[#FFD3A1] tabular-nums">
                    {event.year}
                  </span>
                  {event.certainty && (
                    <span className="text-[11px] font-display uppercase tracking-[0.14em] text-[#DDEBDD]/70 mt-1">
                      Status · {event.certainty}
                    </span>
                  )}
                </div>

                {/* Event Content Column */}
                <div className="md:col-span-9">
                  <h3 className="font-display text-lg sm:text-xl uppercase tracking-[0.03em] text-[#FFF6EA] mb-2">
                    {event.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#FFF6EA]/85 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
