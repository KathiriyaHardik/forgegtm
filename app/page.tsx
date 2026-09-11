import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { Metrics } from "@/components/Metrics";
import { ProblemSection } from "@/components/ProblemSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { Integrations } from "@/components/Integrations";
import { CaseStudies } from "@/components/CaseStudies";
import { Testimonial } from "@/components/Testimonial";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <LogoStrip />
        <Metrics />
        <ProblemSection />
        <ServicesSection />
        <ProcessSection />
        <Integrations />
        <CaseStudies />
        <Testimonial />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
