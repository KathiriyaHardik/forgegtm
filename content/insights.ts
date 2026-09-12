import type { Locale } from "@/lib/i18n/config";

/**
 * Insights articles.
 *
 * Bodies use a small typed block model rather than Markdown, so no parser or
 * MDX toolchain is needed and every article is type-checked. Add a new article
 * by appending to ARTICLES with a unique slug and content for every locale —
 * routes, static params, sitemaps and related-article links follow from it.
 */

export const CATEGORIES = [
  { key: "go-to-market", label: { en: "Go-to-Market", de: "Go-to-Market" } },
  { key: "outbound", label: { en: "Outbound", de: "Outbound" } },
  { key: "lead-generation", label: { en: "Lead Generation", de: "Leadgenerierung" } },
  { key: "cold-email", label: { en: "Cold Email", de: "Cold E-Mail" } },
  { key: "deliverability", label: { en: "Deliverability", de: "Zustellbarkeit" } },
  { key: "icp-targeting", label: { en: "ICP & Targeting", de: "ICP & Targeting" } },
  { key: "sales-strategy", label: { en: "Sales Strategy", de: "Vertriebsstrategie" } },
  { key: "buying-signals", label: { en: "Buying Signals", de: "Kaufsignale" } },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]["key"];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type ArticleContent = {
  title: string;
  description: string;
  excerpt: string;
  body: Block[];
};

export type Article = {
  slug: string;
  category: CategoryKey;
  publishedAt: string;
  author: string;
  content: Record<Locale, ArticleContent>;
};

export const ARTICLES: Article[] = [
  {
    slug: "reply-rate-is-a-deliverability-problem",
    category: "deliverability",
    publishedAt: "2026-08-18",
    author: "ForgeGTM",
    content: {
      en: {
        title: "Your reply rate is a deliverability problem before it is a copy problem",
        description:
          "Most teams rewrite their messaging when replies dry up. Usually the copy was never read. How to tell the difference before wasting a quarter.",
        excerpt:
          "When replies dry up, the instinct is to rewrite. But you cannot diagnose copy that was never delivered — and the metric most teams check first is the one that lies.",
        body: [
          {
            type: "p",
            text: "When reply rates fall, the first instinct is almost always to rewrite the email. It is the most visible variable and the easiest to change. It is also, more often than not, the wrong one — because you cannot evaluate copy that nobody read.",
          },
          {
            type: "h2",
            text: "Open rate is the metric that lies",
          },
          {
            type: "p",
            text: "Open tracking works by loading a tiny image. Privacy proxies — Apple Mail Privacy Protection chief among them — pre-load that image whether or not a human ever looked at the message. Security scanners do the same. The result is an open rate that can stay comfortably in the thirties while actual human attention collapses.",
          },
          {
            type: "p",
            text: "This is why deliverability failures are so often discovered late. Nothing in the dashboard turns red. The number everyone watches stays healthy, and the number that matters — replies — drifts down slowly enough to be blamed on messaging, seasonality, or the market.",
          },
          {
            type: "h2",
            text: "Diagnose placement before touching the copy",
          },
          {
            type: "p",
            text: "Before rewriting anything, establish where your mail is landing. A few checks will tell you more than a week of copy workshops:",
          },
          {
            type: "ul",
            items: [
              "Seed inboxes across the providers your ICP actually uses, and check placement — primary, promotions, or spam — not just delivery.",
              "Confirm SPF, DKIM and DMARC are aligned on every sending domain, not only the primary one.",
              "Check reply rate segmented by recipient provider. A healthy rate at one provider and near-zero at another is a placement signal, not a messaging signal.",
              "Look at bounce composition. A rising soft-bounce rate usually precedes a filtering problem by a few weeks.",
            ],
          },
          {
            type: "p",
            text: "If placement is the problem, no amount of rewriting will fix it — and worse, you will conclude that a perfectly good angle failed, and discard it.",
          },
          {
            type: "h2",
            text: "The order of operations",
          },
          {
            type: "p",
            text: "Fix the infrastructure first, then the targeting, then the copy. This order matters because each stage invalidates the measurement of the one after it. Copy tested on a domain that is being filtered produces noise. Targeting evaluated against copy nobody read produces noise. Only once mail reliably lands can you learn anything from a message test.",
          },
          {
            type: "quote",
            text: "Copy is the last thing to optimise, not the first. It is the only one whose results you can trust once everything beneath it is sound.",
          },
          {
            type: "p",
            text: "None of this means messaging does not matter. It matters enormously — which is precisely why it deserves to be tested under conditions where the results mean something.",
          },
        ],
      },
      de: {
        title: "Ihre Antwortrate ist zuerst ein Zustellbarkeitsproblem, nicht ein Textproblem",
        description:
          "Wenn die Antworten ausbleiben, schreiben die meisten Teams das Messaging neu. Meist wurde der Text nie gelesen. Wie Sie den Unterschied erkennen, bevor ein Quartal verloren geht.",
        excerpt:
          "Bleiben Antworten aus, folgt reflexhaft der Textumbau. Doch Texte, die nie zugestellt wurden, lassen sich nicht bewerten — und die Kennzahl, die zuerst geprüft wird, ist genau die, die täuscht.",
        body: [
          {
            type: "p",
            text: "Wenn die Antwortraten fallen, lautet der erste Reflex fast immer: die E-Mail neu schreiben. Das ist die sichtbarste Variable und die am leichtesten veränderbare. Meist ist es allerdings die falsche — denn Texte, die niemand gelesen hat, lassen sich nicht bewerten.",
          },
          {
            type: "h2",
            text: "Die Öffnungsrate ist die Kennzahl, die täuscht",
          },
          {
            type: "p",
            text: "Öffnungs-Tracking funktioniert über das Laden eines winzigen Bildes. Datenschutz-Proxys — allen voran Apple Mail Privacy Protection — laden dieses Bild vor, unabhängig davon, ob ein Mensch die Nachricht je gesehen hat. Sicherheitsscanner tun dasselbe. Das Ergebnis ist eine Öffnungsrate, die komfortabel bei über 30 % liegen kann, während die tatsächliche Aufmerksamkeit einbricht.",
          },
          {
            type: "p",
            text: "Deshalb werden Zustellbarkeitsprobleme so häufig spät entdeckt. Im Dashboard springt nichts auf Rot. Die Zahl, die alle beobachten, bleibt gesund, und die Zahl, auf die es ankommt — Antworten — sinkt langsam genug, um sie dem Messaging, der Saison oder dem Markt zuzuschreiben.",
          },
          {
            type: "h2",
            text: "Erst die Platzierung prüfen, dann den Text",
          },
          {
            type: "p",
            text: "Bevor Sie irgendetwas umschreiben, klären Sie, wo Ihre Mails landen. Wenige Prüfungen sagen mehr aus als eine Woche Text-Workshops:",
          },
          {
            type: "ul",
            items: [
              "Seed-Postfächer bei den Anbietern anlegen, die Ihr ICP tatsächlich nutzt, und die Platzierung prüfen — Posteingang, Werbung oder Spam, nicht nur die Zustellung.",
              "Prüfen, ob SPF, DKIM und DMARC auf jeder Versanddomain sauber ausgerichtet sind, nicht nur auf der Hauptdomain.",
              "Die Antwortrate nach Empfängeranbieter segmentieren. Eine gute Rate bei einem Anbieter und nahezu null bei einem anderen ist ein Platzierungssignal, kein Messaging-Signal.",
              "Die Zusammensetzung der Bounces ansehen. Eine steigende Soft-Bounce-Rate geht einem Filterproblem meist einige Wochen voraus.",
            ],
          },
          {
            type: "p",
            text: "Liegt das Problem in der Platzierung, hilft kein Umschreiben — schlimmer noch: Sie verwerfen einen völlig tragfähigen Ansatz in dem Glauben, er habe nicht funktioniert.",
          },
          {
            type: "h2",
            text: "Die richtige Reihenfolge",
          },
          {
            type: "p",
            text: "Zuerst die Infrastruktur, dann das Targeting, dann der Text. Diese Reihenfolge ist entscheidend, weil jede Stufe die Messbarkeit der nächsten zunichtemacht. Texte, die auf einer gefilterten Domain getestet werden, erzeugen Rauschen. Targeting, das gegen ungelesene Texte bewertet wird, erzeugt Rauschen. Erst wenn Mails zuverlässig ankommen, lässt sich aus einem Messaging-Test überhaupt etwas lernen.",
          },
          {
            type: "quote",
            text: "Der Text ist das Letzte, was optimiert wird, nicht das Erste. Er ist der einzige Hebel, dessen Ergebnissen man trauen kann, sobald alles darunter stimmt.",
          },
          {
            type: "p",
            text: "Nichts davon bedeutet, dass Messaging unwichtig wäre. Es ist enorm wichtig — und genau deshalb verdient es, unter Bedingungen getestet zu werden, unter denen die Ergebnisse etwas bedeuten.",
          },
        ],
      },
    },
  },
  {
    slug: "narrowing-your-icp",
    category: "icp-targeting",
    publishedAt: "2026-07-29",
    author: "ForgeGTM",
    content: {
      en: {
        title: "Narrowing your ICP is the highest-leverage change in outbound",
        description:
          "Cutting your target list by 90% usually increases total replies. Why a smaller, sharper ICP outperforms broad reach in B2B outbound.",
        excerpt:
          "A broader list feels safer — more addressable market, more shots on goal. In practice it lowers every number that matters, including absolute reply volume.",
        body: [
          {
            type: "p",
            text: "A broad list feels like the safer choice. More addressable market, more shots on goal, more pipeline at the top. In practice, broadening the list lowers almost every number that matters — including, counter-intuitively, the absolute number of replies.",
          },
          {
            type: "h2",
            text: "Why breadth actively costs you",
          },
          {
            type: "p",
            text: "Relevance has a fixed cost per account. Researching a company properly, understanding what it is dealing with, and writing something a specific person would recognise takes time. Spread that budget across 40,000 accounts and each one gets nothing. Spread it across 1,200 and each one can get something real.",
          },
          {
            type: "p",
            text: "There is a second, harsher cost. Sending high volumes of low-relevance mail damages your sending reputation, which degrades placement for everyone on the list — including the few hundred accounts that genuinely were a good fit. Breadth does not just dilute attention; it actively taxes the part of the list you cared about.",
          },
          {
            type: "h2",
            text: "What a usable ICP contains",
          },
          {
            type: "p",
            text: "Most ICP documents are too abstract to change a targeting decision. A usable one answers questions a list-builder can act on:",
          },
          {
            type: "ul",
            items: [
              "What has to be true operationally for this problem to exist? Not the industry — the condition.",
              "Which observable proxy indicates that condition? Headcount in a function, a tool in the stack, a regulatory obligation, a specific job opening.",
              "Who owns the consequence? Not who signs, but who is measured on the thing going wrong.",
              "What disqualifies an account, explicitly? An ICP without exclusions is a wish list.",
            ],
          },
          {
            type: "p",
            text: "The last one does most of the work. Teams are usually comfortable describing who might buy and deeply uncomfortable writing down who will not — which is exactly why lists stay bloated.",
          },
          {
            type: "h2",
            text: "How to narrow without losing your nerve",
          },
          {
            type: "p",
            text: "Start from the accounts that already closed well and look for the shared operational condition, not the shared firmographics. Two companies in different industries with the same constraint are a better segment than two companies in the same industry with different constraints.",
          },
          {
            type: "quote",
            text: "If you cannot name the condition that makes an account a fit, you are not targeting. You are sampling.",
          },
          {
            type: "p",
            text: "Then test the narrower definition properly before widening again. The failure mode we see most often is a team narrowing, seeing lower total send volume, panicking, and reverting before the reply data comes back.",
          },
        ],
      },
      de: {
        title: "Ein engeres ICP ist der wirksamste Hebel im Outbound",
        description:
          "Die Zielliste um 90 % zu kürzen erhöht meist die Gesamtzahl der Antworten. Warum ein kleineres, schärferes ICP breite Reichweite im B2B-Outbound schlägt.",
        excerpt:
          "Eine breitere Liste fühlt sich sicherer an — mehr adressierbarer Markt, mehr Versuche. In der Praxis senkt sie jede relevante Kennzahl, auch die absolute Zahl der Antworten.",
        body: [
          {
            type: "p",
            text: "Eine breite Liste wirkt wie die sicherere Wahl. Mehr adressierbarer Markt, mehr Versuche, mehr Pipeline am oberen Ende. Tatsächlich senkt eine Verbreiterung fast jede relevante Kennzahl — auch, wider Erwarten, die absolute Zahl der Antworten.",
          },
          {
            type: "h2",
            text: "Warum Breite Sie aktiv Geld kostet",
          },
          {
            type: "p",
            text: "Relevanz hat feste Kosten pro Account. Ein Unternehmen sauber zu recherchieren, zu verstehen, womit es sich gerade beschäftigt, und etwas zu schreiben, das eine bestimmte Person wiedererkennt, kostet Zeit. Verteilen Sie dieses Budget auf 40.000 Accounts, bekommt jeder nichts. Verteilen Sie es auf 1.200, kann jeder etwas Echtes bekommen.",
          },
          {
            type: "p",
            text: "Hinzu kommt ein härterer zweiter Kostenfaktor. Große Mengen wenig relevanter Mails schädigen Ihre Versandreputation, was die Platzierung für alle auf der Liste verschlechtert — auch für die wenigen hundert Accounts, die wirklich gepasst hätten. Breite verwässert nicht nur die Aufmerksamkeit, sie belastet gezielt den Teil der Liste, auf den es ankam.",
          },
          {
            type: "h2",
            text: "Was ein brauchbares ICP enthält",
          },
          {
            type: "p",
            text: "Die meisten ICP-Dokumente sind zu abstrakt, um eine Targeting-Entscheidung zu verändern. Ein brauchbares beantwortet Fragen, mit denen ein Listenaufbau tatsächlich arbeiten kann:",
          },
          {
            type: "ul",
            items: [
              "Was muss operativ zutreffen, damit dieses Problem überhaupt existiert? Nicht die Branche — die Bedingung.",
              "Welcher beobachtbare Indikator zeigt diese Bedingung an? Personalstärke in einer Funktion, ein Tool im Stack, eine regulatorische Pflicht, eine konkrete Stellenausschreibung.",
              "Wer trägt die Konsequenz? Nicht wer unterschreibt, sondern wer daran gemessen wird, dass es schiefgeht.",
              "Was disqualifiziert einen Account ausdrücklich? Ein ICP ohne Ausschlusskriterien ist eine Wunschliste.",
            ],
          },
          {
            type: "p",
            text: "Der letzte Punkt leistet die meiste Arbeit. Teams beschreiben bereitwillig, wer kaufen könnte, und sträuben sich zutiefst dagegen, festzuhalten, wer es nicht tun wird — genau deshalb bleiben Listen aufgebläht.",
          },
          {
            type: "h2",
            text: "Enger werden, ohne die Nerven zu verlieren",
          },
          {
            type: "p",
            text: "Beginnen Sie bei den Accounts, die bereits gut abgeschlossen haben, und suchen Sie die gemeinsame operative Bedingung, nicht die gemeinsamen Firmendaten. Zwei Unternehmen aus verschiedenen Branchen mit derselben Einschränkung sind ein besseres Segment als zwei Unternehmen derselben Branche mit unterschiedlichen Einschränkungen.",
          },
          {
            type: "quote",
            text: "Wer die Bedingung nicht benennen kann, die einen Account passend macht, betreibt kein Targeting, sondern eine Stichprobe.",
          },
          {
            type: "p",
            text: "Testen Sie die engere Definition dann sauber, bevor Sie wieder verbreitern. Der häufigste Fehler: Ein Team verengt, sieht ein geringeres Versandvolumen, bekommt es mit der Angst zu tun und macht die Änderung rückgängig, bevor die Antwortdaten überhaupt vorliegen.",
          },
        ],
      },
    },
  },
  {
    slug: "buying-signals-that-predict-a-reply",
    category: "buying-signals",
    publishedAt: "2026-07-08",
    author: "ForgeGTM",
    content: {
      en: {
        title: "Which buying signals actually predict a reply",
        description:
          "Funding rounds are the most used and least useful outbound trigger. A practical ranking of buying signals by how well they predict a response.",
        excerpt:
          "Not all triggers are equal. Some correlate with an active problem; others just correlate with being easy to scrape.",
        body: [
          {
            type: "p",
            text: "Signal-based outbound is now standard advice, which means most teams use the same signals — and mostly the ones that are easiest to obtain rather than the ones that predict anything.",
          },
          {
            type: "h2",
            text: "Funding rounds are overrated",
          },
          {
            type: "p",
            text: "A funding announcement tells you a company has money. It does not tell you it has your problem, that anyone has been made responsible for solving it, or that the budget is unallocated. It is also visible to every other vendor simultaneously, which means the buyer receives dozens of near-identical emails in the same fortnight.",
          },
          {
            type: "p",
            text: "Funding works as a qualifier — can they afford this — and poorly as a trigger. The distinction matters: qualifiers narrow a list, triggers decide when to send.",
          },
          {
            type: "h2",
            text: "Signals ranked by predictive value",
          },
          {
            type: "ul",
            items: [
              "A specific role being hired. Someone has been made accountable for a problem, has a mandate, and arrives looking for tooling. Strong and specific.",
              "A tool appearing in the stack. Adoption creates adjacent needs on a predictable timeline — integration, migration, reporting.",
              "A regulatory or contractual deadline. Timing is externally imposed and knowable in advance, which makes it the most schedulable signal there is.",
              "Leadership change in the owning function. New leaders review vendors and processes in their first 90 days more than at any other point.",
              "Public complaints about a workflow. Rare, but the highest-intent signal available when it exists.",
              "Funding. A qualifier, not a trigger.",
            ],
          },
          {
            type: "h2",
            text: "The test for any signal",
          },
          {
            type: "p",
            text: "Before adding a signal to your targeting, ask whether you can write a first sentence that would be false for an account without it. If the opening line works equally well for any company in the sector, the signal is decorative — you have added a research step that produces no relevance.",
          },
          {
            type: "quote",
            text: "A signal you cannot write a specific first line from is not a signal. It is a filter you are describing as one.",
          },
          {
            type: "p",
            text: "Then track replies by signal type. Most teams tag replies by campaign, which tells you which email performed. Tagging by signal tells you something far more durable: which conditions make a company want to talk at all.",
          },
        ],
      },
      de: {
        title: "Welche Kaufsignale tatsächlich eine Antwort vorhersagen",
        description:
          "Finanzierungsrunden sind der meistgenutzte und am wenigsten nützliche Outbound-Trigger. Eine praxisnahe Rangfolge von Kaufsignalen nach ihrer Vorhersagekraft.",
        excerpt:
          "Nicht alle Trigger sind gleich. Manche korrelieren mit einem akuten Problem, andere nur damit, dass sie leicht zu erheben sind.",
        body: [
          {
            type: "p",
            text: "Signalbasiertes Outbound gilt inzwischen als Standardempfehlung — mit der Folge, dass die meisten Teams dieselben Signale nutzen. Und zwar überwiegend die am leichtesten verfügbaren statt der aussagekräftigen.",
          },
          {
            type: "h2",
            text: "Finanzierungsrunden werden überschätzt",
          },
          {
            type: "p",
            text: "Eine Finanzierungsmeldung sagt Ihnen, dass ein Unternehmen Geld hat. Sie sagt nicht, dass es Ihr Problem hat, dass jemand für dessen Lösung verantwortlich gemacht wurde oder dass das Budget noch frei ist. Zudem ist sie für alle Anbieter gleichzeitig sichtbar — der Käufer erhält binnen zwei Wochen Dutzende nahezu identischer Mails.",
          },
          {
            type: "p",
            text: "Finanzierung funktioniert als Qualifizierungskriterium — kann sich das Unternehmen das leisten — und schlecht als Trigger. Der Unterschied ist wesentlich: Qualifizierungskriterien verengen eine Liste, Trigger bestimmen den Versandzeitpunkt.",
          },
          {
            type: "h2",
            text: "Signale nach Vorhersagekraft",
          },
          {
            type: "ul",
            items: [
              "Eine konkrete ausgeschriebene Rolle. Jemand wurde für ein Problem verantwortlich gemacht, hat ein Mandat und sucht nach Werkzeugen. Stark und spezifisch.",
              "Ein neues Tool im Stack. Die Einführung erzeugt angrenzende Bedarfe auf vorhersehbarer Zeitachse — Integration, Migration, Reporting.",
              "Eine regulatorische oder vertragliche Frist. Der Zeitpunkt ist extern vorgegeben und im Voraus bekannt — das planbarste Signal überhaupt.",
              "Führungswechsel in der verantwortlichen Funktion. Neue Führungskräfte prüfen Anbieter und Prozesse in den ersten 90 Tagen intensiver als zu jedem anderen Zeitpunkt.",
              "Öffentliche Kritik an einem Arbeitsablauf. Selten, aber das Signal mit der höchsten Kaufabsicht, wenn es auftritt.",
              "Finanzierung. Ein Qualifizierungskriterium, kein Trigger.",
            ],
          },
          {
            type: "h2",
            text: "Der Test für jedes Signal",
          },
          {
            type: "p",
            text: "Bevor Sie ein Signal ins Targeting aufnehmen, fragen Sie sich, ob Sie einen ersten Satz formulieren können, der für einen Account ohne dieses Signal falsch wäre. Funktioniert der Einstieg für jedes Unternehmen der Branche gleich gut, ist das Signal dekorativ — Sie haben einen Rechercheschritt hinzugefügt, der keine Relevanz erzeugt.",
          },
          {
            type: "quote",
            text: "Ein Signal, aus dem sich kein spezifischer erster Satz schreiben lässt, ist kein Signal, sondern ein Filter, den man so nennt.",
          },
          {
            type: "p",
            text: "Erfassen Sie Antworten anschließend nach Signaltyp. Die meisten Teams taggen nach Kampagne — das zeigt, welche Mail funktioniert hat. Nach Signal zu taggen zeigt etwas weit Beständigeres: welche Bedingungen ein Unternehmen überhaupt gesprächsbereit machen.",
          },
        ],
      },
    },
  },
  {
    slug: "what-to-measure-in-outbound",
    category: "sales-strategy",
    publishedAt: "2026-06-24",
    author: "ForgeGTM",
    content: {
      en: {
        title: "What to measure in outbound, and what to ignore",
        description:
          "Emails sent is not a result. A short framework for outbound reporting that survives contact with a board meeting.",
        excerpt:
          "Most outbound dashboards report effort. A useful one reports whether the motion is worth continuing — and at what cost per qualified opportunity.",
        body: [
          {
            type: "p",
            text: "Most outbound reporting measures effort. Emails sent, sequences live, connects attempted. These are easy to collect, always go up when you work harder, and tell you almost nothing about whether the motion should continue.",
          },
          {
            type: "h2",
            text: "Three numbers that matter",
          },
          {
            type: "p",
            text: "Outbound reporting can be reduced to three questions, and most of the rest is diagnostic detail beneath them.",
          },
          {
            type: "ul",
            items: [
              "Qualified meetings: conversations with someone who owns the problem and matches the agreed criteria. Agree the definition in writing before launch, or this number will quietly drift.",
              "Opportunities created: meetings that became real, forecastable deals. The gap between this and qualified meetings tells you whether the qualification bar is honest.",
              "Cost per qualified opportunity: total cost of the motion divided by opportunities. The only number that makes outbound comparable to every other channel.",
            ],
          },
          {
            type: "h2",
            text: "Useful diagnostics, bad targets",
          },
          {
            type: "p",
            text: "Reply rate, placement and meeting-to-opportunity conversion are genuinely useful — as diagnostics. They tell you where a motion is breaking. They are poor targets, because each can be improved in ways that hurt the numbers above. Reply rate rises if you ask for less. Meeting volume rises if you lower the qualification bar.",
          },
          {
            type: "quote",
            text: "Any metric that can be improved by lowering a standard will be, eventually, unless something above it is the actual target.",
          },
          {
            type: "h2",
            text: "The reporting cadence",
          },
          {
            type: "p",
            text: "Placement and reply rate are worth watching weekly, because they move fast and degrade quietly. Qualified meetings make sense monthly. Cost per qualified opportunity only becomes meaningful quarterly — earlier than that, sample sizes are too small to act on, and reacting to noise is how teams end up rebuilding a motion that was working.",
          },
          {
            type: "p",
            text: "One practical test: if your outbound report were shown to the board without commentary, would it answer whether to invest more, hold, or stop? If not, it is measuring activity.",
          },
        ],
      },
      de: {
        title: "Was im Outbound zu messen ist — und was nicht",
        description:
          "Versendete E-Mails sind kein Ergebnis. Ein knappes Framework für Outbound-Reporting, das auch einer Vorstandssitzung standhält.",
        excerpt:
          "Die meisten Outbound-Dashboards berichten Aufwand. Ein brauchbares berichtet, ob sich das Vorgehen lohnt — und zu welchen Kosten pro qualifizierter Opportunity.",
        body: [
          {
            type: "p",
            text: "Die meisten Outbound-Reportings messen Aufwand: versendete E-Mails, aktive Sequenzen, Anwahlversuche. Diese Zahlen sind leicht zu erheben, steigen immer, wenn mehr gearbeitet wird, und sagen fast nichts darüber aus, ob das Vorgehen fortgesetzt werden sollte.",
          },
          {
            type: "h2",
            text: "Drei Zahlen, auf die es ankommt",
          },
          {
            type: "p",
            text: "Outbound-Reporting lässt sich auf drei Fragen reduzieren; fast alles andere sind Diagnosedetails darunter.",
          },
          {
            type: "ul",
            items: [
              "Qualifizierte Termine: Gespräche mit Personen, die das Problem verantworten und den vereinbarten Kriterien entsprechen. Die Definition vor dem Launch schriftlich festhalten, sonst verwässert diese Zahl unbemerkt.",
              "Erzeugte Opportunities: Termine, aus denen echte, prognostizierbare Deals wurden. Der Abstand zu den qualifizierten Terminen zeigt, ob die Qualifizierungshürde ehrlich ist.",
              "Kosten pro qualifizierter Opportunity: Gesamtkosten des Vorgehens geteilt durch Opportunities. Die einzige Zahl, die Outbound mit jedem anderen Kanal vergleichbar macht.",
            ],
          },
          {
            type: "h2",
            text: "Nützliche Diagnosewerte, schlechte Zielgrößen",
          },
          {
            type: "p",
            text: "Antwortrate, Platzierung und die Conversion von Termin zu Opportunity sind echt nützlich — als Diagnosewerte. Sie zeigen, wo ein Vorgehen bricht. Als Zielgrößen taugen sie wenig, weil sich jede auf eine Weise verbessern lässt, die den Zahlen darüber schadet. Die Antwortrate steigt, wenn man weniger verlangt. Das Terminvolumen steigt, wenn man die Qualifizierungshürde senkt.",
          },
          {
            type: "quote",
            text: "Jede Kennzahl, die sich durch das Senken eines Standards verbessern lässt, wird irgendwann genau so verbessert — es sei denn, etwas darüber ist die eigentliche Zielgröße.",
          },
          {
            type: "h2",
            text: "Der Reporting-Rhythmus",
          },
          {
            type: "p",
            text: "Platzierung und Antwortrate lohnen eine wöchentliche Beobachtung, weil sie sich schnell bewegen und leise verschlechtern. Qualifizierte Termine ergeben monatlich Sinn. Die Kosten pro qualifizierter Opportunity werden erst quartalsweise aussagekräftig — davor sind die Stichproben zu klein, und auf Rauschen zu reagieren ist der übliche Weg, ein funktionierendes Vorgehen wieder abzureißen.",
          },
          {
            type: "p",
            text: "Ein praktischer Test: Würde Ihr Outbound-Report ohne Kommentar im Vorstand gezeigt — beantwortete er, ob mehr investiert, gehalten oder gestoppt werden sollte? Wenn nicht, misst er Aktivität.",
          },
        ],
      },
    },
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getCategory(key: CategoryKey) {
  return CATEGORIES.find((category) => category.key === key);
}

/** Sorted newest first — the order articles are listed in. */
export function sortedArticles() {
  return [...ARTICLES].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

/** ~200 words per minute, rounded up, with a one-minute floor. */
export function readingMinutes(body: Block[]) {
  const words = body.reduce((total, block) => {
    if (block.type === "ul") {
      return total + block.items.join(" ").split(/\s+/).length;
    }
    return total + block.text.split(/\s+/).length;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}
