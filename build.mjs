// Production build for Netlify: regenerates the case-study pages, then minifies
// HTML/CSS/JS into dist/ and writes dist/_headers.
// Source files stay readable for editing; only dist/ is published.

import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import * as esbuild from "esbuild";
import { minify as minifyHtml } from "html-minifier-terser";
import { generatePages } from "./pages.mjs";
import { projects } from "./projects.mjs";

const OUT = "dist";
const hash = (s) => createHash("sha256").update(s).digest();

await generatePages();

await rm(OUT, { recursive: true, force: true });
await mkdir(`${OUT}/assets/css`, { recursive: true });
await mkdir(`${OUT}/assets/js`, { recursive: true });

// Static files
await cp("assets/image", `${OUT}/assets/image`, { recursive: true });
await cp("assets/My_Resume.pdf", `${OUT}/assets/My_Resume.pdf`);

// CSS + JS: minify, no source maps
const bundles = ["assets/css/site.css", "assets/js/site.js", "assets/js/project.js"];
const versions = {};
for (const src of bundles) {
  await esbuild.build({
    entryPoints: [src],
    outfile: `${OUT}/${src}`,
    minify: true,
    sourcemap: false,
    legalComments: "none",
    target: ["es2020", "chrome90", "safari14", "firefox90"],
    logLevel: "warning",
  });
  versions[src] = hash(await readFile(`${OUT}/${src}`)).toString("hex").slice(0, 10);
}

// HTML: cache-bust the bundles, then minify every page
const pages = ["index.html", ...projects.map((p) => `work/${p.slug}/index.html`)];
const inline = new Set();

for (const page of pages) {
  let html = await readFile(page, "utf8");
  html = html.replace(/(assets\/(?:css|js)\/[\w.-]+)"/g, (m, f) => (versions[f] ? `${f}?v=${versions[f]}"` : m));
  html = await minifyHtml(html, {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true,
    removeRedundantAttributes: true,
    minifyJS: true,
    minifyCSS: true,
  });
  await mkdir(`${OUT}/${dirname(page)}`, { recursive: true });
  await writeFile(`${OUT}/${page}`, html);
  for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) inline.add(`'sha256-${hash(m[1]).toString("base64")}'`);
}

// CSP: allow only the CDNs, fonts and Formspree this site uses; inline scripts by hash
const csp = [
  "default-src 'self'",
  `script-src 'self' https://cdn.jsdelivr.net https://unpkg.com ${[...inline].join(" ")}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://formspree.io",
  "form-action https://formspree.io",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const headers = `/*
  Content-Security-Policy: ${csp}
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/assets/css/*
  Cache-Control: public, max-age=31536000, immutable

/assets/js/*
  Cache-Control: public, max-age=31536000, immutable

/assets/image/*
  Cache-Control: public, max-age=604800
`;
await writeFile(`${OUT}/_headers`, headers);

console.log(`Built ${OUT}/ with ${pages.length} pages (${inline.size} inline script hash${inline.size === 1 ? "" : "es"})`);
