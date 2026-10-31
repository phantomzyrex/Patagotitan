import React, { useState } from 'react';

export const DietLifeHistory: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<1 | 2 | 3 | 4>(1);

  const burialLayerDescriptions: Record<1 | 2 | 3 | 4, { title: string; detail: string }> = {
    1: {
      title: 'Upper Burial Horizon (Main Quarry — within 3.43 m deposit)',
      detail:
        'Contains associated sauropod elements buried by low-energy overbank sheet floods. The water flow was too gentle to transport heavy limb or vertebral bones, preserving the individual where it died.',
    },
    2: {
      title: 'Middle Burial Horizon (Main Quarry — within 3.43 m deposit)',
      detail:
        'Separated by fine floodplain siltstone and volcanic ash-bearing mudstone, showing that the six individuals died across multiple episodic events rather than a single simultaneous catastrophe.',
    },
    3: {
      title: 'Lower Burial Horizon (Main Quarry — Basal Bed)',
      detail:
        'Earliest bonebed in the main 3.43 m sequence at La Flecha, preserving overlapping elements of young-adult individuals alongside shed theropod teeth.',
    },
    4: {
      title: 'Fourth Horizon (Second Quarry ~300 m West)',
      detail:
        'A fourth stratigraphic layer located in a second quarry about 300 m west of the main site preserves another similarly sized sauropod skeleton.',
    },
  };

  return (
    <section
      id="diet-life"
      aria-labelledby="diet-heading"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-[#08211C] via-[#123D33] to-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#FFF6EA]/15">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                06
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                PALAEOBIOLOGY · ONTOGENY & TAPHONOMY
              </span>
            </div>
            <h2
              id="diet-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
            >
              Diet and Life History
            </h2>
          </div>

          <p className="text-xs font-display uppercase tracking-[0.14em] text-[#DDEBDD]/75">
            Histology of 5 Femora & 1 Humerus · 3.43 m Bonebed
          </p>
        </div>

        {/* Top Row: Diet + Hypothetical Food-Web Graphic */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Diet & Growth Cards */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <article className="p-6 sm:p-8 rounded-2xl bg-[#08211C]/80 border border-[#FFF6EA]/12">
              <div className="flex items-center justify-between text-xs font-display uppercase tracking-[0.14em] text-[#F6B27A] mb-2">
                <span>Herbivory & Floral Context</span>
                <span>· inferred</span>
              </div>
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-3">
                High-Canopy & Understory Browser
              </h3>
              <p className="text-sm sm:text-base text-[#FFF6EA]/85 leading-relaxed">
                <em>Patagotitan</em> was a plant-eater (<strong>inferred</strong> from its relatives).
                The floodplain forest it lived in held conifers, ferns and, more rarely, flowering
                plants; <strong className="text-[#FFD3A1]">this shows what grew there, not what it ate</strong>.
              </p>
            </article>

            <article className="p-6 sm:p-8 rounded-2xl bg-[#08211C]/80 border border-[#FFF6EA]/12">
              <div className="flex items-center justify-between text-xs font-display uppercase tracking-[0.14em] text-[#F6B27A] mb-2">
                <span>Bone Histology & Growth</span>
                <span>· inferred</span>
              </div>
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-3">
                Young Adults Still Growing
              </h3>
              <p className="text-sm sm:text-base text-[#FFF6EA]/85 leading-relaxed">
                Microscopic bone studies of <strong>five femora and one humerus</strong> show the
                animals died as young adults, with growth slowing but not stopping—so older, fully
                grown individuals may have been larger.
              </p>
            </article>
          </div>

          {/* Animated Food-Web Graphic Labelled "Hypothetical" */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#08211C]/90 border border-[#FFF6EA]/15 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 border-b border-[#FFF6EA]/10 pb-3">
              <span className="font-display text-xs uppercase tracking-[0.16em] text-[#FFD3A1]">
                Trophic Flow Diagram
              </span>
              <span className="text-xs font-display uppercase tracking-[0.14em] text-[#F6B27A]">
                Label: Hypothetical (Inferred)
              </span>
            </div>

            <div className="my-auto py-6">
              <svg
                viewBox="0 0 560 190"
                className="w-full h-auto"
                aria-label="Hypothetical food-web graphic: Plants to Patagotitan to Large Predators"
              >
                <defs>
                  <linearGradient id="trophicArrow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5E8A58" />
                    <stop offset="50%" stopColor="#F6B27A" />
                    <stop offset="100%" stopColor="#D07A45" />
                  </linearGradient>
                </defs>

                {/* Node 1: Floodplain Plants */}
                <g transform="translate(10, 30)">
                  <rect
                    x="0"
                    y="0"
                    width="150"
                    height="125"
                    rx="14"
                    fill="#123D33"
                    stroke="#5E8A58"
                    strokeWidth="1.5"
                  />
                  <text
                    x="75"
                    y="34"
                    textAnchor="middle"
                    fill="#DDEBDD"
                    fontSize="11"
                    fontFamily="Marcellus, serif"
                  >
                    01 · FLORA
                  </text>
                  <text
                    x="75"
                    y="58"
                    textAnchor="middle"
                    fill="#FFF6EA"
                    fontSize="14"
                    fontFamily="Marcellus, serif"
                  >
                    PLANTS
                  </text>
                  <text
                    x="75"
                    y="82"
                    textAnchor="middle"
                    fill="#DDEBDD"
                    fontSize="10"
                    fontFamily="Jost, sans-serif"
                  >
                    Conifers, Ferns &
                  </text>
                  <text
                    x="75"
                    y="98"
                    textAnchor="middle"
                    fill="#DDEBDD"
                    fontSize="10"
                    fontFamily="Jost, sans-serif"
                  >
                    Rare Angiosperms
                  </text>
                </g>

                {/* Arrow 1 */}
                <g>
                  <line
                    x1="166"
                    y1="92"
                    x2="200"
                    y2="92"
                    stroke="url(#trophicArrow)"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />
                  <polygon points="200,87 210,92 200,97" fill="#F6B27A" />
                </g>

                {/* Node 2: Patagotitan */}
                <g transform="translate(215, 22)">
                  <rect
                    x="0"
                    y="0"
                    width="145"
                    height="140"
                    rx="14"
                    fill="#123D33"
                    stroke="#F6B27A"
                    strokeWidth="2"
                  />
                  <text
                    x="72.5"
                    y="34"
                    textAnchor="middle"
                    fill="#F6B27A"
                    fontSize="11"
                    fontFamily="Marcellus, serif"
                  >
                    02 · HERBIVORE
                  </text>
                  <text
                    x="72.5"
                    y="60"
                    textAnchor="middle"
                    fill="#FFF6EA"
                    fontSize="14"
                    fontFamily="Marcellus, serif"
                  >
                    PATAGOTITAN
                  </text>
                  <text
                    x="72.5"
                    y="86"
                    textAnchor="middle"
                    fill="#FFD3A1"
                    fontSize="10"
                    fontFamily="Jost, sans-serif"
                  >
                    Primary Consumer
                  </text>
                  <text
                    x="72.5"
                    y="104"
                    textAnchor="middle"
                    fill="#DDEBDD"
                    fontSize="9.5"
                    fontFamily="Jost, sans-serif"
                  >
                    (Diet inferred)
                  </text>
                </g>

                {/* Arrow 2 */}
                <g>
                  <line
                    x1="366"
                    y1="92"
                    x2="396"
                    y2="92"
                    stroke="url(#trophicArrow)"
                    strokeWidth="2.5"
                    strokeDasharray="4 3"
                  />
                  <polygon points="396,87 406,92 396,97" fill="#D07A45" />
                </g>

                {/* Node 3: Large Predators / Scavengers */}
                <g transform="translate(410, 30)">
                  <rect
                    x="0"
                    y="0"
                    width="140"
                    height="125"
                    rx="14"
                    fill="#3A2A1C"
                    stroke="#D07A45"
                    strokeWidth="1.5"
                  />
                  <text
                    x="70"
                    y="34"
                    textAnchor="middle"
                    fill="#F6B27A"
                    fontSize="11"
                    fontFamily="Marcellus, serif"
                  >
                    03 · THEROPODS
                  </text>
                  <text
                    x="70"
                    y="56"
                    textAnchor="middle"
                    fill="#FFF6EA"
                    fontSize="12.5"
                    fontFamily="Marcellus, serif"
                  >
                    LARGE PREDATORS
                  </text>
                  <text
                    x="70"
                    y="82"
                    textAnchor="middle"
                    fill="#FFF6EA"
                    fontSize="10"
                    fontFamily="Jost, sans-serif"
                  >
                    57 shed teeth at site
                  </text>
                  <text
                    x="70"
                    y="98"
                    textAnchor="middle"
                    fill="#DDEBDD"
                    fontSize="9.5"
                    fontFamily="Jost, sans-serif"
                  >
                    (Role unsettled)
                  </text>
                </g>
              </svg>
            </div>

            <p className="text-xs text-[#DDEBDD]/75 border-t border-[#FFF6EA]/10 pt-3">
              <strong>Hypothetical Food Web:</strong> Depicts inferred energy transfer from floodplain
              flora to <em>Patagotitan</em> and large carcharodontosaurid theropods.
            </p>
          </div>
        </div>

        {/* Bottom Row: Group of Individuals (3.43 m Taphonomy Interactive Inspector) & Other Finds */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive 3.43 m Deposit Stratigraphic Burial Inspector */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#08211C]/85 border border-[#FFF6EA]/15 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-display uppercase tracking-[0.14em] text-[#F6B27A] mb-2">
                <span>Taphonomy · Group of Six Individuals</span>
                <span>3.43 m Deposit + 2nd Quarry 300 m W</span>
              </div>
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-3">
                Three Burial Layers, Preserved Where They Died
              </h3>
              <p className="text-sm sm:text-base text-[#FFF6EA]/85 leading-relaxed mb-6">
                The six skeletons come from <strong>three closely spaced burial layers</strong> in a{' '}
                <strong>3.43 m thick deposit</strong>, so the animals probably did not die at the
                same time, and the gentle floods that buried them were too weak to move bones, so
                they were preserved where they died. A fourth layer with a similar-sized skeleton
                lies in a second quarry about <strong>300 m west</strong>.
              </p>
            </div>

            {/* Interactive Layer Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
              {([1, 2, 3, 4] as const).map((layerNum) => (
                <button
                  key={layerNum}
                  type="button"
                  onClick={() => setSelectedLayer(layerNum)}
                  className={`px-3 py-2.5 rounded-xl font-display text-xs uppercase tracking-[0.08em] transition-colors cursor-pointer border ${
                    selectedLayer === layerNum
                      ? 'bg-[#F6B27A] text-[#14100A] border-[#FFF6EA]'
                      : 'bg-[#123D33]/45 text-[#FFF6EA] border-[#FFF6EA]/15 hover:border-[#F6B27A]'
                  }`}
                >
                  {layerNum === 4 ? 'Layer 4 (300 m W)' : `Burial Layer ${layerNum}`}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#123D33]/40 border border-[#FFF6EA]/10">
              <div className="font-display text-sm uppercase tracking-[0.06em] text-[#FFD3A1] mb-1">
                {burialLayerDescriptions[selectedLayer].title}
              </div>
              <p className="text-xs sm:text-sm text-[#FFF6EA]/85 leading-relaxed">
                {burialLayerDescriptions[selectedLayer].detail}
              </p>
            </div>
          </div>

          {/* Other Finds: 57 Theropod Teeth & Huanimán Megaloolithid Eggshell */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <article className="p-6 rounded-2xl bg-[#08211C]/80 border border-[#FFF6EA]/12 flex-1">
              <div className="font-display text-xs uppercase tracking-[0.14em] text-[#F6B27A] mb-2">
                Associated Quarry Finds · Debated Interpretation
              </div>
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-2">
                57 Shed Theropod Teeth
              </h3>
              <p className="text-sm text-[#FFF6EA]/85 leading-relaxed">
                Fifty-seven serrated theropod teeth were found scattered among the{' '}
                <em>Patagotitan</em> bones at La Flecha. While often linked to scavenging on the
                carcasses, the exact ecological interpretation is not settled.
              </p>
            </article>

            <article className="p-6 rounded-2xl bg-[#08211C]/80 border border-[#FFF6EA]/12 flex-1">
              <div className="font-display text-xs uppercase tracking-[0.14em] text-[#F6B27A] mb-2">
                Cerro Castaño Member · Unassigned Ootaxon
              </div>
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-2">
                Huanimán Megaloolithid Eggshell
              </h3>
              <p className="text-sm text-[#FFF6EA]/85 leading-relaxed">
                Sauropod eggshell of the <strong>megaloolithid</strong> type has been found in the
                same rock unit (Cerro Castaño Member) at Huanimán, Chubut, suggesting a possible
                titanosaur nesting site—<strong>but it has not been assigned to Patagotitan</strong>.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
