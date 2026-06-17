"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const galleryImages = [
    { id: 1, src: "/assets/clint-images/Wall of fame 1 Image.png", alt: "Cafe Beatz", ratio: "aspect-[3/4]" },
    { id: 2, src: "/assets/clint-images/WAll of fame 2 Image MayM.png", alt: "Cafe Beatz", ratio: "aspect-[4/3]" },
    { id: 3, src: "/assets/clint-images/ChatGPT Image May 20, 2026, 05_44_08 PM.png", alt: "Happy Guests", ratio: "aspect-square" },
    { id: 4, src: "/assets/clint-images/ChatGPT Image May 21, 2026, 01_31_07 PM.png", alt: "Antique Decor", ratio: "aspect-[4/5]" },
    { id: 5, src: "/assets/clint-images/Page 2 ....2.png", alt: "Cafe Beatz", ratio: "aspect-[3/4]" },
    { id: 6, src: "/assets/clint-images/Page 2 ...3.png", alt: "Cafe Beatz", ratio: "aspect-[16/9]" },
];

const duplicatedImages = [...galleryImages, ...galleryImages];

export default function WallOfFame() {
    return (
        <section id="wall-of-fame" className="w-full py-32 px-6 md:px-[80px] bg-[#F4F1EA] text-[#3E2723]">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-20">
                    <div className="w-16 h-[1px] bg-[#3E2723] mx-auto mb-6"></div>
                    <h2 className="text-4xl md:text-5xl font-medium tracking-wide mb-4">
                        Gallery
                    </h2>
                    <p className="text-sm uppercase tracking-[0.2em] opacity-70">
                        Moments captured in time
                    </p>
                </div>

                {/* CSS Columns Masonry Layout - adjusted gap for a tighter editorial look */}
                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                    {galleryImages.map((img, index) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.1,
                                ease: [0.21, 0.47, 0.32, 0.98] // Custom easing for a heavier, premium feel
                            }}
                            className={`relative w-full ${img.ratio} overflow-hidden group break-inside-avoid bg-stone-200 cursor-pointer`}
                        >
                            <a href="https://instagram.com/cafebeatz" target="_blank" rel="noreferrer" className="block w-full h-full relative">
                                {/* 1. The Image with a complex, moody film filter stack */}
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover contrast-125 brightness-90 saturate-[0.6] sepia-[0.2] group-hover:saturate-100 group-hover:sepia-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:scale-[1.04] transition-all duration-[800ms] ease-out"
                                />

                                {/* 2. Pure CSS Vignette (Darkens the edges slightly like an old camera lens) */}
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] opacity-80 group-hover:opacity-30 transition-opacity duration-700"></div>

                                {/* 3. Pure CSS Film Grain Overlay */}
                                <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

                                {/* 4. Editorial Caption Reveal */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                        <p className="text-white text-xs uppercase tracking-widest mb-1 opacity-80">Cafe Beatz</p>
                                        <h3 className="text-white text-xl font-medium tracking-wide">{img.alt}</h3>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}