"use client";

import { motion } from "framer-motion";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer
      className="py-8 px-6"
      style={{ borderTop: "1px solid rgba(74, 124, 35, 0.1)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.a
          href="#home"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2"
        >
          <span className="text-lg">🌿</span>
          <span
            className="font-bold"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--text-primary)",
            }}
          >
            Natural<span style={{ color: "var(--accent-green-light)" }}>Cure</span>
          </span>
        </motion.a>

        <nav className="flex items-center gap-1">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 text-xs rounded-full transition-colors"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "var(--text-muted)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div
          className="text-xs"
          style={{
            fontFamily: "var(--font-jetbrains)",
            color: "var(--text-muted)",
          }}
        >
          © 2026 — naturalcure.in
        </div>
      </div>
    </footer>
  );
}
