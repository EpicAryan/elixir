'use client'

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';
import Image from 'next/image';
import { WavyUnderline } from './icons/WavyUnderline';

export function BuiltToLast() {
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
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 relative">
        {/* Background Image */}
        <motion.div
          className="relative mx-auto w-full max-w-sm z-0"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <Image
            src="/truck.png"
            alt="Truck with a blue tarp seen from above"
            width={400}
            height={600}
            className="rounded-md shadow-xl w-full h-auto"
          />
        </motion.div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10 px-4 text-center">
          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            <motion.p
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800"
              variants={textItemVariants}
            >
              Built to last.
            </motion.p>

            <motion.div
              className="mt-4 flex items-end gap-2"
              variants={textItemVariants}
            >
              <div className="relative inline-block">
                <span className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-[#F2672D] to-[#F99A72] bg-clip-text text-transparent">
                  10 years
                </span>
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2">
                  <WavyUnderline
                    isInView={isInView}
                    className="w-[170px] sm:w-[190px] md:w-[230px] h-auto"
                  />
                </div>
              </div>

              <span className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-800">
                warranty
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
