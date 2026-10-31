import React from 'react';

export const EvolutionExtinction: React.FC = () => {
  return (
    <section
      id="evolution"
      aria-labelledby="evolution-heading"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#FFF6EA]/15">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                09
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                MACROEVOLUTION & CHRONOSTRATIGRAPHY
              </span>
            </div>
            <h2
              id="evolution-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
            >
              Evolution and Extinction
            </h2>
          </div>

          <p className="text-xs font-display uppercase tracking-[0.14em] text-[#DDEBDD]/75">
            ~101.6 Ma · 35 Million Years Before Chicxulub
          </p>
        </div>

        {/* Two-Column Narrative: Evolution of Gigantism & Extinction Context */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article className="p-6 sm:p-8 rounded-2xl bg-[#123D33]/35 border border-[#FFF6EA]/12">
            <div className="font-display text-xs uppercase tracking-[0.14em] text-[#F6B27A] mb-2">
              Lognkosaur Gigantism · Sander et al. (2011) & Carballido et al. (2017)
            </div>
            <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-3">
              From ~20 Tonnes to ~60 Tonnes
            </h3>
            <p className="text-sm sm:text-base text-[#FFF6EA]/85 leading-relaxed">
              The 2017 study found that extreme size evolved near the base of the lognkosaur group,
              with maximum weights rising from about <strong>20 to about 60 tonnes</strong>;{' '}
              <em>Dreadnoughtus</em> and <em>Alamosaurus</em> reached large sizes independently, to
              a lesser extent. Giant size in sauropods was probably made possible by fast,
              energy-efficient feeding (long neck, no chewing), fast growth, and many small
              offspring (Sander et al., 2011).
            </p>
          </article>

          <article className="p-6 sm:p-8 rounded-2xl bg-[#123D33]/35 border border-[#FFF6EA]/12">
            <div className="font-display text-xs uppercase tracking-[0.14em] text-[#F6B27A] mb-2">
              Disappearance vs End-Cretaceous Boundary
            </div>
            <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-3">
              35 Million Years Before the Asteroid
            </h3>
            <p className="text-sm sm:text-base text-[#FFF6EA]/85 leading-relaxed">
              Why <em>Patagotitan</em> disappeared is unknown; it is known only from the La Flecha
              area. Titanosaurs as a group survived until the end-Cretaceous mass extinction about{' '}
              <strong>66 million years ago</strong>, caused by the Chicxulub asteroid impact.{' '}
              <em>Patagotitan</em> lived roughly <strong>35 million years before</strong> that
              event, not at the end of the Age of Dinosaurs.
            </p>
          </article>
        </div>

        {/* Animated Geological Timeline: Aptian > Albian > Cenomanian > 66 Ma */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#123D33]/40 border border-[#FFF6EA]/15">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <h3 className="font-display text-xl uppercase tracking-[0.03em] text-[#FFF6EA]">
              Cretaceous Chronostratigraphic Timeline (125 Ma to 66 Ma)
            </h3>
            <span className="text-xs font-display uppercase tracking-[0.12em] text-[#FFD3A1]">
              Ma = Million Years Ago
            </span>
          </div>

          {/* Stages Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
            {/* Stage 1: Aptian */}
            <div className="p-4 rounded-xl bg-[#08211C]/85 border border-[#FFF6EA]/12">
              <div className="font-display text-xs uppercase tracking-[0.12em] text-[#DDEBDD]/70 tabular-nums">
                About 125–113 Ma
              </div>
              <div className="font-display text-lg text-[#FFF6EA] mt-1">
                Aptian Stage
              </div>
              <p className="text-xs text-[#FFF6EA]/70 mt-1">
                Early Cretaceous arid dune plains in central Patagonia.
              </p>
            </div>

            {/* Stage 2: Albian (Contains Argentinosaurus ~107 Ma & Patagotitan ~101.6 Ma) */}
            <div className="p-4 rounded-xl bg-[#08211C] border-2 border-[#F6B27A] relative shadow-[0_0_25px_rgba(246,178,122,0.15)]">
              <div className="font-display text-xs uppercase tracking-[0.12em] text-[#F6B27A] tabular-nums">
                113–100.5 Ma (Latest Albian)
              </div>
              <div className="font-display text-lg text-[#FFF6EA] mt-1">
                Albian Stage
              </div>

              {/* Faded Marker for Argentinosaurus (~107 Ma) */}
              <div className="mt-3 p-2.5 rounded-lg bg-[#123D33]/50 border border-dashed border-[#8E9A6B] opacity-85">
                <div className="flex items-center justify-between text-[11px] font-display text-[#DDEBDD] tabular-nums">
                  <span>○ Argentinosaurus</span>
                  <span>~107 Ma</span>
                </div>
                <p className="text-[11px] text-[#DDEBDD]/80 mt-0.5 leading-snug">
                  Newly re-dated in 2026; older estimates were 97–94 Ma (<strong>debated</strong>).
                </p>
              </div>

              {/* Solid Marker for Patagotitan (~101.6 Ma) */}
              <div className="mt-2.5 p-2.5 rounded-lg bg-[#F6B27A]/20 border border-[#F6B27A]">
                <div className="flex items-center justify-between text-xs font-display text-[#FFD3A1] tabular-nums">
                  <span>● Patagotitan mayorum</span>
                  <span>~101.6 Ma</span>
                </div>
                <p className="text-[11px] text-[#FFF6EA]/90 mt-0.5 leading-snug">
                  Dated from volcanic ash in the Cerro Castaño Member.
                </p>
              </div>
            </div>

            {/* Stage 3: Cenomanian */}
            <div className="p-4 rounded-xl bg-[#08211C]/85 border border-[#FFF6EA]/12">
              <div className="font-display text-xs uppercase tracking-[0.12em] text-[#DDEBDD]/70 tabular-nums">
                100.5–93.9 Ma
              </div>
              <div className="font-display text-lg text-[#FFF6EA] mt-1">
                Cenomanian Stage
              </div>
              <p className="text-xs text-[#FFF6EA]/70 mt-1">
                Early Late Cretaceous; older studies previously placed <em>Argentinosaurus</em> here
                (97–94 Ma).
              </p>
            </div>

            {/* Stage 4: End-Cretaceous Extinction */}
            <div className="p-4 rounded-xl bg-[#3A2A1C]/50 border border-[#D07A45]/40">
              <div className="font-display text-xs uppercase tracking-[0.12em] text-[#F6B27A] tabular-nums">
                About 66 Ma
              </div>
              <div className="font-display text-lg text-[#FFF6EA] mt-1">
                End-Cretaceous Extinction
              </div>
              <p className="text-xs text-[#FFF6EA]/80 mt-1">
                Chicxulub asteroid impact ends the reign of non-avian dinosaurs (~35 Myr after{' '}
                <em>Patagotitan</em>).
              </p>
            </div>
          </div>

          {/* Required Note on 2026 Re-Dating */}
          <p className="mt-5 text-xs sm:text-sm text-[#FFD3A1] border-t border-[#FFF6EA]/10 pt-4">
            <strong>Chronostratigraphic Note:</strong> If the 2026 re-dating of{' '}
            <em>Argentinosaurus</em>’ rocks is right, it lived about 5 million years before{' '}
            <em>Patagotitan</em>, in a different basin of Patagonia.
          </p>
        </div>

        {/* Rock-Layer Strip for the Cerro Barcino Formation */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#08211C]/90 border border-[#FFF6EA]/15">
          <div className="font-display text-xs uppercase tracking-[0.16em] text-[#F6B27A] mb-2">
            Lithostratigraphic Column · Cerro Barcino Formation
          </div>
          <h3 className="font-display text-xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-6">
            Rock-Layer Strip: From Arid Dunes to Humid Floodplain
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Older Member */}
            <div className="p-5 rounded-xl bg-[#3A2A1C]/45 border border-[#D07A45]/35">
              <div className="text-xs font-display uppercase tracking-[0.12em] text-[#F6B27A] tabular-nums">
                1 · Older Unit · About 118–113 Ma
              </div>
              <h4 className="font-display text-lg text-[#FFF6EA] mt-1">
                Puesto La Paloma Member
              </h4>
              <p className="text-xs text-[#FFF6EA]/80 mt-2 leading-relaxed">
                Arid plains with aeolian sand dunes prior to the return of humid floodplain streams.
              </p>
            </div>

            {/* Middle Member (Patagotitan) */}
            <div className="p-5 rounded-xl bg-[#2E6B55]/40 border-2 border-[#F6B27A]">
              <div className="text-xs font-display uppercase tracking-[0.12em] text-[#FFD3A1] tabular-nums">
                2 · Middle Unit · About 113–100.5 Ma
              </div>
              <h4 className="font-display text-lg text-[#FFF6EA] mt-1">
                Cerro Castaño Member (Patagotitan)
              </h4>
              <p className="text-xs text-[#FFF6EA]/90 mt-2 leading-relaxed">
                Humid floodplain with sinuous channels, sporadic sheet floods, conifer forests, and
                volcanic ash falls (~101.6 Ma).
              </p>
            </div>

            {/* Younger Member */}
            <div className="p-5 rounded-xl bg-[#123D33]/45 border border-[#FFF6EA]/15">
              <div className="text-xs font-display uppercase tracking-[0.12em] text-[#DDEBDD]/75 tabular-nums">
                3 · Younger Unit · About 100.5–98 Ma
              </div>
              <h4 className="font-display text-lg text-[#FFF6EA] mt-1">
                Las Plumas Member
              </h4>
              <p className="text-xs text-[#FFF6EA]/80 mt-2 leading-relaxed">
                Overlying sedimentary member capping the Albian–Cenomanian sequence in the Chubut
                Group.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
