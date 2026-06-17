"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ImageFrame } from "./types";

interface LightboxModalProps {
  activeImage: ImageFrame | null;
  onClose: () => void;
}

export default function LightboxModal({ activeImage, onClose }: LightboxModalProps) {
  return (
    <AnimatePresence>
      {activeImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-sm cursor-zoom-out"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-20 rounded-full bg-[#FAF8F5]/10 p-3.5 text-white transition hover:bg-[#FAF8F5]/20 hover:scale-105 cursor-pointer"
            aria-label="Close image preview"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Photo Container */}
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full h-[min(72vh,750px)] rounded-[20px] overflow-hidden bg-[#181818] shadow-[0_15px_50px_rgba(0,0,0,0.8)] border border-[#FAF8F5]/10 cursor-default"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              className="object-contain"
            />
          </motion.div>

          {/* Title & Mat details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
            className="text-center mt-6 text-white max-w-xl px-4 select-text cursor-default"
          >
            <span className="text-xs uppercase tracking-[0.24em] text-[#C5A880]">Cafe Beatz Wall of Fame</span>
            <h3 className="mt-2 text-2xl font-medium tracking-wide text-[#FAF8F5]">{activeImage.alt}</h3>
            <div className="w-12 h-[1px] bg-[#C5A880]/30 mx-auto my-3"></div>
            <p className="text-sm text-stone-400 font-sans tracking-wide">
              A warm slice of the 1920s coffeehouse culture, frozen in time. Open daily to preserve history.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
