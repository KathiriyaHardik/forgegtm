"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

// Replace with approved client quotes and attributions.
const TESTIMONIALS = [
  {
    quote:
      "Their outbound system consistently books meetings with accounts we thought were out of reach.",
    name: "Ana Weber",
    role: "Head of Growth",
    company: "Kompass",
  },
  {
    quote:
      "ForgeGTM didn't just fix our pipeline — they left us a system we understand and can run ourselves.",
    name: "Daniel Achterberg",
    role: "Chief Revenue Officer",
    company: "Novaro",
  },
  {
    quote:
      "We replaced two agencies and three tools with one connected engine. The reporting alone paid for it.",
    name: "Priya Nandakumar",
    role: "VP Sales",
    company: "Anthemik",
  },
];

export function Testimonial() {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index];

  const go = (delta: number) =>
    setIndex(
      (prev) => (prev + delta + TESTIMONIALS.length) % TESTIMONIALS.length
    );

  return (
    <section className="bg-surface py-24 md:py-28">
      <Container>
        <Reveal>
          <figure className="mx-auto max-w-3xl rounded-panel border border-border bg-white px-8 py-12 md:px-16 md:py-16">
            <blockquote className="text-[24px] leading-[1.35] font-medium tracking-[-0.03em] text-balance text-ink md:text-[30px]">
              &ldquo;{active.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-3 text-[13px] font-semibold text-ink-soft">
                  {active.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div>
                  <div className="text-[14px] font-semibold text-ink">
                    {active.name}
                  </div>
                  <div className="text-meta text-muted">
                    {active.role}, {active.company}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-ink/25 hover:text-ink"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-ink/25 hover:text-ink"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
