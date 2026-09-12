import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import type { Dictionary } from "@/lib/i18n/en";

/**
 * Operating commitments, not client results — every figure describes how
 * ForgeGTM runs an engagement and matches the Process and FAQ copy.
 * Verified client outcomes belong in the case studies.
 */
function dividerClass(index: number) {
  if (index === 0) return "";
  if (index === 2) return "md:border-l md:border-border md:pl-8";
  return "border-l border-border pl-5 md:pl-8";
}

export function Metrics({ t }: { t: Dictionary }) {
  return (
    <section className="bg-surface-2 py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-y-0">
          {t.commitments.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 70}>
              <div className={dividerClass(i)}>
                <span className="text-numeric block text-[32px] font-semibold text-ink md:text-[40px]">
                  {item.value}
                </span>
                <span className="text-meta mt-2 block max-w-[22ch] text-muted">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <p className="text-meta mt-12 text-muted-soft">{t.commitments.note}</p>
        </Reveal>
      </Container>
    </section>
  );
}
