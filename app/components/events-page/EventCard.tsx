"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../Button";
import { CafeEvent } from "./types";
import { useLanguage } from "@/app/context/LanguageContext";

interface EventCardProps {
  ev: CafeEvent;
  index: number;
  onRsvp: (ev: CafeEvent) => void;
}

export default function EventCard({ ev, index, onRsvp }: EventCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const { activeLang } = useLanguage();

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const scheduleTitle =
    activeLang === "DE" ? "Veranstaltungsplan" : "Event Schedule";

  const scheduleDate =
    activeLang === "DE" ? "Veranstaltungsdatum" : "Event Date";

  const scheduleDoor = activeLang === "DE" ? "Einlasszeiten" : "Door Hours";

  const scheduleVenue =
    activeLang === "DE" ? "Veranstaltungsort" : "Salon Venue";

  const enquiryText = activeLang === "DE" ? "Jetzt anfragen" : "Enquire Now";

  const inquireText =
    activeLang === "DE" ? "Catering anfragen" : "Inquire Catering";

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col ${
        index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
      } gap-12 md:gap-24 items-center relative z-10`}
    >
      {/* Event Photo Column (scroll-parallax within frame wrapper) */}
      <div className="w-full md:w-1/2 relative h-[350px] md:h-[480px]">
        <div className="absolute inset-0 overflow-hidden rounded-sm shadow-xl">
          <motion.div
            style={{ y: imageY }}
            className="absolute left-0 w-full -top-[15%] h-[130%]"
          >
            <img
              src={ev.image}
              alt={ev.title}
              className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-[filter] duration-700"
            />

            <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>
        </div>

        {/* Elegant thin frame inside the card overlay */}
        <div className="absolute inset-4 border border-[#F4F1EA]/30 pointer-events-none z-10"></div>

        {/* The Rotating Round Brand Badge overlay */}
        <div
          className={`absolute -top-6 ${
            index % 2 !== 0 ? "-left-3 md:-left-10" : "-right-3 md:-right-10"
          } z-20 w-28 h-28 md:w-36 md:h-36 bg-[#3E2723] rounded-full flex items-center justify-center shadow-2xl`}
        >
          <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
            <svg viewBox="0 0 150 150" className="w-full h-full">
              <path
                id={`textPath-${index}`}
                d="M 75, 75 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                fill="transparent"
              />
              <text
                fontSize="10.8"
                className="font-bold fill-[#F4F1EA] uppercase tracking-[0.16em]"
              >
                <textPath href={`#textPath-${index}`} startOffset="0%">
                  CAFE BEATZ SALON • EXQUISITE LIVE EVENTS •
                </textPath>
              </text>
            </svg>
          </div>
          <div className="relative z-10 w-12 h-12 md:w-28 md:h-28 bg-[#3E2723] rounded-full flex items-center justify-center border-4 border-[#3E2723]">
            <Image
              src="/assets/logo/CB_Logo_noClaim.svg"
              alt="Cafe Beatz Logo"
              width={56}
              height={56}
              className="w-18 h-18 md:w-20 md:h-20 invert"
            />
          </div>
        </div>
      </div>

      {/* Event details column */}
      <div className="w-full md:w-1/2 flex flex-col justify-center text-[#3E2723]">
        <span className="text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase text-[#C5A880] mb-2">
          {ev.category} soiree
        </span>

        <h3 className="text-2xl md:text-3xl font-medium mb-1 tracking-wide">
          {ev.title}
        </h3>
        <p className="text-base md:text-lg italic text-[#5D4037] mb-6 font-serif opacity-85">
          {ev.subtitle}
        </p>

        <p className="mb-8 opacity-90 leading-relaxed font-sans tracking-wide text-sm md:text-base">
          {ev.description}
        </p>

        {/* Dynamic Schedule info rows */}
        <div className="mb-8 w-full">
          <div className="border-b border-[#3E2723]/20 pb-3 mb-3">
            <h4 className="uppercase tracking-widest text-[11px] md:text-sm font-bold text-[#5D4037]">
              {scheduleTitle}
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs md:text-sm opacity-90">
            <li className="flex justify-between border-b border-[#3E2723]/10 pb-1.5">
              <span className="font-semibold pr-4">{scheduleDate}</span>
              <span className="text-right">{ev.date}</span>
            </li>
            <li className="flex justify-between border-b border-[#3E2723]/10 pb-1.5">
              <span className="font-semibold pr-4">{scheduleDoor}</span>
              <span className="text-right">{ev.time}</span>
            </li>
            <li className="flex justify-between border-b border-[#3E2723]/10 pb-1.5">
              <span className="font-semibold pr-4">{scheduleVenue}</span>
              <span className="text-right">{ev.location}</span>
            </li>
          </ul>
        </div>

        {/* Buttons section (Using custom liquid fill Button) */}
        <div className="flex flex-wrap items-center gap-6 mt-2">
          <Button
            onClick={() => onRsvp(ev)}
            className="border border-[#3E2723]"
          >
            {enquiryText}
          </Button>

          <a
            href="mailto:events@cafebeatz.com?subject=Event Catering Inquiry"
            className="relative inline-flex items-center justify-center px-4 py-3 text-[#3E2723] font-medium tracking-widest uppercase text-xs md:text-sm group transition-colors duration-300 hover:text-[#5D4037]"
          >
            <span className="relative z-10">{inquireText}</span>
            <span className="absolute bottom-[8px] left-4 right-4 h-[1px] bg-[#5D4037] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[cubic-bezier(0.77,0,0.175,1)]"></span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
