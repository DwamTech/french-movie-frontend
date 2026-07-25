import { Share2 } from "lucide-react";
import { FaFacebookF, FaTelegram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export function SourcesSection() {
  return (
    <section className="film-info" id="sources">
      <div className="film-info-source">
        <h2>مصادر الفيلم</h2>
      </div>
      <div className="film-info-share">
        <div className="share-icon"><Share2 size={24} /></div>
        <div><h3>شارك وانشر الفيلم الآن بين أصدقائك</h3><div className="social-links"><a href="#" aria-label="البريد"><MdEmail size={19} /></a><a href="#" aria-label="تليجرام"><FaTelegram size={18} /></a><a href="#" aria-label="واتساب"><FaWhatsapp size={19} /></a><a href="#" aria-label="إكس"><FaXTwitter size={17} /></a><a href="#" aria-label="فيسبوك"><FaFacebookF size={17} /></a></div></div>
      </div>
      <div className="viewer-count"><span>أنت المشاهد رقم</span><strong>587٬432</strong></div>
    </section>
  );
}
