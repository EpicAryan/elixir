"use client";

import React, { useRef } from "react";
import { easeOut, motion, useInView } from "motion/react";
import Image from "next/image";

const awardLogos = [
  { src: "/impact/impact-1.png", alt: "Entrepreneur Award" },
  { src: "/impact/impact-2.png", alt: "Times Business Award" },
  { src: "/impact/impact-3.png", alt: "Entrepreneur Award" },
];


const AnimatedDigit = ({ digit, isInView, index, className = "", }: { digit: number; isInView: boolean; index: number;  className?: string; }) => {
  const DIGIT_HEIGHT_EM = 1.1;
  return (
    <div
      style={{ height: `${DIGIT_HEIGHT_EM}em` }}
      className="overflow-hidden"
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isInView ? `-${digit * DIGIT_HEIGHT_EM}em` : 0 }}
        transition={{
          duration: 4,
          delay: 0.05 + index * 0.15,
          ease: [0.25, 1, 0.5, 1],
        }}
        className="flex flex-col"
      >
        {[...Array(10).keys()].map((n) => (
          <span
            key={n}
            className={`flex items-center justify-center ${className}`}
            style={{ height: `${DIGIT_HEIGHT_EM}em` }}
          >
            {n}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const AnimatedNumber = ({ value, isInView }: { value: number; isInView: boolean; }) => {
  const digits = String(value)
    .split("")
    .filter((char) => /\d/.test(char)) 
    .map(Number);

  return (
    <div
       className="flex font-bold leading-none text-transparent bg-gradient-to-r from-[#F2672D] to-[#F99A72] bg-clip-text text-[8rem] md:text-[12rem] xl:text-[14rem]"
        // style={{ fontSize: "clamp(6rem, 25vw, 14rem)" }}
    >
      {digits.map((digit, index) => (
        <AnimatedDigit key={index} digit={digit} isInView={isInView} index={index} 
            className="text-transparent bg-gradient-to-r from-[#F2672D] to-[#F99A72] bg-clip-text"
        />
      ))}
    </div>
  );
};

export function ImpactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.2 });

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  return (
    <section ref={sectionRef} className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-4 lg:pl-16 xl:pl-24">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 lg:gap-8 items-center"
        >
          {/* Left Column: Text Content */}
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start font-gtpro">
            <motion.p variants={itemVariants} className="text-xs sm:text-sm lg:text-xs xl:text-sm font-semibold tracking-[0.2em] text-[#AF7B5B] uppercase">
              Meet Chennai&apos;s Favorite Interior Design
            </motion.p>

            <motion.h2 variants={itemVariants} className="mt-4 text-4xl sm:text-5xl md:text-5xl/snug lg:text-[42px]/snug font-medium tracking-wide text-gray-900">
              Influential
              <br />
              <span className="font-bold">and Impactful.</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="mt-6 max-w-sm sm:max-w-lg text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-black/60 leading-relaxed tracking-wider">
              From full-home interiors to smart modular solutions, we design spaces that reflect your story and support your lifestyle — thoughtfully, beautifully, and end to end.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex items-center justify-center gap-x-8 sm:gap-x-8">
              {awardLogos.map((logo, i) => (
                <Image
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  width={400}
                  height={400}
                  className="object-contain h-10 sm:h-14 w-auto"
                />
              ))}
            </motion.div>
          </div>

          {/* Right Column: Animated Number */}
          <motion.div variants={itemVariants} className="relative flex flex-col items-center justify-center min-h-[300px]">
            <Image
              src="/impact/impact-bg.png"
              alt="House sketch background"
              fill
              className="object-contain z-0"
            />
            <div className="relative z-10 flex flex-col items-center">
              <p className="text-sm lg:text-xs xl:text-sm font-normal tracking-[0.2em] text-[#AEAEAE] uppercase font-gtpro">
                Projects Completed This Year.
              </p>
              <AnimatedNumber value={361} isInView={isInView} />
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
