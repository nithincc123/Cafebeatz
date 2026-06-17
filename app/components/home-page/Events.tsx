"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import Button from "../Button";

export default function Events() {
  const { activeLang } = useLanguage();

  const [eventData, setEventData] = useState<any>(null);

  // Fixed: Use page scroll instead of target ref
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 3000], [80, -80]);
  const y2 = useTransform(scrollY, [0, 3000], [-40, 40]);
  const y3 = useTransform(scrollY, [0, 3000], [30, -30]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/home-event`)
      .then((res) => res.json())
      .then((data) => {
        setEventData(data.data);
      })
      .catch((err) => console.error("Event API Error:", err));
  }, []);

  if (!eventData) {
    return (
      <section className="py-32 text-center bg-[#F4F1EA]">Loading...</section>
    );
  }

  const cmsTitle =
    activeLang === "DE" ? eventData.cms_title_de : eventData.cms_title_en;

  const title = activeLang === "DE" ? eventData.title_de : eventData.title_en;

  const content =
    activeLang === "DE" ? eventData.content_de : eventData.content_en;

  const buttonText1 =
    activeLang === "DE" ? "Atmosphäre erleben" : "Experience the Vibe";

  const buttonText2 = activeLang === "DE" ? "Auskunft" : "Enquiry";

  return (
    <section
      id="events"
      className="relative w-full py-4 px-6 md:px-[80px] text-[#3E2723]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-center">
        {/* LEFT COLUMN */}
        <div className="flex flex-col items-start z-20">
          <div className="w-16 h-[1px] bg-[#3E2723] mb-6"></div>

          <h2 className="text-4xl md:text-5xl font-medium tracking-wide mb-8">
            {cmsTitle}
          </h2>

          <h3 className="text-2xl font-medium text-[#5D4037] mb-6 leading-tight">
            {title}
          </h3>

          <p className="text-sm md:text-base leading-relaxed opacity-90 mb-12">
            {content}
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="/events" className="border border-[#3E2723]">
              {buttonText1}
            </Button>

            <Button href="/events" className="border border-[#3E2723]">
              {buttonText2}
            </Button>
          </div>
        </div>

        {/* DESKTOP IMAGE COLLAGE */}
        <div className="relative h-[600px] w-full hidden md:block">
          {/* IMAGE 1 */}
          <motion.div
            style={{ y: y1 }}
            className="absolute top-0 right-0 w-[55%] h-[320px] z-10 p-3 bg-[#F4F1EA] shadow-xl rotate-2"
          >
            <div className="relative w-full h-full border border-[#3E2723]/10 overflow-hidden">
              <img
                src={eventData.image_url1}
                alt={title}
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </motion.div>

          {/* IMAGE 2 */}
          <motion.div
            style={{ y: y2 }}
            className="absolute top-[180px] left-0 w-[50%] h-[280px] z-20 p-3 bg-[#F4F1EA] shadow-2xl -rotate-3"
          >
            <div className="relative w-full h-full border border-[#3E2723]/10 overflow-hidden">
              <img
                src={eventData.image_url2}
                alt={title}
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </motion.div>

          {/* IMAGE 3 */}
          <motion.div
            style={{ y: y3 }}
            className="absolute bottom-0 right-[10%] w-[60%] h-[250px] z-30 p-3 bg-[#F4F1EA] shadow-xl rotate-1"
          >
            <div className="relative w-full h-full border border-[#3E2723]/10 overflow-hidden">
              <img
                src={eventData.image_url3}
                alt={title}
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </motion.div>
        </div>

        {/* MOBILE IMAGE STACK */}
        <div className="md:hidden flex flex-col gap-8 mt-8">
          <div className="relative w-full h-64 p-2 bg-[#F4F1EA] shadow-lg rotate-1">
            <div className="relative w-full h-full border border-[#3E2723]/10 overflow-hidden">
              <img
                src={eventData.image_url1}
                alt={title}
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </div>

          <div className="relative w-[90%] self-end h-56 p-2 bg-[#F4F1EA] shadow-lg -rotate-2 -mt-12 z-10">
            <div className="relative w-full h-full border border-[#3E2723]/10 overflow-hidden">
              <img
                src={eventData.image_url2}
                alt={title}
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </div>

          <div className="relative w-[95%] h-60 p-2 bg-[#F4F1EA] shadow-lg rotate-1 -mt-12 z-20">
            <div className="relative w-full h-full border border-[#3E2723]/10 overflow-hidden">
              <img
                src={eventData.image_url3}
                alt={title}
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
