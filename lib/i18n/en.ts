/**
 * English dictionary — the source of truth for site copy.
 *
 * Its shape defines the `Dictionary` type, so every other locale must provide
 * exactly the same keys or the build fails. Add new copy here first.
 */
export const en = {
  meta: {
    title: "ForgeGTM — Qualified pipeline, built on outbound systems",
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
    readCaseStudy: "Read the case study",
    readArticle: "Read article",
    allCaseStudies: "All case studies",
    allInsights: "All insights",
    backToCaseStudies: "Back to case studies",
    backToInsights: "Back to insights",
  },

  hero: {
    eyebrow: "B2B outbound & go-to-market",
    headlineLead: "Qualified pipeline, built on",
    headlineAccent: "outbound systems.",
    body: "ForgeGTM builds and runs outbound for B2B companies — targeting, infrastructure, messaging and campaigns — so your sales team spends its time in qualified conversations instead of building lists.",
    qualifiers: [
      "B2B SaaS & technology",
      "Series A–C",
      "DACH, UK & Nordics",
    ],
    visualCaption: "Research → Systems → Qualified pipeline",
  },

  logos: {
    label: "Built for teams like these",
    placeholder: "Placeholder brands",
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
    titleMuted: "Most outbound doesn't fail because of effort.",
    titleRest: "It fails because of the system behind it.",
    aside:
      "Three problems account for most underperforming outbound. Each one is fixable, but only if it is treated as infrastructure rather than a copywriting problem.",
    items: [
      {
        index: "01",
        title: "Volume without targeting",
        description:
          "A bought list of 40,000 contacts gets emailed because it exists. Reply rates collapse, the brand gets burned in exactly the accounts that mattered most.",
        symptom: "Reach measured instead of relevance",
      },
      {
        index: "02",
        title: "Messaging that reads like a template",
        description:
          "A first name and a company name pasted into the same paragraph everyone else is sending. Buyers recognise the pattern in under a second and delete it.",
        symptom: "Personalisation by merge tag",
      },
      {
        index: "03",
        title: "Deliverability failing silently",
        description:
          "Campaigns look fine in the dashboard while the mail lands in spam. Nothing appears broken, because the metric that broke is the one nobody is watching.",
        symptom: "Sent, but never seen",
      },
    ],
  },

  services: {
    eyebrow: "What we do",
    title: "Everything an outbound motion needs, run as one system.",
    aside:
      "Most teams buy these in pieces from different vendors, then spend their time integrating them. ForgeGTM owns the whole chain and is measured on what comes out of it.",
    pillars: [
      {
        number: "01",
        name: "Strategy & Targeting",
        summary:
          "Decide who is worth contacting before spending a euro reaching them.",
        services: [
          {
            name: "Outbound Strategy",
            value:
              "A channel and sequencing plan tied to a revenue number, so outbound stops being a series of disconnected experiments.",
          },
          {
            name: "ICP & Targeting",
            value:
              "A precise definition of who actually buys — and the account list that follows from it — so reps stop working accounts that were never going to close.",
          },
          {
            name: "Buying-Signal Research",
            value:
              "Hiring, funding, tech-stack and trigger events surfaced continuously, so you reach accounts while the need is live rather than months after.",
          },
        ],
      },
      {
        number: "02",
        name: "Infrastructure & Deliverability",
        summary: "Make sure what you send actually reaches a human inbox.",
        services: [
          {
            name: "Email Infrastructure",
            value:
              "Domains, inboxes, authentication and warm-up built as owned infrastructure — not rented from a tool you'd lose access to tomorrow.",
          },
          {
            name: "Deliverability",
            value:
              "Monitoring, list hygiene and sending discipline that keep you out of spam, protecting both reply rates and your primary domain.",
          },
          {
            name: "Campaign Strategy",
            value:
              "Sequence architecture, volume pacing and routing designed so campaigns scale without burning the domains underneath them.",
          },
        ],
      },
      {
        number: "03",
        name: "Messaging & Pipeline",
        summary:
          "Turn attention into qualified conversations your team can close.",
        services: [
          {
            name: "Personalized Copywriting",
            value:
              "Messaging written per segment and tested continuously, so relevance comes from research rather than a merge tag.",
          },
          {
            name: "Lead Generation",
            value:
              "Consistent top-of-funnel volume with qualification built in, so your calendar fills with conversations worth having.",
          },
          {
            name: "Pipeline Generation",
            value:
              "Meetings handed over with context, tracked through to opportunity, and reported against cost per qualified opportunity.",
          },
        ],
      },
    ],
  },

  process: {
    eyebrow: "How it works",
    title: "From research to booked meetings in about five weeks.",
    aside:
      "A fixed build, then a continuous operating rhythm. You always know what is being worked on, what it produced, and what it cost per qualified opportunity.",
    steps: [
      {
        number: "01",
        title: "Research",
        description:
          "We define the ICP, map the buying committee, and identify the accounts showing real buying signals right now.",
        output: "ICP & account list",
        duration: "Week 1–2",
      },
      {
        number: "02",
        title: "Build",
        description:
          "Targeting, messaging, sending infrastructure and campaign architecture get built and warmed before anything goes out.",
        output: "Live infrastructure",
        duration: "Week 2–4",
      },
      {
        number: "03",
        title: "Launch",
        description:
          "Campaigns go live and are managed daily — replies routed, objections logged, volume paced to protect deliverability.",
        output: "Booked meetings",
        duration: "Week 5",
      },
      {
        number: "04",
        title: "Optimize",
        description:
          "We test messaging against real reply data, retire what underperforms, and expand into adjacent segments as signal proves out.",
        output: "Compounding pipeline",
        duration: "Ongoing",
      },
    ],
  },

  caseStudies: {
    eyebrow: "Case studies",
    title: "What a working outbound system looks like.",
    aside:
      "Scenarios showing how the pieces come together in practice — the situation we typically walk into, what we change, and what moves as a result.",
    indexTitle: "Case studies",
    indexHeadline: "Outbound systems, start to finish.",
    indexAside:
      "Each case study walks through the situation, the strategy, the campaigns we ran and what moved — written the way we'd brief it internally.",
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
      "The shift teams describe is rarely about volume — it is about talking to fewer, better-qualified companies, more often.",
    placeholderBadge: "Placeholder testimonials",
    disclosure:
      "Written for demonstration using fictional names and companies — not real customer quotes.",
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
          "We build and run outbound for B2B companies: ICP and targeting, email infrastructure and deliverability, messaging, and the campaigns themselves — then manage them daily and report on qualified pipeline.",
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
          "On qualified meetings, opportunities created and cost per qualified opportunity — agreed before we start. Reply rate and volume are diagnostics, not the goal.",
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
      "ForgeGTM is a B2B outbound agency that builds and runs the systems behind qualified pipeline. How we work, and what we believe about outbound.",
    eyebrow: "About",
    title: "We build outbound systems, not campaigns.",
    lead: "ForgeGTM exists because most outbound underperforms for structural reasons — bad targeting, broken infrastructure, messaging written for nobody in particular. Those are engineering problems as much as creative ones, and they are the problems we take on.",
    beliefsTitle: "What we believe",
    beliefs: [
      {
        title: "Relevance beats volume",
        body: "Sending more is the easiest lever to pull and the fastest way to burn a domain and a brand. We would rather contact 800 well-chosen accounts than 40,000 poorly chosen ones.",
      },
      {
        title: "Infrastructure is not an afterthought",
        body: "Deliverability decides whether anything else matters. We treat domains, authentication and sending discipline as core infrastructure, monitored continuously rather than checked once.",
      },
      {
        title: "The system should outlast the engagement",
        body: "Everything we build is documented and owned by you. If we stopped tomorrow, your team would still have the targeting, the messaging and the infrastructure.",
      },
      {
        title: "Report on pipeline, not activity",
        body: "Emails sent is not a result. We agree on qualified meetings, opportunities and cost per opportunity before starting, and report against those.",
      },
    ],
    howTitle: "How we work",
    how: [
      "One accountable team rather than a vendor per function, so nothing falls between briefs.",
      "A fixed five-week build, then a weekly operating rhythm with a standing review.",
      "Your stack, not ours — we build on the CRM and tooling your team already uses.",
      "Written documentation for every system we put live, handed over as we go.",
    ],
    ctaTitle: "Want to see what this would look like for your team?",
  },

  insights: {
    metaTitle: "Insights",
    metaDescription:
      "Practical analysis on B2B go-to-market, outbound, deliverability and ICP targeting from the ForgeGTM team.",
    eyebrow: "Insights",
    title: "Notes on outbound that actually works.",
    aside:
      "Practical analysis from the work itself — what we test, what breaks, and what we would do differently. No growth-hacking listicles.",
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
    eyebrow: "Book a strategy call",
    titleLead: "Let's build your",
    titleAccent: "pipeline.",
    body: "Tell us where you are today. We'll come back with a straight answer on whether outbound is the right lever — and what it would take to make it work.",
    steps: [
      {
        step: "01",
        title: "A 30-minute call",
        description:
          "We look at your current motion, your ICP and where pipeline is actually leaking.",
      },
      {
        step: "02",
        title: "A written plan",
        description:
          "Target accounts, channels, messaging angles and the infrastructure needed to run them.",
      },
      {
        step: "03",
        title: "You decide",
        description:
          "The plan is yours to keep and run in-house. If you want us to build it, we start.",
      },
    ],
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
        "A work address helps us prepare properly — personal ones are fine too.",
      modalEyebrow: "Book a strategy call",
      triggerLead:
        "Tell us what you're trying to grow. We'll come back within one business day.",
      modalTitle: "Let's engineer your growth.",
      close: "Close",
      successTitle: "Request received.",
      successBody:
        "Thanks — we've got your details. A member of the ForgeGTM team will reply within one business day to arrange your strategy call.",
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
    explore: "Explore",
    connect: "Connect",
    legal: "Legal",
    privacy: "Privacy",
    imprint: "Imprint",
    rights: "All rights reserved.",
    skipToContent: "Skip to content",
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
