"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/gallery") return null;

  const { activeLang } = useLanguage();

  const contactUs = activeLang === "DE" ? "Kontakt" : "Contact Us";

  const explore = activeLang === "DE" ? "Entdecken" : "Explore";

  const followUs = activeLang === "DE" ? "Folgen Sie uns" : "Follow Us";

  const reservation = activeLang === "DE" ? "Tischreservierung" : "Reservation";

  const ourMenus = activeLang === "DE" ? "Unsere Speisekarten" : "Our Menus";

  const locationsHours =
    activeLang === "DE" ? "Standorte & Öffnungszeiten" : "Locations & Hours";

  const eventsCatering =
    activeLang === "DE" ? "Veranstaltungen & Catering" : "Events & Catering";

  const giftVoucher =
    activeLang === "DE" ? "Gutschein kaufen" : "Purchase Voucher";

  const primaryLocation =
    activeLang === "DE" ? "Hauptstandort" : "Primary Location";

  const westEndParlor =
    activeLang === "DE" ? "West End Salon" : "West End Parlor";

  const legalNotice = activeLang === "DE" ? "Impressum" : "Legal Notice";

  const privacyPolicy = activeLang === "DE" ? "Datenschutz" : "Privacy Policy";

  const jobs = activeLang === "DE" ? "Karriere" : "Jobs";

  const copyright =
    activeLang === "DE"
      ? "2026 Cafe Beatz. Alle Rechte vorbehalten."
      : "2026 Cafe Beatz. All rights reserved.";

  const footerDescription =
    activeLang === "DE"
      ? "Bewahrung des haptischen Luxus der Kaffeehäuser der 1920er Jahre. Ein Ort, an dem die Zeit langsamer vergeht und jede Tasse ihre eigene Geschichte erzählt."
      : "Preserving the tactile luxury of the 1920s coffeehouse. A sanctuary where time slows down, and every cup tells a story of an era gone by.";

  return (
    <footer className="relative w-full bg-[#271815] text-[#F4F1EA] overflow-hidden">
      {/* 1. The High-End Marquee Separator */}
      <div className="w-full bg-[#F4F1EA] text-[#3E2723] py-5 border-y border-[#3E2723]/10 flex overflow-hidden whitespace-nowrap z-20 relative shadow-inner">
        <motion.div
          className="flex space-x-8 items-center text-xs md:text-sm font-bold uppercase tracking-widest"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {/* Duplicating the array ensures the infinite scroll never "jumps" */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex space-x-8 items-center shrink-0">
              <span>
                {activeLang === "DE"
                  ? "Schiffbauerdamm 10, Berlin"
                  : "Schiffbauerdamm 10, Berlin"}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#3E2723] opacity-30"></span>
              <span>
                {activeLang === "DE"
                  ? "Telefon: 030 / 810 10 858"
                  : "Tel: 030 / 810 10 858"}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#3E2723] opacity-30"></span>
              <span>hello@cafebeatz.com</span>
              <span className="w-2 h-2 rounded-full bg-[#3E2723] opacity-30"></span>
              <span>
                {activeLang === "DE"
                  ? "Potsdamer Straße 103, Berlin"
                  : "Potsdamer Straße 103, Berlin"}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#3E2723] opacity-30"></span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 2. Main Footer Grid (Upgraded to 12-columns for editorial spacing) */}
      <div className="max-w-7xl mx-auto px-6 md:px-[80px] pt-32 pb-16 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 relative z-10">
        {/* COLUMN 1: Logo & Ethos (Spans 4 columns) */}
        <div className="flex flex-col items-start md:col-span-4 pr-0 md:pr-12">
          <Image
            src="/assets/logo/logo2.svg"
            alt="Cafe Beatz Logo"
            width={180}
            height={180}
            /* 'invert' flips the dark brown SVG to white. 'opacity-90' softens it. */
            className="mb-8 opacity-90 hover:opacity-100 transition-opacity"
          />
          <p className="text-sm opacity-70 leading-relaxed font-medium">
            {footerDescription}
          </p>
        </div>

        {/* COLUMN 2: Contact (Spans 3 columns) */}
        <div className="flex flex-col md:col-span-3">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-8 text-[#D7CCC8]">
            {contactUs}
          </h3>

          <div className="space-y-6 text-sm opacity-80">
            <div>
              <p className="font-bold mb-1 opacity-100 text-[#F4F1EA]">
                {primaryLocation}
              </p>
              <a
                href="tel:+493081010858"
                className="block mt-2 hover:text-[#D7CCC8] transition-colors"
              >
                030 / 810 10 858
              </a>
            </div>
            <div>
              <p className="font-bold mb-1 opacity-100 text-[#F4F1EA]">
                {westEndParlor}
              </p>
              <a
                href="tel:+493012345678"
                className="block mt-2 hover:text-[#D7CCC8] transition-colors"
              >
                030 / 123 45 678
              </a>
            </div>
            <div className="pt-4 border-t border-[#F4F1EA]/10">
              <a
                href="mailto:hello@cafebeatz.com"
                className="hover:text-[#D7CCC8] transition-colors font-medium tracking-wide"
              >
                hello@cafebeatz.com
              </a>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Quick Links (Spans 3 columns) */}
        <div className="flex flex-col md:col-span-3">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-8 text-[#D7CCC8]">
            {explore}
          </h3>

          <ul className="space-y-4 text-sm opacity-80">
            <li>
              <Link
                href="/reservation"
                className="hover:text-[#D7CCC8] hover:translate-x-2 transition-all inline-block"
              >
                {reservation}
              </Link>
            </li>
            <li>
              <Link
                href="#menu"
                className="hover:text-[#D7CCC8] hover:translate-x-2 transition-all inline-block"
              >
                {ourMenus}
              </Link>
            </li>
            <li>
              <Link
                href="#locations"
                className="hover:text-[#D7CCC8] hover:translate-x-2 transition-all inline-block"
              >
                {locationsHours}
              </Link>
            </li>
            <li>
              <Link
                href="#events"
                className="hover:text-[#D7CCC8] hover:translate-x-2 transition-all inline-block"
              >
                {eventsCatering}
              </Link>
            </li>
            <li>
              <Link
                href="#gift-cards"
                className="hover:text-[#D7CCC8] hover:translate-x-2 transition-all inline-block"
              >
                {giftVoucher}
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 4: Socials (Spans 2 columns) */}
        <div className="flex flex-col md:items-end md:col-span-2">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase mb-8 text-[#D7CCC8]">
            {followUs}
          </h3>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full border border-[#F4F1EA]/30 hover:border-[#F4F1EA] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#F4F1EA] scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full ease-out"></div>
            <svg
              className="w-8 h-8 md:w-10 md:h-10 relative z-10 text-[#F4F1EA] group-hover:text-[#271815] transition-colors duration-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>

      {/* 3. Sub-Footer: Legal & Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-[80px] pt-8 pb-12 border-t border-[#F4F1EA]/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-50 tracking-widest uppercase gap-6">
        <p>&copy; {copyright}.</p>
        <div className="flex flex-wrap justify-center md:justify-end space-x-6">
          <Link
            href="#impressum"
            className="hover:opacity-100 transition-opacity"
          >
            {legalNotice}
          </Link>
          <Link
            href="#privacy"
            className="hover:opacity-100 transition-opacity"
          >
            {privacyPolicy}
          </Link>
          <Link href="#jobs" className="hover:opacity-100 transition-opacity">
            {jobs}
          </Link>
        </div>
      </div>
    </footer>
  );
}
