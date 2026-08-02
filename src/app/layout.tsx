import type { Metadata } from "next";
import "./globals.css";
import "./blue-theme.css";
import "./showcase-cards.css";
import "./hero-video.css";

export const metadata: Metadata = {
  icons: {
    icon: "/france.ico",
  },
  title: "من جرائم فرنسا | فيلم وثائقي",
  description: "فيلم وثائقي قصير عن جرائم فرنسا.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
