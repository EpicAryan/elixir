'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-gradient-to-br from-[#F2672D] to-[#F99A72] bg-clip-text text-transparent">
    {children}
  </span>
);

const GalleryImage = ({
  src,
  alt,
  variants,
  className,
}: {
  src: string;
  alt: string;
  variants: Variants;
  className?: string;
}) => (
  <motion.div
    variants={variants}
    className={cn('relative overflow-hidden rounded-lg min-h-60', className)}
  >
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
    />
  </motion.div>
);

export function HappyHomes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.08 });

  const images = [
    '/happy/image-1.jpg',
    '/happy/image-5.jpg',
    '/happy/image-2.jpg',
    '/happy/image-5.jpg',
    '/happy/image-3.jpg',
    '/happy/image-2.jpg',
    '/happy/image-4.jpg',
    '/happy/image-3.jpg',
    '/happy/image-1.jpg',
    '/happy/image-3.jpg',
    '/happy/image-5.jpg',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const animationVariants = {
    fromTop: {
      hidden: { y: -50, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    },
    fadeIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay: 0.3 },
      },
    },
  };

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Row 1 */}
          <GalleryImage src={images[0]} alt="img1" variants={animationVariants.fromTop} />

          {/* Horizontal stack - responsive */}
          <div className="lg:col-span-2 flex flex-col md:flex-row items-center gap-2">
            <GalleryImage
              src={images[1]}
              alt="img2"
              variants={animationVariants.fromTop}
              className="w-full md:w-1/4"
            />
            <GalleryImage
              src={images[2]}
              alt="img3"
              variants={animationVariants.fromTop}
              className="w-full md:w-1/2"
            />
            <GalleryImage
              src={images[3]}
              alt="img4"
              variants={animationVariants.fromTop}
              className="w-full md:w-1/4"
            />
          </div>

          <GalleryImage src={images[4]} alt="img5" variants={animationVariants.fromTop} />

          {/* Row 2 */}
          <GalleryImage src={images[5]} alt="img6" variants={animationVariants.fromTop} />

          <motion.div
            variants={animationVariants.fadeIn}
            className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col justify-center items-center text-center bg-gray-50 rounded-xl p-6 font-gtpro"
          >
            <h3 className="text-3xl md:text-5xl font-bold">
              <GradientText>10,000+</GradientText>
            </h3>
            <h2 className="text-3xl md:text-5xl font-semibold text-slate-800 mt-2">
              Happy Homes, <br /> One Simple Promise.
            </h2>
          </motion.div>

          <GalleryImage
            src={images[6]}
            alt="img7"
            variants={animationVariants.fromTop}
            className="md:row-start-auto md:col-start-auto lg:row-start-2 lg:col-start-4"
          />

          {/* Row 3 */}
          <GalleryImage src={images[7]} alt="img8" variants={animationVariants.fromTop} />
          <GalleryImage src={images[8]} alt="img9" variants={animationVariants.fromTop} />
          <GalleryImage src={images[9]} alt="img10" variants={animationVariants.fromTop} />
          <GalleryImage src={images[10]} alt="img11" variants={animationVariants.fromTop} />
        </motion.div>
      </div>
    </section>
  );
}
