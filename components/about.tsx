"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Rocket, Sparkles, Zap } from "lucide-react";

export function About() {
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

  const highlights = [
    { icon: Code2, label: "Clean Code", color: "bg-neo-yellow" },
    { icon: Rocket, label: "Fast Delivery", color: "bg-neo-pink" },
    { icon: Zap, label: "Performance", color: "bg-neo-blue" },
    { icon: Sparkles, label: "Innovation", color: "bg-neo-green" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 md:py-32 px-4 bg-neo-yellow"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="inline-block mb-6 px-4 py-2 bg-foreground text-background border-4 border-foreground shadow-brutal">
              <span className="font-bold uppercase tracking-widest text-sm">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              CRAFTING
              <br />
              <span className="text-neo-pink [-webkit-text-stroke:2px_black]">
                DIGITAL
              </span>
              <br />
              EXPERIENCES
            </h2>

            <div className="space-y-4 text-lg leading-relaxed">
              <p className="bg-background p-4 border-4 border-foreground shadow-brutal">
                I am a versatile{" "}
                <strong className="bg-neo-pink px-1">
                  Full Stack Web Developer
                </strong>{" "}
                with 5+ years of experience, specializing in React, Next.js, and
                Node.js for frontend and backend development.
              </p>
              <p className="bg-background p-4 border-4 border-foreground shadow-brutal transform rotate-1">
                Proficient in{" "}
                <strong className="bg-neo-blue px-1">
                  JavaScript & Node JS
                </strong>
                , I also have handful experience in Python & Golang.
              </p>
              <p className="bg-background p-4 border-4 border-foreground shadow-brutal transform -rotate-1">
                My experience in{" "}
                <strong className="bg-neo-green px-1">
                  Web3 and smart contracts
                </strong>
                , coupled with expertise in machine learning, demonstrates a
                broad technical skill set.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-20"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.label}
                  className={`${item.color} p-6 border-4 border-foreground shadow-brutal-lg group cursor-pointer transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1`}
                  style={{
                    transform: `rotate(${index % 2 === 0 ? "2deg" : "-2deg"})`,
                  }}
                >
                  <item.icon className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-black uppercase">{item.label}</h3>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-neo-orange text-foreground border-4 border-foreground shadow-brutal-lg transform rotate-2 cursor-pointer transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 hover:rotate-0">
              <div className="text-6xl md:text-7xl font-black mb-2">5+</div>
              <div className="text-xl font-bold uppercase tracking-wider">
                Years of Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
