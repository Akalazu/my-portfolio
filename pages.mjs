// Generates the case-study pages (work/<slug>/index.html) and the project cards
// on the homepage (between the projects:start / projects:end markers) from projects.mjs.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { projects } from "./projects.mjs";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pad = (n) => String(n + 1).padStart(2, "0");

// Inline boot script (runs before first paint): enables .js, skips the intro on repeat visits,
// and shows a clean URL when someone opens /index.html.
export const BOOT = `document.documentElement.classList.replace("no-js", "js");
      try { if (sessionStorage.getItem("intro")) document.documentElement.classList.add("seen"); } catch (e) {}
      if (/\\/index\\.html$/.test(location.pathname)) {
        history.replaceState(null, "", location.pathname.replace(/index\\.html$/, "") + location.search + location.hash);
      }`;

/* ---------- shared fragments ---------- */

const countable = (v) => {
  const m = String(v).match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  return m ? { pre: m[1], n: m[2], suf: m[3], dec: (m[2].split(".")[1] || "").length } : null;
};

const bigNumber = (v) => {
  const c = countable(v);
  if (!c) return esc(v);
  return `${esc(c.pre)}<span data-count="${c.n}"${c.dec ? ` data-decimals="${c.dec}"` : ""}>${c.n}</span>${esc(c.suf)}`;
};

const nav = (root) => `
    <header class="nav">
      <div class="container nav__inner">
        <a href="${root}" data-transition class="brand" aria-label="Akalazu David, home">
          <span class="brand__mark">a<i>.</i></span>
          <span class="brand__text">
            <strong>Akalazu David</strong>
            <small>Software Engineer · Technical PM</small>
          </span>
        </a>
        <nav class="nav__links" aria-label="Primary">
          <a href="${root}#about" data-transition>About</a>
          <a href="${root}#experience" data-transition>Experience</a>
          <a href="${root}#work" data-transition class="is-active">Work</a>
          <a href="${root}#contact" data-transition>Contact</a>
        </nav>
        <div class="nav__actions">
          <a class="pill magnetic" href="${root}assets/My_Resume.pdf" download="Akalazu_David_CV.pdf">
            <i data-lucide="download"></i><span>Résumé</span>
          </a>
          <a class="pill pill--dark magnetic" href="${root}#contact">
            <span>Let's talk</span><i data-lucide="arrow-right"></i>
          </a>
          <button class="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
        </div>
      </div>
    </header>

    <div class="menu" aria-hidden="true">
      <nav class="menu__links">
        <a href="${root}#about" data-transition><small>01</small>About</a>
        <a href="${root}#experience" data-transition><small>02</small>Experience</a>
        <a href="${root}#work" data-transition><small>03</small>Work</a>
        <a href="${root}#contact" data-transition><small>04</small>Contact</a>
      </nav>
      <div class="menu__foot">
        <a href="mailto:akalazuudochukwu@gmail.com">akalazuudochukwu@gmail.com</a>
        <a href="${root}assets/My_Resume.pdf" download="Akalazu_David_CV.pdf">Download résumé ↓</a>
      </div>
    </div>`;

const footer = () => `
    <footer class="footer">
      <div class="container">
        <div class="footer__word" aria-hidden="true">Akalazu<b>.</b></div>
        <div class="footer__row">
          <span>© <span class="year">2026</span> Akalazu Udochukwu David</span>
          <a href="#top" class="pill back-top"><i data-lucide="arrow-up"></i>Back to top</a>
          <span>Based in Nigeria · <b>Available worldwide</b></span>
        </div>
      </div>
    </footer>`;

/* ---------- homepage cards ---------- */

const visualFor = (p, root = "") =>
  p.mock
    ? `<div class="project__visual mock ${p.mockClass || ""}" aria-hidden="true">
                ${p.mock}
              </div>`
    : `<div class="project__visual mock shot" aria-hidden="true">
                <div class="mock__bar"><i></i><i></i><i></i></div>
                <img src="${root}assets/image/${p.image}" alt="" width="1800" height="1042" loading="lazy" decoding="async" />
              </div>`;

const card = (p, i) => `
            <article class="project">
              ${visualFor(p)}
              <div class="project__info">
                <span class="project__num">${pad(i)}</span>
                <h3><a class="project__link" href="work/${p.slug}/" data-transition>${esc(p.title)}</a></h3>
                <p class="project__kicker">${esc(p.kicker)}</p>
                <p>${esc(p.summary)}</p>
                <div class="chips">${p.chips.map((c) => `<span>${esc(c)}</span>`).join("")}</div>
                <span class="project__cta">View case study <i data-lucide="arrow-up-right"></i></span>
              </div>
            </article>
`;

/* ---------- case-study page ---------- */

const page = (p, i) => {
  const next = projects[(i + 1) % projects.length];
  const R = "../../";
  const featureCards = (items, cls = "") =>
    items
      .map(
        ([icon, t, d]) => `
            <article class="skill-card pj-feature ${cls}">
              <span class="icon-tile"><i data-lucide="${icon}"></i></span>
              <h3>${esc(t)}</h3>
              <p>${esc(d)}</p>
            </article>`
      )
      .join("");

  return `<!DOCTYPE html>
<html lang="en" class="no-js">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(p.title)} — Case study | Akalazu David</title>
    <meta name="description" content="${esc(p.lead)}" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:title" content="${esc(p.title)} — ${esc(p.kicker)}" />
    <meta property="og:description" content="${esc(p.lead)}" />
    <meta property="og:type" content="article" />
    <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23fff'/%3E%3Crect x='1' y='1' width='62' height='62' rx='15' fill='none' stroke='%23e6e8ee' stroke-width='2'/%3E%3Ctext x='16' y='45' font-family='Arial' font-weight='900' font-size='38' fill='%232b55e6'%3Ea%3C/text%3E%3Ccircle cx='47' cy='41' r='4.5' fill='%232b55e6'/%3E%3C/svg%3E" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="${R}assets/css/site.css" />
    <script>
      ${BOOT}
    </script>
  </head>
  <body class="page-project">
    <div class="curtain curtain--cover" aria-hidden="true"></div>
    <div class="cursor" aria-hidden="true"><div class="cursor__dot"></div><div class="cursor__ring"></div></div>
    <div class="progress" aria-hidden="true"></div>
${nav(R)}

    <main id="top">
      <!-- Header -->
      <header class="pj-hero container">
        <a class="pj-back" href="${R}#work" data-transition><i data-lucide="arrow-left"></i>All work</a>
        <div class="eyebrow"><span>${pad(i)}</span>Case study</div>
        <h1 class="pj-title">${esc(p.title)}</h1>
        <p class="pj-kicker">${esc(p.kicker)}</p>
        <p class="pj-lead">${esc(p.lead)}</p>
        <dl class="pj-meta">
          ${p.meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("\n          ")}
        </dl>
      </header>

      <!-- Hero visual -->
      <section class="pj-visual container" aria-label="${esc(p.title)} preview">
        <div class="pj-glow" aria-hidden="true"></div>
        ${
          p.mock
            ? `<div class="pj-frame mock ${p.mockClass || ""}" role="img" aria-label="Illustration of the ${esc(p.title)} interface">
          ${p.mock}
        </div>`
            : `<figure class="pj-frame mock shot">
          <div class="mock__bar"><i></i><i></i><i></i></div>
          <img src="${R}assets/image/${p.image}" alt="${esc(p.imageAlt)}" width="1800" height="1042" decoding="async" />
        </figure>`
        }
      </section>

      <!-- Results -->
      <section class="pj-results container" aria-label="Key results">
        ${p.results
          .map(([v, l]) => `<div class="pj-stat"><strong>${bigNumber(v)}</strong><p>${esc(l)}</p></div>`)
          .join("\n        ")}
      </section>

      <!-- Story -->
      <section class="pj-story container">
        ${p.story
          .map(
            (s) => `<div class="pj-block">
          <div class="pj-block__label"><div class="eyebrow">${esc(s.label)}</div></div>
          <div class="pj-block__body">
            <h2>${esc(s.title)}</h2>
            <p>${esc(s.body)}</p>
          </div>
        </div>`
          )
          .join("\n        ")}
      </section>

      <!-- Highlights -->
      <section class="pj-section container">
        <div class="section-head">
          <div class="eyebrow">${esc(p.highlightsTitle)}</div>
        </div>
        <div class="skill-grid pj-grid">${featureCards(p.highlights)}
        </div>
      </section>
${
  p.audiences
    ? `
      <!-- Audiences -->
      <section class="pj-section container">
        <div class="section-head">
          <div class="eyebrow">${esc(p.audiencesTitle)}</div>
        </div>
        <div class="pj-audiences">
          ${p.audiences
            .map(
              ([icon, t, d]) => `<article class="mini-card">
            <span class="icon-tile"><i data-lucide="${icon}"></i></span>
            <div><h3>${esc(t)}</h3><p>${esc(d)}</p></div>
          </article>`
            )
            .join("\n          ")}
        </div>
      </section>
`
    : ""
}${
  p.leadership
    ? `
      <!-- Leadership -->
      <section class="pj-section container">
        <div class="section-head">
          <div class="eyebrow">${esc(p.leadershipTitle)}</div>
        </div>
        <div class="pj-lead-grid">${featureCards(p.leadership)}
        </div>
      </section>
`
    : ""
}${
  p.gallery
    ? `
      <!-- Gallery -->
      <section class="pj-section container">
        <div class="pj-gallery">
          ${p.gallery
            .map(
              ([file, alt, cap]) => `<figure class="pj-shot">
            <div class="mock shot">
              <div class="mock__bar"><i></i><i></i><i></i></div>
              <img src="${R}assets/image/${file}" alt="${esc(alt)}" width="1800" height="1042" loading="lazy" decoding="async" />
            </div>
            <figcaption>${esc(cap)}</figcaption>
          </figure>`
            )
            .join("\n          ")}
        </div>
      </section>
`
    : ""
}
      <!-- Next -->
      <section class="pj-next">
        <a class="pj-next__link" href="${R}work/${next.slug}/" data-transition>
          <span class="pj-next__label">Next project · ${pad((i + 1) % projects.length)}</span>
          <span class="pj-next__title">${esc(next.title)}</span>
          <span class="pj-next__kicker">${esc(next.kicker)}</span>
          <span class="pj-next__arrow"><i data-lucide="arrow-right"></i></span>
        </a>
      </section>

      <!-- CTA -->
      <section class="pj-cta section">
        <div class="container pj-cta__inner">
          <h2 class="split-title">Need something <em>like this?</em></h2>
          <a href="${R}#contact" class="btn btn--primary magnetic" data-transition>Start a conversation <i data-lucide="arrow-right"></i></a>
        </div>
      </section>
    </main>
${footer()}

    <script src="https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"></script>
    <script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
    <script src="${R}assets/js/project.js"></script>
  </body>
</html>
`;
};

/* ---------- write everything ---------- */

export async function generatePages() {
  for (const [i, p] of projects.entries()) {
    await mkdir(`work/${p.slug}`, { recursive: true });
    await writeFile(`work/${p.slug}/index.html`, page(p, i));
  }

  let html = await readFile("index.html", "utf8");
  const start = "<!-- projects:start -->";
  const end = "<!-- projects:end -->";
  const a = html.indexOf(start);
  const b = html.indexOf(end);
  if (a === -1 || b === -1) throw new Error("projects markers missing in index.html");
  html = html.slice(0, a + start.length) + "\n" + projects.map(card).join("\n") + "            " + html.slice(b);
  await writeFile("index.html", html);
  return projects.length;
}

// `node pages.mjs` regenerates in place
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(`Generated ${await generatePages()} case-study pages + homepage cards`);
}
