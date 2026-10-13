// Single source of truth for the work section on the homepage and the case-study pages.
// Edit the copy here, then run `npm run pages` (or `npm run build`) to regenerate.
// Everything below is drawn from the CV and the project screenshots — keep it factual.

export const projects = [
  {
    slug: "gagner-for-schools",
    title: "Gagner for Schools",
    kicker: "AI-powered school management SaaS",
    summary:
      "A multi-tenant platform that runs academic, administrative and financial operations for Nigerian schools. RBAC dashboards for four roles, CBT with automated results, PIN-based result access modelled on WAEC, plus AI adaptive quizzes and tutoring.",
    lead: "One platform for how a Nigerian school actually runs: learning, administration and finance in one place for students, parents and staff, with AI that helps learners understand more and takes routine work off teachers' desks.",
    chips: ["PHP", "JavaScript", "MySQL", "REST APIs", "AI"],
    image: "gagner-schools.jpg",
    imageAlt: "Gagner for Schools sign-in portal showing the student, parent, teacher and admin entry points",
    meta: [
      ["Role", "Architecture & engineering"],
      ["Focus", "Multi-tenant SaaS · RBAC · AI"],
      ["Stack", "PHP · JavaScript · MySQL · REST APIs"],
      ["Built for", "Nigerian primary & secondary schools"],
    ],
    results: [
      ["4", "Role-based dashboards"],
      ["CBT", "With automated result processing"],
      ["PIN", "Result access modelled on WAEC"],
      ["AI", "Adaptive quizzes & tutoring"],
    ],
    story: [
      {
        label: "The problem",
        title: "Running a school means running six systems at once.",
        body: "Lessons, assessments, attendance, fees, report cards and admissions usually live in separate tools. Teachers re-enter the same data and parents chase information. The goal was a single system any school could adopt, without any school ever seeing another school's data.",
      },
      {
        label: "The approach",
        title: "One platform, many schools, one view per role.",
        body: "I architected Gagner for Schools as a multi-tenant SaaS: a single platform serving many schools, each in its own isolated space. On top of it sit modular, role-based dashboards, so a student, teacher, admin and super admin each see exactly what their job needs and nothing more.",
      },
    ],
    highlightsTitle: "Engineering highlights",
    highlights: [
      ["building-2", "Multi-tenant architecture", "One codebase serving many schools, with each school's data kept separate and secure."],
      ["shield-check", "Role-based access control", "Modular dashboards for four roles (Student, Teacher, Admin and Super Admin) driven by permissions."],
      ["file-text", "CBT with automated results", "Computer-based tests that are scored and processed automatically, so results don't wait on manual entry."],
      ["key-round", "PIN-based result access", "Results are released through PINs, modelled on WAEC's infrastructure, a pattern families already understand."],
      ["sparkles", "AI-driven learning", "Adaptive quizzes, intelligent tutoring, performance analytics and skill-based certification."],
      ["smartphone", "Beyond the browser", "A school portal with admissions and recruitment entry points, plus a mobile app for everyday use."],
    ],
    audiencesTitle: "Four audiences, one platform",
    audiences: [
      ["user", "Students", "Lessons, AI study help, quizzes and results."],
      ["users", "Parents", "Fees, attendance and report cards for every child."],
      ["graduation-cap", "Teachers", "Classes, assessments, scores and attendance."],
      ["landmark", "Admins", "Admissions, finance, staff and school records."],
    ],
    gallery: [
      ["gagner-company.jpg", "Gagner company website: building intelligence from Africa for the world", "The wider Gagner brand: AI built for the places where better technology can create meaningful change."],
    ],
  },
  {
    slug: "30-cycle",
    title: "30 Cycle",
    kicker: "Creator analytics for Africa's creator economy",
    summary:
      "Data infrastructure for Africa's creator economy: PHP + MySQL pipelines that ingest creator metrics from multiple social APIs, the REST layer behind the analytics dashboards, and the delivery leadership that shipped it.",
    lead: "Unified creator intelligence, built for decision makers. The platform aggregates creator performance across key channels and presents it through one clear dashboard, so creators and brands can make decisions with confidence.",
    chips: ["PHP", "MySQL", "REST APIs", "Social APIs", "Delivery"],
    image: "30cycle.jpg",
    imageAlt: "30 Cycle flagship product page: Creative Influence & Analytics Platform",
    meta: [
      ["Role", "Backend Developer, then Technical PM"],
      ["Focus", "Data pipelines · APIs · delivery"],
      ["Stack", "PHP · MySQL · REST APIs · Social media APIs"],
      ["Product", "Creative Influence & Analytics Platform"],
    ],
    results: [
      ["4", "Analytics modules in the MVP"],
      ["REST", "API layer behind every dashboard"],
      ["Multi", "Social APIs feeding one pipeline"],
      ["Sprint", "Planning, reviews & retros introduced"],
    ],
    story: [
      {
        label: "The problem",
        title: "Creator performance is scattered across platforms.",
        body: "Followers live on one app, engagement on another, and there's no common yardstick. Brands, agencies and creators end up deciding on partial numbers. 30 Cycle's flagship product pulls those signals into one place and turns them into something a decision maker can read at a glance.",
      },
      {
        label: "My part",
        title: "From building the pipelines to leading the delivery.",
        body: "I started as a backend developer: I architected the PHP + MySQL data pipelines that ingest creator metrics from multiple social APIs, and built the RESTful API layer that powers the analytics dashboards. After consistently delivering, I was promoted to Technical Project Manager, and now lead delivery across creator analytics, influence scoring, audience insights and the SME/agency campaign management portal.",
      },
    ],
    highlightsTitle: "What the platform does",
    highlights: [
      ["layers", "Cross-platform aggregation", "Creator performance pulled from multiple channels into a single, consistent view."],
      ["trending-up", "Growth & engagement analytics", "Track how an audience grows and how it responds, over time."],
      ["users", "Audience insights", "An overview of who a creator reaches, so partnerships can be matched with confidence."],
      ["bar-chart-3", "Content performance reporting", "See which content works, not just how many people follow."],
      ["target", "Influence scoring", "A comparable score that gives brands a common way to evaluate creators."],
      ["megaphone", "Campaign management portal", "A portal for SMEs and agencies to plan and manage creator campaigns."],
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
    kicker: "Real-time news aggregation",
    summary:
      "A news platform with under 5 seconds of content latency and personalised filtering that lifted discoverability 40% and retention 25%. Held 99.9% uptime through traffic surges, and SEO work grew organic traffic 50% in six months.",
    lead: "News in brief. A fast, personalised news platform that gets stories in front of readers in under five seconds, and keeps working when a big story sends traffic surging.",
    chips: ["PHP", "MySQL", "SEO", "REST APIs"],
    image: "9jabrief.jpg",
    imageAlt: "9jabrief homepage with a category rail: Top News, Sports, Entertainment, Politics, Business, Technology and Stories",
    meta: [
      ["Role", "Engineering & SEO"],
      ["Focus", "Real-time content · personalisation · reliability"],
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
        title: "When a story breaks, everyone arrives at once.",
        body: "Readers want what happened, right now, and only the parts they care about. That demands near-instant delivery, relevant filtering, and the reliability to hold up when traffic spikes, not just when it's quiet.",
      },
      {
        label: "The approach",
        title: "Fast by design, personal by default.",
        body: "I built the platform around a real-time content pipeline with sub-5-second latency, then layered personalised filtering on top so every reader sees a feed that fits them. SEO was treated as a product feature from the start, not an afterthought.",
      },
    ],
    highlightsTitle: "Engineering highlights",
    highlights: [
      ["zap", "Sub-5-second content latency", "Stories reach readers in under five seconds from source."],
      ["filter", "Personalised filtering", "Improved content discoverability by 40% and boosted retention by 25%."],
      ["gauge", "Built for surges", "Sustained 99.9% uptime when traffic spiked."],
      ["search", "SEO as a feature", "Search improvements drove 50% organic traffic growth over six months."],
      ["compass", "Category-first navigation", "A swipeable rail runs from Top News through Sports, Entertainment, Politics, Business and Technology to Stories/Gist."],
      ["refresh-cw", "Always fresh", "Live article counts per section and one-tap refresh keep the feed current."],
    ],
  },
  {
    slug: "trenvid",
    title: "Trenvid",
    kicker: "Trending video aggregation platform",
    summary:
      "Pulls trending videos from YouTube and TikTok in real time, with infinite scrolling, dynamic filtering and async loading. A custom multi-platform embed system handles third-party content with automatic fallbacks.",
    lead: "A high-performance aggregator that pulls trending videos from YouTube and TikTok in real time, and lets people browse them in one endless, filterable feed.",
    chips: ["JavaScript", "PHP", "MySQL", "YouTube API", "TikTok API"],
    mock: `<div class="mock__bar"><i></i><i></i><i></i><span>Trenvid · Trending</span></div>
                <div class="mock__body mock__body--col">
                  <div class="mock__filters"><span class="on">All</span><span>YouTube</span><span>TikTok</span><span>Music</span></div>
                  <div class="mock__videos">
                    <div class="v v1"><i data-lucide="play"></i></div>
                    <div class="v v2"><i data-lucide="play"></i></div>
                    <div class="v v3"><i data-lucide="play"></i></div>
                    <div class="v v4"><i data-lucide="play"></i></div>
                    <div class="v v5"><i data-lucide="play"></i></div>
                    <div class="v v6"><i data-lucide="play"></i></div>
                  </div>
                </div>`,
    mockClass: "mock--video",
    meta: [
      ["Role", "Engineering"],
      ["Focus", "Aggregation · async loading · embeds"],
      ["Stack", "JavaScript · PHP · MySQL · YouTube & TikTok APIs"],
      ["Platform", "Web"],
    ],
    results: [
      ["2", "Platforms in a single feed"],
      ["Live", "Trending data, in real time"],
      ["∞", "Infinite-scrolling feed"],
      ["Auto", "Fallbacks on every embed"],
    ],
    story: [
      {
        label: "The problem",
        title: "Trending lives in too many places.",
        body: "What's trending on YouTube isn't what's trending on TikTok, and checking both means switching apps and losing the thread. The aim was one place to see what people are watching right now, fast enough that browsing never feels like waiting.",
      },
      {
        label: "The approach",
        title: "Pull in real time, load without blocking.",
        body: "Trenvid fetches trending videos from both platforms in real time and streams them into an infinite-scrolling feed with dynamic filtering. Content loads asynchronously, so the page stays responsive however far someone scrolls.",
      },
    ],
    highlightsTitle: "Engineering highlights",
    highlights: [
      ["radio", "Real-time aggregation", "Trending videos pulled live from YouTube and TikTok."],
      ["infinity", "Infinite scrolling", "A continuous feed that keeps loading as you browse."],
      ["filter", "Dynamic filtering", "Narrow the feed instantly without reloading the page."],
      ["repeat", "Asynchronous loading", "Content is fetched in the background so the interface never blocks."],
      ["plug", "Custom multi-platform embed system", "One embed layer across platforms, with automatic fallbacks when a third-party player fails."],
      ["shield-check", "Controlled third-party content", "Third-party content is handled deliberately, not dropped straight into the page."],
    ],
  },
];
