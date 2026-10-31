import React from 'react';

interface LoaderProps {
  loadProgress: number;
  isLoaded: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ loadProgress, isLoaded }) => {
  if (isLoaded) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Patagotitan Exhibition"
      className="fixed inset-0 z-50 bg-[#08211C] flex flex-col items-center justify-center px-6 transition-opacity duration-300"
    >
      <div className="font-display text-xs uppercase tracking-[0.26em] text-[#F6B27A] mb-3">
        ENTERING THE FLOODPLAIN FOREST
      </div>
      {/* Thin horizontal line that spreads like a sheet of floodwater */}
      <div className="w-64 sm:w-80 h-[2px] bg-[#FFF6EA]/15 overflow-hidden rounded-full">
        <div
          className="h-full bg-gradient-to-r from-[#D07A45] via-[#F6B27A] to-[#2E6B55] transition-all duration-150"
          style={{ width: `${loadProgress}%` }}
        />
      </div>
      {/* Counter 0-100 */}
      <div className="mt-3 font-display text-sm text-[#FFF6EA] tabular-nums">
        {loadProgress}
      </div>
    </div>
  );
};
