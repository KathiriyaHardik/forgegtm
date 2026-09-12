"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section } from "./ui/Section";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";

export function FAQ({ t }: { t: Dictionary }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" tone="light">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:self-start">
          <Reveal>
            <Eyebrow>{t.faq.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={70}>
            <h2 className="text-h2 mt-5 text-balance text-ink">{t.faq.title}</h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-body mt-5 max-w-sm text-muted">{t.faq.body}</p>
          </Reveal>
          <Reveal delay={200}>
            <a
              href="#contact"
              className="text-meta mt-7 inline-flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-accent"
            >
              {t.faq.contactLink}
            </a>
          </Reveal>
        </div>

        <div className="border-t border-border">
          {t.faq.items.map((faq, i) => {
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
                        className={`ease-premium shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-accent" : "text-muted-soft"
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={`faq-answer-${i}`}
                    className="ease-premium grid transition-all duration-300"
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
