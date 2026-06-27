"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "5K+", label: "Happy Customers" },
  { value: "4", label: "Signature Products" },
  { value: "100%", label: "Natural Ingredients" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative"
      style={{ padding: "128px 160px", background: "var(--bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">[ 03 — ABOUT ]</span>
            <h2
              className="text-4xl md:text-5xl font-bold mt-4 mb-6"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--text-primary)",
              }}
            >
              Building skincare that{" "}
              <span style={{ color: "var(--accent-green-light)" }}>people love</span>
            </h2>

            <div
              className="space-y-4 mb-10"
              style={{ color: "var(--text-secondary)" }}
            >
              <p className="leading-relaxed">
                Natural Cure was born from a passion for pure, chemical-free skincare.
                Every soap we craft is made by hand in small batches using time-honored
                cold-press methods that preserve the natural goodness of each ingredient.
              </p>
              <p className="leading-relaxed">
                We source our neem from organic farms in Tamil Nadu, aloe vera from
                local growers, and the finest rice and potato starches for our signature
                De-Tan range. No parabens, no sulfates, no compromises.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div
                    className="text-3xl md:text-4xl font-bold"
                    style={{
                      fontFamily: "var(--font-playfair)",
                      color: "var(--accent-green-light)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {stat.label.toUpperCase()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div
              className="card p-12 flex flex-col items-center justify-center relative"
              style={{ width: 320, height: 320 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-7xl mb-4"
              >
                🧼
              </motion.div>

              {/* Floating herbs */}
              {["🌿", "🍃", "🌸"].map((herb, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    top: `${15 + i * 25}%`,
                    left: i % 2 === 0 ? "12%" : "80%",
                  }}
                  animate={{
                    y: [0, -8 - i * 3, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  {herb}
                </motion.span>
              ))}

              <span
                className="text-xs mt-4"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: "var(--text-muted)",
                }}
              >
                EST. 2020 • COIMBATORE
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
