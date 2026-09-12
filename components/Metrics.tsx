import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";

/**
 * Operating commitments, not client results — every figure here describes how
 * ForgeGTM runs an engagement and is consistent with the Process and FAQ
 * sections. Keep it that way: verified client outcomes belong in Engagements.
 */
const COMMITMENTS = [
  { value: "5 weeks", label: "Research to first booked meetings" },
  { value: "9", label: "Services delivered under one roof" },
  { value: "1", label: "Accountable team, not four vendors" },
  { value: "Daily", label: "Campaign management and reply routing" },
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
          {COMMITMENTS.map((item, i) => (
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
          <p className="text-meta mt-12 text-muted-soft">
            How every ForgeGTM engagement is run.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
