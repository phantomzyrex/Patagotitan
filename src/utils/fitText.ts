import { useEffect, useState, RefObject } from 'react';
import { calculateFitTextSizePx, TYPOGRAPHY_TOKENS } from '../styles/tokens';

/**
 * Custom React hook that dynamically computes the display font-size so the
 * 11-letter wordmark "PATAGOTITAN" spans ~85% of the hero container width.
 */
export function useFitText(
  containerRef: RefObject<HTMLElement | null>,
  characterCount: number = 11,
  targetRatio: number = TYPOGRAPHY_TOKENS.heroWordmarkWidthRatio
): number {
  const [fontSizePx, setFontSizePx] = useState<number>(() => {
    const initialWidth = typeof window !== 'undefined' ? window.innerWidth - 32 : 1400;
    return calculateFitTextSizePx(initialWidth, characterCount, targetRatio);
  });

  useEffect(() => {
    const updateSize = () => {
      const width =
        containerRef.current?.clientWidth ||
        (typeof window !== 'undefined' ? window.innerWidth - 32 : 1400);
      setFontSizePx(calculateFitTextSizePx(width, characterCount, targetRatio));
    };

    updateSize();
    window.addEventListener('resize', updateSize, { passive: true });
    return () => window.removeEventListener('resize', updateSize);
  }, [containerRef, characterCount, targetRatio]);

  return fontSizePx;
}
