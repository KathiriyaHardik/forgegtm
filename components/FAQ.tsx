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
      "We build and run outbound for B2B companies: ICP and targeting, email infrastructure and deliverability, messaging, and the campaigns themselves — then manage them daily and report on qualified pipeline.",
  },
  {
    question: "Who do you work with?",
    answer:
      "B2B SaaS, technology and industrial companies, typically Series A through C, with a defined offer and someone in place to take the meetings we book.",
  },
  {
    question: "Do you handle execution, or just strategy?",
    answer:
      "Execution. We build the infrastructure, write the copy, run the campaigns and route the replies. The strategy exists to direct that work, not to be handed over as a deck.",
  },
  {
    question: "What markets do you specialise in?",
    answer:
      "Primarily European and North American B2B markets across SaaS, technology and industrial sectors, including multi-language expansion into DACH, the Nordics and the UK.",
  },
  {
    question: "How long does it take to launch?",
    answer:
      "Research and build typically take four weeks, with campaigns live in week five. First booked meetings usually follow within two to three weeks of launch, depending on list size and market.",
  },
  {
    question: "How do you measure success?",
    answer:
      "On qualified meetings, opportunities created and cost per qualified opportunity — agreed before we start. Reply rate and volume are diagnostics, not the goal.",
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
    <Section id="faq" tone="light">
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
              What teams usually want to know before starting an outbound
              engagement.
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
