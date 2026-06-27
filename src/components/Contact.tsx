"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section
      id="contact"
      className="relative"
      style={{ padding: "100px 100px", background: "var(--bg-secondary)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">[ 04 — CONTACT ]</span>
            <h2
              className="text-4xl md:text-5xl font-bold mt-4 mb-6"
              style={{
                fontFamily: "var(--font-playfair)",
                color: "var(--text-primary)",
              }}
            >
              Ready to <span style={{ color: "var(--accent-green-light)" }}>Collaborate?</span>
            </h2>

            <p
              className="mb-10 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Have questions about our products or want to place a bulk order? We&apos;d
              love to hear from you!
            </p>

            <div className="space-y-6">
              {[
                {
                  label: "EMAIL",
                  value: "hello@naturalcure.in",
                  icon: "✉️",
                },
                {
                  label: "PHONE",
                  value: "+91 98765 43210",
                  icon: "📞",
                },
                {
                  label: "LOCATION",
                  value: "Coimbatore, Tamil Nadu, India",
                  icon: "📍",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div
                      className="text-xs mb-1"
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ color: "var(--text-secondary)" }}>
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div
              className="mt-8 text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Available for worldwide shipping
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="card p-8">
              <div className="space-y-5">
                <div>
                  <label
                    className="block text-xs mb-2"
                    style={{ fontFamily: "var(--font-jetbrains)", color: "var(--text-muted)" }}
                  >
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs mb-2"
                    style={{ fontFamily: "var(--font-jetbrains)", color: "var(--text-muted)" }}
                  >
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs mb-2"
                    style={{ fontFamily: "var(--font-jetbrains)", color: "var(--text-muted)" }}
                  >
                    TELL US ABOUT YOUR INQUIRY
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="I'm interested in..."
                    className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors resize-none"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitted}
                  className="w-full py-4 rounded-xl font-semibold transition-all duration-300"
                  style={{
                    background: submitted
                      ? "rgba(74, 124, 35, 0.2)"
                      : "var(--accent-green)",
                    color: submitted ? "var(--accent-green-light)" : "var(--bg-primary)",
                    boxShadow: submitted ? "none" : "0 8px 30px rgba(74, 124, 35, 0.3)",
                  }}
                >
                  {submitted ? "✓ Sent Successfully!" : "Send Inquiry →"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
