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
          "When replies dry up, the instinct is to rewrite. But you cannot diagnose copy that was never delivered, and the metric most teams check first is the one that lies.",
        body: [
          {
            type: "p",
            text: "When reply rates fall, the first instinct is almost always to rewrite the email. It is the most visible variable and the easiest to change. It is also, more often than not, the wrong one, because you cannot evaluate copy that nobody read.",
          },
          {
            type: "h2",
            text: "Open rate is the metric that lies",
          },
          {
            type: "p",
            text: "Open tracking works by loading a tiny image. Privacy proxies, Apple Mail Privacy Protection chief among them, pre-load that image whether or not a human ever looked at the message. Security scanners do the same. The result is an open rate that can stay comfortably in the thirties while actual human attention collapses.",
          },
          {
            type: "p",
            text: "This is why deliverability failures are so often discovered late. Nothing in the dashboard turns red. The number everyone watches stays healthy, and the number that matters, replies, drifts down slowly enough to be blamed on messaging, seasonality, or the market.",
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
              "Seed inboxes across the providers your ICP actually uses, and check placement (primary, promotions, or spam), not just delivery.",
              "Confirm SPF, DKIM and DMARC are aligned on every sending domain, not only the primary one.",
              "Check reply rate segmented by recipient provider. A healthy rate at one provider and near-zero at another is a placement signal, not a messaging signal.",
              "Look at bounce composition. A rising soft-bounce rate usually precedes a filtering problem by a few weeks.",
            ],
          },
          {
            type: "p",
            text: "If placement is the problem, no amount of rewriting will fix it. Worse, you will conclude that a perfectly good angle failed, and discard it.",
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
            text: "None of this means messaging does not matter. It matters enormously, which is precisely why it deserves to be tested under conditions where the results mean something.",
          },
        ],
      },
      de: {
        title: "Ihre Antwortrate ist zuerst ein Zustellbarkeitsproblem, nicht ein Textproblem",
        description:
          "Wenn die Antworten ausbleiben, schreiben die meisten Teams das Messaging neu. Meist wurde der Text nie gelesen. Wie Sie den Unterschied erkennen, bevor ein Quartal verloren geht.",
        excerpt:
          "Bleiben Antworten aus, folgt reflexhaft der Textumbau. Doch Texte, die nie zugestellt wurden, lassen sich nicht bewerten, und die Kennzahl, die zuerst geprüft wird, ist genau die, die täuscht.",
        body: [
          {
            type: "p",
            text: "Wenn die Antwortraten fallen, lautet der erste Reflex fast immer: die E-Mail neu schreiben. Das ist die sichtbarste Variable und die am leichtesten veränderbare. Meist ist es allerdings die falsche, denn Texte, die niemand gelesen hat, lassen sich nicht bewerten.",
          },
          {
            type: "h2",
            text: "Die Öffnungsrate ist die Kennzahl, die täuscht",
          },
          {
            type: "p",
            text: "Öffnungs-Tracking funktioniert über das Laden eines winzigen Bildes. Datenschutz-Proxys, allen voran Apple Mail Privacy Protection, laden dieses Bild vor, unabhängig davon, ob ein Mensch die Nachricht je gesehen hat. Sicherheitsscanner tun dasselbe. Das Ergebnis ist eine Öffnungsrate, die komfortabel bei über 30 % liegen kann, während die tatsächliche Aufmerksamkeit einbricht.",
          },
          {
            type: "p",
            text: "Deshalb werden Zustellbarkeitsprobleme so häufig spät entdeckt. Im Dashboard springt nichts auf Rot. Die Zahl, die alle beobachten, bleibt gesund, und die Zahl, auf die es ankommt, Antworten, sinkt langsam genug, um sie dem Messaging, der Saison oder dem Markt zuzuschreiben.",
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
              "Seed-Postfächer bei den Anbietern anlegen, die Ihr ICP tatsächlich nutzt, und die Platzierung prüfen, Posteingang, Werbung oder Spam, nicht nur die Zustellung.",
              "Prüfen, ob SPF, DKIM und DMARC auf jeder Versanddomain sauber ausgerichtet sind, nicht nur auf der Hauptdomain.",
              "Die Antwortrate nach Empfängeranbieter segmentieren. Eine gute Rate bei einem Anbieter und nahezu null bei einem anderen ist ein Platzierungssignal, kein Messaging-Signal.",
              "Die Zusammensetzung der Bounces ansehen. Eine steigende Soft-Bounce-Rate geht einem Filterproblem meist einige Wochen voraus.",
            ],
          },
          {
            type: "p",
            text: "Liegt das Problem in der Platzierung, hilft kein Umschreiben. Schlimmer noch: Sie verwerfen einen völlig tragfähigen Ansatz in dem Glauben, er habe nicht funktioniert.",
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
            text: "Nichts davon bedeutet, dass Messaging unwichtig wäre. Es ist enorm wichtig, und genau deshalb verdient es, unter Bedingungen getestet zu werden, unter denen die Ergebnisse etwas bedeuten.",
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
          "A broader list feels safer: more addressable market, more shots on goal. In practice it lowers every number that matters, including absolute reply volume.",
        body: [
          {
            type: "p",
            text: "A broad list feels like the safer choice. More addressable market, more shots on goal, more pipeline at the top. In practice, broadening the list lowers almost every number that matters, including, counter-intuitively, the absolute number of replies.",
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
            text: "There is a second, harsher cost. Sending high volumes of low-relevance mail damages your sending reputation, which degrades placement for everyone on the list, including the few hundred accounts that genuinely were a good fit. Breadth does not just dilute attention; it actively taxes the part of the list you cared about.",
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
              "What has to be true operationally for this problem to exist? Not the industry. The condition.",
              "Which observable proxy indicates that condition? Headcount in a function, a tool in the stack, a regulatory obligation, a specific job opening.",
              "Who owns the consequence? Not who signs, but who is measured on the thing going wrong.",
              "What disqualifies an account, explicitly? An ICP without exclusions is a wish list.",
            ],
          },
          {
            type: "p",
            text: "The last one does most of the work. Teams are usually comfortable describing who might buy and deeply uncomfortable writing down who will not, which is exactly why lists stay bloated.",
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
          "Eine breitere Liste fühlt sich sicherer an: mehr adressierbarer Markt, mehr Versuche. In der Praxis senkt sie jede relevante Kennzahl, auch die absolute Zahl der Antworten.",
        body: [
          {
            type: "p",
            text: "Eine breite Liste wirkt wie die sicherere Wahl. Mehr adressierbarer Markt, mehr Versuche, mehr Pipeline am oberen Ende. Tatsächlich senkt eine Verbreiterung fast jede relevante Kennzahl, auch, wider Erwarten, die absolute Zahl der Antworten.",
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
            text: "Hinzu kommt ein härterer zweiter Kostenfaktor. Große Mengen wenig relevanter Mails schädigen Ihre Versandreputation, was die Platzierung für alle auf der Liste verschlechtert, auch für die wenigen hundert Accounts, die wirklich gepasst hätten. Breite verwässert nicht nur die Aufmerksamkeit, sie belastet gezielt den Teil der Liste, auf den es ankam.",
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
              "Was muss operativ zutreffen, damit dieses Problem überhaupt existiert? Nicht die Branche. Die Bedingung.",
              "Welcher beobachtbare Indikator zeigt diese Bedingung an? Personalstärke in einer Funktion, ein Tool im Stack, eine regulatorische Pflicht, eine konkrete Stellenausschreibung.",
              "Wer trägt die Konsequenz? Nicht wer unterschreibt, sondern wer daran gemessen wird, dass es schiefgeht.",
              "Was disqualifiziert einen Account ausdrücklich? Ein ICP ohne Ausschlusskriterien ist eine Wunschliste.",
            ],
          },
          {
            type: "p",
            text: "Der letzte Punkt leistet die meiste Arbeit. Teams beschreiben bereitwillig, wer kaufen könnte, und sträuben sich zutiefst dagegen, festzuhalten, wer es nicht tun wird, genau deshalb bleiben Listen aufgebläht.",
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
            text: "Signal-based outbound is now standard advice, which means most teams use the same signals, and mostly the ones that are easiest to obtain rather than the ones that predict anything.",
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
            text: "Funding works as a qualifier, can they afford this, and poorly as a trigger. The distinction matters: qualifiers narrow a list, triggers decide when to send.",
          },
          {
            type: "h2",
            text: "Signals ranked by predictive value",
          },
          {
            type: "ul",
            items: [
              "A specific role being hired. Someone has been made accountable for a problem, has a mandate, and arrives looking for tooling. Strong and specific.",
              "A tool appearing in the stack. Adoption creates adjacent needs on a predictable timeline, integration, migration, reporting.",
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
            text: "Before adding a signal to your targeting, ask whether you can write a first sentence that would be false for an account without it. If the opening line works equally well for any company in the sector, the signal is decorative. You have added a research step that produces no relevance.",
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
            text: "Signalbasiertes Outbound gilt inzwischen als Standardempfehlung, mit der Folge, dass die meisten Teams dieselben Signale nutzen. Und zwar überwiegend die am leichtesten verfügbaren statt der aussagekräftigen.",
          },
          {
            type: "h2",
            text: "Finanzierungsrunden werden überschätzt",
          },
          {
            type: "p",
            text: "Eine Finanzierungsmeldung sagt Ihnen, dass ein Unternehmen Geld hat. Sie sagt nicht, dass es Ihr Problem hat, dass jemand für dessen Lösung verantwortlich gemacht wurde oder dass das Budget noch frei ist. Zudem ist sie für alle Anbieter gleichzeitig sichtbar, der Käufer erhält binnen zwei Wochen Dutzende nahezu identischer Mails.",
          },
          {
            type: "p",
            text: "Finanzierung funktioniert als Qualifizierungskriterium, kann sich das Unternehmen das leisten, und schlecht als Trigger. Der Unterschied ist wesentlich: Qualifizierungskriterien verengen eine Liste, Trigger bestimmen den Versandzeitpunkt.",
          },
          {
            type: "h2",
            text: "Signale nach Vorhersagekraft",
          },
          {
            type: "ul",
            items: [
              "Eine konkrete ausgeschriebene Rolle. Jemand wurde für ein Problem verantwortlich gemacht, hat ein Mandat und sucht nach Werkzeugen. Stark und spezifisch.",
              "Ein neues Tool im Stack. Die Einführung erzeugt angrenzende Bedarfe auf vorhersehbarer Zeitachse, Integration, Migration, Reporting.",
              "Eine regulatorische oder vertragliche Frist. Der Zeitpunkt ist extern vorgegeben und im Voraus bekannt, das planbarste Signal überhaupt.",
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
            text: "Bevor Sie ein Signal ins Targeting aufnehmen, fragen Sie sich, ob Sie einen ersten Satz formulieren können, der für einen Account ohne dieses Signal falsch wäre. Funktioniert der Einstieg für jedes Unternehmen der Branche gleich gut, ist das Signal dekorativ, Sie haben einen Rechercheschritt hinzugefügt, der keine Relevanz erzeugt.",
          },
          {
            type: "quote",
            text: "Ein Signal, aus dem sich kein spezifischer erster Satz schreiben lässt, ist kein Signal, sondern ein Filter, den man so nennt.",
          },
          {
            type: "p",
            text: "Erfassen Sie Antworten anschließend nach Signaltyp. Die meisten Teams taggen nach Kampagne, das zeigt, welche Mail funktioniert hat. Nach Signal zu taggen zeigt etwas weit Beständigeres: welche Bedingungen ein Unternehmen überhaupt gesprächsbereit machen.",
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
          "Most outbound dashboards report effort. A useful one reports whether the motion is worth continuing, and at what cost per qualified opportunity.",
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
            text: "Reply rate, placement and meeting-to-opportunity conversion are genuinely useful, as diagnostics. They tell you where a motion is breaking. They are poor targets, because each can be improved in ways that hurt the numbers above. Reply rate rises if you ask for less. Meeting volume rises if you lower the qualification bar.",
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
            text: "Placement and reply rate are worth watching weekly, because they move fast and degrade quietly. Qualified meetings make sense monthly. Cost per qualified opportunity only becomes meaningful quarterly, earlier than that, sample sizes are too small to act on, and reacting to noise is how teams end up rebuilding a motion that was working.",
          },
          {
            type: "p",
            text: "One practical test: if your outbound report were shown to the board without commentary, would it answer whether to invest more, hold, or stop? If not, it is measuring activity.",
          },
        ],
      },
      de: {
        title: "Was im Outbound zu messen ist, und was nicht",
        description:
          "Versendete E-Mails sind kein Ergebnis. Ein knappes Framework für Outbound-Reporting, das auch einer Vorstandssitzung standhält.",
        excerpt:
          "Die meisten Outbound-Dashboards berichten Aufwand. Ein brauchbares berichtet, ob sich das Vorgehen lohnt, und zu welchen Kosten pro qualifizierter Opportunity.",
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
            text: "Antwortrate, Platzierung und die Conversion von Termin zu Opportunity sind echt nützlich, als Diagnosewerte. Sie zeigen, wo ein Vorgehen bricht. Als Zielgrößen taugen sie wenig, weil sich jede auf eine Weise verbessern lässt, die den Zahlen darüber schadet. Die Antwortrate steigt, wenn man weniger verlangt. Das Terminvolumen steigt, wenn man die Qualifizierungshürde senkt.",
          },
          {
            type: "quote",
            text: "Jede Kennzahl, die sich durch das Senken eines Standards verbessern lässt, wird irgendwann genau so verbessert, es sei denn, etwas darüber ist die eigentliche Zielgröße.",
          },
          {
            type: "h2",
            text: "Der Reporting-Rhythmus",
          },
          {
            type: "p",
            text: "Platzierung und Antwortrate lohnen eine wöchentliche Beobachtung, weil sie sich schnell bewegen und leise verschlechtern. Qualifizierte Termine ergeben monatlich Sinn. Die Kosten pro qualifizierter Opportunity werden erst quartalsweise aussagekräftig, davor sind die Stichproben zu klein, und auf Rauschen zu reagieren ist der übliche Weg, ein funktionierendes Vorgehen wieder abzureißen.",
          },
          {
            type: "p",
            text: "Ein praktischer Test: Würde Ihr Outbound-Report ohne Kommentar im Vorstand gezeigt, beantwortete er, ob mehr investiert, gehalten oder gestoppt werden sollte? Wenn nicht, misst er Aktivität.",
          },
        ],
      },
    },
  },
  {
    slug: "outbound-is-a-system-not-a-campaign",
    category: "outbound",
    publishedAt: "2026-09-08",
    author: "ForgeGTM",
    content: {
      en: {
        title: "Outbound is a system, not a campaign",
        description:
          "Most outbound teams rebuild the same layer over and over while the layer underneath quietly fails. The four dependencies, in the order they actually break.",
        excerpt:
          "Teams relaunch outbound every quarter and call it a new campaign. Almost always, three of the four layers were never the problem, and the one that was is still there.",
        body: [
          { type: "p", text: "Ask a team why outbound stopped working and you will usually hear a campaign-shaped answer: the sequence underperformed, the angle was wrong, the list was tired. Then a new campaign is launched, and two months later the same conversation happens again." },
          { type: "p", text: "The pattern repeats because outbound is not a campaign. It is four dependent layers, and a failure in a lower one is almost always misread as a failure in a higher one." },
          { type: "h2", text: "The four layers" },
          { type: "ul", items: [
            "Infrastructure, domains, authentication, warm-up, sending limits, inbox placement. Determines whether the message exists for the recipient at all.",
            "Data, who is in the list, how it was sourced, how stale it is, how accurately it is attributed. Determines who receives it.",
            "Targeting, which slice of that data you contact, and on what trigger. Determines whether the message is relevant on the day it lands.",
            "Messaging, what the email actually says. Determines whether a relevant, delivered message earns a reply.",
          ]},
          { type: "p", text: "The order is not arbitrary. Each layer can only be measured if the ones below it are sound. Copy tested from a filtered domain produces noise. Targeting evaluated against a stale list produces noise. The measurement is invalid, not merely imprecise." },
          { type: "h2", text: "Why the top layer takes the blame" },
          { type: "p", text: "Messaging is the layer everybody can see. It is also the only one that can be changed in an afternoon without asking anyone's permission. Infrastructure problems, by contrast, are invisible from the dashboard, require technical work, and often surface as a metric that looks fine." },
          { type: "p", text: "So the team rewrites. Results do not move, because the constraint was never there. The angle that gets discarded was frequently a good one, it simply never arrived." },
          { type: "quote", text: "If you cannot say which layer is currently your constraint, you are not running an outbound system. You are running a sequence of experiments whose results you cannot interpret." },
          { type: "h2", text: "Diagnose from the bottom up" },
          { type: "p", text: "When performance drops, work upward, and stop at the first layer that fails:" },
          { type: "ul", items: [
            "Is mail landing in the primary inbox, verified by seed testing rather than inferred from open rate?",
            "Is the data current, and was it sourced in a way that matches how you claim to know these accounts?",
            "Is there a reason this account would care this month, or are you contacting them because they matched a filter?",
            "Only then: is the message itself doing any work?",
          ]},
          { type: "p", text: "This takes a day, and it is the difference between a fix and another quarter of rewriting. The system view also changes what you build: warm-up schedules, placement monitoring and data hygiene stop being setup tasks and become standing operations, because every one of them decays without attention." },
        ],
      },
      de: {
        title: "Outbound ist ein System, keine Kampagne",
        description:
          "Die meisten Outbound-Teams bauen immer wieder dieselbe Ebene neu, während die darunterliegende still versagt. Die vier Abhängigkeiten, in der Reihenfolge, in der sie tatsächlich brechen.",
        excerpt:
          "Teams starten Outbound jedes Quartal neu und nennen es eine neue Kampagne. Fast immer waren drei der vier Ebenen nie das Problem, und die eine, die es war, besteht weiter.",
        body: [
          { type: "p", text: "Fragt man ein Team, warum Outbound nicht mehr funktioniert, folgt meist eine kampagnenförmige Antwort: Die Sequenz lief schlecht, der Ansatz stimmte nicht, die Liste war ausgereizt. Dann startet eine neue Kampagne, und zwei Monate später wiederholt sich dasselbe Gespräch." },
          { type: "p", text: "Dieses Muster wiederholt sich, weil Outbound keine Kampagne ist. Es besteht aus vier voneinander abhängigen Ebenen, und ein Fehler in einer unteren Ebene wird fast immer als Fehler einer höheren gedeutet." },
          { type: "h2", text: "Die vier Ebenen" },
          { type: "ul", items: [
            "Infrastruktur, Domains, Authentifizierung, Warm-up, Versandgrenzen, Zustellung ins Postfach. Entscheidet, ob die Nachricht für den Empfänger überhaupt existiert.",
            "Daten, wer in der Liste steht, woher sie stammt, wie aktuell und wie sauber sie zugeordnet ist. Entscheidet, wer die Nachricht erhält.",
            "Targeting, welcher Ausschnitt dieser Daten angesprochen wird und auf welchen Auslöser hin. Entscheidet, ob die Nachricht am Tag der Zustellung relevant ist.",
            "Messaging, was in der E-Mail tatsächlich steht. Entscheidet, ob eine relevante, zugestellte Nachricht eine Antwort verdient.",
          ]},
          { type: "p", text: "Die Reihenfolge ist nicht beliebig. Jede Ebene lässt sich nur bewerten, wenn die darunterliegenden intakt sind. Texte, die über eine gefilterte Domain getestet werden, erzeugen Rauschen. Targeting, das gegen eine veraltete Liste geprüft wird, ebenso. Die Messung ist dann nicht ungenau, sondern ungültig." },
          { type: "h2", text: "Warum die oberste Ebene die Schuld bekommt" },
          { type: "p", text: "Messaging ist die Ebene, die alle sehen. Sie ist zugleich die einzige, die sich an einem Nachmittag ändern lässt, ohne jemanden um Erlaubnis zu fragen. Infrastrukturprobleme dagegen sind im Dashboard unsichtbar, erfordern technische Arbeit und zeigen sich häufig in einer Kennzahl, die gesund aussieht." },
          { type: "p", text: "Also wird umgeschrieben. Die Ergebnisse bewegen sich nicht, weil der Engpass nie dort lag. Der verworfene Ansatz war oft ein guter, er kam schlicht nie an." },
          { type: "quote", text: "Wer nicht benennen kann, welche Ebene gerade der Engpass ist, betreibt kein Outbound-System, sondern eine Folge von Experimenten, deren Ergebnisse sich nicht interpretieren lassen." },
          { type: "h2", text: "Von unten nach oben diagnostizieren" },
          { type: "p", text: "Wenn die Leistung einbricht, arbeiten Sie sich nach oben und halten Sie bei der ersten Ebene an, die versagt:" },
          { type: "ul", items: [
            "Landet die Mail im Hauptpostfach, per Seed-Test belegt und nicht aus der Öffnungsrate abgeleitet?",
            "Sind die Daten aktuell, und wurden sie so erhoben, wie Sie Ihre Kenntnis dieser Accounts darstellen?",
            "Gibt es einen Grund, warum dieser Account sich gerade in diesem Monat dafür interessieren sollte, oder sprechen Sie ihn an, weil er einem Filter entsprach?",
            "Und erst dann: Leistet die Nachricht selbst überhaupt etwas?",
          ]},
          { type: "p", text: "Das kostet einen Tag und macht den Unterschied zwischen einer Lösung und einem weiteren Quartal des Umschreibens. Die Systemsicht verändert auch, was Sie aufbauen: Warm-up-Pläne, Zustellungs-Monitoring und Datenpflege sind dann keine einmaligen Aufgaben mehr, sondern laufender Betrieb, denn jede dieser Ebenen verfällt ohne Aufmerksamkeit." },
        ],
      },
    },
  },
  {
    slug: "match-your-gtm-motion-to-your-deal-size",
    category: "go-to-market",
    publishedAt: "2026-09-01",
    author: "ForgeGTM",
    content: {
      en: {
        title: "Match your GTM motion to your deal size, not your ambition",
        description:
          "Most broken go-to-market motions are arithmetic failures, not execution failures. How average contract value determines which channel can ever work.",
        excerpt:
          "A motion that works at €60k ACV is insolvent at €6k. The channel decision is set by arithmetic long before it is set by strategy, and the arithmetic is not optional.",
        body: [
          { type: "p", text: "Teams tend to choose a go-to-market motion by aspiration: enterprise sales because the logos are impressive, product-led because it sounds efficient, outbound because a competitor is visibly doing it. The choice that actually survives contact with a P&L is set by a narrower question, what a customer is worth, and what you can therefore afford to spend acquiring one." },
          { type: "h2", text: "The constraint, stated plainly" },
          { type: "p", text: "Take annual contract value, multiply by expected gross margin and realistic account lifetime. That is what a customer is worth. Now divide by three, a common benchmark for a sustainable LTV-to-CAC ratio, and you have a rough ceiling on total acquisition cost." },
          { type: "p", text: "A fully-loaded salesperson in Western Europe costs somewhere around €8,000–12,000 a month once salary, tooling, data and management are counted. At a 20% win rate and a three-month cycle, the arithmetic tells you quickly whether a human-led motion can pay for itself at your price point. Frequently it cannot, and no amount of sales-process improvement closes a gap that is structural." },
          { type: "h2", text: "What each motion requires to work" },
          { type: "ul", items: [
            "Low ACV (under roughly €5k): acquisition must be close to unattended. Self-serve, product-led, partner or community-driven. A human touching every deal is usually unaffordable.",
            "Mid ACV (roughly €5k–50k): outbound and inbound both work, provided targeting is tight. This is the band where a well-run outbound system has its clearest advantage, because the value of one meeting justifies real research.",
            "High ACV (€50k+): multi-threaded, account-based, long cycles. Volume stops being the metric; depth of coverage in a small number of accounts replaces it.",
          ]},
          { type: "p", text: "The uncomfortable case is the low-ACV company running a mid-ACV motion, paying for meetings it cannot recoup. It grows, so the problem hides inside growth, and only becomes visible when efficiency is finally scrutinised." },
          { type: "quote", text: "Almost every go-to-market motion that 'stopped working' was never solvent. It was subsidised by funding, and the funding ended." },
          { type: "h2", text: "Raising price is a GTM decision" },
          { type: "p", text: "If the arithmetic rules out the motion you need, the lever is often price rather than efficiency. Moving ACV from €4k to €12k does not make the sales process three times better; it makes a previously impossible motion affordable. That usually means narrowing the ICP to a segment with a more expensive problem, which is a targeting decision before it is a pricing one." },
          { type: "p", text: "Run the numbers before choosing the channel. It takes an afternoon, and it prevents a year of well-executed work inside a motion that could never have paid for itself." },
        ],
      },
      de: {
        title: "Richten Sie Ihre GTM-Motion an der Deal-Größe aus, nicht an Ihrem Anspruch",
        description:
          "Die meisten gescheiterten Go-to-Market-Modelle scheitern an der Rechnung, nicht an der Umsetzung. Wie der durchschnittliche Auftragswert bestimmt, welcher Kanal überhaupt funktionieren kann.",
        excerpt:
          "Was bei 60.000 € Auftragswert funktioniert, ist bei 6.000 € nicht finanzierbar. Die Kanalentscheidung fällt durch Arithmetik, lange bevor sie strategisch fällt, und diese Arithmetik ist nicht verhandelbar.",
        body: [
          { type: "p", text: "Teams wählen ihre Go-to-Market-Motion meist nach Anspruch: Enterprise-Vertrieb, weil die Logos beeindrucken; Product-led, weil es effizient klingt; Outbound, weil ein Wettbewerber es sichtbar tut. Welche Entscheidung tatsächlich der Gewinn- und Verlustrechnung standhält, entscheidet eine engere Frage, was ein Kunde wert ist und was Sie folglich für seine Gewinnung ausgeben können." },
          { type: "h2", text: "Der Engpass, nüchtern formuliert" },
          { type: "p", text: "Nehmen Sie den Jahresauftragswert, multiplizieren Sie ihn mit der erwarteten Bruttomarge und einer realistischen Kundenlebensdauer. Das ist der Wert eines Kunden. Teilen Sie durch drei, ein gängiger Richtwert für ein tragfähiges Verhältnis von Kundenwert zu Akquisekosten, und Sie haben eine grobe Obergrenze für die Akquisekosten." },
          { type: "p", text: "Eine vollständig gerechnete Vertriebsstelle kostet in Westeuropa rund 8.000–12.000 € pro Monat, wenn Gehalt, Tools, Daten und Führung einbezogen sind. Bei 20 % Abschlussquote und drei Monaten Zyklus zeigt die Rechnung schnell, ob eine personengetragene Motion sich bei Ihrem Preisniveau selbst tragen kann. Häufig kann sie das nicht, und keine Prozessverbesserung schließt eine strukturelle Lücke." },
          { type: "h2", text: "Was jede Motion voraussetzt" },
          { type: "ul", items: [
            "Niedriger Auftragswert (unter etwa 5.000 €): Die Akquise muss weitgehend ohne persönlichen Kontakt auskommen, Self-Service, Product-led, Partner oder Community. Ein Mensch pro Deal ist meist nicht finanzierbar.",
            "Mittlerer Auftragswert (etwa 5.000–50.000 €): Outbound und Inbound funktionieren beide, sofern das Targeting eng ist. In diesem Bereich hat ein gut geführtes Outbound-System seinen klarsten Vorteil, weil der Wert eines Termins echte Recherche rechtfertigt.",
            "Hoher Auftragswert (ab 50.000 €): mehrere Ansprechpartner, Account-basiert, lange Zyklen. Menge ist nicht mehr die Kennzahl; an ihre Stelle tritt die Durchdringung weniger Accounts.",
          ]},
          { type: "p", text: "Der unangenehme Fall ist das Unternehmen mit niedrigem Auftragswert, das eine Motion für mittlere Auftragswerte fährt, es bezahlt Termine, die sich nicht amortisieren. Da es wächst, verbirgt sich das Problem im Wachstum und wird erst sichtbar, wenn Effizienz ernsthaft geprüft wird." },
          { type: "quote", text: "Fast jede Go-to-Market-Motion, die „nicht mehr funktionierte“, war nie tragfähig. Sie wurde durch Finanzierung getragen, und die Finanzierung endete." },
          { type: "h2", text: "Den Preis zu erhöhen ist eine GTM-Entscheidung" },
          { type: "p", text: "Schließt die Rechnung die benötigte Motion aus, liegt der Hebel oft im Preis statt in der Effizienz. Den Auftragswert von 4.000 auf 12.000 € zu heben, macht den Vertriebsprozess nicht dreimal besser, es macht eine zuvor unmögliche Motion finanzierbar. Meist bedeutet das, das ICP auf ein Segment mit einem teureren Problem zu verengen. Und das ist eine Targeting-Entscheidung, bevor es eine Preisentscheidung ist." },
          { type: "p", text: "Rechnen Sie, bevor Sie den Kanal wählen. Das kostet einen Nachmittag und erspart ein Jahr sauber ausgeführter Arbeit in einem Modell, das sich nie hätte tragen können." },
        ],
      },
    },
  },
  {
    slug: "the-first-sentence-is-the-only-one-being-read",
    category: "cold-email",
    publishedAt: "2026-08-25",
    author: "ForgeGTM",
    content: {
      en: {
        title: "The first sentence is the only one being read",
        description:
          "A cold email is not read top to bottom. It is triaged in the preview pane in about two seconds. What that means for how the first line should be built.",
        excerpt:
          "Your prospect is deciding in a preview pane, before opening anything. Almost every cold email spends its only asset, the first line, introducing the sender.",
        body: [
          { type: "p", text: "A cold email is not read. It is triaged, in a preview pane, in roughly the time it takes to move a mouse. The subject line and the first sentence are the entire message as far as that decision is concerned. Everything after them is read only by someone who has already decided to keep reading." },
          { type: "p", text: "Which makes it striking how most cold emails spend that first line: introducing the sender, the company, and how long it has been in business." },
          { type: "h2", text: "The opening belongs to the recipient" },
          { type: "p", text: "The first sentence has one job, demonstrate, quickly and specifically, that this message was meant for this person. Not personalisation in the mail-merge sense. A first name and a company name prove nothing; every tool does that, and recipients know it." },
          { type: "p", text: "What works is an observation the recipient recognises as true about their situation and would not expect a stranger to have made. That they are hiring three enterprise AEs while their pricing page still tops out at self-serve. That they have opened a second warehouse in a country whose regulations you happen to know. The specificity is the proof of relevance." },
          { type: "h2", text: "A test for the first line" },
          { type: "p", text: "Read your opening sentence and ask: could I send this exact line to two hundred other companies without changing a word? If yes, it is not an opening. It is a template that happens to sit at the top." },
          { type: "ul", items: [
            "Cut anything about your company from the first two sentences. It has not been earned yet.",
            "Lead with the observation, then the implication, then one question. In that order.",
            "Make the ask small and concrete. 'Worth a conversation?' asks for a decision no one can make yet.",
            "If the observation required no research, the email will read as though it required none.",
          ]},
          { type: "quote", text: "If the first sentence could be sent to anyone, it will be read by no one." },
          { type: "h2", text: "Length is a symptom, not the problem" },
          { type: "p", text: "Advice to 'keep it short' is aimed at the wrong variable. Short emails fail constantly. What fails is an email that spends its opening on the sender, and such an email fails at fifty words as surely as at two hundred. Fix what the first line is about, and the appropriate length usually resolves itself." },
          { type: "p", text: "This is also why research capacity, not copywriting skill, is the real constraint in most outbound teams. An observation worth opening with has to come from somewhere, and that is a targeting and tooling problem long before it is a writing one." },
        ],
      },
      de: {
        title: "Nur der erste Satz wird gelesen",
        description:
          "Eine Cold E-Mail wird nicht von oben nach unten gelesen, sondern in der Vorschau in etwa zwei Sekunden sortiert. Was das für den Aufbau des ersten Satzes bedeutet.",
        excerpt:
          "Ihr Gegenüber entscheidet in der Vorschau, bevor überhaupt etwas geöffnet wird. Fast jede Cold E-Mail verwendet ihr einziges Kapital, den ersten Satz, darauf, den Absender vorzustellen.",
        body: [
          { type: "p", text: "Eine Cold E-Mail wird nicht gelesen. Sie wird in der Vorschau sortiert, in etwa der Zeit einer Mausbewegung. Für diese Entscheidung bestehen Betreffzeile und erster Satz aus der gesamten Nachricht. Alles danach liest nur, wer sich bereits fürs Weiterlesen entschieden hat." },
          { type: "p", text: "Umso bemerkenswerter ist, wofür die meisten Cold E-Mails diesen ersten Satz verwenden: um den Absender vorzustellen, das Unternehmen, und wie lange es dieses schon gibt." },
          { type: "h2", text: "Der Einstieg gehört dem Empfänger" },
          { type: "p", text: "Der erste Satz hat eine Aufgabe: schnell und konkret zu zeigen, dass diese Nachricht für genau diese Person gedacht war. Nicht Personalisierung im Sinne eines Serienbriefs. Vorname und Firmenname belegen nichts; das leistet jedes Tool, und die Empfänger wissen das." },
          { type: "p", text: "Was funktioniert, ist eine Beobachtung, die der Empfänger als zutreffend erkennt und die er von einem Fremden nicht erwartet hätte. Dass drei Enterprise-Vertriebsleute gesucht werden, während die Preisseite noch beim Self-Service endet. Dass ein zweites Lager in einem Land eröffnet wurde, dessen Vorschriften Sie kennen. Die Konkretheit ist der Beleg für Relevanz." },
          { type: "h2", text: "Ein Test für den ersten Satz" },
          { type: "p", text: "Lesen Sie Ihren Einstiegssatz und fragen Sie: Könnte ich genau diesen Satz an zweihundert andere Unternehmen schicken, ohne ein Wort zu ändern? Wenn ja, ist es kein Einstieg, sondern eine Vorlage, die zufällig oben steht." },
          { type: "ul", items: [
            "Streichen Sie in den ersten beiden Sätzen alles über Ihr Unternehmen. Dieser Platz ist noch nicht verdient.",
            "Zuerst die Beobachtung, dann die Konsequenz, dann eine Frage. In dieser Reihenfolge.",
            "Halten Sie die Bitte klein und konkret. „Wäre ein Gespräch interessant?“ verlangt eine Entscheidung, die noch niemand treffen kann.",
            "Wenn die Beobachtung keine Recherche erforderte, liest sich die E-Mail auch so.",
          ]},
          { type: "quote", text: "Ein erster Satz, der an alle gehen könnte, wird von niemandem gelesen." },
          { type: "h2", text: "Länge ist ein Symptom, nicht das Problem" },
          { type: "p", text: "Der Rat, sich „kurz zu fassen“, zielt auf die falsche Variable. Kurze E-Mails scheitern laufend. Was scheitert, ist eine E-Mail, die ihren Einstieg dem Absender widmet, und die scheitert bei fünfzig Wörtern ebenso zuverlässig wie bei zweihundert. Klären Sie, wovon der erste Satz handelt, und die passende Länge ergibt sich meist von selbst." },
          { type: "p", text: "Das ist auch der Grund, warum in den meisten Outbound-Teams die Recherchekapazität der eigentliche Engpass ist und nicht das Texthandwerk. Eine Beobachtung, die einen Einstieg trägt, muss irgendwoher kommen, und das ist ein Targeting- und Werkzeugproblem, lange bevor es ein Schreibproblem ist." },
        ],
      },
    },
  },
  {
    slug: "lead-volume-is-a-vanity-target",
    category: "lead-generation",
    publishedAt: "2026-08-11",
    author: "ForgeGTM",
    content: {
      en: {
        title: "Lead volume is a vanity target if the definition is wrong",
        description:
          "Teams optimise the number of leads long before agreeing what a lead is. The definition, not the volume, is what determines whether the number means anything.",
        excerpt:
          "Two teams reporting the same lead count can be doing entirely different things. Until the definition is shared and enforced, the number cannot be managed.",
        body: [
          { type: "p", text: "Lead count is the most reported and least comparable metric in B2B. Two companies can report 200 leads a month and mean completely different things: one counts anyone who downloaded a PDF, the other counts accounts that met firmographic criteria and asked to speak to sales. Only one of those numbers can be managed." },
          { type: "h2", text: "The cost of a loose definition" },
          { type: "p", text: "A loose definition does not merely inflate reporting. It actively misdirects work, in ways that compound:" },
          { type: "ul", items: [
            "Sales stops trusting the queue, and starts cherry-picking, so genuinely good leads sit unworked alongside the noise.",
            "Marketing optimises toward whatever produces the count, which is usually the least qualified source available.",
            "Conversion rates become meaningless, because the denominator is a moving target.",
            "Nobody can tell whether a channel is working, so budget decisions are made on impressions.",
          ]},
          { type: "p", text: "The second-order effect is the expensive one: the team loses the ability to learn from its own data. Every subsequent optimisation is guesswork wearing a dashboard." },
          { type: "h2", text: "What a usable definition contains" },
          { type: "p", text: "A definition worth enforcing names three things, fit, intent, and a threshold that can be checked without a debate:" },
          { type: "ul", items: [
            "Fit: the firmographic and technographic criteria that make this account plausibly able to buy. Objective, checkable, written down.",
            "Intent: what the person actually did, weighted by how much it costs them. Requesting a demo is not equivalent to opening an email.",
            "Threshold: the specific combination that moves a record into the queue, and, just as importantly, what sends it back.",
          ]},
          { type: "quote", text: "If sales and marketing cannot independently classify the same record the same way, you do not have a definition. You have a preference." },
          { type: "h2", text: "Fewer, better, and counted honestly" },
          { type: "p", text: "Tightening the definition almost always cuts the reported number, sometimes dramatically. That drop is not a regression; it is the first honest measurement the team has had. The useful follow-on metric is not lead count at all but qualified-lead-to-opportunity rate, because it is the first number in the chain that is hard to game." },
          { type: "p", text: "Agree the definition first. Then optimise volume against it, in that order, or the volume work is spent on a number nobody can act on." },
        ],
      },
      de: {
        title: "Lead-Volumen ist eine Schaukennzahl, wenn die Definition nicht stimmt",
        description:
          "Teams optimieren die Anzahl der Leads, lange bevor geklärt ist, was ein Lead überhaupt ist. Nicht das Volumen, sondern die Definition entscheidet, ob die Zahl etwas bedeutet.",
        excerpt:
          "Zwei Teams, die dieselbe Lead-Zahl berichten, können völlig Unterschiedliches tun. Solange die Definition nicht geteilt und durchgesetzt ist, lässt sich die Zahl nicht steuern.",
        body: [
          { type: "p", text: "Die Lead-Anzahl ist im B2B die meistberichtete und am wenigsten vergleichbare Kennzahl. Zwei Unternehmen können 200 Leads pro Monat melden und damit völlig Unterschiedliches meinen: Das eine zählt jeden PDF-Download, das andere Accounts, die firmografische Kriterien erfüllten und aktiv um ein Vertriebsgespräch baten. Nur eine dieser Zahlen lässt sich steuern." },
          { type: "h2", text: "Was eine unscharfe Definition kostet" },
          { type: "p", text: "Eine unscharfe Definition bläht nicht nur das Reporting auf. Sie lenkt die Arbeit aktiv in die falsche Richtung, und das kumuliert:" },
          { type: "ul", items: [
            "Der Vertrieb verliert das Vertrauen in die Warteschlange und pickt sich Einzelfälle heraus, wirklich gute Leads bleiben neben dem Rauschen liegen.",
            "Das Marketing optimiert auf das, was die Zahl erzeugt, und das ist meist die am wenigsten qualifizierte verfügbare Quelle.",
            "Conversion-Raten werden bedeutungslos, weil der Nenner sich ständig verschiebt.",
            "Niemand kann beurteilen, ob ein Kanal funktioniert, Budgetentscheidungen fallen nach Eindruck.",
          ]},
          { type: "p", text: "Teuer ist der Effekt zweiter Ordnung: Das Team verliert die Fähigkeit, aus den eigenen Daten zu lernen. Jede weitere Optimierung ist dann Raten mit Dashboard." },
          { type: "h2", text: "Was eine brauchbare Definition enthält" },
          { type: "p", text: "Eine Definition, die sich durchsetzen lässt, benennt drei Dinge, Eignung, Kaufabsicht und eine Schwelle, die sich ohne Diskussion prüfen lässt:" },
          { type: "ul", items: [
            "Eignung: die firmografischen und technografischen Kriterien, die diesen Account plausibel kauffähig machen. Objektiv, prüfbar, schriftlich festgehalten.",
            "Kaufabsicht: was die Person tatsächlich getan hat, gewichtet nach dem Aufwand, den es sie kostet. Eine Demo-Anfrage ist nicht dasselbe wie ein geöffnetes Mailing.",
            "Schwelle: die konkrete Kombination, die einen Datensatz in die Warteschlange bringt, und ebenso, was ihn wieder herausnimmt.",
          ]},
          { type: "quote", text: "Wenn Vertrieb und Marketing denselben Datensatz nicht unabhängig voneinander gleich einordnen, haben Sie keine Definition, sondern eine Vorliebe." },
          { type: "h2", text: "Weniger, besser, und ehrlich gezählt" },
          { type: "p", text: "Eine schärfere Definition senkt die berichtete Zahl fast immer, mitunter deutlich. Dieser Rückgang ist kein Rückschritt, sondern die erste ehrliche Messung, die das Team hatte. Die sinnvolle Folgekennzahl ist dann nicht die Lead-Anzahl, sondern die Quote von qualifiziertem Lead zu Opportunity, die erste Zahl der Kette, die sich kaum schönen lässt." },
          { type: "p", text: "Einigen Sie sich zuerst auf die Definition. Optimieren Sie das Volumen erst danach, sonst fließt die Arbeit in eine Zahl, mit der niemand etwas anfangen kann." },
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
