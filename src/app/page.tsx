import { incrementPageViews } from "../lib/page-views";
import { HomeClient } from "./HomeClient";
import { filmSchema } from "../lib/film-schema";

export const dynamic = "force-dynamic";

export default function Home() {
  const viewCount = incrementPageViews();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(filmSchema).replace(/</g, "\\u003c") }} />
      <HomeClient initialViewCount={viewCount} />
    </>
  );
}
