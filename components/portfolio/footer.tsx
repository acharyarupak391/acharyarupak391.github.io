"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { profile, navLinks } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Footer() {
  const [now, setNow] = useState<string>("");
  const reduced = useReducedMotion();
  const topBtnRef = useRef<HTMLAnchorElement | null>(null);

  // Local time clock — Kathmandu tz
  useEffect(() => {
    const update = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kathmandu",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setNow(formatter.format(new Date()));
      } catch {
        setNow("--:--:--");
      }
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <footer className="surface-deep mt-auto">
      <div className="mx-auto max-w-[1400px]">
        {/* Top bar — nav + back-to-top */}
        <div
          className="grid grid-cols-12 gap-4 items-center py-6 px-4 md:px-8 border-b"
          style={{ borderColor: "var(--rule-inverse-soft)" }}
        >
          <div className="col-span-8 md:col-span-6">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-faint">
              {"[ END OF FILE ]"}
            </span>
          </div>
          <div className="col-span-4 md:col-span-6 flex justify-end">
            <a
              ref={topBtnRef}
              href="#top"
              onClick={(e) => handleNavClick(e, "#top")}
              className="group inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-inverse-soft hover:text-accent-soft transition-colors"
            >
              <ArrowUp
                size={14}
                className="transition-transform group-hover:-translate-y-0.5"
              />
              <span>Back to top</span>
            </a>
          </div>
        </div>

        {/* Main footer body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 px-4 md:px-8 py-10 md:py-14">
          {/* Identity */}
          <div className="md:col-span-6 lg:col-span-5">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, "#top")}
              className="inline-flex transition-transform hover:-translate-y-1"
              aria-label={`${profile.name} — home`}
            >
              <Image
                src="/logo.svg"
                alt={`${profile.name} logo`}
                width={128}
                height={128}
                className="h-24 w-24 object-contain md:h-32 md:w-32"
              />
            </a>
            <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-inverse-soft max-w-md">
              {`${profile.role} · ${profile.location}`}
            </p>
            <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-faint">
              {`© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`}
            </p>
          </div>

          {/* Nav columns */}
          <div className="md:col-span-3 lg:col-span-3">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-faint">
              {"[ SECTIONS ]"}
            </span>
            <ul className="mt-4 grid gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-inverse-soft hover:text-accent-soft transition-colors"
                  >
                    <span className="tabular-nums text-ink-inverse-faint">{link.index}</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div className="md:col-span-3 lg:col-span-4">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-faint">
              {"[ LIVE STATUS ]"}
            </span>
            <div className="mt-4 grid gap-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-inverse-soft">
              <div className="flex items-center justify-between gap-4">
                <span className="text-ink-inverse-faint">LOCAL TIME</span>
                <span className="tabular-nums text-ink-inverse">{now || "--:--:--"}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-ink-inverse-faint">TIMEZONE</span>
                <span>UTC+05:45</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-ink-inverse-faint">STATUS</span>
                <span className="flex items-center gap-2 text-accent-soft">
                  <span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 bg-signal pulse-dot"
                  />
                  AVAILABLE
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-ink-inverse-faint">BUILD</span>
                <span>2026.07 · REV 1.3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="border-t px-4 md:px-8 py-4 flex items-center justify-center"
          style={{ borderColor: "var(--rule-inverse-soft)" }}
        >
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-faint">
            {"[ END // EOF ]"}
          </span>
        </div>
      </div>
    </footer>
  );
}
