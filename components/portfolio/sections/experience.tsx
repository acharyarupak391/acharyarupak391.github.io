"use client";

import { useEffect, useRef, useState } from "react";
import { workExperience, sectionMeta, type WorkExperience } from "@/data/portfolio";
import { SectionHeader } from "../section-header";
import { Tag } from "../tag";
import { MobileCarousel } from "../mobile-carousel";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/portfolio/gsap-client";

export function Experience() {
  const root = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const reduced = useReducedMotion();

  // Keep ref in sync with state for ScrollTrigger callbacks
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useGSAP(
    () => {
      // Mobile / reduced motion: simple reveal, no scroll-spy
      if (reduced) {
        gsap.set("[data-exp-reveal]", { opacity: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
        },
        (ctx) => {
          const { isDesktop } = ctx.conditions as { isDesktop: boolean };

          // ----- Desktop: scroll-spy with sticky detail panel -----
          if (isDesktop) {
            const regions = gsap.utils.toArray<HTMLElement>("[data-exp-region]");
            const triggers: ScrollTrigger[] = [];

            const updateProgress = (idx: number) => {
              const progressEl = root.current?.querySelector<HTMLElement>("[data-exp-progress]");
              if (!progressEl) return;
              const total = regions.length;
              // Use scaleY transform (origin top) — performant, no layout
              const targetScale = (idx + 1) / total;
              gsap.to(progressEl, {
                scaleY: targetScale,
                duration: 0.5,
                ease: "power2.out",
              });
            };

            const updateActive = (idx: number) => {
              if (activeIndexRef.current !== idx) {
                activeIndexRef.current = idx;
                setActiveIndex(idx);
                updateProgress(idx);
              }
            };

            regions.forEach((region, i) => {
              const st = ScrollTrigger.create({
                trigger: region,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => updateActive(i),
                onEnterBack: () => updateActive(i),
              });
              triggers.push(st);
            });

            // Initialize progress to current active
            updateProgress(activeIndexRef.current);

            // Reveal each region's left-side label
            gsap.from("[data-exp-row]", {
              opacity: 0,
              y: 20,
              duration: 0.5,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: "[data-exp-timeline]",
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            });

            return () => {
              triggers.forEach((t) => t.kill());
            };
          }

          // ----- Mobile: simple sequential reveal -----
          gsap.utils.toArray<HTMLElement>("[data-exp-mobile-card]").forEach((card) => {
            gsap.from(card, {
              opacity: 0,
              y: 24,
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          });
        },
      );
    },
    { scope: root },
  );

  // Refresh ScrollTrigger after fonts load (so positions are accurate)
  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    return () => window.clearTimeout(id);
  }, [reduced]);

  const active = workExperience[activeIndex] ?? workExperience[0];

  const handleNavClick = (idx: number) => {
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;
    const region = root.current?.querySelector<HTMLElement>(
      `[data-exp-region="${idx}"]`,
    );
    if (region) {
      const top = region.offsetTop;
      const offset = window.innerHeight * 0.45 - region.offsetHeight / 2;
      window.scrollTo({
        top: top - Math.max(80, offset),
        behavior: reduced ? "auto" : "smooth",
      });
    }
  };

  return (
    <section
      id="experience"
      ref={root}
      aria-labelledby="experience-title"
      className="scroll-mt-[80px] surface-soft"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index={sectionMeta.experience.index}
          title={sectionMeta.experience.title}
          file={sectionMeta.experience.file}
          subtitle="Six engineering roles across fintech, Web3, agency, and product — 2020 to present."
          variant="soft"
          numeral={sectionMeta.experience.numeral}
        />

        {/* DESKTOP: scroll-spy timeline + sticky detail panel */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-12 rule-b">
            {/* Left: scroll-spy timeline */}
            <div className="col-span-5 rule-r relative" data-exp-timeline>
              {/* Vertical track + progress overlay */}
              <div
                aria-hidden="true"
                className="absolute left-[28px] top-0 bottom-0 w-px bg-rule-soft"
              />
              <div
                aria-hidden="true"
                data-exp-progress
                className="absolute left-[28px] top-0 bottom-0 w-px bg-accent origin-top"
                style={{ transform: "scaleY(0.1666)" }}
              />

              {/* Scroll regions — each one triggers an active-index update */}
              {workExperience.map((job, i) => (
                <div
                  key={job.id}
                  data-exp-region={i}
                  className="relative"
                  style={{ minHeight: "55vh" }}
                >
                  <TimelineRow
                    job={job}
                    index={i}
                    isActive={activeIndex === i}
                    onSelect={() => handleNavClick(i)}
                  />
                </div>
              ))}
            </div>

            {/* Right: sticky detail panel */}
            <div className="col-span-7">
              <div className="sticky top-[60px]">
                <DetailPanel job={active} index={activeIndex} />
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE: Embla carousel (below lg) */}
        <div className="lg:hidden rule-b">
          <MobileCarousel ariaLabel="Work experience carousel">
            {workExperience.map((job, i) => (
              <MobileCard key={job.id} job={job} index={i} />
            ))}
          </MobileCarousel>
        </div>
      </div>
    </section>
  );
}

interface TimelineRowProps {
  job: WorkExperience;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

function TimelineRow({ job, index, isActive, onSelect }: TimelineRowProps) {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <div
      data-exp-row
      data-exp-reveal
      className={cn(
        "relative pl-16 pr-6 md:pr-8 py-8 transition-colors duration-300 min-h-[55vh] flex flex-col justify-center",
        isActive ? "surface-canvas" : "hover:surface-canvas",
      )}
    >
      {/* Node */}
      <button
        ref={btnRef}
        type="button"
        onClick={onSelect}
        onKeyDown={handleKey}
        aria-pressed={isActive}
        aria-label={`${job.company} — ${job.role}, ${job.period}`}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          "absolute left-5 top-12 -translate-x-1/2 grid place-items-center h-4 w-4 transition-all rule-2",
          isActive ? "bg-accent border-accent scale-125" : "bg-canvas border-ink",
        )}
      >
        {isActive && (
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-ink-inverse"
          />
        )}
      </button>

      <button
        type="button"
        onClick={onSelect}
        onKeyDown={handleKey}
        className="block w-full text-left group"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint tabular-nums">
            {`// ${String(index + 1).padStart(2, "0")}`}
          </span>
          <span
            className={cn(
              "font-mono text-[0.625rem] uppercase tracking-[0.14em] tabular-nums",
              job.current ? "text-accent" : "text-ink-faint",
            )}
          >
            {job.startLabel} — {job.endLabel}
          </span>
        </div>

        <h3
          className={cn(
            "mt-2 font-display text-xl md:text-2xl uppercase tracking-tight leading-tight transition-colors",
            isActive ? "text-accent" : "text-ink group-hover:text-accent",
          )}
        >
          {job.company}
        </h3>

        <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-soft">
          {job.role}
        </p>

        <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
          {`▸ ${job.location}`}
        </p>
      </button>
    </div>
  );
}

function DetailPanel({
  job,
  index,
}: {
  job: WorkExperience;
  index: number;
}) {
  const root = useRef<HTMLDivElement | null>(null);

  // Animate transition on job change — coordinated timeline
  useGSAP(
    () => {
      if (!root.current) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const tl = gsap.timeline({ defaults: { duration: 0.35, ease: "power3.out" } });

      // 1. Mask reveal: animate a clip-path inset on the container
      tl.fromTo(
        root.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.45, ease: "power3.out" },
      );

      // 2. Stagger the inner elements
      tl.from(
        root.current.querySelectorAll("[data-detail-stagger]"),
        {
          opacity: 0,
          y: 14,
          duration: 0.35,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.3",
      );
    },
    { scope: root, dependencies: [job.id], revertOnUpdate: true },
  );

  return (
    <div
      ref={root}
      className="surface-canvas h-[calc(100vh-60px)] p-6 md:p-10 lg:p-12 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6" data-detail-stagger>
        <div>
          <Tag variant={job.current ? "accent" : "default"}>
            {job.current ? "ACTIVE" : "ARCHIVED"}
          </Tag>
          <h3 className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] uppercase leading-[0.9] tracking-tight">
            {job.company}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
            {job.role}
          </p>
        </div>
        <div className="text-right shrink-0" data-detail-stagger>
          <div className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
            PERIOD
          </div>
          <div className="mt-1 font-display text-base md:text-lg uppercase tracking-tight">
            {job.period}
          </div>
          <div className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
            {`▸ ${job.location}`}
          </div>
          <div className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent">
            {`ROLE ${String(index + 1).padStart(2, "0")} / 06`}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div data-detail-stagger className="rule-t rule-b py-5 mb-5">
        <Tag> SUMMARY </Tag>
        <p className="mt-3 text-base md:text-lg leading-relaxed text-ink-soft">
          {job.summary}
        </p>
      </div>

      {/* Responsibilities */}
      <div data-detail-stagger className="mb-5 flex-1 overflow-y-auto pr-2">
        <Tag>
          {`RESPONSIBILITIES // ${String(job.responsibilities.length).padStart(2, "0")}`}
        </Tag>
        <ul className="mt-4 grid gap-2.5">
          {job.responsibilities.map((r, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm md:text-[0.95rem] leading-relaxed text-ink-soft"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[0.625rem] tabular-nums text-accent pt-1 shrink-0"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stack chips */}
      <div data-detail-stagger className="pt-5 rule-t">
        <Tag> STACK </Tag>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-1.5 rule-2 surface-soft font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileCard({ job, index }: { job: WorkExperience; index: number }) {
  return (
    <article
      data-exp-mobile-card
      className="surface-canvas rule-b p-6 md:p-8"
    >
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint tabular-nums">
          {`// ${String(index + 1).padStart(2, "0")}`}
        </span>
        <span
          className={cn(
            "font-mono text-[0.625rem] uppercase tracking-[0.14em] tabular-nums",
            job.current ? "text-accent" : "text-ink-faint",
          )}
        >
          {job.startLabel} — {job.endLabel}
        </span>
      </div>

      <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight leading-tight">
        {job.company}
      </h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
        {job.role}
      </p>
      <p className="mt-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
        {`▸ ${job.location}`}
      </p>

      <div className="rule-t mt-4 pt-4">
        <Tag> SUMMARY </Tag>
        <p className="mt-2 text-sm md:text-base leading-relaxed text-ink-soft">
          {job.summary}
        </p>
      </div>

      <div className="rule-t mt-4 pt-4">
        <Tag>
          {`RESPONSIBILITIES // ${String(job.responsibilities.length).padStart(2, "0")}`}
        </Tag>
        <ul className="mt-3 grid gap-2">
          {job.responsibilities.map((r, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[0.625rem] tabular-nums text-accent pt-0.5 shrink-0"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rule-t mt-4 pt-4">
        <Tag> STACK </Tag>
        <div className="mt-3 flex flex-wrap gap-2">
          {job.stack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2.5 py-1 rule-2 surface-soft font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
