"use client";

import { useRef } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { openSourceContributions, sectionMeta } from "@/data/portfolio";
import { SectionHeader } from "../section-header";
import { Tag } from "../tag";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/portfolio/gsap-client";

export function OpenSource() {
  const root = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set("[data-os-reveal]", { opacity: 1, y: 0 });
        return;
      }

      // Directional mask reveal per card
      gsap.utils.toArray<HTMLElement>("[data-os-card]").forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Fine-pointer: border-movement hover effect
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-os-card]");
        cards.forEach((card) => {
          const bar = card.querySelector<HTMLElement>("[data-os-bar]");
          if (!bar) return;
          const enter = () => {
            gsap.to(bar, { scaleX: 1, duration: 0.35, ease: "power3.out" });
          };
          const leave = () => {
            gsap.to(bar, { scaleX: 0, duration: 0.35, ease: "power3.out" });
          };
          card.addEventListener("mouseenter", enter);
          card.addEventListener("mouseleave", leave);
          card.addEventListener("focusin", enter);
          card.addEventListener("focusout", leave);
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="open-source"
      ref={root}
      aria-labelledby="open-source-title"
      className="scroll-mt-[80px] surface-soft"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index={sectionMeta.openSource.index}
          title={sectionMeta.openSource.title}
          file={sectionMeta.openSource.file}
          subtitle="Public contributions to decentralized insurance, DEX infrastructure, and developer tooling."
          variant="soft"
          numeral={sectionMeta.openSource.numeral}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 rule-b" data-os-grid>
          {openSourceContributions.map((c, i) => (
            <a
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              data-os-card
              data-os-reveal
              className={[
                "group relative block p-6 md:p-8 lg:p-10 surface-canvas",
                "transition-colors",
                i % 2 === 0 ? "rule-r" : "",
                i < openSourceContributions.length - 2 ? "rule-b" : "",
              ].join(" ")}
            >
              {/* Animated top bar — border-movement on hover/focus */}
              <span
                aria-hidden="true"
                data-os-bar
                className="absolute top-0 left-0 right-0 h-[3px] bg-accent origin-left"
                style={{ transform: "scaleX(0)" }}
              />

              <div className="flex items-start justify-between gap-4 mb-4">
                <Tag variant="accent">
                  {`CONTRIB · ${String(i + 1).padStart(2, "0")}`}
                </Tag>
                <ArrowUpRight
                  size={18}
                  className="text-ink-faint group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <GitBranch size={18} className="text-ink-soft group-hover:text-accent transition-colors" />
                <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight leading-tight">
                  {c.project}
                </h3>
              </div>

              <p className="text-sm md:text-base leading-relaxed text-ink-soft">
                {c.description}
              </p>

              <div className="mt-5 pt-4 rule-t">
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint break-all">
                  {c.url.replace(/^https?:\/\//, "")}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
