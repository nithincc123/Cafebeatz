"use client";

interface GalleryControlsProps {
  rotateLeft: () => void;
  rotateRight: () => void;
}

export default function GalleryControls({ rotateLeft, rotateRight }: GalleryControlsProps) {
  return (
    <div className="absolute bottom-[40px] md:bottom-[60px] left-0 w-full px-4 md:px-8 flex flex-row items-center justify-between md:justify-center gap-4 md:gap-8 z-20 select-none">
      {/* Rotate Left Button */}
      <button
        onClick={rotateLeft}
        className="p-2.5 md:p-3 rounded-full border border-[#3E2723] bg-[#FAF8F5] text-[#3E2723] hover:bg-[#3E2723] hover:text-white shadow-md hover:shadow-lg transition-all active:scale-95 hover:scale-105 cursor-pointer flex items-center justify-center shrink-0"
        aria-label="Rotate left"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Title Text */}
      <div className="text-center pointer-events-none">
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.26em] text-[#C5A880] font-semibold">Cafe Beatz Exhibition</span>
        <h1 className="font-script text-[#3E2723]/80 text-3xl md:text-5xl mt-1 leading-none">Wall of Fame</h1>
        <div className="w-12 md:w-16 h-[1px] bg-[#C5A880]/30 mx-auto mt-2 md:mt-3"></div>
      </div>

      {/* Rotate Right Button */}
      <button
        onClick={rotateRight}
        className="p-2.5 md:p-3 rounded-full border border-[#3E2723] bg-[#FAF8F5] text-[#3E2723] hover:bg-[#3E2723] hover:text-white shadow-md hover:shadow-lg transition-all active:scale-95 hover:scale-105 cursor-pointer flex items-center justify-center shrink-0"
        aria-label="Rotate right"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
