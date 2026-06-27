"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StorySectionProps {
  id: string;
  title: string;
  subtitle: string;
  themeColor: string;
  bgColor: string;
  textColor: string;
  particles: React.ReactNode[];
  productImagePlaceholder: React.ReactNode;
  productImageUrl?: string;
  benefits: string[];
}

export function StorySection({
  id,
  title,
  subtitle,
  themeColor,
  bgColor,
  textColor,
  particles,
  productImagePlaceholder,
  productImageUrl,
  benefits,
}: StorySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const titleParts = title.split(' ');

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%", // Pin for 1.5x screen height
          pin: true,
          scrub: 1, // Smooth scrub
        },
      });

      // Background color transition happens globally if needed, but here we just animate local elements

      // Animate product coming in
      tl.from(productRef.current, {
        y: "100%",
        scale: 0.8,
        rotate: -15,
        opacity: 0,
        duration: 1,
      })
        .to(productRef.current, {
          rotate: 5,
          scale: 1.05,
          duration: 1,
        });

      // Animate benefits staggering in
      tl.from(".benefit-item", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
      }, "-=1.5");

      // Parallax the particles
      gsap.to(".particle-layer", {
        y: (i) => -100 * (i + 1), // Different speeds
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Parallax Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="particle-layer absolute"
            style={{
              top: `${10 + (i * 27) % 80}%`,
              left: `${10 + (i * 31) % 80}%`,
              transform: `scale(${0.5 + ((i * 17) % 50) / 100}) rotate(${(i * 73) % 360}deg)`,
              opacity: 0.6,
            }}
          >
            {particle}
          </div>
        ))}
      </div>

      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Text Content - Spanning 5 columns */}
        <div className="md:col-span-5 md:pr-12 mt-12 md:mt-0">
          <div className="mb-6 md:mb-8">
            <h2 
              className="text-5xl md:text-8xl lg:text-[7.5rem] font-bold leading-[0.9] tracking-tight" 
              style={{ fontFamily: "var(--font-playfair)", color: textColor }}
            >
              {titleParts.map((part, i) => (
                <span key={i} className={`block ${i % 2 !== 0 ? 'ml-6 md:ml-16 italic font-normal' : ''}`}>
                  {part}
                </span>
              ))}
            </h2>
          </div>
          
          <div className="w-12 md:w-16 h-1 mb-6 md:mb-8 rounded-full" style={{ backgroundColor: themeColor, opacity: 0.4 }}></div>

          <p className="text-lg md:text-2xl mb-8 md:mb-12 font-light tracking-wide leading-relaxed" style={{ color: textColor, opacity: 0.8 }}>
            {subtitle}
          </p>
          
          <div ref={benefitsRef} className="space-y-4 md:space-y-5 mb-10 md:mb-14">
            {benefits.map((benefit, i) => (
              <div key={i} className="benefit-item flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: themeColor, opacity: 0.7 }}>0{i + 1}</span>
                <span className="w-6 h-[1px]" style={{ backgroundColor: themeColor, opacity: 0.3 }} />
                <span className="text-base md:text-lg font-medium tracking-wide" style={{ color: textColor }}>{benefit}</span>
              </div>
            ))}
          </div>

          <button 
            className="group relative px-8 py-4 md:px-10 md:py-5 rounded-2xl font-semibold overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl"
            style={{ 
              backgroundColor: themeColor, 
              color: "#fff",
              boxShadow: `0 10px 30px -10px ${themeColor}80`
            }}
          >
            <span className="relative z-10 uppercase tracking-widest text-xs">Explore {title}</span>
            <div className="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                 style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)' }}></div>
          </button>
        </div>

        {/* Product Visual - Spanning 7 columns, offset */}
        <div ref={productRef} className="md:col-span-7 flex justify-center items-center h-full relative mt-8 md:mt-0 pb-12 md:pb-0">
          {/* Decorative aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-[500px] md:h-[500px] rounded-full blur-3xl opacity-20 pointer-events-none"
               style={{ backgroundColor: themeColor }}></div>
          
          <div className="relative w-64 h-64 md:w-[450px] md:h-[550px] rounded-[32px] md:rounded-[40px] flex items-center justify-center overflow-hidden transition-transform duration-700 hover:scale-[1.02]"
               style={{ 
                 backgroundColor: "rgba(255,255,255,0.2)", 
                 border: "1px solid rgba(255,255,255,0.4)",
                 boxShadow: "0 30px 60px -15px rgba(0,0,0,0.05), inset 0 0 0 1px rgba(255,255,255,0.5)",
                 backdropFilter: "blur(12px)"
               }}>
            
            {productImageUrl ? (
              <img 
                src={productImageUrl} 
                alt={title} 
                className="w-[80%] h-[80%] object-contain relative z-20 drop-shadow-2xl transition-transform duration-700 hover:scale-110" 
              />
            ) : (
              <div className="text-9xl drop-shadow-2xl relative z-20">
                {productImagePlaceholder}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
