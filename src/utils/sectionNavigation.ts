export interface SectionDescriptor {
  id: string;
  num: string;
  label: string;
}

export const SECTION_ORDER: SectionDescriptor[] = [
  { id: 'hero', num: '01', label: 'Floodplain Canopy' },
  { id: 'overview', num: '02', label: 'The Patagonian Giant' },
  { id: 'discovery', num: '03', label: 'Discovery & History' },
  { id: 'anatomy', num: '04', label: 'Skeletal Anatomy' },
  { id: 'size-comparison', num: '05', label: 'Size Comparison' },
  { id: 'diet-life', num: '06', label: 'Diet & Life History' },
  { id: 'habitat', num: '07', label: 'Habitat & Distribution' },
  { id: 'classification', num: '08', label: 'Classification & Species' },
  { id: 'evolution', num: '09', label: 'Evolution & Extinction' },
  { id: 'myth-reality', num: '10', label: 'Myth vs Reality' },
  { id: 'gallery', num: '11', label: 'Exhibition Gallery' },
  { id: 'fast-facts', num: '12', label: 'Fast Facts & Sources' },
  { id: 'contact', num: '13', label: 'Contact & Portfolio' },
];

/**
 * Pure function that resolves the target section ID for global keyboard exploration
 * using ArrowDown, ArrowUp, ArrowRight, ArrowLeft, and Space (or Shift+Space).
 */
export function resolveKeyboardSectionJump(
  currentSectionId: string,
  key: string,
  shiftKey: boolean = false
): SectionDescriptor | null {
  const currentIndex = SECTION_ORDER.findIndex((s) => s.id === currentSectionId);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;

  const isNextKey =
    key === 'ArrowDown' ||
    key === 'ArrowRight' ||
    (key === ' ' && !shiftKey) ||
    (key === 'Spacebar' && !shiftKey);

  const isPrevKey =
    key === 'ArrowUp' ||
    key === 'ArrowLeft' ||
    (key === ' ' && shiftKey) ||
    (key === 'Spacebar' && shiftKey);

  if (isNextKey) {
    const nextIdx = Math.min(SECTION_ORDER.length - 1, safeIndex + 1);
    return SECTION_ORDER[nextIdx];
  }

  if (isPrevKey) {
    const prevIdx = Math.max(0, safeIndex - 1);
    return SECTION_ORDER[prevIdx];
  }

  if (key === 'Home') {
    return SECTION_ORDER[0];
  }

  if (key === 'End') {
    return SECTION_ORDER[SECTION_ORDER.length - 1];
  }

  return null;
}
