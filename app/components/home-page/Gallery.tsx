"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Gallery() {
  const { activeLang } = useLanguage();

  const [hoveredRow, setHoveredRow] = useState<null | 1 | 2>(null);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/galleries`)
      .then((res) => res.json())
      .then((data) => {
        setGalleryImages(data.data);
      })
      .catch((err) => console.error("Gallery API Error:", err));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (galleryImages.length === 0) {
    return (
      <section className="py-32 text-center bg-[#F4F1EA]">
        Loading Gallery...
      </section>
    );
  }

  const duplicatedImages = [...galleryImages, ...galleryImages];

  return (
    <section
      id="gallery"
      className="w-full py-32 px-6 md:px-[80px] bg-[#F4F1EA] text-[#3E2723]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="w-16 h-[1px] bg-[#3E2723] mx-auto mb-6"></div>

          <h2 className="text-4xl md:text-5xl font-medium tracking-wide mb-4">
            {activeLang === "DE" ? "Galerie" : "Gallery"}
          </h2>

          <p className="text-sm uppercase tracking-[0.2em] opacity-70">
            {activeLang === "DE"
              ? "Momente für die Ewigkeit festgehalten"
              : "Moments captured in time"}
          </p>
        </div>

        <div className="space-y-8">
          {/* FIRST ROW */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.9,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="overflow-hidden py-4"
          >
            <div
              className="gallery-scroll-track"
              onMouseEnter={() => setHoveredRow(1)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                animationPlayState: hoveredRow === 1 ? "paused" : "running",
              }}
            >
              {duplicatedImages.map((img, index) => {
                const smallTitle =
                  activeLang === "DE"
                    ? img.content_de?.[0]
                    : img.content_en?.[0];

                const mainTitle =
                  activeLang === "DE"
                    ? img.content_de?.[1]
                    : img.content_en?.[1];

                return (
                  <button
                    key={`row1-${img.id}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className="group relative min-w-[280px] h-[380px] overflow-hidden rounded-[28px] border border-white/70 bg-stone-100 shadow-lg shadow-stone-200/50"
                  >
                    <img
                      src={img.image_url}
                      alt={mainTitle}
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute bottom-4 left-4 text-left text-white opacity-90">
                      <p className="text-xs uppercase tracking-[0.24em]">
                        {smallTitle}
                      </p>

                      <p className="text-lg font-semibold leading-tight">
                        {mainTitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* SECOND ROW */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="overflow-hidden py-4"
          >
            <div
              className="gallery-scroll-track gallery-scroll-track-reverse"
              onMouseEnter={() => setHoveredRow(2)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                animationPlayState: hoveredRow === 2 ? "paused" : "running",
              }}
            >
              {duplicatedImages.map((img, index) => {
                const smallTitle =
                  activeLang === "DE"
                    ? img.content_de?.[0] || img.content_en?.[0]
                    : img.content_en?.[0];

                const mainTitle =
                  activeLang === "DE"
                    ? img.content_de?.[1] || img.content_en?.[1]
                    : img.content_en?.[1];

                return (
                  <button
                    key={`row2-${img.id}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className="group relative min-w-[280px] h-[380px] overflow-hidden rounded-[28px] border border-white/70 bg-stone-100 shadow-lg shadow-stone-200/50"
                  >
                    <img
                      src={img.image_url}
                      alt={mainTitle}
                      className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="absolute bottom-4 left-4 text-left text-white opacity-90">
                      <p className="text-xs uppercase tracking-[0.24em]">
                        {smallTitle}
                      </p>

                      <p className="text-lg font-semibold leading-tight">
                        {mainTitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* POPUP */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="relative max-w-5xl w-full rounded-[28px] overflow-hidden bg-[#111] shadow-[0_0_80px_rgba(0,0,0,0.6)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="absolute right-4 top-4 z-20 rounded-full bg-black/70 p-3 text-white transition hover:bg-black"
              >
                ×
              </button>

              <div className="relative h-[min(80vh,700px)] w-full">
                <img
                  src={activeImage.image_url}
                  alt={
                    activeLang === "DE"
                      ? activeImage.content_de?.[1]
                      : activeImage.content_en?.[1]
                  }
                  className="w-full h-full object-contain bg-black"
                />
              </div>

              <div className="p-6 text-white bg-black/80">
                <p className="text-xs uppercase tracking-[0.28em] text-[#d8c5b1]">
                  {activeLang === "DE"
                    ? activeImage.content_de?.[0]
                    : activeImage.content_en?.[0]}
                </p>

                <h3 className="mt-2 text-2xl font-semibold">
                  {activeLang === "DE"
                    ? activeImage.content_de?.[1]
                    : activeImage.content_en?.[1]}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
