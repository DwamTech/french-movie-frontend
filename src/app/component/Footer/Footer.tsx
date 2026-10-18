"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { filmPageUrl } from "../../../lib/film";

type FooterProps = { language: "ar" | "fr"; viewCount: number };

export function Footer({ language, viewCount }: FooterProps) {
  const [shareStatus, setShareStatus] = useState<"copied" | "manual" | null>(null);
  const isArabic = language === "ar";
  const shareTitle = isArabic ? "شاهد الفيلم الوثائقي محطات من جرائم فرنسا" : "Découvrez le documentaire Chroniques des crimes de France";

  const shareFilm = async () => {
    setShareStatus(null);
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: filmPageUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(filmPageUrl);
      setShareStatus("copied");
    } catch {
      setShareStatus("manual");
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about"><img className="footer-logo" src="/logo-ar.png" alt={isArabic ? "محطات من جرائم فرنسا" : "Chroniques des crimes de France"} /></div>
        <div className="footer-viewer-count"><span>{isArabic ? "أنت المشاهد رقم" : "Vous êtes le spectateur numéro"}</span><strong>{viewCount.toLocaleString(isArabic ? "ar-EG" : "fr-FR")}</strong></div>
        <div className="footer-share">
          <button type="button" className="footer-share-heading" onClick={shareFilm} aria-label={isArabic ? "شارك الفيلم" : "Partagez le film"}>
            <Share2 size={21} aria-hidden="true" />
            <span className="footer-share-text"><b>{isArabic ? "شارك الفيلم" : "Partagez le film"}</b><span>{isArabic ? "وانشره بين أصدقائك" : "Partagez-le avec vos amis"}</span></span>
          </button>
          <div className="footer-share-status" role="status">
            {shareStatus === "copied" && (isArabic ? "تم نسخ رابط الفيلم" : "Le lien du film a été copié")}
            {shareStatus === "manual" && (isArabic ? "انسخ الرابط لمشاركة الفيلم:" : "Copiez le lien pour partager le film :")}
          </div>
          {shareStatus === "manual" && <input className="footer-share-url" aria-label={isArabic ? "رابط الفيلم" : "Lien du film"} dir="ltr" readOnly value={filmPageUrl} onFocus={(event) => event.currentTarget.select()} />}
        </div>
      </div>
      <div className="footer-copyright footer-credit"><span>{isArabic ? "إنتاج وبرمجة شركة" : "Production et développement par"}</span><a href="https://dwam-tech.com/" target="_blank" rel="noopener noreferrer" aria-label={isArabic ? "زيارة موقع دوام" : "Visiter le site Dwam"}><img src="/dwam.png" alt="Dwam" /></a></div>
    </footer>
  );
}
