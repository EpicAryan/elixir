'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { WavyUnderline } from './icons/WavyUnderline';
import { useBreakpoint } from '../hooks/use-breakpoint';

const mediaSources = {
  mobile: {
    type: 'vimeo',
    src: 'https://player.vimeo.com/video/1094717089?h=ebf3994118&background=1',
  },
  desktop: {
    type: 'vimeo',
    src: 'https://player.vimeo.com/video/1094713905?h=3dbbe5b82b&background=1',
  },
};

export function BuiltToLast() {
  const containerRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();
  const isInView = useInView(underlineRef, { once: false, amount: 0.5 });

  const isCompact = breakpoint === 'mobile' || breakpoint === 'sm' || breakpoint === 'md';
  const isMobile = breakpoint === 'mobile';
  const mediaSource = isCompact ? mediaSources.mobile : mediaSources.desktop;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Responsive scroll transforms only on desktop
  const scrollWidth = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    breakpoint === 'mobile'
      ? ['45%', '100%', '100%']
      :breakpoint === 'sm'
      ? ['56%', '70%', '100%']
      :breakpoint === 'md'
      ? ['40%', '70%', '100%']
      : breakpoint === 'lg'
      ? ['38%', '80%', '100%']
      : breakpoint === 'xl'
      ? ['30%', '65%', '100%']
      : breakpoint === '2xl'
      ? ['20%', '85%', '100%']
      :  ['20%', '85%', '100%']
  );

  const scrollHeight = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    breakpoint === 'mobile'
      ? ['35%', '80%', '80%']
      :breakpoint === 'sm'
      ? ['40%', '70%', '100%']
      :breakpoint === 'md'
      ? ['40%', '65%', '85%']
      : breakpoint === 'lg'
      ? ['39%', '45%', '80%']
      : breakpoint === 'xl'
      ? ['38%', '60%', '80%']
      : breakpoint === '2xl'
      ? ['42%', '70%', '92%']
      : ['42%', '75%', '90%']
  );

  const scrollScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    breakpoint === 'mobile'
      ? [1.35, 1.23, 1.35]
      : breakpoint === 'sm'
      ? [1.5, 1.2, 1.2]
      :breakpoint === 'md'
      ? [1.5, 1.6, 1.7]
      : breakpoint === 'lg'
      ? [2.3, 1.5, 1.75]
      : breakpoint === 'xl'
      ? [2.2, 1.7, 1.4]
      : breakpoint === '2xl'
      ? [2.2, 1.3, 1.2]
      : [2.2, 1.2, 1.15]
  );

  const width = scrollWidth;
  const height = scrollHeight;
  const scale = scrollScale;

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);
  const textTranslateY = useTransform(scrollYProgress, [0.2, 0.4], [0, -50]);

  return (
    <section
      ref={containerRef}
      className={`relative  ${isMobile ? 'h-screen' : 'h-[250vh]'} bg-white`}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Expandable container */}
        <motion.div
          style={{ width, height }}
          className="absolute overflow-hidden rounded-md shadow-xl z-0 bg-black"
        >
          <motion.iframe
            src={mediaSource.src}
            title="Vimeo Background Video"
            className="absolute top-0 left-0 w-full h-full"
            style={{ scale }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
          <div className="pointer-events-none absolute inset-0 bg-black/30 z-10" />
        </motion.div>

        {/* Text content */}
        <motion.div
          style={{ opacity: textOpacity, y: textTranslateY }}
          className="relative z-20 flex flex-col items-center text-center text-gray-300"
        >
          <p className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Built to last.
          </p>

          <div className="mt-4 flex items-end gap-3 sm:gap-4">
            <div className="relative inline-block" ref={underlineRef}>
              <span className="bg-gradient-to-br from-[#F2672D] to-[#F99A72] bg-clip-text text-3xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                10 years
              </span>
              <div className="absolute -bottom-2 left-1/2 mt-2 -translate-x-1/2 sm:-bottom-4">
                <WavyUnderline
                  isInView={isInView}
                  className="h-auto w-[120px] sm:w-[190px] md:w-[230px]"
                />
              </div>
            </div>

            <span className="text-3xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl">
              warranty
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
