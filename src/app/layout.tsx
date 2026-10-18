import type { Metadata } from "next";
import { filmDescription, filmPageUrl, filmPosterUrl, filmTitle } from "../lib/film";
import "./globals.css";
import "./blue-theme.css";
import "./showcase-cards.css";
import "./hero-video.css";

export const metadata: Metadata = {
  metadataBase: new URL(filmPageUrl),
  title: `${filmTitle} | الفيلم الوثائقي الكامل`,
  description: filmDescription,
  alternates: { canonical: filmPageUrl },
  openGraph: {
    type: "website",
    url: filmPageUrl,
    siteName: filmTitle,
    title: `${filmTitle} | الفيلم الوثائقي الكامل`,
    description: filmDescription,
    locale: "ar_EG",
    images: [{ url: filmPosterUrl, width: 1920, height: 1080, alt: filmTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${filmTitle} | الفيلم الوثائقي الكامل`,
    description: filmDescription,
    images: [{ url: filmPosterUrl, alt: filmTitle }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
