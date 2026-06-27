"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  icon: string;
  image?: string;
  name: string;
  price: string;
  description: string;
  benefits: string[];
  color: string;
}

const productIngredients: Record<
  string,
  { id: string; name: string; icon: string; benefit: string }[]
> = {
  neem: [
    { id: "coconut-oil", name: "Coconut Oil", icon: "🥥", benefit: "Deep moisturizing" },
    { id: "neem-oil", name: "Neem Oil", icon: "🌿", benefit: "Antibacterial power" },
    { id: "tea-tree", name: "Tea Tree", icon: "🌲", benefit: "Antiseptic properties" },
    { id: "turmeric", name: "Turmeric", icon: "🟡", benefit: "Natural brightening" },
    { id: "honey", name: "Raw Honey", icon: "🍯", benefit: "Hydrating & healing" },
    { id: "glycerin", name: "Glycerin", icon: "💧", benefit: "Moisture lock" },
  ],
  aloe: [
    { id: "aloe-gel", name: "Fresh Aloe Gel", icon: "🌱", benefit: "Soothing & cooling" },
    { id: "vitamin-e", name: "Vitamin E", icon: "✨", benefit: "Anti-aging protection" },
    { id: "coconut-oil", name: "Coconut Oil", icon: "🥥", benefit: "Deep moisturizing" },
    { id: "shea-butter", name: "Shea Butter", icon: "🧈", benefit: "Rich nourishment" },
    { id: "lavender", name: "Lavender Oil", icon: "💜", benefit: "Calming fragrance" },
    { id: "glycerin", name: "Glycerin", icon: "💧", benefit: "Moisture lock" },
  ],
  detan: [
    { id: "rice-powder", name: "Rice Powder", icon: "🌾", benefit: "Gentle exfoliation" },
    { id: "potato-starch", name: "Potato Starch", icon: "🥔", benefit: "Skin softening" },
    { id: "sandalwood", name: "Sandalwood", icon: "🪵", benefit: "Cooling sensation" },
    { id: "milk-cream", name: "Milk Cream", icon: "🥛", benefit: "Nourishing proteins" },
    { id: "licorice", name: "Licorice Extract", icon: "🌿", benefit: "Natural brightening" },
    { id: "vitamin-c", name: "Vitamin C", icon: "🍊", benefit: "Antioxidant boost" },
  ],
  rice: [
    { id: "rice-powder", name: "Rice Powder", icon: "🌾", benefit: "Natural exfoliation" },
    { id: "potato-starch", name: "Potato Starch", icon: "🥔", benefit: "Skin nourishing" },
    { id: "oat-meal", name: "Oatmeal", icon: "🥣", benefit: "Gentle cleansing" },
    { id: "coconut-milk", name: "Coconut Milk", icon: "🥥", benefit: "Rich hydration" },
    { id: "honey", name: "Raw Honey", icon: "🍯", benefit: "Healing & glowing" },
    { id: "aloe-gel", name: "Fresh Aloe Gel", icon: "🌱", benefit: "Soothing freshness" },
  ],
};

interface ProductBuilderProps {
  product: Product;
  onClose: () => void;
}

export default function ProductBuilder({ product, onClose }: ProductBuilderProps) {
  const [step, setStep] = useState<"ingredients" | "complete" | "order">("ingredients");
  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
  const [flyingIngredient, setFlyingIngredient] = useState<string | null>(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(product.id);

  const baseRef = useRef<HTMLDivElement>(null);
  const ingredientRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [flyingFrom, setFlyingFrom] = useState<{ x: number; y: number } | null>(null);
  const [flyingTo, setFlyingTo] = useState<{ x: number; y: number } | null>(null);

  const ingredients = productIngredients[product.id] || [];
  const selectedList = ingredients.filter((ing) => addedIngredients.includes(ing.id));
  const availableIngredients = ingredients.filter((ing) => !addedIngredients.includes(ing.id));

  // Reset when product changes
  if (product.id !== currentProductId) {
    setCurrentProductId(product.id);
    setStep("ingredients");
    setAddedIngredients([]);
    setOrderSubmitted(false);
  }

  // Animate ingredient flying to base
  const addIngredient = useCallback(
    (id: string) => {
      if (addedIngredients.includes(id) || flyingIngredient) return;

      const sourceEl = ingredientRefs.current[id];
      if (!sourceEl) return;

      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = baseRef.current?.getBoundingClientRect();
      setFlyingFrom({
        x: sourceRect.left + sourceRect.width / 2 - 32,
        y: sourceRect.top + sourceRect.height / 2 - 32,
      });
      setFlyingTo(
        targetRect
          ? {
              x: targetRect.left + targetRect.width / 2 - 32,
              y: targetRect.top + targetRect.height / 2 - 32,
            }
          : { x: 0, y: 0 }
      );
      setFlyingIngredient(id);

      // After animation completes, add to list
      setTimeout(() => {
        setAddedIngredients((prev) => [...prev, id]);
        setFlyingIngredient(null);
        setFlyingFrom(null);
        setFlyingTo(null);
      }, 550);
    },
    [addedIngredients, flyingIngredient]
  );

  const removeIngredient = (id: string) => {
    setAddedIngredients((prev) => prev.filter((ingId) => ingId !== id));
  };

  const completeCustomization = () => {
    if (addedIngredients.length === 0) return;
    setStep("complete");
  };

  const goToOrder = () => {
    setStep("order");
    setOrderSubmitted(false);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSubmitted(true);
  };

  const progressRatio =
    ingredients.length > 0 ? addedIngredients.length / ingredients.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
        className="w-full max-w-5xl h-[95vh] md:h-[90vh] flex flex-col rounded-[32px] overflow-hidden"
        style={{
          background: "var(--bg-primary)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="shrink-0 flex items-center justify-between p-6 pb-4"
          style={{
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div className="flex items-center gap-3">
            {product.image ? (
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 object-cover rounded-lg shadow-sm"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            ) : (
              <motion.span
                className="text-3xl"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {product.icon}
              </motion.span>
            )}
            <div>
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
              >
                {product.name}
              </h2>
              <span
                className="text-sm"
                style={{ fontFamily: "var(--font-jetbrains)", color: product.color }}
              >
                {product.price}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-black/5"
            style={{
              background: "rgba(0, 0, 0, 0.05)",
              color: "var(--text-muted)",
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto relative flex flex-col">
          <AnimatePresence mode="wait">
            {/* Step 1: Interactive Customization */}
            {step === "ingredients" && (
              <motion.div
                key="ingredients"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col p-6"
              >
                {/* Title */}
                <div className="text-center mb-8">
                  <span className="section-label">Step 1 of 3</span>
                  <h3
                    className="text-2xl md:text-3xl font-bold mt-3 mb-2"
                    style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
                  >
                    Craft Your Blend
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Click or drag ingredients to infuse them into the base
                  </p>
                </div>

                {/* Interactive Area */}
                <div className="flex-1 relative flex items-center justify-center min-h-[300px] md:min-h-[360px] mb-6">
                  {/* Flying ingredient animation */}
                  <AnimatePresence>
                    {flyingIngredient && flyingFrom && flyingTo && (
                      <motion.div
                        key={flyingIngredient}
                        className="fixed z-[200] pointer-events-none"
                        initial={{
                          x: flyingFrom.x,
                          y: flyingFrom.y,
                          opacity: 1,
                          scale: 1,
                        }}
                        animate={{
                          x: flyingTo.x,
                          y: flyingTo.y,
                          opacity: 0,
                          scale: 0.2,
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        style={{
                          width: typeof window !== 'undefined' && window.innerWidth < 768 ? 48 : 64,
                          height: typeof window !== 'undefined' && window.innerWidth < 768 ? 48 : 64,
                          borderRadius: typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 20,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: typeof window !== 'undefined' && window.innerWidth < 768 ? 24 : 32,
                          background: `${product.color}30`,
                          border: `2px solid ${product.color}`,
                          boxShadow: `0 20px 40px ${product.color}40`,
                        }}
                      >
                        {ingredients.find((i) => i.id === flyingIngredient)?.icon}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Central Base/Drop Zone */}
                  <div className="relative z-10 w-36 h-36 md:w-52 md:h-52">
                    {/* Main base container */}
                    <motion.div
                      ref={baseRef}
                      className="w-full h-full rounded-[40px] relative overflow-hidden shadow-xl flex items-center justify-center"
                      style={{
                        background: "var(--bg-card)",
                        border: "2px dashed var(--border-subtle)",
                        backdropFilter: "blur(8px)",
                      }}
                      animate={{
                        borderColor: addedIngredients.length > 0 ? product.color : "var(--border-subtle)",
                        boxShadow: `0 20px 50px ${product.color}${Math.floor(progressRatio * 40).toString(16).padStart(2, '0')}`,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Base Glycerine Visual */}
                      <div className="absolute inset-2 rounded-[32px] overflow-hidden bg-black/5" style={{ backdropFilter: "blur(4px)" }}>
                         {/* Infused Color Overlay */}
                         <motion.div
                            className="absolute inset-0"
                            style={{ background: product.color }}
                            animate={{ opacity: progressRatio * 0.75 }}
                            transition={{ duration: 0.5 }}
                         />
                         
                         {/* Inner Glow */}
                         <motion.div
                            className="absolute inset-0"
                            style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.05)" }}
                         />
                      </div>
                      
                      <div className="relative z-20 text-center pointer-events-none">
                         <span className="text-4xl block mb-2 opacity-80">💧</span>
                         <span className="text-xs font-bold tracking-widest uppercase opacity-80" style={{ color: "var(--text-primary)" }}>Glycerine Base</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Ingredient Items positioned around the base */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px]">
                      {ingredients.map((ing, i) => {
                        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                        const angle = (i / ingredients.length) * Math.PI * 2 - Math.PI / 2;
                        const radius = isMobile ? 120 : 160;
                        const itemSize = isMobile ? 56 : 72;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        const isAdded = addedIngredients.includes(ing.id);
                        const isFlying = flyingIngredient === ing.id;

                        return (
                          <motion.div
                            key={ing.id}
                            ref={(el) => {
                              ingredientRefs.current[ing.id] = el;
                            }}
                            className="absolute pointer-events-auto"
                            style={{
                              left: `calc(50% + ${x}px - ${itemSize / 2}px)`,
                              top: `calc(50% + ${y}px - ${itemSize / 2}px)`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: isAdded ? 0.3 : 1,
                              scale: isFlying ? 0.5 : isAdded ? 0.8 : 1,
                            }}
                            transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
                          >
                            <motion.button
                              onClick={() => addIngredient(ing.id)}
                              whileHover={{ scale: 1.1, y: -4, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                              whileTap={{ scale: 0.95 }}
                              disabled={isAdded || !!flyingIngredient}
                              className={`rounded-[20px] md:rounded-[24px] flex flex-col items-center justify-center gap-1 transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed relative overflow-hidden`}
                              style={{
                                width: itemSize,
                                height: itemSize,
                                background: isAdded
                                  ? `${product.color}15`
                                  : "var(--bg-card)",
                                border: `1px solid ${isAdded ? product.color + "30" : "rgba(255, 255, 255, 0.4)"}`,
                                boxShadow: isAdded ? "none" : "0 8px 16px -4px rgba(0,0,0,0.05)",
                                backdropFilter: "blur(8px)",
                              }}
                            >
                              <span className="text-xl md:text-2xl">{ing.icon}</span>
                              <span
                                className="text-[8px] md:text-[9px] font-medium leading-tight text-center px-1"
                                style={{
                                  color: isAdded ? product.color : "var(--text-secondary)",
                                }}
                              >
                                {ing.name}
                              </span>
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Added Ingredients List */}
                <div className="shrink-0 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Infused Ingredients ({addedIngredients.length}/{ingredients.length})
                    </span>
                  </div>

                  <div
                    className="min-h-[60px] p-3 rounded-xl flex flex-wrap gap-2 items-center"
                    style={{
                      background: "rgba(0,0,0,0.03)",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    <AnimatePresence mode="popLayout">
                      {selectedList.length === 0 ? (
                        <motion.span
                          key="empty"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-sm italic"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Click an ingredient to add it to your blend...
                        </motion.span>
                      ) : (
                        selectedList.map((ing, i) => (
                          <motion.div
                            key={ing.id}
                            layout
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                            style={{
                              background: `${product.color}15`,
                              border: `1px solid ${product.color}30`,
                            }}
                          >
                            <motion.span
                              initial={{ rotate: -180 }}
                              animate={{ rotate: 0 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            >
                              {ing.icon}
                            </motion.span>
                            <span
                              className="text-xs font-medium"
                              style={{ color: "var(--text-primary)" }}
                            >
                              {ing.name}
                            </span>
                            <motion.button
                              onClick={() => removeIngredient(ing.id)}
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              className="w-5 h-5 flex items-center justify-center rounded-full transition-colors"
                              style={{
                                background: "rgba(0,0,0,0.2)",
                                fontSize: 10,
                                color: "var(--text-muted)",
                              }}
                              aria-label={`Remove ${ing.name}`}
                            >
                              ✕
                            </motion.button>
                          </motion.div>
                        ))
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Complete button */}
                <div className="flex justify-center shrink-0">
                  <motion.button
                    onClick={completeCustomization}
                    whileHover={{ scale: addedIngredients.length > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: addedIngredients.length > 0 ? 0.98 : 1 }}
                    disabled={addedIngredients.length === 0}
                    className="w-full md:w-auto md:px-16 py-4 rounded-2xl font-bold transition-all duration-300"
                    style={{
                      background:
                        addedIngredients.length > 0
                          ? product.color
                          : "rgba(0, 0, 0, 0.05)",
                      color:
                        addedIngredients.length > 0
                          ? "white"
                          : "var(--text-muted)",
                      cursor: addedIngredients.length > 0 ? "pointer" : "not-allowed",
                      boxShadow:
                        addedIngredients.length > 0
                          ? `0 10px 30px -5px ${product.color}60`
                          : "none",
                    }}
                  >
                    {addedIngredients.length === 0
                      ? "Add ingredients to continue"
                      : `Complete Customization →`}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Final Reveal */}
            {step === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="flex-1 flex flex-col items-center justify-center p-6 text-center"
              >
                <span className="section-label">Step 2 of 3</span>
                <h3
                  className="text-3xl font-bold mt-3 mb-2"
                  style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
                >
                  Your Custom {product.name}
                </h3>
                <p className="text-sm mb-10" style={{ color: "var(--text-secondary)" }}>
                  Perfectly blended and ready for you
                </p>

                {/* Final product reveal */}
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                  className="w-48 h-48 md:w-64 md:h-64 rounded-[40px] mb-8 relative flex items-center justify-center overflow-hidden"
                  style={{
                    background: product.image ? "transparent" : product.color,
                    boxShadow: product.image ? "none" : `0 30px 80px ${product.color}50`,
                  }}
                >
                   {/* Shine effect */}
                   {!product.image && <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent opacity-50" />}
                   
                   {product.image ? (
                     <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-[40px]" style={{ boxShadow: `0 30px 80px ${product.color}50` }} />
                   ) : (
                     <span className="text-6xl relative z-10 text-white">{product.icon}</span>
                   )}
                </motion.div>

                {/* Ingredients summary */}
                <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-lg">
                  {selectedList.map((ing, i) => (
                    <motion.span
                      key={ing.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{
                        background: `${product.color}15`,
                        color: product.color,
                        border: `1px solid ${product.color}30`,
                      }}
                    >
                      {ing.icon} {ing.name}
                    </motion.span>
                  ))}
                </div>

                <motion.button
                  onClick={goToOrder}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                  style={{
                    background: product.color,
                    color: "white",
                    boxShadow: `0 8px 30px ${product.color}50`,
                  }}
                >
                  Place Order — {product.price}
                </motion.button>
              </motion.div>
            )}

            {/* Step 3: Order Form */}
            {step === "order" && (
              <motion.div
                key="order"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="p-6 flex-1 overflow-y-auto"
              >
                {!orderSubmitted ? (
                  <div className="max-w-xl mx-auto">
                    <div className="mb-6 text-center md:text-left">
                      <span className="section-label">Step 3 of 3</span>
                      <h3
                        className="text-2xl font-bold mt-3 mb-2"
                        style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
                      >
                        Place Your Order
                      </h3>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        Your custom {product.name.toLowerCase()} blend will be crafted and shipped within 3-5 days
                      </p>
                    </div>

                    {/* Order summary */}
                    <div
                      className="p-4 rounded-xl mb-6"
                      style={{
                        background: `${product.color}08`,
                        border: `1px solid ${product.color}20`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          Custom {product.name}
                        </span>
                        <span
                          className="text-lg font-bold"
                          style={{ fontFamily: "var(--font-jetbrains)", color: product.color }}
                        >
                          {product.price}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {addedIngredients.map((id) => {
                          const ing = ingredients.find((x) => x.id === id);
                          return (
                            <span key={id} className="text-xs" style={{ color: "var(--text-muted)" }}>
                              +{ing?.icon}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <form onSubmit={handleOrderSubmit} className="space-y-4">
                      <div>
                        <label
                          className="block text-xs mb-2 font-bold"
                          style={{ fontFamily: "var(--font-jetbrains)", color: "var(--text-muted)" }}
                        >
                          YOUR NAME
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                          style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-primary)",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs mb-2 font-bold"
                          style={{ fontFamily: "var(--font-jetbrains)", color: "var(--text-muted)" }}
                        >
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                          style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-primary)",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs mb-2 font-bold"
                          style={{ fontFamily: "var(--font-jetbrains)", color: "var(--text-muted)" }}
                        >
                          SHIPPING ADDRESS
                        </label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Enter your full shipping address..."
                          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all resize-none"
                          style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-primary)",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs mb-2 font-bold"
                          style={{ fontFamily: "var(--font-jetbrains)", color: "var(--text-muted)" }}
                        >
                          QUANTITY
                        </label>
                        <select
                          className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                          style={{
                            background: "var(--bg-card)",
                            border: "1px solid var(--border-subtle)",
                            color: "var(--text-primary)",
                          }}
                        >
                          <option value="1">1 Bar — {product.price}</option>
                          <option value="3">3 Bars — Save 10%</option>
                          <option value="5">5 Bars — Save 15%</option>
                          <option value="10">10 Bars — Save 20%</option>
                        </select>
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-xl font-bold transition-all duration-300 mt-4"
                        style={{
                          background: product.color,
                          color: "white",
                          boxShadow: `0 8px 30px ${product.color}30`,
                        }}
                      >
                        Confirm Order →
                      </motion.button>
                    </form>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl"
                      style={{
                        background: product.color,
                        boxShadow: `0 8px 40px ${product.color}40`,
                      }}
                    >
                      🎉
                    </motion.div>
                    <h3
                      className="text-2xl font-bold mb-3"
                      style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}
                    >
                      Order Confirmed!
                    </h3>
                    <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                      Thank you! We&apos;ll craft your custom {product.name.toLowerCase()} and ship it within 3-5 business days.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-6 py-3 rounded-full font-medium text-sm transition-all"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-primary)",
                      }}
                    >
                      Continue Shopping
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
