const cloudinaryVideo = "https://res.cloudinary.com/zpmqsn1n/video/upload";
const filmAsset = "v1792351524/ar_cloudinary_720p";

export const filmMp4Url = `${cloudinaryVideo}/${filmAsset}.mp4`;
export const filmHlsUrl = `${cloudinaryVideo}/sp_auto:maxres_720p/${filmAsset}.m3u8`;
export const filmPageUrl = "https://french-movie.com/";
export const filmTitle = "محطات من جرائم فرنسا";
export const filmDescription = "شاهد الفيلم الوثائقي «محطات من جرائم فرنسا» كاملًا باللغة العربية، ومدته 18 دقيقة و24 ثانية، أو حمّله للمشاهدة لاحقًا.";
export const filmPosterUrl = new URL("video-cover.jpg", filmPageUrl).href;
