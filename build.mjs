// Production build for Netlify: minifies HTML/CSS/JS into dist/ and writes dist/_headers.
// Source files stay readable for editing; only dist/ is published.

import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import * as esbuild from "esbuild";
import { minify as minifyHtml } from "html-minifier-terser";

const OUT = "dist";
const hash = (s) => createHash("sha256").update(s).digest();

await rm(OUT, { recursive: true, force: true });
await mkdir(`${OUT}/assets/css`, { recursive: true });
await mkdir(`${OUT}/assets/js`, { recursive: true });

// Static files
await cp("assets/image", `${OUT}/assets/image`, { recursive: true });
await cp("assets/My_Resume.pdf", `${OUT}/assets/My_Resume.pdf`);

// CSS + JS: minify, no source maps
const bundles = [
  ["assets/css/site.css", `${OUT}/assets/css/site.css`],
  ["assets/js/site.js", `${OUT}/assets/js/site.js`],
];
const versions = {};
for (const [src, out] of bundles) {
  await esbuild.build({
    entryPoints: [src],
    outfile: out,
    minify: true,
    sourcemap: false,
    legalComments: "none",
    target: ["es2020", "chrome90", "safari14", "firefox90"],
    logLevel: "warning",
  });
  versions[src] = hash(await readFile(out)).toString("hex").slice(0, 10);
}

// HTML: cache-bust the bundles, then minify
let html = await readFile("index.html", "utf8");
for (const [src] of bundles) html = html.replace(`./${src}"`, `./${src}?v=${versions[src]}"`);
html = await minifyHtml(html, {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
  removeRedundantAttributes: true,
  minifyJS: true,
  minifyCSS: true,
});
await writeFile(`${OUT}/index.html`, html);

// CSP: allow only the CDNs, fonts and Formspree this site uses; inline scripts by hash
const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(
  (m) => `'sha256-${hash(m[1]).toString("base64")}'`
);
const csp = [
  "default-src 'self'",
  `script-src 'self' https://cdn.jsdelivr.net https://unpkg.com ${inlineScripts.join(" ")}`,
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

console.log(`Built ${OUT}/ (css ${versions[bundles[0][0]]}, js ${versions[bundles[1][0]]})`);
