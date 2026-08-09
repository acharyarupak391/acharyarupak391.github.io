"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, profile } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap } from "@/lib/portfolio/gsap-client";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  // Detect scroll position — toggle compact mode
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver — only update on change
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    if (sections.length === 0) return;

    let currentActive = "";
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const next = visible[0] ? `#${visible[0].target.id}` : currentActive;
        if (next !== currentActive) {
          currentActive = next;
          setActiveSection(next);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Animate nav in on mount
  useEffect(() => {
    if (reduced || !navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power3.out",
      });
    }, navRef);
    return () => ctx.revert();
  }, [reduced]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
        setMobileOpen(false);
      }
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-header",
          "rule-b surface-deep",
          "transition-[background-color] duration-200",
        )}
      >
        <div className="mx-auto h-full max-w-[1400px] px-4 md:px-8">
          <div className="flex h-full items-center justify-between gap-4 md:gap-8">
            {/* Brand — uses logo SVG */}
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, "#top")}
              className="flex items-center gap-3 group shrink-0"
              aria-label={`${profile.name} — home`}
            >
              <Image
                src="/logo.svg"
                alt={`${profile.name} logo`}
                width={scrolled ? 32 : 40}
                height={scrolled ? 32 : 40}
                className="transition-all duration-200"
                priority
              />
            </a>

            {/* Desktop nav links — flex with nowrap, never squish */}
            <ul className="hidden lg:flex items-center justify-center gap-1 flex-1 min-w-0">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <li key={link.href} className="shrink-0">
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={cn(
                        "group relative flex items-center gap-2 px-3 py-2 whitespace-nowrap",
                        "font-mono text-[0.6875rem] uppercase tracking-[0.12em]",
                        "transition-colors duration-150",
                        isActive
                          ? "text-ink-inverse"
                          : "text-ink-inverse-soft hover:text-ink-inverse",
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "tabular-nums",
                          isActive ? "text-accent-soft" : "text-ink-inverse-faint",
                        )}
                      >
                        {link.index}
                      </span>
                      <span>{link.label}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute left-3 right-3 -bottom-px h-[2px] bg-accent-soft",
                          "origin-left transition-transform duration-200",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* CTA / status — desktop */}
            <div className="hidden lg:flex items-center justify-end gap-3 shrink-0">
              <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-soft whitespace-nowrap">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 bg-signal pulse-dot"
                />
                Available
              </span>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="bg-ink-inverse text-surface-deep px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] hover:bg-accent hover:text-ink-inverse transition-colors magnetic whitespace-nowrap"
              >
                Contact →
              </a>
            </div>

            {/* Mobile menu trigger — shows on md and below (lg+ shows full nav) */}
            <div className="lg:hidden flex items-center gap-3 shrink-0">
              <span className="hidden md:flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-soft whitespace-nowrap">
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 bg-signal pulse-dot"
                />
                Available
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="grid h-10 w-10 place-items-center bg-ink-inverse text-surface-deep"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 surface-deep lg:hidden",
          "transition-[opacity,visibility] duration-200",
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-full flex-col pt-24 pb-8 px-6">
          <span className="tag-label text-ink-inverse-faint mb-4">[ NAVIGATION ]</span>
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href} className="border-b border-rule-inverse-soft">
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-baseline gap-4 py-5 group"
                  >
                    <span
                      className={cn(
                        "font-mono text-xs tabular-nums",
                        isActive ? "text-accent-soft" : "text-ink-inverse-faint",
                      )}
                    >
                      {link.index}
                    </span>
                    <span
                      className={cn(
                        "font-display text-3xl uppercase tracking-tight leading-none",
                        isActive ? "text-ink-inverse" : "text-ink-inverse-soft",
                      )}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="mt-auto grid gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="bg-ink-inverse text-surface-deep py-4 text-center font-mono text-xs uppercase tracking-[0.14em] break-all"
            >
              {profile.email}
            </a>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-faint text-center">
              {profile.location} · {profile.timezone}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
