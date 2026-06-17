"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";

/* ─── Types & Constants ─── */
const timeSlots = [
  { label: "9:30 AM", range: "9:30 – 10:00 AM" },
  { label: "10:00 AM", range: "10:00 – 10:30 AM" },
  { label: "10:30 AM", range: "10:30 – 11:00 AM" },
  { label: "11:00 AM", range: "11:00 – 11:30 PM" },
  { label: "1:00 PM", range: "1:00 – 1:30 AM" },
  { label: "2:30 PM", range: "2:30 – 3:00 AM" },
] as const;

type TimeSlotRange = (typeof timeSlots)[number]["range"];

const occasions = [
  { value: "Casual Visit", iconKey: "coffee" },
  { value: "Business Meeting", iconKey: "business" },
  { value: "Birthday", iconKey: "birthday" },
  { value: "Date Night", iconKey: "date" },
  { value: "Anniversary", iconKey: "anniversary" },
  { value: "Private Event", iconKey: "private" },
] as const;

type OccasionValue = (typeof occasions)[number]["value"];
type OccasionIconKey = (typeof occasions)[number]["iconKey"];

const occasionIcons: Record<OccasionIconKey, React.ReactNode> = {
  coffee: (
    <svg
      className="w-5 h-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  ),
  business: (
    <svg
      className="w-5 h-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  birthday: (
    <svg
      className="w-5 h-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
      <path d="M4 16h16" />
      <path d="M12 11V7" />
      <path d="M12 3.5a1 1 0 1 1 0 3" />
      <path d="M8 11V8" />
      <path d="M16 11V8" />
    </svg>
  ),
  date: (
    <svg
      className="w-5 h-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  anniversary: (
    <svg
      className="w-5 h-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M17.5 3H6.5c0 3.5 2.5 6.5 5.5 6.5s5.5-3 5.5-6.5z" />
      <line x1="12" y1="9.5" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  ),
  private: (
    <svg
      className="w-5 h-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M12 3v1M12 20v1M4 12H3M21 12h-1M18.364 5.636l-.707.707M6.343 17.657l-.707.707M5.636 5.636l.707.707M17.657 17.657l.707.707" />
    </svg>
  ),
};

/* ─── Shared Styles ─── */
const inputCls =
  "w-full bg-white border border-[#3E2723]/20 px-4 py-3.5 focus:outline-none focus:border-[#3E2723] focus:ring-0 transition-all duration-200 placeholder:text-[#3E2723]/30 rounded-sm hover:border-[#3E2723]/40 text-[#3E2723] text-[14px]";

export default function ReservationPage() {
  const { activeLang } = useLanguage();

  const STEPS = [
    {
      number: 1,
      title: activeLang === "DE" ? "Ihre Angaben" : "Your Details",

      subtitle:
        activeLang === "DE"
          ? "Teilen Sie uns mit, wer die Reservierung vornimmt"
          : "Let us know who's making the reservation",
    },
    {
      number: 2,
      title:
        activeLang === "DE" ? "Datum & Uhrzeit wählen" : "Pick a Date & Time",

      subtitle:
        activeLang === "DE"
          ? "Wählen Sie, wann Sie uns besuchen möchten"
          : "Choose when you'd like to visit",
    },
    {
      number: 3,
      title: activeLang === "DE" ? "Letzte Details" : "Final Touches",

      subtitle:
        activeLang === "DE"
          ? "Fast geschafft – besondere Wünsche?"
          : "Almost done — any special requests?",
    },
  ];

  const t = {
    guest: activeLang === "DE" ? "Gast" : "Guest",

    email: activeLang === "DE" ? "E-Mail" : "Email",

    date: activeLang === "DE" ? "Datum" : "Date",

    time: activeLang === "DE" ? "Uhrzeit" : "Time",

    party: activeLang === "DE" ? "Gruppe" : "Party",

    occasion: activeLang === "DE" ? "Anlass" : "Occasion",

    home: activeLang === "DE" ? "Startseite" : "Home",

    yourTable: activeLang === "DE" ? "Ihr Tisch" : "Your Table",

    awaits: activeLang === "DE" ? "Erwartet Sie" : "Awaits",

    reservationDescription:
      activeLang === "DE"
        ? "Reservieren Sie einen Platz in unserem von den 1920er-Jahren inspirierten Kaffeehaus – wo jeder Besuch zu einem besonderen Erlebnis wird."
        : "Reserve a seat in our 1920s-inspired coffeehouse — where every visit is a curated experience.",

    step: activeLang === "DE" ? "Schritt" : "Step",
    of: activeLang === "DE" ? "von" : "of",

    reservationRequest:
      activeLang === "DE" ? "Reservierungsanfrage" : "Reservation Request",

    requestReceived:
      activeLang === "DE" ? "Anfrage erhalten" : "Request Received",

    reservationSuccess:
      activeLang === "DE"
        ? "Ihre Reservierungsanfrage wurde erfolgreich empfangen. Eine Bestätigung wird an Ihre E-Mail-Adresse gesendet."
        : "Your reservation request has been successfully received. A confirmation reply will be sent to your email.",

    shortly: activeLang === "DE" ? "in Kürze" : "shortly",

    thankYou: activeLang === "DE" ? "Vielen Dank" : "Thank You",

    backToHome: activeLang === "DE" ? "Zurück zur Startseite" : "Back to Home",

    continue: activeLang === "DE" ? "Weiter" : "Continue",

    back: activeLang === "DE" ? "Zurück" : "Back",

    confirmReservation:
      activeLang === "DE" ? "Reservierung bestätigen" : "Confirm Reservation",

    confirming: activeLang === "DE" ? "Wird bestätigt..." : "Confirming...",

    fullName: activeLang === "DE" ? "Vollständiger Name" : "Full Name",

    emailAddress: activeLang === "DE" ? "E-Mail-Adresse" : "Email Address",

    confirmationSent:
      activeLang === "DE"
        ? "Ihre Bestätigung wird hierhin gesendet."
        : "Your confirmation will be sent here.",

    phoneNumber: activeLang === "DE" ? "Telefonnummer" : "Phone Number",

    optional: activeLang === "DE" ? "Optional" : "optional",

    numberOfGuests:
      activeLang === "DE" ? "Anzahl der Gäste" : "Number of Guests",

    preferredTime:
      activeLang === "DE" ? "Bevorzugte Uhrzeit" : "Preferred Time",

    specialRequests:
      activeLang === "DE" ? "Besondere Wünsche" : "Special Requests",

    reviewBooking:
      activeLang === "DE" ? "Reservierung überprüfen" : "Review Your Booking",

    bookingTerms:
      activeLang === "DE"
        ? "Mit der Bestätigung stimmen Sie zu, dass Reservierungen bis 15 Minuten nach der vereinbarten Zeit aufrechterhalten werden. Eine Bestätigungs-E-Mail wird umgehend versendet."
        : "By confirming, you agree that reservations are held for 15 minutes after the scheduled time. A confirmation email will be sent immediately.",

    bookingId: activeLang === "DE" ? "Reservierungsnummer" : "Booking ID",
  };

  /* Form fields */
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlotRange>("12:00 – 2:00 PM");
  const [guestCount, setGuestCount] = useState(2);
  const [occasion, setOccasion] = useState<OccasionValue>("Casual Visit");
  const [specialRequests, setSpecialRequests] = useState("");

  /* Multi-step */
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  /* Submit */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setConfirmationCode(
        `CB-RSV-${Math.floor(100000 + Math.random() * 900000)}`,
      );
    }
  }, [isSuccess]);

  /* Validation */
  const step1Valid =
    fullName.trim() !== "" && email.trim() !== "" && email.includes("@");
  const step2Valid = date !== "";

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (step === 1 && step1Valid) {
        goNext();
      } else if (step === 2 && step2Valid) {
        goNext();
      }
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    console.log("HANDLE SUBMIT CALLED");
    console.log("STEP:", step);

    if (step < STEPS.length) {
      if (step === 1 && step1Valid) {
        goNext();
      } else if (step === 2 && step2Valid) {
        goNext();
      }
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/reservation`;

    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("FINAL URL:", url);

    const payload = {
      full_name: fullName,
      email: email,
      phone: phone,
      reservation_date: date,
      number_of_guests: guestCount,
      preferred_time: timeSlot,
      occasion: occasion,
      special_requests: specialRequests,
    };

    console.log("PAYLOAD:", payload);

    try {
      setIsSubmitting(true);

      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("STATUS:", response.status);
      console.log("OK:", response.ok);

      const text = await response.text();

      console.log("RAW RESPONSE:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Invalid JSON response: ${text}`);
      }

      console.log("PARSED RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.message || `HTTP Error ${response.status}`);
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("FULL ERROR:", error);
      alert(String(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  /* Slide animation */
  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -48 : 48, opacity: 0 }),
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FAF8F5]">
      {/* ── LEFT: Image Panel ── */}
      <div className="relative w-full lg:w-[45%] min-h-[40vh] lg:min-h-screen lg:sticky lg:top-0 lg:h-screen overflow-hidden">
        <Image
          src="/assets/gallery/smiling-waiter-serving-coffee-female-guests-cafe.jpg"
          alt="Cafe Beatz interior ambiance"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover object-center"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:from-transparent lg:to-black/60" />

        {/* Brand content pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10 z-10">
          <p className="text-[9px] tracking-[0.45em] text-[#C5A880] uppercase font-bold mb-4">
            Cafe Beatz · Est. 1923
          </p>
          <h1 className="text-4xl lg:text-5xl font-serif text-white leading-tight mb-3">
            {t.yourTable}
            <br />
            <span className="italic text-[#C5A880]">{t.awaits}</span>
          </h1>
          <p className="text-sm text-white/60 max-w-[280px] leading-relaxed mb-6">
            {t.reservationDescription}
          </p>
          {/* Amenity pills */}
          <div className="flex flex-wrap gap-2">
            {["Live Jazz", "Artisan Coffee", "Seasonal Menu"].map((a) => (
              <span
                key={a}
                className="text-[10px] font-semibold tracking-widest uppercase text-[#C5A880] border border-[#C5A880]/30 px-3 py-1.5"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Form Panel ── */}
      <div className="w-full lg:w-[55%] flex flex-col">
        {/* Top bar: breadcrumb */}
        <div className="flex items-center justify-between px-8 lg:px-14 pt-8 pb-5 border-b border-[#3E2723]/8">
          <Link
            href="/"
            className="flex items-center gap-2 text-[13px] font-semibold text-[#3E2723]/50 hover:text-[#3E2723] transition-colors group"
          >
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.home}
          </Link>
          {!isSuccess && (
            <span className="text-[12px] text-[#3E2723]/35 font-medium">
              {t.step} {step} {t.of} {STEPS.length}
            </span>
          )}
        </div>

        {/* Progress bar (thin line under top bar) */}
        {!isSuccess && (
          <div className="h-[3px] bg-[#3E2723]/8">
            <motion.div
              className="h-full bg-[#C5A880]"
              animate={{ width: `${progress === 0 ? 8 : progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col justify-center items-center px-8 lg:px-14 py-10">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form-wrapper"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-lg mx-auto"
              >
                {/* Step header */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`header-${step}`}
                    custom={direction}
                    initial={{ opacity: 0, y: direction > 0 ? 10 : -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mb-8"
                  >
                    {/* Step pills */}
                    <div className="flex items-center gap-1.5 mb-4">
                      {STEPS.map((s) => (
                        <div
                          key={s.number}
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            s.number === step
                              ? "w-6 bg-[#C5A880]"
                              : s.number < step
                                ? "w-4 bg-[#3E2723]/40"
                                : "w-4 bg-[#3E2723]/12"
                          }`}
                        />
                      ))}
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-serif text-[#3E2723] mb-1">
                      {STEPS[step - 1].title}
                    </h2>
                    <p className="text-[14px] text-[#3E2723]/55 leading-relaxed">
                      {STEPS[step - 1].subtitle}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Step form content */}
                <div className="space-y-0">
                  <AnimatePresence mode="wait" custom={direction}>
                    {/* ── STEP 1: Personal Details ── */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="space-y-5"
                      >
                        <div>
                          <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723] mb-1.5">
                            {t.fullName}{" "}
                            <span className="text-[#C5A880]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            autoFocus
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Your full name"
                            className={inputCls}
                          />
                        </div>

                        <div>
                          <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723] mb-1.5">
                            {t.emailAddress}{" "}
                            <span className="text-[#C5A880]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="your@email.com"
                            className={inputCls}
                          />
                          <p className="text-[11px] text-[#3E2723]/40 mt-1.5">
                            {t.confirmationSent}
                          </p>
                        </div>

                        <div>
                          <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723] mb-1.5">
                            {t.phoneNumber}{" "}
                            <span className="font-normal normal-case text-[#3E2723]/40 tracking-normal text-[11px]">
                              — {t.optional}
                            </span>
                          </label>
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="+1 (555) 000-0000"
                            className={inputCls}
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 2: Date, Time, Guests, Occasion ── */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="space-y-6"
                      >
                        {/* Date + Guests in a row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723] mb-1.5">
                              {t.date} <span className="text-[#C5A880]">*</span>
                            </label>
                            <input
                              type="date"
                              required
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              onKeyDown={handleKeyDown}
                              min={new Date().toISOString().split("T")[0]}
                              className={`${inputCls} appearance-none`}
                            />
                          </div>

                          {/* Guest stepper */}
                          <div>
                            <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723] mb-1.5">
                              {t.numberOfGuests}
                            </label>
                            <div className="flex items-center border border-[#3E2723]/20 bg-white rounded-sm h-[50px]">
                              <button
                                type="button"
                                onClick={() =>
                                  setGuestCount((n) => Math.max(1, n - 1))
                                }
                                className="w-14 h-full flex items-center justify-center text-[#3E2723]/50 hover:text-[#3E2723] hover:bg-[#3E2723]/5 transition-all text-xl font-light border-r border-[#3E2723]/10 cursor-pointer"
                                aria-label="Decrease guests"
                              >
                                −
                              </button>
                              <div className="flex-1 text-center">
                                <span className="text-[15px] font-bold text-[#3E2723]">
                                  {guestCount}
                                </span>
                                <span className="text-[11px] text-[#3E2723]/50 ml-1">
                                  {guestCount === 1 ? "guest" : "guests"}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setGuestCount((n) => Math.min(12, n + 1))
                                }
                                className="w-14 h-full flex items-center justify-center text-[#3E2723]/50 hover:text-[#3E2723] hover:bg-[#3E2723]/5 transition-all text-xl font-light border-l border-[#3E2723]/10 cursor-pointer"
                                aria-label="Increase guests"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Time slots */}
                        <div>
                          <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723] mb-2">
                            {t.preferredTime}
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {timeSlots.map((slot) => {
                              const isSelected = timeSlot === slot.range;
                              return (
                                <button
                                  key={slot.range}
                                  type="button"
                                  onClick={() => setTimeSlot(slot.range)}
                                  className={`py-3 px-1 rounded-sm text-center border transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-[#3E2723] border-[#3E2723] text-[#FAF8F5]"
                                      : "bg-white border-[#3E2723]/15 text-[#3E2723] hover:border-[#3E2723]/50 hover:bg-[#3E2723]/4"
                                  }`}
                                >
                                  <span className="block text-[13px] font-bold leading-tight">
                                    {slot.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Occasion pills */}
                        <div>
                          <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723] mb-2">
                            {t.occasion}
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {occasions.map((occ) => {
                              const isSelected = occasion === occ.value;
                              return (
                                <button
                                  key={occ.value}
                                  type="button"
                                  onClick={() => setOccasion(occ.value)}
                                  className={`flex items-center gap-2 px-3 py-2.5 rounded-sm border text-left transition-all cursor-pointer ${
                                    isSelected
                                      ? "bg-[#3E2723] border-[#3E2723] text-[#FAF8F5]"
                                      : "bg-white border-[#3E2723]/15 text-[#3E2723] hover:border-[#3E2723]/45 hover:bg-[#3E2723]/4"
                                  }`}
                                >
                                  <span
                                    className={`leading-none ${isSelected ? "text-[#FAF8F5]" : "text-[#3E2723]"}`}
                                  >
                                    {occasionIcons[occ.iconKey]}
                                  </span>
                                  <span className="text-[12px] font-semibold leading-tight">
                                    {occ.value}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* ── STEP 3: Special Requests + Summary ── */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="space-y-6"
                      >
                        {/* Special requests */}
                        <div>
                          <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723] mb-1.5">
                            {t.specialRequests}
                            <span className="font-normal normal-case text-[#3E2723]/40 tracking-normal text-[11px] ml-2">
                              — {t.optional}
                            </span>
                          </label>
                          <textarea
                            rows={3}
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            placeholder="Dietary needs, seating preferences, accessibility requirements, birthday setups..."
                            className={`${inputCls} resize-none leading-relaxed`}
                          />
                        </div>

                        {/* Review summary */}
                        <div className="bg-white border border-[#3E2723]/12 rounded-sm overflow-hidden">
                          <div className="bg-[#3E2723] px-5 py-3 flex items-center gap-2">
                            <svg
                              className="w-3.5 h-3.5 text-[#C5A880]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                              />
                            </svg>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-[#FAF8F5]">
                              {t.reviewBooking}
                            </span>
                          </div>
                          <div className="divide-y divide-[#3E2723]/6">
                            {[
                              {
                                icon: (
                                  <svg
                                    className="w-4 h-4 text-[#3E2723]/60"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                  </svg>
                                ),
                                label: "{t.guest}",
                                value: fullName,
                              },
                              {
                                icon: (
                                  <svg
                                    className="w-4 h-4 text-[#3E2723]/60"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                  </svg>
                                ),
                                label: "{t.email}",
                                value: email,
                              },
                              {
                                icon: (
                                  <svg
                                    className="w-4 h-4 text-[#3E2723]/60"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                  >
                                    <rect
                                      x="3"
                                      y="4"
                                      width="18"
                                      height="18"
                                      rx="2"
                                      ry="2"
                                    />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                  </svg>
                                ),
                                label: "{t.date}",
                                value: date,
                              },
                              {
                                icon: (
                                  <svg
                                    className="w-4 h-4 text-[#3E2723]/60"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                  </svg>
                                ),
                                label: "{t.time}",
                                value: timeSlot,
                              },
                              {
                                icon: (
                                  <svg
                                    className="w-4 h-4 text-[#3E2723]/60"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                  </svg>
                                ),
                                label: "{t.party}",
                                value: `${guestCount} ${guestCount === 1 ? "person" : "people"}`,
                              },
                              {
                                icon: (
                                  <svg
                                    className="w-4 h-4 text-[#3E2723]/60"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 3v1M12 20v1M4 12H3M21 12h-1M18.364 5.636l-.707.707M6.343 17.657l-.707.707M5.636 5.636l.707.707M17.657 17.657l.707.707" />
                                  </svg>
                                ),
                                label: "{t.occasion}",
                                value: occasion,
                              },
                            ].map(({ icon, label, value }) => (
                              <div
                                key={label}
                                className="flex items-center px-5 py-3 gap-3"
                              >
                                <span className="w-5 flex items-center justify-center shrink-0">
                                  {icon}
                                </span>
                                <span className="text-[13px] uppercase tracking-wider font-bold text-[#3E2723]/70 w-16 shrink-0">
                                  {label}
                                </span>
                                <span className="text-[14px] font-semibold text-[#3E2723] flex-1 truncate">
                                  {value || "—"}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <p className="text-[13px] text-[#3E2723]/65 leading-relaxed">
                          {t.bookingTerms}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Navigation ── */}
                  <div className="mt-8 flex items-center gap-3">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="flex items-center gap-2 px-5 py-3.5 border border-[#3E2723]/20 text-[13px] font-semibold text-[#3E2723]/70 hover:text-[#3E2723] hover:border-[#3E2723]/45 transition-all cursor-pointer rounded-sm"
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
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        {t.back}
                      </button>
                    )}

                    {step < STEPS.length ? (
                      <button
                        key="btn-continue"
                        type="button"
                        onClick={goNext}
                        disabled={
                          step === 1
                            ? !step1Valid
                            : step === 2
                              ? !step2Valid
                              : false
                        }
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#3E2723] text-[#FAF8F5] text-[13px] font-bold uppercase tracking-wider hover:bg-[#5D4037] transition-all disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer rounded-sm"
                      >
                        {t.continue}
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        key="btn-submit"
                        type="button"
                        onClick={() => handleSubmit()}
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#3E2723] text-[#FAF8F5] text-[13px] font-bold uppercase tracking-wider hover:bg-[#5D4037] transition-all disabled:opacity-60 cursor-pointer rounded-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="w-3.5 h-3.5 animate-spin"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              />
                            </svg>
                            {t.confirming}
                          </>
                        ) : (
                          <>
                            {t.confirmReservation}
                            <svg
                              className="w-3.5 h-3.5"
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
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ── SUCCESS ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-lg flex flex-col items-center text-center"
              >
                {/* Check animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-[#C5A880]/10 border-2 border-[#C5A880] flex items-center justify-center mb-6"
                >
                  <svg
                    className="w-9 h-9 text-[#C5A880]"
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
                </motion.div>

                <span className="text-[13px] tracking-[0.3em] uppercase font-bold text-[#C5A880] mb-2">
                  {t.requestReceived}
                </span>
                <h3 className="text-3xl font-serif text-[#3E2723] mb-2">
                  {t.thankYou}
                </h3>
                <p className="text-[14px] text-[#3E2723]/65 max-w-sm mb-8 leading-relaxed">
                  {t.reservationSuccess}{" "}
                  <strong className="text-[#3E2723]">{email}</strong>{" "}
                  {t.shortly}.
                </p>

                {/* Ticket stub */}
                <div className="w-full relative border-2 border-double border-[#C5A880] bg-[#FAF8F5] overflow-hidden shadow-lg text-left mb-8">
                  {/* Punch holes */}
                  <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#C5A880]/30 z-20" />
                  <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#C5A880]/30 z-20" />

                  {/* Header */}
                  <div className="bg-[#3E2723] px-6 py-4 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] tracking-[0.2em] text-[#C5A880] uppercase font-bold block mb-0.5">
                        Cafe Beatz
                      </span>
                      <span className="text-[16px] font-serif text-white">
                        {t.reservationRequest}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] tracking-widest text-[#C5A880] block mb-0.5">
                        {t.bookingId}
                      </span>
                      <span className="text-[14px] font-mono text-white">
                        {confirmationCode}
                      </span>
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="px-6 py-4 grid grid-cols-2 gap-4 border-b border-dashed border-[#C5A880]/35">
                    {[
                      { label: "Guest", value: fullName },
                      {
                        label: "Party",
                        value: `${guestCount} ${guestCount === 1 ? "person" : "people"}`,
                      },
                      { label: "Date", value: date },
                      { label: "Time", value: timeSlot },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <span className="text-[11px] uppercase tracking-wider text-[#3E2723]/75 block mb-0.5">
                          {label}
                        </span>
                        <p className="text-[15px] font-bold text-[#3E2723] truncate">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="px-6 py-3 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#3E2723]/75 block mb-0.5">
                        {t.occasion}
                      </span>
                      <span className="text-[15px] font-bold text-[#3E2723]">
                        {occasion}
                      </span>
                    </div>
                    {/* Barcode */}
                    <div className="flex flex-col items-end">
                      <div className="flex items-end gap-[1.5px] h-6 opacity-60">
                        {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 1, 2, 1].map(
                          (w, i) => (
                            <div
                              key={i}
                              className="bg-[#3E2723]"
                              style={{ width: `${w}px`, height: "100%" }}
                            />
                          ),
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-[#3E2723]/70 mt-0.5 tracking-wider">
                        {confirmationCode}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/"
                  className="px-10 py-3.5 bg-[#3E2723] text-[#FAF8F5] text-[13px] font-bold uppercase tracking-wider hover:bg-[#5D4037] transition-all inline-flex items-center gap-2 rounded-sm"
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
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  {t.backToHome}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
