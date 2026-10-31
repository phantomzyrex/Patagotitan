import React, { useEffect, useRef, useState } from 'react';
import { FloodplainAtmosphere } from './FloodplainAtmosphere';
import { SeasonGaugeState } from '../data/patagotitanData';
import { useFitText } from '../utils/fitText';
import { PARALLAX_TOKENS } from '../styles/tokens';

interface HeroProps {
  seasonState: SeasonGaugeState;
  reducedMotion: boolean;
  isLoaded: boolean;
  onEnterFloodplain: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  seasonState,
  reducedMotion,
  isLoaded,
  onEnterFloodplain,
}) => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const fitFontSizePx = useFitText(frameRef, 11);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [tremorActive, setTremorActive] = useState(false);

  useEffect(() => {
    if (isLoaded && !reducedMotion) {
      const timer = window.setTimeout(() => {
        setTremorActive(true);
      }, 450);
      return () => window.clearTimeout(timer);
    }
  }, [isLoaded, reducedMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMouseOffset({ x: nx, y: ny });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Parallax displacements from design tokens:
  // wordmark +-12px, creature +-24px (opposite direction), sunbeams +-40px, particles +-60px, foreground silhouettes +-80px
  const wordmarkTransform = reducedMotion
    ? 'translate3d(0, 0, 0)'
    : `translate3d(${(mouseOffset.x * PARALLAX_TOKENS.wordmarkPx).toFixed(1)}px, ${(mouseOffset.y * PARALLAX_TOKENS.wordmarkPx).toFixed(1)}px, 0)`;

  const creatureTransform = reducedMotion
    ? 'translate3d(0, 0, 0)'
    : `translate3d(${(-mouseOffset.x * PARALLAX_TOKENS.creaturePx).toFixed(1)}px, ${(-mouseOffset.y * 18).toFixed(1)}px, 0)`;

  const sunbeamTransform = reducedMotion
    ? 'translate3d(0, 0, 0)'
    : `translate3d(${(mouseOffset.x * PARALLAX_TOKENS.sunbeamsPx).toFixed(1)}px, ${(mouseOffset.y * 20).toFixed(1)}px, 0)`;

  const foregroundTransform = reducedMotion
    ? 'translate3d(0, 0, 0)'
    : `translate3d(${(-mouseOffset.x * PARALLAX_TOKENS.foregroundSilhouettesPx).toFixed(1)}px, ${(-mouseOffset.y * 30).toFixed(1)}px, 0)`;

  const letters = 'PATAGOTITAN'.split('');

  return (
    <section
      id="hero"
      aria-label="Patagotitan — Titan of the Floodplain Forests Hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-screen min-h-[680px] p-2.5 sm:p-4 bg-[#14100A] select-none overflow-hidden"
    >
      {/* 100vh Frame with ~24px Rounded Corners and Thin Dark Margin */}
      <div
        ref={frameRef}
        className={`relative w-full h-full rounded-[24px] overflow-hidden hero-biome-gradient shadow-[inset_0_0_90px_rgba(8,33,28,0.85)] border border-[#FFF6EA]/10 ${
          tremorActive ? 'animate-tremor' : ''
        }`}
      >
        {/* LAYER 1: Hazy Diagonal Sunbeams from the Top (feathered gradients, mix-blend-mode: screen) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-5 transition-transform duration-300 ease-out"
          style={{ transform: sunbeamTransform }}
        >
          <div
            className="absolute -top-20 left-[6%] w-[22%] h-[85%] mix-blend-screen animate-sunbeam-1"
            style={{
              background:
                'radial-gradient(ellipse 50% 80% at 50% 15%, rgba(246,178,122,0.24) 0%, rgba(208,122,69,0.10) 45%, transparent 75%)',
            }}
          />
          <div
            className="absolute -top-24 left-[22%] w-[18%] h-[80%] mix-blend-screen animate-sunbeam-3"
            style={{
              background:
                'radial-gradient(ellipse 50% 80% at 50% 15%, rgba(246,178,122,0.18) 0%, rgba(142,154,107,0.07) 48%, transparent 75%)',
            }}
          />
          <div
            className="absolute -top-28 left-[40%] w-[24%] h-[90%] mix-blend-screen animate-sunbeam-1"
            style={{
              background:
                'radial-gradient(ellipse 50% 80% at 50% 15%, rgba(255,211,161,0.24) 0%, rgba(246,178,122,0.10) 45%, transparent 75%)',
            }}
          />
          <div
            className="absolute -top-24 right-[20%] w-[18%] h-[82%] mix-blend-screen animate-sunbeam-2"
            style={{
              background:
                'radial-gradient(ellipse 50% 80% at 50% 15%, rgba(246,178,122,0.18) 0%, rgba(142,154,107,0.07) 48%, transparent 75%)',
            }}
          />
          <div
            className="absolute -top-20 right-[4%] w-[22%] h-[85%] mix-blend-screen animate-sunbeam-2"
            style={{
              background:
                'radial-gradient(ellipse 50% 80% at 50% 15%, rgba(246,178,122,0.24) 0%, rgba(208,122,69,0.10) 45%, transparent 75%)',
            }}
          />
        </div>

        {/* LAYER 2: Dry-to-Wet Horizon Heat Shimmer & Drifting Mist Crossfade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[54%] h-20 pointer-events-none z-6 flex justify-center transition-opacity duration-500"
          style={{
            opacity: seasonState.shimmerOpacity,
            background:
              'radial-gradient(ellipse 65% 50% at 50% 50%, rgba(246, 178, 122, 0.16) 0%, transparent 75%)',
          }}
        />

        {/* Horizontal Mist Banks in --mist that fade in as you scroll */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[18%] h-48 pointer-events-none z-15 transition-opacity duration-500"
          style={{ opacity: seasonState.mistOpacity }}
        >
          <div
            className="w-[120%] -left-[10%] h-24 animate-mist-right"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(221, 235, 221, 0.85) 0%, transparent 75%)',
            }}
          />
          <div
            className="w-[120%] -left-[10%] h-20 mt-4 animate-mist-left"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(221, 235, 221, 0.7) 0%, transparent 75%)',
            }}
          />
        </div>

        {/* LAYER 3: Distant Conifer Treeline along the Horizon (leaving centre open) */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[23%] w-full h-[26%] pointer-events-none z-8 opacity-80"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
        >
          {/* Far Sage-Conifer Ridge Silhouettes on Left and Right */}
          <g fill="#123D33" opacity="0.78">
            {/* Left distant cypress stand */}
            <path d="M0,240 L0,110 L18,75 L34,112 L48,60 L66,108 L82,52 L102,115 L118,78 L135,120 L154,68 L172,126 L194,88 L215,134 L238,96 L262,144 L290,118 L320,162 L355,140 L390,185 L435,205 L490,225 L540,240 Z" />
            {/* Right distant cypress stand */}
            <path d="M1440,240 L1440,98 L1418,58 L1398,108 L1378,48 L1356,104 L1335,66 L1314,118 L1292,74 L1270,126 L1246,84 L1222,135 L1198,98 L1172,148 L1145,115 L1115,164 L1080,145 L1040,188 L990,210 L930,232 L890,240 Z" />
          </g>
          {/* Mid-distance conifer crowns */}
          <g fill="#08211C" opacity="0.72">
            <path d="M0,240 L0,132 L25,88 L46,138 L70,82 L94,142 L120,96 L146,150 L176,112 L205,164 L240,136 L275,184 L320,210 L380,240 Z" />
            <path d="M1440,240 L1440,126 L1412,80 L1388,134 L1362,76 L1336,138 L1308,92 L1280,148 L1250,108 L1218,162 L1182,135 L1140,185 L1090,212 L1030,240 Z" />
          </g>
        </svg>

        {/* LAYER 4: GIGANTIC WORDMARK "PATAGOTITAN" (Centred at ~50% of frame, ~85% viewport width) */}
        <div
          className="absolute inset-x-0 top-[46%] sm:top-[49%] -translate-y-1/2 z-10 flex flex-col items-center justify-center pointer-events-none px-4 transition-transform duration-300 ease-out"
          style={{ transform: wordmarkTransform }}
        >
          {/* Desktop & Tablet Single-Line Wordmark (~85% viewport width via fit-text) */}
          <h1
            className="hidden md:flex items-center justify-center font-display uppercase text-[#FFF6EA] tracking-[-0.01em] leading-none whitespace-nowrap select-none"
            style={{
              fontSize: `${fitFontSizePx}px`,
              textShadow: '0 0 38px rgba(246, 178, 122, 0.28), 0 4px 24px rgba(8, 33, 28, 0.45)',
            }}
          >
            {letters.map((char, idx) => (
              <span
                key={idx}
                className="inline-block overflow-hidden"
              >
                <span
                  className={`inline-block transition-transform duration-700 ease-out ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
                  style={{
                    transitionDelay: reducedMotion ? '0ms' : `${idx * 45}ms`,
                  }}
                >
                  {char}
                </span>
              </span>
            ))}
          </h1>

          {/* Mobile Two-Line Wordmark ("PATAGO / TITAN" at ~20-22vw) */}
          <div
            aria-hidden="true"
            className="flex md:hidden flex-col items-center justify-center font-display uppercase text-[#FFF6EA] tracking-[-0.01em] leading-[0.9] select-none text-center"
            style={{
              fontSize: '20.5vw',
              textShadow: '0 0 28px rgba(246, 178, 122, 0.28)',
            }}
          >
            <span>PATAGO</span>
            <span>TITAN</span>
          </div>
        </div>

        {/* LAYER 5: SUBJECT — Transparent Patagotitan Cutout IN FRONT of the Wordmark (z-20) */}
        {/* Positioned so the neck and forequarters overlap the middle letters (G-O-T-I), keeping PATA and TAN fully visible */}
        <div
          className="absolute inset-0 z-20 flex items-end justify-center pointer-events-none transition-transform duration-300 ease-out"
          style={{ transform: creatureTransform }}
        >
          <div
            className={`relative h-[84%] sm:h-[92%] md:h-[97%] w-auto flex items-end justify-center translate-x-[4%] sm:translate-x-[10%] md:translate-x-[14%] translate-y-[3%] transition-all duration-1000 ease-out ${
              isLoaded
                ? 'opacity-100 scale-100'
                : 'opacity-0 translate-x-12 scale-[1.08]'
            }`}
          >
            <div className="relative h-full w-auto flex items-end justify-center animate-titan-idle">
              {/* Warm Rim Light Glow Backdrop behind Creature */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 45% 55% at 42% 48%, rgba(246, 178, 122, 0.36) 0%, transparent 70%)',
                }}
              />

              {/* Primary Graded Patagotitan Image */}
              <img
                src="/assets/patagotitan-hero.png"
                alt="Patagotitan mayorum walking across a shallow Early Cretaceous conifer floodplain"
                referrerPolicy="no-referrer"
                className="relative z-10 h-full w-auto max-w-none object-contain creature-mask-fade select-none"
                style={{
                  filter: 'contrast(1.12) saturate(1.06)',
                }}
              />
            </div>
          </div>
        </div>

        {/* LAYER 6: Floodplain Water (Shallow Mirror-Like Sheet-Flood Pools, Sinuous Channel & Foot Ripples) */}
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 w-full h-[29%] pointer-events-none z-22"
          viewBox="0 0 1440 280"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="sheetFloodWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E6B55" stopOpacity="0.18" />
              <stop offset="38%" stopColor="#123D33" stopOpacity="0.58" />
              <stop offset="75%" stopColor="#08211C" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#08211C" stopOpacity="0.98" />
            </linearGradient>
            <linearGradient id="sinuousChannelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3A2A1C" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#2E6B55" stopOpacity="0.55" />
              <stop offset="52%" stopColor="#F6B27A" stopOpacity="0.28" />
              <stop offset="70%" stopColor="#2E6B55" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#123D33" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Base Floodplain Sheet-Flood Basin */}
          <rect x="0" y="20" width="1440" height="260" fill="url(#sheetFloodWaterGrad)" />

          {/* Sinuous Meandering River Channel */}
          <path
            d="M-40,195 C240,145 430,225 710,175 C980,128 1190,210 1480,165 L1480,255 C1160,275 940,195 690,235 C410,275 210,210 -40,248 Z"
            fill="url(#sinuousChannelGrad)"
          />

          {/* Soft Water Reflections of Patagotitan's Legs in the Pool */}
          <ellipse cx="755" cy="235" rx="34" ry="42" fill="#14100A" opacity="0.38" />
          <ellipse cx="920" cy="230" rx="32" ry="38" fill="#14100A" opacity="0.34" />

          {/* Shallow Mirror-Like Sheet-Flood Glints */}
          <ellipse cx="310" cy="145" rx="190" ry="11" fill="#F6B27A" opacity="0.11" />
          <ellipse cx="1090" cy="155" rx="220" ry="13" fill="#FFD3A1" opacity="0.10" />
          <ellipse cx="720" cy="195" rx="280" ry="16" fill="#DDEBDD" opacity="0.09" />

          {/* Concentric Water Ripples around Patagotitan's Forefeet and Hindfeet */}
          <g stroke="#FFD3A1" fill="none">
            {/* Forefoot ripples */}
            <ellipse
              cx="755"
              cy="218"
              rx="68"
              ry="11"
              strokeWidth="1.2"
              strokeOpacity="0.42"
              className="animate-water-ripple-1"
            />
            <ellipse
              cx="755"
              cy="218"
              rx="98"
              ry="16"
              strokeWidth="0.9"
              strokeOpacity="0.25"
              className="animate-water-ripple-2"
            />
            {/* Hindfoot ripples */}
            <ellipse
              cx="920"
              cy="212"
              rx="64"
              ry="10"
              strokeWidth="1.1"
              strokeOpacity="0.38"
              className="animate-water-ripple-2"
            />
            <ellipse
              cx="920"
              cy="212"
              rx="92"
              ry="15"
              strokeWidth="0.8"
              strokeOpacity="0.22"
              className="animate-water-ripple-1"
            />
          </g>
        </svg>

        {/* Ground Haze over bottom 26% so legs dissolve into the floodplain */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[26%] pointer-events-none z-23"
          style={{
            background:
              'linear-gradient(to top, #08211C 0%, rgba(8, 33, 28, 0.82) 32%, rgba(18, 61, 51, 0.35) 68%, transparent 100%)',
          }}
        />

        {/* LAYER 7: Canvas Pollen, Spores, Ash & Falling Foliage */}
        <FloodplainAtmosphere mouseOffset={mouseOffset} reducedMotion={reducedMotion} />

        {/* LAYER 8: Foreground Conifer Trunks & Fern Fronds at Left & Right Edges (Parallax +-80px) */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-26 transition-transform duration-300 ease-out"
          style={{ transform: foregroundTransform }}
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          {/* Left Foreground Cypress Trunk & Layered Conifer/Fern Silhouettes in --floor (#08211C) */}
          <g fill="#08211C" opacity="0.94">
            <path d="M-20,0 L28,0 C22,260 18,540 44,900 L-20,900 Z" />
            {/* Layered cypress foliage clusters on upper-left */}
            <polygon points="-10,70 95,125 18,132 115,185 15,192 85,240 -10,255" />
            {/* Left bottom tree-fern fronds */}
            <path d="M-10,900 L-10,670 C55,695 118,740 168,805 C110,790 62,810 28,840 C82,832 138,855 185,900 Z" />
          </g>

          {/* Right Foreground Cypress Trunk & Layered Conifer/Fern Silhouettes in --floor (#08211C) */}
          <g fill="#08211C" opacity="0.94">
            <path d="M1460,0 L1412,0 C1418,260 1422,540 1396,900 L1460,900 Z" />
            {/* Layered cypress foliage clusters on upper-right */}
            <polygon points="1450,85 1345,140 1422,148 1325,200 1425,208 1355,255 1450,270" />
            {/* Right bottom tree-fern fronds */}
            <path d="M1450,900 L1450,670 C1385,695 1322,740 1272,805 C1330,790 1378,810 1412,840 C1358,832 1302,855 1255,900 Z" />
          </g>
        </svg>

        {/* LAYER 9: Tagline & Bottom Centre "SCROLL TO ENTER THE FLOODPLAIN" Hint */}
        <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5">
          <p className="font-display text-xs sm:text-sm uppercase tracking-[0.28em] text-[#FFF6EA]/80 text-center whitespace-nowrap">
            Titan of the Floodplain Forests
          </p>
          <button
            type="button"
            onClick={onEnterFloodplain}
            aria-label="Scroll to enter the floodplain"
            className="group flex flex-col items-center gap-1.5 cursor-pointer bg-transparent border-0 px-4 py-1 text-[#FFD3A1]/85 hover:text-[#FFF6EA] transition-colors focus-visible:outline-2 focus-visible:outline-[#F6B27A] rounded-md"
          >
            <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-[0.24em] whitespace-nowrap">
              SCROLL TO ENTER THE FLOODPLAIN
            </span>
            <span
              aria-hidden="true"
              className="block w-[1px] h-4 bg-gradient-to-b from-[#F6B27A] to-transparent group-hover:h-6 transition-all duration-300"
            />
          </button>
        </div>

        {/* Fine Film Grain Overlay (~4% opacity) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-28 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255, 246, 234, 0.65) 0.75px, transparent 0.75px)',
            backgroundSize: '3px 3px',
          }}
        />
      </div>
    </section>
  );
};
