'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  fadeUp: {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  },
};

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section ref={ref} className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 font-gtpro">
            Our Projects
          </h2>
          <p className="text-neutral-500 mt-4 text-lg">
            Some of the finest works crafted with love and innovation.
          </p>
        </motion.div>

        {/* Animated Project Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <motion.div
              key={id}
              variants={itemVariants.fadeUp}
              className="relative rounded-xl overflow-hidden shadow-lg group border border-neutral-200"
            >
              {/* Card Image */}
              <div className="relative w-full h-[240px]">
                <Image
                  src="/project.jpg"
                  alt={`Project ${id}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
              </div>

              {/* Card Text */}
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold text-neutral-800">
                  Project Title {id}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">
                  Brief description of the project. Location, type, or style.
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
