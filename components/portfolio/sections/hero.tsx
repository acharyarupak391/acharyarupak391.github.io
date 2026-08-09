"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { profile, tickerItems, stats } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/portfolio/gsap-client";

export function Hero() {
  const root = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set("[data-hero-reveal]", { opacity: 1, y: 0, x: 0, scale: 1 });
        gsap.set("[data-hero-veil]", { opacity: 0, pointerEvents: "none" });
        return;
      }

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: "power3.out" },
      });

      tl.from("[data-hero-topbar]", {
        yPercent: -100,
        opacity: 0,
        duration: 0.4,
      });

      tl.from(
        "[data-hero-name-line]",
        {
          yPercent: 110,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.1",
      );

      tl.from(
        "[data-hero-role]",
        { y: 20, opacity: 0, duration: 0.5 },
        "-=0.3",
      );

      tl.from(
        "[data-hero-image]",
        {
          opacity: 0,
          scale: 1.08,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.5",
      );

      tl.from(
        "[data-hero-tagline]",
        { y: 16, opacity: 0, duration: 0.5 },
        "-=0.4",
      );

      tl.from(
        "[data-hero-meta]",
        { y: 10, opacity: 0, stagger: 0.06, duration: 0.4 },
        "-=0.3",
      );

      tl.from(
        "[data-hero-stat]",
        { y: 20, opacity: 0, stagger: 0.08, duration: 0.45 },
        "-=0.2",
      );

      tl.from(
        "[data-hero-cta]",
        { y: 16, opacity: 0, duration: 0.4 },
        "-=0.2",
      );
      tl.from(
        "[data-hero-cue]",
        { opacity: 0, duration: 0.3 },
        "-=0.1",
      );

      tl.to(
        "[data-hero-veil]",
        {
          opacity: 0,
          duration: 0.3,
          pointerEvents: "none",
          onComplete: () => {
            const veil = document.querySelector("[data-hero-veil]");
            veil?.parentElement?.removeChild(veil);
          },
        },
        0,
      );

      // Pointer parallax (fine-pointer + non-reduced only)
      const canHover =
        typeof window !== "undefined" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      if (canHover && root.current) {
        const container = root.current;
        const layers = gsap.utils.toArray<HTMLElement>("[data-parallax]");
        const setters = layers.map((el) => {
          const depth = parseFloat(el.dataset.parallax || "0");
          return {
            el,
            depth,
            xTo: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" }),
            yTo: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" }),
          };
        });

        const onMove = (e: PointerEvent) => {
          if (!container) return;
          const rect = container.getBoundingClientRect();
          const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
          setters.forEach((s) => {
            s.xTo(nx * 8 * s.depth);
            s.yTo(ny * 8 * s.depth);
          });
        };

        const onLeave = () => {
          setters.forEach((s) => {
            s.xTo(0);
            s.yTo(0);
          });
        };

        container.addEventListener("pointermove", onMove);
        container.addEventListener("pointerleave", onLeave);

        return () => {
          container.removeEventListener("pointermove", onMove);
          container.removeEventListener("pointerleave", onLeave);
        };
      }
    },
    { scope: root },
  );

  return (
    <section
      id="top"
      ref={root}
      aria-label="Introduction"
      className="relative surface-canvas min-h-[100svh] flex flex-col"
    >
      {/* Loading veil */}
      <div
        data-hero-veil
        aria-hidden="true"
        className="absolute inset-0 z-30 surface-canvas"
      />

      {/* Top telemetry bar */}
      <div
        data-hero-topbar
        data-hero-reveal
        className="rule-b surface-soft mt-header"
      >
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-2 flex items-center justify-between gap-4">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft whitespace-nowrap">
            {"PORTFOLIO // 2026"}
          </span>
          <span className="hidden sm:flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft whitespace-nowrap">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 bg-signal pulse-dot"
            />
            {"ONLINE"}
          </span>
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft whitespace-nowrap">
            {"REV // 1.4"}
          </span>
        </div>
      </div>

      {/* Main hero body */}
      <div className="mx-auto max-w-[1400px] w-full px-5 md:px-8 flex-1 flex flex-col">

        {/* Name + Profile Image */}
        <div className="py-6 md:py-10 lg:py-14 grid grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Name block — JetBrains Mono, clean and technical */}
          <div className="col-span-12 md:col-span-7 lg:col-span-8">
            <p
              data-hero-role
              data-hero-reveal
              className="font-mono text-[0.6875rem] md:text-xs uppercase tracking-[0.18em] text-accent mb-4 md:mb-6"
            >
              {`// ${profile.role}`}
            </p>
            <div className="overflow-hidden">
              <h1
                data-hero-name-line
                data-hero-reveal
                data-parallax="0.6"
                className="font-mono font-medium text-[clamp(2.25rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em] text-ink will-animate"
              >
                {profile.firstName}
              </h1>
            </div>
            <div className="overflow-hidden flex items-baseline gap-2">
              <h1
                data-hero-name-line
                data-hero-reveal
                data-parallax="0.4"
                className="font-mono font-medium text-[clamp(2.25rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em] text-ink will-animate"
              >
                {profile.lastName}
              </h1>
              <span
                aria-hidden="true"
                data-hero-reveal
                className="font-mono font-medium text-[clamp(2.25rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.04em] text-accent"
              >
                _
              </span>
            </div>
          </div>

          {/* Profile image */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 flex md:justify-end" data-hero-image>
            <div
              className="profile-frame group relative w-full max-w-[220px] sm:max-w-[260px] md:max-w-[240px] lg:max-w-[300px] aspect-[4/5] bg-surface-soft overflow-hidden mx-auto md:mx-0 border border-ink"
              data-parallax="0.15"
              tabIndex={0}
            >
              {/* Corner brackets */}
              <span aria-hidden="true" className="profile-corner absolute top-0 left-0 w-3 h-3 border-t border-l border-accent z-20" />
              <span aria-hidden="true" className="profile-corner absolute top-0 right-0 w-3 h-3 border-t border-r border-accent z-20" />
              <span aria-hidden="true" className="profile-corner absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent z-20" />
              <span aria-hidden="true" className="profile-corner absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent z-20" />

              {/* The image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/profile.png"
                  alt={`${profile.name} — ${profile.role}`}
                  fill
                  sizes="(max-width: 768px) 220px, (max-width: 1024px) 240px, 300px"
                  className="profile-image object-cover"
                  priority
                />
                {/* Dot-matrix pixelated overlay on hover */}
                <div className="dot-matrix-overlay" aria-hidden="true" />
                {/* Hover overlay */}
                <div className="profile-overlay absolute inset-x-0 bottom-0 bg-surface-deep/95 text-ink-inverse p-3 md:p-4">
                  <div className="font-mono text-[0.5rem] md:text-[0.5625rem] uppercase tracking-[0.14em] text-accent-soft mb-1">
                    {"// SUBJECT"}
                  </div>
                  <div className="font-mono text-xs md:text-sm uppercase tracking-tight leading-tight">
                    {profile.name}
                  </div>
                  <div className="font-mono text-[0.5rem] md:text-[0.5625rem] uppercase tracking-[0.14em] text-ink-inverse-faint mt-1">
                    {profile.location}
                  </div>
                </div>
              </div>

              {/* Top label strip */}
              <div className="absolute top-0 inset-x-0 z-10 bg-surface-deep/85 text-ink-inverse px-2.5 py-1 flex items-center justify-between">
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-ink-inverse-faint">
                  {"RA-001"}
                </span>
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.14em] text-accent-soft flex items-center gap-1">
                  <span className="inline-block h-1 w-1 bg-signal pulse-dot" />
                  LIVE
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline + meta — tighter spacing */}
        <div className="grid grid-cols-12 gap-4 md:gap-8 rule-t py-5 md:py-7">
          <div className="col-span-12 lg:col-span-8">
            <p
              data-hero-tagline
              data-hero-reveal
              data-parallax="0.2"
              className="text-[clamp(1rem,2.2vw,1.375rem)] leading-[1.45] tracking-[-0.01em] text-ink max-w-2xl"
            >
              {profile.tagline}
            </p>
          </div>

          <div
            className="col-span-12 lg:col-span-4 flex flex-col gap-1.5 lg:items-end lg:text-right"
            data-parallax="0.3"
          >
            <span
              data-hero-meta
              data-hero-reveal
              className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft"
            >
              {`${profile.location} · UTC+05:45`}
            </span>
            <span
              data-hero-meta
              data-hero-reveal
              className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft"
            >
              {"Available for new work"}
            </span>
          </div>
        </div>

        {/* Stats grid — desktop only (lg+) */}
        <div
          className="hidden lg:grid grid-cols-4 rule-t surface-soft"
          data-parallax="0.15"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-hero-stat
              data-hero-reveal
              className={[
                "py-5 px-5",
                i < stats.length - 1 ? "rule-r" : "",
              ].join(" ")}
            >
              <div className="font-mono font-medium text-[clamp(1.75rem,3.5vw,2.75rem)] leading-none tracking-tight tabular-nums">
                {stat.value}
              </div>
              <div className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft">
                {stat.label}
              </div>
              {stat.note && (
                <div className="mt-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
                  {stat.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA + scroll cue */}
        <div className="rule-t py-6 md:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div
            data-hero-cta
            data-hero-reveal
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#experience"
              className="group inline-flex items-center gap-2.5 bg-ink text-ink-inverse px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] hover:bg-accent transition-colors magnetic whitespace-nowrap"
            >
              <span>View work history</span>
              <ArrowDown
                size={14}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2.5 surface-canvas text-ink rule-2 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] hover:bg-ink hover:text-ink-inverse transition-colors magnetic whitespace-nowrap"
            >
              <span>Get in touch</span>
              <ArrowDown
                size={14}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
          </div>

          <div
            data-hero-cue
            data-hero-reveal
            className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint"
          >
            <span>Scroll</span>
            <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Ticker tape */}
      <div
        data-hero-topbar
        data-hero-reveal
        className="rule-t overflow-hidden surface-deep"
      >
        <div className="ticker-track py-2 whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-inverse-soft"
            >
              <span className="text-accent-soft">+</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
