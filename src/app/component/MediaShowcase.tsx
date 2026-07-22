import { Download, FileAudio, FileText } from "lucide-react";

const gallery = [
  "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=85",
];

const downloads = [
  { number: "01", title: "تحميل الفيلم", format: "HD", icon: Download },
  { number: "02", title: "بودكاست الفيلم", format: "MP3", icon: FileAudio },
  { number: "03", title: "كتاب الفيلم", format: "PDF", icon: FileText },
];

export function MediaShowcase() {
  return (
    <section className="media-showcase" id="downloads">
      <div className="showcase-glow glow-one" /><div className="showcase-glow glow-two" />
      <div className="showcase-heading"><span className="section-tag"><i /> الفيلم الوثائقي</span><h2>الفيلم الوثائقي</h2></div>
      <div className="showcase-grid">
        {downloads.map(({ number, title, format, icon: Icon }, index) => (
          <a href="#" className="showcase-card" key={format}>
            <div className="showcase-card-top"><strong>{number}</strong><span><Icon size={22} /></span></div>
            <div className="showcase-image"><img src={gallery[index]} alt="" /><i /></div>
            <small>{format}</small><h3>{title}</h3>
            <footer><span>تحميل الآن</span><Download size={15} /></footer>
          </a>
        ))}
      </div>
    </section>
  );
}
