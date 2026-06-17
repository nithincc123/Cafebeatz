"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button"; // Importing the liquid-fill button
import { useLanguage } from "@/app/context/LanguageContext";

export default function GiftCards() {
  const { activeLang } = useLanguage();
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [loadingAmounts, setLoadingAmounts] = useState(true);

  /* Modal Form States */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [senderName, setSenderName] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [voucherCode, setVoucherCode] = useState("");

  const title =
    activeLang === "DE" ? "Schenken Sie Zeit" : "Give the Gift of Time";

  const description =
    activeLang === "DE"
      ? "Überraschen Sie Ihre Liebsten mit einem Gutschein für Cafe Beatz. Unsere digitalen Gutscheine werden sofort per E-Mail zugestellt."
      : "Surprise your loved ones with a Gutschein for Cafe Beatz. Whether for a morning brunch or an evening of cocktails, our digital gift cards are delivered instantly via email.";

  const selectAmount =
    activeLang === "DE" ? "Betrag auswählen" : "Select Amount";

  const purchaseVoucher =
    activeLang === "DE" ? "Gutschein kaufen" : "Purchase Voucher";

  const premiumVoucher =
    activeLang === "DE" ? "Premium Gutschein" : "Premium Voucher";

  const redeemableText =
    activeLang === "DE"
      ? "Einlösbar für alle Speisen und Getränke in jedem Cafe Beatz Standort."
      : "Redeemable for all food and beverages at any Cafe Beatz location.";

  const giftVoucher = activeLang === "DE" ? "Gutschein" : "Gift Voucher";

  const enterVoucherDetails =
    activeLang === "DE" ? "Gutscheindetails eingeben" : "Enter Voucher Details";

  const cancelText = activeLang === "DE" ? "Abbrechen" : "Cancel";

  const processingText =
    activeLang === "DE" ? "Wird verarbeitet..." : "Processing...";

  const confirmPurchase =
    activeLang === "DE" ? "Kauf bestätigen" : "Confirm & Purchase";

  const closeWindow =
    activeLang === "DE" ? "Fenster schließen" : "Close Window";

  const requestReceived =
    activeLang === "DE" ? "Anfrage erhalten" : "Request Received";

  const thankYou = activeLang === "DE" ? "Vielen Dank" : "Thank You";

  const yourName =
    activeLang === "DE" ? "Ihr Name (Absender)" : "Your Name (Sender)";

  const recipientNameLabel =
    activeLang === "DE" ? "Name des Empfängers" : "Recipient's Name";

  const recipientEmailLabel =
    activeLang === "DE" ? "E-Mail des Empfängers" : "Recipient's Email";

  const personalMessageLabel =
    activeLang === "DE" ? "Persönliche Nachricht" : "Personal Message";

  const optionalText = activeLang === "DE" ? "optional" : "optional";

  const fromText = activeLang === "DE" ? "Von" : "From";

  const toText = activeLang === "DE" ? "An" : "To";

  const valueText = activeLang === "DE" ? "Wert" : "Value";

  const deliveryText = activeLang === "DE" ? "Lieferung" : "Delivery";

  const voucherId = activeLang === "DE" ? "Gutschein-ID" : "Voucher ID";

  const loadingVoucherAmounts =
    activeLang === "DE"
      ? "Gutscheinbeträge werden geladen..."
      : "Loading voucher amounts...";

  const purchaseDescription =
    activeLang === "DE"
      ? "Sie kaufen einen digitalen Gutschein im Wert von"
      : "You are purchasing a digital voucher worth";

  const voucherEmailInfo =
    activeLang === "DE"
      ? "Der digitale Gutschein wird an diese E-Mail-Adresse gesendet."
      : "The digital voucher will be emailed here.";

  const successMessage =
    activeLang === "DE"
      ? "Ihre Anfrage für einen digitalen Gutschein wurde erfolgreich erhalten. Eine Bestätigung mit den Gutscheindetails wird in Kürze an"
      : "Your digital voucher request has been successfully received. A confirmation reply containing the voucher details will be sent to";

  const shortlyText = activeLang === "DE" ? "gesendet." : "shortly.";

  const digitalVoucher =
    activeLang === "DE" ? "Digitaler Gutschein" : "Digital Voucher";

  const footerVoucherText =
    activeLang === "DE"
      ? "Cafe Beatz Premium-Gutscheine"
      : "Cafe Beatz premium gift vouchers";

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/gift-vouchers`,
        );

        const result = await response.json();

        if (result.success && result.data.length > 0) {
          setVouchers(result.data);

          // Select first amount by default
          setSelectedAmount(Number(result.data[0].amount));
        }
      } catch (error) {
        console.error("Failed to load vouchers:", error);
      } finally {
        setLoadingAmounts(false);
      }
    };

    fetchVouchers();
  }, []);

  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const randomCode = `CB-VCH-${Math.floor(100000 + Math.random() * 900000)}`;
      setVoucherCode(randomCode);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSuccess(false);
    setSenderName("");
    setRecipientName("");
    setRecipientEmail("");
    setPersonalMessage("");
  };

  return (
    <section
      id="gift-cards"
      className="relative w-full py-32 px-6 md:px-[80px] bg-[#3E2723] text-[#F4F1EA] overflow-hidden"
    >
      {/* 1. The Spotlight Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#5D4037]/50 via-[#3E2723] to-[#271815] z-0"></div>

      {/* 2. The 1920s Art Deco SVG Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F4F1EA' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Subtle Floating Embellishment */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[10%] opacity-10 w-32 h-32 pointer-events-none z-0"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        {/* LEFT COLUMN: Copy & Selection */}
        <div className="flex flex-col">
          <div className="w-16 h-[1px] bg-[#F4F1EA] mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-medium tracking-wide mb-6">
            {title}
          </h2>
          <p className="text-sm md:text-base leading-relaxed opacity-80 mb-10 max-w-md">
            {description}
          </p>

          <h3 className="text-xs font-bold tracking-widest uppercase mb-4 opacity-70">
            {selectAmount}
          </h3>

          {/* Value Toggles */}
          <div className="flex flex-wrap gap-4 mb-10">
            {loadingAmounts ? (
              <p>{loadingVoucherAmounts}</p>
            ) : (
              vouchers.map((voucher) => (
                <button
                  key={voucher.id}
                  onClick={() => setSelectedAmount(Number(voucher.amount))}
                  className={`px-6 py-3 transition-all duration-300 font-medium tracking-wider shadow-sm ${
                    selectedAmount === Number(voucher.amount)
                      ? "bg-[#F4F1EA] text-[#3E2723] scale-105"
                      : "border border-[#F4F1EA]/30 text-[#F4F1EA] hover:border-[#F4F1EA]"
                  }`}
                >
                  €{voucher.amount}
                </button>
              ))
            )}
          </div>

          {/* Integrating your custom liquid-fill primary Button */}
          <div className="inline-block">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="border border-[#F4F1EA]/30 "
            >
              {purchaseVoucher}
            </Button>
          </div>
        </div>

        {/* RIGHT COLUMN: The Visual Ticket */}
        <div className="flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, rotate: -5, y: 20 }}
            whileInView={{ opacity: 1, rotate: 2, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-md bg-[#F4F1EA] text-[#3E2723] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Antique Ticket Border Detailing */}
            <div className="absolute inset-2 border border-[#3E2723]/20 pointer-events-none"></div>
            <div className="absolute inset-3 border border-[#3E2723]/10 pointer-events-none"></div>

            {/* Perforated Edge Effect (CSS Circles) */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#3E2723] rounded-full shadow-inner"></div>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#3E2723] rounded-full shadow-inner"></div>

            <div className="text-center relative z-10">
              <h4 className="font-script text-5xl mb-2">Cafe Beatz</h4>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 mb-12 border-b border-[#3E2723]/20 pb-4">
                {premiumVoucher}
              </p>

              <motion.div
                key={selectedAmount}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="text-7xl font-light tracking-tighter mb-8"
              >
                €{selectedAmount}
              </motion.div>

              <p className="text-xs opacity-60 leading-relaxed max-w-[200px] mx-auto font-medium">
                {redeemableText}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Voucher Purchase Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal window container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-[#FAF8F5] text-[#3E2723] shadow-2xl overflow-hidden z-10 border border-[#C5A880]/30 rounded-sm"
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-[#3E2723]/50 hover:text-[#3E2723] transition-colors p-1 cursor-pointer z-30"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* State 1: Voucher Details Form */}
              {!isSuccess ? (
                <div className="p-8 md:p-10">
                  <div className="mb-6">
                    <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#C5A880] block mb-1">
                      {giftVoucher}
                    </span>
                    <h3 className="text-2xl font-serif text-[#3E2723]">
                      {enterVoucherDetails}
                    </h3>
                    <p className="text-[13px] text-[#3E2723]/60 mt-1">
                      {purchaseDescription}{" "}
                      <strong className="text-[#3E2723]">
                        €{selectedAmount}
                      </strong>
                      .
                    </p>
                  </div>

                  <form onSubmit={handlePurchaseSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723]/75 mb-1">
                        {yourName} <span className="text-[#C5A880]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full bg-white border border-[#3E2723]/20 px-4 py-3 focus:outline-none focus:border-[#3E2723] transition-all duration-200 placeholder:text-[#3E2723]/30 rounded-sm hover:border-[#3E2723]/40 text-[#3E2723] text-[13px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723]/75 mb-1">
                        {recipientNameLabel}{" "}
                        <span className="text-[#C5A880]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Recipient's full name"
                        className="w-full bg-white border border-[#3E2723]/20 px-4 py-3 focus:outline-none focus:border-[#3E2723] transition-all duration-200 placeholder:text-[#3E2723]/30 rounded-sm hover:border-[#3E2723]/40 text-[#3E2723] text-[13px]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723]/75 mb-1">
                        {recipientEmailLabel}{" "}
                        <span className="text-[#C5A880]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="recipient@email.com"
                        className="w-full bg-white border border-[#3E2723]/20 px-4 py-3 focus:outline-none focus:border-[#3E2723] transition-all duration-200 placeholder:text-[#3E2723]/30 rounded-sm hover:border-[#3E2723]/40 text-[#3E2723] text-[13px]"
                      />
                      <p className="text-[11px] text-[#3E2723]/45 mt-1">
                        {voucherEmailInfo}
                      </p>
                    </div>

                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#3E2723]/75 mb-1">
                        {personalMessageLabel}{" "}
                        <span className="font-normal text-[#3E2723]/40 tracking-normal">
                          — {optionalText}
                        </span>
                      </label>
                      <textarea
                        rows={2}
                        value={personalMessage}
                        onChange={(e) => setPersonalMessage(e.target.value)}
                        placeholder="Add a greeting or note for the recipient..."
                        className="w-full bg-white border border-[#3E2723]/20 px-4 py-3 focus:outline-none focus:border-[#3E2723] transition-all duration-200 placeholder:text-[#3E2723]/30 rounded-sm hover:border-[#3E2723]/40 text-[#3E2723] text-[13px] resize-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-5 py-3 border border-[#3E2723]/20 text-[13px] font-semibold text-[#3E2723]/70 hover:text-[#3E2723] hover:border-[#3E2723]/45 transition-all cursor-pointer rounded-sm"
                      >
                        {cancelText}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#3E2723] text-[#FAF8F5] text-[13px] font-bold uppercase tracking-wider hover:bg-[#5D4037] transition-all disabled:opacity-60 cursor-pointer rounded-sm"
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
                            {processingText}
                          </>
                        ) : (
                          <>
                            {confirmPurchase}
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* State 2: Success Confirmation / Digital Voucher Ticket Stub */
                <div className="p-8 md:p-10 flex flex-col items-center text-center">
                  {/* Success Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-[#C5A880]/10 border-2 border-[#C5A880] flex items-center justify-center mb-5"
                  >
                    <svg
                      className="w-8 h-8 text-[#C5A880]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>

                  <span className="text-[12px] tracking-[0.3em] uppercase font-bold text-[#C5A880] mb-1">
                    {requestReceived}
                  </span>
                  <h3 className="text-2xl font-serif text-[#3E2723] mb-2">
                    {thankYou}
                  </h3>
                  <p className="text-[13.5px] text-[#3E2723]/65 max-w-sm mb-6 leading-relaxed">
                    {successMessage}{" "}
                    <strong className="text-[#3E2723]">{recipientEmail}</strong>{" "}
                    {shortlyText}.
                  </p>

                  {/* Stylized digital voucher ticket stub */}
                  <div className="w-full relative border-2 border-double border-[#C5A880] bg-[#FAF8F5] overflow-hidden shadow-md text-left mb-6">
                    {/* Perforations */}
                    <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#C5A880]/30 z-20" />
                    <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#FAF8F5] border border-[#C5A880]/30 z-20" />

                    {/* Header */}
                    <div className="bg-[#3E2723] px-5 py-3.5 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] tracking-[0.25em] text-[#C5A880] uppercase font-bold block mb-0.5">
                          Cafe Beatz
                        </span>
                        <span className="text-[14px] font-serif text-white">
                          {digitalVoucher}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] tracking-widest text-[#C5A880] block mb-0.5">
                          {voucherId}
                        </span>
                        <span className="text-[12px] font-mono text-white">
                          {voucherCode}
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="px-5 py-3.5 grid grid-cols-2 gap-3.5 border-b border-dashed border-[#C5A880]/35">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#3E2723]/70 block mb-0.5">
                          {fromText}
                        </span>
                        <p className="text-[14px] font-bold text-[#3E2723] truncate">
                          {senderName}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#3E2723]/70 block mb-0.5">
                          {toText}
                        </span>
                        <p className="text-[14px] font-bold text-[#3E2723] truncate">
                          {recipientName}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#3E2723]/70 block mb-0.5">
                          {valueText}
                        </span>
                        <p className="text-[14px] font-bold text-[#3E2723]">
                          €{selectedAmount}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#3E2723]/70 block mb-0.5">
                          {deliveryText}
                        </span>
                        <p className="text-[14px] font-bold text-[#3E2723] truncate">
                          {recipientEmail}
                        </p>
                      </div>
                    </div>

                    {/* Footer / Barcode */}
                    <div className="px-5 py-3 flex items-center justify-between">
                      <div className="text-[11px] italic text-[#3E2723]/60 max-w-[150px] leading-tight">
                        {footerVoucherText}
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-end gap-[1.25px] h-5 opacity-60">
                          {[1, 3, 2, 4, 1, 2, 3, 1, 2, 1, 4, 2].map((w, i) => (
                            <div
                              key={i}
                              className="bg-[#3E2723]"
                              style={{ width: `${w}px`, height: "100%" }}
                            />
                          ))}
                        </div>
                        <span className="text-[9px] font-mono text-[#3E2723]/70 mt-0.5 tracking-wider">
                          {voucherCode}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseModal}
                    className="w-full py-3 bg-[#3E2723] text-[#FAF8F5] text-[13px] font-bold uppercase tracking-wider hover:bg-[#5D4037] transition-all cursor-pointer rounded-sm"
                  >
                    {closeWindow}
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
