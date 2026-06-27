"use client";

import { motion } from "framer-motion";

const products = [
  {
    id: "neem",
    icon: "🌿",
    image: "/images/products/neem-soap.png",
    name: "Neem Soap",
    price: "$8.99",
    description:
      "Antibacterial & antifungal properties that deeply cleanse pores and soothe irritated skin",
    benefits: ["Antibacterial", "Deep Cleansing", "Acne Control", "Soothes Skin"],
    color: "#476b42",
  },
  {
    id: "aloe",
    icon: "🌱",
    image: "/images/products/aloe-vera-soap.png",
    name: "Aloe Vera Soap",
    price: "$9.49",
    description:
      "Deeply moisturizes and hydrates while promoting skin healing with anti-aging antioxidants",
    benefits: ["Moisturizing", "Skin Healing", "Anti-Aging", "Soothing"],
    color: "#6eb99a",
  },
  {
    id: "detan",
    icon: "✨",
    image: "/images/products/detan-soap.png",
    name: "De-Tan Soap",
    price: "$10.99",
    description:
      "Removes tan and brightens skin with gentle exfoliation from rice and potato starches",
    benefits: ["Tan Removal", "Brightening", "Exfoliation", "Even Tone"],
    color: "#c4923e",
  },
  {
    id: "rice",
    icon: "🌾",
    image: "/images/products/rice-potato-soap.jpg",
    name: "Rice-Potato Soap",
    price: "$9.99",
    description:
      "Gentle brightening effect with natural exfoliation and nourishing potato starch",
    benefits: ["Brightening", "Exfoliation", "Nourishing", "Texture"],
    color: "#c28e46",
  },
];

interface ProductsProps {
  onSelectProduct: (product: (typeof products)[0]) => void;
}

export default function Products({ onSelectProduct }: ProductsProps) {
  return (
    <section id="products" className="relative py-16 px-6 md:py-[120px] md:px-[160px]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label">[ 01 — PRODUCTS ]</span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-4 mb-4"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--text-primary)",
            }}
          >
            Our Product Range
          </h2>
          <p
            className="text-base max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Select any product to customize your own blend with premium natural
            ingredients and watch the magic happen
          </p>
        </motion.div>

        {/* Product grid - Asymmetric Staggered Layout */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {products.map((product, i) => (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Spring-like ease
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4, ease: "easeOut" } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectProduct(product)}
              className={`text-left transition-all duration-500 cursor-pointer rounded-[32px] p-8 md:p-10 ${i % 2 !== 0 ? 'md:mt-24' : ''}`}
              style={{ 
                position: "relative", 
                overflow: "hidden",
                background: "var(--bg-primary)",
                boxShadow: `0 20px 40px -15px ${product.color}25, 0 0 0 1px ${product.color}10 inset`
              }}
            >
              {/* Subtle gradient wash instead of flat hover glow */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${product.color}08 100%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  {product.image ? (
                    <motion.div
                      className="w-24 h-24 rounded-2xl overflow-hidden"
                      style={{ boxShadow: `0 10px 30px -10px ${product.color}40` }}
                    >
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl"
                      style={{ background: `${product.color}15`, boxShadow: `0 10px 30px -10px ${product.color}40` }}
                      whileHover={{ scale: 1.05, rotate: -5 }}
                      transition={{ duration: 0.4, type: "spring" }}
                    >
                      {product.icon}
                    </motion.div>
                  )}
                  <span
                    className="text-sm font-medium px-4 py-1.5 rounded-full tracking-wide"
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      color: product.color,
                      background: `${product.color}15`,
                      border: `1px solid ${product.color}30`
                    }}
                  >
                    {product.price}
                  </span>
                </div>

                <h3
                  className="text-2xl font-bold mb-4"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em"
                  }}
                >
                  {product.name}
                </h3>

                <p
                  className="text-base mb-8 leading-relaxed font-light"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {product.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className="px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide uppercase"
                      style={{
                        background: "transparent",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {benefit}
                    </span>
                  ))}
                </div>

                <div
                  className="flex items-center gap-3 text-sm font-semibold mt-4 transition-colors group"
                  style={{ color: product.color }}
                >
                  <span className="uppercase tracking-widest text-xs">Craft Your Blend</span>
                  <motion.span
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: `${product.color}15` }}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
