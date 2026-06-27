"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Leaf, Sun, Beaker, Factory, PackageCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  { id: "01", title: "Collect Herbs", icon: <Leaf size={32} />, desc: "Hand-picking the finest organic ingredients at peak potency." },
  { id: "02", title: "Dry Naturally", icon: <Sun size={32} />, desc: "Slow sun-drying to perfectly preserve essential nutrients." },
  { id: "03", title: "Prepare Base", icon: <Beaker size={32} />, desc: "Grinding into fine, nutrient-dense herbal powders." },
  { id: "04", title: "Cold Process", icon: <Factory size={32} />, desc: "Mixing with botanical oils at precise, low temperatures." },
  { id: "05", title: "Curing Phase", icon: <PackageCheck size={32} />, desc: "Resting the soap to harden and mature for your skin." },
];

export function SoapTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Calculate how far to move horizontally
      const scrollWidth = containerRef.current!.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollWidth}`, 
          pin: true,
          scrub: 1,
        }
      });

      tl.to(containerRef.current, {
        x: -scrollWidth,
        ease: "none",
      });

      // Animate steps coming in
      gsap.utils.toArray(".timeline-step").forEach((step: unknown, i: number) => {
        const stepEl = step as HTMLElement;
        const isMobile = window.innerWidth < 768;
        const offset = isMobile ? 20 : 50;
        
        gsap.from(stepEl, {
          y: i % 2 === 0 ? offset : -offset,
          opacity: 0.3,
          duration: 1,
          scrollTrigger: {
            trigger: stepEl,
            start: "left 80%",
            end: "left 20%",
            containerAnimation: tl,
            scrub: true,
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[100dvh] bg-[var(--bg-secondary)] overflow-hidden flex items-center"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      {/* Background Texture/Noise */}
      <div className="absolute inset-0 pointer-events-none opacity-50" 
           style={{ background: 'radial-gradient(circle at top left, var(--bg-primary) 0%, transparent 60%)' }}></div>

      <div className="absolute top-16 left-8 md:left-24 z-20">
        <span className="section-label mb-2 block text-sm md:text-base">[ 02 — PROCESS ]</span>
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
          How It&apos;s Made
        </h2>
        <p className="text-base md:text-xl mt-2 md:mt-4 font-light max-w-[200px] md:max-w-sm" style={{ color: "var(--text-secondary)" }}>
          The meticulous journey from raw nature to your daily skincare ritual.
        </p>
      </div>

      <div ref={containerRef} className="flex px-[10vw] md:px-[15vw] items-center w-max h-full relative z-10 mt-16 md:mt-24">
        {/* Connecting Line */}
        <div className="absolute left-[10vw] md:left-[15vw] right-[10vw] md:right-[15vw] top-1/2 h-[1px] -translate-y-1/2 z-0" 
             style={{ background: "linear-gradient(90deg, transparent, var(--border-subtle) 10%, var(--border-subtle) 90%, transparent)" }}></div>

        {steps.map((step, i) => (
          <div key={i} className={`timeline-step relative z-10 flex flex-col w-56 md:w-80 shrink-0 px-4 md:px-8 ${i % 2 !== 0 ? 'mt-32 md:mt-48' : 'mb-32 md:mb-48'}`}>
            
            {/* Step Number */}
            <div className="text-5xl md:text-6xl font-bold opacity-10 absolute -top-8 md:-top-12 -left-2 md:-left-4 pointer-events-none" style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
              {step.id}
            </div>

            <div className="relative">
              {/* Icon Container */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-[20px] md:rounded-[24px] flex items-center justify-center mb-6 md:mb-8 relative z-10 transition-transform duration-500 hover:scale-110 hover:-rotate-3"
                   style={{ 
                     backgroundColor: "var(--bg-primary)", 
                     color: "var(--accent-green)",
                     boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08), 0 0 0 1px var(--border-subtle) inset"
                   }}>
                {step.icon}
              </div>
              
              {/* Connector Node */}
              <div className={`absolute left-8 md:left-10 w-[1px] h-12 md:h-16 bg-gradient-to-b from-transparent to-var(--border-subtle) z-0 ${i % 2 !== 0 ? 'bottom-full from-var(--border-subtle) to-transparent h-16 md:h-24' : 'top-full h-16 md:h-24'}`}></div>
              <div className={`absolute left-[29px] md:left-[38px] w-1.5 md:w-2 h-1.5 md:h-2 rounded-full z-0 ${i % 2 !== 0 ? '-top-16 md:-top-24' : '-bottom-16 md:-bottom-24'}`} style={{ backgroundColor: "var(--accent-gold)" }}></div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 tracking-tight" style={{ fontFamily: "var(--font-playfair)", color: "var(--text-primary)" }}>
              {step.title}
            </h3>
            
            <p className="text-xs md:text-sm font-light leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
