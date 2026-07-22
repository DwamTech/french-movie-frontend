import { Send } from "lucide-react";

export function FeedbackSection() {
  return (
    <section className="feedback-section">
      <div className="feedback-intro"><span className="section-tag"><i /> رأيك يهمنا</span><h2>رأيك يهمنا</h2></div>
      <form><label>اسمك<input type="text" /></label><label>بريدك الإلكتروني<input type="email" /></label><label>الموضوع<input type="text" /></label><label className="message-label">رسالتك<textarea /></label><button type="button">إرسال <Send size={16} /></button></form>
    </section>
  );
}
