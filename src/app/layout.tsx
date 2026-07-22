import type { Metadata } from "next";
import "./globals.css";
import "./blue-theme.css";
import "./showcase-cards.css";
import "./hero-video.css";

export const metadata: Metadata = {
  title: "ذاكرة باريس | فيلم وثائقي",
  description: "فيلم وثائقي قصير عن ذاكرة المدينة.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
