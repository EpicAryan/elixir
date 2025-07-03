'use client';

import { useInView, motion } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-br from-[#F2672D] to-[#F99A72] bg-clip-text font-manrope text-3xl sm:text-4xl lg:text-[55px] font-semibold text-transparent">
    {children}
  </span>
);

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const hoverEffect = {
    whileHover: { scale: 1.005, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)' },
  };

  const itemVariants = {
    fromLeft: {
      hidden: { x: -50, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    },
    fromRight: {
      hidden: { x: 50, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    },
    fromBottom: {
      hidden: { y: 50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.7 } },
    },
  };

  return (
    <section className="relative py-8 mb-8 bg-white min-h-full overflow-hidden">

      <div className=" px-6 md:px-16 xl:px-24 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <p className="text-xs font-semibold text-[#AF7B5B] tracking-wider sm:tracking-[0.11rem] font-gtpro z-20">
            SERIOUS ABOUT DESIGN, FUN ABOUT EVERYTHING ELSE.
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold tracking-wide text-gray-800 mt-2 inline-flex items-center gap-3 font-gtpro justify-center z-20">
            Why choose
            <span className="relative inline-flex items-center">
              <Image src="/logo.svg" alt="logo" width={20} height={20} className="w-11 h-auto" />
              <span className="font-bold text-orange-500 mx-1">Elixir</span>?

              {/* Animated SVG underline */}
              <motion.svg
                width="157"
                height="6"
                viewBox="0 0 157 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 left-0 w-32 sm:w-36 md:w-48 h-auto "
              >
                <motion.path
                  d="M1 4.98631C1 4.98631 34.91 0.947199 56.6647 1.00052C77.6993 1.05208 89.4501 5.26996 110.484 4.98631C128.279 4.74635 156 1.00052 156 1.00052"
                  stroke="#F2672D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                />
              </motion.svg>
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-4 gap-6 min-h-[680px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* Card 1 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromLeft} className="bg-neutral-50 rounded-xl p-6 border border-[#F2672D]/8">
            <h3><GradientText>10 years</GradientText></h3>
            <p className="text-gray-600 mt-2 font-gtpro text-base lg:text-xl">flat warranty¹</p>
          </motion.div>

          {/* Reordered Card 4 & 5 for mobile */}
          <div className="flex flex-col gap-6 md:hidden">
            {/* Card 4 - Mobile */}
            <motion.div
              {...hoverEffect}
              variants={itemVariants.fromRight}
              className="bg-neutral-50 rounded-xl p-6 border border-[#F2672D]/8"
            >
              <h3><GradientText>45-days</GradientText></h3>
              <p className="text-gray-600 mt-2 font-gtpro text-xl">move-in guaranty¹</p>
            </motion.div>

            {/* Card 5 - Mobile */}
            <motion.div
              {...hoverEffect}
              variants={itemVariants.fromRight}
              className="bg-neutral-50 rounded-xl p-6 border border-[#F2672D]/8"
            >
              <h3><GradientText>146+</GradientText></h3>
              <p className="text-gray-600 mt-2 font-gtpro text-xl">Quality checks</p>
            </motion.div>
          </div>



          {/* Card 2 */}
          <motion.div {...hoverEffect} variants={itemVariants.fadeIn} className="relative bg-neutral-50 rounded-xl p-6 md:col-span-2 md:row-span-2 overflow-hidden border border-[#F2672D]/8 h-[270px] sm:h-[340px] md:h-auto">
            <div className="relative z-10">
              <h3><GradientText>20,00,000+</GradientText></h3>
              <p className="text-gray-600 mt-2 font-gtpro text-xl">catalogue products</p>
            </div>
            <Image src="/whyus/box.svg" alt="Drawer unit" width={400} height={300} className="absolute -bottom-4 -right-4 w-full h-auto xl:max-w-[75%] z-0" />
          </motion.div>

          {/* Card 3 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromLeft} className="bg-neutral-50 rounded-xl md:row-span-2 flex flex-col justify-between border border-[#F2672D]/8">
            <div className="px-6 pt-6">
              <h3><GradientText>#1 Interiors</GradientText></h3>
              <p className="text-gray-600 mt-2 font-gtpro text-xl">in Chennai</p>
            </div>
            <div className="relative w-full h-50">
              <Image src="/whyus/chennaiArt.svg" alt="Chennai skyline" fill className="object-cover" />
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromRight} className="hidden md:block bg-neutral-50 rounded-xl p-6 border border-[#F2672D]/8">
            <h3><GradientText>45-days</GradientText></h3>
            <p className="text-gray-600 mt-2 font-gtpro text-xl">move-in guaranty¹</p>
          </motion.div>

          {/* Card 5 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromRight} className="hidden md:block bg-neutral-50 rounded-xl p-6 border border-[#F2672D]/8">
            <h3><GradientText>146+</GradientText></h3>
            <p className="text-gray-600 mt-2 font-gtpro text-xl">Quality checks</p>
          </motion.div>

          {/* Card 6 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromBottom} className="bg-neutral-50 rounded-xl p-6 border border-[#F2672D]/8">
            <h3><GradientText>10+ Awards</GradientText></h3>
            <p className="text-gray-600 mt-2 font-gtpro text-xl">for Innovative Designs</p>
          </motion.div>

          {/* Card 7 */}
          <motion.div {...hoverEffect} variants={itemVariants.fromBottom} className="relative bg-neutral-50 rounded-xl p-6 overflow-hidden border border-[#F2672D]/10 md:col-span-2">
            <div className="relative z-10">
              <h3><GradientText>12+ Years</GradientText></h3>
              <p className="text-gray-600 mt-2 font-gtpro text-xl">of legacy</p>
            </div>
            <div className="absolute inset-0 bg-neutral-50 z-0" />
            <Image src="/whyus/kitchen1.png" alt="Kitchen" fill className="hidden sm:block md:hidden lg:block object-contain lg:object-cover xl:object-contain object-right z-0" sizes="(max-width: 768px) 100vw, 50vw" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
