/**
 * Warm Seasonal Floodplain Forest Design Tokens
 * Centralised colour, typography, spacing, and motion tokens for Patagotitan.
 */

export const COLOR_TOKENS = {
  glow: '#F6B27A',    // warm apricot haze, top glow
  clay: '#D07A45',    // terracotta, dry-season earth
  sage: '#8E9A6B',    // dusty sage, dry scrub and ferns
  moss: '#5E8A58',    // humid moss green
  conifer: '#2E6B55', // cypress blue-green
  deep: '#123D33',    // wet forest shade
  floor: '#08211C',   // forest floor
  mud: '#3A2A1C',     // floodplain mud, tree trunks
  umber: '#14100A',   // ink, deepest shadows
  mist: '#DDEBDD',    // humid mist
  ash: '#CFC6BA',     // volcanic ash flecks
  bone: '#FFF6EA',    // primary warm-white text
  rim: '#FFD3A1',     // warm rim light on the creature
  menuOverlay: '#081C17', // full-screen deep conifer overlay
} as const;

export const TYPOGRAPHY_TOKENS = {
  fontDisplay: "'Marcellus', 'Cinzel', 'Optima', Georgia, serif",
  fontBody: "'Jost', -apple-system, BlinkMacSystemFont, sans-serif",
  heroWordmarkWidthRatio: 0.85,
  heroWordmarkTracking: '-0.01em',
  navTracking: '0.08em',
  sectionKickerTracking: '0.22em',
  bodyLineHeight: 1.7,
} as const;

export const SPACING_TOKENS = {
  heroFrameRadiusPx: 24,
  heroFrameMarginDesktopPx: 16,
  heroFrameMarginMobilePx: 10,
  navPaddingXDesktopPx: 32,
  navPaddingYDesktopPx: 24,
  sectionPaddingYDesktop: '8rem',
  sectionPaddingYMobile: '6rem',
  containerMaxWidthPx: 1280,
} as const;

export const PARALLAX_TOKENS = {
  wordmarkPx: 12,
  creaturePx: 24,
  sunbeamsPx: 40,
  particlesPx: 60,
  foregroundSilhouettesPx: 80,
} as const;

/**
 * Pure helper to calculate responsive font size in px so an uppercase wordmark
 * spans the target fraction (default 85%) of a container width.
 */
export function calculateFitTextSizePx(
  containerWidthPx: number,
  characterCount: number = 11,
  targetWidthRatio: number = TYPOGRAPHY_TOKENS.heroWordmarkWidthRatio,
  avgCharAspectRatio: number = 0.74
): number {
  if (containerWidthPx <= 0 || characterCount <= 0) return 64;
  const targetSpanPx = containerWidthPx * targetWidthRatio;
  const rawFontSize = targetSpanPx / (characterCount * avgCharAspectRatio);
  return Math.round(Math.max(52, Math.min(280, rawFontSize)) * 10) / 10;
}
