"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
};

const getSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const getServerSnapshot = () => false;

/**
 * useReducedMotion
 * Reactive hook that mirrors the user's prefers-reduced-motion setting.
 * Returns true when the user has requested reduced motion.
 * SSR-safe via useSyncExternalStore (no setState-in-effect anti-pattern).
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
