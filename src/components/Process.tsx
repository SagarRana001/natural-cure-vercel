"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: "🌾",
    title: "Sourcing",
    description:
      "We handpick the finest organic ingredients from trusted farms across India",
  },
  {
    icon: "⚗️",
    title: "Cold-Press Mixing",
    description:
      "Ingredients are mixed at low temperatures to retain their natural properties",
  },
  {
    icon: "🧊",
    title: "Curing",
    description:
      "Each bar cures for 4-6 weeks, developing its creamy lather and long-lasting hardness",
  },
  {
    icon: "📦",
    title: "Eco Packaging",
    description:
      "Wrapped in biodegradable materials and shipped with care to your doorstep",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative" style={{ padding: "120px 160px" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label">[ 02 — PROCESS ]</span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-4"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--text-primary)",
            }}
          >
            How It&apos;s Made
          </h2>
          <p
            className="text-base max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            From raw ingredients to your bathroom shelf
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="card p-8 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 3 }}
                className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl"
                style={{
                  background: "rgba(74, 124, 35, 0.08)",
                  border: "1px solid rgba(74, 124, 35, 0.15)",
                }}
              >
                {step.icon}
              </motion.div>

              <div
                className="text-xs mb-3"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  color: "var(--accent-green-light)",
                }}
              >
                STEP {String(i + 1).padStart(2, "0")}
              </div>

              <h3
                className="text-lg font-bold mb-3"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "var(--text-primary)",
                }}
              >
                {step.title}
              </h3>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
