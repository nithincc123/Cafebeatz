"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../Button"; // Your liquid-fill button
import { useLanguage } from "@/app/context/LanguageContext";

export default function Locations() {
  const { activeLang } = useLanguage();

  const sectionTitle =
    activeLang === "DE" ? "Standorte & Öffnungszeiten" : "Locations & Hours";

  const operatingHoursTitle =
    activeLang === "DE" ? "Öffnungszeiten" : "Operating Hours";

  const bookTable = activeLang === "DE" ? "Tischreservierung" : "Book a Table";

  const viewMenu = activeLang === "DE" ? "Speisekarte ansehen" : "View Menu";

  const locationsData = [
    {
      id: "location-1",
      name:
        activeLang === "DE" ? "Das Große Kaffeehaus" : "The Grand Coffeehouse",

      address: "Schiffbauerdamm 10, 10117 Berlin",
      phone: "030 / 810 10 858",
      email: "hello@cafebeatz.com",
      image: "/assets/clint-images/Location 1 option 1.png",
      menuLink: "#menu",
      reservationLink: "/reservation",

      hours: [
        {
          label: activeLang === "DE" ? "Öffnungszeiten" : "Opening Hours",
          time: "9:00 am - 6:00 pm",
        },
        {
          label: activeLang === "DE" ? "Küchenzeiten" : "Kitchen Hours",
          time: "9:00 am - 6:00 pm",
        },
      ],
    },

    {
      id: "evening-theme",

      name: activeLang === "DE" ? "Abendstimmung" : "Evening Theme",

      description:
        activeLang === "DE"
          ? "Die Atmosphäre im Café Beatz verändert sich mit dem Licht, den Jahreszeiten und der Tageszeit – und bietet vom Morgenkaffee bis zu den Abendgesprächen ein besonderes Erlebnis."
          : "The atmosphere at Café Beatz changes with the light, the seasons, and the time of day — offering a different experience from morning coffee to evening conversations.",

      image: "/assets/clint-images/evening-image.jpeg",
      menuLink: "#menu-evening",
      reservationLink: "/reservation",

      hours: [
        {
          label: activeLang === "DE" ? "Betriebszeiten" : "Operating Hours",
          time: activeLang === "DE" ? "Demnächst verfügbar" : "Stay Tuned",
        },
        {
          label: activeLang === "DE" ? "Küchenzeiten" : "Kitchen Hours",
          time: activeLang === "DE" ? "Demnächst verfügbar" : "Stay Tuned",
        },
      ],
    },
  ];

  function LocationCard({ location, index }: { location: any; index: number }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`flex flex-col ${index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-24 items-center relative z-10`}
      >
        <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
          <div className="absolute inset-0 overflow-hidden rounded-sm">
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-x-0 -top-[15%] h-[130%]"
            >
              <Image
                src={location.image}
                alt={location.name}
                fill
                className="object-contain shadow-2xl"
              />
            </motion.div>
          </div>

          <div className="absolute inset-4 border border-[#F4F1EA]/50 pointer-events-none z-10"></div>

          <div
            className={`absolute -top-6 ${index % 2 !== 0 ? "-left-6 md:-left-10" : "-right-6 md:-right-10"} z-20 w-32 h-32 md:w-40 md:h-40 bg-[#3E2723] rounded-full flex items-center justify-center shadow-2xl`}
          >
            <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
              <svg viewBox="0 0 150 150" className="w-full h-full">
                <path
                  id={`textPath-${index}`}
                  d="M 75, 75 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
                  fill="transparent"
                />
                <text
                  fontSize="11.5"
                  className="font-bold fill-[#F4F1EA] uppercase tracking-widest"
                >
                  <textPath href={`#textPath-${index}`} startOffset="0%">
                    DAILY FRESH FOOD & COFFEE • BREAKFAST, LUNCH & MORE •
                  </textPath>
                </text>
              </svg>
            </div>
            <div className="relative z-10 w-16 h-16 md:w-32 md:h-32 bg-[#3E2723] rounded-full flex items-center justify-center border-4 border-[#3E2723]">
              <Image
                src="/assets/logo/CB_Logo_noClaim.svg"
                alt="Cafe Beatz Logo"
                width={56}
                height={56}
                className="w-18 h-18 md:w-24 md:h-24 invert"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center text-[#3E2723]">
          <h3 className="text-3xl font-medium mb-6 tracking-wide">
            {location.name}
          </h3>

          {location.description ? (
            <p className="mb-10 opacity-90 leading-relaxed font-sans tracking-wide">
              {location.description}
            </p>
          ) : (
            <div className="mb-10 opacity-90 leading-relaxed font-sans tracking-wide">
              <p>{location.address}</p>
              <p className="mt-2">Tel: {location.phone}</p>
              <p>Mail: {location.email}</p>
            </div>
          )}

          <div className="mb-10 w-full max-w-md">
            <div className="border-b border-[#3E2723]/20 pb-4 mb-4">
              <h4 className="uppercase tracking-widest text-sm font-bold text-[#5D4037]">
                {operatingHoursTitle}
              </h4>
            </div>
            <ul className="space-y-3 text-sm md:text-base opacity-90">
              {location.hours.map((hourObj: any, i: number) => (
                <li
                  key={i}
                  className="flex justify-between border-b border-[#3E2723]/10 pb-2"
                >
                  <span className="font-medium pr-4">{hourObj.label}</span>
                  <span className="text-right">{hourObj.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* UX Hierarchy: Secondary & Tertiary Buttons */}
          <div className="flex flex-wrap items-center gap-6 mt-4">
            {/* Secondary Action: Liquid Fill (High weight) */}
            <Button
              href={location.reservationLink}
              className="border border-[#3E2723]"
            >
              {bookTable}
            </Button>

            {/* Tertiary Action: Clean text with sweeping underline (Low weight) */}
            <a
              href={location.menuLink}
              className="relative inline-flex items-center justify-center px-6 py-4 text-[#3E2723] font-medium tracking-widest uppercase text-sm group transition-colors duration-300 hover:text-[#5D4037]"
            >
              <span className="relative z-10">{viewMenu}</span>
              {/* The underline starts scaled to 0 on the X axis, and sweeps to 100% on hover */}
              <span className="absolute bottom-[10px] left-6 right-6 h-[1px] bg-[#5D4037] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[cubic-bezier(0.77,0,0.175,1)]"></span>
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <section
      id="locations"
      className="relative w-full pb-32 px-6 md:px-[80px] text-[#3E2723] overflow-hidden pt-24"
    >
      {/* The Bulletproof Animated Wave Line */}
      <motion.div
        className="absolute top-10 left-0 w-full h-[30px] opacity-20 pointer-events-none z-0"
        style={{
          // Pure SVG data URI. Tiles perfectly, never distorts.
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='40' viewBox='0 0 200 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q 50 40, 100 20 T 200 20' fill='none' stroke='%233E2723' stroke-width='3'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "200px 40px",
        }}
        animate={{ backgroundPositionX: ["0px", "-200px"] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />

      {/* Expanded Background SVGs */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[5%] opacity-5 w-32 h-32 pointer-events-none z-0"
      >
        {/* Coffee Bean */}
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 19.93C11 19.93 10.5 15.5 13 12C15.5 8.5 13 4.07 13 4.07C13 4.07 13.5 8.5 11 12C8.5 15.5 11 19.93 11 19.93Z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[8%] opacity-5 w-40 h-40 pointer-events-none z-0"
      >
        {/* Croissant */}
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.58,13.15C21.08,13.6 19.5,14 19.5,14C19.5,14 18.25,18.76 13,20.5C13,20.5 13,22 12,22C11,22 11,20.5 11,20.5C5.75,18.76 4.5,14 4.5,14C4.5,14 2.92,13.6 2.42,13.15C2.1,12.86 2.15,12.35 2.5,12.11C3.47,11.45 4,10 4,10C4,10 5,6 9,5.5C9,5.5 10,2 12,2C14,2 15,5.5 15,5.5C19,6 20,10 20,10C20,10 20.53,11.45 21.5,12.11C21.85,12.35 21.9,12.86 21.58,13.15Z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[25%] left-[8%] opacity-5 w-36 h-36 pointer-events-none z-0"
      >
        {/* Botanical Leaf */}
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 7,11.5 7,11.5C7,11.5 10.9,10 17,8Z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ y: [0, 25, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[5%] right-[15%] opacity-5 w-48 h-48 pointer-events-none z-0"
      >
        {/* Coffee Cup */}
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 3H4V13C4 15.21 5.79 17 8 17H14C16.21 17 18 15.21 18 13V10H20C21.1 10 22 9.1 22 8V5C22 3.9 21.1 3 20 3ZM20 8H18V5H20V8ZM4 19H20V21H4V19Z" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 pt-16">
        <div className="text-center mb-24">
          <div className="w-16 h-[1px] bg-[#3E2723] mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-wide">
            {sectionTitle}
          </h2>
        </div>

        <div className="space-y-32">
          {locationsData.map((location, index) => (
            <LocationCard key={location.id} location={location} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
