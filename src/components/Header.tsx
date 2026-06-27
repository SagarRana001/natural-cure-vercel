"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10, 15, 8, 0.85)" : "rgba(10, 15, 8, 0.3)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        padding: scrolled ? "8px 12px" : "12px 12px",
        borderBottom: scrolled ? "1px solid rgba(74, 124, 35, 0.1)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <span
            className="font-bold text-lg"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
          >
            Natural<span style={{ color: "var(--accent-green-light)" }}>Cure</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-4 py-2 text-sm rounded-full transition-all duration-300"
              style={{
                color:
                  activeSection === link.href.slice(1)
                    ? "var(--text-primary)"
                    : "var(--text-muted)",
                background:
                  activeSection === link.href.slice(1)
                    ? "rgba(74, 124, 35, 0.12)"
                    : "transparent",
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className="w-5 h-0.5 transition-all duration-300"
            style={{
              background: "var(--text-primary)",
              transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <span
            className="w-5 h-0.5 transition-all duration-300"
            style={{
              background: "var(--text-primary)",
              opacity: mobileOpen ? 0 : 1,
            }}
          />
          <span
            className="w-5 h-0.5 transition-all duration-300"
            style={{
              background: "var(--text-primary)",
              transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }}
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2 mx-4 rounded-2xl overflow-hidden"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm transition-colors"
                  style={{
                    color:
                      activeSection === link.href.slice(1)
                        ? "var(--text-primary)"
                        : "var(--text-muted)",
                    background:
                      activeSection === link.href.slice(1)
                        ? "rgba(74, 124, 35, 0.12)"
                        : "transparent",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
