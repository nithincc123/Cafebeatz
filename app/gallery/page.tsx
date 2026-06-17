"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ImageFrame } from "../components/gallery-page/types";
import LoaderOverlay from "../components/gallery-page/LoaderOverlay";
import GalleryControls from "../components/gallery-page/GalleryControls";
import LightboxModal from "../components/gallery-page/LightboxModal";

const galleryImages: ImageFrame[] = [
  { id: 1, src: "/assets/clint-images/Wall of fame 1 Image.png", alt: "Wall of Fame Portrait 1", width: 330, height: 440, angle: 0, translateY: -160, rotation: "-1.5deg", frameType: "walnut" },
  { id: 2, src: "/assets/clint-images/WAll of fame 2 Image MayM.png", alt: "Wall of Fame Group Photo", width: 460, height: 345, angle: 22.5, translateY: 100, rotation: "1deg", frameType: "gold" },
  { id: 3, src: "/assets/clint-images/ChatGPT Image May 20, 2026, 05_44_08 PM.png", alt: "Warm Coffeehouse Moments", width: 320, height: 320, angle: 45, translateY: -100, rotation: "0.8deg", frameType: "black" },
  { id: 4, src: "/assets/clint-images/ChatGPT Image May 21, 2026, 01_31_07 PM.png", alt: "Vintage Interior Decor", width: 350, height: 440, angle: 67.5, translateY: 180, rotation: "-1.2deg", frameType: "canvas" },

  { id: 5, src: "/assets/clint-images/Page 2 ....2.png", alt: "Morning Espresso Crafting", width: 330, height: 440, angle: 90, translateY: -220, rotation: "1.2deg", frameType: "walnut" },
  { id: 6, src: "/assets/clint-images/Page 2 ...3.png", alt: "Cafe Beatz Coffee Culture", width: 480, height: 270, angle: 112.5, translateY: 60, rotation: "-0.8deg", frameType: "gold" },
  { id: 7, src: "/assets/clint-images/Location 1 option 1.png", alt: "Potsdamer Straße Parlor", width: 330, height: 440, angle: 135, translateY: -80, rotation: "1.5deg", frameType: "black" },
  { id: 8, src: "/assets/clint-images/Location 1 option 2.png", alt: "Cozy Fireside Corner", width: 440, height: 330, angle: 157.5, translateY: 200, rotation: "-1deg", frameType: "canvas" },

  { id: 9, src: "/assets/clint-images/Location 1 option 3.png", alt: "Schiffbauerdamm Seating", width: 330, height: 440, angle: 180, translateY: -140, rotation: "-1deg", frameType: "canvas" },
  { id: 10, src: "/assets/clint-images/Page 2 option 1.png", alt: "Handcrafted Pastries", width: 440, height: 330, angle: 202.5, translateY: 120, rotation: "1.2deg", frameType: "gold" },
  { id: 11, src: "/assets/clint-images/Page 2 option 3.png", alt: "Freshly Ground Coffee Beans", width: 440, height: 330, angle: 225, translateY: -60, rotation: "-0.5deg", frameType: "walnut" },
  { id: 12, src: "/assets/clint-images/Page 2....1.png", alt: "Artisan Baristas at Work", width: 330, height: 440, angle: 247.5, translateY: 240, rotation: "1deg", frameType: "black" },

  { id: 13, src: "/assets/clint-images/evening-image.jpeg", alt: "Evening Jazz & Coffee", width: 400, height: 300, angle: 270, translateY: -180, rotation: "0.5deg", frameType: "gold" },
  { id: 14, src: "/assets/clint-images/event 1.png", alt: "Chamber Music Evening", width: 440, height: 330, angle: 292.5, translateY: 80, rotation: "-1.5deg", frameType: "walnut" },
  { id: 15, src: "/assets/clint-images/event 2.png", alt: "Poetry Reading & Latte Art", width: 440, height: 330, angle: 315, translateY: -100, rotation: "1deg", frameType: "canvas" },
  { id: 16, src: "/assets/clint-images/event 3.png", alt: "Roastery Grand Opening", width: 440, height: 330, angle: 337.5, translateY: 160, rotation: "-0.8deg", frameType: "black" }
];

const getZValue = (vp: "mobile" | "tablet" | "desktop") => {
  if (vp === "mobile") return 240;
  if (vp === "tablet") return 220;
  return 200;
};

export default function GalleryPage() {
  const [activeImage, setActiveImage] = useState<ImageFrame | null>(null);
  const [viewport, setViewport] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const checkViewport = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setViewport("mobile");
      } else if (w < 1024) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
      }
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Image loading states for the pre-loader
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Refs for camera/rotator state (avoiding React re-renders for buttery-smooth drag)
  const roomRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startYaw = useRef(0);

  // Target horizontal rotation (lerping targets)
  const targetYaw = useRef(0);

  // Current animated values
  const currentYaw = useRef(0);

  // Handle image load count
  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  useEffect(() => {
    // Reveal page once all images load
    if (loadedCount >= galleryImages.length) {
      setIsReady(true);
    }
  }, [loadedCount]);

  useEffect(() => {
    // Fallback timer to ensure page loads if an image fails to fire onLoad
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Drag handlers (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".gallery-frame-inner") || (e.target as HTMLElement).closest("button")) {
      return; // Interact with buttons or inner frames, not drag
    }
    isDragging.current = true;
    startX.current = e.clientX;
    startYaw.current = targetYaw.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;

    // Horizontal panning yaw rotation (inverted for natural camera dragging direction)
    targetYaw.current = startYaw.current - dx * 0.15;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Drag handlers (Touch/Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest(".gallery-frame-inner") || (e.target as HTMLElement).closest("button")) {
      return;
    }
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    startYaw.current = targetYaw.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - startX.current;

    // Horizontal panning yaw rotation (inverted for natural camera dragging direction)
    targetYaw.current = startYaw.current - dx * 0.22;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Controller rotation methods (increments target yaw horizontally)
  const rotateLeft = () => {
    targetYaw.current += 22.5; // rotate by 22.5 degrees (one frame angle increment)
  };

  const rotateRight = () => {
    targetYaw.current -= 22.5;
  };

  // Buttery-smooth lerp animation loop (horizontal-only yaw, zoom fixed at 0)
  useEffect(() => {
    let frameId: number;

    const animate = () => {
      currentYaw.current += (targetYaw.current - currentYaw.current) * 0.085;

      if (roomRef.current) {
        // Set camera center dynamically: pushed back on mobile (-400px) and tablet (-300px) to decrease size and center layout
        const tz = getZValue(viewport);
        roomRef.current.style.transform = `
          translateZ(${tz}px)
          rotateX(-4.5deg)
          rotateY(${currentYaw.current}deg)
        `;
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [viewport]);

  // Keyboard close for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const progressPercent = Math.min(100, Math.round((loadedCount / galleryImages.length) * 100));

  return (
    <>
      {/* Luxury Loading Screen Overlay */}
      <LoaderOverlay isReady={isReady} progressPercent={progressPercent} />

      <main
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-screen h-screen overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{
          background: "radial-gradient(circle at center, #FFFFFF 0%, #F4F1EA 100%)",
        }}
      >
        {/* Static Background Spots / Ambient Vignette Light Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(253,224,71,0.06)_0%,transparent_35%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(253,224,71,0.05)_0%,transparent_40%)] pointer-events-none" />
        {/* Soft gradient mask matching the page background to cover frames at the bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-[180px] md:h-[240px] pointer-events-none z-10"
          style={{
            backgroundImage: "linear-gradient(to top, #F4F1EA 25%, rgba(244, 241, 234, 0.8) 60%, transparent 100%)"
          }}
        />

        {/* Stationary Editorial Page Title and Controller - placed at the bottom */}
        <GalleryControls rotateLeft={rotateLeft} rotateRight={rotateRight} />

        {/* 3D Viewport View container */}
        <div className="absolute inset-0 flex items-center justify-center [perspective:1000px] [perspective-origin:50%_50%] z-0">
          {/* 3D Rotator Point */}
          <div
            ref={roomRef}
            className="absolute left-1/2 top-1/2 [transform-style:preserve-3d] will-change-transform"
            style={{
              transform: `translateZ(${getZValue(viewport)}px) rotateX(-4.5deg) rotateY(${currentYaw.current}deg)`
            }}
          >
            {/* Carousel Frames in a 3D circle */}
            {galleryImages.map((img, index) => {
              const total = galleryImages.length;

              // 1. Calculate angles dynamically to distribute them evenly in a circle (360 degrees)
              const angle = img.angle !== undefined ? img.angle : (index / total) * 360;

              // 2. Use a dynamic radius to place the camera inside the circle for all viewports, and reduce gap on mobile/tablet
              const radius = viewport === "mobile"
                ? 780
                : (viewport === "tablet" ? 880 : Math.max(950, (total * 373) / (2 * Math.PI)));

              const scale = viewport === "mobile" ? 0.55 : (viewport === "tablet" ? 0.78 : 1.0);
              const width = img.width * scale;
              const height = img.height * scale;

              // 3. Fallback staggered height if translateY is undefined
              const rawTranslateY = img.translateY !== undefined
                ? img.translateY
                : (index % 2 === 0 ? -120 : 120) + (index % 3 === 0 ? 40 : -40);
              const translateY = rawTranslateY * scale;

              // 4. Fallback rotation angle if undefined
              const rotation = img.rotation !== undefined
                ? img.rotation
                : (index % 2 === 0 ? "-1deg" : "1deg");

              // 5. Fallback frame style if undefined
              const frameTypes: ("walnut" | "gold" | "black" | "canvas")[] = ["walnut", "gold", "black", "canvas"];
              const frameType = img.frameType !== undefined
                ? img.frameType
                : frameTypes[index % frameTypes.length];

              return (
                <div
                  key={img.id}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: -width / 2,
                    marginTop: -height / 2,
                    width: width,
                    height: height,
                    transformStyle: "preserve-3d",
                    // Parent container handles circle layout position:
                    transform: `rotateY(${angle}deg) translateZ(-${radius}px) translateY(${translateY}px)`
                  } as React.CSSProperties}
                >
                  {/* Child handles the hover styling, organic tilts, transitions, and click handlers */}
                  <div
                    onClick={() => setActiveImage(img)}
                    className={`gallery-frame-inner w-full h-full select-none cursor-pointer ${frameType === "walnut" ? "border-[6px] md:border-[12px] border-[#2E1A16] bg-[#FAF6F0] p-2 md:p-4 shadow-[10px_10px_25px_rgba(0,0,0,0.35),_0_0_0_1px_#c5a880]" : ""
                      } ${frameType === "gold" ? "border-[5px] md:border-[10px] border-[#C5A880] bg-[#FAF8F5] p-2.5 md:p-5 shadow-[12px_12px_30px_rgba(0,0,0,0.38),_inset_0_0_10px_rgba(0,0,0,0.15)] border-double" : ""
                      } ${frameType === "black" ? "border-[3px] md:border-[6px] border-[#1C1C1C] bg-[#FFF] p-3 md:p-6 shadow-[8px_8px_20px_rgba(0,0,0,0.3),_inset_0_0_4px_rgba(0,0,0,0.1)]" : ""
                      } ${frameType === "canvas" ? "border-stone-800 border-r-[2px] md:border-r-[3px] border-b-[2px] md:border-b-[3px] shadow-[15px_15px_35px_rgba(0,0,0,0.4)]" : ""
                      }`}
                    style={{
                      transformStyle: "preserve-3d",
                      "--rot": rotation,
                    } as React.CSSProperties}
                  >
                    {/* Floating soft glow panel behind each frame */}
                    <div
                      className="absolute inset-0 -z-10 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl animate-pulse"
                      style={{
                        backgroundImage: "radial-gradient(circle, rgba(253, 224, 71, 0.25) 0%, transparent 80%)"
                      }}
                    />

                    <div className="relative w-full h-full overflow-hidden select-none bg-stone-100 shadow-[inset_1px_1px_5px_rgba(0,0,0,0.25)]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="450px"
                        onLoad={handleImageLoad}
                        priority={img.id <= 4} // Preload the first few front-facing images
                        className="object-cover pointer-events-none brightness-[0.93] contrast-[1.04] sepia-[0.05] group-hover:brightness-100 transition-[filter] duration-500"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        {/* Lightbox Modal overlay */}
        <LightboxModal activeImage={activeImage} onClose={() => setActiveImage(null)} />

        <style dangerouslySetInnerHTML={{
          __html: `
          .gallery-frame-inner {
            transform-style: preserve-3d;
            transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
            transform: translateZ(0px) rotate(var(--rot));
          }
          .gallery-frame-inner:hover {
            transform: translateZ(55px) scale(1.05) rotate(var(--rot)) !important;
            box-shadow: 0 35px 70px rgba(0, 0, 0, 0.42), 0 0 0 1px rgba(255, 255, 255, 0.1);
            z-index: 50;
          }
          /* Lock screen scrolling on this page */
          body {
            overflow: hidden;
            touch-action: none;
          }
        `}} />
      </main>
    </>
  );
}
