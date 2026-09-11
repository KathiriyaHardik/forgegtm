import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarketsStrip } from "@/components/MarketsStrip";
import { Metrics } from "@/components/Metrics";
import { ProblemSection } from "@/components/ProblemSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { Integrations } from "@/components/Integrations";
import { Engagements } from "@/components/Engagements";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <MarketsStrip />
        <Metrics />
        <ProblemSection />
        <ServicesSection />
        <ProcessSection />
        <Integrations />
        <Engagements />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
