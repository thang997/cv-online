// Sinh CV bản PDF từ đúng dữ liệu đang hiển thị trên web (src/lib/).
// Chạy: npm run cv   -> public/cv-<ten>-vi.pdf và -en.pdf
//
// Cách làm: dựng 1 file HTML in ấn rồi nhờ Chrome/Edge headless in ra PDF.
// Không thêm dependency nào — dùng trình duyệt có sẵn trên máy.

import { existsSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const { PROFILE, SKILLS, EXPERIENCE, CONTENT } = await import("../src/lib/content.ts");
const { PROJECTS } = await import("../src/lib/projects.ts");

/** Tìm Chrome/Edge để in PDF. Đặt biến môi trường CHROME để chỉ định thủ công. */
function findBrowser() {
  const candidates = [
    process.env.CHROME,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) {
    console.error("Không tìm thấy Chrome/Edge. Đặt biến môi trường CHROME trỏ tới file .exe.");
    process.exit(1);
  }
  return found;
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Bỏ dấu tiếng Việt để đặt tên file. */
const slug = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d")
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const prettyPhone = PROFILE.phone.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");
const host = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

function buildHtml(lang) {
  const t = (o) => o[lang];
  const L = (vi, en) => (lang === "vi" ? vi : en);

  const contacts = [
    PROFILE.phone && prettyPhone,
    PROFILE.email,
    PROFILE.location && t(PROFILE.location),
    PROFILE.birthYear && `${t(CONTENT.meta.born)} ${PROFILE.birthYear}`,
    PROFILE.facebook && host(PROFILE.facebook),
    PROFILE.github && host(PROFILE.github),
    PROFILE.linkedin && host(PROFILE.linkedin),
  ].filter(Boolean);

  const section = (heading, inner) =>
    `<section><h2>${esc(heading)}</h2>${inner}</section>`;

  const experience = EXPERIENCE.map(
    (e) => `<article class="item">
      <div class="row">
        <div><strong>${esc(t(e.role))}</strong> · <span class="org">${esc(e.company)}</span></div>
        <div class="period">${esc(t(e.period))}</div>
      </div>
      <ul>${e.bullets.map((b) => `<li>${esc(t(b))}</li>`).join("")}</ul>
    </article>`,
  ).join("");

  const projects = PROJECTS.map(
    (p) => `<article class="item">
      <div class="row">
        <div><span class="chip">${esc(p.code)}</span> <strong>${esc(t(p.name))}</strong></div>
        ${p.url ? `<div class="period"><a href="${esc(p.url)}">${esc(host(p.url))}</a></div>` : ""}
      </div>
      <ul>${p.bullets.map((b) => `<li>${esc(t(b))}</li>`).join("")}</ul>
      <div class="tech">${p.tech.map((x) => `<span>${esc(x)}</span>`).join("")}</div>
    </article>`,
  ).join("");

  const skills = `<dl class="skills">${SKILLS.map(
    (g) => `<div class="item"><dt>${esc(t(g.title))}</dt><dd>${g.items
      .map((i) => esc(t(i)))
      .join(" · ")}</dd></div>`,
  ).join("")}</dl>`;

  const personal = `<dl class="skills">${[
    [CONTENT.personal.traitsLabel, CONTENT.personal.traits],
    [CONTENT.personal.interestsLabel, CONTENT.personal.interests],
  ]
    .map(
      ([label, items]) =>
        `<div class="item"><dt>${esc(t(label))}</dt><dd>${items
          .map((i) => esc(t(i)))
          .join(" · ")}</dd></div>`,
    )
    .join("")}</dl>`;

  const ai = `<ul class="tight">${CONTENT.ai.bullets
    .map((b) => `<li>${esc(t(b))}</li>`)
    .join("")}</ul>`;

  return `<!doctype html>
<html lang="${lang}">
<meta charset="utf-8">
<title>CV — ${esc(PROFILE.name)}</title>
<style>
  @page { size: A4; margin: 12mm 13mm 13mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font: 10pt/1.45 "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    color: #16191f;
  }
  a { color: #1f5fd0; text-decoration: none; }
  header { border-bottom: 2px solid #1f5fd0; padding-bottom: 8pt; margin-bottom: 10pt; }
  h1 { margin: 0; font-size: 22pt; letter-spacing: -0.4pt; }
  .role { margin-top: 2pt; font-size: 10.5pt; font-weight: 600; color: #1f5fd0; }
  .tagline { margin-top: 4pt; color: #4a5160; }
  .contacts { margin-top: 6pt; font-size: 9pt; color: #4a5160; }
  .contacts span:not(:last-child)::after { content: " · "; color: #aab2c0; }
  h2 {
    margin: 12pt 0 6pt; font-size: 10.5pt; text-transform: uppercase;
    letter-spacing: 0.6pt; color: #1f5fd0;
    border-bottom: 1px solid #d8dde6; padding-bottom: 3pt;
  }
  section { break-inside: auto; }
  .item { break-inside: avoid; margin-bottom: 7pt; }
  .row { display: flex; justify-content: space-between; gap: 10pt; align-items: baseline; }
  .org { color: #4a5160; }
  .period { font-size: 9pt; color: #6b7280; white-space: nowrap; }
  ul { margin: 3pt 0 0; padding-left: 14pt; }
  li { margin-bottom: 1.5pt; }
  ul.tight li { margin-bottom: 1pt; }
  p { margin: 0 0 4pt; }
  .chip {
    display: inline-block; border: 1px solid #1f5fd0; color: #1f5fd0;
    border-radius: 3pt; padding: 0 4pt; font-size: 8pt; font-weight: 600;
    font-family: Consolas, monospace; vertical-align: 1pt;
  }
  .tech { margin-top: 3pt; font-size: 8.5pt; color: #4a5160; }
  .tech span:not(:last-child)::after { content: " · "; color: #aab2c0; }
  .skills { margin: 0; }
  .skills dt { font-weight: 600; font-size: 9.5pt; }
  .skills dd { margin: 0 0 5pt; font-size: 9.5pt; color: #3a414d; }
</style>
<header>
  <h1>${esc(PROFILE.name)}</h1>
  <div class="role">${esc(t(CONTENT.hero.role))} · ${esc(t(CONTENT.hero.level))}</div>
  <p class="tagline">${esc(t(CONTENT.hero.tagline))}</p>
  <div class="contacts">${contacts.map((c) => `<span>${esc(c)}</span>`).join("")}</div>
</header>
${section(t(CONTENT.about.heading), `<p>${esc(t(CONTENT.about.body))}</p><p>${esc(t(CONTENT.about.body2))}</p>`)}
${section(t(CONTENT.experience.heading), experience)}
${section(t(CONTENT.projects.heading), projects)}
${section(t(CONTENT.skills.heading), skills)}
${section(t(CONTENT.ai.heading), ai)}
${section(t(CONTENT.personal.heading), personal)}
</html>`;
}

const browser = findBrowser();
const outDir = join(root, "public");
mkdirSync(outDir, { recursive: true });
const base = `cv-${slug(PROFILE.name)}`;

for (const lang of ["vi", "en"]) {
  const htmlPath = join(tmpdir(), `${base}-${lang}.html`);
  const pdfPath = join(outDir, `${base}-${lang}.pdf`);
  writeFileSync(htmlPath, buildHtml(lang), "utf8");

  const args = [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-pdf-header-footer",
    "--virtual-time-budget=3000",
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href,
  ];
  try {
    execFileSync(browser, args, { stdio: "pipe" });
  } catch {
    // Chrome đời cũ không nhận --headless=new
    execFileSync(browser, ["--headless", ...args.slice(1)], { stdio: "pipe" });
  }
  // KEEP_HTML=1 để giữ lại file HTML trung gian mà soi bằng trình duyệt
  if (process.env.KEEP_HTML) console.log(`  html: ${htmlPath}`);
  else rmSync(htmlPath, { force: true });
  console.log(`✓ public/${base}-${lang}.pdf`);
}
