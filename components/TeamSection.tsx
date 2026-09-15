import Image from "next/image";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { PlaceholderBadge } from "./ui/PlaceholderBadge";
import { TEAM, initials } from "@/content/team";
import type { Dictionary } from "@/lib/i18n/en";
import type { Locale } from "@/lib/i18n/config";

/**
 * Founder / team section on the About page.
 *
 * Where a member has no photo yet, an initials monogram is drawn in the same
 * dark treatment as CaseVisual and ArticleVisual, so an unfinished profile
 * looks deliberate rather than broken — and so the page never needs a stock
 * portrait standing in for a real person.
 *
 * Members still carrying placeholder copy are labelled as such on the page.
 * An agency's credibility rests on this section being true, so an unwritten
 * bio has to read as unwritten rather than as a modest one.
 */
function Avatar({ name, photo }: { name: string; photo: string | null }) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        width={320}
        height={320}
        className="rounded-card aspect-square w-full object-cover"
      />
    );
  }

  return (
    <div
      aria-hidden
      className="rounded-card relative flex aspect-square w-full items-center justify-center overflow-hidden border border-border bg-[linear-gradient(145deg,#2c313b_0%,#171a20_55%,#0d0f13_100%)]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 28% 24%, rgba(255,255,255,0.16), transparent 58%)",
        }}
      />
      {/* A percentage font-size resolves against the inherited size, not the
          box, so it rendered a few pixels tall. Fixed sizes, stepped with the
          avatar. */}
      <span className="text-numeric relative text-[34px] leading-none font-medium tracking-[0.08em] text-white/70 sm:text-[40px]">
        {initials(name)}
      </span>
    </div>
  );
}

export function TeamSection({ t, lang }: { t: Dictionary; lang: Locale }) {
  if (TEAM.length === 0) return null;

  return (
    <section className="border-t border-border py-20 md:py-24">
      <Container>
        <Reveal>
          <h2 className="text-h2 max-w-[18ch] text-balance text-ink">
            {t.about.teamTitle}
          </h2>
        </Reveal>

        <Reveal delay={70}>
          <p className="text-lead mt-5 max-w-xl text-muted">
            {t.about.teamLead}
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-14">
          {TEAM.map((member, i) => (
            <Reveal key={member.id} delay={i * 80}>
              <article className="grid gap-8 md:grid-cols-[minmax(0,200px)_1fr] md:items-start md:gap-12">
                <div className="max-w-[200px]">
                  <Avatar name={member.name} photo={member.photo} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="text-h3 text-ink">{member.name}</h3>
                    {member.placeholder && (
                      <PlaceholderBadge>
                        {t.about.teamPlaceholder}
                      </PlaceholderBadge>
                    )}
                  </div>

                  <p className="text-eyebrow mt-2 text-accent">
                    {member.role[lang]}
                  </p>

                  <p className="text-body mt-5 max-w-2xl text-muted">
                    {member.bio[lang]}
                  </p>

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-meta ease-premium mt-6 inline-flex items-center gap-2 font-medium text-ink transition-colors hover:text-accent"
                    >
                      {/* Text link, matching how the footer references
                          LinkedIn — this icon set carries no brand marks. */}
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
