"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Open Source", href: "#opensource" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = `#${entry.target.id}`;
          if (navItems.some((item) => item.href === sectionId)) {
            setActiveSection(sectionId);
          } else {
            setActiveSection("");
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const heroSection = document.querySelector("section:first-of-type");
    if (heroSection) {
      observer.observe(heroSection);
    }

    navItems.forEach((item) => {
      const sectionId = item.href.replace("#", "");
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleLogoClick = () => {
    setActiveSection("");
    setIsOpen(false);
  };

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background border-b-4 border-foreground shadow-brutal"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <a
            href="#"
            className="hover:opacity-80 transition-opacity"
            onClick={handleLogoClick}
          >
            <Image
              src="/logo.svg"
              alt="Rupak Acharya Logo"
              width={120}
              height={52}
              className="h-8 md:h-13 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-3 transition-all duration-150 ${
                  activeSection === item.href
                    ? "border-foreground bg-neo-yellow shadow-brutal -translate-x-0.5 -translate-y-0.5"
                    : "border-transparent hover:border-foreground hover:bg-neo-yellow hover:shadow-brutal"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 border-3 border-foreground bg-neo-yellow shadow-brutal hover-brutal"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b-4 border-foreground">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`px-4 py-3 text-lg font-bold uppercase tracking-wider border-3 border-foreground shadow-brutal transition-all duration-150 ${
                  activeSection === item.href
                    ? "bg-neo-green -translate-x-1 -translate-y-1 shadow-brutal-lg"
                    : index % 2 === 0
                    ? "bg-neo-yellow"
                    : "bg-neo-pink"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
