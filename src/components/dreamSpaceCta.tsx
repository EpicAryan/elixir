'use client';

import { useRef, useEffect } from 'react';
import { easeOut, motion, useInView, useAnimation } from 'motion/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function DreamSpaceCta() {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const patternVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="bg-[#F2672D] overflow-hidden relative mb-6 lg:mb-10"
    >
      <div className="px-6 md:px-16 xl:px-24 py-16 md:py-24">
        <motion.div
          className="relative z-10 flex flex-col md:flex-row justify-between items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Side: Text and Buttons */}
          <div className="text-center md:text-left">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#F8BA9E] font-gtpro z-20"
              variants={itemVariants}
            >
              Start your dream space,
              <br />
              get a <span className="font-bold text-white">free quote?</span>
            </motion.h2>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <Button
                variant="outline"
                className="bg-white/15 text-white border-white/80 hover:bg-white/20 hover:shadow-xl hover:scale-[1.03] hover:text-white rounded-lg px-6 py-5 transition-all duration-300 ease-in-out font-gtpro sm:text-lg font-semibold tracking-wide cursor-pointer"
              >
                Get your free quotation
              </Button>

              <Button
                variant="outline"
                className="bg-transparent text-white border-white/80 hover:bg-white/10 hover:shadow-lg hover:scale-[1.03] hover:text-white rounded-lg px-6 py-5 transition-all duration-300 ease-in-out font-gtpro sm:text-lg font-semibold tracking-wide cursor-pointer"
              >
                Talk to the designer
              </Button>
            </motion.div>
          </div>

          {/* Decorative Pattern */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -right-40 md:-right-20 lg:-right-10 w-[400px] h-[220px] -z-10"
            variants={patternVariants}
            initial="hidden"
            animate={controls}
          >
            <Image
              src="group.svg"
              alt="group"
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
