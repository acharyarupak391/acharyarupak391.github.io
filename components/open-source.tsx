"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, GitFork, Star } from "lucide-react";

const contributions = [
  {
    name: "Neptune Mutual",
    description:
      "Enhanced open-source projects related to decentralized insurance solutions",
    url: "https://github.com/neptune-mutual-blue",
    color: "bg-neo-blue",
    role: "Contributor",
  },
  {
    name: "Station DEX",
    description:
      "Contributing to decentralized exchange infrastructure and improving user experiences",
    url: "https://github.com/station-dex",
    color: "bg-neo-green",
    role: "Contributor",
  },
  {
    name: "GitHub File Icons",
    description: "Chrome extension to give icons to files in Github UI",
    url: "https://github.com/homerchen19/github-file-icons",
    color: "bg-neo-pink",
    role: "Contributor",
  },
  {
    name: "Comma AI Flash",
    description: "Participating in bounty program for automotive AI",
    url: "https://github.com/commaai/flash/issues/42",
    color: "bg-neo-orange",
    role: "Participant",
  },
];

export function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="opensource"
      className="py-20 md:py-32 px-4 relative overflow-hidden"
    >
      {/* Diagonal stripes background */}
      <div className="absolute inset-0 bg-neo-yellow">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              #000 20px,
              #000 24px
            )`,
            opacity: 0.1,
          }}
        />
      </div>
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-neo-pink border-r-4 border-b-4 border-foreground" />
      <div className="absolute top-0 right-0 w-24 h-24 bg-neo-blue border-l-4 border-b-4 border-foreground" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-neo-green border-r-4 border-t-4 border-foreground" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-neo-orange border-l-4 border-t-4 border-foreground" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-3 bg-foreground text-background border-4 border-foreground shadow-brutal transform -rotate-1">
            <span className="font-bold uppercase tracking-widest flex items-center gap-2">
              <GitFork className="w-5 h-5" />
              Open Source
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black">
            COMMUNITY
            <br />
            <span className="text-neo-pink [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:3px_black]">
              CONTRIBUTIONS
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {contributions.map((contribution, index) => (
            <a
              key={contribution.name}
              href={contribution.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${
                contribution.color
              } p-6 md:p-8 border-4 border-foreground shadow-brutal-lg group block transition-all duration-300 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transform: isVisible
                  ? `rotate(${index % 2 === 0 ? "1deg" : "-1deg"})`
                  : "none",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl md:text-2xl font-black">
                  {contribution.name}
                </h3>
                <ExternalLink className="w-6 h-6 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              </div>
              <p className="bg-background p-3 border-2 border-foreground transition-all duration-200 group-hover:bg-neo-yellow/30">
                {contribution.description}
              </p>
              <div className="flex items-center gap-4 mt-4">
                <span className="flex items-center gap-1 font-mono text-sm transition-transform duration-200 group-hover:scale-105">
                  <Star className="w-4 h-4" />
                  {contribution.role}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
