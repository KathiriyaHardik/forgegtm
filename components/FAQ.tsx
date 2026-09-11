"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section } from "./ui/Section";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";

const FAQS = [
  {
    question: "What does ForgeGTM do?",
    answer:
      "We design and build the systems behind predictable B2B revenue — GTM strategy, positioning, outbound execution and the sales infrastructure that connects them — and then run them with you until they compound.",
  },
  {
    question: "Who do you work with?",
    answer:
      "Ambitious B2B companies, typically Series A through growth stage, who already have product-market fit and are ready to move from ad-hoc tactics to a repeatable revenue engine.",
  },
  {
    question: "Do you handle outbound execution?",
    answer:
      "Yes. We build and run multi-channel outbound — email, LinkedIn and calling — including the data infrastructure, deliverability and routing, not just the strategy deck behind it.",
  },
  {
    question: "What markets do you specialise in?",
    answer:
      "Primarily European and North American B2B markets across SaaS, technology and industrial sectors, including multi-language expansion into DACH, the Nordics and the UK.",
  },
  {
    question: "How long does it take to launch a GTM system?",
    answer:
      "Most engagements move from discovery to a live system in about six weeks, with early signal on outbound performance inside the first 30 days of launch.",
  },
  {
    question: "How do you measure success?",
    answer:
      "Against pipeline generated, qualified opportunities and cost per opportunity — agreed with you before we start, and reported through closed-loop attribution rather than activity metrics.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "We work with early-stage teams that have found product-market fit and are ready to systemise growth. Pre-PMF experimentation is usually better served in-house.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" tone="off">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:self-start">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="text-h2 mt-5 text-balance text-ink">
              Questions, answered.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-body mt-5 max-w-sm text-muted">
              Everything you need to know before we build your growth engine
              together.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <a
              href="#contact"
              className="text-meta mt-7 inline-flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-accent"
            >
              Still have questions? Talk to us
            </a>
          </Reveal>
        </div>

        <div className="border-t border-border">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 40}>
                <div className="border-b border-border">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      className="flex w-full items-center justify-between gap-8 py-6 text-left"
                    >
                      <span className="text-[15.5px] font-medium text-ink">
                        {faq.question}
                      </span>
                      <Plus
                        size={17}
                        aria-hidden
                        className={`shrink-0 transition-transform duration-300 ease-premium ${
                          isOpen ? "rotate-45 text-accent" : "text-muted-soft"
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={`faq-answer-${i}`}
                    className="grid transition-all duration-300 ease-premium"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-body max-w-xl pr-8 pb-6 text-muted">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
