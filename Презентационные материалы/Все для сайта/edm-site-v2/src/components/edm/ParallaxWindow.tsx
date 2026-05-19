'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface ParallaxWindowProps {
  images: string[];
  bgImage?: string;
  position: 'left' | 'right' | 'center';
  activeIndex: number;
}

export default function ParallaxWindow({
  images,
  bgImage,
  position,
  activeIndex,
}: ParallaxWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const rafRef = useRef<number>(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      setScrollOffset(Math.max(0, Math.min(1, progress)));
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // Subtle parallax: max 20px movement (research recommendation)
  const parallaxY = (scrollOffset - 0.5) * 20;
  const parallaxX = (scrollOffset - 0.5) * 10;

  return (
    <div
      ref={containerRef}
      className={`parallax-window relative mx-auto md:mx-0 ${
        position === 'left' ? 'md:mr-12' : position === 'right' ? 'md:ml-12' : ''
      }`}
    >
      {/* Puzzle mask container */}
      <div className="puzzle-mask">
        {/* Background layer */}
        {bgImage && (
          <div
            className="parallax-layer parallax-layer-bg"
            style={{
              backgroundImage: `url(${bgImage})`,
              transform: `translateY(${parallaxY}px)`,
            }}
          />
        )}

        {/* Foreground images */}
        {images.map((img, idx) => (
          <div
            key={idx}
            className="parallax-layer parallax-layer-fg"
            style={{
              backgroundImage: `url(${img})`,
              opacity: idx === activeIndex ? 1 : 0,
              transform: idx === activeIndex
                ? `translate(${parallaxX}px, ${parallaxY * 0.7}px) scale(1.02)`
                : 'scale(0.98)',
            }}
          />
        ))}
      </div>

      {/* SVG Border 1 — teal accent instead of gold */}
      <div className="svg-border-1">
        <svg width="100%" height="100%" viewBox="0 0 1960.82 1994.88" preserveAspectRatio="xMidYMid meet">
          <path
            fill="none"
            stroke="rgba(20, 184, 166, 0.5)"
            strokeWidth="4"
            transform="scale(2.16)"
            d="M311.72 698.17c10.03,-0.85 19.89,12.62 16.04,23.77 -3.85,11.16 -21.5,27.16 -19.46,43.35 2.04,16.19 23.77,32.56 45.39,40.77 21.62,8.2 43.13,8.23 66.06,1.9 22.93,-6.33 47.29,-19 49.77,-36.55 2.48,-17.55 -16.91,-39.98 -22.27,-53 -5.36,-13.02 2,-21.51 11.98,-20.24l139.47 0 71.16 -124.57c-0.02,-6.59 8.01,-18.08 -10.6,-17.18 -18.61,0.9 -41.81,-7.15 -51.72,-21.05 -9.91,-13.9 -7.57,-43.09 3.26,-66.16 10.84,-23.07 38.93,-44.57 57.65,-44.89 18.73,-0.32 39.65,13.54 47.55,33.56 7.9,20.02 13.98,6.29 17.61,4.12l64.15 -112.28 -60.41 -105.75c-1.27,-8.73 -2.53,-17.47 1.19,-21.93 3.72,-4.46 12.44,-4.65 28.45,-3.59 16.01,1.07 39.31,3.39 53.98,-11.02 14.67,-14.41 20.72,-45.56 11.45,-74.62 -9.27,-29.06 -33.87,-56.04 -57.74,-64.59 -23.86,-8.54 -46.99,1.35 -60.53,17.49 -13.54,16.14 -17.5,38.52 -23.74,45.46 -6.24,6.94 -14.75,-1.57 -23.27,-10.08l-68.46 -119.82 -124.36 0 -143.28 0 -130.53 -0 -65 113.78 -72.28 126.51 -61.79 108.16 60.68 106.21 59.67 104.44 78.72 137.8 111.18 -0z"
          />
        </svg>
      </div>

      {/* SVG Border 2 — amber accent for warmth */}
      <div className="svg-border-2">
        <svg width="100%" height="100%" viewBox="0 0 1960.82 1994.88" preserveAspectRatio="xMidYMid meet">
          <path
            fill="none"
            stroke="rgba(217, 119, 6, 0.4)"
            strokeWidth="15"
            transform="scale(0.667)"
            transformOrigin="center"
            d="M1948.08,8.3 L1544.43,8.3 L1079.37,8.3 L655.7,8.29 L444.72,377.6 L210.11,788.23 L9.54,1139.3 L206.52,1484.05 L400.19,1823.03 L655.7,2270.3"
          />
        </svg>
      </div>
    </div>
  );
}
