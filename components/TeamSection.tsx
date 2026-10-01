import Image from "next/image";
import { Container } from "./ui/Container";
import { Eyebrow } from "./ui/Eyebrow";
import { Reveal } from "./ui/Reveal";
import { PlaceholderBadge } from "./ui/PlaceholderBadge";
import { TEAM, initials } from "@/content/team";
import type { Dictionary } from "@/lib/i18n/en";
import type { Locale } from "@/lib/i18n/config";

/**
 * "The people behind ForgeGTM".
 *
 * Portrait on top, details below, which is the shape the reference uses and
 * the shape that survives having no photographs: where a member has none, an
 * initials monogram fills the same frame in the dark treatment used by
 * CaseVisual and ArticleVisual, so an unfinished profile looks deliberate
 * rather than broken. No stock portrait ever stands in for a real person.
 *
 * Members still carrying placeholder copy are labelled as such on the page.
 * An agency's credibility rests on this section being true, so an unwritten
 * bio has to read as unwritten rather than as a modest one.
 */
function Portrait({ name, photo }: { name: string; photo: string | null }) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={640}
        height={520}
        className="aspect-[5/4] w-full object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="relative flex aspect-[5/4] w-full items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#2c313b_0%,#171a20_55%,#0d0f13_100%)]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 28% 24%, rgba(255,255,255,0.16), transparent 58%)",
        }}
      />
      <span className="text-numeric relative text-[46px] leading-none font-medium tracking-[0.08em] text-white/70">
        {initials(name)}
      </span>
    </div>
  );
}

export function TeamSection({ t, lang }: { t: Dictionary; lang: Locale }) {
  if (TEAM.length === 0) return null;

  return (
    <section className="bg-surface-2 py-20 md:py-24">
      <Container>
        <Reveal>
          <Eyebrow variant="plain">{t.about.teamEyebrow}</Eyebrow>
        </Reveal>

        {/* Three across only once there are three people; with two, a
            third empty column reads as a missing card rather than a choice. */}
        <div
          className={`mt-10 grid gap-6 sm:grid-cols-2 ${
            TEAM.length > 2 ? "lg:grid-cols-3" : "lg:max-w-4xl"
          }`}
        >
          {TEAM.map((member, i) => (
            <Reveal key={member.id} delay={i * 80} className="h-full">
              <article className="rounded-card flex h-full flex-col overflow-hidden border border-border-soft bg-white shadow-[0_1px_2px_rgba(10,10,13,0.04)]">
                <Portrait name={member.name} photo={member.photo} />

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-[19px] font-bold tracking-[-0.03em] text-ink">
                    {member.name}
                  </h3>

                  <p className="mt-1.5 text-[14.5px] font-semibold text-accent">
                    {member.role[lang]}
                  </p>

                  <p className="text-body mt-4 text-muted">{member.bio[lang]}</p>

                  {member.placeholder && (
                    <div className="mt-5">
                      <PlaceholderBadge>{t.about.teamPlaceholder}</PlaceholderBadge>
                    </div>
                  )}

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-meta ease-premium mt-auto inline-flex items-center gap-2 pt-6 font-medium text-ink transition-colors hover:text-accent"
                    >
                      <span>{t.about.teamLinkedin}</span>
                      <span aria-hidden>&rarr;</span>
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
