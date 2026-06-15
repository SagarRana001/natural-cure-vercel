import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Leaf, Droplets, Blend, Flame, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const STEPS = [
  {
    index: 0,
    ratio: 0.05,
    num: '01',
    title: 'Botanical Harvesting',
    icon: <Leaf size={22} style={{ color: 'hsl(36, 45%, 65%)' }} />,
    desc: 'Organic neem leaves are handpicked at sunrise from native orchards, ensuring the absolute maximum concentration of active purifying chlorophyll and antiseptic nutrients.'
  },
  {
    index: 1,
    ratio: 0.25,
    num: '02',
    title: 'Essence Extraction',
    icon: <Droplets size={22} style={{ color: 'hsl(36, 45%, 65%)' }} />,
    desc: 'The leaves are washed in thermal spring water, then crushed and steamed at low pressure to condense the pure green neem distillate without degrading the delicate leaf enzymes.'
  },
  {
    index: 2,
    ratio: 0.5,
    num: '03',
    title: 'Botanical Base Blending',
    icon: <Blend size={22} style={{ color: 'hsl(36, 45%, 65%)' }} />,
    desc: 'Cold-pressed coconut oil, organic olive oil, and organic shea butter are warmed below 110°F, then blended slowly with the fresh green neem juice to form our botanical emulsion.'
  },
  {
    index: 3,
    ratio: 0.75,
    num: '04',
    title: 'Cold Saponification',
    icon: <Flame size={22} style={{ color: 'hsl(36, 45%, 65%)' }} />,
    desc: 'The blend is slowly stirred until it reaches "trace." This cold-stirring method preserves all native vitamins and skin-soothing fatty acids that industrial hot soap boilers burn away.'
  },
  {
    index: 4,
    ratio: 0.95,
    num: '05',
    title: '6-Week Slow Curing',
    icon: <Calendar size={22} style={{ color: 'hsl(36, 45%, 65%)' }} />,
    desc: 'The soap blocks are hand-poured, cut into individual bars, and laid out on untreated white pine racks. They cure for 6 weeks, forming natural skin-conditioning glycerin.'
  }
];

export default function ScrollSoapAnimation() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Canvas drawing Cover math
  const drawImageCover = (ctx, img, canvas) => {
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = img.naturalWidth / img.naturalHeight;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasAspect > imgAspect) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgAspect;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgAspect;
      drawHeight = canvas.height;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Synchronize scroll position with active step state updates
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      let step = 0;
      if (latest < 0.2) step = 0;
      else if (latest < 0.4) step = 1;
      else if (latest < 0.6) step = 2;
      else if (latest < 0.8) step = 3;
      else step = 4;

      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Fetch preloaded images or fallback
    let images = window.preloadedNeemImages || [];
    const totalFrames = 300;

    if (images.length === 0) {
      // Pre-fill array with nulls
      for (let i = 0; i < totalFrames; i++) {
        images.push(null);
      }
      window.preloadedNeemImages = images;

      const loadFrames = (start, end) => {
        for (let i = start; i <= end; i++) {
          if (!images[i - 1]) {
            const img = new Image();
            const frameNumber = String(i).padStart(3, '0');
            img.src = `/neemFrames/ezgif-frame-${frameNumber}.jpg`;
            images[i - 1] = img;
          }
        }
      };

      // Load first 15 frames immediately
      loadFrames(1, 15);

      // Load the rest progressively
      let currentBatch = 16;
      const batchSize = 25;

      const loadNextBatch = () => {
        if (currentBatch <= totalFrames) {
          const end = Math.min(currentBatch + batchSize - 1, totalFrames);
          loadFrames(currentBatch, end);
          currentBatch += batchSize;
          setTimeout(loadNextBatch, 150);
        }
      };

      // Delay background loading to prioritize initial page render and video
      setTimeout(loadNextBatch, 1000);
    }

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Redraw current frame immediately
      const activeIdx = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );
      const activeImg = images[activeIdx];
      if (activeImg && activeImg.complete) {
        drawImageCover(ctx, activeImg, canvas);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Lerp loop: glides currentFrame smoothly towards targetFrame based on scroll position
    let animationId;
    const animate = () => {
      const progress = scrollYProgress.get();
      const targetFrame = progress * (totalFrames - 1);
      const diff = targetFrame - currentFrameRef.current;

      // Smooth damping frame updates
      currentFrameRef.current += diff * 0.15;

      const frameIdx = Math.min(
        totalFrames - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      const img = images[frameIdx];
      if (img && img.complete) {
        drawImageCover(ctx, img, canvas);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollYProgress]);

  // Click handler to smooth scroll the page to match step active ratios
  const handleStepClick = (stepIndex) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const trackHeight = container.clientHeight - window.innerHeight;

    const ratio = STEPS[stepIndex].ratio;
    const targetScroll = absoluteTop + ratio * trackHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    const nextStep = activeStep < STEPS.length - 1 ? activeStep + 1 : 0;
    handleStepClick(nextStep);
  };

  const handlePrev = () => {
    const prevStep = activeStep > 0 ? activeStep - 1 : STEPS.length - 1;
    handleStepClick(prevStep);
  };

  const currentStepData = STEPS[activeStep];

  return (
    <div
      ref={containerRef}
      id="process"
      style={{
        position: 'relative',
        height: '380vh', // Sets scroll track height
        backgroundColor: 'var(--color-bg-dark)',
      }}
    >
      {/* Sticky full-screen content wrapper */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Full-screen Background Canvas (Never cropped) */}
        <canvas
          ref={canvasRef}
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            opacity: 0.65, // Soft overlay style
          }}
        />
        
        {/* Subtle dark green vignette gradient that shields the right side for card text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(24, 38, 29, 0.1) 40%, rgba(24, 38, 29, 0.75) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Card Overlay Wrapper */}
        <div
          className="overlay-layout-wrapper"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end', // Aligns step card to the right side on desktop
            padding: '0 8%',
          }}
        >
          <div
            className="carousel-container"
            style={{
              width: '100%',
              maxWidth: '460px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Small header details */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'hsl(36, 45%, 65%)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                The Soap Craft
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: '#fff',
                  fontSize: '2.4rem',
                  fontWeight: 300,
                  lineHeight: 1.1,
                }}
              >
                How we handcraft <br />
                <span style={{ fontStyle: 'italic', fontWeight: 400, color: 'hsl(40, 25%, 97%)' }}>
                  Neem Soap
                </span>
              </h2>
            </div>

            {/* Carousel Card Container */}
            <div
              style={{
                minHeight: '260px',
                position: 'relative',
                marginBottom: '2rem',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="glass-panel-dark"
                  style={{
                    padding: '2.5rem',
                    borderLeft: '4px solid hsl(36, 45%, 65%)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      marginBottom: '1.2rem',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {currentStepData.icon}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: 'hsl(36, 45%, 65%)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      Step {currentStepData.num}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      color: '#fff',
                      fontSize: '1.8rem',
                      marginBottom: '1rem',
                      fontWeight: 400,
                    }}
                  >
                    {currentStepData.title}
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      fontWeight: 300,
                    }}
                  >
                    {currentStepData.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Navigation Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Progress Indicators */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {STEPS.map((step) => (
                  <button
                    key={step.index}
                    onClick={() => handleStepClick(step.index)}
                    aria-label={`Go to step ${step.index + 1}`}
                    style={{
                      width: activeStep === step.index ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '99px',
                      backgroundColor: activeStep === step.index ? 'hsl(36, 45%, 65%)' : 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    }}
                  />
                ))}
              </div>

              {/* Navigation Controls */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handlePrev}
                  aria-label="Previous step"
                  className="carousel-nav-btn"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition-snappy)',
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next step"
                  className="carousel-nav-btn"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition-snappy)',
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        .carousel-nav-btn:hover {
          background-color: var(--color-primary-light) !important;
          border-color: var(--color-accent) !important;
          color: #fff !important;
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .overlay-layout-wrapper {
            justify-content: center !important;
            align-items: flex-end !important;
            padding: 0 1rem 3rem 1rem !important;
            background: linear-gradient(to top, rgba(24, 38, 29, 0.85) 0%, rgba(24, 38, 29, 0.3) 60%, transparent 100%) !important;
          }
          .carousel-container {
            max-width: 100% !important;
          }
          .glass-panel-dark {
            padding: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
