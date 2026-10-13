// Single source of truth for the work section on the homepage and the case-study pages.
// Edit the copy here, then run `npm run pages` (or `npm run build`) to regenerate.
// Facts come from the live sites (gagnerapp.com, trenvid.com, 9jabrief.com, 30cycle.com)
// and from the CV. Items marked [CV] are not visible on the public sites.

export const projects = [
  {
    slug: "gagner-for-schools",
    title: "Gagner for Schools",
    kicker: "AI infrastructure for schools",
    summary:
      "AI infrastructure for Nigerian schools: school management, a parent portal, computer-based testing and a safety-first AI layer, with a tutor, quiz master and homework coach for students and drafting tools for teachers.",
    lead: "AI infrastructure for schools. Learning, administration and finance in one place for students, parents and staff, with AI that helps learners understand more and takes routine work off teachers' desks.",
    chips: ["PHP", "JavaScript", "MySQL", "REST APIs", "AI"],
    image: "gagner-schools.jpg",
    imageAlt: "Gagner for Schools sign-in portal showing the student, parent, teacher and admin entry points",
    links: [
      ["Visit Gagner for Schools", "https://gagnerapp.com/schools"],
      ["AI infrastructure", "https://gagnerapp.com/ai-infrastructure"],
    ],
    meta: [
      ["Role", "Architecture & engineering"],
      ["Focus", "Multi-tenant SaaS · AI · school operations"],
      ["Stack", "PHP · JavaScript · MySQL · REST APIs"],
      ["Built for", "Nigerian schools, Pre-Nursery to SS3"],
    ],
    results: [
      ["5", "Solutions in one platform"],
      ["6", "AI systems for students"],
      ["6", "AI tools for teachers & staff"],
      ["4", "Audiences: students, parents, teachers, admins"],
    ],
    story: [
      {
        label: "The problem",
        title: "Schools run on spreadsheets, notebooks and manual work.",
        body: "Admissions, attendance, fees, assessments and report cards usually live in separate places, and teachers carry the paperwork. Gagner for Schools replaces that patchwork with a single intelligence layer built around how Nigerian schools actually operate, not adapted from office software.",
      },
      {
        label: "The approach",
        title: "One shared intelligence layer, maintained centrally.",
        body: "I architected the platform as a multi-tenant SaaS: each school gets its own space, while connecting to a shared layer that is maintained centrally. Curriculum understanding, safety rules and platform-wide learning are updated once and reach every school. The principle throughout is human-in-the-loop: the AI drafts, flags and explains, and teachers, parents and school leaders decide.",
      },
    ],
    highlightsTitle: "Engineering highlights",
    highlights: [
      ["building-2", "Multi-tenant architecture", "Many schools on one platform, each with its own data, all benefiting from a shared, centrally maintained layer."],
      ["book-open", "Curriculum built for Nigeria", "Content based on what Nigerian schools teach, from Pre-Nursery through SS3, across multiple exam bodies."],
      ["layers", "School management", "Admissions, attendance, finance, staff and communication in one place."],
      ["users", "Parent portal", "A single account for parents covering everything that happens in their child's school day."],
      ["file-text", "Computer-based testing", "A question bank through to results, with automated result processing."],
      ["shield-check", "An always-on safety layer", "Every student message and AI reply is checked; serious risk signals stop the conversation and alert adults. Schools cannot switch it off."],
      ["key-round", "PIN-based result access", "Results are released through PINs modelled on WAEC's infrastructure."],
      ["clipboard-list", "Audit trail", "A record of what was asked, what was returned and which student was involved."],
    ],
    minis: [
      {
        title: "AI for students",
        items: [
          ["bot", "Study Buddy", "A curriculum-linked tutor that reads photos of handwritten problems and answers spoken questions."],
          ["sparkles", "AI Quiz Master", "Personalised quizzes checked for accuracy, with a leaderboard across the network."],
          ["compass", "Homework Coach", "Step-by-step help when a student is stuck, guiding the reasoning instead of handing over answers."],
          ["lightbulb", "Idea Lab", "Answers open questions that no single subject covers, by voice or text."],
          ["banknote", "Financial AI Analyst", "Answers questions about fees and spending from a school's live figures."],
          ["heart-handshake", "Special needs support", "Built in from the start, not added later."],
        ],
      },
      {
        title: "AI for teachers and staff",
        items: [
          ["file-text", "Report card remarks", "Drafts comments limited to each student's actual records. Teachers review before they reach reports."],
          ["bar-chart-3", "Result narratives", "A written term overview for every child."],
          ["pen-line", "Assignment feedback", "Written feedback based on individual performance."],
          ["graduation-cap", "Lesson plan assistant", "Suggests objectives, prior knowledge, vocabulary and evaluation questions."],
          ["monitor", "Lesson slide generator", "Turns a lesson note into a slide deck and saves every version."],
          ["list-checks", "Exam & quiz generation", "Builds question sets for CBT and admission exams, checked for accuracy."],
        ],
      },
    ],
    gallery: [
      ["gagner-company.jpg", "Gagner company website: building intelligence from Africa for the world", "Gagner, the company behind the platform. Gagner for Schools is its first product, with Agriculture and Health planned next."],
    ],
  },
  {
    slug: "30-cycle",
    title: "30 Cycle",
    kicker: "Unified creator intelligence",
    summary:
      "One analytics foundation for Africa's creator economy: creators, brands and agencies see cross-platform performance in a single dashboard, powered by the data pipelines and APIs I built and the delivery I now lead.",
    lead: "Unified creator intelligence, built for decision makers. One analytics foundation, with tailored outcomes for creators, SMEs and agencies, so everyone in the creator economy can make decisions with confidence.",
    chips: ["PHP", "MySQL", "REST APIs", "Social APIs", "Delivery"],
    image: "30cycle.jpg",
    imageAlt: "30 Cycle flagship product: Creative Influence & Analytics Platform",
    links: [["Visit 30 Cycle", "https://30cycle.com/solution/"]],
    meta: [
      ["Role", "Backend Developer, then Technical PM"],
      ["Focus", "Data pipelines · APIs · delivery"],
      ["Stack", "PHP · MySQL · REST APIs · Social media APIs"],
      ["Product", "Creative Influence & Analytics Platform (MVP)"],
    ],
    results: [
      ["4", "Analytics modules in the MVP"],
      ["3", "Audiences: creators, SMEs and agencies"],
      ["REST", "API layer behind every dashboard"],
      ["Multi", "Social APIs feeding one pipeline"],
    ],
    story: [
      {
        label: "The problem",
        title: "Creator performance is scattered across platforms.",
        body: "Followers live on one app and engagement on another, with no common yardstick. Brands shortlist creators on hype, agencies stitch together reports by hand, and creators struggle to show their real value. 30 Cycle builds data infrastructure for Africa's creator economy so all three can decide on consistent, comparable signals.",
      },
      {
        label: "My part",
        title: "From building the pipelines to leading the delivery.",
        body: "I started as a backend developer: I architected the PHP + MySQL pipelines that ingest creator metrics from multiple social APIs, and built the RESTful API layer that powers the analytics dashboards. After consistently delivering, I was promoted to Technical Project Manager, and now lead delivery across creator analytics, influence scoring, audience insights and the SME/agency campaign management portal.",
      },
    ],
    highlightsTitle: "What the platform does",
    highlights: [
      ["layers", "Cross-platform aggregation", "Creator performance aggregated across key channels and presented through one clear dashboard."],
      ["trending-up", "Growth & engagement analytics", "Track how an audience grows and how it responds, over time."],
      ["users", "Audience insights overview", "Understand who a creator reaches, to match partnerships with confidence."],
      ["bar-chart-3", "Content performance reporting", "See which content works, not just how many people follow."],
      ["target", "Influence scoring", "A comparable measure that gives brands a common way to evaluate creators."],
      ["megaphone", "Campaign management portal", "A portal for SMEs and agencies to plan and manage creator campaigns."],
    ],
    minis: [
      {
        title: "Tailored outcomes for each audience",
        items: [
          ["sparkles", "Creators", "See which content formats drive growth, track engagement quality rather than volume, and build a performance story for brand deals."],
          ["building-2", "SMEs and brands", "Shortlist creators on consistent, comparable signals, reduce wasted spend, and get clean reporting for management approvals."],
          ["workflow", "Agencies", "Standardise reporting across creators and platforms, benchmark on one metric framework, and deliver clearer ROI narratives to clients."],
        ],
      },
    ],
    leadershipTitle: "How I led delivery",
    leadership: [
      ["clipboard-list", "Specs developers can build from", "I translate business requirements into developer-ready technical specifications, which cuts sprint ambiguity and rework."],
      ["workflow", "A predictable delivery rhythm", "I introduced structured sprint ceremonies (planning, reviews and retrospectives) that improved delivery rhythm and release predictability."],
    ],
  },
  {
    slug: "9jabrief",
    title: "9jabrief",
    kicker: "Nigerian news, in brief",
    summary:
      "A Nigerian news-in-brief platform that gathers headlines from leading outlets into one fast feed, with personalised filtering, SEO that grew organic traffic 50%, and 99.9% uptime through traffic surges.",
    lead: "Latest Nigerian news, in brief. Short headlines and excerpts from the country's leading outlets, in one fast feed that stays up when a big story sends traffic surging.",
    chips: ["PHP", "MySQL", "SEO", "REST APIs"],
    image: "9jabrief.jpg",
    imageAlt: "9jabrief homepage with a category rail: Top News, Sports, Entertainment, Politics, Business, Technology and Stories/Gist",
    links: [["Visit 9jabrief", "https://9jabrief.com/"]],
    meta: [
      ["Role", "Engineering & SEO"],
      ["Focus", "Aggregation · personalisation · reliability"],
      ["Stack", "PHP · MySQL · SEO · REST APIs"],
      ["Built for", "Readers who want the news, briefly"],
    ],
    results: [
      ["99.9%", "Uptime through traffic surges"],
      ["<5s", "Content latency, source to reader"],
      ["+40%", "Content discoverability"],
      ["+25%", "Reader retention"],
      ["+50%", "Organic traffic in six months"],
    ],
    story: [
      {
        label: "The problem",
        title: "The news is everywhere, and nobody has time to chase it.",
        body: "Nigerian readers follow many outlets, each with its own layout, ads and long articles. They want the headlines, from sources they trust, in one place, and they want it to be fast, especially when a big story breaks and everyone arrives at once.",
      },
      {
        label: "The approach",
        title: "A brief feed, fast by design.",
        body: "9jabrief pulls headlines and short excerpts from leading Nigerian outlets and presents them as a clean, scannable feed, with each story crediting its source and linking out to read more. I built it around a real-time pipeline with sub-5-second content latency, layered personalised filtering on top, and treated SEO as a product feature from the start.",
      },
    ],
    highlightsTitle: "Engineering highlights",
    highlights: [
      ["newspaper", "One feed, many outlets", "Headlines from outlets such as Punch, Premium Times, Vanguard, ThisDay, BusinessDay and Nairametrics, each clearly credited."],
      ["layout-grid", "A feed built for scanning", "Headline, source, date, thumbnail and a short excerpt, with Read More for the full story."],
      ["compass", "Category-first navigation", "A swipeable rail: Top News, Sports, Entertainment, Politics, Business, Technology and Stories/Gist."],
      ["zap", "Sub-5-second latency", "Stories reach readers in under five seconds from the source."],
      ["filter", "Personalised filtering", "Improved content discoverability by 40% and boosted retention by 25%."],
      ["gauge", "Built for surges", "Sustained 99.9% uptime when traffic spiked."],
      ["search", "SEO as a feature", "Search improvements drove 50% organic traffic growth over six months."],
      ["user-check", "Accounts", "Sign in with Google or email, with refresh and load-more controls to keep the feed current."],
    ],
  },
  {
    slug: "trenvid",
    title: "Trenvid",
    kicker: "Trending videos for entertainment & enlightenment",
    summary:
      "A trending-video discovery site: 20 categories, a YouTube / TikTok / Facebook switcher, infinite scrolling and a custom embed system with automatic fallbacks.",
    lead: "Trending videos for your entertainment and enlightenment. One place to browse what people are watching, sorted into 20 categories and switchable between YouTube, TikTok and Facebook.",
    chips: ["JavaScript", "PHP", "MySQL", "YouTube API", "TikTok API"],
    image: "trenvid.jpg",
    imageAlt: "Trenvid homepage showing 20 video categories and a YouTube, TikTok and Facebook switcher above trending videos",
    links: [["Visit Trenvid", "https://trenvid.com/"]],
    meta: [
      ["Role", "Engineering"],
      ["Focus", "Aggregation · async loading · embeds"],
      ["Stack", "JavaScript · PHP · MySQL · YouTube & TikTok APIs"],
      ["Platform", "Web"],
    ],
    results: [
      ["20", "Content categories"],
      ["3", "Platforms: YouTube, TikTok, Facebook"],
      ["∞", "Infinite-scrolling feed"],
      ["Auto", "Fallbacks on every embed"],
    ],
    story: [
      {
        label: "The problem",
        title: "Good videos are hard to find, and scattered across platforms.",
        body: "What's trending on YouTube isn't what's trending on TikTok or Facebook, and finding something worth watching means switching apps and scrolling through noise. The goal was one place to discover trending videos by what you're in the mood for, fast enough that browsing never feels like waiting.",
      },
      {
        label: "The approach",
        title: "Categories first, then load without blocking.",
        body: "Trenvid sorts trending videos into 20 categories, from Comedy and Music to Business, Faith and Skills/Learning, and lets visitors switch platform in one tap. Content loads asynchronously into an infinite-scrolling feed, and a custom embed system handles third-party players with automatic fallbacks so a failing embed never breaks the page.",
      },
    ],
    highlightsTitle: "Engineering highlights",
    highlights: [
      ["layout-grid", "20 content categories", "Comedy, Business/Finance, Motivational, Documentary, Movies, Music, Sports, Science/Tech, Skills/Learning and more."],
      ["repeat", "Platform switcher", "Move between YouTube, TikTok and Facebook without leaving the page."],
      ["plug", "Custom multi-platform embed system", "One embed layer across platforms, with automatic fallbacks when a third-party player fails."],
      ["infinity", "Infinite scrolling", "A continuous feed that keeps loading as you browse, with asynchronous loading so the interface never blocks."],
      ["radio", "Real-time aggregation", "Trending videos pulled in real time from the platforms."],
      ["user-check", "Accounts", "Sign in with YouTube, TikTok, Facebook or email."],
      ["share-2", "Share a video", "Visitors can submit videos to the platform."],
      ["megaphone", "Advertiser accounts", "A route for brands to advertise, with an upgrade path to an advertiser account."],
    ],
  },
];
