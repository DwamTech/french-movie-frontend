"use client";

import { useEffect } from "react";
import { Download } from "lucide-react";
import { FilmPlayer } from "./FilmPlayer";
import { filmDescription, getFilmSources } from "../../lib/film";

type HeroSectionProps = {
  language: "ar" | "fr";
  onToggleLanguage: () => void;
};

export function HeroSection({ language, onToggleLanguage }: HeroSectionProps) {
  const isArabic = language === "ar";
  const { downloadUrl, downloadName } = getFilmSources(language);

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
          <div className="cinematic-title-shell" dir={isArabic ? "rtl" : "ltr"}>
           
            <h1 className="cinematic-title">
              <span className="title-line title-line-primary">{isArabic ? "محطات من" : "Chroniques des"}</span>{" "}
              <span className="title-line title-line-accent">{isArabic ? "جرائم فرنسا" : "crimes de France"}</span>
            </h1>
            <span className="title-signature" aria-hidden="true"><i /><b /><i /></span>
          </div>
          <p className="film-summary">{isArabic ? filmDescription : "Regardez « Chroniques des crimes de France », un documentaire en français de 18 min 11 s, disponible en lecture en ligne et en téléchargement."}</p>
        </div>
        <div className="video-wrap">
          <div className="video-orbit"><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /></div>
          <div className="cinema-screen">
            <div className="cinema-marquee" aria-hidden="true"><span /><b>{isArabic ? "قاعة العرض الرئيسية" : "Salle de projection"}</b><span /></div>
            <div className="cinema-frame">
              <div className="screen-glow" aria-hidden="true" />
              <div className="video-card">
                <FilmPlayer language={language} label={isArabic ? "فيلم محطات من جرائم فرنسا" : "Film Chroniques des crimes de France"} />
              </div>
            </div>
            <div className="cinema-console" aria-hidden="true">
              <span className="speaker-grille" />
              <span className="cinema-status"><i />CINEMA 01</span>
              <span className="speaker-grille" />
            </div>
          </div>
        </div>
        <div className="hero-media-links" aria-label={isArabic ? "مواد الفيلم" : "Ressources du film"}>
          <a href={downloadUrl} download={downloadName}><span><Download size={18} /></span><small>{isArabic ? "تحميل الفيلم" : "Télécharger le film"}</small></a>
          <button className="language-switch" type="button" onClick={onToggleLanguage} aria-label={isArabic ? "التبديل إلى اللغة الفرنسية" : "Passer à la langue arabe"}><small>{isArabic ? "Langue française" : "اللغة العربية"}</small></button>
        </div>
      </div>
    </section>
  );
}
