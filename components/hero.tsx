"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownToLine,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { EMAIL, GITHUB_PROFILE, LINKEDIN_PROFILE } from "@/lib/constants";

function FloatingShape({
  className,
  style,
  shape,
  color,
}: {
  className?: string;
  style?: React.CSSProperties;
  shape: "square" | "circle" | "triangle" | "cross" | "diamond" | "zigzag";
  color: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const shapeContent = () => {
    switch (shape) {
      case "circle":
        return (
          <div
            className={`w-full h-full ${color} border-4 border-foreground shadow-brutal-lg rounded-full transition-all duration-300 ${
              isHovered ? "scale-125 rotate-180" : ""
            }`}
          />
        );
      case "triangle":
        return (
          <div
            className={`w-0 h-0 border-l-[30px] md:border-l-[50px] border-l-transparent border-r-[30px] md:border-r-[50px] border-r-transparent border-b-[52px] md:border-b-[86px] ${color.replace(
              "bg-",
              "border-b-"
            )} transition-all duration-300 ${
              isHovered ? "scale-110 -translate-y-2" : ""
            }`}
            style={{
              filter: isHovered
                ? "drop-shadow(6px 6px 0px black)"
                : "drop-shadow(4px 4px 0px black)",
            }}
          />
        );
      case "cross":
        return (
          <div
            className={`relative w-full h-full transition-all duration-300 ${
              isHovered ? "rotate-45 scale-110" : ""
            }`}
          >
            <div
              className={`absolute top-1/2 left-0 w-full h-1/3 ${color} border-4 border-foreground -translate-y-1/2`}
            />
            <div
              className={`absolute left-1/2 top-0 w-1/3 h-full ${color} border-4 border-foreground -translate-x-1/2`}
            />
          </div>
        );
      case "diamond":
        return (
          <div
            className={`w-full h-full ${color} border-4 border-foreground shadow-brutal-lg rotate-45 transition-all duration-300 ${
              isHovered ? "scale-110 rotate-[135deg]" : ""
            }`}
          />
        );
      case "zigzag":
        return (
          <svg
            viewBox="0 0 80 40"
            className={`w-full h-full transition-all duration-300 ${
              isHovered ? "scale-110" : ""
            }`}
          >
            <path
              d="M0 20 L20 5 L40 20 L60 5 L80 20 L60 35 L40 20 L20 35 Z"
              className={`${color.replace("bg-", "fill-")} stroke-foreground`}
              strokeWidth="3"
            />
          </svg>
        );
      default:
        return (
          <div
            className={`w-full h-full ${color} border-4 border-foreground shadow-brutal-lg transition-all duration-300 ${
              isHovered ? "scale-110 rotate-12" : ""
            }`}
          />
        );
    }
  };

  return (
    <div
      className={`floating-shape absolute cursor-pointer transition-all duration-300 ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {shapeContent()}
    </div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedFirstName, setDisplayedFirstName] = useState("");
  const [displayedLastName, setDisplayedLastName] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [typingPhase, setTypingPhase] = useState<"first" | "last" | "done">(
    "first"
  );
  const [isHovering, setIsHovering] = useState(false);

  const firstName = "RUPAK";
  const lastName = "ACHARYA";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;

      const shapes = containerRef.current.querySelectorAll(".floating-shape");
      shapes.forEach((shape, index) => {
        const element = shape as HTMLElement;
        const multiplier = (index + 1) * 0.3;
        element.style.transform = `translate(${x * multiplier}px, ${
          y * multiplier
        }px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (typingPhase === "first") {
      if (displayedFirstName.length < firstName.length) {
        timeout = setTimeout(() => {
          setDisplayedFirstName(
            firstName.slice(0, displayedFirstName.length + 1)
          );
        }, 150);
      } else {
        timeout = setTimeout(() => {
          setTypingPhase("last");
        }, 300);
      }
    } else if (typingPhase === "last") {
      if (displayedLastName.length < lastName.length) {
        timeout = setTimeout(() => {
          setDisplayedLastName(lastName.slice(0, displayedLastName.length + 1));
        }, 150);
      } else {
        setTypingPhase("done");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedFirstName, displayedLastName, typingPhase]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            #FF6B6B 0%, 
            #FF6B6B 15%, 
            #4ECF74 15%, 
            #4ECF74 35%, 
            #FFE66D 35%, 
            #FFE66D 55%, 
            #95E1D3 55%, 
            #95E1D3 75%, 
            #55A0DD 75%, 
            #55A0DD 100%
          )
        `,
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 20px,
              rgba(0,0,0,0.1) 20px,
              rgba(0,0,0,0.1) 40px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              rgba(0,0,0,0.1) 20px,
              rgba(0,0,0,0.1) 40px
            )
          `,
        }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-background/30" />

      <FloatingShape
        shape="square"
        color="bg-neo-yellow"
        className="top-20 left-10 w-24 h-24 md:w-40 md:h-40 rotate-12 animate-float"
      />
      <FloatingShape
        shape="circle"
        color="bg-neo-pink"
        className="top-32 right-16 w-20 h-20 md:w-32 md:h-32 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <FloatingShape
        shape="triangle"
        color="bg-neo-blue"
        className="bottom-40 left-16 w-16 h-16 md:w-24 md:h-24 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <FloatingShape
        shape="cross"
        color="bg-neo-green"
        className="bottom-32 right-10 w-16 h-16 md:w-24 md:h-24 animate-float"
        style={{ animationDelay: "0.5s" }}
      />
      <FloatingShape
        shape="diamond"
        color="bg-neo-orange"
        className="top-1/3 left-[15%] w-12 h-12 md:w-20 md:h-20 animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <FloatingShape
        shape="zigzag"
        color="bg-neo-pink"
        className="top-1/4 right-[10%] w-20 h-10 md:w-28 md:h-14 animate-float"
        style={{ animationDelay: "2.5s" }}
      />
      <FloatingShape
        shape="circle"
        color="bg-neo-yellow"
        className="bottom-1/4 left-[8%] w-10 h-10 md:w-16 md:h-16 animate-float"
        style={{ animationDelay: "0.8s" }}
      />
      <FloatingShape
        shape="square"
        color="bg-neo-blue"
        className="top-[60%] right-[5%] w-14 h-14 md:w-20 md:h-20 -rotate-6 animate-float"
        style={{ animationDelay: "1.8s" }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl">
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-neo-yellow border-4 border-foreground translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform" />
            <div className="relative w-32 h-32 md:w-44 md:h-44 border-4 border-foreground overflow-hidden bg-neo-pink">
              <Image
                src="/assets/profile.jpg"
                alt="Rupak Acharya"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                priority
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-neo-green border-4 border-foreground rotate-12" />
          </div>
        </div>

        <div className="inline-block mb-6 px-4 py-2 bg-neo-pink border-4 border-foreground shadow-brutal text-sm md:text-base font-bold uppercase tracking-widest">
          <MapPin className="inline-block w-4 h-4 mr-2" />
          Kathmandu, Nepal
        </div>

        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6 font-mono cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span
            className={`block relative ${isHovering ? "glitch-text" : ""}`}
            data-text={displayedFirstName}
          >
            {displayedFirstName}
            {typingPhase === "first" && (
              <span
                className={`inline-block w-[3px] md:w-[5px] h-[0.8em] bg-foreground ml-1 align-middle ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
          </span>
          <span
            className={`block text-neo-yellow [-webkit-text-stroke:3px_black] md:[-webkit-text-stroke:4px_black] relative ${
              isHovering ? "glitch-text-alt" : ""
            }`}
            data-text={displayedLastName}
          >
            {displayedLastName}
            {typingPhase !== "first" && (
              <span
                className={`inline-block w-[3px] md:w-[5px] h-[0.8em] bg-neo-yellow ml-1 align-middle ${
                  showCursor ? "opacity-100" : "opacity-0"
                } ${typingPhase === "done" ? "animate-pulse" : ""}`}
                style={{ WebkitTextStroke: "0" }}
              />
            )}
          </span>
        </h1>

        <div className="inline-block bg-foreground text-background px-6 py-3 md:px-8 md:py-4 border-4 border-foreground shadow-brutal-lg mb-8 transform -rotate-2">
          <p className="text-lg md:text-2xl font-bold uppercase tracking-wide">
            Full Stack Developer
          </p>
        </div>

        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-4">
          5+ years of crafting{" "}
          <span className="bg-neo-yellow px-2 border-2 border-foreground font-bold">
            innovative web solutions
          </span>{" "}
          with React, Next.js, Node.js, and Web3 technologies.
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-2 px-6 py-3 bg-neo-yellow border-4 border-foreground shadow-brutal font-bold uppercase tracking-wide hover-brutal"
          >
            <Mail size={20} />
            Email
          </a>
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-neo-pink border-4 border-foreground shadow-brutal font-bold uppercase tracking-wide hover-brutal"
          >
            <Github size={20} />
            Github
          </a>
          <a
            href={LINKEDIN_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-neo-blue border-4 border-foreground shadow-brutal font-bold uppercase tracking-wide hover-brutal"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>

          <a
            href="/assets/Resume.pdf"
            target="_blank"
            download="Rupak_Acharya_Resume.pdf"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-neo-yellow border-4 border-foreground shadow-brutal font-bold uppercase tracking-wide hover-brutal"
          >
            <ArrowDownToLine size={20} />
            Resume
          </a>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="inline-flex flex-col items-center gap-2 animate-bounce"
        >
          <span className="text-sm font-bold uppercase tracking-wider">
            Scroll Down
          </span>
          <div className="p-2 border-4 border-foreground bg-background shadow-brutal">
            <ArrowDown size={24} />
          </div>
        </a>
      </div>
    </section>
  );
}
