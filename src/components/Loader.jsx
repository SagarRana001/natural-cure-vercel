import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
  { max: 20, text: 'Sourcing organic neem leaves...' },
  { max: 40, text: 'Extracting herbal essences...' },
  { max: 60, text: 'Blending cold-pressed carrier oils...' },
  { max: 80, text: 'Saponifying artisanal botanicals...' },
  { max: 95, text: 'Curing natural neem soap bars...' },
  { max: 100, text: 'Unveiling botanical experience...' }
];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initiating harvest...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const totalFrames = 300;
    let loadedCount = 0;
    const images = [];

    // Preload video as well to cache it
    const videoPromise = new Promise((resolve) => {
      const video = document.createElement('video');
      video.src = '/video1.mp4';
      video.preload = 'auto';
      video.oncanplaythrough = resolve;
      video.onerror = resolve; // Resolve anyway on error to not block page loading
    });

    // Preload image frames
    const preloadFrames = () => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameNumber = String(i).padStart(3, '0');
        img.src = `/neemFrames/ezgif-frame-${frameNumber}.jpg`;

        img.onload = () => {
          loadedCount++;
          const currentProgress = Math.round((loadedCount / totalFrames) * 100);
          setProgress(currentProgress);

          // Update status text based on progress brackets
          const step = LOADING_STEPS.find(s => currentProgress <= s.max);
          if (step) {
            setLoadingText(step.text);
          }

          if (loadedCount === totalFrames) {
            // Wait for video preloading to complete too
            videoPromise.then(() => {
              setTimeout(() => {
                setIsDone(true);
                setTimeout(() => {
                  onComplete();
                }, 800); // Allow fade out transition time
              }, 600); // Brief pause for visual check on 100%
            });
          }
        };

        img.onerror = () => {
          loadedCount++;
          const currentProgress = Math.round((loadedCount / totalFrames) * 100);
          setProgress(currentProgress);
          if (loadedCount === totalFrames) {
            videoPromise.then(() => {
              setTimeout(() => {
                setIsDone(true);
                setTimeout(() => {
                  onComplete();
                }, 800);
              }, 600);
            });
          }
        };

        images.push(img);
      }

      // Save preloaded images on window so they are immediately available in cache
      window.preloadedNeemImages = images;
    };

    preloadFrames();
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'hsl(140, 20%, 8%)', // Deep neem dark background
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          {/* Logo Brand / Icon */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '3rem'
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'hsl(40, 25%, 97%)', marginBottom: '1rem' }}
            >
              {/* Elegant botanical leaf svg path */}
              <path d="M32 60C32 60 32 30 32 4M32 4C32 4 48 18 48 32C48 46 32 60 32 60ZM32 4C32 4 16 18 16 32C16 46 32 60 32 60Z" />
              <path d="M32 18C32 18 42 22 42 28C42 34 32 36 32 36" />
              <path d="M32 18C32 18 22 22 22 28C22 34 32 36 32 36" />
              <path d="M32 34C32 34 44 38 44 44C44 50 32 52 32 52" />
              <path d="M32 34C32 34 22 38 22 44C22 50 32 52 32 52" />
            </svg>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2rem',
                letterSpacing: '0.15em',
                color: 'hsl(40, 25%, 97%)',
                textTransform: 'uppercase',
                fontWeight: 300
              }}
            >
              Natural Cure
            </span>
          </motion.div>

          {/* Loader text / progress display */}
          <div style={{ width: '100%', maxWidth: '320px', textAlign: 'center' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: '0.75rem',
                color: 'hsl(40, 25%, 97%)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em'
              }}
            >
              <span style={{ opacity: 0.6 }}>{loadingText}</span>
              <span style={{ fontWeight: 600, color: 'hsl(36, 45%, 65%)' }}>{progress}%</span>
            </div>

            {/* Progress Bar Container */}
            <div
              style={{
                height: '3px',
                width: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '999px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  backgroundColor: 'hsl(36, 45%, 65%)', // Natural clay gold
                  borderRadius: '999px',
                  width: `${progress}%`
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.8rem',
                fontStyle: 'italic',
                fontFamily: "'Cormorant Garamond', serif",
                color: 'hsl(40, 25%, 97%)',
                opacity: 0.4,
                letterSpacing: '0.05em'
              }}
            >
              Artisanal cold process takes patience.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
