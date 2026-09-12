import { notFound } from "next/navigation";
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
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Navbar t={t} lang={lang} />
      <main id="main">
        <Hero t={t} lang={lang} />
        <LogoStrip t={t} />
        <Metrics t={t} />
        <ProblemSection t={t} />
        <ServicesSection t={t} />
        <ProcessSection t={t} />
        <CaseStudies t={t} lang={lang} />
        <Testimonials t={t} />
        <Integrations t={t} />
        <FAQ t={t} />
        <ContactSection t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
