"use client";

import { useEffect, useState } from "react";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import { useLanguage } from "@/app/context/LanguageContext";
import Button from "../Button";

export default function Events() {
  const { activeLang } = useLanguage();

  const [eventData, setEventData] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");

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

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      phone,
      comments,
    };

    try {
      setIsSubmitting(true);

      const url = `${process.env.NEXT_PUBLIC_API_URL}/event-enquiry`;

      console.log("URL:", url);
      console.log("Payload:", payload);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/event-enquiry`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Invalid JSON response: ${text}`);
      }

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit enquiry");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Enquiry Error:", error);
      alert(String(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setIsSuccess(false);
      setName("");
      setEmail("");
      setPhone("");
      setComments("");
    }, 300);
  };

  const cmsTitle =
    activeLang === "DE" ? eventData.cms_title_de : eventData.cms_title_en;

  const title = activeLang === "DE" ? eventData.title_de : eventData.title_en;

  const content =
    activeLang === "DE" ? eventData.content_de : eventData.content_en;

  const buttonText =
    activeLang === "DE" ? "Atmosphäre erleben" : "Experience the Vibe";

  const enquireNowText = activeLang === "DE" ? "Jetzt anfragen" : "Enquire Now";

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

          <div className="flex flex-wrap items-center gap-4">
            <Button href="/events" className="border border-[#3E2723]">
              {buttonText}
            </Button>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="relative inline-flex items-center justify-center px-6 py-4 text-[#3E2723] font-medium tracking-widest uppercase text-sm group transition-colors duration-300 hover:text-[#5D4037]"
            >
              <span className="relative z-10">{enquireNowText}</span>

              <span className="absolute bottom-[10px] left-6 right-6 h-[1px] bg-[#5D4037] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-[cubic-bezier(0.77,0,0.175,1)]"></span>
            </button>
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

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg bg-[#FAF8F5] text-[#3E2723] shadow-2xl overflow-hidden z-10 border border-[#C5A880]/30 rounded-sm"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-30"
              >
                ✕
              </button>

              {!isSuccess ? (
                <div className="p-8">
                  <h3 className="text-2xl mb-6">
                    {activeLang === "DE"
                      ? "Veranstaltungsanfrage"
                      : "Event Enquiry"}
                  </h3>

                  <form onSubmit={handleEnquirySubmit} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full border p-3"
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full border p-3"
                    />

                    <input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full border p-3"
                    />

                    <textarea
                      rows={4}
                      placeholder="Comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full border p-3"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#3E2723] text-white"
                    >
                      {isSubmitting
                        ? "Sending..."
                        : activeLang === "DE"
                          ? "Senden"
                          : "Send Enquiry"}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <h3 className="text-2xl mb-4">
                    {activeLang === "DE" ? "Vielen Dank!" : "Thank You!"}
                  </h3>

                  <p>
                    {activeLang === "DE"
                      ? "Ihre Anfrage wurde erfolgreich gesendet."
                      : "Your enquiry has been submitted successfully."}
                  </p>

                  <button
                    onClick={handleCloseModal}
                    className="mt-6 w-full py-3 bg-[#3E2723] text-white"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
