"use client";

import type { Lang } from "@/lib/content";

type Props = { lang: Lang; onChange: (lang: Lang) => void };

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "vi", label: "VI" },
  { value: "en", label: "EN" },
];

export default function LangToggle({ lang, onChange }: Props) {
  return (
    <div
      role="group"
      aria-label="Language"
      className="relative flex items-center rounded-full border border-[var(--border)] bg-[var(--card)]/70 p-0.5 backdrop-blur"
    >
      {/* Viên trượt chạy theo lựa chọn */}
      <span
        aria-hidden
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-[var(--accent)]/20 ring-1 ring-[var(--accent)]/40 transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${lang === "vi" ? "0%" : "100%"})` }}
      />
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={lang === o.value}
          className={`relative z-10 w-10 rounded-full py-1 text-xs font-medium transition-colors ${
            lang === o.value ? "text-[var(--foreground)]" : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
