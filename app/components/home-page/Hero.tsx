"use client";

import { useEffect, useState } from "react";
import Button from "../Button";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Hero() {
  const { activeLang } = useLanguage();

  const [offsetY, setOffsetY] = useState(0);
  const [banner, setBanner] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/home-banner`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setBanner(data.data);
    //   })
    //   .catch((err) => console.error("Banner API Error:", err));

    fetch(`/api/home-banner`)
      .then((res) => res.json())
      .then((data) => {
        setBanner(data.data);
      })
      .catch((err) => console.error("Banner API Error:", err));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!banner) {
    return (
      <section className="relative w-full h-[400px] md:h-[80vh] flex items-center justify-center">
        Loading...
      </section>
    );
  }

  const title = activeLang === "DE" ? banner.title_de : banner.title_en;

  const subtitle =
    activeLang === "DE" ? banner.subtitle_de : banner.subtitle_en;

  const reservation = activeLang === "DE" ? "Tischreservierung" : "Reservation";

  return (
    <section className="relative w-full h-[400px] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-x-0 -top-[15%] h-[130%] z-0 will-change-transform"
        style={{ transform: `translateY(${offsetY * 0.4}px)` }}
      >
        <img
          src={banner.image_url}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 mt-16">
        <h1 className="font-script text-[#F4F1EA] text-6xl md:text-8xl mb-6 drop-shadow-lg">
          {title}
        </h1>

        <p className="text-[#D7CCC8] text-sm md:text-base tracking-[0.3em] uppercase mb-10">
          {subtitle}
        </p>
        <Button href="/reservation">{reservation}</Button>
      </div>
    </section>
  );
}
