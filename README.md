# french-movie-frontend

واجهة الفيلم الوثائقي «محطات من جرائم فرنسا».

The player uses Cloudinary HLS with native browser support or a dynamically
loaded hls.js player. If streaming fails, it switches to the prepared 720p MP4
on Cloudinary and preserves the playback position. Delivery URLs live in
`src/lib/film.ts`; sharing opens the film page, while the download button keeps
the original film on the site server.

For `sp_auto`, set the streaming format through the `.m3u8` URL extension.
Cloudinary rejects combining `sp_auto` with an `f_m3u8` transformation. Verify
playback and the individual renditions in a browser before changing these URLs.

Run `npm ci` and `npm run build` to validate a release. On this deployment, use
the application's `www` user and the Node.js version selected in aaPanel.

Search and sharing metadata use the film's full name, the existing poster,
the canonical watch page, and generated robots/sitemap routes. Structured data
describes the site, watch page, and documentary as a Movie. The original release
date is not verified, so no date or VideoObject uploadDate is fabricated. Add
complete VideoObject metadata when the original publication date is confirmed.

