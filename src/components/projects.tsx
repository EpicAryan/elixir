'use client';

import React, { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Compare } from "@/components/ui/compare";
import { Button } from "./ui/button";
import { motion, useAnimation, useInView } from "motion/react";

export function Projects() {
  const router = useRouter();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

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

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as Element).closest('[data-dragging="true"]')) {
      router.push('/projects');
    }
  };

  return (
    <motion.div
      ref={ref}
      id="projects"
      className="w-full h-full container mx-auto px-6 lg:px-8 2xl:px-12 pt-10 lg:pt-24 font-gtpro"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Header Section */}
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-neutral-900">
          What if Your Home Looked Like This?
        </h2>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-neutral-600 max-w-xl mx-auto">
          The kind of makeover that looks expensive – but isn&apos;t. Smart updates, quick turnarounds, and results that speak for themselves.
        </p>
      </motion.div>

      {/* Compare Card */}
      <motion.div className="grid grid-cols-1 gap-6" variants={itemVariants}>
        <div
          className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/10] rounded-3xl cursor-pointer"
          onClick={handleCardClick}
        >
          <Compare
            firstImage="./compare/compare-1.jpg"
            secondImage="./compare/compare-2.jpg"
            firstImageClassName="object-cover object-center w-full h-full"
            secondImageClassname="object-cover object-center w-full h-full"
            className="absolute inset-0 w-full h-full rounded-[22px] md:rounded-lg"
            slideMode="drag"
            autoplay={false}
            enableViewAnimation={true}
            viewAnimationDuration={3000}
            animationEndPercentage={35}
          />
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div className="mt-12 text-center" variants={itemVariants}>
        <h3 className="text-xl sm:text-2xl font-medium text-neutral-800">
          Loved the transformation?
        </h3>
        <p className="mt-2 text-sm sm:text-base text-neutral-600">
          Explore all our projects and see what we&apos;ve created for homeowners like you.
        </p>

        <Button
          onClick={() => router.push("/projects")}
          className="my-6 px-6 text-xs sm:py-5 sm:text-base bg-[#F86642] hover:bg-orange-600 shadow-[2px_6px_20px_-3px_#F86642]/60 rounded-xl cursor-pointer"
        >
          View More Projects
        </Button>
      </motion.div>
    </motion.div>
  );
}
