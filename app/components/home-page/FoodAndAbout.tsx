"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

export default function FoodAndAbout() {
  const { activeLang } = useLanguage();

  const [welcome, setWelcome] = useState<any>(null);

  // Use page scroll instead of target ref
  const { scrollY } = useScroll();

  const flyUpFast = useTransform(scrollY, [0, 2000], [600, -600]);
  const flyUpMedium = useTransform(scrollY, [0, 2000], [400, -400]);
  const flyUpSlow = useTransform(scrollY, [0, 2000], [300, -300]);

  useEffect(() => {
    fetch(`/api/home-welcome`)
      .then((res) => res.json())
      .then((data) => {
        setWelcome(data.data);
      })
      .catch((err) => console.error("Welcome API Error:", err));
  }, []);

  if (!welcome) {
    return (
      <section className="min-h-[500px] bg-[#F4F1EA] flex items-center justify-center">
        Loading...
      </section>
    );
  }

  const cmsTitle =
    activeLang === "DE" ? welcome.cms_title_de : welcome.cms_title_en;

  const title = activeLang === "DE" ? welcome.title_de : welcome.title_en;

  const content = activeLang === "DE" ? welcome.content_de : welcome.content_en;

  return (
    <section className="relative w-full py-4 pb-16 md:py-10 md:pb-24 px-4 md:px-8 bg-[#F4F1EA] text-[#3E2723]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 relative">
        {/* LEFT COLUMN */}
        <div className="hidden md:block md:col-span-3 pt-64 relative z-10">
          <motion.div
            style={{ y: flyUpFast }}
            className="relative w-full h-[350px]"
          >
            <img
              src={welcome.image_url1}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* CENTER COLUMN */}
        <div className="col-span-1 md:col-span-6 flex flex-col items-center z-20">
          <div className="text-center mb-16 bg-[#F4F1EA]/80 backdrop-blur-sm p-4 rounded-lg">
            <div className="w-16 h-[1px] bg-[#3E2723] mx-auto mb-6"></div>

            <h2 className="text-4xl md:text-5xl font-medium tracking-wide leading-snug">
              {cmsTitle}
            </h2>
          </div>

          <motion.div
            style={{ y: flyUpSlow }}
            className="relative w-full h-[400px] md:h-[400px] mb-24"
          >
            <img
              src={welcome.image_url2}
              alt="Cafe Beatz Food Spread"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          <div className="max-w-md w-full text-left self-start md:ml-8 pl-8">
            <h3 className="text-3xl font-medium text-[#5D4037] mb-6 leading-tight">
              {title}
            </h3>

            <div
              className="text-sm md:text-base leading-relaxed opacity-90 mb-8 font-medium"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="hidden md:block md:col-span-3 relative z-10">
          <motion.div
            style={{ y: flyUpMedium }}
            className="absolute top-0 right-0 w-[80%] h-[250px]"
          >
            <img
              src={welcome.image_url3}
              alt="Cafe Window View"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: flyUpFast }}
            className="absolute top-[700px] right-0 w-[90%] h-[350px]"
          >
            <img
              src={welcome.image_url4}
              alt="Antique Espresso Machine"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
