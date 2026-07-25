"use client";

import { useEffect, useState } from "react";
import { HeroSection } from "./component/HeroSection";
import { Footer } from "./component/Footer/Footer";

export default function Home() {
  const [language, setLanguage] = useState<"ar" | "fr">("ar");

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <main className="documentary-page" dir={language === "ar" ? "rtl" : "ltr"}>
      <HeroSection language={language} onToggleLanguage={() => setLanguage((current) => current === "ar" ? "fr" : "ar")} />
      <Footer language={language} />
    </main>
  );
}
