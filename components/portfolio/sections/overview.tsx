"use client";

import { useRef } from "react";
import { profile, sectionMeta } from "@/data/portfolio";
import { SectionHeader } from "../section-header";
import { Tag } from "../tag";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/portfolio/gsap-client";

export function Overview() {
  const root = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set("[data-ov-reveal]", { opacity: 1, y: 0 });
        return;
      }

      // Single editorial block reveal — animate the whole paragraph as one
      // unit with a mask-like yPercent + opacity transition.
      gsap.from("[data-ov-intro-block]", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-ov-intro-wrap]",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      // Side meta — small stagger
      gsap.from("[data-ov-meta]", {
        opacity: 0,
        x: 16,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-ov-meta-wrap]",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Capabilities strip — stagger in
      gsap.from("[data-ov-cap]", {
        opacity: 0,
        y: 20,
        duration: 0.45,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-ov-caps]",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Subtle surface transition: a soft background band slides in
      gsap.fromTo(
        "[data-ov-band]",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: "[data-ov-intro-wrap]",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: root },
  );

  const capabilities = [
    { id: "frontend", label: "Frontend Architecture", detail: "React · Next.js · TypeScript", index: "01" },
    { id: "web3", label: "Web3 & Smart Contracts", detail: "Solidity · ethers.js · Hardhat", index: "02" },
    { id: "backend", label: "Backend Systems", detail: "Node.js · Golang · PostgreSQL", index: "03" },
    { id: "ml", label: "Machine Learning", detail: "TensorFlow · scikit-learn · Keras", index: "04" },
  ];

  return (
    <section
      id="overview"
      ref={root}
      aria-labelledby="overview-title"
      className="scroll-mt-[80px] surface-canvas"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index={sectionMeta.overview.index}
          title={sectionMeta.overview.title}
          file={sectionMeta.overview.file}
          subtitle="Background, focus areas, and current engineering posture."
          numeral={sectionMeta.overview.numeral}
        />

        {/* Body — split layout with sticky side rail */}
        <div className="grid grid-cols-12 rule-b surface-canvas relative">
          {/* Soft background band — slides in on enter */}
          <div
            aria-hidden="true"
            data-ov-band
            className="absolute inset-0 surface-soft origin-left pointer-events-none"
            style={{ zIndex: 0 }}
          />

          {/* Left rail: sticky section index */}
          <aside className="hidden md:flex col-span-2 rule-r flex-col gap-3 p-6 relative z-10">
            <div className="md:sticky md:top-24 flex flex-col gap-3">
              <Tag variant="accent">SEC · 01</Tag>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                {"// INTRODUCTION"}
              </span>
              <div className="mt-2 w-8 h-px bg-accent" aria-hidden="true" />
            </div>
          </aside>

          {/* Center: introduction */}
          <div
            className="col-span-12 md:col-span-7 p-6 md:p-10 lg:p-14 relative z-10"
            data-ov-intro-wrap
          >
            <span className="tag-label mb-6 block">
              <span className="px-0.5">[ BIO ]</span>
            </span>
            <p
              data-ov-intro-block
              data-ov-reveal
              className="text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.5] tracking-[-0.01em] text-ink max-w-2xl"
            >
              {profile.introduction}
            </p>
          </div>

          {/* Right rail: meta */}
          <aside
            className="col-span-12 md:col-span-3 rule-l p-6 md:p-8 flex flex-col gap-5 relative z-10"
            data-ov-meta-wrap
          >
            <div data-ov-meta>
              <Tag variant="accent">CURRENT</Tag>
              <div className="mt-2 font-display text-lg uppercase tracking-tight leading-tight">
                {profile.role}
              </div>
            </div>

            <div data-ov-meta>
              <Tag>BASE</Tag>
              <div className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                {profile.location}
              </div>
              <div className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                {profile.coordinates}
              </div>
            </div>

            <div data-ov-meta>
              <Tag>TIMEZONE</Tag>
              <div className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                {profile.timezone}
              </div>
            </div>

            <div data-ov-meta>
              <Tag variant="signal">STATUS</Tag>
              <div className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-signal flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 bg-signal pulse-dot"
                />
                {profile.availability}
              </div>
            </div>
          </aside>
        </div>

        {/* Capabilities strip — surface-muted band for visual distinction */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 rule-b surface-muted"
          data-ov-caps
        >
          {capabilities.map((c, i) => (
            <div
              key={c.id}
              data-ov-cap
              data-ov-reveal
              className={[
                "p-6 md:p-8",
                i < capabilities.length - 1 ? "rule-r rule-b md:rule-b-0" : "rule-b md:rule-b-0",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent tabular-nums">
                  {c.index}
                </span>
                <div>
                  <h3 className="font-display text-base uppercase tracking-tight leading-tight">
                    {c.label}
                  </h3>
                  <p className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-faint">
                    {c.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
