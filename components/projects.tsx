"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    name: "Delights Of India",
    description:
      "Site for the Delights Of India restaurant to know about, see the menu and reserve a booking.",
    link: "https://www.delightsofindia.art/",
    tech: "Typescript, NextJS, Sanity CMS, Tailwind",
    image: "/assets/projects/delightsofindia.png",
  },
  {
    name: "Simple Event Scheduler",
    description:
      "A simple event scheduler that lets you schedule events, see holidays based on your country and get notified on your event.",
    github: "https://github.com/acharyarupak391/simple-event-scheduler",
    link: "https://simple-event-scheduler.vercel.app",
    tech: "Typescript, NodeJS, Sqlite, ExpressJS, ReactJS, Tailwind",
    image: "/assets/projects/event-scheduler.png",
  },
  {
    name: "Wordshell",
    description:
      "Its Wordle in your shell! Play wordle right from your terminal!",
    github: "https://github.com/acharyarupak391/wordshell",
    tech: "Bash",
    image: "/assets/projects/wordshell.png",
  },
  {
    name: "Node Torrent Stream",
    description:
      "Stream torrent videos in directly in your browser with your own server!",
    github: "https://github.com/acharyarupak391/Node-Torrent-Stream",
    tech: "NodeJS, ExpressJS, webtorrent, ReactJS, MaterialUI",
    image: "/assets/projects/node-torrent-stream.png",
  },
  {
    name: "Stream to Image Encoder",
    description:
      "A python based cli tool to encode a text file into an image to secure the content with reduced size.",
    github: "https://github.com/acharyarupak391/string-to-image-encoder",
    tech: "Python",
    image: "/assets/projects/encoder.png",
  },
  {
    name: "Realtime Payment Negotiation",
    description:
      "Realtime payment negotiation between two parties in realtime creating a secure connection pool.",
    github:
      "https://github.com/acharyarupak391/realtime-negotiation-with-websocket",
    tech: "NextJS, Express, Websocket, Typescript, NodeJS, SQLite",
    image: "/assets/projects/realtime.png",
  },
  {
    name: "Amazon Product Scraper",
    description:
      "A browser extension to scrape product details such as name, price, images, overview & description from any amazon.in product page.",
    github: "https://github.com/acharyarupak391/amazon-scraper",
    tech: "NodeJS, Express, Prisma, Postgresql, Extension, Typescript, React, Webpack",
    image: "/assets/projects/scraper.png",
  },
];

const cardColors = [
  "bg-neo-yellow",
  "bg-neo-pink",
  "bg-neo-blue",
  "bg-neo-green",
  "bg-neo-orange",
];

export function Projects() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => new Set([...prev, index]));
            }, index * 100);
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section
      id="projects"
      className="py-20 md:py-32 bg-neo-green relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-neo-yellow border-4 border-foreground rotate-12 hidden md:block" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-neo-pink border-4 border-foreground -rotate-6 hidden md:block" />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-neo-blue border-4 border-foreground rotate-45 hidden lg:block" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="inline-block">
            <h2 className="text-5xl md:text-7xl font-black uppercase bg-foreground text-background px-6 py-4 rotate-1 border-4 border-foreground shadow-brutal-lg">
              Projects
            </h2>
          </div>
          <p className="mt-8 text-xl md:text-2xl font-bold max-w-2xl mx-auto bg-background border-4 border-foreground p-4 -rotate-1 shadow-brutal">
            Some of the things I&apos;ve built
          </p>
        </div>

        {/* Projects grid - Bento style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.name}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`group relative ${
                index === 0 ? "md:col-span-2 lg:col-span-4" : "lg:col-span-2"
              } 
              ${index >= 5 ? "lg:col-span-3" : ""}
              `}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`
                  ${
                    cardColors[index % cardColors.length]
                  } border-4 border-foreground
                  transition-all duration-300 ease-out
                  ${
                    visibleCards.has(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }
                  ${
                    hoveredCard === index
                      ? "shadow-brutal-lg -translate-x-1 -translate-y-1"
                      : "shadow-brutal"
                  }
                  ${index % 2 === 0 ? "rotate-1" : "-rotate-1"}
                  hover:rotate-0
                  h-full flex flex-col overflow-hidden
                `}
              >
                {/* Project number badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-foreground text-background font-black text-xl flex items-center justify-center border-4 border-foreground rotate-12 group-hover:rotate-0 transition-transform z-10">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="relative w-full h-48 md:h-56 border-b-4 border-foreground overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Image overlay on hover */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-black uppercase mb-4 leading-tight">
                    {project.name}
                  </h3>
                  <p className="text-base md:text-lg font-medium mb-6 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.split(", ").map((tech) => (
                        <span
                          key={tech}
                          className="bg-foreground text-background px-3 py-1 text-sm font-bold uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-background border-4 border-foreground px-4 py-2 font-bold uppercase text-sm hover:bg-foreground hover:text-background transition-colors shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                      >
                        <Github className="w-5 h-5" />
                        Code
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-background border-4 border-foreground px-4 py-2 font-bold uppercase text-sm hover:bg-foreground hover:text-background transition-colors shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                      >
                        <ExternalLink className="w-5 h-5" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex justify-center">
          <div className="flex gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-6 h-6 border-4 border-foreground ${
                  i % 2 === 0 ? "bg-neo-yellow" : "bg-neo-pink"
                } ${i % 3 === 0 ? "rotate-45" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
