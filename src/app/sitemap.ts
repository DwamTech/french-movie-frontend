import type { MetadataRoute } from "next";
import { filmPageUrl } from "../lib/film";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: filmPageUrl }];
}
