"use client";

import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Github, Linkedin, ArrowDown, ChevronDown } from "lucide-react";
import { contactLinks, sectionMeta } from "@/data/portfolio";
import { Tag } from "../tag";
import { ContactForm } from "../contact-form";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { gsap, useGSAP } from "@/lib/portfolio/gsap-client";
import { cn } from "@/lib/utils";

const iconMap = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  portfolio: ArrowDown,
  github: Github,
  linkedin: Linkedin,
} as const;

export function Contact() {
  const root = useRef<HTMLElement | null>(null);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set("[data-contact-reveal]", { opacity: 1, y: 0 });
        return;
      }

      // Headline reveal
      gsap.from("[data-contact-headline] > *", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-contact-headline]",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Desktop contact cards stagger (lg+ only)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.from("[data-contact-card]", {
          opacity: 0,
          y: 20,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-contact-grid]",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Form reveal (subtle, like contact cards)
      gsap.from("[data-contact-form-wrap] > *", {
        opacity: 0,
        y: 20,
        duration: 0.45,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-contact-form-wrap]",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      // Fine-pointer: magnetic effect on desktop cards
      mm.add("(hover: hover) and (pointer: fine) and (min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-contact-card]");
        const movers = cards.map((card) => ({
          card,
          xTo: gsap.quickTo(card, "x", { duration: 0.4, ease: "power3" }),
          yTo: gsap.quickTo(card, "y", { duration: 0.4, ease: "power3" }),
        }));

        movers.forEach(({ card, xTo, yTo }) => {
          const enter = (e: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            xTo((e.clientX - cx) * 0.15);
            yTo((e.clientY - cy) * 0.15);
          };
          const move = (e: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            xTo((e.clientX - cx) * 0.15);
            yTo((e.clientY - cy) * 0.15);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      id="contact"
      ref={root}
      aria-labelledby="contact-title"
      className="scroll-mt-[80px] surface-dark"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Custom dark header */}
        <header className="relative overflow-hidden rule-b" style={{ borderColor: "var(--rule-inverse-soft)" }}>
          <span
            aria-hidden="true"
            className="section-numeral"
            style={{ right: "1.5rem", top: "50%", transform: "translateY(-50%)" }}
          >
            {sectionMeta.contact.numeral}
          </span>
          <div className="relative z-10 py-8 md:py-12 px-5 md:px-8 grid grid-cols-12 gap-4 items-end">
            <div className="col-span-3 md:col-span-2">
              <Tag variant="accent">SEC · 06</Tag>
            </div>
            <div className="col-span-9 md:col-span-7">
              <h2 className="font-display text-[clamp(2.25rem,7vw,5rem)] uppercase leading-[0.85] tracking-tight text-ink-inverse">
                {sectionMeta.contact.title}
              </h2>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-ink-inverse-faint">
                Direct lines for collaboration, full-time roles, and contract work.
              </p>
            </div>
            <div className="hidden md:flex col-span-3 flex-col items-end gap-1">
              <Tag variant="accent">{sectionMeta.contact.file}</Tag>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-faint">
                {`${sectionMeta.contact.index} / 06`}
              </span>
            </div>
          </div>
        </header>

        {/* Headline CTA */}
        <div
          className="rule-b p-6 md:p-10 lg:p-16"
          data-contact-headline
          style={{ borderColor: "var(--rule-inverse-soft)" }}
        >
          <Tag variant="accent"> AVAILABLE FOR NEW WORK </Tag>
          <h3 className="mt-5 font-display text-[clamp(2rem,6vw,5rem)] uppercase leading-[0.9] tracking-tight text-ink-inverse">
            Let&apos;s build
            <br />
            <span className="text-accent-soft">something resilient.</span>
          </h3>
          <p className="mt-5 max-w-2xl text-base md:text-lg leading-relaxed text-ink-inverse-soft">
            Currently open to senior full-stack and Web3 engineering roles. Reach out
            via any channel below — email is the most direct route.
          </p>
        </div>

        {/* DESKTOP (lg+): Contact cards grid */}
        <div
          className="hidden lg:grid grid-cols-3 rule-b"
          data-contact-grid
          style={{ borderColor: "var(--rule-inverse-soft)" }}
        >
          {contactLinks.map((link, i) => {
            const Icon = iconMap[link.kind];
            const isEmail = link.kind === "email";
            return (
              <a
                key={link.kind}
                href={link.href}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-contact-card
                data-contact-reveal
                className={[
                  "group p-6 md:p-8 transition-colors",
                  i < contactLinks.length ? "rule-r" : "",
                ].join(" ")}
                style={{ borderColor: "var(--rule-inverse-soft)" }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <Tag>{link.label.toUpperCase()}</Tag>
                  <ArrowDown
                    size={16}
                    className="text-ink-inverse-faint group-hover:text-accent-soft group-hover:translate-y-0.5 transition-all"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className="text-ink-inverse-soft group-hover:text-accent-soft transition-colors shrink-0"
                  />
                  <span
                    className={[
                      "text-sm md:text-base break-all leading-snug text-ink-inverse",
                      isEmail ? "font-mono" : "font-display uppercase tracking-tight",
                    ].join(" ")}
                  >
                    {link.value}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        {/* MOBILE + TABLET (below lg): Accordion for contact links */}
        <div
          className="lg:hidden rule-b"
          style={{ borderColor: "var(--rule-inverse-soft)" }}
        >
          <button
            type="button"
            onClick={() => setAccordionOpen((v) => !v)}
            aria-expanded={accordionOpen}
            aria-controls="contact-accordion"
            className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left transition-colors hover:bg-surface-deep"
          >
            <div className="flex flex-col gap-1">
              <Tag variant="accent">CONTACT CHANNELS</Tag>
              <span className="font-display text-lg md:text-xl uppercase tracking-tight text-ink-inverse mt-1">
                {accordionOpen ? "Hide direct lines" : "Show direct lines"}
              </span>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-inverse-faint">
                {`${contactLinks.length} channels available`}
              </span>
            </div>
            <ChevronDown
              size={24}
              className={cn(
                "text-accent-soft transition-transform duration-300 shrink-0",
                accordionOpen && "rotate-180",
              )}
            />
          </button>
          <div
            id="contact-accordion"
            className={cn(
              "grid transition-[grid-template-rows] duration-300 ease-out",
              accordionOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                {contactLinks.map((link, i) => {
                  const Icon = iconMap[link.kind];
                  const isEmail = link.kind === "email";
                  return (
                    <a
                      key={link.kind}
                      href={link.href}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={[
                        "group p-5 md:p-6 transition-colors hover:bg-surface-deep",
                        i % 2 === 0 ? "sm:rule-r" : "",
                        i < contactLinks.length - 2 ? "rule-b" : "",
                      ].join(" ")}
                      style={{ borderColor: "var(--rule-inverse-soft)" }}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <Tag>{link.label.toUpperCase()}</Tag>
                        <ArrowDown
                          size={14}
                          className="text-ink-inverse-faint group-hover:text-accent-soft group-hover:translate-y-0.5 transition-all"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <Icon
                          size={16}
                          className="text-ink-inverse-soft group-hover:text-accent-soft transition-colors shrink-0"
                        />
                        <span
                          className={[
                            "text-sm break-all leading-snug text-ink-inverse",
                            isEmail ? "font-mono" : "font-display uppercase tracking-tight",
                          ].join(" ")}
                        >
                          {link.value}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Contact form — full width below the cards */}
        <div className="rule-b" data-contact-form-wrap>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
