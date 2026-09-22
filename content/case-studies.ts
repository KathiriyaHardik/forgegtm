import type { Locale } from "@/lib/i18n/config";

/**
 * DEMO CONTENT, every company here is fictional and every figure is modelled
 * to illustrate how the work fits together. These are NOT ForgeGTM clients
 * and NOT measured results. The UI renders a visible badge and a disclosure
 * on both the index and detail pages; remove those only when replacing this
 * data with real, client-approved material.
 *
 * To add a case study: append an entry with a unique `slug` and content for
 * every locale. Pages and static params are generated from this array.
 */

export type CaseStudyMetric = {
  value: string;
  label: string;
  note: string;
};

/** One row of the before/after comparison shown on the detail page. */
export type CaseStudyShift = {
  label: string;
  before: string;
  after: string;
};

export type CaseStudyContent = {
  company: string;
  industry: string;
  icp: string;
  title: string;
  summary: string;
  challenge: string;
  situation: string;
  strategy: string;
  approach: string;
  execution: string[];
  messaging: string;
  results: string;
  lessons: string[];
  outcome: string;
  metrics: CaseStudyMetric[];
  beforeAfter: CaseStudyShift[];
  metaTitle: string;
  metaDescription: string;
};

export type CaseStudy = {
  slug: string;
  variant: "arcs" | "lines";
  content: Record<Locale, CaseStudyContent>;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "northfield-analytics",
    variant: "arcs",
    content: {
      en: {
        company: "Northfield Analytics",
        industry: "B2B SaaS · Series B · 90 employees · DACH",
        icp: "Heads of Data and Analytics Engineering leads at 200–2,000 employee companies running a modern data stack, in DACH and the Nordics.",
        title: "Replacing scattergun outbound with a targeted motion.",
        summary:
          "Two SDRs emailing a 40,000-row purchased list, with sub-1% reply rates and a domain already flagged by spam filters.",
        challenge:
          "Northfield had bought a 40,000-contact list and worked it hard for two quarters. Reply rates sat below 1%, the primary domain had started landing in spam, and the sales team had lost confidence that outbound could work at all.",
        situation:
          "All sending ran through the company's primary domain, with no separate infrastructure and no warm-up. Sequences were identical across every segment, personalised only by first name and company name. Nobody was monitoring placement, so the deliverability decline went unnoticed for months, the dashboard showed healthy open rates, which were themselves inflated by image-pixel tracking.",
        strategy:
          "We narrowed the addressable market before touching a single email. Rather than everyone with a data-adjacent job title, the ICP became companies running a specific modern data stack, at a size where a dedicated analytics function exists but a platform team usually does not. That cut the list from 40,000 rows to roughly 1,200 accounts, and made genuine relevance affordable.",
        approach:
          "Sending moved off the primary domain entirely and onto three dedicated domains, warmed over four weeks before any campaign traffic. Targeting was rebuilt around two signals that correlate with an active need: hiring for analytics engineering roles, and recent adoption of a warehouse or transformation tool.",
        execution: [
          "Three dedicated sending domains provisioned with SPF, DKIM and DMARC, then warmed for four weeks.",
          "The 40,000-row list retired; 1,200 accounts rebuilt from firmographic and tech-stack signals.",
          "Two sequences written per segment, differing in the problem they open with rather than the wording.",
          "Volume capped per inbox per day, with placement monitored weekly across major providers.",
          "Replies routed to a shared inbox with a two-hour response SLA during business hours.",
        ],
        messaging:
          "Every email opened with an observation specific to the account (a role being hired, a tool recently adopted), and connected it to a problem that role predictably has in month one. No merge-tag personalisation, no paragraph about Northfield's funding round. The ask was a 20-minute conversation, not a demo.",
        results:
          "Reply rates recovered within the first sending cycle and continued climbing as messaging was tested against real responses. More importantly, the conversations that came back were with the right people: technical buyers who owned the problem, rather than whoever happened to open the email.",
        lessons: [
          "Open rate was the most misleading metric in the account, it looked healthy while placement was failing.",
          "Cutting the list by 97% increased total replies in absolute terms, not just as a percentage.",
          "Warming infrastructure before launch felt slow, and was the single highest-return four weeks of the project.",
        ],
        outcome:
          "Northfield now runs a motion it can forecast against, with the primary domain protected and outbound treated as owned infrastructure rather than a campaign that gets rebuilt every quarter.",
        metrics: [
          { value: "4.1%", label: "Reply rate", note: "from 0.8%" },
          { value: "37", label: "Qualified meetings", note: "in 90 days" },
          { value: "€1.2M", label: "Pipeline generated", note: "modelled" },
          { value: "−97%", label: "Contacts targeted", note: "40,000 → 1,200" },
        ],
        beforeAfter: [
          { label: "Contacts in the target list", before: "40,000 purchased rows", after: "1,200 signal-matched accounts" },
          { label: "Reply rate", before: "0.8%", after: "4.1%" },
          { label: "Sending infrastructure", before: "Primary company domain", after: "Three warmed secondary domains" },
          { label: "Inbox placement", before: "Unmonitored, spam-foldered", after: "Seed-tested every week" },
        ],
        metaTitle: "Case study: rebuilding targeted outbound for a data SaaS",
        metaDescription:
          "How a fictional Series B data company moved from a 40,000-row purchased list to 1,200 signal-matched accounts, and what changed in reply rate and pipeline.",
      },
      de: {
        company: "Northfield Analytics",
        industry: "B2B-SaaS · Series B · 90 Mitarbeitende · DACH",
        icp: "Heads of Data und Analytics-Engineering-Verantwortliche in Unternehmen mit 200–2.000 Mitarbeitenden und modernem Data Stack, in DACH und den Nordics.",
        title: "Vom Gießkannen-Outbound zur gezielten Ansprache.",
        summary:
          "Zwei SDRs bearbeiteten eine gekaufte Liste mit 40.000 Kontakten: Antwortrate unter 1 %, die Hauptdomain bereits von Spam-Filtern markiert.",
        challenge:
          "Northfield hatte eine Liste mit 40.000 Kontakten gekauft und zwei Quartale lang intensiv bearbeitet. Die Antwortrate lag unter 1 %, die Hauptdomain landete zunehmend im Spam, und der Vertrieb glaubte nicht mehr daran, dass Outbound überhaupt funktionieren kann.",
        situation:
          "Der gesamte Versand lief über die Hauptdomain des Unternehmens, ohne separate Infrastruktur und ohne Warm-up. Die Sequenzen waren über alle Segmente hinweg identisch und nur über Vorname und Firmenname personalisiert. Die Platzierung überwachte niemand, weshalb der Einbruch der Zustellbarkeit monatelang unbemerkt blieb: Das Dashboard zeigte gesunde Öffnungsraten, die durch Pixel-Tracking selbst verzerrt waren.",
        strategy:
          "Wir haben den adressierbaren Markt verkleinert, bevor eine einzige E-Mail angefasst wurde. Statt aller Personen mit datennahem Titel umfasste das ICP nun Unternehmen mit einem bestimmten modernen Data Stack, in einer Größe, in der es eine eigene Analytics-Funktion gibt, aber üblicherweise noch kein Plattform-Team. Das reduzierte die Liste von 40.000 Zeilen auf rund 1.200 Accounts, und machte echte Relevanz überhaupt bezahlbar.",
        approach:
          "Der Versand wurde vollständig von der Hauptdomain auf drei dedizierte Domains verlagert, die vier Wochen vor dem ersten Kampagnenverkehr aufgewärmt wurden. Das Targeting bauten wir um zwei Signale herum neu auf, die mit akutem Bedarf korrelieren: Stellenausschreibungen im Analytics Engineering und die kürzliche Einführung eines Warehouse- oder Transformationstools.",
        execution: [
          "Drei dedizierte Versanddomains mit SPF, DKIM und DMARC eingerichtet und vier Wochen aufgewärmt.",
          "Die 40.000er-Liste stillgelegt; 1.200 Accounts aus Firmen- und Tech-Stack-Signalen neu aufgebaut.",
          "Zwei Sequenzen je Segment, die sich im eröffnenden Problem unterscheiden, nicht in der Formulierung.",
          "Volumen pro Postfach und Tag gedeckelt, Platzierung wöchentlich über die großen Anbieter hinweg überwacht.",
          "Antworten in ein gemeinsames Postfach geroutet, mit zwei Stunden Reaktionszeit während der Geschäftszeiten.",
        ],
        messaging:
          "Jede E-Mail begann mit einer Beobachtung zum konkreten Account (eine ausgeschriebene Rolle, ein kürzlich eingeführtes Tool), und verband sie mit einem Problem, das diese Rolle im ersten Monat verlässlich hat. Keine Platzhalter-Personalisierung, kein Absatz über Northfields Finanzierungsrunde. Gefragt wurde nach einem 20-minütigen Gespräch, nicht nach einer Demo.",
        results:
          "Die Antwortraten erholten sich bereits im ersten Versandzyklus und stiegen weiter, während das Messaging gegen echte Antworten getestet wurde. Wichtiger noch: Die Gespräche fanden mit den richtigen Personen statt, technischen Entscheidern, die das Problem verantworten, statt mit denjenigen, die die E-Mail zufällig geöffnet hatten.",
        lessons: [
          "Die Öffnungsrate war die irreführendste Kennzahl im Account, sie sah gesund aus, während die Platzierung versagte.",
          "Die Liste um 97 % zu kürzen erhöhte die Antworten in absoluten Zahlen, nicht nur prozentual.",
          "Die Infrastruktur vor dem Launch aufzuwärmen fühlte sich langsam an und waren die vier ertragreichsten Wochen des Projekts.",
        ],
        outcome:
          "Northfield betreibt heute ein planbares Vorgehen, die Hauptdomain ist geschützt, und Outbound gilt als eigene Infrastruktur statt als Kampagne, die jedes Quartal neu aufgesetzt wird.",
        metrics: [
          { value: "4,1 %", label: "Antwortrate", note: "zuvor 0,8 %" },
          { value: "37", label: "Qualifizierte Termine", note: "in 90 Tagen" },
          { value: "1,2 Mio. €", label: "Erzeugte Pipeline", note: "modelliert" },
          { value: "−97 %", label: "Angesprochene Kontakte", note: "40.000 → 1.200" },
        ],
        beforeAfter: [
          { label: "Kontakte in der Zielliste", before: "40.000 gekaufte Zeilen", after: "1.200 signalbasierte Accounts" },
          { label: "Antwortrate", before: "0,8 %", after: "4,1 %" },
          { label: "Versand-Infrastruktur", before: "Haupt-Domain des Unternehmens", after: "Drei aufgewärmte Zweit-Domains" },
          { label: "Zustellung ins Postfach", before: "Nicht überwacht, im Spam", after: "Wöchentlich per Seed-Test geprüft" },
        ],
        metaTitle: "Case Study: Gezieltes Outbound für ein Data-SaaS neu aufgebaut",
        metaDescription:
          "Wie ein fiktives Series-B-Datenunternehmen von einer gekauften 40.000er-Liste auf 1.200 signalbasierte Accounts wechselte, und was sich bei Antwortrate und Pipeline veränderte.",
      },
    },
  },
  {
    slug: "vantix-industrial",
    variant: "lines",
    content: {
      en: {
        company: "Vantix Industrial",
        industry: "Industrial technology · Growth stage · EU & UK",
        icp: "Operations and plant directors at mid-market manufacturers running multi-site production, initially in DACH, then the Netherlands, Poland and the UK.",
        title: "Taking outbound off the founders' calendars.",
        summary:
          "Both founders were the only people who could run a credible first call, so pipeline stalled whenever they were travelling.",
        challenge:
          "Vantix sold a technical product into a conservative industry, and only the two founders could hold a credible first conversation. New pipeline tracked their availability exactly: strong in quiet months, near zero during delivery pushes or trade-show season.",
        situation:
          "Outbound existed, but it was founder-written, ad hoc and unrepeatable. Two commercial hires had been brought in and neither could reproduce the founders' framing of the problem, so their conversations stalled at the first technical objection. There was no qualification standard, which meant founders spent calls on accounts that were never going to buy.",
        strategy:
          "The goal was not more volume, it was transferability. We treated the founders' pitch as a product to be documented: which problem to open with per segment, which objections arrive in what order, and what makes an account worth a founder's time. Only then did we build the campaigns around it.",
        approach:
          "We recorded and transcribed a dozen founder-led first calls, extracted the recurring framing, and rebuilt it as segment-specific messaging a non-founder could deliver. Qualification criteria were agreed in writing before launch, and the rollout was sequenced one market at a time so messaging could be validated before translation.",
        execution: [
          "Twelve founder-led calls transcribed and analysed for recurring framing and objections.",
          "An objection-handling library written for the six objections that accounted for most stalls.",
          "Segment-specific sequences built for three plant profiles, launched in DACH first.",
          "Written qualification criteria agreed up front; only matching accounts reach a founder's calendar.",
          "Rollout sequenced into the Netherlands, Poland and the UK once DACH messaging held up.",
        ],
        messaging:
          "Messaging led with a specific operational cost the reader could recognise (unplanned downtime on a particular line type, or the reporting burden of multi-site compliance) rather than product capability. Technical credibility came from naming the constraint precisely, which is what the founders had been doing instinctively all along.",
        results:
          "Two non-founder reps could run first conversations with the same credibility, qualification happened before anything reached a founder's calendar, and pipeline stopped tracking the founders' travel schedule.",
        lessons: [
          "The bottleneck was never lead volume. It was that only two people could hold the conversation.",
          "Writing down the objection handling was worth more than any sequence change.",
          "Sequencing markets one at a time surfaced a messaging flaw in DACH that would have been replicated four times over.",
        ],
        outcome:
          "Vantix runs a motion two non-founder reps operate day to day, across four markets, with founders joining only conversations that already meet the qualification bar.",
        metrics: [
          { value: "24", label: "Meetings / month", note: "from 6" },
          { value: "31%", label: "Meeting-to-opportunity", note: "modelled" },
          { value: "4", label: "Markets live", note: "in 6 months" },
          { value: "2", label: "Reps running it", note: "neither a founder" },
        ],
        beforeAfter: [
          { label: "Meetings per month", before: "6", after: "24" },
          { label: "Who can run a first call", before: "Both founders only", after: "Two reps, neither a founder" },
          { label: "Markets running outbound", before: "1 (DACH)", after: "4 (DACH, NL, PL, UK)" },
          { label: "Pipeline during travel season", before: "Close to zero", after: "Unchanged" },
        ],
        metaTitle: "Case study: making founder-led outbound transferable",
        metaDescription:
          "How a fictional industrial technology company productised its founders' pitch into a repeatable outbound motion across four European markets.",
      },
      de: {
        company: "Vantix Industrial",
        industry: "Industrietechnologie · Wachstumsphase · EU & UK",
        icp: "Operations- und Werksleitungen bei mittelständischen Herstellern mit Mehrstandort-Produktion, zunächst in DACH, anschließend Niederlande, Polen und UK.",
        title: "Outbound von den Kalendern der Gründer lösen.",
        summary:
          "Nur die beiden Gründer konnten ein glaubwürdiges Erstgespräch führen, die Pipeline stockte, sobald sie unterwegs waren.",
        challenge:
          "Vantix verkaufte ein technisches Produkt in eine konservative Branche, und nur die beiden Gründer konnten ein glaubwürdiges Erstgespräch führen. Die neue Pipeline folgte exakt ihrer Verfügbarkeit: stark in ruhigen Monaten, nahezu null während Auslieferungsphasen oder der Messesaison.",
        situation:
          "Outbound existierte, war aber von den Gründern selbst geschrieben, situativ und nicht wiederholbar. Zwei Vertriebsmitarbeitende waren eingestellt worden, konnten die Problemdarstellung der Gründer jedoch nicht reproduzieren, ihre Gespräche kamen beim ersten technischen Einwand zum Erliegen. Es gab keinen Qualifizierungsstandard, weshalb die Gründer Zeit in Accounts investierten, die nie gekauft hätten.",
        strategy:
          "Das Ziel war nicht mehr Volumen, sondern Übertragbarkeit. Wir haben den Pitch der Gründer wie ein Produkt behandelt, das dokumentiert werden muss: mit welchem Problem man je Segment eröffnet, welche Einwände in welcher Reihenfolge kommen und was einen Account die Zeit eines Gründers wert macht. Erst danach haben wir die Kampagnen darum herum gebaut.",
        approach:
          "Wir haben ein Dutzend von Gründern geführte Erstgespräche aufgezeichnet und transkribiert, die wiederkehrende Argumentation extrahiert und als segmentspezifisches Messaging neu aufgebaut, das auch ohne Gründer funktioniert. Die Qualifizierungskriterien wurden vor dem Launch schriftlich festgelegt, und der Rollout erfolgte Markt für Markt, damit das Messaging vor der Übersetzung validiert werden konnte.",
        execution: [
          "Zwölf von Gründern geführte Gespräche transkribiert und auf wiederkehrende Argumentation und Einwände analysiert.",
          "Eine Einwandbehandlung für die sechs Einwände verschriftlicht, die den Großteil der Abbrüche ausmachten.",
          "Segmentspezifische Sequenzen für drei Werksprofile aufgebaut, zuerst in DACH gestartet.",
          "Schriftliche Qualifizierungskriterien vorab vereinbart; nur passende Accounts erreichen einen Gründerkalender.",
          "Rollout in die Niederlande, nach Polen und UK, nachdem sich das DACH-Messaging bewährt hatte.",
        ],
        messaging:
          "Das Messaging eröffnete mit konkreten operativen Kosten, die der Leser wiedererkennt (ungeplanter Stillstand an einem bestimmten Linientyp oder der Reporting-Aufwand bei Mehrstandort-Compliance), statt mit Produktfunktionen. Technische Glaubwürdigkeit entstand dadurch, die Einschränkung präzise zu benennen: genau das, was die Gründer intuitiv ohnehin getan hatten.",
        results:
          "Zwei Mitarbeitende ohne Gründerrolle konnten Erstgespräche mit derselben Glaubwürdigkeit führen, die Qualifizierung fand statt, bevor etwas einen Gründerkalender erreichte, und die Pipeline folgte nicht mehr dem Reiseplan der Gründer.",
        lessons: [
          "Der Engpass war nie das Lead-Volumen, sondern dass nur zwei Personen das Gespräch führen konnten.",
          "Die Einwandbehandlung zu verschriftlichen brachte mehr als jede Änderung an den Sequenzen.",
          "Der Rollout Markt für Markt deckte einen Messaging-Fehler in DACH auf, der sonst viermal reproduziert worden wäre.",
        ],
        outcome:
          "Vantix betreibt heute ein Vorgehen, das zwei Mitarbeitende ohne Gründerrolle täglich über vier Märkte hinweg steuern. Die Gründer steigen nur noch in Gespräche ein, die die Qualifizierungshürde bereits genommen haben.",
        metrics: [
          { value: "24", label: "Termine / Monat", note: "zuvor 6" },
          { value: "31 %", label: "Termin zu Opportunity", note: "modelliert" },
          { value: "4", label: "Aktive Märkte", note: "in 6 Monaten" },
          { value: "2", label: "Betreuende Mitarbeitende", note: "ohne Gründerrolle" },
        ],
        beforeAfter: [
          { label: "Termine pro Monat", before: "6", after: "24" },
          { label: "Wer ein Erstgespräch führen kann", before: "Nur die beiden Gründer", after: "Zwei Mitarbeitende, ohne Gründerrolle" },
          { label: "Märkte mit aktivem Outbound", before: "1 (DACH)", after: "4 (DACH, NL, PL, UK)" },
          { label: "Pipeline in der Reisesaison", before: "Nahezu null", after: "Unverändert" },
        ],
        metaTitle: "Case Study: Gründergetriebenes Outbound übertragbar machen",
        metaDescription:
          "Wie ein fiktives Industrietechnologie-Unternehmen den Pitch seiner Gründer in ein wiederholbares Outbound-Vorgehen über vier europäische Märkte überführt hat.",
      },
    },
  },
  {
    slug: "anthemik",
    variant: "arcs",
    content: {
      en: {
        company: "Anthemik",
        industry: "Compliance software · Series A · UK & Nordics",
        icp: "Compliance and risk leads at regulated mid-market financial services firms, 100–800 employees, in the UK and Nordics.",
        title: "Reaching compliance buyers while the deadline is live.",
        summary:
          "Strong product, weak timing. Outreach arrived months before or after the regulatory deadlines that actually drove buying.",
        challenge:
          "Anthemik's product solved a genuine compliance burden, but outreach landed at arbitrary moments. Prospects consistently replied that the topic was relevant but not now, which, in a deadline-driven category, meant the whole motion was mistimed rather than unwanted.",
        situation:
          "Targeting was firmographic only: sector, size, geography. Nothing in the system knew which regulatory obligations applied to which firm, or when. The team was effectively contacting the right companies at the wrong moment and reading the resulting silence as disinterest in the product.",
        strategy:
          "In a deadline-driven category, timing is the targeting. We built the account list around regulatory calendars rather than firmographics alone, mapping which obligations applied to which firm type and working backwards from each deadline to the window when a buyer starts looking for help.",
        approach:
          "Accounts were scored on two things: applicable obligation and distance to deadline. Campaigns were then scheduled into the window where the problem is urgent but a decision is still possible, typically four to five months out, not four weeks.",
        execution: [
          "Regulatory obligations mapped to firm type, size and jurisdiction across the UK and Nordics.",
          "Accounts scored by applicable obligation and months-to-deadline, refreshed monthly.",
          "Campaign scheduling tied to that score rather than to a fixed content calendar.",
          "Second-line messaging built for firms outside the window, to stay present without pitching.",
          "Replies tagged by obligation so the strategy could learn which deadlines convert.",
        ],
        messaging:
          "Emails opened by naming the specific obligation and its date, then the operational consequence of preparing late. No education about the regulation itself, this audience knows it better than any vendor, and no urgency language, since the deadline supplies the urgency on its own.",
        results:
          "The same product and broadly the same copy performed differently once timing became part of targeting. Not-now replies fell sharply, because the campaigns were no longer arriving at a moment when not-now was the only honest answer.",
        lessons: [
          "'Not right now' was a targeting signal, not an objection, and it had been read as rejection for a year.",
          "Manufactured urgency underperformed against simply naming a real date.",
          "Tagging replies by obligation turned the inbox into the most useful research input we had.",
        ],
        outcome:
          "Anthemik now works a rolling list where the ordering is driven by regulatory calendars, and campaigns are timed to when the buyer has both a live problem and room to act on it.",
        metrics: [
          { value: "3.6%", label: "Reply rate", note: "from 1.4%" },
          { value: "−62%", label: "'Not now' replies", note: "modelled" },
          { value: "19", label: "Qualified meetings", note: "per quarter" },
          { value: "5 mo", label: "Optimal outreach window", note: "before deadline" },
        ],
        beforeAfter: [
          { label: "Account targeting basis", before: "Sector, size, geography", after: "Obligation plus distance to deadline" },
          { label: "Reply rate", before: "1.4%", after: "3.6%" },
          { label: "'Not right now' replies", before: "Most common response", after: "Down 62%" },
          { label: "Outreach timing", before: "Arbitrary", after: "4-5 months before deadline" },
        ],
        metaTitle: "Case study: timing outbound to regulatory deadlines",
        metaDescription:
          "How a fictional compliance software company made deadline proximity part of its targeting model, and cut 'not right now' replies.",
      },
      de: {
        company: "Anthemik",
        industry: "Compliance-Software · Series A · UK & Nordics",
        icp: "Compliance- und Risikoverantwortliche in regulierten Finanzdienstleistern des Mittelstands, 100–800 Mitarbeitende, in UK und den Nordics.",
        title: "Compliance-Entscheider erreichen, solange die Frist läuft.",
        summary:
          "Starkes Produkt, schwaches Timing. Die Ansprache kam Monate vor oder nach den regulatorischen Fristen, die den Kauf tatsächlich auslösten.",
        challenge:
          "Anthemiks Produkt löste eine reale Compliance-Last, doch die Ansprache traf zu beliebigen Zeitpunkten ein. Interessenten antworteten durchgehend, das Thema sei relevant, aber nicht jetzt, in einer fristgetriebenen Kategorie hieß das: Das Vorgehen war falsch getaktet, nicht unerwünscht.",
        situation:
          "Das Targeting war rein firmografisch: Branche, Größe, Region. Nichts im System wusste, welche regulatorischen Pflichten für welches Unternehmen galten, und ab wann. Das Team kontaktierte faktisch die richtigen Unternehmen zum falschen Zeitpunkt und deutete das ausbleibende Interesse als Desinteresse am Produkt.",
        strategy:
          "In einer fristgetriebenen Kategorie ist Timing das Targeting. Wir haben die Account-Liste um regulatorische Kalender herum aufgebaut statt allein um Firmendaten: Welche Pflicht gilt für welchen Unternehmenstyp, und von jeder Frist rückwärts gerechnet, wann beginnt ein Käufer, nach Unterstützung zu suchen?",
        approach:
          "Accounts wurden nach zwei Kriterien bewertet: geltende Pflicht und Abstand zur Frist. Die Kampagnen wurden anschließend in das Zeitfenster gelegt, in dem das Problem dringlich, eine Entscheidung aber noch möglich ist, typischerweise vier bis fünf Monate vorher, nicht vier Wochen.",
        execution: [
          "Regulatorische Pflichten nach Unternehmenstyp, Größe und Jurisdiktion für UK und die Nordics kartiert.",
          "Accounts nach geltender Pflicht und Monaten bis zur Frist bewertet, monatlich aktualisiert.",
          "Kampagnenplanung an diese Bewertung gekoppelt statt an einen festen Redaktionskalender.",
          "Zweitlinien-Messaging für Unternehmen außerhalb des Zeitfensters, um präsent zu bleiben, ohne zu pitchen.",
          "Antworten nach Pflicht getaggt, damit die Strategie lernt, welche Fristen konvertieren.",
        ],
        messaging:
          "Die E-Mails benannten zuerst die konkrete Pflicht und ihr Datum, dann die operative Konsequenz einer späten Vorbereitung. Keine Erklärung der Regulierung selbst, diese Zielgruppe kennt sie besser als jeder Anbieter, und keine Dringlichkeitsfloskeln, da die Frist die Dringlichkeit von allein liefert.",
        results:
          "Dasselbe Produkt und weitgehend derselbe Text wirkten anders, sobald Timing Teil des Targetings wurde. Die „Nicht jetzt“-Antworten gingen deutlich zurück, weil die Kampagnen nicht mehr in einem Moment eintrafen, in dem „nicht jetzt“ die einzig ehrliche Antwort war.",
        lessons: [
          "„Gerade nicht“ war ein Targeting-Signal, kein Einwand, und wurde ein Jahr lang als Absage gelesen.",
          "Künstlich erzeugte Dringlichkeit schnitt schlechter ab, als schlicht ein echtes Datum zu nennen.",
          "Antworten nach Pflicht zu taggen machte den Posteingang zur nützlichsten Recherchequelle, die wir hatten.",
        ],
        outcome:
          "Anthemik bearbeitet heute eine rollierende Liste, deren Reihenfolge sich aus regulatorischen Kalendern ergibt. Kampagnen treffen ein, wenn der Käufer sowohl ein akutes Problem als auch Handlungsspielraum hat.",
        metrics: [
          { value: "3,6 %", label: "Antwortrate", note: "zuvor 1,4 %" },
          { value: "−62 %", label: "„Nicht jetzt“-Antworten", note: "modelliert" },
          { value: "19", label: "Qualifizierte Termine", note: "pro Quartal" },
          { value: "5 Mon.", label: "Optimales Zeitfenster", note: "vor der Frist" },
        ],
        beforeAfter: [
          { label: "Grundlage des Account-Targetings", before: "Branche, Größe, Region", after: "Pflicht plus Abstand zur Frist" },
          { label: "Antwortrate", before: "1,4 %", after: "3,6 %" },
          { label: "„Nicht jetzt“-Antworten", before: "Häufigste Reaktion", after: "62 % weniger" },
          { label: "Zeitpunkt der Ansprache", before: "Beliebig", after: "4–5 Monate vor der Frist" },
        ],
        metaTitle: "Case Study: Outbound auf regulatorische Fristen takten",
        metaDescription:
          "Wie ein fiktives Compliance-Software-Unternehmen den Abstand zur Frist zum Bestandteil seines Targetings machte und „nicht jetzt“-Antworten reduzierte.",
      },
    },
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((study) => study.slug === slug);
}
