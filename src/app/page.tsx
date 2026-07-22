import { HeroSection } from "./component/HeroSection";
import { SourcesSection } from "./component/SourcesSection";
import { Footer } from "./component/Footer/Footer";

export default function Home() {
  return (
    <main className="documentary-page">
      <HeroSection />
      <SourcesSection />
      <Footer />
    </main>
  );
}
