"use client";

import { useRef } from "react";
import { skillCategories, sectionMeta, type SkillCategory } from "@/data/portfolio";
import { SectionHeader } from "../section-header";
import { Tag } from "../tag";
import { MobileCarousel } from "../mobile-carousel";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/portfolio/gsap-client";

export function Stack() {
  const root = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set("[data-stack-reveal]", { opacity: 1, y: 0 });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(
        {
          isFinePointer: "(hover: hover) and (pointer: fine)",
          isDesktop: "(min-width: 1024px)",
        },
        (ctx) => {
          const { isFinePointer, isDesktop } = ctx.conditions as {
            isFinePointer: boolean;
            isDesktop: boolean;
          };

          // Only attach hover-dim on desktop with fine pointer
          if (isFinePointer && isDesktop && root.current) {
            const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card="desktop"]');
            cards.forEach((card) => {
              const enter = () => {
                cards.forEach((other) => {
                  if (other !== card) {
                    gsap.to(other, { opacity: 0.5, duration: 0.3, ease: "power2.out" });
                  }
                });
                gsap.to(card, { opacity: 1, duration: 0.3, ease: "power2.out" });
              };
              const leave = () => {
                cards.forEach((other) => {
                  gsap.to(other, { opacity: 1, duration: 0.3, ease: "power2.out" });
                });
              };
              card.addEventListener("mouseenter", enter);
              card.addEventListener("mouseleave", leave);
              card.addEventListener("focusin", enter);
              card.addEventListener("focusout", leave);
            });
          }
        },
      );

      const mm2 = gsap.matchMedia();
      mm2.add("(min-width: 1024px)", () => {
        // Reveal each category card (desktop grid only)
        gsap.from('[data-stack-card="desktop"]', {
          opacity: 0,
          y: 24,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-stack-grid]",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="stack"
      ref={root}
      aria-labelledby="stack-title"
      className="scroll-mt-[80px] surface-canvas"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index={sectionMeta.stack.index}
          title={sectionMeta.stack.title}
          file={sectionMeta.stack.file}
          subtitle="Five discipline clusters spanning frontend, backend, Web3, ML, and operations."
          numeral={sectionMeta.stack.numeral}
        />

        {/* DESKTOP: grid layout (lg and up) */}
        <div
          className="hidden lg:grid grid-cols-2 lg:grid-cols-3 rule-b"
          data-stack-grid
        >
          {skillCategories.map((cat, i) => (
            <StackCard
              key={cat.id}
              cat={cat}
              index={i}
              total={skillCategories.length}
              desktop
            />
          ))}
        </div>

        {/* MOBILE + TABLET: Embla carousel (below lg) */}
        <div className="lg:hidden rule-b">
          <MobileCarousel ariaLabel="Skill categories carousel">
            {skillCategories.map((cat, i) => (
              <StackCard
                key={cat.id}
                cat={cat}
                index={i}
                total={skillCategories.length}
                desktop={false}
              />
            ))}
          </MobileCarousel>
        </div>

        {/* Footer caption */}
        <div className="rule-b p-6 md:p-8 grid grid-cols-12 gap-4 items-center surface-soft">
          <div className="col-span-12 md:col-span-8">
            <Tag> NOTE </Tag>
            <p className="mt-3 font-display text-base md:text-lg uppercase tracking-tight leading-tight">
              Every discipline above is in active rotation across current roles at Bivo and Minestarters.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
              {`TOTAL TECH · ${skillCategories.reduce((acc, c) => acc + c.items.length, 0)}`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackCard({
  cat,
  index,
  total,
  desktop,
}: {
  cat: SkillCategory;
  index: number;
  total: number;
  desktop: boolean;
}) {
  const surfaceClass =
    index % 3 === 0
      ? "surface-canvas"
      : index % 3 === 1
      ? "surface-soft"
      : "surface-muted";

  return (
    <div
      data-stack-card={desktop ? "desktop" : "mobile"}
      data-stack-reveal={desktop ? true : undefined}
      tabIndex={0}
      className={cn(
        "p-6 md:p-8 lg:p-10 outline-none transition-colors h-full",
        surfaceClass,
        desktop && [
          index < total - 1 ? "rule-r rule-b lg:rule-b-0" : "",
          index >= total - 3 ? "lg:rule-b-0" : "",
        ],
        !desktop && "rule-2 surface-canvas",
      )}
    >
      {/* Header */}
      <div className="flex items-baseline justify-between gap-3 mb-5 pb-4 rule-b">
        <div>
          <Tag variant="accent">{cat.index}</Tag>
          <h3 className="mt-3 font-display text-xl md:text-2xl uppercase tracking-tight leading-tight">
            {cat.label}
          </h3>
        </div>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint tabular-nums">
          {`// ${String(cat.items.length).padStart(2, "0")}`}
        </span>
      </div>

      {/* Description */}
      <p className="mb-5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] leading-relaxed text-ink-faint">
        {cat.description}
      </p>

      {/* Items list */}
      <ul className="grid gap-0">
        {cat.items.map((item, idx) => (
          <li
            key={item}
            className="flex items-center justify-between py-2 rule-soft-b last:rule-b-0 group"
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="font-mono text-[0.625rem] tabular-nums text-ink-faint group-hover:text-accent transition-colors"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-sm md:text-base text-ink">{item}</span>
            </span>
            <span
              aria-hidden="true"
              className="font-mono text-[0.625rem] text-ink-faint opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity text-accent"
            >
              ▸
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
