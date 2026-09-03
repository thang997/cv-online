"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import LangToggle from "@/components/LangToggle";
import Reveal from "@/components/Reveal";
import {
  CONTENT,
  EXPERIENCE,
  PROFILE,
  SKILLS,
  type L,
  type Lang,
} from "@/lib/content";
import { PROJECTS } from "@/lib/projects";

// Three.js chỉ chạy phía client — tắt SSR cho scene.
const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
});

const STORAGE_KEY = "lang";

export default function Home() {
  const [lang, setLang] = useState<Lang>("vi");

  // Khôi phục ngôn ngữ đã chọn ở lần truy cập trước.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "vi" || saved === "en") setLang(saved);
    } catch {
      // localStorage có thể bị chặn — bỏ qua, dùng mặc định.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* bỏ qua */
    }
  }, [lang]);

  /** Lấy bản dịch theo ngôn ngữ hiện tại. */
  const t = (s: L) => s[lang];

  /** Định dạng số điện thoại cho dễ đọc: 0343211997 → 0343 211 997 */
  const prettyPhone = PROFILE.phone.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");

  const links = [
    PROFILE.phone && {
      href: "tel:" + PROFILE.phone,
      label: t(CONTENT.contact.phone),
      value: prettyPhone,
      icon: "☎",
    },
    PROFILE.email && {
      href: "mailto:" + PROFILE.email,
      label: "Email",
      value: PROFILE.email,
      icon: "✉",
    },
    PROFILE.facebook && {
      href: PROFILE.facebook,
      label: "Facebook",
      value: "/" + PROFILE.facebook.replace(/\/$/, "").split("/").pop(),
      icon: "f",
      external: true,
    },
    PROFILE.github && {
      href: PROFILE.github,
      label: "GitHub",
      value: PROFILE.github.replace(/^https?:\/\/(www\.)?/, ""),
      icon: "gh",
      external: true,
    },
    PROFILE.linkedin && {
      href: PROFILE.linkedin,
      label: "LinkedIn",
      value: PROFILE.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      icon: "in",
      external: true,
    },
  ].filter(Boolean) as {
    href: string;
    label: string;
    value: string;
    icon: string;
    external?: boolean;
  }[];

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* ---- Nền: đốm sáng trôi + lưới mờ ---- */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="blob absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-[var(--accent)]/20 blur-[120px]" />
        <div
          className="blob absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-[var(--accent-2)]/15 blur-[120px]"
          style={{ animationDelay: "-8s" }}
        />
        <div
          className="blob absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-violet-500/10 blur-[120px]"
          style={{ animationDelay: "-15s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* ---- Header ---- */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)]/60 bg-[var(--background)]/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
          <a href="#top" className="font-semibold tracking-tight">
            {PROFILE.name}
          </a>
          <div className="flex items-center gap-5">
            <nav className="hidden gap-5 text-sm text-[var(--muted)] sm:flex">
              <a
                href="#about"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                {t(CONTENT.nav.about)}
              </a>
              <a
                href="#experience"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                {t(CONTENT.nav.experience)}
              </a>
              <a
                href="#projects"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                {t(CONTENT.nav.projects)}
              </a>
              <a
                href="#skills"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                {t(CONTENT.nav.skills)}
              </a>
              <a
                href="#ai"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                {t(CONTENT.nav.ai)}
              </a>
              <a
                href="#contact"
                className="transition-colors hover:text-[var(--foreground)]"
              >
                {t(CONTENT.nav.contact)}
              </a>
            </nav>
            <LangToggle lang={lang} onChange={setLang} />
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-6">
        {/* ---- Hero ---- */}
        <section className="relative grid min-h-[calc(100dvh-3.75rem)] items-center gap-10 py-16 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)]/60 px-3 py-1 text-xs text-[var(--muted)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {t(CONTENT.hero.available)} · {t(CONTENT.hero.level)}
              </p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="text-shimmer mt-5 text-4xl leading-[1.1] font-semibold tracking-tight sm:text-6xl">
                {PROFILE.name}
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-3 text-lg text-[var(--accent)]">
                {t(CONTENT.hero.role)}
                <span className="caret ml-1 font-light">|</span>
              </p>
            </Reveal>

            <Reveal delay={230}>
              <p className="mt-5 max-w-xl leading-relaxed text-[var(--muted)]">
                {t(CONTENT.hero.tagline)}
              </p>
            </Reveal>

            <Reveal delay={270}>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--muted)]">
                <li className="flex items-center gap-2">
                  <span aria-hidden className="text-[var(--accent)]">
                    ◆
                  </span>
                  {t(CONTENT.meta.born)} {PROFILE.birthYear}
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="text-[var(--accent)]">
                    ◆
                  </span>
                  {t(CONTENT.meta.based)} {t(PROFILE.location)}
                </li>
              </ul>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--accent)]/30"
                >
                  {t(CONTENT.hero.ctaContact)}
                </a>
                <a
                  href="#skills"
                  className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[var(--accent)]/60"
                >
                  {t(CONTENT.hero.ctaSkills)}
                </a>
              </div>
            </Reveal>

            <Reveal delay={380}>
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                {CONTENT.stats.map((s) => (
                  <div key={s.value}>
                    <dt className="text-2xl font-semibold tracking-tight">
                      {s.value}
                    </dt>
                    <dd className="text-xs text-[var(--muted)]">{t(s.label)}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Scene 3D làm điểm nhấn — ẩn trên màn hình nhỏ để đỡ tốn pin */}
          <div className="relative hidden h-[26rem] lg:block">
            <Scene />
          </div>

          <a
            href="#about"
            aria-label="scroll"
            className="bob absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-[var(--muted)] sm:block"
          >
            ↓
          </a>
        </section>

        {/* ---- Giới thiệu ---- */}
        <Section id="about" heading={t(CONTENT.about.heading)}>
          <Reveal>
            <p className="max-w-3xl leading-relaxed text-[var(--muted)]">
              {t(CONTENT.about.body)}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-3xl leading-relaxed text-[var(--muted)]">
              {t(CONTENT.about.body2)}
            </p>
          </Reveal>
        </Section>

        {/* ---- Kinh nghiệm ---- */}
        <Section
          id="experience"
          heading={t(CONTENT.experience.heading)}
          sub={t(CONTENT.experience.sub)}
        >
          {EXPERIENCE.map((job) => (
            <Reveal key={job.company}>
              <article className="relative pl-8">
                {/* Đường dọc + chấm mốc */}
                <span
                  aria-hidden
                  className="pulse-line absolute top-2 bottom-0 left-[5px] w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/40 to-transparent"
                />
                <span
                  aria-hidden
                  className="absolute top-1.5 left-0 h-2.5 w-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--accent)]/20"
                />
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-lg font-semibold">{job.company}</h3>
                  <span className="text-sm text-[var(--accent)]">
                    {t(job.role)}
                  </span>
                  <span className="ml-auto font-mono text-xs text-[var(--muted)]">
                    {t(job.period)}
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((b, i) => (
                    <Reveal as="li" key={t(b)} delay={i * 70}>
                      <div className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
                        <span
                          aria-hidden
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]/70"
                        />
                        <span>{t(b)}</span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </Section>

        {/* ---- Dự án ---- */}
        <Section
          id="projects"
          heading={t(CONTENT.projects.heading)}
          sub={t(CONTENT.projects.sub)}
        >
          <div className="space-y-4">
            {PROJECTS.map((p, pi) => (
              <Reveal key={p.code} delay={pi * 60}>
                <article className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]/50 p-5 transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-[var(--card)] sm:p-6">
                  {/* Vệt sáng quét ngang khi hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-[var(--accent)]/10 to-transparent transition-all duration-700 group-hover:left-full"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-md border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-2.5 py-1 font-mono text-xs font-medium text-[var(--accent)]">
                      {p.code}
                    </span>
                    <h3 className="text-lg font-semibold">{t(p.name)}</h3>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {p.bullets.map((b) => (
                      <li
                        key={t(b)}
                        className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]/70"
                        />
                        <span>{t(b)}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-2 border-t border-[var(--border)]/60 pt-4">
                    {p.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-[var(--border)] bg-[var(--background)]/60 px-2.5 py-1 text-xs text-[var(--muted)] transition-colors duration-200 group-hover:border-[var(--accent)]/25"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- Kỹ năng ---- */}
        <Section
          id="skills"
          heading={t(CONTENT.skills.heading)}
          sub={t(CONTENT.skills.sub)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {SKILLS.map((group, gi) => (
              <Reveal
                key={group.title.en}
                delay={gi * 60}
                className={group.primary ? "sm:col-span-2" : ""}
              >
                <div
                  className={`group h-full rounded-xl border bg-[var(--card)]/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:bg-[var(--card)] ${
                    group.primary
                      ? "border-[var(--accent)]/40 ring-1 ring-[var(--accent)]/15"
                      : "border-[var(--border)]"
                  }`}
                >
                  <h3 className="text-sm font-semibold tracking-wide text-[var(--accent)] uppercase">
                    {t(group.title)}
                  </h3>
                  <ul className="mt-3.5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={t(item)}
                        className="rounded-md border border-[var(--border)] bg-[var(--background)]/60 px-2.5 py-1 text-xs text-[var(--muted)] transition-colors duration-200 group-hover:border-[var(--accent)]/25"
                      >
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---- Phát triển với hỗ trợ AI ---- */}
        <Section
          id="ai"
          heading={t(CONTENT.ai.heading)}
          sub={t(CONTENT.ai.sub)}
        >
          <Reveal>
            <div className="rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--card)]/70 to-[var(--card)]/20 p-5 sm:p-6">
              <ul className="space-y-2.5">
                {CONTENT.ai.bullets.map((b, i) => (
                  <Reveal as="li" key={t(b)} delay={i * 70}>
                    <div className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
                      <span
                        aria-hidden
                        className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-2)]"
                      />
                      <span>{t(b)}</span>
                    </div>
                  </Reveal>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2 border-t border-[var(--border)]/60 pt-5">
                {CONTENT.ai.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-[var(--accent-2)]/25 bg-[var(--accent-2)]/5 px-2.5 py-1 text-xs text-[var(--muted)]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Section>

        {/* ---- Liên hệ ---- */}
        <Section
          id="contact"
          heading={t(CONTENT.contact.heading)}
          sub={t(CONTENT.contact.sub)}
        >
          {links.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {links.map((l, i) => (
                <Reveal key={l.label} delay={i * 70}>
                  <a
                    href={l.href}
                    {...(l.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex h-full items-center gap-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)]/50 px-4 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:bg-[var(--card)]"
                  >
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)]/60 text-sm text-[var(--accent)] transition-colors group-hover:border-[var(--accent)]/40"
                    >
                      {l.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-[var(--muted)]">
                        {l.label}
                      </span>
                      <span className="block truncate text-sm transition-colors group-hover:text-[var(--accent)]">
                        {l.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <p className="rounded-lg border border-dashed border-[var(--border)] px-4 py-3 text-sm text-[var(--muted)]">
                {t(CONTENT.contact.empty)}
              </p>
            </Reveal>
          )}
        </Section>
      </main>

      <footer className="mx-auto max-w-5xl px-6 py-10 text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} {PROFILE.name} · {t(CONTENT.footer.built)}{" "}
        Next.js + Tailwind
      </footer>
    </div>
  );
}

/** Khung chung cho mỗi mục: tiêu đề + mô tả phụ + nội dung. */
function Section({
  id,
  heading,
  sub,
  children,
}: {
  id: string;
  heading: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-[var(--border)]/60 py-16"
    >
      <Reveal>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {heading}
        </h2>
        {sub && <p className="mt-2 text-sm text-[var(--muted)]">{sub}</p>}
      </Reveal>
      <div className="mt-8">{children}</div>
    </section>
  );
}
