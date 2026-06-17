"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Navbar() {
  const { activeLang, setActiveLang } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAbsoluteHeader = pathname === "/gallery";
  const isEvents = pathname === "/events";

  const reservationText = activeLang === "DE" ? "Reservierung" : "Reservation";

  const menuText = activeLang === "DE" ? "Speisekarte" : "Menu";

  const locationsText = activeLang === "DE" ? "Standorte" : "Locations";

  const eventsText = activeLang === "DE" ? "Veranstaltungen" : "Events";

  const wallOfFameText = activeLang === "DE" ? "Ruhmeswand" : "Wall of Fame";

  const giftCardsText = activeLang === "DE" ? "Gutscheine" : "Gift Cards";

  const exhibitionText = activeLang === "DE" ? "Navigation" : "Exhibition";

  const coffeehouseCultureText =
    activeLang === "DE"
      ? "Kaffeekultur der 1920er Jahre"
      : "1920s Coffeehouse Culture";

  const toggleMenuLabel =
    activeLang === "DE" ? "Menü umschalten" : "Toggle menu";

  // Close mobile menu on page changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Overlays absolute on /gallery, relative normal flow elsewhere. */}
      <nav
        className={`w-full z-50 px-4 md:px-8 py-4 md:py-6 text-[#3E2723] transition-all duration-300 ${
          isAbsoluteHeader
            ? "absolute top-0 left-0 border-b-0 bg-transparent"
            : `border-b border-[#3E2723]/10 ${isEvents ? "bg-[#F4F1EA]" : "bg-transparent"}`
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center text-sm font-medium tracking-widest uppercase">
          {/* Column 1: Left Navigation (Desktop Only) / Hamburger Button (Mobile/Tablet Only) */}
          <div className="flex justify-start items-center">
            {/* Desktop Links */}
            <div className="hidden lg:flex space-x-8">
              <Link
                href="/reservation"
                className="hover:opacity-70 transition-opacity"
              >
                {reservationText}
              </Link>
              <Link
                href="/#menu"
                className="hover:opacity-70 transition-opacity"
              >
                {menuText}
              </Link>
              <Link
                href="/#locations"
                className="hover:opacity-70 transition-opacity"
              >
                {locationsText}
              </Link>
              <Link
                href="/events"
                className="hover:opacity-70 transition-opacity"
              >
                {eventsText}
              </Link>
            </div>
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-[#3E2723] focus:outline-none p-2 cursor-pointer z-[60] flex items-center justify-center -ml-2"
              aria-label="{toggleMenuLabel}"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Column 2: Center Logo (Always perfectly centered) */}
          <div className="flex justify-center z-[60]">
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/assets/logo/CB_Logo_noClaim.svg"
                alt="Cafe Beatz Logo"
                width={140}
                height={140}
                priority
                className="w-auto h-16 md:h-20 lg:h-24 object-contain"
              />
            </Link>
          </div>

          {/* Column 3: Right Navigation (Desktop Only) / Language switcher (Always visible on right) */}
          <div className="flex justify-end items-center">
            {/* Desktop Right Links */}
            <div className="hidden lg:flex items-center space-x-8 mr-8">
              <Link
                href="/gallery"
                className="hover:opacity-70 transition-opacity"
              >
                {wallOfFameText}
              </Link>
              <Link
                href="/#gift-cards"
                className="hover:opacity-70 transition-opacity"
              >
                {giftCardsText}
              </Link>
            </div>

            {/* Interactive Language Switcher (Responsive Left Border) */}
            <div className="flex items-center space-x-2 lg:border-l lg:border-[#3E2723] lg:pl-8 z-[60]">
              <button
                onClick={() => setActiveLang("EN")}
                className={`transition-all duration-300 cursor-pointer ${
                  activeLang === "EN"
                    ? "font-bold opacity-100"
                    : "font-normal opacity-50 hover:opacity-100"
                }`}
              >
                EN
              </button>
              <span className="opacity-50">/</span>
              <button
                onClick={() => setActiveLang("DE")}
                className={`transition-all duration-300 cursor-pointer ${
                  activeLang === "DE"
                    ? "font-bold opacity-100"
                    : "font-normal opacity-50 hover:opacity-100"
                }`}
              >
                DE
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu off-canvas overlays */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Left-Side Off-canvas Menu Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 left-0 h-screen w-[280px] sm:w-[320px] z-[45] bg-[#FAF8F5] flex flex-col justify-between px-6 pt-28 pb-12 select-none shadow-2xl"
            >
              {/* Soft ambient background glow inside drawer */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,224,71,0.04)_0%,transparent_70%)] pointer-events-none" />

              {/* Navigation Links inside Drawer */}
              <div className="relative z-10 flex flex-col items-start justify-center flex-grow space-y-6 pl-4">
                <span className="text-[10px] tracking-[0.3em] uppercase opacity-40 font-semibold mb-2">
                  {exhibitionText}
                </span>

                <Link
                  href="/reservation"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg md:text-xl font-medium tracking-widest uppercase text-[#3E2723] hover:opacity-75 transition-opacity"
                >
                  {reservationText}
                </Link>
                <Link
                  href="/#menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg md:text-xl font-medium tracking-widest uppercase text-[#3E2723] hover:opacity-75 transition-opacity"
                >
                  {menuText}
                </Link>
                <Link
                  href="/#locations"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg md:text-xl font-medium tracking-widest uppercase text-[#3E2723] hover:opacity-75 transition-opacity"
                >
                  {locationsText}
                </Link>
                <Link
                  href="/events"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg md:text-xl font-medium tracking-widest uppercase text-[#3E2723] hover:opacity-75 transition-opacity"
                >
                  {eventsText}
                </Link>
                <Link
                  href="/gallery"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg md:text-xl font-medium tracking-widest uppercase text-[#3E2723] hover:opacity-75 transition-opacity"
                >
                  {wallOfFameText}
                </Link>
                <Link
                  href="/#gift-cards"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg md:text-xl font-medium tracking-widest uppercase text-[#3E2723] hover:opacity-75 transition-opacity"
                >
                  {giftCardsText}
                </Link>
              </div>

              {/* Footer details inside Drawer */}
              <div className="relative z-10 flex flex-col items-start pl-4 space-y-2 border-t border-[#3E2723]/10 pt-8">
                <span className="font-script text-[#3E2723] text-3xl">
                  Cafe Beatz
                </span>
                <p className="text-[9px] tracking-widest uppercase opacity-40 font-semibold">
                  {coffeehouseCultureText}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
