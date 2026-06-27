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
      className="relative w-full min-h-[100dvh] flex items-center justify-start overflow-hidden bg-[var(--bg-primary)] px-8 md:px-24"
    >
      {/* Background Image Parallax */}
      <picture>
        <source media="(max-width: 768px)" srcSet="/mobile-banner.png" />
        <img
          ref={backgroundRef}
          src="/hero-banner.png"
          alt="Natural Cure Ayurvedic Soap"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transformOrigin: "center top" }}
        />
      </picture>

      {/* Elegant dark gradient overlay instead of flat opacity */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* Floating Leaves */}
      <div ref={leavesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-leaf absolute opacity-60"
            style={{
              top: `${15 + (i * 17) % 70}%`,
              left: `${40 + (i * 23) % 50}%`,
              transform: `scale(${0.5 + ((i * 13) % 10) / 10})`,
              color: "var(--accent-green-light)",
            }}
          >
            <Leaf size={40} fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Hero Text - Asymmetric & Left Aligned */}
      <div ref={textRef} className="relative z-10 text-left max-w-4xl mt-16 md:mt-24">
        <h1 
          className="text-5xl md:text-8xl lg:text-9xl font-bold mb-4 md:mb-6 text-white leading-[0.9]" 
          style={{ fontFamily: "var(--font-playfair)", letterSpacing: "-0.03em" }}
        >
          <div className="overflow-hidden">
            <span className="block hero-text-line">Natural</span>
          </div>
          <div className="overflow-hidden flex items-center gap-3 md:gap-4 mt-1 md:mt-0">
            <span className="block hero-text-line italic font-normal text-white/90">Cure</span>
            <div className="hero-text-line h-1.5 md:h-3 w-12 md:w-32 bg-[var(--accent-gold)] mt-2 md:mt-4"></div>
          </div>
        </h1>
        
        <p className="hero-subtitle text-base md:text-2xl text-white/80 font-light max-w-xl leading-relaxed mt-4 md:mt-0">
          Artisanal Ayurvedic care. Healing the body and nurturing the soul with purely organic ingredients.
        </p>
      </div>
    </section>
  );
}
