"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { Section } from "./ui/Section";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";

const LAYERS = [
  {
    id: "strategy",
    label: "Strategy & ICP",
    summary:
      "Who you sell to, why they buy, and where the compounding leverage actually sits. Everything downstream inherits these decisions.",
    deliverables: [
      "ICP & segmentation model",
      "Buying-committee map",
      "Channel prioritisation",
      "90-day GTM roadmap",
    ],
  },
  {
    id: "positioning",
    label: "Positioning & Narrative",
    summary:
      "A single story your whole team can tell and your buyers can repeat — so the conversation stops defaulting to price.",
    deliverables: [
      "Category & value narrative",
      "Objection-handling library",
      "Proof & case architecture",
      "Sales-ready one-pagers",
    ],
  },
  {
    id: "outbound",
    label: "Outbound Engine",
    summary:
      "Multi-channel outbound built as owned infrastructure rather than a campaign you rent from an agency.",
    deliverables: [
      "Data & list infrastructure",
      "Domain and inbox warm-up",
      "Sequence architecture",
      "Reply routing workflows",
    ],
  },
  {
    id: "messaging",
    label: "Messaging Systems",
    summary:
      "Message-market fit tested continuously instead of guessed once, with variants tied to segment and channel.",
    deliverables: [
      "Message testing framework",
      "Persona-level variants",
      "Channel-specific copy",
      "Quarterly refresh cycle",
    ],
  },
  {
    id: "sales-systems",
    label: "Sales Systems",
    summary:
      "The CRM, process and automation that make pipeline legible — so forecasting stops being a feeling.",
    deliverables: [
      "CRM architecture",
      "Pipeline stage definitions",
      "Handover & SLA design",
      "Enrichment & automation",
    ],
  },
  {
    id: "analytics",
    label: "GTM Analytics",
    summary:
      "Closed-loop reporting, so strategy learns from every deal instead of every quarter starting from zero.",
    deliverables: [
      "Source-to-revenue attribution",
      "Cohort & velocity reporting",
      "Forecast modelling",
      "Executive dashboard",
    ],
  },
];

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const lastIndex = LAYERS.length - 1;
    let next: number | null = null;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = active === lastIndex ? 0 : active + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = active === 0 ? lastIndex : active - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = lastIndex;
    }

    if (next !== null) {
      event.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  const layer = LAYERS[active];

  return (
    <Section id="services" tone="off">
      <SectionHeader
        eyebrow="What we build"
        title="One partner for the entire revenue engine."
        aside="Six connected layers, delivered and owned by one accountable team — not four vendors each optimising their own slice."
      />

      <Reveal delay={120}>
        <div className="mt-16 overflow-hidden rounded-panel border border-border bg-white">
          <div className="grid lg:grid-cols-[minmax(0,320px)_1fr]">
            <div
              role="tablist"
              aria-label="Revenue engine layers"
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="border-b border-border bg-surface-2 p-3 lg:border-r lg:border-b-0"
            >
              {LAYERS.map((item, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    id={`layer-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls={`layer-panel-${item.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`flex w-full items-center gap-4 rounded-inset px-4 py-3.5 text-left transition-colors duration-200 ${
                      isActive
                        ? "bg-white text-ink shadow-[0_2px_10px_-6px_rgba(10,10,13,0.25)]"
                        : "text-muted hover:bg-white/60 hover:text-ink-soft"
                    }`}
                  >
                    <span
                      className={`text-numeric text-[12px] font-semibold ${
                        isActive ? "text-accent" : "text-muted-soft"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14px] font-medium">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`layer-panel-${layer.id}`}
              aria-labelledby={`layer-tab-${layer.id}`}
              className="flex min-h-[360px] flex-col p-8 md:p-12"
            >
              <span className="text-eyebrow text-accent">
                Layer {String(active + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-5 text-[26px] font-semibold tracking-[-0.025em] text-ink md:text-[30px]">
                {layer.label}
              </h3>

              <p className="text-lead mt-4 max-w-lg text-muted">
                {layer.summary}
              </p>

              <div className="mt-auto pt-10">
                <div className="text-eyebrow text-muted-soft">
                  What you get
                </div>
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {layer.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="flex items-center gap-3 text-[14px] text-ink-soft"
                    >
                      <Check size={14} className="shrink-0 text-accent" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
