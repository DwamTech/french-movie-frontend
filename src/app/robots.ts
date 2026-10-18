import type { MetadataRoute } from "next";
import { filmPageUrl } from "../lib/film";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("sitemap.xml", filmPageUrl).href,
  };
}
