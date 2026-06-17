"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoaderOverlayProps {
  isReady: boolean;
  progressPercent: number;
}

export default function LoaderOverlay({ isReady, progressPercent }: LoaderOverlayProps) {
  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="fixed inset-0 z-[100] bg-[#FAF8F5] flex flex-col items-center justify-center text-[#3E2723] select-none"
        >
          {/* Ambient Background Glow for Loader */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.06)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <span className="text-[10px] tracking-[0.3em] uppercase opacity-60 mb-2 font-medium">Exhibition Hall</span>
            <h1 className="font-script text-[#3E2723] text-5xl md:text-6xl mb-6">Wall of Fame</h1>

            {/* Circular luxury loading indicator */}
            <div className="relative w-16 h-16 flex items-center justify-center mb-8">
              <div className="absolute w-full h-full border-[3px] border-[#3E2723]/10 rounded-full" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="absolute w-full h-full border-[3px] border-transparent border-t-[#C5A880] rounded-full"
              />
              <span className="text-[10px] font-bold tracking-wider text-[#3E2723]/80">{progressPercent}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-[2px] bg-[#3E2723]/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-[#C5A880] to-[#3E2723]"
              />
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] opacity-40">Curating artworks...</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
