"use client";

import { useEffect } from "react";
import { Download } from "lucide-react";

const filmUrl = "/ar.m4v";

type HeroSectionProps = {
  language: "ar" | "fr";
  onToggleLanguage: () => void;
};

export function HeroSection({ language, onToggleLanguage }: HeroSectionProps) {
  const isArabic = language === "ar";
  useEffect(() => {
    const video = document.querySelector<HTMLVideoElement>(".video-card video");
    const updateOrientation = () => {
      if (document.fullscreenElement === video) {
        const orientation = screen.orientation as ScreenOrientation & {
          lock?: (mode: "landscape") => Promise<void>;
        };
        orientation.lock?.("landscape")?.catch(() => undefined);
      } else {
        screen.orientation?.unlock();
      }
    };

    document.addEventListener("fullscreenchange", updateOrientation);
    return () => document.removeEventListener("fullscreenchange", updateOrientation);
  }, []);

  return (
    <section className="hero-shell">
      <div className="hero" id="top">
        <div className="radar radar-one" /><div className="radar radar-two" />
        <div className="hero-copy">
          <img className="hero-logo" src="/logo-ar.png" alt={isArabic ? "محطات من جرائم فرنسا" : "Chroniques des crimes de France"} />
        </div>
        <div className="video-wrap">
          <div className="video-orbit"><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /></div>
          <div className="video-card">
            <video controls preload="metadata" playsInline poster="/video-cover.jpg" aria-label={isArabic ? "فيلم محطات من جرائم فرنسا" : "Film Chroniques des crimes de France"}>
              <source src={filmUrl} type="video/x-m4v" />
              {isArabic ? "متصفحك لا يدعم تشغيل الفيديو." : "Votre navigateur ne prend pas en charge la lecture vidéo."}
            </video>
          </div>
        </div>
        <div className="hero-media-links" aria-label={isArabic ? "مواد الفيلم" : "Ressources du film"}>
          <a href={filmUrl} download="ar.m4v"><span><Download size={18} /></span><small>{isArabic ? "تحميل الفيلم" : "Télécharger le film"}</small></a>
          <button className="language-switch" type="button" onClick={onToggleLanguage} aria-label={isArabic ? "التبديل إلى اللغة الفرنسية" : "Passer à la langue arabe"}><small>{isArabic ? "Langue française" : "اللغة العربية"}</small></button>
        </div>
      </div>
    </section>
  );
}
