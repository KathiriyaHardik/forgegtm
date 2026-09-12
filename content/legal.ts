import type { Locale } from "@/lib/i18n/config";

/**
 * TEMPLATE LEGAL COPY — GDPR/DDG-shaped skeletons, not legal advice.
 *
 * `fill` markers render as visible dashed badges so nothing ships
 * half-complete. Every one must be replaced with ForgeGTM's real details and
 * the finished text reviewed by a qualified lawyer in each jurisdiction.
 *
 * A paragraph is an array of strings and {fill} markers, so the same structure
 * renders in any locale.
 */

export type Fragment = string | { fill: string };
export type LegalSectionContent = { heading: string; paragraphs: Fragment[][] };

export const PRIVACY: Record<Locale, LegalSectionContent[]> = {
  en: [
    {
      heading: "Who we are",
      paragraphs: [
        [
          "This website is operated by ",
          { fill: "Registered company name" },
          ", ",
          { fill: "Registered address" },
          " (“ForgeGTM”, “we”, “us”). We are the controller responsible for personal data processed through this site.",
        ],
        ["For any privacy question, contact us at ", { fill: "privacy@yourdomain.com" }, "."],
      ],
    },
    {
      heading: "What we collect",
      paragraphs: [
        [
          "When you submit the strategy-call form, we process the details you provide: name, work email, company, and optionally website, job title, budget range and your message.",
        ],
        [
          "Our hosting and analytics providers may also process technical data such as IP address, browser type, referring page and pages viewed.",
        ],
      ],
    },
    {
      heading: "Why we process it and on what basis",
      paragraphs: [
        [
          "We process enquiry data to respond to you and to carry out pre-contractual steps at your request. We process technical data on the basis of our legitimate interest in operating a secure, working website.",
        ],
        [
          "Where we rely on consent — for example non-essential cookies or marketing email — you may withdraw it at any time without affecting processing carried out beforehand.",
        ],
      ],
    },
    {
      heading: "Who we share it with",
      paragraphs: [
        [
          "We share personal data only with processors acting on our instructions, such as our hosting, database and transactional email providers: ",
          { fill: "List your actual processors" },
          ". We do not sell personal data.",
        ],
        [
          "Where a provider processes data outside the EEA or UK, we rely on an appropriate transfer mechanism such as the EU Standard Contractual Clauses.",
        ],
      ],
    },
    {
      heading: "How long we keep it",
      paragraphs: [
        [
          "Enquiry correspondence is retained for ",
          { fill: "your retention period" },
          ", after which it is deleted or anonymised. Data required for legal, tax or accounting purposes is retained for the period those obligations require.",
        ],
      ],
    },
    {
      heading: "Your rights",
      paragraphs: [
        [
          "Subject to the conditions in applicable law, you have the right to access your personal data, to have it corrected or erased, to restrict or object to processing, and to data portability.",
        ],
        [
          "You may also lodge a complaint with a supervisory authority. Our lead authority is ",
          { fill: "Your supervisory authority" },
          ".",
        ],
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        [
          "We use cookies that are strictly necessary to operate the site — including one that remembers your language choice — and, only with your consent, cookies that help us measure usage.",
        ],
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        [
          "We may update this policy to reflect changes to our practices or legal obligations. The date at the top of this page indicates when it was last revised.",
        ],
      ],
    },
  ],
  de: [
    {
      heading: "Verantwortlicher",
      paragraphs: [
        [
          "Diese Website wird betrieben von ",
          { fill: "Firmierung" },
          ", ",
          { fill: "Anschrift" },
          " („ForgeGTM“, „wir“, „uns“). Wir sind der für die über diese Website verarbeiteten personenbezogenen Daten Verantwortliche.",
        ],
        [
          "Bei Fragen zum Datenschutz erreichen Sie uns unter ",
          { fill: "privacy@ihre-domain.de" },
          ".",
        ],
      ],
    },
    {
      heading: "Welche Daten wir erheben",
      paragraphs: [
        [
          "Wenn Sie das Formular für ein Strategiegespräch absenden, verarbeiten wir die von Ihnen angegebenen Daten: Name, geschäftliche E-Mail-Adresse, Unternehmen sowie optional Website, Position, Budgetrahmen und Ihre Nachricht.",
        ],
        [
          "Unsere Hosting- und Analyse-Dienstleister verarbeiten daneben technische Daten wie IP-Adresse, Browsertyp, verweisende Seite und aufgerufene Seiten.",
        ],
      ],
    },
    {
      heading: "Zwecke und Rechtsgrundlagen",
      paragraphs: [
        [
          "Anfragedaten verarbeiten wir, um Ihnen zu antworten und auf Ihren Wunsch vorvertragliche Maßnahmen durchzuführen (Art. 6 Abs. 1 lit. b DSGVO). Technische Daten verarbeiten wir auf Grundlage unseres berechtigten Interesses am sicheren und funktionsfähigen Betrieb der Website (Art. 6 Abs. 1 lit. f DSGVO).",
        ],
        [
          "Soweit wir uns auf eine Einwilligung stützen — etwa bei nicht notwendigen Cookies oder E-Mail-Marketing — können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.",
        ],
      ],
    },
    {
      heading: "Empfänger der Daten",
      paragraphs: [
        [
          "Wir geben personenbezogene Daten ausschließlich an Auftragsverarbeiter weiter, die weisungsgebunden für uns tätig werden, etwa unsere Hosting-, Datenbank- und Transaktions-E-Mail-Dienstleister: ",
          { fill: "Ihre tatsächlichen Auftragsverarbeiter" },
          ". Ein Verkauf personenbezogener Daten findet nicht statt.",
        ],
        [
          "Sofern ein Dienstleister Daten außerhalb des EWR oder des Vereinigten Königreichs verarbeitet, stützen wir die Übermittlung auf geeignete Garantien wie die EU-Standardvertragsklauseln.",
        ],
      ],
    },
    {
      heading: "Speicherdauer",
      paragraphs: [
        [
          "Anfragekorrespondenz bewahren wir für ",
          { fill: "Ihre Speicherdauer" },
          " auf und löschen oder anonymisieren sie anschließend. Daten, die gesetzlichen Aufbewahrungspflichten unterliegen, speichern wir für die jeweils vorgeschriebene Dauer.",
        ],
      ],
    },
    {
      heading: "Ihre Rechte",
      paragraphs: [
        [
          "Nach Maßgabe der gesetzlichen Voraussetzungen haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch sowie auf Datenübertragbarkeit.",
        ],
        [
          "Darüber hinaus können Sie sich bei einer Aufsichtsbehörde beschweren. Die für uns zuständige Behörde ist ",
          { fill: "Zuständige Aufsichtsbehörde" },
          ".",
        ],
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        [
          "Wir setzen technisch notwendige Cookies ein — darunter eines, das Ihre Sprachauswahl speichert — sowie, ausschließlich mit Ihrer Einwilligung, Cookies zur Reichweitenmessung.",
        ],
      ],
    },
    {
      heading: "Änderungen dieser Erklärung",
      paragraphs: [
        [
          "Wir passen diese Datenschutzerklärung an, wenn sich unsere Verarbeitung oder die rechtlichen Anforderungen ändern. Das Datum am Seitenanfang gibt den Stand der letzten Überarbeitung an.",
        ],
      ],
    },
  ],
};

export const IMPRINT: Record<Locale, LegalSectionContent[]> = {
  en: [
    {
      heading: "Company details",
      paragraphs: [
        [
          { fill: "Registered company name" },
          " · ",
          { fill: "Street and number" },
          " · ",
          { fill: "Postcode, city" },
          " · ",
          { fill: "Country" },
        ],
      ],
    },
    {
      heading: "Represented by",
      paragraphs: [[{ fill: "Name of managing director / owner" }]],
    },
    {
      heading: "Contact",
      paragraphs: [
        ["Email: ", { fill: "hello@yourdomain.com" }],
        ["Telephone: ", { fill: "+00 000 0000000" }],
      ],
    },
    {
      heading: "Register entry",
      paragraphs: [
        ["Register court: ", { fill: "Registering court" }],
        ["Registration number: ", { fill: "Registration number" }],
      ],
    },
    {
      heading: "VAT identification number",
      paragraphs: [[{ fill: "VAT ID" }]],
    },
    {
      heading: "Responsible for editorial content",
      paragraphs: [[{ fill: "Name and address of responsible person" }]],
    },
    {
      heading: "Online dispute resolution",
      paragraphs: [
        [
          "The European Commission provides a platform for online dispute resolution at ec.europa.eu/consumers/odr. We are ",
          { fill: "willing / not willing" },
          " to participate in dispute resolution proceedings before a consumer arbitration board.",
        ],
      ],
    },
    {
      heading: "Liability for content and links",
      paragraphs: [
        [
          "We take care to keep the content of this site accurate and current, but accept no liability for its completeness or accuracy. Our site contains links to external websites over whose content we have no control, and for which the respective operator is responsible.",
        ],
      ],
    },
  ],
  de: [
    {
      heading: "Angaben gemäß § 5 DDG",
      paragraphs: [
        [
          { fill: "Firmierung" },
          " · ",
          { fill: "Straße und Hausnummer" },
          " · ",
          { fill: "PLZ, Ort" },
          " · ",
          { fill: "Land" },
        ],
      ],
    },
    {
      heading: "Vertreten durch",
      paragraphs: [[{ fill: "Name der Geschäftsführung / Inhaberin" }]],
    },
    {
      heading: "Kontakt",
      paragraphs: [
        ["E-Mail: ", { fill: "hello@ihre-domain.de" }],
        ["Telefon: ", { fill: "+49 000 0000000" }],
      ],
    },
    {
      heading: "Registereintrag",
      paragraphs: [
        ["Registergericht: ", { fill: "Registergericht" }],
        ["Registernummer: ", { fill: "Registernummer" }],
      ],
    },
    {
      heading: "Umsatzsteuer-Identifikationsnummer",
      paragraphs: [[{ fill: "USt-IdNr." }]],
    },
    {
      heading: "Redaktionell verantwortlich (§ 18 Abs. 2 MStV)",
      paragraphs: [[{ fill: "Name und Anschrift der verantwortlichen Person" }]],
    },
    {
      heading: "Online-Streitbeilegung",
      paragraphs: [
        [
          "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: ec.europa.eu/consumers/odr. Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir ",
          { fill: "bereit / nicht bereit" },
          ".",
        ],
      ],
    },
    {
      heading: "Haftung für Inhalte und Links",
      paragraphs: [
        [
          "Wir halten die Inhalte dieser Website sorgfältig aktuell, übernehmen jedoch keine Gewähr für deren Vollständigkeit und Richtigkeit. Unsere Website enthält Links zu externen Websites, auf deren Inhalte wir keinen Einfluss haben und für die der jeweilige Anbieter verantwortlich ist.",
        ],
      ],
    },
  ],
};
