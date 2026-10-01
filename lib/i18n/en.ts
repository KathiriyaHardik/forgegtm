/**
 * English dictionary — the source of truth for site copy.
 *
 * Its shape defines the `Dictionary` type, so every other locale must provide
 * exactly the same keys or the build fails. Add new copy here first.
 */
export const en = {
  meta: {
    title: "ForgeGTM | Qualified pipeline, built on outbound systems",
    description:
      "ForgeGTM is a B2B go-to-market and outbound agency. We build and run targeting, email infrastructure, messaging and campaigns that generate qualified pipeline.",
  },

  nav: {
    services: "Services",
    caseStudies: "Case Studies",
    insights: "Insights",
    about: "About",
    languageLabel: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "ForgeGTM home",
    primary: "Primary",
  },

  cta: {
    bookCall: "Book a Strategy Call",
    buildPipeline: "Let's Build Your Pipeline",
    startConversation: "Start a Conversation",
    seeHowItWorks: "See how it works",
    exploreWork: "Explore Our Work",
    readCaseStudy: "Read the case study",
    readArticle: "Read article",
    allCaseStudies: "All case studies",
    allInsights: "All insights",
    backToCaseStudies: "Back to case studies",
    backToInsights: "Back to insights",
  },

  hero: {
    eyebrow: "B2B GO-TO-MARKET & RevOps",
    headlineLead: "Revenue growth engineered for the modern",
    headlineAccent: "market.",
    body: "We help ambitious companies build intelligent growth systems through strategy, automation, outbound execution and scalable infrastructure.",
    qualifiers: [
      "B2B SaaS & technology",
      "Series A–C",
      "DACH, UK & Nordics",
    ],
    visualCaption: "Research → Systems → Qualified pipeline",
  },

  logos: {
    label: "Built for teams like these",
  },

  commitments: {
    items: [
      { value: "5 weeks", label: "Research to first booked meetings" },
      { value: "9", label: "Services delivered under one roof" },
      { value: "1", label: "Accountable team, not four vendors" },
      { value: "Daily", label: "Campaign management and reply routing" },
    ],
    note: "How every ForgeGTM engagement is run.",
  },

  problem: {
    eyebrow: "The problem",
    titleLead: "Most companies don't have a growth problem.",
    titleTrail: "They have a systems problem.",
    items: [
      {
        index: "01",
        title: "Growth feels random",
        description:
          "Revenue arrives in unpredictable spikes. Without a system, every quarter starts from zero and scale becomes a guessing game.",
      },
      {
        index: "02",
        title: "Tools don't talk",
        description:
          "A dozen disconnected apps, manual handoffs, and data trapped in silos. Teams spend more time on operations than on customers.",
      },
      {
        index: "03",
        title: "Outbound doesn't land",
        description:
          "Generic sequences, low reply rates, and burned domains. The market is louder than ever and untargeted effort disappears.",
      },
      {
        index: "04",
        title: "AI stays a buzzword",
        description:
          "Everyone talks about automation and AI, but few translate it into compounding, measurable revenue infrastructure.",
      },
    ],
  },

  services: {
    eyebrow: "What we build",
    title: "One partner for the entire revenue engine.",
    aside:
      "Eight interlocking capabilities, delivered as one coherent system rather than a pile of disconnected tactics.",
    items: [
      {
        icon: "strategy",
        name: "Go-to-market strategy",
        value:
          "Positioning, ICP and messaging built around a market that actually converts.",
      },
      {
        icon: "revops",
        name: "Revenue operations",
        value:
          "A single source of truth across marketing, sales and success, instrumented end to end.",
      },
      {
        icon: "automation",
        name: "Workflow automation",
        value:
          "Remove manual work with resilient, observable automations across your stack.",
      },
      {
        icon: "outbound",
        name: "Outbound systems",
        value:
          "Deliverable, personalized outbound engines that book qualified meetings at scale.",
      },
      {
        icon: "crm",
        name: "CRM implementation",
        value:
          "HubSpot and pipeline architecture designed for clean data and fast reporting.",
      },
      {
        icon: "ai",
        name: "AI implementation",
        value:
          "Applied AI agents and enrichment that compound leverage across the funnel.",
      },
      {
        icon: "content",
        name: "Content systems",
        value:
          "Editorial engines that turn expertise into a steady flow of demand.",
      },
      {
        icon: "website",
        name: "Website development",
        value:
          "Fast, accessible, conversion-focused sites engineered like a product.",
      },
    ],
  },

  process: {
    eyebrow: "How we work",
    title: "A disciplined path from ambition to compounding growth.",
    steps: [
      {
        number: "01",
        title: "Discover",
        description:
          "We audit your funnel, data, and stack to map where revenue leaks and where leverage hides.",
      },
      {
        number: "02",
        title: "Strategize",
        description:
          "A prioritized growth architecture: ICP, channels, and the systems that will move the number.",
      },
      {
        number: "03",
        title: "Build",
        description:
          "We engineer the infrastructure: automations, CRM, outbound, and AI, wired to work as one.",
      },
      {
        number: "04",
        title: "Launch",
        description:
          "Systems go live with instrumentation from day one, so every input is measurable.",
      },
      {
        number: "05",
        title: "Scale",
        description:
          "We compound what works, retire what doesn't, and expand into new markets with confidence.",
      },
    ],
  },

  caseStudies: {
    eyebrow: "Case studies",
    title: "What a working outbound system looks like.",
    aside:
      "Scenarios showing how the pieces come together in practice: the situation we typically walk into, what we change, and what moves as a result.",
    indexTitle: "Case studies",
    indexHeadline: "Outbound systems, start to finish.",
    indexAside:
      "Each case study walks through the situation, the strategy, the campaigns we ran and what moved, written the way we'd brief it internally.",
    disclosureLead: "About these case studies:",
    disclosure:
      "Every company shown is fictional and the figures are modelled to illustrate how the work fits together. They do not represent ForgeGTM clients or measured results.",
    placeholderBadge: "Illustrative example",
    labels: {
      industry: "Industry",
      icp: "Target audience / ICP",
      challenge: "Challenge",
      situation: "Initial situation",
      strategy: "GTM strategy",
      approach: "Outbound approach",
      execution: "Campaign execution",
      messaging: "Messaging approach",
      results: "Results",
      metrics: "Key metrics",
      beforeAfter: "Before and after",
      before: "Before",
      after: "After",
      lessons: "Lessons learned",
      outcome: "Final outcome",
      readingTime: "min read",
    },
  },

  testimonials: {
    eyebrow: "Testimonials",
    title: "What better outbound sounds like.",
    aside:
      "The shift teams describe is rarely about volume. It is about talking to fewer, better-qualified companies, more often.",
    placeholderBadge: "Placeholder testimonials",
    disclosure:
      "Written for demonstration using fictional names and companies, not real customer quotes.",
    items: [
      {
        quote:
          "The targeting work was the part we underestimated. We contact far fewer companies now and speak to more of the right ones.",
        name: "Ana Weber",
        role: "Head of Growth",
        company: "Northfield Analytics",
      },
      {
        quote:
          "Deliverability was the silent problem. Once the infrastructure was rebuilt, the same messaging started getting replies.",
        name: "Daniel Achterberg",
        role: "Chief Revenue Officer",
        company: "Vantix Industrial",
      },
      {
        quote:
          "Our reps stopped building lists and started having conversations. That alone changed what the week looks like.",
        name: "Priya Nandakumar",
        role: "VP Sales",
        company: "Anthemik",
      },
    ],
  },

  integrations: {
    eyebrow: "Technology ecosystem",
    title: "We orchestrate the tools you already trust.",
    body: "No rip-and-replace. We build on the stack your team already knows, and connect the parts that were never talking.",
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    body: "What teams usually want to know before starting an outbound engagement.",
    contactLink: "Still have questions? Talk to us",
    items: [
      {
        question: "What does ForgeGTM do?",
        answer:
          "We build and run outbound for B2B companies: ICP and targeting, email infrastructure and deliverability, messaging, and the campaigns themselves. We then manage them daily and report on qualified pipeline.",
      },
      {
        question: "Who do you work with?",
        answer:
          "B2B SaaS, technology and industrial companies, typically Series A through C, with a defined offer and someone in place to take the meetings we book.",
      },
      {
        question: "Do you handle execution, or just strategy?",
        answer:
          "Execution. We build the infrastructure, write the copy, run the campaigns and route the replies. The strategy exists to direct that work, not to be handed over as a deck.",
      },
      {
        question: "What markets do you specialise in?",
        answer:
          "Primarily European and North American B2B markets across SaaS, technology and industrial sectors, including multi-language expansion into DACH, the Nordics and the UK.",
      },
      {
        question: "How long does it take to launch?",
        answer:
          "Research and build typically take four weeks, with campaigns live in week five. First booked meetings usually follow within two to three weeks of launch, depending on list size and market.",
      },
      {
        question: "How do you measure success?",
        answer:
          "On qualified meetings, opportunities created and cost per qualified opportunity, all agreed before we start. Reply rate and volume are diagnostics, not the goal.",
      },
      {
        question: "Do you work with startups?",
        answer:
          "We work with early-stage teams that have found product-market fit and are ready to systemise growth. Pre-PMF experimentation is usually better served in-house.",
      },
    ],
  },

  about: {
    metaTitle: "About ForgeGTM",
    metaDescription:
      "ForgeGTM builds the systems behind sustainable growth: strategy, revenue operations, outbound and applied AI, delivered as one engine.",
    eyebrow: "About ForgeGTM",
    title: "Growth, engineered with German precision.",
    lead: "ForgeGTM was founded on a simple conviction: sustainable growth is not luck or hustle. It is a system that can be designed, measured, and improved.",
    // Figures are unverified until `statsConfirmed` is set true in the About
    // page, which is what removes the on-page notice. Do not quietly flip it.
    statsNote: "Figures to be confirmed",
    stats: [
      { value: "2021", label: "Founded in Berlin" },
      { value: "7", label: "Markets served" },
      { value: "120+", label: "Systems shipped" },
      { value: "24", label: "Specialists" },
    ],
    story: [
      "We started in Berlin after years spent inside fast-scaling B2B and SaaS companies, watching brilliant teams stall because their growth depended on heroics instead of infrastructure.",
      "So we built the partner we wished we had: one that combines strategy, revenue operations, outbound, and applied AI into a single coherent engine, delivered with the rigour you would expect from German engineering.",
      "Today we help ambitious companies across Germany, Austria, Switzerland, the Netherlands, the UK, Canada and Singapore turn growth from a guessing game into a system they own.",
    ],
    valuesEyebrow: "What we stand for",
    values: [
      {
        title: "Systems over tactics",
        body: "We build infrastructure that compounds, not one-off campaigns that fade.",
      },
      {
        title: "Precision and clarity",
        body: "Measured, instrumented, transparent. No vanity metrics, no black boxes.",
      },
      {
        title: "Partnership",
        body: "We embed like a senior team, aligned to your numbers, not billable hours.",
      },
    ],
    teamEyebrow: "The people behind ForgeGTM",
    teamPlaceholder: "Profile not yet written",
    teamLinkedin: "Connect on LinkedIn",
    ctaTitle: "Let's build your next growth engine.",
  },

  insights: {
    metaTitle: "Insights",
    metaDescription:
      "Practical analysis on B2B go-to-market, outbound, deliverability and ICP targeting from the ForgeGTM team.",
    eyebrow: "Insights",
    title: "Notes on outbound that actually works.",
    aside:
      "Practical analysis from the work itself: what we test, what breaks, and what we would do differently. No growth-hacking listicles.",
    allCategories: "All",
    readingTime: "min read",
    publishedOn: "Published",
    by: "By",
    relatedTitle: "Related reading",
    articleCtaTitle: "Want this done properly for your team?",
    articleCtaBody:
      "We build and run outbound systems for B2B companies. If any of the above sounds like your current setup, a strategy call is the fastest way to find out what we would change.",
    empty: "No articles in this category yet.",
  },

  contact: {
    titleLead: "Let's build your next",
    titleAccent: "growth engine.",
    body: "One conversation is enough to see where the leverage is. Book a strategy call and we'll map it out.",
    marquee: "Outbound systems that generate qualified pipeline",
    form: {
      name: "Name",
      email: "Work email",
      company: "Company",
      website: "Website",
      jobTitle: "Job title",
      budget: "Budget",
      optional: "(optional)",
      budgetPlaceholder: "Select a range",
      goal: "What are you trying to grow?",
      goalPlaceholder: "A few lines about your goals...",
      message: "Anything else we should know?",
      namePlaceholder: "Jane Doe",
      emailPlaceholder: "jane@company.com",
      companyPlaceholder: "Company GmbH",
      websitePlaceholder: "acme.com",
      jobTitlePlaceholder: "Head of Growth",
      messagePlaceholder:
        "Current outbound setup, target markets, what you've already tried…",
      submit: "Send request",
      submitting: "Sending…",
      reassurance: "No obligation. We reply within one business day.",
      freeEmailNotice:
        "A work address helps us prepare properly, though personal ones are fine too.",
      modalEyebrow: "Book a strategy call",
      triggerLead:
        "Tell us what you're trying to grow. We'll come back within one business day.",
      modalTitle: "Let's engineer your growth.",
      close: "Close",
      successTitle: "Request received.",
      successBody:
        "Thanks. We've got your details. A member of the ForgeGTM team will reply within one business day to arrange your strategy call.",
      successFallback: "Nothing in your inbox? Check spam, or email us directly at",
      // Shown instead of successFallback when the confirmation email did not
      // send. It must not imply one is on its way.
      successNoEmail:
        "We couldn't send your confirmation email, but your request did reach us and we'll be in touch. You can also reach us directly at",
      // Shown as selectable pills in the modal. The stored value is this
      // exact string, and the server checks membership, so editing an entry
      // here changes what is accepted — old rows keep their old wording.
      budgetOptions: ["< €10k", "€10k – €30k", "€30k – €75k", "€75k+"],
      goalOptions: [
        "Build an outbound system from scratch",
        "Fix deliverability and email infrastructure",
        "Sharpen ICP and targeting",
        "Improve reply and conversion rates",
        "Scale an existing outbound motion",
        "Something else",
      ],
      errors: {
        name: "Please tell us your name.",
        nameLong: "That name is too long.",
        emailRequired: "A work email is required.",
        emailInvalid: "That doesn't look like a valid email address.",
        emailLong: "That email address is too long.",
        company: "Please add your company name.",
        companyLong: "That name is too long.",
        websiteInvalid: "Please enter a valid URL, e.g. acme.com",
        websiteDomain: "Please enter a full domain, e.g. acme.com",
        websiteLong: "That URL is too long.",
        jobTitleLong: "That job title is too long.",
        optionInvalid: "Please choose one of the listed options.",
        goalRequired: "Tell us what you're trying to grow.",
        goalLong: "Please keep this under 4,000 characters.",
        messageLong: "Please keep this under 4,000 characters.",
        summary: "Please check the highlighted fields and try again.",
        notConfigured:
          "We couldn't submit the form right now. Please email {email} and we'll pick it up straight away.",
        unexpected:
          "Something went wrong on our end. Please try again, or email {email}.",
      },
    },
  },

  footer: {
    description:
      "Outbound systems that generate qualified pipeline for ambitious B2B companies.",
    company: "Company",
    services: "Services",
    markets: "Markets",
    legal: "Legal",
    privacy: "Privacy",
    imprint: "Imprint",
    bookCall: "Book a call",
    rights: "All rights reserved.",
    skipToContent: "Skip to content",
    // Plain text, not links: there are no per-country pages, and inventing
    // them would be a broken promise in the one place a visitor checks for
    // whether you cover their region.
    marketList: [
      "Germany",
      "United Kingdom",
      "Canada",
      "Singapore",
      "Switzerland",
      "Netherlands",
      "Austria",
    ],
    serviceLinks: [
      "Strategy",
      "Revenue ops",
      "Automation",
      "Outbound",
      "AI",
    ],
  },

  legal: {
    lastUpdated: "Last updated",
    privacyTitle: "Privacy Policy",
    privacyDescription:
      "How ForgeGTM collects, uses and protects personal data collected through this website.",
    imprintTitle: "Imprint",
    imprintDescription: "Legal disclosures and company information for ForgeGTM.",
    eyebrow: "Legal",
  },
};

export type Dictionary = typeof en;
