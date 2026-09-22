import type { Dictionary } from "./en";

/**
 * German dictionary — professional B2B register for the DACH market.
 *
 * Written, not machine-translated: industry terms that DACH sales teams
 * actually use ("Outbound", "Pipeline", "ICP") are kept in English, while
 * everything else reads as native German. Consistently formal ("Sie").
 *
 * Typed as `Dictionary`, so a missing or renamed key fails the build.
 */
export const de: Dictionary = {
  meta: {
    title: "ForgeGTM | Qualifizierte Pipeline durch Outbound-Systeme",
    description:
      "ForgeGTM ist eine B2B-Agentur für Go-to-Market und Outbound. Wir bauen und betreiben Zielgruppen-Targeting, E-Mail-Infrastruktur, Messaging und Kampagnen, die qualifizierte Vertriebspipeline erzeugen.",
  },

  nav: {
    services: "Leistungen",
    caseStudies: "Case Studies",
    insights: "Insights",
    about: "Über uns",
    languageLabel: "Sprache",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    home: "ForgeGTM Startseite",
    primary: "Hauptnavigation",
  },

  cta: {
    bookCall: "Strategiegespräch buchen",
    buildPipeline: "Gemeinsam Ihre Pipeline aufbauen",
    startConversation: "Gespräch beginnen",
    seeHowItWorks: "So arbeiten wir",
    exploreWork: "Unsere Arbeit ansehen",
    readCaseStudy: "Case Study lesen",
    readArticle: "Artikel lesen",
    allCaseStudies: "Alle Case Studies",
    allInsights: "Alle Insights",
    backToCaseStudies: "Zurück zu den Case Studies",
    backToInsights: "Zurück zu den Insights",
  },

  hero: {
    eyebrow: "B2B GO-TO-MARKET & RevOps",
    headlineLead: "Umsatzwachstum, entwickelt für den modernen",
    headlineAccent: "Markt.",
    body: "Wir unterstützen ambitionierte Unternehmen dabei, intelligente Growth-Systeme aufzubauen: mit Strategie, Automatisierung, Outbound-Execution und skalierbarer Infrastruktur.",
    qualifiers: [
      "B2B-SaaS & Technologie",
      "Series A–C",
      "DACH, UK & Nordics",
    ],
    visualCaption: "Recherche → Systeme → Qualifizierte Pipeline",
  },

  logos: {
    label: "Entwickelt für Teams wie diese",
  },

  commitments: {
    items: [
      { value: "5 Wochen", label: "Von der Recherche zu den ersten Terminen" },
      { value: "9", label: "Leistungen aus einer Hand" },
      { value: "1", label: "Ein verantwortliches Team statt vier Dienstleister" },
      { value: "Täglich", label: "Kampagnensteuerung und Antwort-Routing" },
    ],
    note: "So läuft jedes ForgeGTM-Projekt ab.",
  },

  problem: {
    eyebrow: "Das Problem",
    titleLead: "Die meisten Unternehmen haben kein Wachstumsproblem.",
    titleTrail: "Sie haben ein Systemproblem.",
    items: [
      {
        index: "01",
        title: "Wachstum wirkt zufällig",
        description:
          "Umsatz kommt in unvorhersehbaren Ausschlägen. Ohne System beginnt jedes Quartal bei null, und Skalierung wird zum Ratespiel.",
      },
      {
        index: "02",
        title: "Tools sprechen nicht miteinander",
        description:
          "Ein Dutzend unverbundener Anwendungen, manuelle Übergaben und Daten in Silos. Teams verbringen mehr Zeit mit Abläufen als mit Kunden.",
      },
      {
        index: "03",
        title: "Outbound kommt nicht an",
        description:
          "Generische Sequenzen, niedrige Antwortraten und verbrannte Domains. Der Markt ist lauter denn je, und ungezielter Aufwand verpufft.",
      },
      {
        index: "04",
        title: "KI bleibt ein Schlagwort",
        description:
          "Alle sprechen über Automatisierung und KI, aber kaum jemand übersetzt sie in messbare, sich verstärkende Umsatz-Infrastruktur.",
      },
    ],
  },

  services: {
    eyebrow: "Was wir aufbauen",
    title: "Ein Partner für die gesamte Revenue-Engine.",
    aside:
      "Acht ineinandergreifende Leistungen, geliefert als ein zusammenhängendes System statt als Sammlung unverbundener Taktiken.",
    items: [
      {
        icon: "strategy",
        name: "Go-to-Market-Strategie",
        value:
          "Positionierung, ICP und Messaging, aufgebaut auf einem Markt, der tatsächlich konvertiert.",
      },
      {
        icon: "revops",
        name: "Revenue Operations",
        value:
          "Eine verlässliche Datenbasis über Marketing, Vertrieb und Customer Success hinweg, durchgängig messbar.",
      },
      {
        icon: "automation",
        name: "Workflow-Automatisierung",
        value:
          "Manuelle Arbeit entfällt durch robuste, nachvollziehbare Automatisierungen über Ihren gesamten Stack.",
      },
      {
        icon: "outbound",
        name: "Outbound-Systeme",
        value:
          "Zustellbare, personalisierte Outbound-Engines, die qualifizierte Termine in der Breite erzeugen.",
      },
      {
        icon: "crm",
        name: "CRM-Implementierung",
        value:
          "HubSpot- und Pipeline-Architektur, ausgelegt auf saubere Daten und schnelles Reporting.",
      },
      {
        icon: "ai",
        name: "KI-Implementierung",
        value:
          "Angewandte KI-Agenten und Anreicherung, die Hebelwirkung über den gesamten Funnel aufbauen.",
      },
      {
        icon: "content",
        name: "Content-Systeme",
        value:
          "Redaktionelle Systeme, die Fachwissen in konstante Nachfrage übersetzen.",
      },
      {
        icon: "website",
        name: "Website-Entwicklung",
        value:
          "Schnelle, barrierefreie, conversion-orientierte Websites, entwickelt wie ein Produkt.",
      },
    ],
  },

  process: {
    eyebrow: "So arbeiten wir",
    title: "Von der Recherche zu gebuchten Terminen in rund fünf Wochen.",
    aside:
      "Ein fester Aufbau, danach ein kontinuierlicher Betriebsrhythmus. Sie wissen jederzeit, woran gearbeitet wird, was dabei entstanden ist und was es pro qualifizierter Opportunity gekostet hat.",
    steps: [
      {
        number: "01",
        title: "Recherche",
        description:
          "Wir definieren das ICP, kartieren das Buying Center und identifizieren die Accounts, die aktuell echte Kaufsignale zeigen.",
        output: "ICP & Account-Liste",
        duration: "Woche 1–2",
      },
      {
        number: "02",
        title: "Aufbau",
        description:
          "Targeting, Messaging, Versandinfrastruktur und Kampagnenarchitektur werden aufgebaut und aufgewärmt, bevor die erste Mail rausgeht.",
        output: "Betriebsbereite Infrastruktur",
        duration: "Woche 2–4",
      },
      {
        number: "03",
        title: "Launch",
        description:
          "Die Kampagnen gehen live und werden täglich gesteuert: Antworten geroutet, Einwände dokumentiert, Volumen zum Schutz der Zustellbarkeit getaktet.",
        output: "Gebuchte Termine",
        duration: "Woche 5",
      },
      {
        number: "04",
        title: "Optimierung",
        description:
          "Wir testen Messaging gegen echte Antwortdaten, stellen Schwaches ein und erweitern auf angrenzende Segmente, sobald sich Signale bestätigen.",
        output: "Wachsende Pipeline",
        duration: "Laufend",
      },
    ],
  },

  caseStudies: {
    eyebrow: "Case Studies",
    title: "So sieht ein funktionierendes Outbound-System aus.",
    aside:
      "Szenarien, die zeigen, wie die Bausteine in der Praxis zusammenwirken: die Ausgangslage, die wir typischerweise vorfinden, was wir ändern und was sich dadurch bewegt.",
    indexTitle: "Case Studies",
    indexHeadline: "Outbound-Systeme, von Anfang bis Ende.",
    indexAside:
      "Jede Case Study beschreibt die Ausgangslage, die Strategie, die durchgeführten Kampagnen und das Ergebnis, so aufbereitet, wie wir intern briefen würden.",
    disclosureLead: "Hinweis zu diesen Case Studies:",
    disclosure:
      "Alle genannten Unternehmen sind fiktiv, die Zahlen sind modelliert und dienen ausschließlich der Veranschaulichung. Sie stehen weder für Kunden von ForgeGTM noch für gemessene Ergebnisse.",
    placeholderBadge: "Beispielhafte Darstellung",
    labels: {
      industry: "Branche",
      icp: "Zielgruppe / ICP",
      challenge: "Herausforderung",
      situation: "Ausgangslage",
      strategy: "GTM-Strategie",
      approach: "Outbound-Ansatz",
      execution: "Kampagnenumsetzung",
      messaging: "Messaging-Ansatz",
      results: "Ergebnisse",
      metrics: "Zentrale Kennzahlen",
      beforeAfter: "Vorher und nachher",
      before: "Vorher",
      after: "Nachher",
      lessons: "Erkenntnisse",
      outcome: "Fazit",
      readingTime: "Min. Lesezeit",
    },
  },

  testimonials: {
    eyebrow: "Stimmen",
    title: "So klingt besseres Outbound.",
    aside:
      "Die Veränderung, die Teams beschreiben, betrifft selten das Volumen, sondern häufigere Gespräche mit weniger, dafür besser qualifizierten Unternehmen.",
    placeholderBadge: "Platzhalter-Referenzen",
    disclosure:
      "Zu Demonstrationszwecken mit fiktiven Namen und Unternehmen verfasst. Keine echten Kundenstimmen.",
    items: [
      {
        quote:
          "Die Targeting-Arbeit haben wir unterschätzt. Wir kontaktieren heute deutlich weniger Unternehmen und sprechen mit mehr der richtigen.",
        name: "Ana Weber",
        role: "Head of Growth",
        company: "Northfield Analytics",
      },
      {
        quote:
          "Die Zustellbarkeit war das stille Problem. Nach dem Neuaufbau der Infrastruktur bekam dasselbe Messaging plötzlich Antworten.",
        name: "Daniel Achterberg",
        role: "Chief Revenue Officer",
        company: "Vantix Industrial",
      },
      {
        quote:
          "Unsere Vertriebler bauen keine Listen mehr, sondern führen Gespräche. Allein das verändert die ganze Arbeitswoche.",
        name: "Priya Nandakumar",
        role: "VP Sales",
        company: "Anthemik",
      },
    ],
  },

  integrations: {
    title: "Wir orchestrieren die Tools, die Sie bereits nutzen.",
    body: "Kein Systemwechsel. Wir bauen auf dem Stack auf, den Ihr Team kennt, und verbinden die Teile, die bisher nicht miteinander gesprochen haben.",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Häufige Fragen.",
    body: "Was Teams vor dem Start eines Outbound-Projekts in der Regel wissen möchten.",
    contactLink: "Noch Fragen offen? Sprechen Sie mit uns",
    items: [
      {
        question: "Was macht ForgeGTM?",
        answer:
          "Wir bauen und betreiben Outbound für B2B-Unternehmen: ICP und Targeting, E-Mail-Infrastruktur und Zustellbarkeit, Messaging sowie die Kampagnen selbst. Anschließend steuern wir sie täglich und berichten über qualifizierte Pipeline.",
      },
      {
        question: "Mit wem arbeiten Sie zusammen?",
        answer:
          "Mit B2B-SaaS-, Technologie- und Industrieunternehmen, typischerweise zwischen Series A und C, mit einem klar definierten Angebot und jemandem im Team, der die gebuchten Termine wahrnimmt.",
      },
      {
        question: "Übernehmen Sie die Umsetzung oder nur die Strategie?",
        answer:
          "Die Umsetzung. Wir bauen die Infrastruktur, schreiben die Texte, betreiben die Kampagnen und routen die Antworten. Die Strategie steuert diese Arbeit. Sie ist kein Foliensatz zur Übergabe.",
      },
      {
        question: "Auf welche Märkte sind Sie spezialisiert?",
        answer:
          "Vor allem auf europäische und nordamerikanische B2B-Märkte in den Bereichen SaaS, Technologie und Industrie, einschließlich mehrsprachiger Expansion in DACH, die Nordics und UK.",
      },
      {
        question: "Wie lange dauert es bis zum Launch?",
        answer:
          "Recherche und Aufbau dauern in der Regel vier Wochen, in Woche fünf gehen die Kampagnen live. Die ersten Termine folgen meist zwei bis drei Wochen nach dem Launch, abhängig von Listengröße und Markt.",
      },
      {
        question: "Woran messen Sie den Erfolg?",
        answer:
          "An qualifizierten Terminen, erzeugten Opportunities und den Kosten pro qualifizierter Opportunity, vorab gemeinsam festgelegt. Antwortrate und Volumen sind Diagnosewerte, nicht das Ziel.",
      },
      {
        question: "Arbeiten Sie mit Start-ups?",
        answer:
          "Wir arbeiten mit Teams in frühen Phasen, die Product-Market-Fit erreicht haben und Wachstum systematisieren wollen. Experimente vor dem Product-Market-Fit sind intern meist besser aufgehoben.",
      },
    ],
  },

  about: {
    metaTitle: "Über ForgeGTM",
    metaDescription:
      "ForgeGTM ist eine B2B-Outbound-Agentur, die die Systeme hinter qualifizierter Pipeline aufbaut und betreibt. Wie wir arbeiten und was wir über Outbound denken.",
    eyebrow: "Über uns",
    title: "Wir bauen Outbound-Systeme, keine Kampagnen.",
    lead: "ForgeGTM ist entstanden, weil Outbound meist aus strukturellen Gründen unterperformt: schlechtes Targeting, defekte Infrastruktur, Messaging, das für niemanden konkret geschrieben ist. Das sind ebenso Engineering- wie Kreativprobleme, und genau die übernehmen wir.",
    beliefsTitle: "Wovon wir überzeugt sind",
    beliefs: [
      {
        title: "Relevanz schlägt Volumen",
        body: "Mehr zu versenden ist der einfachste Hebel und zugleich der schnellste Weg, Domain und Marke zu verbrennen. Wir kontaktieren lieber 800 sorgfältig ausgewählte Accounts als 40.000 beliebige.",
      },
      {
        title: "Infrastruktur ist kein Nebenschauplatz",
        body: "Die Zustellbarkeit entscheidet, ob alles andere überhaupt zählt. Domains, Authentifizierung und Versanddisziplin behandeln wir als Kerninfrastruktur: laufend überwacht, nicht einmal geprüft.",
      },
      {
        title: "Das System soll das Projekt überdauern",
        body: "Alles, was wir aufbauen, ist dokumentiert und gehört Ihnen. Würden wir morgen aufhören, hätte Ihr Team weiterhin Targeting, Messaging und Infrastruktur.",
      },
      {
        title: "Berichtet wird über Pipeline, nicht über Aktivität",
        body: "Versendete E-Mails sind kein Ergebnis. Wir legen vor dem Start qualifizierte Termine, Opportunities und Kosten pro Opportunity fest und berichten dagegen.",
      },
    ],
    howTitle: "Wie wir arbeiten",
    how: [
      "Ein verantwortliches Team statt eines Dienstleisters je Funktion. So fällt nichts zwischen zwei Briefings.",
      "Ein fester fünfwöchiger Aufbau, danach ein wöchentlicher Betriebsrhythmus mit festem Review.",
      "Ihr Stack, nicht unserer. Wir bauen auf dem CRM und den Tools auf, die Ihr Team bereits nutzt.",
      "Schriftliche Dokumentation für jedes System, das wir live stellen, laufend übergeben.",
    ],
    teamTitle: "Mit wem Sie zusammenarbeiten würden.",
    teamLead:
      "Outbound ist eine Zusammenarbeit im Tagesgeschäft, da lohnt es sich zu wissen, wer die Arbeit tatsächlich macht.",
    teamPlaceholder: "Profil noch nicht verfasst",
    teamLinkedin: "Auf LinkedIn vernetzen",
    ctaTitle: "Möchten Sie sehen, wie das für Ihr Team aussehen würde?",
  },

  insights: {
    metaTitle: "Insights",
    metaDescription:
      "Praxisnahe Analysen zu B2B-Go-to-Market, Outbound, Zustellbarkeit und ICP-Targeting vom ForgeGTM-Team.",
    eyebrow: "Insights",
    title: "Notizen zu Outbound, das tatsächlich funktioniert.",
    aside:
      "Praxisnahe Analysen aus der täglichen Arbeit: was wir testen, was bricht und was wir anders machen würden. Keine Growth-Hacking-Listen.",
    allCategories: "Alle",
    readingTime: "Min. Lesezeit",
    publishedOn: "Veröffentlicht",
    by: "Von",
    relatedTitle: "Weiterlesen",
    articleCtaTitle: "Sie möchten das für Ihr Team sauber umgesetzt haben?",
    articleCtaBody:
      "Wir bauen und betreiben Outbound-Systeme für B2B-Unternehmen. Wenn Ihnen das oben Beschriebene bekannt vorkommt, klärt ein Strategiegespräch am schnellsten, was wir ändern würden.",
    empty: "In dieser Kategorie gibt es noch keine Artikel.",
  },

  contact: {
    eyebrow: "Strategiegespräch buchen",
    titleLead: "Gemeinsam Ihre",
    titleAccent: "Pipeline aufbauen.",
    body: "Schildern Sie uns Ihre aktuelle Situation. Sie erhalten von uns eine klare Einschätzung, ob Outbound der richtige Hebel ist, und was nötig wäre, damit es funktioniert.",
    steps: [
      {
        step: "01",
        title: "Ein 30-minütiges Gespräch",
        description:
          "Wir sehen uns Ihr aktuelles Vorgehen an, Ihr ICP und die Stellen, an denen Pipeline tatsächlich verloren geht.",
      },
      {
        step: "02",
        title: "Ein schriftlicher Plan",
        description:
          "Zielaccounts, Kanäle, Messaging-Ansätze und die Infrastruktur, die für den Betrieb nötig ist.",
      },
      {
        step: "03",
        title: "Sie entscheiden",
        description:
          "Der Plan gehört Ihnen und kann intern umgesetzt werden. Wenn wir ihn umsetzen sollen, legen wir los.",
      },
    ],
    marquee: "Outbound-Systeme, die qualifizierte Pipeline erzeugen",
    form: {
      name: "Name",
      email: "Geschäftliche E-Mail",
      company: "Unternehmen",
      website: "Website",
      jobTitle: "Position",
      budget: "Budget",
      optional: "(optional)",
      budgetPlaceholder: "Bitte wählen",
      goal: "Was möchten Sie wachsen lassen?",
      goalPlaceholder: "Ein paar Zeilen zu Ihren Zielen …",
      message: "Gibt es noch etwas, das wir wissen sollten?",
      namePlaceholder: "Max Mustermann",
      emailPlaceholder: "max@unternehmen.de",
      companyPlaceholder: "Firma GmbH",
      websitePlaceholder: "acme.de",
      jobTitlePlaceholder: "Head of Growth",
      messagePlaceholder:
        "Aktuelles Outbound-Setup, Zielmärkte, was Sie bereits versucht haben …",
      submit: "Anfrage senden",
      submitting: "Wird gesendet …",
      reassurance: "Unverbindlich. Wir antworten innerhalb eines Werktags.",
      freeEmailNotice:
        "Mit einer geschäftlichen Adresse können wir uns besser vorbereiten. Private Adressen sind aber ebenfalls in Ordnung.",
      modalEyebrow: "Strategiegespräch buchen",
      triggerLead:
        "Sagen Sie uns, was Sie wachsen lassen möchten. Wir melden uns innerhalb eines Werktags.",
      modalTitle: "Lassen Sie uns Ihr Wachstum aufbauen.",
      close: "Schließen",
      successTitle: "Anfrage erhalten.",
      successBody:
        "Vielen Dank. Ihre Angaben sind bei uns eingegangen. Ein Mitglied des ForgeGTM-Teams meldet sich innerhalb eines Werktags zur Terminabstimmung.",
      successFallback:
        "Nichts im Posteingang? Prüfen Sie den Spam-Ordner oder schreiben Sie uns direkt an",
      successNoEmail:
        "Die Bestätigungs-E-Mail konnte nicht versendet werden. Ihre Anfrage ist aber bei uns eingegangen und wir melden uns. Sie erreichen uns auch direkt unter",
      budgetOptions: ["< 10.000 €", "10.000 – 30.000 €", "30.000 – 75.000 €", "75.000 €+"],
      goalOptions: [
        "Outbound-System von Grund auf aufbauen",
        "Zustellbarkeit und E-Mail-Infrastruktur in Ordnung bringen",
        "ICP und Targeting schärfen",
        "Antwort- und Conversion-Raten verbessern",
        "Bestehendes Outbound skalieren",
        "Etwas anderes",
      ],
      errors: {
        name: "Bitte nennen Sie uns Ihren Namen.",
        nameLong: "Dieser Name ist zu lang.",
        emailRequired: "Eine geschäftliche E-Mail-Adresse ist erforderlich.",
        emailInvalid: "Das sieht nicht nach einer gültigen E-Mail-Adresse aus.",
        emailLong: "Diese E-Mail-Adresse ist zu lang.",
        company: "Bitte geben Sie Ihr Unternehmen an.",
        companyLong: "Dieser Name ist zu lang.",
        websiteInvalid: "Bitte geben Sie eine gültige URL an, z. B. acme.de",
        websiteDomain: "Bitte geben Sie eine vollständige Domain an, z. B. acme.de",
        websiteLong: "Diese URL ist zu lang.",
        jobTitleLong: "Diese Positionsbezeichnung ist zu lang.",
        optionInvalid: "Bitte wählen Sie eine der angebotenen Optionen.",
        goalRequired: "Sagen Sie uns, was Sie wachsen lassen möchten.",
        goalLong: "Bitte beschränken Sie sich auf 4.000 Zeichen.",
        messageLong: "Bitte beschränken Sie sich auf 4.000 Zeichen.",
        summary: "Bitte prüfen Sie die markierten Felder und versuchen Sie es erneut.",
        notConfigured:
          "Das Formular konnte gerade nicht übermittelt werden. Bitte schreiben Sie an {email}. Wir kümmern uns umgehend darum.",
        unexpected:
          "Auf unserer Seite ist etwas schiefgelaufen. Bitte versuchen Sie es erneut oder schreiben Sie an {email}.",
      },
    },
  },

  footer: {
    description:
      "Outbound-Systeme, die qualifizierte Pipeline für ambitionierte B2B-Unternehmen erzeugen.",
    explore: "Entdecken",
    connect: "Kontakt",
    legal: "Rechtliches",
    privacy: "Datenschutz",
    imprint: "Impressum",
    rights: "Alle Rechte vorbehalten.",
    skipToContent: "Zum Inhalt springen",
  },

  legal: {
    lastUpdated: "Zuletzt aktualisiert",
    privacyTitle: "Datenschutzerklärung",
    privacyDescription:
      "Wie ForgeGTM personenbezogene Daten erhebt, verwendet und schützt, die über diese Website erfasst werden.",
    imprintTitle: "Impressum",
    imprintDescription: "Rechtliche Angaben und Unternehmensinformationen zu ForgeGTM.",
    eyebrow: "Rechtliches",
  },
};
