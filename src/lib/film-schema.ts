import { filmDescription, filmPageUrl, filmPosterUrl, filmTitle } from "./film";

// The original publication date is unverified; do not invent an uploadDate.
export const filmSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${filmPageUrl}#website`,
      url: filmPageUrl,
      name: filmTitle,
      alternateName: "Chroniques des crimes de France",
      inLanguage: ["ar", "fr"],
    },
    {
      "@type": "WebPage",
      "@id": `${filmPageUrl}#webpage`,
      url: filmPageUrl,
      name: filmTitle,
      description: filmDescription,
      inLanguage: "ar",
      isPartOf: { "@id": `${filmPageUrl}#website` },
      mainEntity: { "@id": `${filmPageUrl}#film` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: filmPosterUrl,
        width: 1920,
        height: 1080,
      },
    },
    {
      "@type": "Movie",
      "@id": `${filmPageUrl}#film`,
      url: filmPageUrl,
      name: filmTitle,
      alternateName: "Chroniques des crimes de France",
      description: filmDescription,
      image: filmPosterUrl,
      genre: "Documentary",
      inLanguage: "ar",
      duration: "PT18M24S",
      isAccessibleForFree: true,
      mainEntityOfPage: { "@id": `${filmPageUrl}#webpage` },
      potentialAction: { "@type": "WatchAction", target: filmPageUrl },
    },
  ],
};
