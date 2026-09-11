import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

// Replace these placeholder metrics with verified ForgeGTM data, then remove
// the illustrative-figures note below.
const METRICS = [
  { value: "€248M+", label: "Revenue influenced" },
  { value: "3.4x", label: "Average pipeline lift" },
  { value: "17", label: "Client campaigns" },
  { value: "42%", label: "Avg. response improvement" },
];

/**
 * Dividers sit between columns only — items that open a row stay flush with
 * the container edge so the grid alignment reads cleanly.
 */
function dividerClass(index: number) {
  if (index === 0) return "";
  if (index === 2) return "md:border-l md:border-border md:pl-8";
  return "border-l border-border pl-5 md:pl-8";
}

export function Metrics() {
  return (
    <section className="bg-surface-2 py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {METRICS.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 70}>
              <div className={dividerClass(i)}>
                <span className="text-numeric block text-[32px] font-semibold text-ink md:text-[40px]">
                  {metric.value}
                </span>
                <span className="text-meta mt-2 block text-muted">
                  {metric.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <p className="mt-12 text-[12px] text-muted-soft">
            Illustrative figures shown while verified client results are being
            finalised.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
