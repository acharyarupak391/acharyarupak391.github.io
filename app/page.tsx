"use client";

import { useEffect, useRef } from "react";
import { Navigation } from "@/components/portfolio/navigation";
import { Hero } from "@/components/portfolio/sections/hero";
import { Overview } from "@/components/portfolio/sections/overview";
import { Experience } from "@/components/portfolio/sections/experience";
import { Stack } from "@/components/portfolio/sections/stack";
import { OpenSource } from "@/components/portfolio/sections/open-source";
import { Education } from "@/components/portfolio/sections/education";
import { Contact } from "@/components/portfolio/sections/contact";
import { Footer } from "@/components/portfolio/footer";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, ScrollTrigger } from "@/lib/portfolio/gsap-client";

export default function Home() {
  const main = useRef<HTMLElement | null>(null);
  const progressBar = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  // Page-level scroll progress bar
  useEffect(() => {
    if (reduced) return;

    // Use gsap.quickTo per performance skill — reuse a single tween
    const xTo = gsap.quickTo(progressBar.current, "scaleX", {
      duration: 0.15,
      ease: "power2.out",
    });

    let ticking = false;
    const updateProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? scrollTop / docHeight : 0;
          xTo(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    // Refresh ScrollTrigger after fonts load + small delay for layout
    const refreshId = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.clearTimeout(refreshId);
    };
  }, [reduced]);

  return (
    <>
      {/* Scroll progress bar — thin top line */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          ref={progressBar}
          className="h-full bg-accent origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <Navigation />

      <main ref={main} id="main" className="min-h-screen">
        <Hero />
        <Overview />
        <Experience />
        <Stack />
        <OpenSource />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
