import { incrementPageViews } from "../lib/page-views";
import { HomeClient } from "./HomeClient";

export const dynamic = "force-dynamic";

export default function Home() {
  const viewCount = incrementPageViews();

  return <HomeClient initialViewCount={viewCount} />;
}
