// 'use client';

// import { useRef } from 'react';
// import { motion, useScroll, useTransform, useInView } from 'motion/react';
// import { WavyUnderline } from './icons/WavyUnderline';
// import { useBreakpoint } from '../hooks/use-breakpoint';

// const mediaSources = {
//   mobile: {
//     type: 'vimeo',
//     src: 'https://player.vimeo.com/video/1094717089?h=ebf3994118&background=1',
//   },
//   desktop: {
//     type: 'vimeo',
//     src: 'https://player.vimeo.com/video/1094713905?h=3dbbe5b82b&background=1',
//   },
// };

// export function BuiltToLast() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const underlineRef = useRef<HTMLDivElement>(null);
//   const breakpoint = useBreakpoint();
//   const isInView = useInView(underlineRef, { once: false, amount: 0.5 });

//   const isCompact = breakpoint === 'mobile' || breakpoint === 'sm';
//   const mediaSource = isCompact ? mediaSources.mobile : mediaSources.desktop;

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ['start start', 'end start'],
//   });

//   const scrollWidth = useTransform(
//     scrollYProgress,
//     [0, 0.3, 0.6],
//     breakpoint === 'mobile'
//       ? ['35%', '55%', '100%'] 
//       : breakpoint === 'sm'
//       ? ['40%', '60%', '98%']
//       : breakpoint === 'md'
//       ? ['40%', '73%', '100%']
//       : breakpoint === 'lg'
//       ? ['38%', '65%', '100%']
//       : breakpoint === 'xl'
//       ? ['30%', '66%', '100%']
//       : breakpoint === '2xl'
//       ? ['20%', '85%', '100%']
//       : ['20%', '85%', '100%']
//   );

//   const scrollHeight = useTransform(
//     scrollYProgress,
//     [0, 0.3, 0.6],
//     breakpoint === 'mobile'
//       ? ['30%', '50%', '83%'] 
//       : breakpoint === 'sm'
//       ? ['40%', '70%', '85%']
//       : breakpoint === 'md'
//       ? ['28%', '40%', '53%']
//       : breakpoint === 'lg'
//       ? ['39%', '45%', '65%']
//       : breakpoint === 'xl'
//       ? ['38%', '50%', '75%']
//       : breakpoint === '2xl'
//       ? ['39%', '72%', '80%']
//       : ['42%', '75%', '70%']
//   );

//   const scrollScale = useTransform(
//     scrollYProgress,
//     [0, 0.3, 0.6],
//     breakpoint === 'mobile'
//       ? [1.25, 1.2, 1.3] 
//       : breakpoint === 'sm'
//       ? [1.5, 1.3, 1.35]
//       : breakpoint === 'md'
//       ? [1.7, 1.35, 1.35]
//       : breakpoint === 'lg'
//       ? [1.8, 1.2, 1.2]
//       : breakpoint === 'xl'
//       ? [1.8, 1.1, 1.1]
//       : breakpoint === '2xl'
//       ? [2.5, 1.2, 1.2]
//       : [1.0, 1.0, 1.0]
//   );

//   const width = scrollWidth;
//   const height = scrollHeight;
//   const scale = scrollScale;

//   const textOpacity = useTransform(scrollYProgress, [0.2, 0.4], [1, 0]);
//   const textTranslateY = useTransform(scrollYProgress, [0.2, 0.4], [0, -50]);

//   return (
//     <section
//       ref={containerRef}
//       className="relative container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 h-[250vh] bg-white"
//     >
//       <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
//         <motion.div
//           style={{ width, height }}
//           className="relative overflow-hidden rounded-2xl shadow-2xl bg-black"
//         >
//           <div className="absolute inset-0 w-full h-full">
//             <motion.div
//               className="relative w-full h-full"
//               style={{ scale }}
//             >
//               <iframe
//                 src={mediaSource.src}
//                 title="Vimeo Background Video"
//                 className="absolute inset-0 w-full h-full object-cover"
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   minWidth: '100%',
//                   minHeight: '100%',
//                 }}
//                 frameBorder="0"
//                 allow="autoplay; fullscreen; picture-in-picture"
//                 allowFullScreen
//               />
//             </motion.div>
//           </div>

//           <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 z-10" />
//         </motion.div>

//         <motion.div
//           style={{ opacity: textOpacity, y: textTranslateY }}
//           className="absolute z-20 flex flex-col items-center text-center text-white px-4"
//         >
//           <p className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
//             Built to last.
//           </p>

//           <div className="mt-4 flex items-end gap-3 sm:gap-4">
//             <div className="relative inline-block" ref={underlineRef}>
//               <span className="bg-gradient-to-br from-[#F2672D] to-[#F99A72] bg-clip-text text-3xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
//                 10 years
//               </span>
//               <div className="absolute -bottom-2 left-1/2 mt-2 -translate-x-1/2 sm:-bottom-4">
//                 <WavyUnderline
//                   isInView={isInView}
//                   className="h-auto w-[120px] sm:w-[190px] md:w-[230px]"
//                 />
//               </div>
//             </div>

//             <span className="text-3xl font-semibold sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-lg">
//               warranty
//             </span>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
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

  const isCompact = breakpoint === 'mobile' || breakpoint === 'sm';
  const mediaSource = isCompact ? mediaSources.mobile : mediaSources.desktop;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', '75% start'],
  });

  const startState = {
    width: isCompact ? '85%' : '60%',
    height: isCompact ? '30%' : '50%',
    scale: 1.2,
  };
  
  const endState = {
    width: '100%',
    height: '87%', 
    scale: 1,
  };

  const animationRange: [number, number] = [0, 0.6];

  const width = useTransform(scrollYProgress, animationRange, [startState.width, endState.width]);
  const height = useTransform(scrollYProgress, animationRange, [startState.height, endState.height]);
  const videoScale = useTransform(scrollYProgress, animationRange, [startState.scale, endState.scale]);

  const fadeOutRange: [number, number] = [0.2, 0.4];
  const textOpacity = useTransform(scrollYProgress, fadeOutRange, [1, 0]);
  const textTranslateY = useTransform(scrollYProgress, fadeOutRange, [0, -60]);
  const overlayOpacity = useTransform(scrollYProgress, fadeOutRange, [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative container mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 h-[250vh] bg-white"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ width, height }}
          className="relative overflow-hidden rounded-2xl shadow-2xl bg-black"
        >
          <motion.div
            className="absolute inset-0"
            style={{ scale: videoScale }}
          >
            <iframe
              src={mediaSource.src}
              title="Vimeo Background Video"
              className="absolute top-1/2 left-1/2"
              style={{
                width: '177.77vh', 
                height: '56.25vw', 
                minWidth: '100vw',
                minHeight: '110vh', 
                transform: 'translate(-50%, -50%)',
              }}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 z-10"
          />
        </motion.div>

        {/* Animated Text */}
        <motion.div
          style={{ opacity: textOpacity, y: textTranslateY }}
          className="absolute z-20 flex flex-col items-center text-center text-white px-4"
        >
          <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-lg">
            Built to last.
          </p>

          <div className="mt-4 flex items-end gap-3 sm:gap-4">
            <div className="relative inline-block" ref={underlineRef}>
              <span className="bg-gradient-to-br from-[#F2672D] to-[#F99A72] bg-clip-text text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent drop-shadow-lg">
                10 years
              </span>
              <div className="absolute -bottom-2 left-1/2 mt-2 -translate-x-1/2 sm:-bottom-4">
                <WavyUnderline
                  isInView={isInView}
                  className="h-auto w-[120px] sm:w-[190px] md:w-[230px]"
                />
              </div>
            </div>
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold drop-shadow-lg">
              warranty
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
