"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Centralised GSAP registration.
 * Importing this module ensures plugins are registered exactly once
 * on the client. Safe to import from any client component.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Project-wide tween defaults — applied once on the client.
if (typeof window !== "undefined") {
  gsap.defaults({
    duration: 0.6,
    ease: "power3.out",
  });
}

export { gsap, ScrollTrigger, useGSAP };
