const cloudinaryVideo = "https://res.cloudinary.com/zpmqsn1n/video/upload";
const filmAssets = {
  ar: "v1792351524/ar_cloudinary_720p",
  fr: "v1792358346/fr_cloudinary_720p",
};

export function getFilmSources(language: "ar" | "fr") {
  const asset = filmAssets[language];
  return {
    mp4Url: `${cloudinaryVideo}/${asset}.mp4`,
    // French HLS currently returns broken segment URLs; use its verified MP4.
    hlsUrl: language === "ar" ? `${cloudinaryVideo}/sp_auto:maxres_720p/${asset}.m3u8` : null,
    downloadUrl: `/${language}.m4v`,
    downloadName: `${language}.m4v`,
  };
}
export const filmPageUrl = "https://french-movie.com/";
export const filmTitle = "محطات من جرائم فرنسا";
export const filmDescription = "شاهد الفيلم الوثائقي «محطات من جرائم فرنسا» كاملًا باللغة العربية، ومدته 18 دقيقة و24 ثانية، أو حمّله للمشاهدة لاحقًا.";
export const filmPosterUrl = new URL("video-cover.jpg", filmPageUrl).href;
