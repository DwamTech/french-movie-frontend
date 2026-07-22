import { Archive, CircleUserRound, LogIn, MessageCircle, Rss, Tags } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-about"><img className="footer-logo" src="/logo-ar.png" alt="محطات من جرائم فرنسا" /></div>
        <div className="footer-column"><b><Archive size={15} />الأرشيف</b><a href="#">فبراير 2021</a></div>
        <div className="footer-column"><b><Tags size={15} />تصنيفات</b><a href="#">Uncategorized</a></div>
        <div className="footer-column"><b><CircleUserRound size={15} />منوعات</b><a href="#"><LogIn size={13} />تسجيل الدخول</a><a href="#"><Rss size={13} />خلاصات Feed الإدخالات</a><a href="#"><MessageCircle size={13} />خلاصة التعليقات</a><a href="#">WordPress.org</a></div>
      </div>
      <div className="footer-copyright">حقوق النشر متاحة للجميع | الفيلم الوثائقي مجزرة من جرائم فرنسا 2020</div>
    </footer>
  );
}
