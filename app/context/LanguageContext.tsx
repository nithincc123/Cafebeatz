"use client";

import { createContext, useContext, useState } from "react";

type LanguageContextType = {
  activeLang: string;
  setActiveLang: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [activeLang, setActiveLang] = useState("EN");

  return (
    <LanguageContext.Provider value={{ activeLang, setActiveLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
