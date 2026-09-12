import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { Metrics } from "@/components/Metrics";
import { ProblemSection } from "@/components/ProblemSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { CaseStudies } from "@/components/CaseStudies";
import { Testimonials } from "@/components/Testimonials";
import { Integrations } from "@/components/Integrations";
import { FAQ } from "@/components/FAQ";
import { ContactSection } from "@/components/ContactSection";
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
        <CaseStudies />
        <Testimonials />
        <Integrations />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
