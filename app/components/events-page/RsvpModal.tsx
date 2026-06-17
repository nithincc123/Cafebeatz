"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CafeEvent } from "./types";

interface RsvpModalProps {
  isOpen: boolean;
  activeEvent: CafeEvent | null;
  onClose: () => void;
}

export default function RsvpModal({
  isOpen,
  activeEvent,
  onClose,
}: RsvpModalProps) {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketCode, setTicketCode] = useState("");
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsGuestDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate a randomized vintage ticket reference code on success
  useEffect(() => {
    if (isSuccess) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      setTicketCode(`CB-${randomNum}`);
    }
  }, [isSuccess]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    onClose();
    // Delay clearing states to allow transition out animation
    setTimeout(() => {
      setIsSuccess(false);
      setGuestName("");
      setGuestEmail("");
      setGuestCount(2);
      setSpecialRequests("");
      setTicketCode("");
      setIsGuestDropdownOpen(false);
    }, 300);
  };

  if (!activeEvent) return null;

  // Dynamic Price calculation
  const basePrice = parseInt(activeEvent.price.replace(/[^0-9]/g, ""), 10) || 0;
  const calculatedTotal = basePrice * guestCount;
  const formattedTotal = `€${calculatedTotal}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto px-4 py-8 flex items-start justify-center md:items-center">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
            className="fixed inset-0 bg-black/65 backdrop-blur-[4px]"
          />

          {/* Modal Content Box (Split Layout) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#3E2723]/15 p-1.5 z-10 text-[#3E2723] rounded-sm overflow-hidden"
            style={{
              boxShadow: "16px 16px 0px rgba(62, 39, 35, 0.12)",
            }}
          >
            <div className="flex flex-col md:flex-row min-h-[550px]">
              {/* Left Column: Full-height Cover Art & Metadata Overlay */}
              <div className="relative w-full md:w-[42%] min-h-[280px] md:min-h-auto md:h-auto overflow-hidden flex flex-col justify-end p-6 md:p-8 text-[#FAF8F5]">
                <Image
                  src={activeEvent.image}
                  alt={activeEvent.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover !w-full !h-full"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 z-10" />

                {/* Left Panel Metadata */}
                <div className="relative z-20">
                  <span className="text-[9.5px] md:text-[11px] tracking-[0.35em] uppercase font-bold text-[#C5A880] block mb-1.5">
                    {activeEvent.category} salon
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-medium tracking-wide leading-tight mb-2">
                    {activeEvent.title}
                  </h3>
                  <p className="text-xs md:text-sm italic opacity-85 font-serif text-[#D7CCC8] mb-5 border-b border-[#FAF8F5]/10 pb-3">
                    {activeEvent.subtitle}
                  </p>

                  <ul className="space-y-2.5 text-xs md:text-sm tracking-wide font-sans">
                    <li className="flex items-center gap-3">
                      <span className="text-[#C5A880] font-bold uppercase tracking-widest text-[9.5px] md:text-[10px] w-14 shrink-0">
                        Date:
                      </span>
                      <span className="text-[#FAF8F5] font-medium">
                        {activeEvent.date}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#C5A880] font-bold uppercase tracking-widest text-[9.5px] md:text-[10px] w-14 shrink-0">
                        Time:
                      </span>
                      <span className="text-[#FAF8F5] font-medium">
                        {activeEvent.time}
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-[#C5A880] font-bold uppercase tracking-widest text-[9.5px] md:text-[10px] w-14 shrink-0">
                        Venue:
                      </span>
                      <span className="text-[#FAF8F5] font-medium truncate">
                        {activeEvent.location}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column: Reservation Form or Stamped Ticket Stub */}
              <div className="w-full md:w-[58%] p-4 md:p-6 flex flex-col justify-center bg-[#FAF8F5] relative">
                <div className="border border-[#C5A880]/30 p-5 md:p-6 h-full flex flex-col justify-center relative">
                  {/* Close Button */}
                  <button
                    onClick={resetForm}
                    className="absolute top-4 right-4 w-7 h-7 rounded-full border border-[#3E2723]/10 flex items-center justify-center hover:bg-[#3E2723] hover:text-[#FAF8F5] transition-all cursor-pointer z-20"
                    aria-label="Close modal"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <AnimatePresence mode="wait">
                    {!isSuccess ? (
                      <motion.form
                        key="rsvp-form"
                        onSubmit={handleFormSubmit}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="text-center mb-4">
                          <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase opacity-55 font-bold block text-[#C5A880]">
                            reservation request
                          </span>
                          <h4 className="text-xl md:text-2xl font-normal font-sans mt-0.5 text-[#3E2723]">
                            Ticket Placement
                          </h4>

                          {/* Decorative Flourish */}
                          <div className="flex items-center justify-center gap-2.5 my-2 opacity-50">
                            <span className="h-[0.5px] w-6 bg-[#C5A880]"></span>
                            <span className="text-[8px] text-[#C5A880]">◆</span>
                            <span className="h-[0.5px] w-6 bg-[#C5A880]"></span>
                          </div>
                        </div>

                        {/* Form Inputs (Arranged for clean UX & readable text contrast) */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[9.5px] md:text-[10.5px] uppercase tracking-[0.2em] font-bold mb-1.5 text-[#3E2723]">
                              Full Name
                            </label>
                            <input
                              type="text"
                              required
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              placeholder="e.g., LORD / LADY CHESTERFIELD"
                              className="w-full bg-white border border-[#3E2723]/20 px-3.5 py-2.5 focus:outline-none focus:border-[#3E2723] focus:ring-0 transition-all duration-300 placeholder:text-stone-300 uppercase tracking-widest font-medium rounded-none hover:border-[#3E2723]/45 text-[#3E2723] text-xs md:text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-[9.5px] md:text-[10.5px] uppercase tracking-[0.2em] font-bold mb-1.5 text-[#3E2723]">
                              Email Address
                            </label>
                            <input
                              type="email"
                              required
                              value={guestEmail}
                              onChange={(e) => setGuestEmail(e.target.value)}
                              placeholder="e.g., chesterfield@beatz.com"
                              className="w-full bg-white border border-[#3E2723]/20 px-3.5 py-2.5 focus:outline-none focus:border-[#3E2723] focus:ring-0 transition-all duration-300 placeholder:text-stone-300 tracking-wide rounded-none hover:border-[#3E2723]/45 text-[#3E2723] text-xs md:text-sm"
                            />
                          </div>

                          {/* Custom Styled Dropdown for Guest Count */}
                          <div ref={dropdownRef} className="relative">
                            <label className="block text-[9.5px] md:text-[10.5px] uppercase tracking-[0.2em] font-bold mb-1.5 text-[#3E2723]">
                              Guest Count
                            </label>
                            <button
                              type="button"
                              onClick={() =>
                                setIsGuestDropdownOpen(!isGuestDropdownOpen)
                              }
                              className="w-full bg-white border border-[#3E2723]/20 px-3.5 py-2.5 text-left text-xs md:text-sm font-semibold flex items-center justify-between hover:border-[#3E2723]/45 transition-colors cursor-pointer text-[#3E2723] rounded-none"
                            >
                              <span>
                                {guestCount}{" "}
                                {guestCount === 1 ? "Guest" : "Guests"}
                              </span>
                              <svg
                                className={`w-4 h-4 text-[#3E2723]/60 transition-transform duration-200 ${
                                  isGuestDropdownOpen ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.8"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>

                            <AnimatePresence>
                              {isGuestDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute left-0 right-0 mt-1 z-30 bg-white border border-[#3E2723]/20 shadow-xl max-h-48 overflow-y-auto rounded-none"
                                >
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <button
                                      key={num}
                                      type="button"
                                      onClick={() => {
                                        setGuestCount(num);
                                        setIsGuestDropdownOpen(false);
                                      }}
                                      className={`w-full text-left px-4 py-2.5 text-xs md:text-sm transition-colors hover:bg-[#F4F1EA] cursor-pointer text-[#3E2723] ${
                                        guestCount === num
                                          ? "bg-[#C5A880]/15 font-bold"
                                          : ""
                                      }`}
                                    >
                                      {num} {num === 1 ? "Guest" : "Guests"}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div>
                            <label className="block text-[9.5px] md:text-[10.5px] uppercase tracking-[0.2em] font-bold mb-1.5 text-[#3E2723]">
                              Special Requests / Dietary
                            </label>
                            <textarea
                              rows={2}
                              value={specialRequests}
                              onChange={(e) =>
                                setSpecialRequests(e.target.value)
                              }
                              placeholder="e.g., Vegetarian menu, fireplace table requests, wheelchair access..."
                              className="w-full bg-white border border-[#3E2723]/20 px-3.5 py-2.5 focus:outline-none focus:border-[#3E2723] focus:ring-0 transition-all duration-300 placeholder:text-stone-300 resize-none font-sans leading-relaxed rounded-none hover:border-[#3E2723]/45 text-[#3E2723] text-xs md:text-sm"
                            />
                          </div>
                        </div>

                        {/* CTA Footer: Estimate combined next to Submit button */}
                        <div className="mt-8 pt-5 border-t border-[#3E2723]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
                          {/* Dynamic calculated total estimation */}
                          <div className="flex flex-col text-left">
                            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-[#3E2723]/60">
                              Estimated Total
                            </span>
                            <span className="text-lg md:text-xl font-serif font-bold text-[#3E2723] mt-0.5">
                              {formattedTotal}
                            </span>
                          </div>

                          {/* Submit controls */}
                          <div className="flex items-center gap-2.5 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={resetForm}
                              className="flex-1 sm:flex-none px-4 py-2 border border-[#3E2723]/25 text-[9.5px] font-bold uppercase tracking-widest hover:bg-[#3E2723]/5 hover:border-[#3E2723] transition-all cursor-pointer rounded-none text-center whitespace-nowrap"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#3E2723] text-[#FAF8F5] text-[9.5px] font-bold uppercase tracking-widest hover:bg-[#5D4037] transition-all disabled:opacity-50 cursor-pointer rounded-none shadow-sm text-center whitespace-nowrap"
                            >
                              {isSubmitting
                                ? "Sending..."
                                : "Submit Reservation"}
                            </button>
                          </div>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="rsvp-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-2 flex flex-col items-center justify-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 border border-[#C5A880] flex items-center justify-center mb-4 shadow-sm">
                          <svg
                            className="w-6 h-6 text-[#C5A880]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>

                        <h3 className="text-xl font-normal font-sans text-[#3E2723] mb-1">
                          Reservation Verified
                        </h3>
                        <p className="text-[11px] opacity-75 max-w-sm mb-5 leading-relaxed">
                          Your digital entry voucher has been issued. Printable
                          codes have been sent to <strong>{guestEmail}</strong>.
                        </p>

                        {/* PREMIUM VINTAGE TICKET STUB */}
                        <div className="w-full relative border-2 border-double border-[#C5A880] bg-[#FAF8F5] rounded-sm p-4 overflow-hidden shadow-lg mb-6 text-left z-10">
                          {/* Perforation Punch Hole Cutouts */}
                          <div className="absolute -left-3.5 top-[65%] -translate-y-1/2 w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#C5A880]/40 z-20" />
                          <div className="absolute -right-3.5 top-[65%] -translate-y-1/2 w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#C5A880]/40 z-20" />

                          {/* Vintage Decorative Stamp */}
                          <div className="absolute right-3 bottom-12 w-16 h-16 rounded-full border border-dashed border-[#C5A880]/25 flex items-center justify-center -rotate-12 pointer-events-none select-none">
                            <span className="text-[7px] uppercase font-bold tracking-widest text-[#C5A880]/35 text-center leading-[1.3] block">
                              CAFE BEATZ
                              <br />
                              SALON ENTRY
                            </span>
                          </div>

                          {/* Ticket Header */}
                          <div className="pb-3 border-b border-dashed border-[#C5A880]/50">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-[8px] tracking-[0.25em] font-bold text-[#C5A880] uppercase block">
                                  Official Entry Pass
                                </span>
                                <h4 className="text-sm md:text-base font-serif font-bold text-[#3E2723] mt-0.5 leading-tight">
                                  {activeEvent.title}
                                </h4>
                              </div>
                              <div className="text-right">
                                <span className="text-[8px] tracking-widest font-semibold block text-[#C5A880] uppercase">
                                  Stub ID
                                </span>
                                <span className="text-xs font-mono font-bold text-[#3E2723]">
                                  {ticketCode}
                                </span>
                              </div>
                            </div>

                            {/* Guest details */}
                            <div className="grid grid-cols-2 gap-4 mt-4 text-[11px]">
                              <div>
                                <span className="block text-[8px] tracking-wider uppercase opacity-55 mb-0.5">
                                  Attendee
                                </span>
                                <p className="font-semibold truncate text-[#3E2723]">
                                  {guestName}
                                </p>
                              </div>
                              <div>
                                <span className="block text-[8px] tracking-wider uppercase opacity-55 mb-0.5">
                                  Admit Count
                                </span>
                                <p className="font-semibold text-[#3E2723]">
                                  {guestCount}{" "}
                                  {guestCount === 1 ? "Person" : "People"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Tear-off Stub Details */}
                          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="text-left text-[10.5px] text-[#3E2723] w-full sm:w-auto">
                              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 font-sans">
                                <div>
                                  <span className="text-[7.5px] tracking-wider uppercase opacity-55 block">
                                    Salon Venue
                                  </span>
                                  <span className="font-semibold truncate block max-w-[80px]">
                                    {activeEvent.location.split(" ")[0]}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-[7.5px] tracking-wider uppercase opacity-55 block">
                                    Date
                                  </span>
                                  <span className="font-semibold truncate block max-w-[100px]">
                                    {activeEvent.date.split(",")[0]}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Barcode representation */}
                            <div className="flex flex-col items-center sm:items-end">
                              <div className="flex items-center gap-[1.5px] h-6 w-24 opacity-75">
                                {[
                                  1, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 1, 4, 1,
                                  2, 3, 1,
                                ].map((width, idx) => (
                                  <div
                                    key={idx}
                                    className="bg-[#3E2723] h-full"
                                    style={{ width: `${width}px` }}
                                  />
                                ))}
                              </div>
                              <span className="text-[7px] font-mono opacity-50 mt-0.5 uppercase tracking-[0.2em]">
                                {ticketCode}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={resetForm}
                          className="px-8 py-2.5 bg-[#3E2723] text-[#FAF8F5] text-xs font-bold uppercase tracking-widest hover:bg-[#5D4037] transition-all cursor-pointer rounded-none shadow-sm"
                        >
                          Close Window
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
