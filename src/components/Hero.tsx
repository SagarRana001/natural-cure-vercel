"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Leaf } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Animation
      const tl = gsap.timeline();

      tl.from(backgroundRef.current, {
        scale: 1.05,
        opacity: 0,
        duration: 2.5,
        ease: "power2.out",
      })
      .from(
        ".hero-text-line",
        {
          y: 40,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=1.8"
      )
      .from(
        ".hero-subtitle",
        {
          y: 20,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.2"
      )
      .from(
        ".hero-button",
        {
          y: 20,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1.0"
      );

      // Scroll Parallax Animation
      gsap.to(backgroundRef.current, {
        y: "20%",
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(textRef.current, {
        y: "-30%",
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Floating leaves continuous animation
      gsap.to(".floating-leaf", {
        y: "+=30",
        rotation: "+=15",
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.6,
          from: "random",
        },
      });

    }, container);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section
      ref={container}
      id="home"
      className="relative w-full min-h-[100dvh] flex items-center justify-start overflow-hidden bg-[#1a1f1a] px-8 md:px-24 pt-20"
    >
      {/* Background Image Parallax */}
      <img
        ref={backgroundRef}
        src="/hero-banner-new.png"
        alt="Natural Cure Ayurvedic Soap"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transformOrigin: "center center" }}
      />

      {/* Elegant dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Floating Leaves */}
      <div ref={leavesRef} className="absolute inset-0 pointer-events-none mix-blend-screen">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-leaf absolute opacity-40"
            style={{
              top: `${15 + (i * 17) % 70}%`,
              left: `${30 + (i * 23) % 60}%`,
              transform: `scale(${0.5 + ((i * 13) % 10) / 10})`,
              color: "#a4c4b5",
            }}
          >
            <Leaf size={40} fill="currentColor" strokeWidth={1} />
          </div>
        ))}
      </div>

      {/* Hero Text - Asymmetric & Left Aligned */}
      <div ref={textRef} className="relative z-10 text-left max-w-4xl mt-8">
        <div className="hero-text-line inline-block px-4 py-1 border border-[#a4c4b5]/30 rounded-full mb-8 backdrop-blur-sm bg-white/5">
          <span className="text-[#a4c4b5] text-sm tracking-widest uppercase font-medium">100% Organic & Ayurvedic</span>
        </div>
        
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-[1.1]" 
          style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.02em" }}
        >
          <div className="overflow-hidden pb-2">
            <span className="block hero-text-line">Healing the body.</span>
          </div>
          <div className="overflow-hidden flex items-center gap-3 md:gap-4 mt-1 md:mt-2 pb-2">
            <span className="block hero-text-line text-white/90">Nurturing the <span className="italic text-[#a4c4b5] font-light">soul.</span></span>
          </div>
        </h1>
        
        <p className="hero-subtitle text-base md:text-xl text-white/70 font-light max-w-xl leading-relaxed mb-10">
          Artisanal Ayurvedic care crafted with purely organic ingredients. Experience holistic wellness with our toxin-free, herbal solutions.
        </p>

        <div className="hero-button flex flex-wrap gap-4">
          <button className="px-8 py-4 bg-[#a4c4b5] text-[#1a2f23] rounded-full font-medium tracking-wide hover:bg-white transition-colors duration-300">
            Explore Collection
          </button>
          <button className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-full font-medium tracking-wide hover:bg-white/10 transition-colors duration-300">
            Our Story
          </button>
        </div>
      </div>
    </section>
  );
}
