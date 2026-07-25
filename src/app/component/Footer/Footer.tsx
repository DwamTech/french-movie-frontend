import { Share2 } from "lucide-react";
import { FaFacebookF, FaTelegram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const filmUrl = "https://french-movie.fr/ar.m4v";
const encodedFilmUrl = encodeURIComponent(filmUrl);

type FooterProps = { language: "ar" | "fr" };

export function Footer({ language }: FooterProps) {
  const isArabic = language === "ar";
  const shareTitle = isArabic ? "شاهد الفيلم الوثائقي محطات من جرائم فرنسا" : "Découvrez le documentaire Chroniques des crimes de France";
  const encodedShareTitle = encodeURIComponent(shareTitle);

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about"><img className="footer-logo" src="/logo-ar.png" alt={isArabic ? "محطات من جرائم فرنسا" : "Chroniques des crimes de France"} /></div>
        <div className="footer-viewer-count"><span>{isArabic ? "أنت المشاهد رقم" : "Vous êtes le spectateur numéro"}</span><strong>587٬432</strong></div>
        <div className="footer-share">
          <div className="footer-share-heading"><Share2 size={21} /><div><b>{isArabic ? "شارك الفيلم" : "Partagez le film"}</b><span>{isArabic ? "وانشره بين أصدقائك" : "Partagez-le avec vos amis"}</span></div></div>
          <div className="footer-social-links">
            <a href={`mailto:?subject=${encodedShareTitle}&body=${encodedFilmUrl}`} aria-label={isArabic ? "البريد الإلكتروني" : "E-mail"}><MdEmail size={20} /></a>
            <a href={`https://t.me/share/url?url=${encodedFilmUrl}&text=${encodedShareTitle}`} target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegram size={19} /></a>
            <a href={`https://wa.me/?text=${encodedShareTitle}%20${encodedFilmUrl}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp size={20} /></a>
            <a href={`https://x.com/intent/post?text=${encodedShareTitle}&url=${encodedFilmUrl}`} target="_blank" rel="noopener noreferrer" aria-label="X"><FaXTwitter size={18} /></a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedFilmUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF size={18} /></a>
          </div>
        </div>
      </div>
      <div className="footer-copyright footer-credit"><span>{isArabic ? "إنتاج وبرمجة شركة" : "Production et développement par"}</span><a href="https://dwam-tech.com/" target="_blank" rel="noopener noreferrer" aria-label={isArabic ? "زيارة موقع دوام" : "Visiter le site Dwam"}><img src="/dwam.png" alt="Dwam" /></a></div>
    </footer>
  );
}
