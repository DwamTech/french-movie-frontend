import { Share2 } from "lucide-react";
import { FaFacebookF, FaTelegram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export function ShareSection() {
  return (
    <section className="share-band">
      <div className="share-icon"><Share2 size={28} /></div>
      <div className="share-content"><h2>شارك وانشر الفيلم الآن بين أصدقائك</h2><div className="social-links"><a href="#" aria-label="البريد"><MdEmail size={19} /></a><a href="#" aria-label="تليجرام"><FaTelegram size={18} /></a><a href="#" aria-label="واتساب"><FaWhatsapp size={19} /></a><a href="#" aria-label="إكس"><FaXTwitter size={17} /></a><a href="#" aria-label="فيسبوك"><FaFacebookF size={17} /></a></div></div>
      <div className="viewer-count"><span>أنت المشاهد رقم</span><strong>587٬432</strong></div>
    </section>
  );
}
