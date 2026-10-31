import React, { useState } from 'react';
import { getFloodplainPhaseDetails } from '../data/patagotitanData';

export const FloodplainMap: React.FC = () => {
  const [wetness, setWetness] = useState<number>(75);
  const [mapMode, setMapMode] = useState<'patagonia' | 'casts'>('patagonia');
  const [selectedPin, setSelectedPin] = useState<string>('la-flecha');

  const phase = getFloodplainPhaseDetails(wetness);

  const patagoniaPins = [
    {
      id: 'la-flecha',
      name: 'La Flecha Quarry (Main Site + 2nd Quarry 300 m W)',
      coords: 'About 250 km west of Trelew, Chubut Province',
      x: 165,
      y: 255,
      detail:
        'Type locality of Patagotitan mayorum. Six partial skeletons in three burial layers (3.43 m deposit), a fourth skeleton 300 m west, and fossil conifer & angiosperm wood 200 m away.',
    },
    {
      id: 'rio-chubut',
      name: 'Cerro Barcino Formation (Río Chubut Valley)',
      coords: 'Somuncurá / Cañadón Asfalto Basin, Central Patagonia',
      x: 192,
      y: 242,
      detail:
        'Exposed along the Río Chubut valley. The Cerro Castaño Member preserves fine sandstone and ash-bearing siltstone from low-energy floodplains (~101.6 Ma).',
    },
    {
      id: 'trelew',
      name: 'Trelew — Museo Paleontológico Egidio Feruglio (MPEF)',
      coords: 'Atlantic Coast of Chubut Province, Argentina',
      x: 242,
      y: 248,
      detail:
        'Home repository of the original Patagotitan fossils (MPEF-PV 3400) and exhibition hall displaying a full-scale skeletal mount.',
    },
  ];

  const globalCasts = [
    {
      id: 'cast-trelew',
      city: 'Trelew, Argentina',
      museum: 'Museo Paleontológico Egidio Feruglio (MPEF)',
      years: 'Permanent Repository & Mount',
      note: 'Houses the original fossil bones excavated from La Flecha alongside a full skeletal reconstruction.',
    },
    {
      id: 'cast-ny',
      city: 'New York, USA',
      museum: 'American Museum of Natural History (AMNH)',
      years: 'Since January 2016',
      note: 'Unveiled in January 2016 (initially as "The Titanosaur"), replacing a juvenile Barosaurus mount.',
    },
    {
      id: 'cast-chicago',
      city: 'Chicago, USA',
      museum: 'Field Museum of Natural History ("Máximo")',
      years: 'Unveiled 1 June 2018',
      note: 'Nicknamed "Máximo", unveiled in Stanley Field Hall on 1 June 2018, replacing Sue the Tyrannosaurus.',
    },
    {
      id: 'cast-london',
      city: 'London, United Kingdom',
      museum: 'Natural History Museum, London',
      years: 'March 2023 – January 2024',
      note: 'Featured the touring skeletal cast in the Waterhouse Gallery exhibition "Titanosaur: Life as the Biggest Dinosaur".',
    },
  ];

  const activePinObj = patagoniaPins.find((p) => p.id === selectedPin) || patagoniaPins[0];

  return (
    <section
      id="habitat"
      aria-labelledby="habitat-heading"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#08211C] text-[#FFF6EA] border-t border-[#FFF6EA]/10"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#FFF6EA]/15">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="section-number-outline text-4xl sm:text-5xl leading-none">
                07
              </span>
              <span className="font-display text-xs uppercase tracking-[0.22em] text-[#F6B27A]">
                PALAEOENVIRONMENT · CERRO CASTAÑO MEMBER
              </span>
            </div>
            <h2
              id="habitat-heading"
              className="font-display text-3xl sm:text-5xl uppercase tracking-[0.02em] text-[#FFF6EA]"
            >
              A Floodplain That Swung Between Wet and Dry
            </h2>
          </div>

          <p className="text-xs font-display uppercase tracking-[0.14em] text-[#DDEBDD]/75">
            Chubut Group · Central Patagonia · ~101.6 Ma
          </p>
        </div>

        {/* Intro Narrative + Vegetation & Wildlife Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-5">
            <p className="text-base sm:text-lg text-[#FFF6EA]/90 leading-relaxed">
              <em>Patagotitan</em>’s rocks (the <strong>Cerro Castaño Member</strong> of the Cerro
              Barcino Formation, Chubut Group, central Patagonia) mark a return to more humid
              floodplain conditions after the arid, dune-dotted plains of the older{' '}
              <strong>Puesto La Paloma Member</strong>. Fine sandstone and ash-bearing siltstone
              point to low-energy water flow on a floodplain with sporadic sheet floods, alongside
              sinuous river channels and volcanic ash falls. The climate was warm, with wetter and
              drier phases (<strong>inferred</strong>).
            </p>

            <div className="p-6 rounded-2xl bg-[#123D33]/40 border border-[#FFF6EA]/12">
              <div className="font-display text-xs uppercase tracking-[0.14em] text-[#F6B27A] mb-2">
                Palaeobotany · Site 200 m from the Bones
              </div>
              <h3 className="font-display text-xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-2">
                15-Metre Cypress Relatives & South America’s Oldest Angiosperm Wood
              </h3>
              <p className="text-sm sm:text-base text-[#FFF6EA]/85 leading-relaxed">
                Plant fossils found about <strong>200 m from the Patagotitan bones</strong> reveal a
                forest dominated by conifers—including a cypress relative (
                <em>Austrocupressinoxylon</em>) similar to living <em>Fitzroya</em> and{' '}
                <em>Pilgerodendron</em> whose trees are estimated at about <strong>15 m tall</strong>
                —alongside fern fronds and rarer flowering plants, including{' '}
                <em>Carlquistoxylon</em>, the oldest known angiosperm wood in South America.
              </p>
            </div>
          </div>

          {/* Wildlife Side Card */}
          <aside className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#123D33]/35 border border-[#FFF6EA]/15">
            <div className="font-display text-xs uppercase tracking-[0.14em] text-[#F6B27A] mb-1">
              Cerro Barcino Fauna
            </div>
            <h3 className="font-display text-xl uppercase tracking-[0.02em] text-[#FFF6EA] mb-2">
              Regional Wildlife
            </h3>
            <p className="text-xs text-[#DDEBDD]/75 mb-4">
              From other localities in the same rock unit; not all necessarily lived at the exact
              same moment or site as <em>Patagotitan</em>:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#08211C]/75 border border-[#FFF6EA]/10">
                <div className="font-display text-sm text-[#FFD3A1] uppercase tracking-[0.04em]">
                  Tyrannotitan chubutensis
                </div>
                <p className="text-xs text-[#FFF6EA]/80 mt-0.5">
                  Giant carcharodontosaurid theropod dinosaur from the Cerro Barcino Formation.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#08211C]/75 border border-[#FFF6EA]/10">
                <div className="font-display text-sm text-[#FFD3A1] uppercase tracking-[0.04em]">
                  Genyodectes serus
                </div>
                <p className="text-xs text-[#FFF6EA]/80 mt-0.5">
                  Large-jawed ceratosaurian theropod known from the Cañadón Grande area.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#08211C]/75 border border-[#FFF6EA]/10">
                <div className="font-display text-sm text-[#FFD3A1] uppercase tracking-[0.04em]">
                  Barcinosuchus arroyoi
                </div>
                <p className="text-xs text-[#FFF6EA]/80 mt-0.5">
                  Terrestrial peirosaurid crocodile relative inhabiting the floodplain margins.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#08211C]/75 border border-[#FFF6EA]/10">
                <div className="font-display text-sm text-[#FFD3A1] uppercase tracking-[0.04em]">
                  Chubutemys copelloi
                </div>
                <p className="text-xs text-[#FFF6EA]/80 mt-0.5">
                  Early Cretaceous meiolaniid stem-turtle from the Chubut Group deposits.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Interactive Floodplain Cross-Section SVG + Dry/Wet Phase Slider */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#123D33]/35 border border-[#FFF6EA]/15">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#FFF6EA]/12">
            <div>
              <span className="font-display text-xs uppercase tracking-[0.16em] text-[#F6B27A] block mb-1">
                Interactive Palaeo-Biome Cross-Section
              </span>
              <h3 className="font-display text-xl sm:text-2xl uppercase tracking-[0.02em] text-[#FFF6EA]">
                {phase.phaseTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#DDEBDD]/80 mt-0.5">
                {phase.phaseSubtitle}
              </p>
            </div>

            {/* Dry Phase / Wet Phase Slider + Quick Preset Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-[#08211C]/90 p-4 rounded-xl border border-[#FFF6EA]/15">
              <button
                type="button"
                onClick={() => setWetness(10)}
                className={`px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-[0.1em] cursor-pointer transition-colors ${
                  wetness < 35
                    ? 'bg-[#D07A45] text-[#14100A]'
                    : 'text-[#FFF6EA]/75 hover:text-[#FFF6EA]'
                }`}
              >
                Dry Phase
              </button>

              <div className="flex flex-col items-center gap-1 min-w-[160px]">
                <label
                  htmlFor="floodplain-phase-slider"
                  className="text-[10px] font-display uppercase tracking-[0.14em] text-[#DDEBDD]/80"
                >
                  Dry / Wet Phase ({wetness}%)
                </label>
                <input
                  id="floodplain-phase-slider"
                  type="range"
                  min={0}
                  max={100}
                  value={wetness}
                  onChange={(e) => setWetness(Number(e.target.value))}
                  aria-label="Dry phase to Wet phase floodplain slider"
                  className="w-full accent-[#F6B27A] cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={() => setWetness(90)}
                className={`px-3 py-1.5 rounded-lg text-xs font-display uppercase tracking-[0.1em] cursor-pointer transition-colors ${
                  wetness > 65
                    ? 'bg-[#2E6B55] text-[#FFF6EA] border border-[#DDEBDD]/40'
                    : 'text-[#FFF6EA]/75 hover:text-[#FFF6EA]'
                }`}
              >
                Wet Phase
              </button>
            </div>
          </div>

          {/* Interactive SVG Cross-Section: Sinuous River Channel > Conifer/Fern Forest > Sheet-Flood Plain > Ash Fall */}
          <div className="mt-6 rounded-xl overflow-hidden border border-[#FFF6EA]/12 bg-[#08211C]">
            <svg
              viewBox="0 0 960 280"
              className="w-full h-auto"
              aria-label="Interactive floodplain cross-section showing sinuous river channel, conifer forest, sheet-flood plain, and volcanic ash fall"
            >
              <defs>
                <linearGradient id="crossSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={wetness < 45 ? '#F6B27A' : '#8E9A6B'}
                    stopOpacity="0.45"
                  />
                  <stop offset="55%" stopColor="#2E6B55" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#08211C" stopOpacity="0.95" />
                </linearGradient>
              </defs>

              {/* Sky & Atmosphere Backdrop */}
              <rect x="0" y="0" width="960" height="280" fill="url(#crossSkyGrad)" />

              {/* Heat Shimmer waves in Dry Phase */}
              <g opacity={phase.shimmerOpacity} stroke="#F6B27A" strokeWidth="1" fill="none">
                <path d="M520,130 Q550,125 580,130 T640,130 T700,130" />
                <path d="M540,145 Q570,140 600,145 T660,145 T720,145" />
              </g>

              {/* Mist Banks in Wet Phase */}
              <g opacity={phase.mistOpacity} fill="#DDEBDD">
                <ellipse cx="420" cy="138" rx="190" ry="14" opacity="0.22" />
                <ellipse cx="690" cy="152" rx="210" ry="12" opacity="0.18" />
              </g>

              {/* Volcanic Ash Fall specks on Right (Zone 4) */}
              <g fill="#CFC6BA" opacity="0.65">
                <circle cx="780" cy="42" r="2" />
                <circle cx="815" cy="68" r="1.8" />
                <circle cx="850" cy="52" r="2.2" />
                <circle cx="890" cy="85" r="1.6" />
                <circle cx="835" cy="110" r="2" />
                <circle cx="910" cy="122" r="1.8" />
              </g>

              {/* Subsurface Stratigraphic Base (Fine Sandstone & Ash-Bearing Siltstone) */}
              <path
                d="M0,175 L180,175 C205,218 265,218 290,175 L960,182 L960,280 L0,280 Z"
                fill="#3A2A1C"
              />
              <path
                d="M0,225 L960,225 L960,280 L0,280 Z"
                fill="#14100A"
              />

              {/* Sinuous River Channel Water (Zone 1) */}
              <path
                d={`M175,${phase.waterLevelY} Q235,${phase.waterLevelY + 18} 295,${phase.waterLevelY} L282,212 Q235,222 188,212 Z`}
                fill="#2E6B55"
                stroke="#DDEBDD"
                strokeWidth="1"
              />

              {/* Sheet-Flood Water Layer across Plain (Zone 3 — expands in Wet Phase) */}
              <rect
                x="490"
                y="172"
                width="450"
                height="11"
                rx="4"
                fill="#2E6B55"
                opacity={phase.sheetFloodOpacity}
              />

              {/* Cracked Mud Polygons on Overbank Plain (visible in Dry Phase) */}
              <g
                opacity={phase.mudCrackOpacity}
                stroke="#F6B27A"
                strokeWidth="1.2"
                fill="none"
              >
                <path d="M540,184 L558,192 L548,202 M558,192 L578,188" />
                <path d="M640,185 L662,194 L652,204 M662,194 L685,189" />
                <path d="M750,186 L770,195 L762,204" />
              </g>

              {/* Zone 2: Vegetated Floodplain Forest of 15m Conifers (Austrocupressinoxylon) & Ferns */}
              <g transform="translate(320, 62)">
                {/* Tall Conifer 1 */}
                <rect x="36" y="75" width="6" height="40" fill="#3A2A1C" />
                <polygon points="39,10 16,52 62,52" fill="#123D33" />
                <polygon points="39,32 12,78 66,78" fill="#2E6B55" />
                {/* Tall Conifer 2 */}
                <rect x="88" y="68" width="7" height="47" fill="#3A2A1C" />
                <polygon points="91.5,0 64,46 119,46" fill="#123D33" />
                <polygon points="91.5,24 58,74 125,74" fill="#2E6B55" />
                {/* Tall Conifer 3 */}
                <rect x="136" y="78" width="5" height="37" fill="#3A2A1C" />
                <polygon points="138.5,18 116,58 161,58" fill="#123D33" />
                <polygon points="138.5,38 112,82 165,82" fill="#5E8A58" />
                {/* Understory Ferns (scale with wetness) */}
                <g
                  transform={`translate(10, 102) scale(${phase.fernScale})`}
                  fill="#5E8A58"
                >
                  <path d="M0,12 Q12,-8 26,12 Z" />
                  <path d="M45,12 Q60,-10 75,12 Z" />
                  <path d="M105,12 Q120,-8 135,12 Z" />
                </g>
              </g>

              {/* Zone Labels */}
              <g fontFamily="Marcellus, serif" fontSize="11" fill="#FFF6EA">
                <text x="175" y="32" fill="#FFD3A1">
                  1 · SINUOUS RIVER CHANNEL
                </text>
                <text x="330" y="32" fill="#DDEBDD">
                  2 · CONIFER & FERN FOREST (~15 m)
                </text>
                <text x="545" y="32" fill="#F6B27A">
                  3 · SHEET-FLOOD PLAIN (BONEBEDS)
                </text>
                <text x="775" y="32" fill="#CFC6BA">
                  4 · VOLCANIC ASH FALL
                </text>
              </g>
            </svg>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#DDEBDD]/80">
            <p>{phase.description}</p>
            <span className="font-display uppercase tracking-[0.1em] text-[#F6B27A] shrink-0">
              Illustrative: the rocks show alternating drier and wetter conditions; their timing is
              unknown.
            </span>
          </div>
        </div>

        {/* Interactive Map of Argentina & Global Casts ("Where to see it") */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#123D33]/30 border border-[#FFF6EA]/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FFF6EA]/12">
            <div>
              <span className="font-display text-xs uppercase tracking-[0.16em] text-[#F6B27A] block mb-1">
                Cartography & Exhibition Network
              </span>
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-[#FFF6EA]">
                Patagonia Locality & Where to See the Casts
              </h3>
            </div>

            <div
              role="group"
              aria-label="Toggle map layer between Chubut Quarry and Global Museum Casts"
              className="flex items-center gap-1 p-1 rounded-xl bg-[#08211C] border border-[#FFF6EA]/15 self-start sm:self-auto"
            >
              <button
                type="button"
                onClick={() => setMapMode('patagonia')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-display uppercase tracking-[0.1em] cursor-pointer transition-colors ${
                  mapMode === 'patagonia'
                    ? 'bg-[#F6B27A] text-[#14100A]'
                    : 'text-[#FFF6EA]/80 hover:text-[#FFF6EA]'
                }`}
              >
                Patagonia Quarry & Chubut Map
              </button>
              <button
                type="button"
                onClick={() => setMapMode('casts')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-display uppercase tracking-[0.1em] cursor-pointer transition-colors ${
                  mapMode === 'casts'
                    ? 'bg-[#F6B27A] text-[#14100A]'
                    : 'text-[#FFF6EA]/80 hover:text-[#FFF6EA]'
                }`}
              >
                Where to See It (4 Global Casts)
              </button>
            </div>
          </div>

          {mapMode === 'patagonia' ? (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Interactive SVG Map of Argentina & Chubut Province */}
              <div className="lg:col-span-6 p-6 rounded-xl bg-[#08211C] border border-[#FFF6EA]/10 flex items-center justify-center">
                <svg
                  viewBox="0 0 380 420"
                  className="w-full max-w-[340px] h-auto"
                  aria-label="Map of Argentina highlighting Chubut Province, La Flecha Quarry, Río Chubut valley, and Trelew"
                >
                  {/* Stylized Silhouette of Argentina */}
                  <path
                    d="M155,22 L235,28 L268,78 L255,135 L272,178 L242,218 L248,255 L215,305 L198,365 L212,395 L168,392 L145,335 L142,260 L152,185 L140,110 Z"
                    fill="#123D33"
                    stroke="#5E8A58"
                    strokeWidth="1.5"
                  />

                  {/* Highlighted Chubut Province Band */}
                  <path
                    d="M144,230 L245,230 L246,272 L143,272 Z"
                    fill="#2E6B55"
                    fillOpacity="0.65"
                    stroke="#F6B27A"
                    strokeWidth="1"
                  />

                  {/* Río Chubut Valley Line */}
                  <path
                    d="M150,252 Q195,242 242,248"
                    fill="none"
                    stroke="#FFD3A1"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                  />

                  {/* Interactive Pins */}
                  {patagoniaPins.map((pin) => {
                    const isSelected = selectedPin === pin.id;
                    return (
                      <g
                        key={pin.id}
                        className="cursor-pointer"
                        onClick={() => setSelectedPin(pin.id)}
                      >
                        <circle
                          cx={pin.x}
                          cy={pin.y}
                          r={isSelected ? 9 : 6}
                          fill={isSelected ? '#F6B27A' : '#08211C'}
                          stroke="#FFF6EA"
                          strokeWidth="2"
                        />
                      </g>
                    );
                  })}

                  <text
                    x="62"
                    y="255"
                    fill="#FFD3A1"
                    fontSize="11"
                    fontFamily="Marcellus, serif"
                  >
                    CHUBUT
                  </text>
                </svg>
              </div>

              {/* Locality Selector & Details */}
              <div className="lg:col-span-6 space-y-4">
                {patagoniaPins.map((pin) => {
                  const active = activePinObj.id === pin.id;
                  return (
                    <button
                      key={pin.id}
                      type="button"
                      onClick={() => setSelectedPin(pin.id)}
                      className={`w-full text-left p-5 rounded-xl border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#08211C] border-[#F6B27A] shadow-md'
                          : 'bg-[#08211C]/50 border-[#FFF6EA]/12 hover:border-[#FFF6EA]/35'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs font-display uppercase tracking-[0.12em] text-[#F6B27A] mb-1">
                        <span>{pin.coords}</span>
                        {active && <span>Selected Locality</span>}
                      </div>
                      <h4 className="font-display text-lg text-[#FFF6EA] mb-1.5">
                        {pin.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#FFF6EA]/80 leading-relaxed">
                        {pin.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {globalCasts.map((cast) => (
                <article
                  key={cast.id}
                  className="p-5 rounded-xl bg-[#08211C]/85 border border-[#FFF6EA]/15 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-display text-xs uppercase tracking-[0.14em] text-[#F6B27A] mb-1">
                      {cast.years}
                    </div>
                    <h4 className="font-display text-lg text-[#FFF6EA] uppercase tracking-[0.02em] mb-1">
                      {cast.city}
                    </h4>
                    <div className="text-xs font-medium text-[#FFD3A1] mb-3">
                      {cast.museum}
                    </div>
                  </div>
                  <p className="text-xs text-[#FFF6EA]/80 leading-relaxed border-t border-[#FFF6EA]/10 pt-3">
                    {cast.note}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
