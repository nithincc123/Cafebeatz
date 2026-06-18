"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CafeEvent } from "../components/events-page/types";
import EventCard from "../components/events-page/EventCard";
import CalendarFilter from "../components/events-page/CalendarFilter";
import RsvpModal from "../components/events-page/RsvpModal";
import { useLanguage } from "@/app/context/LanguageContext";

const ITEMS_PER_PAGE = 3;

export default function EventsPage() {
  const { activeLang } = useLanguage();

  const [heroImage, setHeroImage] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");

  const [events, setEvents] = useState<CafeEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "all",
    ...Array.from(
      new Set(
        events
          .map((e) =>
            activeLang === "DE"
              ? (e.category_de ?? "").toLowerCase()
              : (e.category_en ?? "").toLowerCase(),
          )
          .filter(Boolean),
      ),
    ),
  ];

  const [filter, setFilter] = useState<string>("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [activeEvent, setActiveEvent] = useState<CafeEvent | null>(null);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  // Parallax Hero state
  const [offsetY, setOffsetY] = useState(0);

  // Date Filter state
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, bannerRes] = await Promise.all([
          fetch(`/api/events`),
          fetch(`/api/event-banner`),
        ]);

        const eventsData = await eventsRes.json();
        const bannerData = await bannerRes.json();

        // Events
        if (eventsData.success) {
          setEvents(eventsData.data);
        }

        // Banner
        if (bannerData.success) {
          const banner = Array.isArray(bannerData.data)
            ? bannerData.data[0]
            : bannerData.data;

          setHeroImage(
            banner?.image_url || "/assets/clint-images/Cover photo.png",
          );

          setHeroTitle(
            activeLang === "DE"
              ? banner?.title_de || banner?.title_en || ""
              : banner?.title_en || banner?.title_de || "",
          );

          setHeroSubtitle(
            activeLang === "DE"
              ? banner?.subtitle_de || banner?.subtitle_en || ""
              : banner?.subtitle_en || banner?.subtitle_de || "",
          );
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeLang]);

  // Handle parallax scroll for hero
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredEvents = events.filter((ev) => {
    const matchesCategory =
      filter === "all" ||
      (activeLang === "DE"
        ? (ev.category_de ?? "").toLowerCase()
        : (ev.category_en ?? "").toLowerCase()) === filter;

    const matchesDate =
      !selectedDateFilter || ev.event_date === selectedDateFilter;

    return matchesCategory && matchesDate;
  });

  const salonLabel =
    activeLang === "DE" ? "kultureller salon" : "cultural salon";

  const scheduleTitle =
    activeLang === "DE" ? "Bevorstehender Zeitplan" : "Upcoming Schedule";

  const noEventsText =
    activeLang === "DE"
      ? "Keine Veranstaltungen für diese Auswahl geplant."
      : "No events currently scheduled on this selection.";

  const displayEvents = filteredEvents.map((event) => ({
    id: event.id,

    title:
      activeLang === "DE"
        ? event.title_de || event.title_en || "Untitled Event"
        : event.title_en || event.title_de || "Untitled Event",

    subtitle:
      activeLang === "DE"
        ? event.subtitle_de || event.subtitle_en || ""
        : event.subtitle_en || event.subtitle_de || "",

    date: event.event_date ?? "",

    time: event.door_hours ?? "",

    location: event.salon_venue ?? "",

    description:
      activeLang === "DE" ? (event.content_de ?? "") : (event.content_en ?? ""),

    image: event.image_url,

    category:
      activeLang === "DE"
        ? (event.category_de ?? "")
        : (event.category_en ?? ""),

    frameType:
      activeLang === "DE"
        ? (event.frametype_de ?? "walnut")
        : (event.frametype_en ?? "walnut"),

    price: "€25",
  }));

  // Reset page when filter/date changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, selectedDateFilter]);

  // Calculate pagination

  const totalPages = Math.ceil(displayEvents.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEvents = displayEvents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const resetFiltersText =
    activeLang === "DE" ? "Alle Filter zurücksetzen" : "Reset All Filters";

  const previousText = activeLang === "DE" ? "Zurück" : "Previous";

  const nextText = activeLang === "DE" ? "Weiter" : "Next";

  const openRsvp = (ev: CafeEvent) => {
    setActiveEvent(ev);
    setIsRsvpOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F4F1EA] text-[#3E2723] flex flex-col justify-between overflow-x-hidden">
      {/* 1. Hero Banner: Reused from Home Page layout */}
      <section className="relative w-full h-[350px] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-x-0 -top-[15%] h-[130%] z-0 will-change-transform"
          style={{ transform: `translateY(${offsetY * 0.4}px)` }}
        >
          <Image
            src="/assets/clint-images/Cover photo.png"
            alt="Antique 1920s Cafe Interior"
            fill
            priority
            className="object-cover object-center !w-full !h-full"
          />

          <div className="absolute inset-0 bg-black/65"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 mt-8">
          <h1 className="font-script text-[#F4F1EA] text-5xl md:text-7xl mb-4 drop-shadow-lg">
            {heroTitle}
          </h1>
          <p className="text-[#D7CCC8] text-xs md:text-sm tracking-[0.3em] uppercase max-w-lg leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto w-full px-4 md:px-8 py-12 md:py-24 flex-grow">
        {/* Category Filter, Calendar Icon, and Meta info */}
        <div className="mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#3E2723]/10 pb-6">
          <div className="text-center sm:text-left flex flex-col sm:flex-row sm:items-end gap-3.5">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold opacity-60">
                {salonLabel}
              </span>
              <h2 className="text-2xl md:text-3xl font-medium tracking-wide mt-1 font-sans">
                {scheduleTitle}
              </h2>
            </div>
            {/* Active Date Filter indicator */}
            {selectedDateFilter && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setSelectedDateFilter(null)}
                className="self-center sm:self-auto sm:mb-1.5 px-3 py-1 bg-[#C5A880]/15 border border-[#C5A880]/30 rounded-full text-[10px] md:text-xs font-bold text-[#3E2723] hover:bg-[#C5A880]/30 transition-colors flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              >
                <span>Date: {selectedDateFilter.split(",")[0]}</span>
                <span className="opacity-60 text-xs">×</span>
              </motion.button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 text-xs md:text-sm font-medium uppercase tracking-widest justify-center items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setSelectedDateFilter(null);
                }}
                className={`px-4 py-2 border rounded-full transition-all cursor-pointer ${
                  filter === cat && !selectedDateFilter
                    ? "bg-[#3E2723] text-[#F4F1EA] border-[#3E2723]"
                    : "border-[#3E2723]/20 hover:border-[#3E2723] opacity-70 hover:opacity-100"
                }`}
              >
                {cat === "all" ? (activeLang === "DE" ? "Alle" : "All") : cat}
              </button>
            ))}

            {/* Custom Interactive Calendar Filter Dropdown component */}
            <CalendarFilter
              selectedDateFilter={selectedDateFilter}
              onSelectDate={(dateStr) => {
                setSelectedDateFilter(dateStr);
                if (dateStr) {
                  setFilter("all"); // Reset category filter to prevent conflicts
                }
              }}
              eventsData={displayEvents}
            />
          </div>
        </div>

        {/* Listing layout */}
        {paginatedEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#FAF8F5]/50 border border-dashed border-[#3E2723]/10 p-8">
            <p className="opacity-60 text-lg italic">{noEventsText}</p>
            <div className="mt-4 flex gap-4 justify-center">
              <button
                onClick={() => {
                  setFilter("all");
                  setSelectedDateFilter(null);
                }}
                className="text-xs font-bold uppercase tracking-wider underline cursor-pointer hover:text-[#5D4037]"
              >
                {resetFiltersText}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-32 mb-16">
            {paginatedEvents.map((ev, index) => (
              <EventCard key={ev.id} ev={ev} index={index} onRsvp={openRsvp} />
            ))}
          </div>
        )}

        {/* Elegant Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 border-t border-[#3E2723]/10 pt-10 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-[#3E2723]/15 text-[10px] md:text-sm font-bold uppercase tracking-wider hover:bg-[#3E2723] hover:text-[#F4F1EA] transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#3E2723] cursor-pointer"
            >
              {previousText}
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-full border text-xs md:text-sm font-semibold flex items-center justify-center transition-all cursor-pointer ${
                      currentPage === page
                        ? "bg-[#3E2723] text-[#F4F1EA] border-[#3E2723]"
                        : "border-[#3E2723]/15 hover:border-[#3E2723] opacity-75"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-[#3E2723]/15 text-[10px] md:text-sm font-bold uppercase tracking-wider hover:bg-[#3E2723] hover:text-[#F4F1EA] transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#3E2723] cursor-pointer"
            >
              {previousText}
            </button>
          </div>
        )}
      </main>

      {/* RSVP Modal Overlay */}
      <RsvpModal
        isOpen={isRsvpOpen}
        activeEvent={activeEvent}
        onClose={() => setIsRsvpOpen(false)}
      />
    </div>
  );
}
