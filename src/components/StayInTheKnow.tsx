'use client';

import { useRef } from 'react';
import { motion, useInView, easeOut } from 'motion/react';

export function StayInTheKnow() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.5,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section
      ref={ref}
      className="bg-white pb-16  sm:py-28 text-center overflow-hidden"
    >
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.p
          className="text-xs sm:text-sm text-[#AF7B5B] font-semibold sm:tracking-wider font-gtpro"
          variants={itemVariants}
        >
          SERIOUS ABOUT DESIGN, FUN ABOUT EVERYTHING ELSE.
        </motion.p>

        <motion.h2
          className="text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-800 mt-2 font-gtpro"
          variants={itemVariants}
        >
          Stay in the{' '}
          <span className="relative inline-block">
            know
            {/* Animated SVG underline */}
            <motion.svg
              width="157"
              height="6"
              viewBox="0 0 157 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-1 left-0 w-full h-auto"
            >
              <motion.path
                d="M1 4.98631C1 4.98631 34.91 0.947199 56.6647 1.00052C77.6993 1.05208 89.4501 5.26996 110.484 4.98631C128.279 4.74635 156 1.00052 156 1.00052"
                stroke="#F2672D"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </motion.svg>
          </span>
        </motion.h2>
      </motion.div>
    </section>
  );
}
