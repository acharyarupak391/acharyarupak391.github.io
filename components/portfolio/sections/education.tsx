"use client";

import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";
import { education, certifications, sectionMeta } from "@/data/portfolio";
import { SectionHeader } from "../section-header";
import { Tag } from "../tag";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/portfolio/gsap-client";

export function Education() {
  const root = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set("[data-edu-reveal]", { opacity: 1, y: 0 });
        return;
      }

      // Ledger line growth — drives a vertical accent line as you scroll
      gsap.fromTo(
        "[data-edu-line]",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-edu-list]",
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.5,
          },
        },
      );

      // Reveal each education entry with stagger
      gsap.from("[data-edu-item]", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-edu-list]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Certifications reveal
      gsap.from("[data-cert-item]", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-cert-list]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="education"
      ref={root}
      aria-labelledby="education-title"
      className="scroll-mt-[80px] surface-canvas"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          index={sectionMeta.education.index}
          title={sectionMeta.education.title}
          file={sectionMeta.education.file}
          subtitle="Academic background, professional certifications, and verifiable qualifications."
          numeral={sectionMeta.education.numeral}
        />

        <div className="grid grid-cols-12 rule-b">
          {/* Education column — ledger layout with growing line */}
          <div className="col-span-12 lg:col-span-7 lg:rule-r p-6 md:p-8 lg:p-10 surface-canvas">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap size={20} className="text-accent" />
              <Tag variant="accent"> EDUCATION </Tag>
            </div>

            <div className="relative" data-edu-list>
              {/* Track line */}
              <div
                aria-hidden="true"
                className="absolute left-[7px] top-2 bottom-2 w-px bg-rule-soft"
              />
              {/* Growing accent line overlay */}
              <div
                aria-hidden="true"
                data-edu-line
                className="absolute left-[7px] top-2 bottom-2 w-px bg-accent"
                style={{ transform: "scaleY(0)" }}
              />

              <ul className="grid gap-0">
                {education.map((edu) => (
                  <li
                    key={edu.id}
                    data-edu-item
                    data-edu-reveal
                    className="relative pl-10 py-6 rule-b last:rule-b-0"
                  >
                    {/* Node */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-9 grid place-items-center h-3.5 w-3.5 rule-2 bg-canvas"
                    >
                      <span className="h-1 w-1 bg-accent" />
                    </span>

                    <div className="grid grid-cols-12 gap-4 items-start">
                      <div className="col-span-12 md:col-span-4">
                        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent tabular-nums">
                          {edu.date}
                        </span>
                        <div className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                          {`▸ ${edu.location}`}
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-8">
                        <h3 className="font-display text-lg md:text-xl uppercase tracking-tight leading-tight">
                          {edu.institution}
                        </h3>
                        <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                          {edu.degree}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-faint">
                          {edu.note}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certifications column — surface-muted panel for visual distinction */}
          <div className="col-span-12 lg:col-span-5 p-6 md:p-8 lg:p-10 surface-soft">
            <div className="flex items-center gap-3 mb-6">
              <Award size={20} className="text-accent" />
              <Tag variant="accent"> CERTIFICATIONS </Tag>
            </div>

            <ul className="grid gap-0" data-cert-list>
              {certifications.map((cert) => (
                <li
                  key={cert.id}
                  data-cert-item
                  data-edu-reveal
                  className="py-6 rule-b last:rule-b-0"
                >
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent tabular-nums">
                      {cert.date}
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                      {cert.issuer}
                    </span>
                  </div>
                  <h3 className="font-display text-base uppercase tracking-tight leading-tight">
                    {cert.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {cert.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
