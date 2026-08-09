"use client";

import { useEffect, useRef, useState } from "react";
import { ExperienceHeader } from "./experience/experience-header";
import { ExperienceCard } from "./experience/experience-card";
import { ExperienceDecorations } from "./experience/experience-decorations";
import { ExperienceCta } from "./experience/experience-cta";
import { experiences } from "./experience/experience-data";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll(".experience-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 md:py-32 px-4 overflow-hidden bg-background"
    >
      <ExperienceDecorations />

      <div className="relative z-10 max-w-6xl mx-auto">
        <ExperienceHeader />

        <div className="relative pl-10 md:pl-16">
          <div className="absolute left-3 md:left-5 top-3 bottom-3 border-l-4 border-dashed border-foreground" />

          <div className="space-y-8 md:space-y-10">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                data-index={index}
                className={`experience-item relative transition-all duration-700 ${
                  visibleItems.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute -left-[34px] md:-left-[54px] top-8 w-6 h-6 md:w-7 md:h-7 ${exp.dotColor} border-4 border-foreground rounded-full z-10`}
                />
                <ExperienceCard experience={exp} />
              </div>
            ))}
          </div>
        </div>

        <ExperienceCta />
      </div>
    </section>
  );
}
