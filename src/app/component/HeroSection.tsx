import { Download, FileAudio, FileText } from "lucide-react";

export function HeroSection() {
  return (
    <section className="hero-shell">
      <div className="hero" id="top">
        <div className="radar radar-one" /><div className="radar radar-two" />
        <div className="hero-copy">
          <img className="hero-logo" src="/logo-ar.png" alt="محطات من جرائم فرنسا" />
        </div>
        <div className="video-wrap">
          <div className="video-orbit"><span className="orbit-dot dot-one" /><span className="orbit-dot dot-two" /></div>
          <div className="video-card">
            <video controls preload="metadata" playsInline aria-label="فيلم محطات من جرائم فرنسا">
              <source src="/ar.m4v" type="video/x-m4v" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>
        </div>
        <div className="hero-media-links" aria-label="مواد الفيلم">
          <a href="#downloads"><span><Download size={18} /></span><small>تحميل الفيلم</small></a>
          <a href="#downloads"><span><FileAudio size={18} /></span><small>بودكاست الفيلم</small></a>
          <a href="#sources"><span><FileText size={18} /></span><small>كتاب الفيلم</small></a>
        </div>
      </div>
    </section>
  );
}
